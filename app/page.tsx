import Link from "next/link";

function MirrorLogo() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-40 h-40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f5e6a8" />
          <stop offset="50%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#8b6914" />
        </linearGradient>
        <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="100" cy="100" r="90" fill="url(#glow)" />

      <ellipse
        cx="100"
        cy="100"
        rx="55"
        ry="75"
        stroke="url(#goldGrad)"
        strokeWidth="2"
      />
      <line x1="100" y1="25" x2="100" y2="175" stroke="url(#goldGrad)" strokeWidth="1.5" />

      <circle cx="70" cy="80" r="6" fill="url(#goldGrad)" />
      <circle cx="130" cy="80" r="6" fill="url(#goldGrad)" />

      <path
        d="M60 130 Q100 145 140 130"
        stroke="url(#goldGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.18),_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.05),_transparent_60%)]" />

      <div className="relative z-10 grid md:grid-cols-2 min-h-screen">
        <section className="flex flex-col justify-center px-8 md:px-20 py-16 animate-[fadeUp_1s_ease-out]">
          <p className="text-xs tracking-[0.35em] text-amber-300/70 mb-6">
            PAISA MIRROR
          </p>

          <h1 className="text-5xl md:text-7xl leading-[1.05] font-serif font-light">
            Your parents
            <br />
            will turn{" "}
            <span className="italic text-amber-200">70.</span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-neutral-400 max-w-md leading-relaxed">
            Upload a photo. Meet the two versions of them that could exist —
            one broke, one free. Both will speak to you.
          </p>

          <Link
            href="/questionnaire"
            className="mt-12 inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full text-base font-medium w-fit transition-all hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            Find out
            <span className="text-lg">→</span>
          </Link>

          <p className="mt-16 text-xs text-neutral-600">
            Built at TechnoFora &apos;26 · FinTech Track
          </p>
        </section>

        <section className="relative hidden md:flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black z-10" />
          <div className="relative w-[80%] h-[80%] rounded-3xl bg-gradient-to-br from-amber-900/20 to-neutral-900 border border-amber-500/15 flex flex-col items-center justify-center shadow-[0_0_80px_rgba(212,175,55,0.1)]">
            <MirrorLogo />
            <p className="mt-6 text-xs tracking-[0.3em] text-amber-200/60">
              TWO FUTURES · ONE CHOICE
            </p>
          </div>
        </section>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}