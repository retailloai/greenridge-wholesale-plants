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

    if (!body.business_name || !body.email) {
      return NextResponse.json(
        { ok: false, error: "Business name and email are required." },
        { status: 400 }
      );
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

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    if (ADMIN_EMAIL && process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `New Trade Application - ${body.business_name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 680px; margin: 0 auto; color: #0b3b2e;">
            <h1 style="color:#063b2d;">New Trade Application</h1>
            <p>A new wholesale access application has been submitted from the website.</p>

            <table style="width:100%; border-collapse:collapse; margin-top:20px;">
              <tr>
                <td style="padding:10px; border:1px solid #ddd;"><strong>Business Name</strong></td>
                <td style="padding:10px; border:1px solid #ddd;">${body.business_name || ""}</td>
              </tr>
              <tr>
                <td style="padding:10px; border:1px solid #ddd;"><strong>ABN</strong></td>
                <td style="padding:10px; border:1px solid #ddd;">${body.abn || ""}</td>
              </tr>
              <tr>
                <td style="padding:10px; border:1px solid #ddd;"><strong>Buyer Type</strong></td>
                <td style="padding:10px; border:1px solid #ddd;">${body.buyer_type || ""}</td>
              </tr>
              <tr>
                <td style="padding:10px; border:1px solid #ddd;"><strong>Delivery Suburb</strong></td>
                <td style="padding:10px; border:1px solid #ddd;">${body.delivery_suburb || ""}</td>
              </tr>
              <tr>
                <td style="padding:10px; border:1px solid #ddd;"><strong>Expected Monthly Volume</strong></td>
                <td style="padding:10px; border:1px solid #ddd;">${body.expected_monthly_volume || ""}</td>
              </tr>
              <tr>
                <td style="padding:10px; border:1px solid #ddd;"><strong>Email</strong></td>
                <td style="padding:10px; border:1px solid #ddd;">${body.email || ""}</td>
              </tr>
              <tr>
                <td style="padding:10px; border:1px solid #ddd;"><strong>Phone</strong></td>
                <td style="padding:10px; border:1px solid #ddd;">${body.phone || ""}</td>
              </tr>
              <tr>
                <td style="padding:10px; border:1px solid #ddd;"><strong>Message</strong></td>
                <td style="padding:10px; border:1px solid #ddd;">${body.message || ""}</td>
              </tr>
            </table>

            <p style="margin-top:20px;">
              Supabase application ID: <strong>${data.id}</strong>
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({ ok: true, id: data.id });
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
