"use client";

import React, { useMemo, useState } from "react";

const products = [
  { id: 1, badge: "A", name: "Sword Fern", botanical: "Nephrolepis exaltata", category: "Indoor Plants", type: "Fern", available: 500, price: 1.75, project: 1.65, description: "Lush, arching fronds that bring texture and vibrant green to indoor spaces, shaded gardens and commercial plant styling.", bestFor: ["Indoor", "Fern", "Low Light"], theme: "fern" },
  { id: 2, badge: "B", name: "White Agapanthus", botanical: "Agapanthus ‘Albus’", category: "Landscape & Outdoor", type: "Flowering", available: 500, price: 2.35, project: 2.15, description: "Elegant white blooms on tall stems. A clean, premium flowering line for borders, feature planting and trade supply.", bestFor: ["Outdoor", "Flowering", "Landscape"], theme: "flower" },
  { id: 3, badge: "C", name: "Anigozanthos Big Red", botanical: "Anigozanthos hybrid", category: "Flowering & Colour", type: "Kangaroo Paw", available: 1500, price: 1.75, project: 1.65, description: "Bold flowering impact for retail displays, garden centres and large project-based outdoor orders.", bestFor: ["Colour", "Retail", "Outdoor"], theme: "grass" },
  { id: 4, badge: "D", name: "Cordyline Pink Diamond", botanical: "Cordyline fruticosa", category: "Indoor Plants", type: "Foliage", available: 1500, price: 2.0, project: 1.85, description: "A vibrant foliage line with strong decorative appeal for indoor plant ranges and retail displays.", bestFor: ["Indoor", "Foliage", "Premium"], theme: "pink" },
  { id: 5, badge: "E", name: "Ficus Ruby", botanical: "Ficus elastica", category: "Indoor Plants", type: "Foliage", available: 1000, price: 1.85, project: 1.75, description: "Stylish indoor foliage with modern retail appeal and strong decorative value for premium plant buyers.", bestFor: ["Retail", "Indoor", "Feature"], theme: "variegated" },
  { id: 6, badge: "F", name: "Lomandra Lime Tuff", botanical: "Lomandra longifolia", category: "Grasses & Groundcovers", type: "Landscape", available: 20000, price: 1.75, project: 1.65, description: "A large-volume landscape performer for commercial, council and development projects requiring dependable availability.", bestFor: ["Commercial", "Bulk", "Landscape"], theme: "grass" },
  { id: 7, badge: "G", name: "Monstera Deliciosa", botanical: "Monstera deliciosa", category: "Indoor Plants", type: "Feature", available: 500, price: 2.25, project: 2.1, description: "A high-demand indoor favourite with broad appeal across retail, offices and interior greenery programs.", bestFor: ["Feature", "Interior", "Retail"], theme: "broadleaf" },
  { id: 8, badge: "H", name: "Philodendron Birkin", botanical: "Philodendron birkin", category: "Indoor Plants", type: "Premium", available: 1000, price: 2.0, project: 1.85, description: "A premium patterned foliage line with strong shelf appeal for retailers and modern plant buyers.", bestFor: ["Premium", "Patterned", "Retail"], theme: "variegated" },
  { id: 9, badge: "I", name: "Syngonium Neon", botanical: "Syngonium hybrid", category: "Indoor Plants", type: "Colour", available: 1500, price: 1.7, project: 1.6, description: "A colourful foliage option with strong decorative appeal for indoor plant ranges and retail displays.", bestFor: ["Colour", "Indoor", "Decorative"], theme: "pink" },
  { id: 10, badge: "J", name: "Dianella Tazred", botanical: "Dianella hybrid", category: "Landscape & Outdoor", type: "Landscape", available: 2800, price: 1.75, project: 1.65, description: "A popular outdoor line with strong colour and landscape appeal for professional planting programs.", bestFor: ["Landscape", "Outdoor", "Bulk"], theme: "grass" },
  { id: 11, badge: "K", name: "Spathiphyllum Maracay", botanical: "Spathiphyllum hybrid", category: "Indoor Plants", type: "Greenery", available: 500, price: 1.7, project: 1.6, description: "A versatile indoor greenery line for offices, retail plant ranges and commercial interior programs.", bestFor: ["Office", "Retail", "Interior"], theme: "flower" },
  { id: 12, badge: "L", name: "Agapanthus Purple Cloud", botanical: "Agapanthus africanus", category: "Landscape & Outdoor", type: "Flowering", available: 500, price: 1.75, project: 1.65, description: "A reliable flowering landscape variety suited to borders, mass planting and commercial outdoor projects.", bestFor: ["Flowering", "Outdoor", "Landscape"], theme: "flower" },
];

const categories = ["All Plants", "Indoor Plants", "Landscape & Outdoor", "Flowering & Colour", "Grasses & Groundcovers", "Ferns"];

type Product = typeof products[number];

function PlantVisual({ product, size = "card" }: { product: Product; size?: "card" | "hero" | "thumb" | "compact" }) {
  const hero = size === "hero";
  const thumb = size === "thumb";
  const compact = size === "compact";
  const leaves = product.theme === "grass" ? 12 : product.theme === "flower" ? 9 : product.theme === "pink" ? 8 : 11;
  const bg = product.theme === "pink"
    ? "from-rose-100 via-white to-emerald-50"
    : product.theme === "flower"
      ? "from-lime-100 via-white to-emerald-100"
      : product.theme === "variegated"
        ? "from-yellow-50 via-white to-emerald-100"
        : "from-emerald-100 via-white to-lime-100";
  const height = hero ? "h-[430px]" : thumb ? "h-20 w-20" : compact ? "h-36" : "h-56";

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${bg} ${height} ${hero ? "rounded-[44px]" : thumb ? "rounded-2xl" : "rounded-[26px]"}`}>
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/70" />
      <div className="absolute -bottom-16 -left-12 h-48 w-48 rounded-full bg-emerald-950/10" />
      <div className="absolute left-1/2 top-8 h-36 w-56 -translate-x-1/2 rounded-full bg-emerald-700/10 blur-2xl" />
      {!thumb && <div className="absolute right-4 top-4 z-10 rounded-full bg-white/85 px-3 py-1 text-xs font-black text-emerald-950 shadow-sm">{product.badge}</div>}
      <div className={`absolute left-1/2 -translate-x-1/2 rounded-full bg-emerald-800 ${hero ? "bottom-24 h-32 w-3" : thumb ? "bottom-8 h-10 w-1.5" : compact ? "bottom-14 h-16 w-2" : "bottom-16 h-24 w-2.5"}`} />
      {Array.from({ length: leaves }).map((_, i) => {
        const angle = -78 + i * (156 / Math.max(leaves - 1, 1));
        const base = hero ? 92 : thumb ? 26 : compact ? 44 : 58;
        const leafHeight = base + (i % 3) * (hero ? 18 : 8);
        const leafWidth = product.theme === "grass" ? leafHeight * 0.16 : leafHeight * 0.42;
        const colour = product.theme === "pink"
          ? "from-rose-300 to-emerald-500"
          : product.theme === "variegated"
            ? "from-lime-200 to-emerald-700"
            : "from-lime-400 to-emerald-700";
        return (
          <div
            key={i}
            className={`absolute left-1/2 origin-bottom rounded-[100%] bg-gradient-to-br ${colour} shadow-sm`}
            style={{
              width: `${leafWidth}px`,
              height: `${leafHeight}px`,
              bottom: hero ? "156px" : thumb ? "44px" : compact ? "82px" : "96px",
              transform: `translateX(-50%) rotate(${angle}deg) translateY(-${hero ? 46 : thumb ? 14 : 24}px)`,
              opacity: 0.92,
            }}
          />
        );
      })}
      {product.theme === "flower" && !thumb && Array.from({ length: hero ? 12 : 7 }).map((_, i) => (
        <div key={`f-${i}`} className="absolute z-10 rounded-full bg-white shadow-sm" style={{ width: hero ? 18 : 12, height: hero ? 18 : 12, left: `${38 + (i % 6) * 6}%`, top: `${32 + Math.floor(i / 6) * 8}%` }} />
      ))}
      <div className={`absolute left-1/2 -translate-x-1/2 bg-stone-950 shadow-2xl ${hero ? "bottom-16 h-24 w-32 rounded-b-3xl rounded-t-xl" : thumb ? "bottom-2 h-8 w-10 rounded-b-xl rounded-t-md" : compact ? "bottom-5 h-12 w-16 rounded-b-2xl rounded-t-lg" : "bottom-7 h-16 w-20 rounded-b-2xl rounded-t-lg"}`} />
      {!thumb && <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-full bg-white/80 shadow-xl ${hero ? "h-20 w-80" : compact ? "h-8 w-36" : "h-11 w-48"}`} />}
    </div>
  );
}

function Header({ approved, setApproved, cartCount, setCartOpen }: { approved: boolean; setApproved: (value: boolean) => void; cartCount: number; setCartOpen: (value: boolean) => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-[#fbfaf5]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-5 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm ring-1 ring-stone-200">♧</div>
          <div>
            <div className="font-serif text-2xl font-black leading-none text-emerald-950 md:text-3xl">Greenridge</div>
            <div className="text-[9px] font-black uppercase tracking-[0.35em] text-stone-500">Wholesale Plants</div>
          </div>
        </div>
        <nav className="hidden items-center gap-9 text-sm font-black text-emerald-950 lg:flex">
          <a href="#catalogue">Plants⌄</a>
          <a href="#collections">Collections⌄</a>
          <a href="#trade">Trade Access</a>
          <a href="#seo">Resources⌄</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => setApproved(!approved)} className={`hidden rounded-2xl px-4 py-3 text-sm font-black shadow-sm ring-1 ring-stone-200 md:block ${approved ? "bg-emerald-100 text-emerald-950" : "bg-white text-emerald-950 hover:bg-emerald-50"}`}>{approved ? "✅ Approved Buyer" : "🔒 Trade Sign In"}</button>
          <a href="#trade" className="hidden rounded-2xl bg-emerald-950 px-4 py-3 text-sm font-black text-white shadow-lg shadow-emerald-950/10 hover:bg-emerald-800 md:block">Apply for Trade Access</a>
          <button onClick={() => setCartOpen(true)} className="rounded-2xl bg-emerald-950 px-4 py-3 text-sm font-black text-white shadow-lg">Cart {cartCount ? `(${cartCount})` : ""}</button>
        </div>
      </div>
    </header>
  );
}

function Hero({ approved }: { approved: boolean }) {
  return (
    <section className="relative isolate overflow-hidden bg-[#fbfaf5]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_20%,rgba(22,101,52,0.08),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(132,204,22,0.14),transparent_32%)]" />
      <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-14 lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
        <div className="flex flex-col justify-center">
          <div className="mb-5 w-fit rounded-full bg-white px-6 py-3 text-xs font-black uppercase tracking-[0.32em] text-emerald-900 shadow-sm ring-1 ring-stone-200">Grown for Professionals</div>
          <h1 className="font-serif text-5xl font-black leading-[0.92] tracking-tight text-emerald-950 md:text-7xl xl:text-8xl">Premium Wholesale<br />Plants for Trade Buyers</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-700 md:text-xl">A premium trade-only plant catalogue for retailers, landscapers, designers and bulk buyers. Browse publicly, unlock prices when approved.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#catalogue" className="rounded-2xl bg-emerald-800 px-7 py-4 text-center text-base font-black text-white shadow-xl shadow-emerald-950/15 hover:bg-emerald-950">Browse Plants →</a>
            <a href="#trade" className="rounded-2xl border border-emerald-950/30 bg-white px-7 py-4 text-center text-base font-black text-emerald-950 shadow-sm hover:bg-emerald-50">🔒 Apply for Trade Access</a>
          </div>
          <div className="mt-9 grid max-w-3xl gap-4 sm:grid-cols-3">
            {[["🌿", "Quality Assured", "Supplier approved & trade ready"], ["🚚", "Reliable Supply", "Seasonal availability and bulk support"], ["🪴", "Trade Focused", "Built for landscapers, retailers & designers"]].map(([icon, title, text]) => (
              <div key={title} className="flex gap-3"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xl">{icon}</div><div><div className="text-sm font-black text-emerald-950">{title}</div><div className="text-xs font-semibold leading-5 text-stone-600">{text}</div></div></div>
            ))}
          </div>
        </div>
        <div className="relative flex items-center justify-center rounded-[44px] bg-gradient-to-br from-emerald-50 via-white to-emerald-100 p-5 shadow-sm ring-1 ring-stone-200 lg:p-8">
          <div className="absolute right-4 top-4 h-[75%] w-[44%] rounded-[70px] bg-emerald-900/10" />
          <div className="relative w-full max-w-[620px] rounded-[42px] bg-emerald-950 p-5 shadow-2xl">
            <div className="rounded-[32px] bg-gradient-to-br from-emerald-800 via-emerald-900 to-stone-950 p-5">
              <div className="mb-5 flex items-center justify-between"><div className="rounded-full bg-white/15 px-5 py-2 text-sm font-black text-emerald-50 md:text-base">Wholesale Excellence</div><div className="text-3xl">🛡️</div></div>
              <PlantVisual product={products[0]} size="hero" />
              <div className="mt-4 grid grid-cols-2 gap-3 text-white">
                <div className="rounded-3xl bg-white/10 p-4"><div className="text-xs text-emerald-100">Featured range</div><div className="text-lg font-black md:text-xl">Indoor & Feature</div></div>
                <div className="rounded-3xl bg-white/10 p-4"><div className="text-xs text-emerald-100">Trade pricing</div><div className="text-lg font-black md:text-xl">{approved ? "Visible" : "Locked"}</div></div>
              </div>
            </div>
          </div>
          <div className="absolute right-10 top-16 hidden rounded-[28px] border border-white/50 bg-white/75 p-6 shadow-xl backdrop-blur md:block"><div className="font-serif text-2xl font-black text-emerald-950">Wholesale<br />Excellence</div><p className="mt-3 max-w-40 text-sm leading-6 text-stone-700">Premium quality plants for professional results.</p></div>
        </div>
      </div>
    </section>
  );
}

function CategoryBanners() {
  return (
    <section id="collections" className="bg-[#fbfaf5] px-5 pb-10">
      <div className="mx-auto grid max-w-[1500px] gap-4 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-[30px] bg-white p-7 shadow-sm ring-1 ring-stone-200">
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-emerald-800/15 to-transparent" />
          <div className="relative flex items-center gap-5"><div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-3xl shadow-inner">🪴</div><div><h2 className="font-serif text-3xl font-black text-emerald-950">Indoor & Feature</h2><p className="mt-1 text-sm leading-6 text-stone-700">Stylish foliage and statement plants perfect for interiors and retail.</p></div></div>
        </div>
        <div className="relative overflow-hidden rounded-[30px] bg-emerald-800 p-7 text-white shadow-sm">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.18),transparent_30%)]" />
          <div className="relative flex items-center gap-5"><div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/20 text-3xl">🌾</div><div><h2 className="font-serif text-3xl font-black">Landscape & Outdoor</h2><p className="mt-1 text-sm leading-6 text-emerald-50">Hardy, reliable varieties for gardens, public spaces and landscapes.</p></div></div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, approved, addToCart, openProduct }: { product: Product; approved: boolean; addToCart: (p: Product, qty?: number) => void; openProduct: (p: Product) => void }) {
  return (
    <article className="group overflow-hidden rounded-[26px] bg-white shadow-sm ring-1 ring-stone-200 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative"><PlantVisual product={product} /><button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-emerald-950 shadow-sm">♡</button></div>
      <div className="p-5">
        <h3 className="font-serif text-2xl font-black text-emerald-950">{product.name}</h3>
        <p className="text-sm italic text-stone-500">{product.botanical}</p>
        <p className="mt-3 min-h-[72px] text-sm leading-6 text-stone-600">{product.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">{product.bestFor.slice(0,2).map((tag) => <span key={tag} className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-800">{tag}</span>)}</div>
        {approved ? (
          <div className="mt-5 grid grid-cols-2 gap-3"><div><div className="text-xs font-black text-stone-500">Trade price</div><div className="text-2xl font-black text-emerald-950">${product.price.toFixed(2)}</div><div className="text-xs font-semibold text-stone-500">each</div></div><div><div className="text-xs font-black text-stone-500">Project from</div><div className="text-2xl font-black text-emerald-950">${product.project.toFixed(2)}</div><div className="text-xs font-semibold text-stone-500">each</div></div></div>
        ) : (
          <div className="mt-5 rounded-2xl border border-emerald-900/10 bg-emerald-50/70 p-4 text-sm font-black text-emerald-950">🔒 Trade pricing on sign-in</div>
        )}
        <div className="mt-5 grid grid-cols-2 gap-3"><button onClick={() => openProduct(product)} className="rounded-2xl border border-emerald-800/30 bg-white px-4 py-3 text-sm font-black text-emerald-950 hover:bg-emerald-50">View details</button><button onClick={() => approved ? addToCart(product) : document.getElementById("trade")?.scrollIntoView({ behavior: "smooth" })} className="rounded-2xl bg-emerald-800 px-4 py-3 text-sm font-black text-white hover:bg-emerald-950">{approved ? "Add to bulk order +" : "Apply access"}</button></div>
      </div>
    </article>
  );
}

function Catalogue({ approved, addToCart, openProduct }: { approved: boolean; addToCart: (p: Product, qty?: number) => void; openProduct: (p: Product) => void }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Plants");
  const [sort, setSort] = useState("Popularity");
  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const hay = `${p.name} ${p.botanical} ${p.category} ${p.type} ${p.description}`.toLowerCase();
      return hay.includes(query.toLowerCase()) && (category === "All Plants" || p.category === category || (category === "Ferns" && p.type === "Fern"));
    });
    if (sort === "Availability") list = [...list].sort((a,b) => b.available - a.available);
    if (sort === "Price Low") list = [...list].sort((a,b) => a.price - b.price);
    return list;
  }, [query, category, sort]);

  return (
    <section id="catalogue" className="bg-[#fbfaf5] px-5 py-12">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div><h2 className="font-serif text-4xl font-black text-emerald-950 md:text-5xl">{approved ? "Wholesale Plants for Trade Professionals" : "Featured Plants"}</h2><p className="mt-2 text-stone-600">{approved ? "Trade prices are now visible. Add items to your bulk order and request a formal quote." : "Hand-selected varieties loved by professionals. Pricing unlocks after trade access."}</p></div>
          <button onClick={() => setCategory("All Plants")} className="w-fit rounded-2xl border border-emerald-800/30 bg-white px-5 py-3 text-sm font-black text-emerald-950">View all plants →</button>
        </div>
        <div className="mb-5 grid gap-3 lg:grid-cols-[1fr_auto]">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search plants by name or variety..." className="h-16 rounded-3xl border border-stone-200 bg-white px-6 text-base font-semibold outline-none shadow-sm focus:ring-4 focus:ring-emerald-600/20" />
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="h-16 rounded-3xl border border-stone-200 bg-white px-6 text-base font-black text-emerald-950 outline-none shadow-sm"><option>Popularity</option><option>Availability</option><option>Price Low</option></select>
        </div>
        <div className="mb-5 flex gap-3 overflow-x-auto pb-2">{categories.map((cat) => <button key={cat} onClick={() => setCategory(cat)} className={`whitespace-nowrap rounded-2xl px-5 py-3 text-sm font-black shadow-sm ring-1 ring-stone-200 ${category === cat ? "bg-emerald-800 text-white" : "bg-white text-emerald-950"}`}>{cat}</button>)}</div>
        <div className="mb-8 grid gap-3 rounded-3xl bg-emerald-50 p-4 text-sm font-bold text-emerald-950 md:grid-cols-4"><div>🪴 Premium quality, professionally grown</div><div>🔐 Trade prices for approved buyers</div><div>🚚 Delivered to your project</div><div>🏷️ 5,000+ mixed orders eligible</div></div>
        <div className="mb-5 text-sm font-black text-stone-500">{filtered.length} results</div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">{filtered.map((product) => <ProductCard key={product.id} product={product} approved={approved} addToCart={addToCart} openProduct={openProduct} />)}</div>
      </div>
    </section>
  );
}

function TradeAccess({ setApproved }: { setApproved: (value: boolean) => void }) {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section id="trade" className="bg-[#fbfaf5] px-5 py-14">
      <div className="mx-auto grid max-w-[1500px] gap-8 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-[42px] bg-emerald-950 p-8 text-white shadow-2xl md:p-10"><div className="mb-4 inline-flex rounded-full bg-white/10 px-5 py-2 text-sm font-black text-emerald-100">Trade-only access</div><h2 className="font-serif text-4xl font-black leading-tight md:text-5xl">Trade buyers apply first. Serious buyers unlock pricing.</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-emerald-50/85">This protects sensitive wholesale prices while allowing customers to see your premium range, professional presentation and availability before applying.</p><div className="mt-8 grid gap-4 md:grid-cols-2">{["Exclusive wholesale pricing", "Priority stock availability", "Dedicated trade support", "Early access to new releases"].map((x) => <div key={x} className="rounded-3xl bg-white/10 p-5 font-bold">✅ {x}</div>)}</div></div>
        <div className="rounded-[36px] bg-white p-7 shadow-sm ring-1 ring-stone-200">
          {submitted ? <div><div className="text-5xl">✅</div><h3 className="mt-3 font-serif text-3xl font-black text-emerald-950">Application received</h3><p className="mt-2 leading-7 text-stone-600">In the live site this saves to Supabase and alerts you. For the demo, approve the buyer below.</p><button onClick={() => setApproved(true)} className="mt-5 w-full rounded-2xl bg-emerald-800 px-6 py-4 font-black text-white">Demo approve buyer</button></div> : <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}><h3 className="font-serif text-3xl font-black text-emerald-950">Trade Account Application</h3><p className="mt-1 text-stone-600">Apply for wholesale access in minutes.</p><div className="mt-5 grid gap-3">{["Business Name *", "ABN *", "Delivery Suburb *", "Expected Monthly Volume *", "Email *"].map((field) => <input key={field} required placeholder={field} className="h-14 rounded-2xl border border-stone-200 bg-stone-50 px-4 font-semibold outline-none focus:ring-4 focus:ring-emerald-600/20" />)}<select className="h-14 rounded-2xl border border-stone-200 bg-stone-50 px-4 font-semibold outline-none focus:ring-4 focus:ring-emerald-600/20"><option>Retail Store</option><option>Landscaper</option><option>Grower / Nursery</option><option>Interior Plant Stylist</option><option>Developer / Project Buyer</option></select><button className="mt-2 rounded-2xl bg-emerald-800 px-6 py-4 font-black text-white">Apply for Wholesale Access</button></div><p className="mt-3 text-sm font-semibold text-stone-500">We typically respond within 1 business day.</p></form>}
        </div>
      </div>
    </section>
  );
}

function SeoAndDeploy() {
  return (
    <section id="seo" className="bg-[#fbfaf5] px-5 py-14">
      <div className="mx-auto grid max-w-[1500px] gap-6 lg:grid-cols-2">
        <div className="rounded-[36px] bg-white p-8 shadow-sm ring-1 ring-stone-200"><div className="inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-900">Google SEO</div><h2 className="mt-4 font-serif text-4xl font-black text-emerald-950">Built for wholesale plant search intent</h2><p className="mt-4 leading-8 text-stone-600">Target searches like wholesale tissue culture plants, wholesale indoor plants, bulk landscape plants, wholesale plant supplier Australia and trade plant supplier Melbourne.</p></div>
        <div className="rounded-[36px] bg-white p-8 shadow-sm ring-1 ring-stone-200"><div className="inline-flex rounded-full bg-lime-50 px-4 py-2 text-sm font-black text-emerald-900">AI SEO</div><h2 className="mt-4 font-serif text-4xl font-black text-emerald-950">Clear answers for AI search engines</h2><p className="mt-4 leading-8 text-stone-600">The site explains what you sell, who you serve, how trade pricing works and how customers request bulk orders, making the business easier for AI search tools to understand.</p></div>
        <div id="deploy" className="rounded-[36px] bg-emerald-950 p-8 text-white shadow-2xl lg:col-span-2"><div className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-black text-emerald-100">Deploy-ready direction</div><h2 className="mt-4 font-serif text-4xl font-black">Best live setup: Next.js + Vercel + Supabase + Stripe</h2><div className="mt-6 grid gap-4 md:grid-cols-4">{[["Vercel", "Fast hosting and easy domain connection."], ["Supabase", "Buyer login, approval and hidden pricing."], ["Stripe", "Deposits, invoices and payments."], ["CMS", "Update products/photos without code."]].map(([title, text]) => <div key={title} className="rounded-3xl bg-white/10 p-5"><h3 className="font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-emerald-50/85">{text}</p></div>)}</div></div>
      </div>
    </section>
  );
}

function ProductModal({ product, approved, close, addToCart }: { product: Product | null; approved: boolean; close: () => void; addToCart: (p: Product, qty?: number) => void }) {
  const [qty, setQty] = useState(100);
  if (!product) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-emerald-950/55 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-6xl overflow-auto rounded-[42px] bg-[#fbfaf5] p-5 shadow-2xl">
        <div className="mb-4 flex justify-end"><button onClick={close} className="rounded-full bg-white px-5 py-2 font-black text-emerald-950 shadow-sm">Close ✕</button></div>
        <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr]">
          <PlantVisual product={product} size="hero" />
          <div className="rounded-[34px] bg-white p-7 shadow-sm ring-1 ring-stone-200"><div className="mb-3 inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-800">{product.category}</div><h2 className="font-serif text-5xl font-black text-emerald-950">{product.name}</h2><p className="mt-1 text-lg italic text-stone-500">{product.botanical}</p><p className="mt-5 text-lg leading-9 text-stone-700">{product.description}</p><div className="mt-5 grid grid-cols-2 gap-3"><div className="rounded-2xl bg-stone-50 p-4"><div className="text-xs font-black uppercase text-stone-500">Available</div><div className="text-2xl font-black text-emerald-950">{product.available.toLocaleString()}</div></div><div className="rounded-2xl bg-stone-50 p-4"><div className="text-xs font-black uppercase text-stone-500">Best for</div><div className="text-sm font-black text-emerald-950">{product.bestFor.join(", ")}</div></div></div>{approved ? <div className="mt-5 rounded-3xl bg-emerald-950 p-5 text-white"><div className="text-sm text-emerald-100">Wholesale Trade Price</div><div className="mt-1 text-4xl font-black">${product.price.toFixed(2)} AUD</div><p className="mt-2 text-sm text-emerald-100">Project pricing from ${product.project.toFixed(2)} each.</p></div> : <div className="mt-5 rounded-3xl bg-emerald-50 p-5 font-black text-emerald-950">🔒 Apply for trade access to unlock price.</div>}<div className="mt-5 flex gap-3"><button onClick={() => setQty(Math.max(50, qty-50))} className="h-14 w-14 rounded-2xl bg-stone-100 text-2xl font-black">−</button><input value={qty} onChange={(e)=>setQty(Number(e.target.value||0))} className="h-14 w-28 rounded-2xl border border-stone-200 text-center font-black"/><button onClick={() => setQty(qty+50)} className="h-14 w-14 rounded-2xl bg-stone-100 text-2xl font-black">+</button><button onClick={() => approved ? addToCart(product, qty) : document.getElementById("trade")?.scrollIntoView({behavior:"smooth"})} className="flex-1 rounded-2xl bg-emerald-800 px-6 py-4 font-black text-white">{approved ? `Add ${qty} to Bulk Order` : "Apply for Wholesale Access"}</button></div></div>
        </div>
      </div>
    </div>
  );
}

type CartItem = Product & { qty: number };

function CartDrawer({ cart, close, updateQty, removeItem, quote, approved }: { cart: CartItem[]; close: () => void; updateQty: (id: number, qty: number) => void; removeItem: (id: number) => void; quote: () => void; approved: boolean }) {
  const totalPlants = cart.reduce((s,i)=>s+i.qty,0);
  const subtotal = cart.reduce((s,i)=>s+i.qty*i.price,0);
  const project = cart.reduce((s,i)=>s+i.qty*i.project,0);
  return (
    <div className="fixed inset-0 z-[120] bg-emerald-950/50 backdrop-blur-sm">
      <aside className="ml-auto flex h-full w-full max-w-[520px] flex-col bg-[#fbfaf5] p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-stone-200 pb-5"><div><h2 className="font-serif text-3xl font-black text-emerald-950">Your Bulk Order</h2><p className="text-sm font-semibold text-stone-500">{cart.length} items</p></div><button onClick={close} className="text-2xl text-emerald-950">×</button></div>
        <div className="my-5 rounded-3xl bg-emerald-50 p-5"><div className="font-black text-emerald-950">🏷️ 5,000+ mixed orders are eligible for special project pricing.</div><p className="mt-2 text-sm leading-6 text-stone-600">Submit your request to receive a formal quote from our team.</p></div>
        <div className="flex-1 overflow-auto">{cart.length === 0 ? <div className="rounded-3xl bg-white p-5 text-stone-600 shadow-sm">{approved ? "Your cart is empty. Add products from the catalogue." : "Sign in or apply for trade access to order."}</div> : cart.map((item) => <div key={item.id} className="mb-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-stone-200"><div className="flex gap-4"><PlantVisual product={item} size="thumb"/><div className="flex-1"><div className="flex justify-between gap-3"><div><div className="font-black text-emerald-950">{item.name}</div><div className="text-sm text-stone-500">140mm Pot</div></div><button onClick={()=>removeItem(item.id)} className="text-xl text-stone-500">×</button></div><div className="mt-3 flex items-center justify-between"><div className="flex items-center overflow-hidden rounded-2xl border border-stone-200"><button onClick={()=>updateQty(item.id, Math.max(50,item.qty-50))} className="px-4 py-2 font-black">−</button><input value={item.qty} onChange={(e)=>updateQty(item.id, Number(e.target.value||0))} className="w-16 border-x border-stone-200 py-2 text-center font-black"/><button onClick={()=>updateQty(item.id, item.qty+50)} className="px-4 py-2 font-black">+</button></div><div className="font-black text-emerald-950">${(item.qty*item.price).toFixed(2)}</div></div><div className="mt-2 text-xs font-semibold text-stone-500">${item.price.toFixed(2)} each · Project from ${item.project.toFixed(2)}</div></div></div></div>)}</div>
        <div className="border-t border-stone-200 pt-5"><div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-stone-200"><div className="flex justify-between py-1"><span>Total plants</span><b>{totalPlants.toLocaleString()}</b></div><div className="flex justify-between py-1"><span>Estimated subtotal</span><b>${subtotal.toFixed(2)}</b></div><div className="flex justify-between py-1 text-emerald-800"><span>Estimated project pricing</span><b>from ${project.toFixed(2)}</b></div></div><div className="mt-4 rounded-2xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-950">🚚 Final pricing, freight and availability confirmed in your formal quote.</div><button onClick={quote} className="mt-4 w-full rounded-2xl bg-emerald-800 px-6 py-4 font-black text-white shadow-lg hover:bg-emerald-950">Request Formal Quote →</button><p className="mt-3 text-center text-sm font-semibold text-stone-500">🔒 Secure · No payment required</p></div>
      </aside>
    </div>
  );
}

export default function PremiumWholesalePlantDemo() {
  const [approved, setApproved] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [quoteSent, setQuoteSent] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const cartCount = cart.reduce((s,i)=>s+i.qty,0);

  function addToCart(product: Product, qty=100) {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i)=> i.id === product.id ? {...i, qty: Math.min(i.available, i.qty+qty)} : i);
      return [...prev, {...product, qty: Math.min(product.available, qty)}];
    });
    setCartOpen(true);
  }
  function updateQty(id: number, qty: number) { setCart((prev)=>prev.map((i)=> i.id === id ? {...i, qty: Math.max(0, Math.min(i.available, qty))} : i).filter((i)=>i.qty>0)); }
  function removeItem(id: number) { setCart((prev)=>prev.filter((i)=>i.id !== id)); }

  return (
    <div className="min-h-screen bg-[#fbfaf5] text-stone-900">
      <Header approved={approved} setApproved={setApproved} cartCount={cartCount} setCartOpen={setCartOpen} />
      <Hero approved={approved} />
      <CategoryBanners />
      <Catalogue approved={approved} addToCart={addToCart} openProduct={setSelected} />
      <TradeAccess setApproved={setApproved} />
      <SeoAndDeploy />
      <footer id="contact" className="border-t border-stone-200 bg-white px-5 py-10"><div className="mx-auto grid max-w-[1500px] gap-6 md:grid-cols-3"><div><div className="font-serif text-3xl font-black text-emerald-950">Greenridge</div><p className="mt-2 text-sm leading-6 text-stone-600">Premium gated wholesale plant catalogue for Australian trade buyers.</p></div><div className="space-y-2 text-sm font-semibold text-stone-600"><div>☎️ Phone placeholder</div><div>✉️ Email placeholder</div><div>📍 Melbourne, Victoria</div></div><div className="rounded-2xl bg-stone-50 p-4 text-sm leading-6 text-stone-600">Product names, plant imagery and selected reference information are used with supplier approval and adapted for branding and marketing purposes.</div></div></footer>
      <ProductModal product={selected} approved={approved} close={()=>setSelected(null)} addToCart={addToCart} />
      {cartOpen && <CartDrawer cart={cart} close={()=>setCartOpen(false)} updateQty={updateQty} removeItem={removeItem} quote={()=>setQuoteSent(true)} approved={approved} />}
      {quoteSent && <div className="fixed inset-0 z-[140] flex items-center justify-center bg-emerald-950/55 p-4 backdrop-blur-sm"><div className="max-w-xl rounded-[36px] bg-white p-9 text-center shadow-2xl"><div className="text-6xl">✅</div><h2 className="mt-4 font-serif text-4xl font-black text-emerald-950">Formal quote request sent</h2><p className="mt-3 leading-7 text-stone-600">In the live site this will email you, save the enquiry in Supabase and create the quote workflow.</p><button onClick={()=>setQuoteSent(false)} className="mt-6 rounded-2xl bg-emerald-800 px-8 py-4 font-black text-white">Back to demo</button></div></div>}
    </div>
  );
}
