import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const { plan, userId, email } = await request.json();

    // Get the price ID based on plan
    // TODO: Create these products in Stripe and add price IDs to env vars
    const priceIds: Record<string, string> = {
      pro: process.env.STRIPE_PRO_MONTHLY_PRICE_ID || '',
      premium: process.env.STRIPE_PREMIUM_MONTHLY_PRICE_ID || '',
    };

    const priceId = priceIds[plan];

    if (!priceId) {
      return NextResponse.json(
        { error: 'Invalid plan or price not configured' },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: email,
      metadata: {
        userId,
        plan,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://termszipp.com'}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://termszipp.com'}/signup?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
