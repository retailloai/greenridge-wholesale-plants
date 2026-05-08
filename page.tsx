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

export default function GreenridgeExactDemoV2() {
  const [current, setCurrent] = useState<Screen>("home");
  const [approved, setApproved] = useState(false);
  const [showClicks, setShowClicks] = useState(false);
  const [toast, setToast] = useState("");
  const [modal, setModal] = useState<null | {
    mini: string;
    title: string;
    body: string;
    actions?: { label: string; primary?: boolean; screen?: Screen; approve?: boolean }[];
  }>(null);

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

  function next() {
    const index = screens.indexOf(current);
    go(screens[(index + 1) % screens.length]);
  }

  function previous() {
    const index = screens.indexOf(current);
    go(screens[(index - 1 + screens.length) % screens.length]);
  }

  function openModal(type: string) {
    if (type === "quote") {
      setModal({
        mini: "Quote Flow",
        title: "Formal quote request sent",
        body:
          "In the live website this would email your team, save the enquiry, and create the quote workflow.",
        actions: [
          { label: "Back to Catalogue", primary: true, screen: "catalogue" },
          { label: "View Product Detail", screen: "detail" },
        ],
      });
    }

    if (type === "cart") {
      setModal({
        mini: "Bulk Cart",
        title: "Bulk order cart is active",
        body:
          "This approved buyer screen shows selected products, quantities, trade subtotal, project pricing and the formal quote button.",
      });
    }

    if (type === "add") {
      notify("Added 100 units to bulk order");
      setModal({
        mini: "Bulk Order",
        title: "Added to bulk order",
        body:
          "This simulates adding 100 units to the approved buyer cart.",
        actions: [
          { label: "Go to Catalogue", primary: true, screen: "catalogue" },
          { label: "Stay on Product", screen: "detail" },
        ],
      });
    }

    if (type === "apply") {
      notify("Trade application submitted");
      setModal({
        mini: "Trade Application",
        title: "Application received",
        body:
          "In the live website this form would save the buyer details and notify your team for approval.",
        actions: [
          { label: "Approve Buyer Demo", primary: true, screen: "catalogue", approve: true },
          { label: "Close", screen: "detail" },
        ],
      });
    }

    if (type === "approve") {
      setApproved(true);
      notify("Demo buyer approved");
      setModal({
        mini: "Demo Approval",
        title: "Buyer approved for trade pricing",
        body:
          "This simulates the admin approval state. The buyer can now view prices and submit bulk order enquiries.",
      });
    }

    if (type === "faq") {
      setModal({
        mini: "FAQ Section",
        title: "Wholesale plants FAQ",
        body:
          "This area answers buyer questions about minimum order quantities, freight, delivery, volume discounts and custom sourcing.",
      });
    }
  }

  return (
    <main>
      <header className="topbar">
        <div className="topInner">
          <div className="brand">
            <div className="brandIcon">♧</div>
            <div>
              <div className="brandTitle">Greenridge</div>
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
            <h1>Greenridge Single-File Exact Demo V2</h1>
            <p>
              This is the same exact-style demo you liked, now packaged for Vercel.
              It uses your preferred template screens with working click actions.
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
                    <button className="hotspot" style={{ left: "17.6%", top: "31.8%", width: "13.2%", height: "4.6%" }} onClick={() => go("detail")} />
                    <button className="hotspot" style={{ left: "80.2%", top: "1.5%", width: "8.2%", height: "3.8%" }} onClick={() => go("catalogue")} />
                    <button className="hotspot" style={{ left: "89.2%", top: "1.5%", width: "9.6%", height: "3.8%" }} onClick={() => go("detail")} />
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
                    <button className="hotspot" style={{ left: "78.0%", top: "87.2%", width: "18.5%", height: "5.5%" }} onClick={() => openModal("quote")} />
                    <button className="hotspot" style={{ left: "81.0%", top: "25.8%", width: "15.4%", height: "10.8%" }} onClick={() => openModal("cart")} />
                    <button className="hotspot" style={{ left: "89.0%", top: "1.2%", width: "9.1%", height: "4.4%" }} onClick={() => go("detail")} />
                  </>
                )}

                {screen === "detail" && (
                  <>
                    <button className="hotspot" style={{ left: "2.3%", top: "8.2%", width: "3.6%", height: "2.8%" }} onClick={() => go("home")} />
                    <button className="hotspot" style={{ left: "25.4%", top: "73.0%", width: "22.6%", height: "4.9%" }} onClick={() => openModal("add")} />
                    <button className="hotspot" style={{ left: "50.2%", top: "79.1%", width: "22.6%", height: "5.0%" }} onClick={() => openModal("apply")} />
                    <button className="hotspot" style={{ left: "74.8%", top: "30.0%", width: "20.1%", height: "12.6%" }} onClick={() => openModal("approve")} />
                    <button className="hotspot" style={{ left: "74.8%", top: "46.2%", width: "20.1%", height: "43.4%" }} onClick={() => openModal("faq")} />
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="bottomPanel">
          <div className="infoCard"><b>Exact visual style</b><span>Uses the preferred Greenridge V2 template screens.</span></div>
          <div className="infoCard"><b>No overlapping</b><span>The demo controls are outside the screen image area.</span></div>
          <div className="infoCard"><b>Clear images</b><span>Screen images are served from the public folder at full width.</span></div>
          <div className="infoCard"><b>Working flow</b><span>Click through homepage, catalogue, detail, quote and application actions.</span></div>
        </div>
      </section>

      {modal && (
        <div className="modal" onClick={() => setModal(null)}>
          <div className="modalCard" onClick={(e) => e.stopPropagation()}>
            <div className="modalMini">{modal.mini}</div>
            <h2>{modal.title}</h2>
            <p>{modal.body}</p>
            <div className="modalActions">
              {(modal.actions || [{ label: "Close", primary: true }]).map((action) => (
                <button
                  key={action.label}
                  className={`btn ${action.primary ? "dark" : ""}`}
                  onClick={() => {
                    setModal(null);
                    if (action.approve) setApproved(true);
                    if (action.screen) go(action.screen);
                  }}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {toast && <div className="toast show">{toast}</div>}

      <style jsx>{`
        .topbar {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(255, 254, 248, 0.96);
          border-bottom: 1px solid rgba(13, 49, 35, 0.12);
          backdrop-filter: blur(14px);
        }

        .topInner {
          width: min(1760px, calc(100% - 32px));
          margin: 0 auto;
          min-height: 76px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 220px;
        }

        .brandIcon {
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          border-radius: 14px;
          border: 1px solid rgba(13, 49, 35, 0.12);
          background: white;
          color: #074433;
          font-size: 25px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
        }

        .brandTitle {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 27px;
          line-height: 1;
          font-weight: 900;
          color: #074433;
          letter-spacing: -0.04em;
        }

        .brandSub {
          margin-top: 3px;
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #627067;
          font-weight: 900;
        }

        .controls {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 9px;
          flex-wrap: wrap;
        }

        .modePill {
          display: flex;
          align-items: center;
          gap: 8px;
          background: white;
          border: 1px solid rgba(13, 49, 35, 0.12);
          padding: 11px 14px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 900;
          color: #074433;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.04);
        }

        .modeDot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #aeb8b1;
        }

        .modePill.approved .modeDot {
          background: #2aaa62;
        }

        .btn {
          cursor: pointer;
          background: white;
          border: 1px solid rgba(13, 49, 35, 0.12);
          color: #074433;
          padding: 11px 14px;
          border-radius: 14px;
          font-size: 13px;
          font-weight: 900;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.04);
          transition: 0.18s ease;
        }

        .btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.07);
        }

        .btn.dark {
          background: linear-gradient(135deg, #0a6b4e, #073b31);
          border-color: transparent;
          color: white;
        }

        .btn.soft {
          background: #edf5e8;
        }

        .workspace {
          width: min(1760px, calc(100% - 32px));
          margin: 18px auto 34px;
        }

        .intro {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }

        .intro h1 {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 26px;
          line-height: 1.1;
          color: #074433;
        }

        .intro p {
          margin: 5px 0 0;
          color: #526158;
          line-height: 1.55;
          font-size: 14px;
        }

        .screenCard {
          background: white;
          border: 1px solid rgba(255, 255, 255, 0.75);
          border-radius: 24px;
          box-shadow: 0 18px 55px rgba(15, 55, 40, 0.14);
          overflow: hidden;
        }

        .screenToolbar {
          min-height: 52px;
          border-bottom: 1px solid rgba(13, 49, 35, 0.12);
          background: linear-gradient(180deg, #fffefb, #f6f8f0);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 10px 14px;
        }

        .screenName {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          font-weight: 900;
          color: #074433;
        }

        .screenName span {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #0b684c;
        }

        .screenActions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .viewer {
          position: relative;
          background: #f7f8f1;
          overflow: auto;
        }

        .screen {
          display: none;
          position: relative;
          width: 100%;
        }

        .screen.active {
          display: block;
        }

        .screen img {
          display: block;
          width: 100%;
          height: auto;
          max-width: 100%;
          object-fit: contain;
          background: #fffef8;
        }

        .hotspot {
          position: absolute;
          cursor: pointer;
          background: rgba(11, 104, 76, 0.02);
          border: 0;
          border-radius: 12px;
          opacity: 0;
          transition: 0.18s ease;
        }

        .showClicks .hotspot {
          opacity: 1;
          background: rgba(11, 104, 76, 0.14);
          outline: 2px dashed rgba(11, 104, 76, 0.55);
        }

        .hotspot:hover {
          opacity: 1;
          background: rgba(11, 104, 76, 0.18);
          outline: 2px solid rgba(11, 104, 76, 0.48);
        }

        .bottomPanel {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
          margin-top: 14px;
        }

        .infoCard {
          border: 1px solid rgba(13, 49, 35, 0.12);
          background: rgba(255, 255, 255, 0.76);
          border-radius: 18px;
          padding: 14px 15px;
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.04);
          min-height: 94px;
        }

        .infoCard b {
          display: block;
          color: #074433;
          margin-bottom: 6px;
          font-size: 14px;
        }

        .infoCard span {
          display: block;
          color: #526158;
          font-size: 13px;
          line-height: 1.5;
        }

        .modal {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
          background: rgba(7, 44, 33, 0.5);
          backdrop-filter: blur(7px);
        }

        .modalCard {
          width: min(560px, 94vw);
          background: #fffef8;
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 26px;
          padding: 28px;
          box-shadow: 0 28px 80px rgba(0, 0, 0, 0.28);
        }

        .modalMini {
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #6a7c72;
          margin-bottom: 8px;
        }

        .modalCard h2 {
          font-family: Georgia, "Times New Roman", serif;
          margin: 0;
          color: #074433;
          font-size: 34px;
          line-height: 1.1;
        }

        .modalCard p {
          color: #53635a;
          line-height: 1.7;
          margin: 14px 0 0;
        }

        .modalActions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 20px;
        }

        .toast {
          position: fixed;
          left: 50%;
          bottom: 26px;
          transform: translateX(-50%) translateY(16px);
          background: #074433;
          color: white;
          padding: 14px 18px;
          border-radius: 16px;
          font-weight: 900;
          font-size: 14px;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.22);
          opacity: 1;
          pointer-events: none;
          transition: 0.25s ease;
          z-index: 120;
        }

        @media (max-width: 1100px) {
          .bottomPanel {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 760px) {
          .topInner,
          .workspace {
            width: min(100% - 20px, 1760px);
          }

          .topInner {
            align-items: flex-start;
            flex-direction: column;
            padding: 12px 0;
          }

          .controls {
            width: 100%;
            justify-content: flex-start;
          }

          .brandTitle {
            font-size: 23px;
          }

          .screenToolbar {
            align-items: flex-start;
            flex-direction: column;
          }

          .bottomPanel {
            grid-template-columns: 1fr;
          }

          .btn,
          .modePill {
            font-size: 12px;
            padding: 10px 12px;
          }
        }
      `}</style>
    </main>
  );
}
