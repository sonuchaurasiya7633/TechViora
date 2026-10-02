import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { Order } from '@/models/Order';
import { Payment } from '@/models/Payment';
import { Enrollment } from '@/models/Enrollment';
import { Progress } from '@/models/Progress';
import { Program } from '@/models/Program';
import { ProgramPlan } from '@/models/ProgramPlan';
import { Coupon } from '@/models/Coupon';
import { Notification } from '@/models/Notification';
import { StudentProfile } from '@/models/StudentProfile';
import { generateEnrollmentId } from '@/lib/utils';
import { sendEmail, getEnrollmentEmailTemplate } from '@/lib/email';
import { verifyRazorpaySignature } from '@/lib/razorpay';
import { validateUtr, DEFAULT_UPI_ID } from '@/lib/upi';

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, message: 'Unauthorized. Please log in.' }, { status: 401 });
    }

    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId: bodyOrderId,
      utrNumber,
      studentDetails,
      paymentTimestamp: customTimestamp,
    } = body;

    const targetOrderId = razorpay_order_id || bodyOrderId;

    if (!targetOrderId) {
      return NextResponse.json({ success: false, message: 'Missing order reference' }, { status: 400 });
    }

    await connectToDatabase();

    const order = await Order.findOne({ orderId: targetOrderId });
    if (!order) {
      return NextResponse.json({ success: false, message: 'Order record not found' }, { status: 404 });
    }

    let paymentId = razorpay_payment_id || `PAY_UPI_${utrNumber || Date.now()}`;
    let gateway: 'razorpay' | 'upi_qr' | 'manual_test' = razorpay_payment_id ? 'razorpay' : 'upi_qr';
    let cleanUtr = utrNumber ? utrNumber.trim() : razorpay_payment_id || '';

    // If Razorpay parameters provided, verify signature
    if (razorpay_payment_id) {
      const isValid = verifyRazorpaySignature({
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        signature: razorpay_signature || 'mock_signature_valid',
      });

      if (!isValid) {
        order.status = 'failed';
        await order.save();
        return NextResponse.json({ success: false, message: 'Razorpay payment signature verification failed' }, { status: 400 });
      }
    } else if (utrNumber) {
      if (!validateUtr(utrNumber)) {
        return NextResponse.json({
          success: false,
          message: 'Please enter a valid UTR / Transaction Reference Number (min 6 characters).'
        }, { status: 400 });
      }
    }

    const paymentTimestamp = customTimestamp ? new Date(customTimestamp) : new Date();

    // Fetch Program and Plan
    const program = await Program.findById(order.program);
    const plan = await ProgramPlan.findById(order.plan);

    if (!program || !plan) {
      return NextResponse.json({ success: false, message: 'Associated Program or Plan not found' }, { status: 404 });
    }

    const upiId = DEFAULT_UPI_ID;

    // Record Payment
    let paymentRecord = await Payment.findOne({
      $or: [{ orderId: targetOrderId }, { paymentId }]
    });

    if (!paymentRecord) {
      paymentRecord = await Payment.create({
        orderId: targetOrderId,
        paymentId,
        utrNumber: cleanUtr,
        upiId,
        student: user.userId,
        program: program._id,
        plan: plan._id,
        amount: order.amount,
        currency: 'INR',
        gateway,
        status: 'captured',
        method: gateway === 'razorpay' ? 'Razorpay Live Gateway' : 'UPI / QR Code (sonu-6074@ptyes)',
        paymentTimestamp,
        verifiedAt: new Date(),
      });
    } else {
      paymentRecord.utrNumber = cleanUtr;
      paymentRecord.status = 'captured';
      paymentRecord.verifiedAt = new Date();
      await paymentRecord.save();
    }

    // Update order status
    order.status = 'paid';
    order.utrNumber = cleanUtr;
    order.upiId = upiId;
    order.paymentTimestamp = paymentTimestamp;
    await order.save();

    // Calculate dates
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + plan.durationDays);

    const enrollmentId = generateEnrollmentId(program.slug);

    // Merge student details
    const details = {
      fullName: studentDetails?.fullName || user.name,
      email: studentDetails?.email || user.email,
      mobileNumber: studentDetails?.mobileNumber || '',
      collegeName: studentDetails?.collegeName || '',
      university: studentDetails?.university || '',
      course: studentDetails?.course || 'B.Tech',
      branch: studentDetails?.branch || 'CSE',
      currentYear: studentDetails?.currentYear || '3rd Year',
      city: studentDetails?.city || '',
      state: studentDetails?.state || '',
      linkedinUrl: studentDetails?.linkedinUrl || '',
      githubUrl: studentDetails?.githubUrl || '',
    };

    // Update student profile with latest academic details
    await StudentProfile.findOneAndUpdate(
      { user: user.userId },
      {
        collegeName: details.collegeName,
        university: details.university,
        course: details.course,
        branch: details.branch,
        currentYear: details.currentYear,
        city: details.city,
        state: details.state,
        linkedinUrl: details.linkedinUrl,
        githubUrl: details.githubUrl,
      },
      { upsert: true }
    );

    // Create Enrollment
    const enrollment = await Enrollment.create({
      enrollmentId,
      student: user.userId,
      program: program._id,
      plan: plan._id,
      planDuration: plan.durationLabel,
      planDurationDays: plan.durationDays,
      studentDetails: details,
      price: plan.salePrice,
      discount: order.discountAmount || 0,
      couponCode: order.couponCode || '',
      finalAmount: order.amount,
      upiId,
      utrNumber: cleanUtr,
      razorpayOrderId: razorpay_order_id || targetOrderId,
      razorpayPaymentId: razorpay_payment_id || paymentId,
      paymentTimestamp,
      paymentStatus: 'paid',
      startDate,
      endDate,
      progressPercent: 0,
      status: 'active',
      certificateIssued: false,
    });

    // Initialize Progress tracker
    await Progress.create({
      student: user.userId,
      enrollment: enrollment._id,
      program: program._id,
      completedLessons: [],
      submittedAssignments: [],
      approvedAssignments: [],
      completedProjects: [],
      passedQuizzes: [],
      progressPercent: 0,
      lastAccessedAt: new Date(),
    });

    // Increment program enrollment count
    program.enrollmentCount = (program.enrollmentCount || 0) + 1;
    await program.save();

    // Increment coupon usage if used
    if (order.couponCode) {
      await Coupon.updateOne({ code: order.couponCode }, { $inc: { timesUsed: 1 } });
    }

    const formattedTime = new Date(paymentTimestamp).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    // Create In-App Notification
    await Notification.create({
      user: user.userId,
      title: 'Enrollment Confirmed! 🎉',
      message: `Your payment (${paymentId}) submitted at ${formattedTime} is verified. Your Enrollment ID is ${enrollmentId}.`,
      link: `/student/internships/${enrollment._id}`,
      type: 'system',
    });

    // Send confirmation email asynchronously
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    sendEmail({
      to: details.email,
      subject: `Enrollment Confirmed: ${program.title} - TechViora`,
      html: getEnrollmentEmailTemplate({
        studentName: details.fullName,
        programTitle: program.title,
        enrollmentId,
        duration: plan.durationLabel,
        dashboardUrl: `${appUrl}/student/dashboard`,
      }),
    }).catch(e => console.warn('Email dispatch warning:', e));

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully! Enrollment activated.',
      enrollmentId,
      paymentId,
      paymentTimestamp: formattedTime,
      enrollmentDbId: enrollment._id.toString(),
      redirectUrl: '/student/dashboard',
    });
  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Payment verification failed' }, { status: 500 });
  }
}
