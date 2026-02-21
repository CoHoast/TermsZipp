import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

// Lazy create admin Supabase client for webhook
function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const plan = session.metadata?.plan;
      const customerId = session.customer as string;
      const subscriptionId = session.subscription as string;
      
      console.log(`✅ Checkout completed for user ${userId}, plan: ${plan}`);
      
      if (userId && plan) {
        // Update user's profile with subscription info
        const { error } = await getSupabaseAdmin()
          .from('profiles')
          .update({ 
            plan: plan,
            stripe_customer_id: customerId,
            subscription_id: subscriptionId,
            subscription_status: 'active',
            documents_limit: plan === 'premium' ? -1 : plan === 'pro' ? 25 : 3,
          })
          .eq('id', userId);
        
        if (error) {
          console.error('Error updating profile:', error);
        } else {
          console.log(`✅ Profile updated for user ${userId} to ${plan} plan`);
        }
      }
      
      break;
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      console.log(`📝 Subscription updated: ${subscription.id}, status: ${subscription.status}`);
      
      // Update subscription status
      const { error } = await getSupabaseAdmin()
        .from('profiles')
        .update({ 
          subscription_status: subscription.status,
        })
        .eq('subscription_id', subscription.id);
      
      if (error) {
        console.error('Error updating subscription status:', error);
      }
      
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      console.log(`❌ Subscription canceled: ${subscription.id}`);
      
      // Downgrade to free plan
      const { error } = await getSupabaseAdmin()
        .from('profiles')
        .update({ 
          plan: 'free',
          subscription_status: 'canceled',
          documents_limit: 3,
        })
        .eq('subscription_id', subscription.id);
      
      if (error) {
        console.error('Error downgrading user:', error);
      }
      
      break;
    }

    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice;
      console.log(`💰 Payment succeeded: ${invoice.id}`);
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      console.log(`⚠️ Payment failed: ${invoice.id}`);
      // Note: Would need to look up subscription from customer ID
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
