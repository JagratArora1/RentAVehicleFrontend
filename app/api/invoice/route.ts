import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-02-24.acacia",
});

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const invoiceId = session.invoice as string;

    if (!invoiceId) {
      return NextResponse.json({ error: "No invoice found for this session" }, { status: 404 });
    }

    const invoice = await stripe.invoices.retrieve(invoiceId);
    return NextResponse.json({ invoiceUrl: invoice.hosted_invoice_url });
  } catch (error) {
    console.error("Error fetching invoice:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
