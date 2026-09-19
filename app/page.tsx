"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { calculateFutures, formatINR } from "@/lib/projection";
import {
  buildDependentPrompt,
  buildIndependentPrompt,
  PersonaProfile
} from "@/lib/prompts";
import { callGemini } from "@/lib/gemini";
import { speak, stopSpeaking } from "@/lib/tts";

interface Profile {
  photoDataUrl: string;
  parentName: string;
  parentAge: number;
  monthlyIncome: number;
  currentSavings: number;
  hasPension: boolean;
  habitsDetail: string;
}

export default function Reveal() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [corpusA, setCorpusA] = useState(0);
  const [corpusB, setCorpusB] = useState(0);
  const [dependentLine, setDependentLine] = useState("");
  const [independentLine, setIndependentLine] = useState("");
  const [loading, setLoading] = useState(false);
  const [spoken, setSpoken] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("pm_profile");
    if (!stored) return;
    const p: Profile = JSON.parse(stored);
    setProfile(p);

    const result = calculateFutures({
      parentCurrentAge: p.parentAge,
      retirementAge: 70,
      currentSavings: p.currentSavings,
      monthlyAmountUserCanAdd: 9000,
      annualReturnPercent: 12
    });
    setCorpusA(result.corpusA);
    setCorpusB(result.corpusB);
  }, []);

  async function hearHer() {
    if (!profile) return;
    setLoading(true);

    const personaProfile: PersonaProfile = {
      parentName: profile.parentName,
      userName: "beta",
      userAge: 25,
      parentAge: profile.parentAge,
      habitsDetail: profile.habitsDetail,
      corpusA,
      corpusB
    };

    try {
      const depPrompt = buildDependentPrompt(personaProfile);
      const indPrompt = buildIndependentPrompt(personaProfile);

      const [dep, ind] = await Promise.all([
        callGemini(depPrompt),
        callGemini(indPrompt)
      ]);

      setDependentLine(dep);
      setIndependentLine(ind);
      setSpoken(true);

      stopSpeaking();
      speak(dep);
      setTimeout(() => speak(ind), 7000);
    } catch (e) {
      console.error(e);
      const msg =
        e instanceof Error && e.message.includes("GEMINI_API_KEY")
          ? "(AI is not configured — please contact the team)"
          : "(Could not reach the AI — check your internet and try again)";
      setDependentLine(msg);
      setIndependentLine(msg);
    } finally {
      setLoading(false);
    }
  }

  if (!profile) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
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
    <main className="min-h-screen bg-black text-white">
      <header className="text-center pt-10 pb-4 px-6">
        <p className="text-xs tracking-[0.35em] text-amber-300/60">
          TWO FUTURES · ONE PARENT
        </p>
        <h1 className="mt-3 text-2xl md:text-3xl font-serif font-light">
          Meet {profile.parentName}, age 70
        </h1>
      </header>

      <div className="grid md:grid-cols-2 gap-0 md:gap-6 px-4 md:px-10 pb-32">
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-neutral-950 to-black border border-red-900/30 p-8 flex flex-col items-center text-center min-h-[500px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(220,38,38,0.08),_transparent_70%)] pointer-events-none" />

          {profile.photoDataUrl && (
            <div className="relative">
              <img
                src={profile.photoDataUrl}
                alt="parent"
                className="w-40 h-40 object-cover rounded-full border-2 border-red-900/40 grayscale contrast-75 blur-[0.5px]"
              />
            </div>
          )}

          <p className="mt-8 text-xs tracking-[0.3em] text-red-400/70">
            DEPENDENT FUTURE
          </p>

          <p className="mt-4 text-5xl md:text-6xl font-serif font-light text-red-400">
            {formatINR(corpusA)}
          </p>

          <p className="mt-3 text-neutral-500 text-sm">
            living on your money
          </p>

          <div className="mt-8 pt-8 border-t border-neutral-800 w-full">
            <p className="text-neutral-300 italic text-lg leading-relaxed min-h-[100px] flex items-center justify-center">
              {dependentLine || (
                <span className="text-neutral-600 not-italic text-sm">
                  Press the button below to hear her voice
                </span>
              )}
            </p>
          </div>
        </section>

        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-amber-50 to-white border border-amber-200 p-8 flex flex-col items-center text-center min-h-[500px] text-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.15),_transparent_70%)] pointer-events-none" />

          {profile.photoDataUrl && (
            <div className="relative">
              <img
                src={profile.photoDataUrl}
                alt="parent"
                className="w-40 h-40 object-cover rounded-full border-2 border-amber-300 saturate-125"
              />
            </div>
          )}

          <p className="mt-8 text-xs tracking-[0.3em] text-amber-700/80">
            INDEPENDENT FUTURE
          </p>

          <p className="mt-4 text-5xl md:text-6xl font-serif font-light text-amber-700">
            {formatINR(corpusB)}
          </p>

          <p className="mt-3 text-neutral-600 text-sm">
            free and self-funded
          </p>

          <div className="mt-8 pt-8 border-t border-amber-200 w-full">
            <p className="text-neutral-800 italic text-lg leading-relaxed min-h-[100px] flex items-center justify-center">
              {independentLine || (
                <span className="text-neutral-500 not-italic text-sm">
                  Press the button below to hear her voice
                </span>
              )}
            </p>
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/95 to-transparent pt-8 pb-6 px-6">
        <div className="flex justify-center gap-3">
          <button
            onClick={hearHer}
            disabled={loading}
            className="px-8 py-4 bg-amber-400 text-black rounded-full text-base font-medium hover:scale-[1.03] transition disabled:opacity-50 shadow-[0_0_30px_rgba(212,175,55,0.35)]"
          >
            {loading
              ? "Summoning their voices..."
              : spoken
              ? "Play again"
              : "Hear what she has to say"}
          </button>
          <Link
            href="/plan"
            className="px-8 py-4 bg-white/10 border border-white/20 text-white rounded-full text-base font-medium hover:bg-white/20 transition"
          >
            See the plan →
          </Link>
        </div>
      </div>
    </main>
  );
}