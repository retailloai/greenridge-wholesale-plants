import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.business_name || !body.email) {
      return NextResponse.json({ ok: false, error: "Business name and email are required." }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("trade_applications")
      .insert({
        business_name: body.business_name,
        abn: body.abn || null,
        buyer_type: body.buyer_type || null,
        delivery_suburb: body.delivery_suburb || null,
        expected_monthly_volume: body.expected_monthly_volume || null,
        email: body.email,
        phone: body.phone || null,
        message: body.message || null,
        status: "pending",
      })
      .select("id")
      .single();

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

    return NextResponse.json({ ok: true, id: data.id });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
