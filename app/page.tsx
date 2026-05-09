"use client";

import { useState } from "react";

const screens = ["home", "catalogue", "detail"] as const;
type Screen = (typeof screens)[number];

const names: Record<Screen, string> = {
  home: "Public Homepage",
  catalogue: "Approved Buyer Catalogue",
  detail: "Product Detail + Trade Application",
};

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

export default function GreenridgeExactDemoV2() {
  const [current, setCurrent] = useState<Screen>("home");
  const [approved, setApproved] = useState(false);
  const [showClicks, setShowClicks] = useState(false);
  const [toast, setToast] = useState("");
  const [modal, setModal] = useState<"trade" | "quote" | "info" | null>(null);
  const [info, setInfo] = useState({ title: "", body: "" });
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  function notify(message: string) {
    setToast(message);
    setTimeout(() => setToast(""), 1800);
  }

  function go(screen: Screen) {
    setCurrent(screen);
    if (screen === "catalogue" || screen === "detail") setApproved(true);
    if (screen === "home") setApproved(false);
  }

  function approveBuyer() {
    setApproved(true);
    setCurrent("catalogue");
    notify("Buyer approved — catalogue opened");
  }

  function openInfo(title: string, body: string) {
    setInfo({ title, body });
    setStatus("");
    setModal("info");
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

      setStatus("✅ Application saved in Supabase. We will contact you shortly.");
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

      setStatus("✅ Quote request saved in Supabase. We will confirm stock, freight and final pricing.");
      event.currentTarget.reset();
    } catch (error) {
      setStatus(`❌ ${error instanceof Error ? error.message : "Could not save quote."}`);
    } finally {
      setSaving(false);
    }
  }

  function previous() {
    const index = screens.indexOf(current);
    go(screens[(index - 1 + screens.length) % screens.length]);
  }

  function next() {
    const index = screens.indexOf(current);
    go(screens[(index + 1) % screens.length]);
  }

  return (
    <main>
      <header className="topbar">
        <div className="topInner">
          <div className="brand">
            <div className="brandIcon">♧</div>
            <div>
              <div className="brandTitle">Wholesale Green Co</div>
              <div className="brandSub">Wholesale Plants</div>
            </div>
          </div>

          <div className="controls">
            <div className={`modePill ${approved ? "approved" : ""}`}>
              <span className="modeDot" />
              <span>{approved ? "Approved Buyer" : "Public Visitor"}</span>
            </div>
            <button className="btn soft" onClick={() => setShowClicks(!showClicks)}>
              {showClicks ? "Hide Click Areas" : "Show Click Areas"}
            </button>
            <button className="btn" onClick={() => go("home")}>Homepage</button>
            <button className="btn" onClick={() => go("catalogue")}>Catalogue</button>
            <button className="btn" onClick={() => go("detail")}>Product Detail</button>
            <button className="btn dark" onClick={() => (approved ? go("home") : approveBuyer())}>
              {approved ? "Set Public Visitor" : "Approve Buyer"}
            </button>
          </div>
        </div>
      </header>

      <section className="workspace">
        <div className="intro">
          <div>
            <h1>Wholesale Green Co Exact Demo V2</h1>
            <p>
              This is the exact visual version you liked, now connected to Supabase for real trade applications and quote requests.
            </p>
          </div>
          <div className="controls extraControls">
            <button className="btn" onClick={() => go("home")}>Start Public Flow</button>
            <button className="btn dark" onClick={approveBuyer}>Jump to Approved Flow</button>
          </div>
        </div>

        <section className="screenCard">
          <div className="screenToolbar">
            <div className="screenName">
              <span />
              <strong>{names[current]}</strong>
            </div>
            <div className="screenActions">
              <button className="btn" onClick={previous}>← Previous</button>
              <button className="btn" onClick={next}>Next →</button>
            </div>
          </div>

          <div className={`viewer ${showClicks ? "showClicks" : ""}`}>
            {screens.map((screen) => (
              <div className={`screen ${current === screen ? "active" : ""}`} key={screen}>
                <img src={screenImages[screen]} alt={names[screen]} />

                {screen === "home" && (
                  <>
                    <button className="hotspot" style={{ left: "5.4%", top: "31.8%", width: "12.7%", height: "4.6%" }} onClick={() => go("catalogue")} />
                    <button className="hotspot" style={{ left: "17.6%", top: "31.8%", width: "13.2%", height: "4.6%" }} onClick={() => setModal("trade")} />
                    <button className="hotspot" style={{ left: "80.2%", top: "1.5%", width: "8.2%", height: "3.8%" }} onClick={() => go("catalogue")} />
                    <button className="hotspot" style={{ left: "89.2%", top: "1.5%", width: "9.6%", height: "3.8%" }} onClick={() => setModal("trade")} />
                    <button className="hotspot" style={{ left: "5.3%", top: "64.0%", width: "10.8%", height: "21.8%" }} onClick={() => go("detail")} />
                    <button className="hotspot" style={{ left: "16.5%", top: "64.0%", width: "10.8%", height: "21.8%" }} onClick={() => go("detail")} />
                    <button className="hotspot" style={{ left: "27.7%", top: "64.0%", width: "10.8%", height: "21.8%" }} onClick={() => go("detail")} />
                  </>
                )}

                {screen === "catalogue" && (
                  <>
                    <button className="hotspot" style={{ left: "11.6%", top: "52.7%", width: "9.2%", height: "31.0%" }} onClick={() => go("detail")} />
                    <button className="hotspot" style={{ left: "22.0%", top: "52.7%", width: "9.2%", height: "31.0%" }} onClick={() => go("detail")} />
                    <button className="hotspot" style={{ left: "32.4%", top: "52.7%", width: "9.2%", height: "31.0%" }} onClick={() => go("detail")} />
                    <button className="hotspot" style={{ left: "42.8%", top: "52.7%", width: "9.2%", height: "31.0%" }} onClick={() => go("detail")} />
                    <button className="hotspot" style={{ left: "78.0%", top: "87.2%", width: "18.5%", height: "5.5%" }} onClick={() => setModal("quote")} />
                    <button className="hotspot" style={{ left: "81.0%", top: "25.8%", width: "15.4%", height: "10.8%" }} onClick={() => openInfo("Bulk order cart is active", "The live quote button now saves a formal quote request and demo cart items into Supabase.")} />
                    <button className="hotspot" style={{ left: "89.0%", top: "1.2%", width: "9.1%", height: "4.4%" }} onClick={() => setModal("trade")} />
                  </>
                )}

                {screen === "detail" && (
                  <>
                    <button className="hotspot" style={{ left: "2.3%", top: "8.2%", width: "3.6%", height: "2.8%" }} onClick={() => go("home")} />
                    <button className="hotspot" style={{ left: "25.4%", top: "73.0%", width: "22.6%", height: "4.9%" }} onClick={() => openInfo("Added to bulk order", "This simulates adding 100 units to the approved buyer bulk order cart.")} />
                    <button className="hotspot" style={{ left: "50.2%", top: "79.1%", width: "22.6%", height: "5.0%" }} onClick={() => setModal("trade")} />
                    <button className="hotspot" style={{ left: "74.8%", top: "30.0%", width: "20.1%", height: "12.6%" }} onClick={approveBuyer} />
                    <button className="hotspot" style={{ left: "74.8%", top: "46.2%", width: "20.1%", height: "43.4%" }} onClick={() => openInfo("Wholesale plants FAQ", "FAQ section covers minimum order quantities, freight, volume discounts and custom sourcing.")} />
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="bottomPanel">
          <div className="infoCard"><b>Exact visual style</b><span>Uses the preferred V2 template screens.</span></div>
          <div className="infoCard"><b>Supabase connected</b><span>Trade application and quote request forms save to your database.</span></div>
          <div className="infoCard"><b>No overlapping</b><span>Controls are outside the screen image area.</span></div>
          <div className="infoCard"><b>Working flow</b><span>Click through homepage, catalogue, detail, quote and application actions.</span></div>
        </div>
      </section>

      {modal && (
        <div className="modal" onClick={() => setModal(null)}>
          <div className="modalCard" onClick={(e) => e.stopPropagation()}>
            {modal === "trade" && (
              <form onSubmit={submitTrade}>
                <div className="modalMini">Trade Application</div>
                <h2>Apply for wholesale access</h2>
                <p>This form saves directly into Supabase table: trade_applications.</p>
                <div className="formGrid">
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
                {status && <div className="statusBox">{status}</div>}
                <div className="modalActions">
                  <button className="btn dark" disabled={saving}>{saving ? "Saving..." : "Submit Application"}</button>
                  <button type="button" className="btn" onClick={() => setModal(null)}>Close</button>
                </div>
              </form>
            )}

            {modal === "quote" && (
              <form onSubmit={submitQuote}>
                <div className="modalMini">Formal Quote</div>
                <h2>Request formal quote</h2>
                <p>This saves into Supabase tables: quote_requests and quote_items.</p>
                <div className="cartPreview">
                  Demo cart: Sword Fern × 250, White Agapanthus × 150, Chives × 200
                </div>
                <div className="formGrid">
                  <input name="buyer_email" required type="email" placeholder="Buyer Email *" />
                  <input name="buyer_name" placeholder="Buyer Name" />
                  <input name="business_name" placeholder="Business Name" />
                  <input name="phone" placeholder="Phone" />
                  <input name="delivery_suburb" placeholder="Delivery Suburb" />
                  <textarea name="notes" placeholder="Notes" />
                </div>
                {status && <div className="statusBox">{status}</div>}
                <div className="modalActions">
                  <button className="btn dark" disabled={saving}>{saving ? "Saving..." : "Submit Quote Request"}</button>
                  <button type="button" className="btn" onClick={() => setModal(null)}>Close</button>
                </div>
              </form>
            )}

            {modal === "info" && (
              <>
                <div className="modalMini">Demo Action</div>
                <h2>{info.title}</h2>
                <p>{info.body}</p>
                <div className="modalActions">
                  <button className="btn dark" onClick={() => setModal(null)}>Close</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {toast && <div className="toast show">{toast}</div>}
    </main>
  );
}
