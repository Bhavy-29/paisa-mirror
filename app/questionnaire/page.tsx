"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Questionnaire() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    photoDataUrl: "",
    parentName: "",
    parentAge: "",
    monthlyIncome: "",
    currentSavings: "",
    hasPension: "",
    habitsDetail: ""
  });

  const totalSteps = 6;
  const progress = ((step + 1) / (totalSteps + 1)) * 100;

  function next() {
    if (step < totalSteps) setStep(step + 1);
  }

  function back() {
    if (step > 0) setStep(step - 1);
  }
  
  function finish() {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "pm_profile",
        JSON.stringify({
          photoDataUrl: data.photoDataUrl,
          parentName: data.parentName || "Mummy",
          parentAge: Number(data.parentAge) || 50,
          monthlyIncome: Number(data.monthlyIncome) || 0,
          currentSavings: Number(data.currentSavings) || 0,
          hasPension: data.hasPension === "yes",
          habitsDetail: data.habitsDetail || "no particular saving habit"
        })
      );
    }
    router.push("/reveal");
  }

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () =>
      setData({ ...data, photoDataUrl: reader.result as string });
    reader.readAsDataURL(file);
  }

  const inputClass =
    "w-full px-5 py-4 text-lg bg-neutral-900 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition";

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.08),_transparent_60%)] pointer-events-none" />

      <div className="relative w-full max-w-xl">
        <div className="mb-10">
          <p className="text-xs tracking-[0.3em] text-amber-300/70 mb-3">
            STEP {step + 1} OF {totalSteps + 1}
          </p>
          <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-200 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-neutral-950/60 border border-neutral-800 rounded-3xl p-8 md:p-10 backdrop-blur">
          {step === 0 && (
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-light mb-3">
                Upload a photo
              </h2>
              <p className="text-neutral-400 mb-8">
                A clear face photo of your parent works best.
              </p>

              <label className="block cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhoto}
                  className="hidden"
                />
                <div className="border-2 border-dashed border-neutral-700 hover:border-amber-400/50 rounded-2xl p-8 text-center transition">
                  {data.photoDataUrl ? (
                    <img
                      src={data.photoDataUrl}
                      alt="preview"
                      className="mx-auto rounded-xl max-h-56 object-cover"
                    />
                  ) : (
                    <div>
                      <div className="text-4xl mb-3">📷</div>
                      <p className="text-neutral-300">Click to choose a photo</p>
                      <p className="text-sm text-neutral-500 mt-1">
                        JPG or PNG
                      </p>
                    </div>
                  )}
                </div>
              </label>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-light mb-3">
                What is your parent&apos;s name?
              </h2>
              <p className="text-neutral-400 mb-8">
                We&apos;ll use this to make them speak to you.
              </p>
              <input
                type="text"
                value={data.parentName}
                onChange={(e) =>
                  setData({ ...data, parentName: e.target.value })
                }
                className={inputClass}
                placeholder="e.g. Mummy, Papa, Amma"
                autoFocus
              />
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-light mb-3">
                Their current age?
              </h2>
              <p className="text-neutral-400 mb-8">
                We&apos;ll show them at 70.
              </p>
              <input
                type="number"
                value={data.parentAge}
                onChange={(e) =>
                  setData({ ...data, parentAge: e.target.value })
                }
                className={inputClass}
                placeholder="e.g. 50"
                autoFocus
              />
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-light mb-3">
                Monthly household income (₹)?
              </h2>
              <p className="text-neutral-400 mb-8">
                A rough number is fine.
              </p>
              <input
                type="number"
                value={data.monthlyIncome}
                onChange={(e) =>
                  setData({ ...data, monthlyIncome: e.target.value })
                }
                className={inputClass}
                placeholder="e.g. 60000"
                autoFocus
              />
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-light mb-3">
                Current savings & investments (₹)?
              </h2>
              <p className="text-neutral-400 mb-8">
                Include FD, mutual funds, savings account.
              </p>
              <input
                type="number"
                value={data.currentSavings}
                onChange={(e) =>
                  setData({ ...data, currentSavings: e.target.value })
                }
                className={inputClass}
                placeholder="e.g. 200000"
                autoFocus
              />
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-light mb-3">
                Do they have a pension or EPF?
              </h2>
              <p className="text-neutral-400 mb-8">
                This changes the math.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setData({ ...data, hasPension: "yes" })}
                  className={`flex-1 py-4 rounded-xl text-lg border transition ${
                    data.hasPension === "yes"
                      ? "bg-amber-400 text-black border-amber-400"
                      : "bg-neutral-900 border-neutral-700 text-white hover:border-amber-400/50"
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setData({ ...data, hasPension: "no" })}
                  className={`flex-1 py-4 rounded-xl text-lg border transition ${
                    data.hasPension === "no"
                      ? "bg-amber-400 text-black border-amber-400"
                      : "bg-neutral-900 border-neutral-700 text-white hover:border-amber-400/50"
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          )}

          {step === 6 && (
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-light mb-3">
                Any money habits we should know?
              </h2>
              <p className="text-neutral-400 mb-8">
                This will be woven into what they say. Optional.
              </p>
              <textarea
                value={data.habitsDetail}
                onChange={(e) =>
                  setData({ ...data, habitsDetail: e.target.value })
                }
                className={`${inputClass} min-h-[120px]`}
                placeholder="e.g. eats out often, no savings habit"
                autoFocus
              />
            </div>
          )}
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={back}
            disabled={step === 0}
            className="px-6 py-3 text-lg text-neutral-400 hover:text-white disabled:opacity-30 transition"
          >
            ← Back
          </button>

          {step < totalSteps ? (
            <button
              onClick={next}
              className="px-8 py-3 bg-white text-black rounded-full text-lg font-medium hover:scale-[1.03] transition"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={finish}
              className="px-8 py-3 bg-amber-400 text-black rounded-full text-lg font-medium hover:scale-[1.03] transition shadow-[0_0_30px_rgba(212,175,55,0.35)]"
            >
              See both futures →
            </button>
          )}
        </div>
      </div>
    </main>
  );
}