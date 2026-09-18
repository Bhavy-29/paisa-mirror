"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type FutureResult = {
  dependent: number;
  independent: number;
};

const formatINR = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

export default function Reveal() {
  const router = useRouter();

  const [results, setResults] = useState<FutureResult>({
    dependent: 0,
    independent: 18000000,
  });

  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    /*
     * Member 1 can replace this demo calculation with:
     *
     * const profile = JSON.parse(
     *   localStorage.getItem("pm_profile") || "{}"
     * );
     *
     * calculateFutures(profile)
     */

    setTimeout(() => {
      setRevealed(true);
    }, 400);
  }, []);

  const formatINR = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-black">
      <div className="grid min-h-screen md:grid-cols-2">
        {/* DEPENDENT FUTURE */}
        <FuturePanel
          type="dependent"
          image="/demo/family1-aged-sad.jpg"
          amount={results.dependent}
          label="Dependent future — living on your money"
          revealed={revealed}
        />

        {/* INDEPENDENT FUTURE */}
        <FuturePanel
          type="independent"
          image="/demo/family1-aged-happy.jpg"
          amount={results.independent}
          label="Independent future — free and self-funded"
          revealed={revealed}
        />
      </div>

      {/* Bottom CTA */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 flex justify-center pb-7">
        <button
          onClick={() => router.push("/")}
          className="pointer-events-auto rounded-full border border-white/20 bg-black/80 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-black active:scale-95"
        >
          Hear what she has to say
          <span className="ml-2">→</span>
        </button>
      </div>
    </main>
  );
}

function FuturePanel({
  type,
  image,
  amount,
  label,
  revealed,
}: {
  type: "dependent" | "independent";
  image: string;
  amount: number;
  label: string;
  revealed: boolean;
}) {
  const isIndependent = type === "independent";

  return (
    <section
      className={`relative flex min-h-[50vh] flex-col justify-center overflow-hidden px-6 pb-28 pt-10 transition-all duration-1000 md:min-h-screen md:px-10 lg:px-16 ${
        isIndependent
          ? "bg-[#eee8dc] text-[#181714]"
          : "bg-[#11100f] text-white"
      }`}
    >
      {/* Background glow */}
      <div
        className={`pointer-events-none absolute inset-0 ${
          isIndependent
            ? "bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.8),transparent_55%)]"
            : "bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.06),transparent_55%)]"
        }`}
      />

      <div
        className={`relative z-10 mx-auto w-full max-w-xl transition-all duration-[1200ms] ${
          revealed
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }`}
      >
        {/* Image */}
        <div className="group relative overflow-hidden rounded-[2rem]">
          <img
            src={image}
            alt=""
            className="aspect-[4/3] w-full object-cover animate-breathe transition duration-700 group-hover:scale-105"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Future label */}
        <p
          className={`mt-8 text-xs font-semibold uppercase tracking-[0.25em] ${
            isIndependent ? "text-black/40" : "text-white/35"
          }`}
        >
          {isIndependent ? "THE INDEPENDENT FUTURE" : "THE DEPENDENT FUTURE"}
        </p>

        {/* Number */}
        <div
          className={`mt-3 text-5xl font-medium tracking-tight transition-all duration-1000 sm:text-6xl lg:text-7xl ${
            isIndependent ? "text-emerald-700" : "text-red-400"
          }`}
        >
          {formatINR(amount)}
        </div>

        {/* Description */}
        <p
          className={`mt-3 max-w-sm text-sm leading-6 ${
            isIndependent ? "text-black/50" : "text-white/45"
          }`}
        >
          {label}
        </p>
      </div>
    </section>
  );
}