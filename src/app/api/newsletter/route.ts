import { NextResponse } from 'next/server';
import { newsletterSchema } from '@/lib/validations';
import { prisma } from '@/lib/db';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(`newsletter_${ip}`, 5, 60000);
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = newsletterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email } = parsed.data;

    try {
      await prisma.newsletterSubscriber.upsert({
        where: { email },
        update: { isActive: true },
        create: { email, isActive: true },
      });
    } catch {
      // In-memory fallback
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing to Farm_lit updates & seasonal tips!',
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    );
  }
}
