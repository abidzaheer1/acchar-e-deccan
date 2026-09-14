"use client";

import { useMemo, useState } from "react";
import { products, type Product } from "./products";

type CartLine = { product: Product; qty: number };
type Cart = Record<string, CartLine>;

const rupee = (n: number) => `₹${n.toLocaleString("en-IN")}`;

function HeatMeter({ heat }: { heat: Product["heat"] }) {
  return (
    <span aria-label={`Heat level ${heat} of 3`} className="text-sm">
      {"🌶️".repeat(heat)}
      <span className="opacity-25">{"🌶️".repeat(3 - heat)}</span>
    </span>
  );
}

export default function Storefront() {
  const [cart, setCart] = useState<Cart>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev[product.id];
      return {
        ...prev,
        [product.id]: { product, qty: (existing?.qty ?? 0) + 1 },
      };
    });
    setFlash(product.name);
    window.setTimeout(() => setFlash(null), 1400);
  };

  const changeQty = (id: string, delta: number) => {
    setCart((prev) => {
      const line = prev[id];
      if (!line) return prev;
      const qty = line.qty + delta;
      if (qty <= 0) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: { ...line, qty } };
    });
  };

  const lines = Object.values(cart);
  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.qty, 0),
    [lines],
  );
  const total = useMemo(
    () => lines.reduce((sum, l) => sum + l.qty * l.product.price, 0),
    [lines],
  );

  return (
    <div className="min-h-screen bg-[#fdf6ec] text-stone-900">
      <header className="sticky top-0 z-20 border-b border-amber-900/10 bg-[#fdf6ec]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-amber-500 to-red-700 text-2xl shadow-inner">
              🫙
            </span>
            <div className="leading-tight">
              <p className="font-serif text-xl font-bold tracking-tight text-red-800">
                Acchar-e-Deccan
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-amber-700">
                Handcrafted Pickles
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setCartOpen((v) => !v)}
            className="relative flex items-center gap-2 rounded-full bg-red-800 px-5 py-2.5 text-sm font-semibold text-amber-50 shadow-md transition hover:bg-red-900"
          >
            <span>Cart</span>
            <span
              data-testid="cart-count"
              className="grid h-6 min-w-6 place-items-center rounded-full bg-amber-400 px-1.5 text-xs font-bold text-red-900"
            >
              {itemCount}
            </span>
          </button>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-amber-900/10">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 sm:py-20">
          <p className="w-fit rounded-full bg-amber-200/70 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-amber-800">
            From the heart of the plateau
          </p>
          <h1 className="max-w-3xl font-serif text-4xl font-bold leading-tight text-red-900 sm:text-5xl">
            Small-batch pickles from the kitchens of the Deccan.
          </h1>
          <p className="max-w-2xl text-lg text-stone-700">
            Sun-cured, stone-ground, and packed in cold-pressed oils. Every jar
            carries a recipe passed down across Hyderabad, Guntur, and beyond.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="mb-8 font-serif text-2xl font-bold text-stone-800">
          The Pantry
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              data-testid={`product-${product.id}`}
              className="flex flex-col overflow-hidden rounded-2xl border border-amber-900/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className={`grid h-40 place-items-center bg-gradient-to-br ${product.accent} text-6xl`}
              >
                {product.emoji}
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-stone-900">
                      {product.name}
                    </h3>
                    <p className="text-xs uppercase tracking-wide text-amber-700">
                      {product.region}
                    </p>
                  </div>
                  <HeatMeter heat={product.heat} />
                </div>
                <p className="flex-1 text-sm leading-relaxed text-stone-600">
                  {product.description}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-lg font-bold text-red-800">
                    {rupee(product.price)}
                  </span>
                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="rounded-full bg-red-800 px-4 py-2 text-sm font-semibold text-amber-50 transition hover:bg-red-900 active:scale-95"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {flash && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-30 -translate-x-1/2 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-amber-50 shadow-lg"
        >
          Added {flash} to your cart
        </div>
      )}

      {cartOpen && (
        <div className="fixed inset-0 z-40 flex justify-end">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setCartOpen(false)}
          />
          <aside className="relative flex h-full w-full max-w-md flex-col bg-[#fdf6ec] shadow-2xl">
            <div className="flex items-center justify-between border-b border-amber-900/10 px-6 py-5">
              <h2 className="font-serif text-xl font-bold text-red-900">
                Your Cart
              </h2>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="rounded-full p-2 text-stone-500 hover:bg-amber-100"
                aria-label="Close cart"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
              {lines.length === 0 && (
                <p className="pt-10 text-center text-stone-500">
                  Your cart is empty. Add a jar to get started.
                </p>
              )}
              {lines.map(({ product, qty }) => (
                <div
                  key={product.id}
                  data-testid={`cart-line-${product.id}`}
                  className="flex items-center gap-4 rounded-xl border border-amber-900/10 bg-white p-3"
                >
                  <span
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-gradient-to-br ${product.accent} text-2xl`}
                  >
                    {product.emoji}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-stone-900">
                      {product.name}
                    </p>
                    <p className="text-sm text-stone-500">
                      {rupee(product.price)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => changeQty(product.id, -1)}
                      className="grid h-7 w-7 place-items-center rounded-full bg-amber-100 text-lg font-bold text-red-800 hover:bg-amber-200"
                      aria-label={`Decrease ${product.name}`}
                    >
                      −
                    </button>
                    <span
                      data-testid={`qty-${product.id}`}
                      className="w-6 text-center font-semibold"
                    >
                      {qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => changeQty(product.id, 1)}
                      className="grid h-7 w-7 place-items-center rounded-full bg-amber-100 text-lg font-bold text-red-800 hover:bg-amber-200"
                      aria-label={`Increase ${product.name}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-amber-900/10 px-6 py-5">
              <div className="mb-4 flex items-center justify-between text-lg">
                <span className="font-medium text-stone-700">Total</span>
                <span data-testid="cart-total" className="font-bold text-red-800">
                  {rupee(total)}
                </span>
              </div>
              <button
                type="button"
                disabled={lines.length === 0}
                className="w-full rounded-full bg-red-800 py-3 font-semibold text-amber-50 transition hover:bg-red-900 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Checkout
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
