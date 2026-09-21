import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(`contact_${ip}`, 5, 60000);
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: 'Too many messages sent. Please wait a minute.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been received. Our team will reach out within 24 hours.',
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
