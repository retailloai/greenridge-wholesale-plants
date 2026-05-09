"use client";

import { useMemo, useState } from "react";

const products = [
  { id: 1, name: "Sword Fern", botanical: "Nephrolepis exaltata", category: "Indoor Plants", available: 500, price: 1.75, project: 1.65, description: "Lush, arching fronds for indoor spaces, shaded gardens and commercial plant styling.", tags: ["Indoor", "Fern"] },
  { id: 2, name: "White Agapanthus", botanical: "Agapanthus Albus", category: "Landscape & Outdoor", available: 500, price: 2.35, project: 2.15, description: "Elegant white blooms on tall stems for borders, feature planting and trade supply.", tags: ["Outdoor", "Flowering"] },
  { id: 3, name: "Anigozanthos Big Red", botanical: "Anigozanthos hybrid", category: "Flowering & Colour", available: 1500, price: 1.75, project: 1.65, description: "Bold flowering impact for retail displays and project-based outdoor orders.", tags: ["Colour", "Outdoor"] },
  { id: 4, name: "Cordyline Pink Diamond", botanical: "Cordyline fruticosa", category: "Indoor Plants", available: 1500, price: 2.0, project: 1.85, description: "Vibrant foliage with strong decorative appeal for indoor plant ranges.", tags: ["Indoor", "Foliage"] },
  { id: 5, name: "Ficus Ruby", botanical: "Ficus elastica", category: "Indoor Plants", available: 1000, price: 1.85, project: 1.75, description: "Stylish indoor foliage with modern retail appeal and premium presentation.", tags: ["Indoor", "Feature"] },
  { id: 6, name: "Lomandra Lime Tuff", botanical: "Lomandra longifolia", category: "Grasses & Groundcovers", available: 20000, price: 1.75, project: 1.65, description: "Large-volume landscape performer for commercial and council projects.", tags: ["Landscape", "Bulk"] },
  { id: 7, name: "Monstera Deliciosa", botanical: "Monstera deliciosa", category: "Indoor Plants", available: 500, price: 2.25, project: 2.1, description: "High-demand indoor favourite for retail, offices and interior greenery.", tags: ["Indoor", "Feature"] },
  { id: 8, name: "Philodendron Birkin", botanical: "Philodendron birkin", category: "Indoor Plants", available: 1000, price: 2.0, project: 1.85, description: "Premium patterned foliage line with strong shelf appeal.", tags: ["Indoor", "Premium"] },
];

type Product = typeof products[number];
type CartItem = Product & { qty: number };

function PlantArt({ name }: { name: string }) {
  return (
    <div className="relative h-48 overflow-hidden rounded-[28px] bg-gradient-to-br from-emerald-100 via-white to-lime-100">
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/70" />
      <div className="absolute -bottom-12 -left-10 h-40 w-40 rounded-full bg-emerald-950/10" />
      <div className="absolute bottom-8 left-1/2 h-20 w-20 -translate-x-1/2 rounded-b-3xl rounded-t-xl bg-stone-950 shadow-xl" />
      <div className="absolute bottom-24 left-1/2 h-20 w-2 -translate-x-1/2 rounded-full bg-emerald-800" />
      {Array.from({ length: 10 }).map((_, i) => {
        const angle = -75 + i * 16;
        return (
          <div
            key={i}
            className="absolute bottom-32 left-1/2 h-16 w-7 origin-bottom rounded-full bg-gradient-to-br from-lime-400 to-emerald-700 shadow-sm"
            style={{ transform: `translateX(-50%) rotate(${angle}deg)` }}
          />
        );
      })}
      <div className="absolute bottom-0 left-1/2 h-10 w-48 -translate-x-1/2 rounded-t-full bg-white/80" />
      <div className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-xs font-black text-emerald-950">{name.slice(0, 1)}</div>
    </div>
  );
}

async function postJson(url: string, payload: unknown) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  if (!response.ok || !result.ok) throw new Error(result.error || "Request failed");
  return result;
}

export default function HomePage() {
  const [approved, setApproved] = useState(false);
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [tradeStatus, setTradeStatus] = useState("");
  const [quoteStatus, setQuoteStatus] = useState("");
  const [savingTrade, setSavingTrade] = useState(false);
  const [savingQuote, setSavingQuote] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((product) =>
      `${product.name} ${product.botanical} ${product.category}`.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const totalPlants = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  function addToCart(product: Product, qty = 100) {
    setApproved(true);
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => item.id === product.id ? { ...item, qty: item.qty + qty } : item);
      }
      return [...prev, { ...product, qty }];
    });
    setCartOpen(true);
  }

  async function submitTrade(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSavingTrade(true);
    setTradeStatus("");

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
      setTradeStatus("✅ Application saved in Supabase. We will contact you shortly.");
      event.currentTarget.reset();
    } catch (error) {
      setTradeStatus(`❌ ${error instanceof Error ? error.message : "Could not save application."}`);
    } finally {
      setSavingTrade(false);
    }
  }

  async function submitQuote(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSavingQuote(true);
    setQuoteStatus("");

    const form = new FormData(event.currentTarget);

    try {
      await postJson("/api/quote-request", {
        buyer_email: form.get("buyer_email"),
        buyer_name: form.get("buyer_name"),
        business_name: form.get("business_name"),
        phone: form.get("phone"),
        delivery_suburb: form.get("delivery_suburb"),
        notes: form.get("notes"),
        items: cart.map((item) => ({
          product_name: item.name,
          quantity: item.qty,
          trade_price: item.price,
          project_price: item.project,
        })),
      });
      setQuoteStatus("✅ Quote request saved in Supabase. We will confirm stock, freight and final pricing.");
      setCart([]);
      setCartOpen(false);
      event.currentTarget.reset();
    } catch (error) {
      setQuoteStatus(`❌ ${error instanceof Error ? error.message : "Could not save quote."}`);
    } finally {
      setSavingQuote(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#fbfaf5] text-stone-900">
      <header className="sticky top-0 z-50 border-b border-stone-200 bg-[#fbfaf5]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4">
          <div>
            <div className="font-serif text-3xl font-black text-emerald-950">Wholesale Green Co</div>
            <div className="text-[10px] font-black uppercase tracking-[0.35em] text-stone-500">Wholesale Plants</div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setApproved(!approved)} className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-emerald-950 shadow-sm ring-1 ring-stone-200">
              {approved ? "✅ Approved Buyer" : "🔒 Trade Sign In"}
            </button>
            <a href="#trade" className="hidden rounded-2xl bg-emerald-950 px-5 py-3 text-sm font-black text-white md:block">Apply for Trade Access</a>
            <button onClick={() => setCartOpen(true)} className="rounded-2xl bg-emerald-950 px-5 py-3 text-sm font-black text-white">Cart {totalPlants ? `(${totalPlants})` : ""}</button>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-[1500px] gap-10 px-5 py-16 lg:grid-cols-2">
        <div className="flex flex-col justify-center">
          <div className="mb-5 w-fit rounded-full bg-white px-6 py-3 text-xs font-black uppercase tracking-[0.32em] text-emerald-900 shadow-sm ring-1 ring-stone-200">Grown for Professionals</div>
          <h1 className="font-serif text-6xl font-black leading-[0.92] tracking-tight text-emerald-950 md:text-8xl">Premium Wholesale Plants for Trade Buyers</h1>
          <p className="mt-7 max-w-2xl text-xl leading-8 text-stone-700">Browse plants publicly, unlock trade pricing when approved, and submit quote requests directly into our live system.</p>
          <div className="mt-8 flex gap-3">
            <a href="#catalogue" className="rounded-2xl bg-emerald-800 px-7 py-4 font-black text-white">Browse Plants →</a>
            <a href="#trade" className="rounded-2xl bg-white px-7 py-4 font-black text-emerald-950 ring-1 ring-stone-200">Apply Access</a>
          </div>
        </div>
        <div className="rounded-[42px] bg-emerald-950 p-6 shadow-2xl">
          <div className="rounded-[34px] bg-gradient-to-br from-emerald-800 to-stone-950 p-6">
            <div className="mb-5 rounded-full bg-white/15 px-5 py-2 text-sm font-black text-white">Wholesale Excellence</div>
            <PlantArt name="Hero" />
            <div className="mt-5 grid grid-cols-2 gap-3 text-white">
              <div className="rounded-3xl bg-white/10 p-5"><div className="text-sm text-emerald-100">Featured range</div><div className="text-2xl font-black">Indoor & Feature</div></div>
              <div className="rounded-3xl bg-white/10 p-5"><div className="text-sm text-emerald-100">Pricing</div><div className="text-2xl font-black">{approved ? "Visible" : "Locked"}</div></div>
            </div>
          </div>
        </div>
      </section>

      <section id="catalogue" className="mx-auto max-w-[1500px] px-5 py-12">
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <h2 className="font-serif text-5xl font-black text-emerald-950">{approved ? "Wholesale Plants for Trade Professionals" : "Featured Plants"}</h2>
            <p className="mt-2 text-stone-600">{approved ? "Trade prices are visible. Add items to your quote cart." : "Pricing unlocks after trade access."}</p>
          </div>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search plants..." className="h-14 rounded-2xl border border-stone-200 bg-white px-5 font-semibold outline-none" />
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {filtered.map((product) => (
            <article key={product.id} className="rounded-[28px] bg-white p-4 shadow-sm ring-1 ring-stone-200">
              <PlantArt name={product.name} />
              <h3 className="mt-4 font-serif text-2xl font-black text-emerald-950">{product.name}</h3>
              <p className="text-sm italic text-stone-500">{product.botanical}</p>
              <p className="mt-3 min-h-[72px] text-sm leading-6 text-stone-600">{product.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">{product.tags.map((tag) => <span key={tag} className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-800">{tag}</span>)}</div>
              {approved ? (
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div><div className="text-xs font-black text-stone-500">Trade price</div><div className="text-2xl font-black text-emerald-950">${product.price.toFixed(2)}</div></div>
                  <div><div className="text-xs font-black text-stone-500">Project from</div><div className="text-2xl font-black text-emerald-950">${product.project.toFixed(2)}</div></div>
                </div>
              ) : (
                <div className="mt-5 rounded-2xl bg-emerald-50 p-4 text-sm font-black text-emerald-950">🔒 Trade pricing on sign-in</div>
              )}
              <button onClick={() => approved ? addToCart(product) : document.getElementById("trade")?.scrollIntoView({ behavior: "smooth" })} className="mt-5 w-full rounded-2xl bg-emerald-800 px-4 py-3 text-sm font-black text-white">{approved ? "Add to quote +" : "Apply access"}</button>
            </article>
          ))}
        </div>
      </section>

      <section id="trade" className="bg-emerald-950 px-5 py-16 text-white">
        <div className="mx-auto grid max-w-[1500px] gap-8 lg:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex rounded-full bg-white/10 px-5 py-2 text-sm font-black text-emerald-100">Trade-only access</div>
            <h2 className="font-serif text-5xl font-black leading-tight">Apply for wholesale access</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-emerald-50/85">Applications now save directly into Supabase for review.</p>
          </div>
          <form onSubmit={submitTrade} className="rounded-[32px] bg-white p-7 text-stone-900 shadow-xl">
            <h3 className="font-serif text-3xl font-black text-emerald-950">Trade Account Application</h3>
            <div className="mt-5 grid gap-3">
              <input name="business_name" required placeholder="Business Name *" className="h-14 rounded-2xl border border-stone-200 bg-stone-50 px-4 font-semibold outline-none" />
              <input name="abn" placeholder="ABN" className="h-14 rounded-2xl border border-stone-200 bg-stone-50 px-4 font-semibold outline-none" />
              <input name="delivery_suburb" placeholder="Delivery Suburb" className="h-14 rounded-2xl border border-stone-200 bg-stone-50 px-4 font-semibold outline-none" />
              <input name="expected_monthly_volume" placeholder="Expected Monthly Volume" className="h-14 rounded-2xl border border-stone-200 bg-stone-50 px-4 font-semibold outline-none" />
              <input name="email" required type="email" placeholder="Email *" className="h-14 rounded-2xl border border-stone-200 bg-stone-50 px-4 font-semibold outline-none" />
              <input name="phone" placeholder="Phone" className="h-14 rounded-2xl border border-stone-200 bg-stone-50 px-4 font-semibold outline-none" />
              <select name="buyer_type" className="h-14 rounded-2xl border border-stone-200 bg-stone-50 px-4 font-semibold outline-none">
                <option>Retail Store</option><option>Landscaper</option><option>Grower / Nursery</option><option>Interior Plant Stylist</option><option>Developer / Project Buyer</option>
              </select>
              <textarea name="message" placeholder="Message" className="min-h-24 rounded-2xl border border-stone-200 bg-stone-50 p-4 font-semibold outline-none" />
              <button disabled={savingTrade} className="rounded-2xl bg-emerald-800 px-6 py-4 font-black text-white disabled:opacity-60">{savingTrade ? "Saving..." : "Apply for Wholesale Access"}</button>
              {tradeStatus && <div className="rounded-2xl bg-emerald-50 p-4 text-sm font-black text-emerald-950">{tradeStatus}</div>}
            </div>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 py-16">
        <form onSubmit={submitQuote} className="rounded-[32px] bg-white p-7 shadow-sm ring-1 ring-stone-200">
          <h2 className="font-serif text-4xl font-black text-emerald-950">Request a formal quote</h2>
          <p className="mt-2 text-stone-600">Add plants to your cart first, then submit buyer details here. Quote requests save into Supabase.</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <input name="buyer_email" required type="email" placeholder="Buyer Email *" className="h-14 rounded-2xl border border-stone-200 bg-stone-50 px-4 font-semibold outline-none" />
            <input name="buyer_name" placeholder="Buyer Name" className="h-14 rounded-2xl border border-stone-200 bg-stone-50 px-4 font-semibold outline-none" />
            <input name="business_name" placeholder="Business Name" className="h-14 rounded-2xl border border-stone-200 bg-stone-50 px-4 font-semibold outline-none" />
            <input name="phone" placeholder="Phone" className="h-14 rounded-2xl border border-stone-200 bg-stone-50 px-4 font-semibold outline-none" />
            <input name="delivery_suburb" placeholder="Delivery Suburb" className="h-14 rounded-2xl border border-stone-200 bg-stone-50 px-4 font-semibold outline-none" />
            <textarea name="notes" placeholder="Notes" className="min-h-24 rounded-2xl border border-stone-200 bg-stone-50 p-4 font-semibold outline-none md:col-span-2" />
          </div>
          <div className="mt-5 rounded-2xl bg-emerald-50 p-4 font-bold text-emerald-950">Cart: {totalPlants.toLocaleString()} plants · Estimated total: ${subtotal.toFixed(2)}</div>
          <button disabled={savingQuote || cart.length === 0} className="mt-5 rounded-2xl bg-emerald-800 px-6 py-4 font-black text-white disabled:opacity-60">{savingQuote ? "Saving quote..." : "Request Formal Quote"}</button>
          {quoteStatus && <div className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm font-black text-emerald-950">{quoteStatus}</div>}
        </form>
      </section>

      {cartOpen && (
        <div className="fixed inset-0 z-[120] bg-emerald-950/50 backdrop-blur-sm">
          <aside className="ml-auto flex h-full w-full max-w-[520px] flex-col bg-[#fbfaf5] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-200 pb-5">
              <div><h2 className="font-serif text-3xl font-black text-emerald-950">Your Quote Cart</h2><p className="text-sm font-semibold text-stone-500">{cart.length} items</p></div>
              <button onClick={() => setCartOpen(false)} className="text-2xl text-emerald-950">×</button>
            </div>
            <div className="flex-1 overflow-auto py-5">
              {cart.length === 0 ? <p>Your cart is empty.</p> : cart.map((item) => (
                <div key={item.id} className="mb-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-stone-200">
                  <div className="font-black text-emerald-950">{item.name}</div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center overflow-hidden rounded-2xl border border-stone-200">
                      <button onClick={() => setCart((prev) => prev.map((p) => p.id === item.id ? { ...p, qty: Math.max(0, p.qty - 50) } : p).filter((p) => p.qty > 0))} className="px-4 py-2 font-black">−</button>
                      <input value={item.qty} readOnly className="w-20 border-x border-stone-200 py-2 text-center font-black" />
                      <button onClick={() => setCart((prev) => prev.map((p) => p.id === item.id ? { ...p, qty: p.qty + 50 } : p))} className="px-4 py-2 font-black">+</button>
                    </div>
                    <div className="font-black text-emerald-950">${(item.qty * item.price).toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-stone-200 pt-5">
              <div className="flex justify-between py-1"><span>Total plants</span><b>{totalPlants.toLocaleString()}</b></div>
              <div className="flex justify-between py-1"><span>Estimated subtotal</span><b>${subtotal.toFixed(2)}</b></div>
              <a href="#quote" onClick={() => setCartOpen(false)} className="mt-4 block rounded-2xl bg-emerald-800 px-6 py-4 text-center font-black text-white">Continue to Quote Form</a>
            </div>
          </aside>
        </div>
      )}

      <footer className="border-t border-stone-200 bg-white px-5 py-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="font-serif text-3xl font-black text-emerald-950">Wholesale Green Co</div>
          <p className="mt-2 text-sm leading-6 text-stone-600">Premium gated wholesale plant catalogue for Australian trade buyers.</p>
        </div>
      </footer>
    </main>
  );
}
