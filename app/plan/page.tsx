"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { calculateFutures, formatINR } from "@/lib/projection";

interface Profile {
  parentName: string;
  parentAge: number;
  currentSavings: number;
  monthlyIncome: number;
  habitsDetail: string;
}

export default function Plan() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [monthlyNeeded, setMonthlyNeeded] = useState(0);
  const [target, setTarget] = useState(0);
  const [corpusA, setCorpusA] = useState(0);
  const [corpusB, setCorpusB] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("pm_profile");
    if (!stored) return;
    const p: Profile = JSON.parse(stored);
    setProfile(p);

    const r = calculateFutures({
      parentCurrentAge: p.parentAge,
      retirementAge: 70,
      currentSavings: p.currentSavings,
      monthlyAmountUserCanAdd: 0
    });

    setMonthlyNeeded(r.monthlyNeeded);
    setTarget(r.targetCorpus);
    setCorpusA(r.corpusA);
    setCorpusB(r.corpusB);
  }, []);

  if (!profile) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-400 mb-6">No profile found.</p>
          <Link
            href="/questionnaire"
            className="px-6 py-3 bg-white text-black rounded-full"
          >
            Go back
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-black text-white px-6 py-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.12),_transparent_60%)] pointer-events-none" />

      <div className="relative max-w-2xl mx-auto">
        <p className="text-xs tracking-[0.35em] text-amber-300/70 mb-4 text-center">
          THE PLAN
        </p>
        <h1 className="text-4xl md:text-5xl font-serif font-light text-center">
          Every month, <span className="italic text-amber-200">₹{monthlyNeeded.toLocaleString("en-IN")}</span>
        </h1>
        <p className="mt-6 text-center text-neutral-400 max-w-lg mx-auto leading-relaxed">
          That is what closes the gap between{" "}
          <span className="text-red-400">{formatINR(corpusA)}</span> and{" "}
          <span className="text-amber-300">{formatINR(corpusB)}</span>.
          Start this month. Increase it by 10% every year.
        </p>

        <div className="mt-14 grid gap-5">
          <div className="rounded-3xl border border-neutral-800 bg-neutral-950/60 backdrop-blur p-8">
            <p className="text-xs tracking-[0.25em] text-neutral-500 mb-3">
              MONTHLY SIP
            </p>
            <p className="text-5xl font-serif font-light text-amber-300">
              {formatINR(monthlyNeeded)}
            </p>
            <p className="mt-3 text-neutral-500 text-sm">
              Step up 10% yearly · Assume 12% annual return
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-800 bg-neutral-950/60 backdrop-blur p-8">
            <p className="text-xs tracking-[0.25em] text-neutral-500 mb-3">
              TARGET CORPUS AT 70
            </p>
            <p className="text-4xl font-serif font-light">
              {formatINR(target)}
            </p>
            <p className="mt-3 text-neutral-500 text-sm">
              25× annual expenses — dignified, independent life
            </p>
          </div>

          <div className="rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-950/40 to-neutral-950 p-8">
            <p className="text-xs tracking-[0.25em] text-amber-400/70 mb-4">
              FIRST STEP
            </p>
            <p className="text-xl font-serif font-light leading-relaxed">
              Open a monthly SIP of{" "}
              <span className="text-amber-300">
                {formatINR(monthlyNeeded)}
              </span>{" "}
              in a Nifty 50 index fund this week — in{" "}
              {profile.parentName}&apos;s name.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-800 bg-neutral-950/60 backdrop-blur p-8">
            <p className="text-xs tracking-[0.25em] text-neutral-500 mb-4">
              WHAT TO SAY TO {profile.parentName.toUpperCase()}
            </p>
            <div className="space-y-3 text-lg text-neutral-200 italic font-serif">
              <p>&ldquo;Ma, I want to talk about something important.&rdquo;</p>
              <p>
                &ldquo;I have started a small monthly saving in your name.&rdquo;
              </p>
              <p>
                &ldquo;By the time you turn 70, you will not need anyone&apos;s
                help.&rdquo;
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex justify-center gap-3">
          <Link
            href="/"
            className="px-8 py-4 bg-white/10 border border-white/20 rounded-full text-base font-medium hover:bg-white/20 transition"
          >
            Start over
          </Link>
          <Link
            href="/reveal"
            className="px-8 py-4 bg-amber-400 text-black rounded-full text-base font-medium hover:scale-[1.03] transition shadow-[0_0_30px_rgba(212,175,55,0.35)]"
          >
            ← Back to the two futures
          </Link>
        </div>
      </div>
    </main>
  );
}