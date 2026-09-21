import { NextResponse } from 'next/server';
import { couponValidateSchema } from '@/lib/validations';
import { getCouponByCode } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = couponValidateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ valid: false, message: 'Invalid coupon format' }, { status: 400 });
    }

    const { code, subtotal } = parsed.data;
    const coupon = await getCouponByCode(code);

    if (!coupon) {
      return NextResponse.json(
        { valid: false, message: `Coupon code '${code}' does not exist.` },
        { status: 404 }
      );
    }

    if (!coupon.isActive) {
      return NextResponse.json(
        { valid: false, message: `Coupon '${code}' is no longer active.` },
        { status: 400 }
      );
    }

    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      return NextResponse.json(
        { valid: false, message: `Coupon '${code}' has expired.` },
        { status: 400 }
      );
    }

    if (subtotal < coupon.minOrderValue) {
      return NextResponse.json(
        {
          valid: false,
          message: `Minimum order amount of ₹${coupon.minOrderValue} required for coupon '${code}'. Current cart is ₹${subtotal}.`,
        },
        { status: 400 }
      );
    }

    let calculatedDiscount = 0;
    if (coupon.discountType === 'PERCENTAGE') {
      calculatedDiscount = (subtotal * coupon.discountValue) / 100;
      if (coupon.maxDiscount) {
        calculatedDiscount = Math.min(calculatedDiscount, coupon.maxDiscount);
      }
    } else {
      calculatedDiscount = Math.min(coupon.discountValue, subtotal);
    }

    return NextResponse.json({
      valid: true,
      coupon,
      calculatedDiscount: Math.round(calculatedDiscount * 100) / 100,
      message: `Coupon '${coupon.code}' applied successfully!`,
    });
  } catch {
    return NextResponse.json(
      { valid: false, message: 'An error occurred while validating coupon' },
      { status: 500 }
    );
  }
}
