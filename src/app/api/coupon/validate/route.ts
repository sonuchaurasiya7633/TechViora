import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Coupon } from '@/models/Coupon';

export async function POST(req: NextRequest) {
  try {
    const { code, amount } = await req.json();

    if (!code) {
      return NextResponse.json({ success: false, message: 'Coupon code is required' }, { status: 400 });
    }

    await connectToDatabase();
    const coupon = await Coupon.findOne({
      code: code.trim().toUpperCase(),
      isActive: true,
    });

    if (!coupon) {
      return NextResponse.json({ success: false, message: 'Invalid or inactive coupon code.' }, { status: 404 });
    }

    if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) {
      return NextResponse.json({ success: false, message: 'This coupon code has expired.' }, { status: 400 });
    }

    if (coupon.usageLimit && coupon.timesUsed >= coupon.usageLimit) {
      return NextResponse.json({ success: false, message: 'Coupon code usage limit has been reached.' }, { status: 400 });
    }

    if (amount < coupon.minOrderAmount) {
      return NextResponse.json({
        success: false,
        message: `Minimum order amount for this coupon is ₹${coupon.minOrderAmount}.`,
      }, { status: 400 });
    }

    let discountAmount = 0;
    if (coupon.discountType === 'flat') {
      discountAmount = coupon.discountValue;
    } else if (coupon.discountType === 'percentage') {
      discountAmount = Math.round((amount * coupon.discountValue) / 100);
      if (coupon.maxDiscountAmount && discountAmount > coupon.maxDiscountAmount) {
        discountAmount = coupon.maxDiscountAmount;
      }
    }

    const finalAmount = Math.max(0, amount - discountAmount);

    return NextResponse.json({
      success: true,
      code: coupon.code,
      discountAmount,
      finalAmount,
      message: `Coupon applied! You saved ₹${discountAmount}.`,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Error validating coupon' }, { status: 500 });
  }
}
