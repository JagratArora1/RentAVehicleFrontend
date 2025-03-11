import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-02-24.acacia", // Use the latest stable API version
  typescript: true
});

// **Export POST handler properly for Next.js API Routes**
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { totalPrice } = body;

    if (!totalPrice) {
      return NextResponse.json({ error: "Total price is required" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Vehicle Booking",
            },
            unit_amount: Math.round(totalPrice * 100), // Convert to paise
          },
          quantity: 1,
        },
      ],
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
