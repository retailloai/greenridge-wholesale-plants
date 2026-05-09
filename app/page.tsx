"use client";

import React, { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  botanical: string;
  category: string;
  type: string;
  available: number;
  price: number;
  project: number;
  description: string;
  tags: string[];
  theme: "fern" | "flower" | "grass" | "pink" | "variegated" | "broadleaf";
};

type CartItem = Product & { qty: number };

const products: Product[] = [
  { id: 1, name: "Sword Fern", botanical: "Nephrolepis exaltata", category: "Indoor Plants", type: "Fern", available: 500, price: 1.75, project: 1.65, description: "Lush, arching fronds with bright texture and strong indoor trade appeal.", tags: ["Indoor", "Fern"], theme: "fern" },
  { id: 2, name: "White Agapanthus", botanical: "Agapanthus ‘Albus’", category: "Landscape & Outdoor", type: "Flowering", available: 500, price: 2.35, project: 2.15, description: "Elegant white blooms for borders, feature planting and outdoor programs.", tags: ["Outdoor", "Flowering"], theme: "flower" },
  { id: 3, name: "Chives", botanical: "Allium schoenoprasum", category: "Grasses & Groundcovers", type: "Herb", available: 1000, price: 1.45, project: 1.35, description: "Hardy culinary herb with delicate purple blooms and easy retail appeal.", tags: ["Herb", "Edible"], theme: "grass" },
  { id: 4, name: "Chinese Evergreen", botanical: "Aglaonema modestum", category: "Indoor Plants", type: "Foliage", available: 1000, price: 2.10, project: 1.95, description: "Tough, adaptable foliage with strong indoor colour and texture.", tags: ["Indoor", "Foliage"], theme: "variegated" },
  { id: 5, name: "Cordyline Pink Diamond", botanical: "Cordyline fruticosa", category: "Indoor Plants", type: "Foliage", available: 1500, price: 2.00, project: 1.85, description: "Vibrant foliage line with decorative retail and indoor plant appeal.", tags: ["Indoor", "Colour"], theme: "pink" },
  { id: 6, name: "Ficus Ruby", botanical: "Ficus elastica", category: "Indoor Plants", type: "Feature", available: 1000, price: 1.85, project: 1.75, description: "Stylish premium indoor foliage with modern shelf appeal.", tags: ["Retail", "Feature"], theme: "variegated" },
  { id: 7, name: "Lomandra Lime Tuff", botanical: "Lomandra longifolia", category: "Landscape & Outdoor", type: "Landscape", available: 20000, price: 1.75, project: 1.65, description: "High-volume landscape performer for commercial and development projects.", tags: ["Bulk", "Landscape"], theme: "grass" },
  { id: 8, name: "Monstera Deliciosa", botanical: "Monstera deliciosa", category: "Indoor Plants", type: "Feature", available: 500, price: 2.25, project: 2.10, description: "High-demand indoor favourite for retail, offices and interiors.", tags: ["Feature", "Interior"], theme: "broadleaf" },
  { id: 9, name: "Philodendron Birkin", botanical: "Philodendron birkin", category: "Indoor Plants", type: "Premium", available: 1000, price: 2.00, project: 1.85, description: "Premium patterned foliage with strong shelf appeal for modern buyers.", tags: ["Premium", "Patterned"], theme: "variegated" },
  { id: 10, name: "Syngonium Neon", botanical: "Syngonium hybrid", category: "Indoor Plants", type: "Colour", available: 1500, price: 1.70, project: 1.60, description: "Colourful foliage option for indoor plant ranges and gift displays.", tags: ["Colour", "Indoor"], theme: "pink" },
  { id: 11, name: "Dianella Tazred", botanical: "Dianella hybrid", category: "Landscape & Outdoor", type: "Landscape", available: 2800, price: 1.75, project: 1.65, description: "Popular outdoor landscape line with dependable professional appeal.", tags: ["Outdoor", "Bulk"], theme: "grass" },
  { id: 12, name: "Agapanthus Purple Cloud", botanical: "Agapanthus africanus", category: "Flowering & Colour", type: "Flowering", available: 500, price: 1.75, project: 1.65, description: "Reliable flowering landscape variety for borders and mass planting.", tags: ["Flowering", "Outdoor"], theme: "flower" }
];

const categories = ["All Plants", "Indoor Plants", "Landscape & Outdoor", "Flowering & Colour", "Grasses & Groundcovers", "Ferns"];

function PlantVisual({ product, size = "card" }: { product: Product; size?: "hero" | "card" | "thumb" | "mini" }) {
  const hero = size === "hero";
  const thumb = size === "thumb";
  const mini = size === "mini";
  const leaves = product.theme === "grass" ? 14 : product.theme === "flower" ? 9 : product.theme === "pink" ? 8 : 11;
  const bg = product.theme === "pink" ? "from-rose-100 via-white to-emerald-50" : product.theme === "flower" ? "from-lime-100 via-white to-emerald-100" : product.theme === "variegated" ? "from-yellow-50 via-white to-emerald-100" : "from-emerald-100 via-white to-lime-100";
  const height = hero ? "h-[370px]" : thumb ? "h-20 w-20" : mini ? "h-48" : "h-52";

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${bg} ${height} ${hero ? "rounded-[42px]" : thumb ? "rounded-2xl" : "rounded-[24px]"}`}>
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/70" />
      <div className="absolute -bottom-14 -left-12 h-48 w-48 rounded-full bg-emerald-950/10" />
      <div className={`absolute left-1/2 -translate-x-1/2 rounded-full bg-emerald-800 ${hero ? "bottom-24 h-28 w-3" : thumb ? "bottom-8 h-10 w-1.5" : "bottom-16 h-20 w-2.5"}`} />
      {Array.from({ length: leaves }).map((_, i) => {
        const angle = -76 + i * (152 / Math.max(leaves - 1, 1));
        const leafHeight = hero ? 76 + (i % 3) * 14 : thumb ? 24 : 48 + (i % 3) * 7;
        const leafWidth = product.theme === "grass" ? leafHeight * 0.16 : leafHeight * 0.42;
        const colour = product.theme === "pink" ? "from-rose-300 to-emerald-500" : product.theme === "variegated" ? "from-lime-200 to-emerald-700" : "from-lime-400 to-emerald-700";
        return (
          <div
            key={i}
            className={`absolute left-1/2 origin-bottom rounded-full bg-gradient-to-br ${colour} shadow-sm`}
            style={{
              width: leafWidth,
              height: leafHeight,
              bottom: hero ? 142 : thumb ? 42 : 88,
              transform: `translateX(-50%) rotate(${angle}deg) translateY(-${hero ? 40 : thumb ? 12 : 20}px)`,
              opacity: 0.93
            }}
          />
        );
      })}
      {product.theme === "flower" && !thumb && Array.from({ length: hero ? 10 : 7 }).map((_, i) => (
        <div key={i} className="absolute z-10 rounded-full bg-white shadow-sm" style={{ width: hero ? 18 : 12, height: hero ? 18 : 12, left: `${38 + (i % 5) * 7}%`, top: `${34 + Math.floor(i / 5) * 8}%` }} />
      ))}
      <div className={`absolute left-1/2 -translate-x-1/2 bg-stone-950 shadow-2xl ${hero ? "bottom-16 h-20 w-28 rounded-b-3xl rounded-t-xl" : thumb ? "bottom-2 h-8 w-10 rounded-b-xl rounded-t-md" : "bottom-6 h-14 w-20 rounded-b-2xl rounded-t-lg"}`} />
      {!thumb && <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-full bg-white/80 shadow-xl ${hero ? "h-16 w-72" : "h-10 w-44"}`} />}
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

function Header({ approved, setApproved, cartCount, setCartOpen }: { approved: boolean; setApproved: (value: boolean) => void; cartCount: number; setCartOpen: (value: boolean) => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-[#fbfaf5]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-5 px-5 py-4">
        <a href="#home" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm ring-1 ring-stone-200">♧</div>
          <div>
            <div className="font-serif text-2xl font-black leading-none text-emerald-950 md:text-3xl">Wholesale Green Co</div>
            <div className="text-[9px] font-black uppercase tracking-[0.35em] text-stone-500">Wholesale Plants</div>
          </div>
        </a>

        <nav className="hidden items-center gap-9 text-sm font-black text-emerald-950 lg:flex">
          <a className="hover:text-emerald-700" href="#catalogue">Plants⌄</a>
          <a className="hover:text-emerald-700" href="#collections">Collections⌄</a>
          <a className="hover:text-emerald-700" href="#trade">Trade Access</a>
          <a className="hover:text-emerald-700" href="#resources">Resources⌄</a>
          <a className="hover:text-emerald-700" href="#contact">Contact</a>
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

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-[#fbfaf5]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_0%,rgba(22,101,52,0.14),transparent_34%),radial-gradient(circle_at_8%_40%,rgba(22,101,52,0.08),transparent_28%)]" />

      <div className="relative mx-auto grid max-w-[1500px] gap-8 px-5 pb-8 pt-12 lg:grid-cols-[0.88fr_1.12fr] lg:pt-16">
        <div className="z-10 flex flex-col justify-center">
          <div className="mb-4 w-fit rounded-full bg-white px-6 py-3 text-xs font-black uppercase tracking-[0.35em] text-emerald-900 shadow-sm ring-1 ring-stone-200">Grown for Professionals</div>
          <h1 className="font-serif text-5xl font-black leading-[0.94] tracking-tight text-emerald-950 md:text-6xl xl:text-7xl">
            Premium Wholesale<br />Plants for Trade Buyers
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-700">
            Beautiful indoor foliage and landscape varieties sourced from trusted growers and delivered for professional buyers.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href="#catalogue" className="rounded-2xl bg-emerald-800 px-7 py-4 text-center text-base font-black text-white shadow-xl shadow-emerald-950/15 hover:bg-emerald-950">Browse Plants →</a>
            <a href="#trade" className="rounded-2xl border border-emerald-950/30 bg-white px-7 py-4 text-center text-base font-black text-emerald-950 shadow-sm hover:bg-emerald-50">🔒 Apply for Trade Access</a>
          </div>
          <div className="mt-7 grid max-w-3xl gap-4 sm:grid-cols-3">
            {[
              ["🌿", "Quality Assured", "Supplier approved & trade ready"],
              ["🚚", "Reliable Supply", "Consistent availability all year round"],
              ["🪴", "Trade Focused", "Built for landscapers, retailers & designers"],
            ].map(([icon, title, text]) => (
              <div key={title} className="flex gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xl">{icon}</div>
                <div>
                  <div className="text-sm font-black text-emerald-950">{title}</div>
                  <div className="text-xs font-semibold leading-5 text-stone-600">{text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[460px] overflow-hidden rounded-[46px] bg-gradient-to-br from-white via-emerald-50 to-emerald-100 p-8 shadow-sm ring-1 ring-stone-200">
          <div className="absolute right-0 top-0 h-full w-[52%] rounded-l-[100px] bg-emerald-900/10" />
          <div className="absolute left-10 top-24 h-80 w-80 rounded-full bg-emerald-900/10" />
          <div className="absolute right-16 top-16 w-[56%]">
            <PlantVisual product={products[0]} size="hero" />
          </div>
          <div className="absolute right-10 top-24 rounded-[26px] border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur">
            <div className="font-serif text-2xl font-black text-emerald-950">Wholesale<br />Excellence</div>
            <p className="mt-3 max-w-40 text-sm leading-6 text-stone-700">Premium quality plants for professional results.</p>
          </div>
        </div>
      </div>

      <div id="collections" className="relative mx-auto grid max-w-[1500px] gap-4 px-5 pb-8 lg:grid-cols-2">
        <a href="#catalogue" className="overflow-hidden rounded-[26px] bg-white p-6 shadow-sm ring-1 ring-stone-200 hover:shadow-lg">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-3xl">🪴</div>
            <div>
              <h2 className="font-serif text-3xl font-black text-emerald-950">Indoor & Feature</h2>
              <p className="mt-1 text-sm leading-6 text-stone-700">Stylish foliage and statement plants perfect for interiors and retail.</p>
            </div>
          </div>
        </a>
        <a href="#catalogue" className="overflow-hidden rounded-[26px] bg-emerald-800 p-6 text-white shadow-sm hover:bg-emerald-900">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-3xl">🌾</div>
            <div>
              <h2 className="font-serif text-3xl font-black">Landscape & Outdoor</h2>
              <p className="mt-1 text-sm leading-6 text-emerald-50">Hardy, reliable varieties for gardens, public spaces and landscapes.</p>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}

function ProductCard({ product, approved, addToCart, openProduct }: { product: Product; approved: boolean; addToCart: (product: Product, qty?: number) => void; openProduct: (product: Product) => void }) {
  return (
    <article className="group overflow-hidden rounded-[24px] bg-white shadow-sm ring-1 ring-stone-200 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative">
        <PlantVisual product={product} />
        <button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-emerald-950 shadow-sm">♡</button>
      </div>
      <div className="p-5">
        <h3 className="font-serif text-2xl font-black text-emerald-950">{product.name}</h3>
        <p className="text-sm italic text-stone-500">{product.botanical}</p>
        <p className="mt-3 min-h-[72px] text-sm leading-6 text-stone-600">{product.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.tags.map((tag) => <span key={tag} className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-800">{tag}</span>)}
        </div>

        {approved ? (
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs font-black text-stone-500">Trade price</div>
              <div className="text-2xl font-black text-emerald-950">${product.price.toFixed(2)}</div>
              <div className="text-xs font-semibold text-stone-500">each</div>
            </div>
            <div>
              <div className="text-xs font-black text-stone-500">Project from</div>
              <div className="text-2xl font-black text-emerald-950">${product.project.toFixed(2)}</div>
              <div className="text-xs font-semibold text-stone-500">each</div>
            </div>
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-emerald-900/10 bg-emerald-50/70 p-4 text-sm font-black text-emerald-950">🔒 Trade pricing on sign-in</div>
        )}

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button onClick={() => openProduct(product)} className="rounded-2xl border border-emerald-800/30 bg-white px-4 py-3 text-sm font-black text-emerald-950 hover:bg-emerald-50">View details</button>
          <button onClick={() => approved ? addToCart(product) : document.getElementById("trade")?.scrollIntoView({ behavior: "smooth" })} className="rounded-2xl bg-emerald-800 px-4 py-3 text-sm font-black text-white hover:bg-emerald-950">{approved ? "Add to bulk order +" : "Apply access"}</button>
        </div>
      </div>
    </article>
  );
}

function Catalogue({ approved, addToCart, openProduct }: { approved: boolean; addToCart: (product: Product, qty?: number) => void; openProduct: (product: Product) => void }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Plants");
  const [sort, setSort] = useState("Popularity");

  const filtered = useMemo(() => {
    let list = products.filter((product) => {
      const hay = `${product.name} ${product.botanical} ${product.category} ${product.type} ${product.description}`.toLowerCase();
      return hay.includes(query.toLowerCase()) && (category === "All Plants" || product.category === category || (category === "Ferns" && product.type === "Fern"));
    });

    if (sort === "Availability") list = [...list].sort((a, b) => b.available - a.available);
    if (sort === "Price Low") list = [...list].sort((a, b) => a.price - b.price);

    return list;
  }, [query, category, sort]);

  return (
    <section id="catalogue" className="bg-[#fbfaf5] px-5 py-12">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.35em] text-emerald-700">{approved ? "Approved Buyer Catalogue" : "Featured Plants"}</div>
            <h2 className="mt-2 font-serif text-4xl font-black text-emerald-950 md:text-5xl">{approved ? "Wholesale Plants for Trade Professionals" : "Featured Plants"}</h2>
            <p className="mt-2 text-stone-600">{approved ? "Trade prices are now visible. Add items to your bulk order and request a formal quote." : "Hand-selected varieties loved by professionals. Pricing unlocks after trade access."}</p>
          </div>
          <button onClick={() => setCategory("All Plants")} className="w-fit rounded-2xl border border-emerald-800/30 bg-white px-5 py-3 text-sm font-black text-emerald-950">View all plants →</button>
        </div>

        <div className="mb-5 grid gap-3 lg:grid-cols-[1fr_auto]">
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search plants by name or variety..." className="h-16 rounded-3xl border border-stone-200 bg-white px-6 text-base font-semibold outline-none shadow-sm focus:ring-4 focus:ring-emerald-600/20" />
          <select value={sort} onChange={(event) => setSort(event.target.value)} className="h-16 rounded-3xl border border-stone-200 bg-white px-6 text-base font-black text-emerald-950 outline-none shadow-sm">
            <option>Popularity</option>
            <option>Availability</option>
            <option>Price Low</option>
          </select>
        </div>

        <div className="mb-5 flex gap-3 overflow-x-auto pb-2">
          {categories.map((cat) => <button key={cat} onClick={() => setCategory(cat)} className={`whitespace-nowrap rounded-2xl px-5 py-3 text-sm font-black shadow-sm ring-1 ring-stone-200 ${category === cat ? "bg-emerald-800 text-white" : "bg-white text-emerald-950"}`}>{cat}</button>)}
        </div>

        <div className="mb-8 grid gap-3 rounded-3xl bg-emerald-50 p-4 text-sm font-bold text-emerald-950 md:grid-cols-4">
          <div>🪴 Premium quality, professionally grown</div>
          <div>🔐 Trade prices for approved buyers</div>
          <div>🚚 Delivered to your project</div>
          <div>🏷️ 5,000+ mixed orders eligible</div>
        </div>

        <div className="mb-5 text-sm font-black text-stone-500">{filtered.length} results</div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {filtered.map((product) => <ProductCard key={product.id} product={product} approved={approved} addToCart={addToCart} openProduct={openProduct} />)}
        </div>
      </div>
    </section>
  );
}

function TradeAccess({ setApproved }: { setApproved: (value: boolean) => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setStatus("");

    const form = new FormData(event.currentTarget);

    try {
      await postJson("/api/trade-application", {
        business_name: form.get("business_name"),
        abn: form.get("abn"),
        delivery_suburb: form.get("delivery_suburb"),
        expected_monthly_volume: form.get("expected_monthly_volume"),
        email: form.get("email"),
        phone: form.get("phone"),
        buyer_type: form.get("buyer_type"),
        message: form.get("message"),
      });

      setSubmitted(true);
      setStatus("✅ Application saved. We will contact you shortly.");
      event.currentTarget.reset();
    } catch (error) {
      setStatus(`❌ ${error instanceof Error ? error.message : "Could not save application."}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section id="trade" className="bg-[#fbfaf5] px-5 py-14">
      <div className="mx-auto grid max-w-[1500px] gap-8 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-[42px] bg-emerald-950 p-8 text-white shadow-2xl md:p-10">
          <div className="mb-4 inline-flex rounded-full bg-white/10 px-5 py-2 text-sm font-black text-emerald-100">Trade-only access</div>
          <h2 className="font-serif text-4xl font-black leading-tight md:text-5xl">Trade buyers apply first. Serious buyers unlock pricing.</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-emerald-50/85">
            This protects sensitive wholesale prices while allowing customers to see your premium range, professional presentation and availability before applying.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {["Exclusive wholesale pricing", "Priority stock availability", "Dedicated trade support", "Early access to new releases"].map((item) => <div key={item} className="rounded-3xl bg-white/10 p-5 font-bold">✅ {item}</div>)}
          </div>
        </div>

        <div className="rounded-[36px] bg-white p-7 shadow-sm ring-1 ring-stone-200">
          {submitted ? (
            <div>
              <div className="text-5xl">✅</div>
              <h3 className="mt-3 font-serif text-3xl font-black text-emerald-950">Application received</h3>
              <p className="mt-2 leading-7 text-stone-600">Your trade application has been saved. We will review it and contact you shortly.</p>
              <button onClick={() => setApproved(true)} className="mt-5 w-full rounded-2xl bg-emerald-800 px-6 py-4 font-black text-white">Preview approved buyer catalogue</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 className="font-serif text-3xl font-black text-emerald-950">Trade Account Application</h3>
              <p className="mt-1 text-stone-600">Apply for wholesale access in minutes.</p>

              <div className="mt-5 grid gap-3">
                <input name="business_name" required placeholder="Business Name *" className="h-14 rounded-2xl border border-stone-200 bg-stone-50 px-4 font-semibold outline-none focus:ring-4 focus:ring-emerald-600/20" />
                <input name="abn" placeholder="ABN" className="h-14 rounded-2xl border border-stone-200 bg-stone-50 px-4 font-semibold outline-none focus:ring-4 focus:ring-emerald-600/20" />
                <input name="delivery_suburb" placeholder="Delivery Suburb" className="h-14 rounded-2xl border border-stone-200 bg-stone-50 px-4 font-semibold outline-none focus:ring-4 focus:ring-emerald-600/20" />
                <input name="expected_monthly_volume" placeholder="Expected Monthly Volume" className="h-14 rounded-2xl border border-stone-200 bg-stone-50 px-4 font-semibold outline-none focus:ring-4 focus:ring-emerald-600/20" />
                <input name="email" required type="email" placeholder="Email *" className="h-14 rounded-2xl border border-stone-200 bg-stone-50 px-4 font-semibold outline-none focus:ring-4 focus:ring-emerald-600/20" />
                <input name="phone" placeholder="Phone" className="h-14 rounded-2xl border border-stone-200 bg-stone-50 px-4 font-semibold outline-none focus:ring-4 focus:ring-emerald-600/20" />
                <select name="buyer_type" className="h-14 rounded-2xl border border-stone-200 bg-stone-50 px-4 font-semibold outline-none focus:ring-4 focus:ring-emerald-600/20">
                  <option>Retail Store</option>
                  <option>Landscaper</option>
                  <option>Grower / Nursery</option>
                  <option>Interior Plant Stylist</option>
                  <option>Developer / Project Buyer</option>
                </select>
                <textarea name="message" placeholder="Message" className="min-h-24 rounded-2xl border border-stone-200 bg-stone-50 p-4 font-semibold outline-none focus:ring-4 focus:ring-emerald-600/20" />
                {status && <div className="rounded-2xl bg-emerald-50 p-4 text-sm font-black text-emerald-950">{status}</div>}
                <button disabled={saving} className="mt-2 rounded-2xl bg-emerald-800 px-6 py-4 font-black text-white disabled:opacity-60">{saving ? "Saving..." : "Apply for Wholesale Access"}</button>
              </div>
              <p className="mt-3 text-sm font-semibold text-stone-500">We typically respond within 1 business day.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Resources() {
  return (
    <section id="resources" className="bg-[#fbfaf5] px-5 py-14">
      <div className="mx-auto grid max-w-[1500px] gap-6 lg:grid-cols-2">
        <div className="rounded-[36px] bg-white p-8 shadow-sm ring-1 ring-stone-200">
          <div className="inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-900">Google SEO</div>
          <h2 className="mt-4 font-serif text-4xl font-black text-emerald-950">Built for wholesale plant search intent</h2>
          <p className="mt-4 leading-8 text-stone-600">Target searches like wholesale tissue culture plants, wholesale indoor plants, bulk landscape plants, wholesale plant supplier Australia and trade plant supplier Melbourne.</p>
        </div>
        <div className="rounded-[36px] bg-white p-8 shadow-sm ring-1 ring-stone-200">
          <div className="inline-flex rounded-full bg-lime-50 px-4 py-2 text-sm font-black text-emerald-900">AI SEO</div>
          <h2 className="mt-4 font-serif text-4xl font-black text-emerald-950">Clear answers for AI search engines</h2>
          <p className="mt-4 leading-8 text-stone-600">The site explains what you sell, who you serve, how trade pricing works and how customers request bulk orders.</p>
        </div>
      </div>
    </section>
  );
}

function ProductModal({ product, approved, close, addToCart }: { product: Product | null; approved: boolean; close: () => void; addToCart: (product: Product, qty?: number) => void }) {
  const [qty, setQty] = useState(100);
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-emerald-950/55 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-6xl overflow-auto rounded-[42px] bg-[#fbfaf5] p-5 shadow-2xl">
        <div className="mb-4 flex justify-end">
          <button onClick={close} className="rounded-full bg-white px-5 py-2 font-black text-emerald-950 shadow-sm">Close ✕</button>
        </div>

        <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr]">
          <PlantVisual product={product} size="hero" />
          <div className="rounded-[34px] bg-white p-7 shadow-sm ring-1 ring-stone-200">
            <div className="mb-3 inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-800">{product.category}</div>
            <h2 className="font-serif text-5xl font-black text-emerald-950">{product.name}</h2>
            <p className="mt-1 text-lg italic text-stone-500">{product.botanical}</p>
            <p className="mt-5 text-lg leading-9 text-stone-700">{product.description}</p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-stone-50 p-4">
                <div className="text-xs font-black uppercase text-stone-500">Available</div>
                <div className="text-2xl font-black text-emerald-950">{product.available.toLocaleString()}</div>
              </div>
              <div className="rounded-2xl bg-stone-50 p-4">
                <div className="text-xs font-black uppercase text-stone-500">Best for</div>
                <div className="text-sm font-black text-emerald-950">{product.tags.join(", ")}</div>
              </div>
            </div>

            {approved ? (
              <div className="mt-5 rounded-3xl bg-emerald-950 p-5 text-white">
                <div className="text-sm text-emerald-100">Wholesale Trade Price</div>
                <div className="mt-1 text-4xl font-black">${product.price.toFixed(2)} AUD</div>
                <p className="mt-2 text-sm text-emerald-100">Project pricing from ${product.project.toFixed(2)} each.</p>
              </div>
            ) : (
              <div className="mt-5 rounded-3xl bg-emerald-50 p-5 font-black text-emerald-950">🔒 Apply for trade access to unlock price.</div>
            )}

            <div className="mt-5 flex gap-3">
              <button onClick={() => setQty(Math.max(50, qty - 50))} className="h-14 w-14 rounded-2xl bg-stone-100 text-2xl font-black">−</button>
              <input value={qty} onChange={(event) => setQty(Number(event.target.value || 0))} className="h-14 w-28 rounded-2xl border border-stone-200 text-center font-black" />
              <button onClick={() => setQty(qty + 50)} className="h-14 w-14 rounded-2xl bg-stone-100 text-2xl font-black">+</button>
              <button onClick={() => approved ? addToCart(product, qty) : document.getElementById("trade")?.scrollIntoView({ behavior: "smooth" })} className="flex-1 rounded-2xl bg-emerald-800 px-6 py-4 font-black text-white">{approved ? `Add ${qty} to Bulk Order` : "Apply for Wholesale Access"}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartDrawer({ cart, close, updateQty, removeItem, submitQuote, savingQuote }: { cart: CartItem[]; close: () => void; updateQty: (id: number, qty: number) => void; removeItem: (id: number) => void; submitQuote: () => void; savingQuote: boolean }) {
  const totalPlants = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  const project = cart.reduce((sum, item) => sum + item.qty * item.project, 0);

  return (
    <div className="fixed inset-0 z-[120] bg-emerald-950/50 backdrop-blur-sm">
      <aside className="ml-auto flex h-full w-full max-w-[520px] flex-col bg-[#fbfaf5] p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-stone-200 pb-5">
          <div>
            <h2 className="font-serif text-3xl font-black text-emerald-950">Your Bulk Order</h2>
            <p className="text-sm font-semibold text-stone-500">{cart.length} items</p>
          </div>
          <button onClick={close} className="text-2xl text-emerald-950">×</button>
        </div>

        <div className="my-5 rounded-3xl bg-emerald-50 p-5">
          <div className="font-black text-emerald-950">🏷️ 5,000+ mixed orders are eligible for special project pricing.</div>
          <p className="mt-2 text-sm leading-6 text-stone-600">Submit your request to receive a formal quote from our team.</p>
        </div>

        <div className="flex-1 overflow-auto">
          {cart.length === 0 ? (
            <div className="rounded-3xl bg-white p-5 text-stone-600 shadow-sm">Your cart is empty. Add products from the catalogue.</div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="mb-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-stone-200">
                <div className="flex gap-4">
                  <PlantVisual product={item} size="thumb" />
                  <div className="flex-1">
                    <div className="flex justify-between gap-3">
                      <div>
                        <div className="font-black text-emerald-950">{item.name}</div>
                        <div className="text-sm text-stone-500">140mm Pot</div>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-xl text-stone-500">×</button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center overflow-hidden rounded-2xl border border-stone-200">
                        <button onClick={() => updateQty(item.id, Math.max(50, item.qty - 50))} className="px-4 py-2 font-black">−</button>
                        <input value={item.qty} onChange={(event) => updateQty(item.id, Number(event.target.value || 0))} className="w-16 border-x border-stone-200 py-2 text-center font-black" />
                        <button onClick={() => updateQty(item.id, item.qty + 50)} className="px-4 py-2 font-black">+</button>
                      </div>
                      <div className="font-black text-emerald-950">${(item.qty * item.price).toFixed(2)}</div>
                    </div>

                    <div className="mt-2 text-xs font-semibold text-stone-500">${item.price.toFixed(2)} each · Project from ${item.project.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-stone-200 pt-5">
          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-stone-200">
            <div className="flex justify-between py-1"><span>Total plants</span><b>{totalPlants.toLocaleString()}</b></div>
            <div className="flex justify-between py-1"><span>Estimated subtotal</span><b>${subtotal.toFixed(2)}</b></div>
            <div className="flex justify-between py-1 text-emerald-800"><span>Estimated project pricing</span><b>from ${project.toFixed(2)}</b></div>
          </div>
          <button disabled={savingQuote || cart.length === 0} onClick={submitQuote} className="mt-4 w-full rounded-2xl bg-emerald-800 px-6 py-4 font-black text-white shadow-lg hover:bg-emerald-950 disabled:opacity-60">{savingQuote ? "Saving quote..." : "Request Formal Quote →"}</button>
          <p className="mt-3 text-center text-sm font-semibold text-stone-500">🔒 Secure · No payment required</p>
        </div>
      </aside>
    </div>
  );
}

export default function WholesaleGreenCoGreenridgeV4() {
  const [approved, setApproved] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [quoteSent, setQuoteSent] = useState(false);
  const [quoteError, setQuoteError] = useState("");
  const [savingQuote, setSavingQuote] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  function addToCart(product: Product, qty = 100) {
    setCart((previous) => {
      const existing = previous.find((item) => item.id === product.id);
      if (existing) {
        return previous.map((item) => item.id === product.id ? { ...item, qty: Math.min(item.available, item.qty + qty) } : item);
      }
      return [...previous, { ...product, qty: Math.min(product.available, qty) }];
    });
    setCartOpen(true);
  }

  function updateQty(id: number, qty: number) {
    setCart((previous) => previous.map((item) => item.id === id ? { ...item, qty: Math.max(0, Math.min(item.available, qty)) } : item).filter((item) => item.qty > 0));
  }

  function removeItem(id: number) {
    setCart((previous) => previous.filter((item) => item.id !== id));
  }

  async function submitQuote() {
    setSavingQuote(true);
    setQuoteError("");

    try {
      await postJson("/api/quote-request", {
        buyer_email: "website-buyer@wholesalegreenco.com",
        buyer_name: "Website Buyer",
        business_name: "Website Quote Request",
        delivery_suburb: "To be confirmed",
        notes: "Quote request submitted from live website.",
        items: cart.map((item) => ({
          product_name: item.name,
          quantity: item.qty,
          trade_price: item.price,
          project_price: item.project,
        })),
      });

      setQuoteSent(true);
      setCartOpen(false);
      setCart([]);
    } catch (error) {
      setQuoteError(error instanceof Error ? error.message : "Could not save quote.");
    } finally {
      setSavingQuote(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#fbfaf5] text-stone-900">
      <Header approved={approved} setApproved={setApproved} cartCount={cartCount} setCartOpen={setCartOpen} />
      <Hero />
      <Catalogue approved={approved} addToCart={addToCart} openProduct={setSelected} />
      <TradeAccess setApproved={setApproved} />
      <Resources />
      <footer id="contact" className="border-t border-stone-200 bg-white px-5 py-10">
        <div className="mx-auto grid max-w-[1500px] gap-6 md:grid-cols-3">
          <div>
            <div className="font-serif text-3xl font-black text-emerald-950">Wholesale Green Co</div>
            <p className="mt-2 text-sm leading-6 text-stone-600">Premium gated wholesale plant catalogue for Australian trade buyers.</p>
          </div>
          <div className="space-y-2 text-sm font-semibold text-stone-600">
            <div>☎️ Phone placeholder</div>
            <div>✉️ Email placeholder</div>
            <div>📍 Melbourne, Victoria</div>
          </div>
          <div className="rounded-2xl bg-stone-50 p-4 text-sm leading-6 text-stone-600">Product names, plant imagery and selected reference information are used with supplier approval and adapted for branding and marketing purposes.</div>
        </div>
      </footer>

      <ProductModal product={selected} approved={approved} close={() => setSelected(null)} addToCart={addToCart} />
      {cartOpen && <CartDrawer cart={cart} close={() => setCartOpen(false)} updateQty={updateQty} removeItem={removeItem} submitQuote={submitQuote} savingQuote={savingQuote} />}

      {quoteError && <div className="fixed bottom-5 left-1/2 z-[150] -translate-x-1/2 rounded-2xl bg-red-50 px-5 py-3 text-sm font-bold text-red-700 shadow-xl">{quoteError}</div>}

      {quoteSent && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center bg-emerald-950/55 p-4 backdrop-blur-sm">
          <div className="max-w-xl rounded-[36px] bg-white p-9 text-center shadow-2xl">
            <div className="text-6xl">✅</div>
            <h2 className="mt-4 font-serif text-4xl font-black text-emerald-950">Formal quote request sent</h2>
            <p className="mt-3 leading-7 text-stone-600">Your quote request has been saved. We will review stock, freight and final pricing and contact you shortly.</p>
            <button onClick={() => setQuoteSent(false)} className="mt-6 rounded-2xl bg-emerald-800 px-8 py-4 font-black text-white">Back to website</button>
          </div>
        </div>
      )}
    </div>
  );
}
