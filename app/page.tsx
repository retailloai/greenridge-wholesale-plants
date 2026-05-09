"use client";

import { useState } from "react";

type Screen = "home" | "catalogue" | "detail";

const screenImages: Record<Screen, string> = {
  home: "/screens/home.png",
  catalogue: "/screens/catalogue.png",
  detail: "/screens/detail.png",
};

const demoItems = [
  { product_name: "Sword Fern", quantity: 250, trade_price: 1.75, project_price: 1.65 },
  { product_name: "White Agapanthus", quantity: 150, trade_price: 2.35, project_price: 2.15 },
  { product_name: "Chives", quantity: 200, trade_price: 1.45, project_price: 1.35 },
];

async function postJson(url: string, payload: unknown) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok || !result.ok) {
    throw new Error(result.error || "Request failed");
  }

  return result;
}

export default function WholesaleGreenCoCleanLive() {
  const [screen, setScreen] = useState<Screen>("home");
  const [modal, setModal] = useState<"trade" | "quote" | null>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  function go(nextScreen: Screen) {
    setScreen(nextScreen);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submitTrade(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setStatus("");

    const form = new FormData(event.currentTarget);

    try {
      await postJson("/api/trade-application", {
        business_name: form.get("business_name"),
        abn: form.get("abn"),
        buyer_type: form.get("buyer_type"),
        delivery_suburb: form.get("delivery_suburb"),
        expected_monthly_volume: form.get("expected_monthly_volume"),
        email: form.get("email"),
        phone: form.get("phone"),
        message: form.get("message"),
      });

      setStatus("✅ Application received. We will contact you shortly.");
      event.currentTarget.reset();
    } catch (error) {
      setStatus(`❌ ${error instanceof Error ? error.message : "Could not save application."}`);
    } finally {
      setSaving(false);
    }
  }

  async function submitQuote(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setStatus("");

    const form = new FormData(event.currentTarget);

    try {
      await postJson("/api/quote-request", {
        buyer_email: form.get("buyer_email"),
        buyer_name: form.get("buyer_name"),
        business_name: form.get("business_name"),
        phone: form.get("phone"),
        delivery_suburb: form.get("delivery_suburb"),
        notes: form.get("notes"),
        items: demoItems,
      });

      setStatus("✅ Quote request received. We will confirm stock, freight and final pricing.");
      event.currentTarget.reset();
    } catch (error) {
      setStatus(`❌ ${error instanceof Error ? error.message : "Could not save quote."}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="clean-page">
      <section className="screen-wrap">
        <img className="screen-image" src={screenImages[screen]} alt="Wholesale Green Co" />

        {screen === "home" && (
          <>
            <button className="hotspot" aria-label="Browse plants" style={{ left: "5.4%", top: "31.8%", width: "12.7%", height: "4.6%" }} onClick={() => go("catalogue")} />
            <button className="hotspot" aria-label="Apply for trade access" style={{ left: "17.6%", top: "31.8%", width: "13.2%", height: "4.6%" }} onClick={() => { setStatus(""); setModal("trade"); }} />
            <button className="hotspot" aria-label="Trade sign in" style={{ left: "80.2%", top: "1.5%", width: "8.2%", height: "3.8%" }} onClick={() => go("catalogue")} />
            <button className="hotspot" aria-label="Apply for trade access" style={{ left: "89.2%", top: "1.5%", width: "9.6%", height: "3.8%" }} onClick={() => { setStatus(""); setModal("trade"); }} />
            <button className="hotspot" aria-label="Featured product" style={{ left: "5.3%", top: "64.0%", width: "10.8%", height: "21.8%" }} onClick={() => go("detail")} />
            <button className="hotspot" aria-label="Featured product" style={{ left: "16.5%", top: "64.0%", width: "10.8%", height: "21.8%" }} onClick={() => go("detail")} />
            <button className="hotspot" aria-label="Featured product" style={{ left: "27.7%", top: "64.0%", width: "10.8%", height: "21.8%" }} onClick={() => go("detail")} />
          </>
        )}

        {screen === "catalogue" && (
          <>
            <button className="hotspot" aria-label="Product detail" style={{ left: "11.6%", top: "52.7%", width: "9.2%", height: "31.0%" }} onClick={() => go("detail")} />
            <button className="hotspot" aria-label="Product detail" style={{ left: "22.0%", top: "52.7%", width: "9.2%", height: "31.0%" }} onClick={() => go("detail")} />
            <button className="hotspot" aria-label="Product detail" style={{ left: "32.4%", top: "52.7%", width: "9.2%", height: "31.0%" }} onClick={() => go("detail")} />
            <button className="hotspot" aria-label="Product detail" style={{ left: "42.8%", top: "52.7%", width: "9.2%", height: "31.0%" }} onClick={() => go("detail")} />
            <button className="hotspot" aria-label="Request quote" style={{ left: "78.0%", top: "87.2%", width: "18.5%", height: "5.5%" }} onClick={() => { setStatus(""); setModal("quote"); }} />
            <button className="hotspot" aria-label="Apply for trade access" style={{ left: "89.0%", top: "1.2%", width: "9.1%", height: "4.4%" }} onClick={() => { setStatus(""); setModal("trade"); }} />
          </>
        )}

        {screen === "detail" && (
          <>
            <button className="hotspot" aria-label="Home" style={{ left: "2.3%", top: "8.2%", width: "3.6%", height: "2.8%" }} onClick={() => go("home")} />
            <button className="hotspot" aria-label="Add to bulk order" style={{ left: "25.4%", top: "73.0%", width: "22.6%", height: "4.9%" }} onClick={() => go("catalogue")} />
            <button className="hotspot" aria-label="Apply for wholesale access" style={{ left: "50.2%", top: "79.1%", width: "22.6%", height: "5.0%" }} onClick={() => { setStatus(""); setModal("trade"); }} />
          </>
        )}
      </section>

      <div className="hidden-nav">
        <button onClick={() => go("home")}>Home</button>
        <button onClick={() => go("catalogue")}>Catalogue</button>
        <button onClick={() => go("detail")}>Detail</button>
      </div>

      {modal && (
        <div className="modal" onClick={() => setModal(null)}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            {modal === "trade" && (
              <form onSubmit={submitTrade}>
                <div className="modal-mini">Trade Application</div>
                <h2>Apply for wholesale access</h2>
                <p>Submit your business details and we will contact you shortly.</p>

                <div className="form-grid">
                  <input name="business_name" required placeholder="Business Name *" />
                  <input name="abn" placeholder="ABN" />
                  <select name="buyer_type">
                    <option>Retail Store</option>
                    <option>Landscaper</option>
                    <option>Grower / Nursery</option>
                    <option>Interior Plant Stylist</option>
                    <option>Developer / Project Buyer</option>
                  </select>
                  <input name="delivery_suburb" placeholder="Delivery Suburb" />
                  <input name="expected_monthly_volume" placeholder="Expected Monthly Volume" />
                  <input name="email" required type="email" placeholder="Email *" />
                  <input name="phone" placeholder="Phone" />
                  <textarea name="message" placeholder="Message" />
                </div>

                {status && <div className="status-box">{status}</div>}

                <div className="actions">
                  <button className="btn dark" disabled={saving}>{saving ? "Submitting..." : "Submit Application"}</button>
                  <button type="button" className="btn" onClick={() => setModal(null)}>Close</button>
                </div>
              </form>
            )}

            {modal === "quote" && (
              <form onSubmit={submitQuote}>
                <div className="modal-mini">Formal Quote</div>
                <h2>Request formal quote</h2>
                <p>Submit your details and we will confirm stock, freight and final project pricing.</p>

                <div className="cart-preview">
                  Selected items: Sword Fern × 250, White Agapanthus × 150, Chives × 200
                </div>

                <div className="form-grid">
                  <input name="buyer_email" required type="email" placeholder="Buyer Email *" />
                  <input name="buyer_name" placeholder="Buyer Name" />
                  <input name="business_name" placeholder="Business Name" />
                  <input name="phone" placeholder="Phone" />
                  <input name="delivery_suburb" placeholder="Delivery Suburb" />
                  <textarea name="notes" placeholder="Notes" />
                </div>

                {status && <div className="status-box">{status}</div>}

                <div className="actions">
                  <button className="btn dark" disabled={saving}>{saving ? "Submitting..." : "Submit Quote Request"}</button>
                  <button type="button" className="btn" onClick={() => setModal(null)}>Close</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
