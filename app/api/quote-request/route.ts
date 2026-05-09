import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/app/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const FROM_EMAIL =
  process.env.FROM_EMAIL || "Wholesale Green Co <onboarding@resend.dev>";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const items = Array.isArray(body.items) ? body.items : [];

    if (!body.buyer_email) {
      return NextResponse.json(
        { ok: false, error: "Buyer email is required." },
        { status: 400 }
      );
    }

    if (items.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Please add at least one plant to quote." },
        { status: 400 }
      );
    }

    const totalPlants = items.reduce(
      (sum: number, item: any) => sum + Number(item.quantity || 0),
      0
    );

    const estimatedTotal = items.reduce(
      (sum: number, item: any) =>
        sum + Number(item.quantity || 0) * Number(item.trade_price || 0),
      0
    );

    const estimatedProjectTotal = items.reduce(
      (sum: number, item: any) =>
        sum + Number(item.quantity || 0) * Number(item.project_price || 0),
      0
    );

    const { data: quote, error: quoteError } = await supabase
      .from("quote_requests")
      .insert({
        buyer_email: body.buyer_email,
        buyer_name: body.buyer_name || null,
        business_name: body.business_name || null,
        phone: body.phone || null,
        delivery_suburb: body.delivery_suburb || null,
        notes: body.notes || null,
        total_plants: totalPlants,
        estimated_total: estimatedTotal,
        status: "new",
      })
      .select("id")
      .single();

    if (quoteError) {
      return NextResponse.json(
        { ok: false, error: quoteError.message },
        { status: 500 }
      );
    }

    const rows = items.map((item: any) => ({
      quote_request_id: quote.id,
      product_name: item.product_name,
      quantity: Number(item.quantity || 0),
      trade_price: Number(item.trade_price || 0),
      project_price: Number(item.project_price || 0),
      line_total: Number(item.quantity || 0) * Number(item.trade_price || 0),
    }));

    const { error: itemError } = await supabase
      .from("quote_items")
      .insert(rows);

    if (itemError) {
      return NextResponse.json(
        { ok: false, error: itemError.message },
        { status: 500 }
      );
    }

    const itemRowsHtml = items
      .map((item: any) => {
        const quantity = Number(item.quantity || 0);
        const tradePrice = Number(item.trade_price || 0);
        const projectPrice = Number(item.project_price || 0);
        const lineTotal = quantity * tradePrice;

        return `
          <tr>
            <td style="padding:10px; border:1px solid #ddd;">${item.product_name || ""}</td>
            <td style="padding:10px; border:1px solid #ddd; text-align:right;">${quantity.toLocaleString()}</td>
            <td style="padding:10px; border:1px solid #ddd; text-align:right;">$${tradePrice.toFixed(2)}</td>
            <td style="padding:10px; border:1px solid #ddd; text-align:right;">$${projectPrice.toFixed(2)}</td>
            <td style="padding:10px; border:1px solid #ddd; text-align:right;">$${lineTotal.toFixed(2)}</td>
          </tr>
        `;
      })
      .join("");

    if (ADMIN_EMAIL && process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `New Quote Request - ${body.business_name || body.buyer_email}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 760px; margin: 0 auto; color: #0b3b2e;">
            <h1 style="color:#063b2d;">New Wholesale Quote Request</h1>
            <p>A new formal quote request has been submitted from the website.</p>

            <h2 style="margin-top:24px;">Buyer Details</h2>
            <table style="width:100%; border-collapse:collapse;">
              <tr>
                <td style="padding:10px; border:1px solid #ddd;"><strong>Business Name</strong></td>
                <td style="padding:10px; border:1px solid #ddd;">${body.business_name || ""}</td>
              </tr>
              <tr>
                <td style="padding:10px; border:1px solid #ddd;"><strong>Buyer Name</strong></td>
                <td style="padding:10px; border:1px solid #ddd;">${body.buyer_name || ""}</td>
              </tr>
              <tr>
                <td style="padding:10px; border:1px solid #ddd;"><strong>Email</strong></td>
                <td style="padding:10px; border:1px solid #ddd;">${body.buyer_email || ""}</td>
              </tr>
              <tr>
                <td style="padding:10px; border:1px solid #ddd;"><strong>Phone</strong></td>
                <td style="padding:10px; border:1px solid #ddd;">${body.phone || ""}</td>
              </tr>
              <tr>
                <td style="padding:10px; border:1px solid #ddd;"><strong>Delivery Suburb</strong></td>
                <td style="padding:10px; border:1px solid #ddd;">${body.delivery_suburb || ""}</td>
              </tr>
              <tr>
                <td style="padding:10px; border:1px solid #ddd;"><strong>Notes</strong></td>
                <td style="padding:10px; border:1px solid #ddd;">${body.notes || ""}</td>
              </tr>
            </table>

            <h2 style="margin-top:24px;">Quote Items</h2>
            <table style="width:100%; border-collapse:collapse;">
              <thead>
                <tr>
                  <th style="padding:10px; border:1px solid #ddd; text-align:left;">Product</th>
                  <th style="padding:10px; border:1px solid #ddd; text-align:right;">Qty</th>
                  <th style="padding:10px; border:1px solid #ddd; text-align:right;">Trade</th>
                  <th style="padding:10px; border:1px solid #ddd; text-align:right;">Project</th>
                  <th style="padding:10px; border:1px solid #ddd; text-align:right;">Line Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemRowsHtml}
              </tbody>
            </table>

            <h2 style="margin-top:24px;">Summary</h2>
            <p><strong>Total plants:</strong> ${totalPlants.toLocaleString()}</p>
            <p><strong>Estimated trade subtotal:</strong> $${estimatedTotal.toFixed(2)}</p>
            <p><strong>Estimated project pricing:</strong> from $${estimatedProjectTotal.toFixed(2)}</p>
            <p><strong>Supabase quote ID:</strong> ${quote.id}</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ ok: true, id: quote.id });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
