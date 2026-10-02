import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { Program } from '@/models/Program';
import { ProgramPlan } from '@/models/ProgramPlan';
import { Coupon } from '@/models/Coupon';
import { Order } from '@/models/Order';
import { getRazorpayClient } from '@/lib/razorpay';
import { generateUpiQrDataUrl, DEFAULT_UPI_ID, DEFAULT_PAYEE_NAME } from '@/lib/upi';

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, message: 'Please login to proceed with enrollment.' }, { status: 401 });
    }

    const body = await req.json();
    const { programSlug, planSlug, couponCode, studentDetails } = body;

    if (!programSlug || !planSlug) {
      return NextResponse.json({ success: false, message: 'Program and Plan are required' }, { status: 400 });
    }

    await connectToDatabase();

    const program = await Program.findOne({ slug: programSlug });
    if (!program) {
      return NextResponse.json({ success: false, message: 'Program not found' }, { status: 404 });
    }

    const plan = await ProgramPlan.findOne({ slug: planSlug, isActive: true });
    if (!plan) {
      return NextResponse.json({ success: false, message: 'Invalid or inactive plan selected' }, { status: 404 });
    }

    // SERVER-SIDE price determination (Never trusting client-supplied amount)
    let basePrice = plan.salePrice;

    if (program.customPricingEnabled && program.customPrices) {
      if (plan.slug === '1-month' && program.customPrices.oneMonth) {
        basePrice = program.customPrices.oneMonth;
      } else if (plan.slug === '45-days' && program.customPrices.fortyFiveDays) {
        basePrice = program.customPrices.fortyFiveDays;
      } else if (plan.slug === '3-months' && program.customPrices.threeMonths) {
        basePrice = program.customPrices.threeMonths;
      } else if (plan.slug === '6-months' && program.customPrices.sixMonths) {
        basePrice = program.customPrices.sixMonths;
      }
    }

    let discountAmount = 0;
    let appliedCoupon = '';

    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode.trim().toUpperCase(), isActive: true });
      if (coupon && (!coupon.expiryDate || new Date(coupon.expiryDate) >= new Date()) && basePrice >= coupon.minOrderAmount) {
        if (coupon.discountType === 'flat') {
          discountAmount = coupon.discountValue;
        } else if (coupon.discountType === 'percentage') {
          discountAmount = Math.round((basePrice * coupon.discountValue) / 100);
          if (coupon.maxDiscountAmount && discountAmount > coupon.maxDiscountAmount) {
            discountAmount = coupon.maxDiscountAmount;
          }
        }
        appliedCoupon = coupon.code;
      }
    }

    const finalAmount = Math.max(0, basePrice - discountAmount);
    const receipt = `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    let orderId = `order_sim_${Date.now()}`;
    let isRazorpayCreated = false;

    // Create Razorpay Order via live API
    try {
      const razorpay = getRazorpayClient();
      const rzpOrder = await razorpay.orders.create({
        amount: finalAmount * 100, // in paise
        currency: 'INR',
        receipt,
        notes: {
          programId: program._id.toString(),
          planId: plan._id.toString(),
          studentId: user.userId,
          programSlug: program.slug,
        },
      });
      orderId = rzpOrder.id;
      isRazorpayCreated = true;
    } catch (rzpErr) {
      console.warn('Razorpay live order fallback to internal order:', rzpErr);
      orderId = `ORD_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;
    }

    const upiId = DEFAULT_UPI_ID;
    const payeeName = DEFAULT_PAYEE_NAME;

    // Save order record
    const newOrder = await Order.create({
      orderId,
      student: user.userId,
      program: program._id,
      plan: plan._id,
      amount: finalAmount,
      currency: 'INR',
      upiId,
      status: 'created',
      couponCode: appliedCoupon,
      discountAmount,
      studentDetails: studentDetails || {},
      receipt,
      paymentTimestamp: new Date(),
    });

    // Dynamic QR Data URL
    const qrDataUrl = await generateUpiQrDataUrl({
      upiId,
      payeeName,
      amount: finalAmount,
      transactionNote: `TechViora: ${program.title.substring(0, 20)}`,
      transactionRef: orderId,
    });

    return NextResponse.json({
      success: true,
      orderId,
      amount: finalAmount,
      currency: 'INR',
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_live_Tj6i2RzYNR1GHp',
      upiId,
      payeeName,
      qrDataUrl,
      uploadedQrUrl: '/payment-qr.jpg',
      programTitle: program.title,
      planName: plan.name,
      discountAmount,
      basePrice,
      isRazorpayCreated,
      createdAt: newOrder.createdAt,
    });
  } catch (error: any) {
    console.error('Create order error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Error creating order' }, { status: 500 });
  }
}
