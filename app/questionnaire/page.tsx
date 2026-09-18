"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080808] px-6 text-white">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-3xl" />
      </div>

      <section
        className={`relative z-10 max-w-4xl text-center transition-all duration-[1400ms] ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }`}
      >
        <p className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">
          PAISA MIRROR
        </p>

        <h1 className="text-4xl font-medium leading-[1.08] tracking-tight sm:text-6xl md:text-7xl">
          Your parents will turn 70.
          <br />
          <span className="text-white/55">
            What will their life look like?
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-xl text-sm leading-6 text-white/40 sm:text-base">
          A glimpse into two possible financial futures.
        </p>

        <button
          onClick={() => router.push("/questionnaire")}
          className="group mt-10 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white px-7 py-3.5 text-sm font-medium text-black transition-all duration-300 hover:scale-105 hover:bg-white/90 active:scale-95"
        >
          Find out

          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>
      </section>
    </main>
  );
}