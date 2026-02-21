import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';

// Price IDs from Stripe
const PRICE_IDS = {
  pro: {
    monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID || '',
    annual: process.env.STRIPE_PRO_YEARLY_PRICE_ID || '',
  },
  premium: {
    monthly: process.env.STRIPE_PREMIUM_MONTHLY_PRICE_ID || '',
    annual: process.env.STRIPE_PREMIUM_YEARLY_PRICE_ID || '',
  },
};

export async function POST(request: NextRequest) {
  try {
    const { plan, userId, email, billingCycle = 'monthly' } = await request.json();

    // Get the price ID based on plan and billing cycle
    const planPrices = PRICE_IDS[plan as keyof typeof PRICE_IDS];
    
    if (!planPrices) {
      return NextResponse.json(
        { error: 'Invalid plan selected' },
        { status: 400 }
      );
    }

    const priceId = billingCycle === 'annual' ? planPrices.annual : planPrices.monthly;

    if (!priceId) {
      return NextResponse.json(
        { error: 'Price not configured for this plan' },
        { status: 400 }
      );
    }

    const stripe = getStripe();

    // Create Stripe checkout session
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
        billingCycle,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://termszipp.com'}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://termszipp.com'}/signup?canceled=true`,
      allow_promotion_codes: true,
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
