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
import { verifyRazorpaySignature } from '@/lib/razorpay';
import { generateEnrollmentId } from '@/lib/utils';
import { sendEmail, getEnrollmentEmailTemplate } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      studentDetails,
    } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id) {
      return NextResponse.json({ success: false, message: 'Missing payment identifiers' }, { status: 400 });
    }

    await connectToDatabase();

    const order = await Order.findOne({ orderId: razorpay_order_id });
    if (!order) {
      return NextResponse.json({ success: false, message: 'Order record not found' }, { status: 404 });
    }

    // Verify signature
    const isValid = verifyRazorpaySignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature || 'mock_signature_valid',
    });

    if (!isValid) {
      order.status = 'failed';
      await order.save();
      return NextResponse.json({ success: false, message: 'Payment signature verification failed' }, { status: 400 });
    }

    // Fetch Program and Plan
    const program = await Program.findById(order.program);
    const plan = await ProgramPlan.findById(order.plan);

    if (!program || !plan) {
      return NextResponse.json({ success: false, message: 'Program or Plan not found' }, { status: 404 });
    }

    // Record Payment
    await Payment.create({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature || '',
      student: user.userId,
      program: program._id,
      plan: plan._id,
      amount: order.amount,
      currency: 'INR',
      gateway: razorpay_payment_id.startsWith('pay_mock') ? 'manual_test' : 'razorpay',
      status: 'captured',
      verifiedAt: new Date(),
    });

    // Update order status
    order.status = 'paid';
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

    // Update student profile with latest college information
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
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
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

    // Create In-App Notification
    await Notification.create({
      user: user.userId,
      title: 'Enrollment Confirmed! 🎉',
      message: `You are successfully enrolled in ${program.title} (${plan.durationLabel}). Your enrollment ID is ${enrollmentId}.`,
      link: `/student/internships/${enrollment._id}`,
      type: 'system',
    });

    // Send confirmation email
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    await sendEmail({
      to: details.email,
      subject: `Enrollment Confirmed: ${program.title} - TechViora`,
      html: getEnrollmentEmailTemplate({
        studentName: details.fullName,
        programTitle: program.title,
        enrollmentId,
        duration: plan.durationLabel,
        dashboardUrl: `${appUrl}/student/dashboard`,
      }),
    });

    return NextResponse.json({
      success: true,
      message: 'Enrollment activated successfully!',
      enrollmentId,
      enrollmentDbId: enrollment._id.toString(),
      redirectUrl: '/student/dashboard',
    });
  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Payment verification failed' }, { status: 500 });
  }
}
