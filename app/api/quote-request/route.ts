import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const items = Array.isArray(body.items) ? body.items : [];

    if (!body.buyer_email) {
      return NextResponse.json({ ok: false, error: "Buyer email is required." }, { status: 400 });
    }

    if (items.length === 0) {
      return NextResponse.json({ ok: false, error: "Please add at least one plant to quote." }, { status: 400 });
    }

    const totalPlants = items.reduce((sum: number, item: any) => sum + Number(item.quantity || 0), 0);
    const estimatedTotal = items.reduce((sum: number, item: any) => sum + Number(item.quantity || 0) * Number(item.trade_price || 0), 0);

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
      return NextResponse.json({ ok: false, error: quoteError.message }, { status: 500 });
    }

    const rows = items.map((item: any) => ({
      quote_request_id: quote.id,
      product_name: item.product_name,
      quantity: Number(item.quantity || 0),
      trade_price: Number(item.trade_price || 0),
      project_price: Number(item.project_price || 0),
      line_total: Number(item.quantity || 0) * Number(item.trade_price || 0),
    }));

    const { error: itemError } = await supabase.from("quote_items").insert(rows);

    if (itemError) {
      return NextResponse.json({ ok: false, error: itemError.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: quote.id });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
