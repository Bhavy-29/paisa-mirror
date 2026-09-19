# Paisa Mirror

See your parents at 70 — two futures, one choice.

Built at **TechnoFora '26** · FinTech Track · Problem Statement #5

**Live demo:** https://paisa-mirror-deploy.vercel.app

---

## The Problem

India is facing a retirement crisis. Most families never plan for it, and the money conversation between parents and children is avoided until it is too late. By the time it matters, the parent depends on the child, who is completely unprepared.

Only a small fraction of Indians are financially literate enough to plan for their own retirement. The result: millions of parents enter their 70s with no savings, and millions of children enter their 30s carrying a financial burden they never chose.

Paisa Mirror was built to fix that — by making the retirement conversation impossible to ignore.

## Our Solution

Paisa Mirror lets a user upload a photo of their parent and see two AI-generated versions of that parent at age 70:

- **Dependent future** — the parent has almost no savings and relies on the child financially
- **Independent future** — the parent is free and self-funded because the child planned early

Both versions speak to the user in a warm, natural voice. Behind their words is a real compound-interest engine, so the numbers on screen reflect the exact math of the user's choices.

The app ends with a monthly SIP plan, a target corpus, a first step, and a short conversation script the user can use to start the talk with their parent.

## Features

- Upload any photo of a parent
- 6-step questionnaire: name, age, monthly income, current savings, pension, money habits
- Real compound-interest projections for both futures
- AI-generated voices from both futures (via Google Gemini)
- Split-screen reveal comparing the two futures side by side
- Voice playback using the browser speechSynthesis API
- Monthly SIP plan with 10% annual step-up
- Conversation script in Gujarati-Hindi mixed language
- Fully responsive — works on phone and desktop

## Tech Stack

- **Framework:** Next.js (App Router), TypeScript
- **Styling:** Tailwind CSS
- **AI:** Google Gemini API (server-side via Next.js API route)
- **Voice:** Browser speechSynthesis API (free, no signup)
- **Database:** Supabase (optional profile persistence)
- **Deployment:** Vercel

## System Architecture

1. The user lands on the app and completes a photo + questionnaire flow. Answers are stored in the browser's `localStorage` under the key `pm_profile`.
2. The reveal page reads the profile and calls `calculateFutures()` from `lib/projection.ts` to compute both future corpora using compound-interest math.
3. When the user clicks "Hear what she has to say", the page builds two persona prompts using `lib/prompts.ts` and sends them to `/api/persona`.
4. The server route `/api/persona` forwards the request to Google Gemini with a server-side API key (never exposed to the client).
5. The returned text is spoken aloud with `lib/tts.ts` and displayed on both halves of the split-screen.
6. Optionally, the profile can be persisted to Supabase via `lib/supabase.ts`.

## APIs Used

- **Google Gemini API** — generates persona dialogue for both futures
- **Browser speechSynthesis** — text-to-speech for the persona lines
- **Supabase** — optional profile persistence

## Database

Supabase `profiles` table:

| Column | Type |
|--------|------|
| id | uuid |
| created_at | timestamp |
| parent_name | text |
| parent_age | int |
| parent_photo_url | text |
| monthly_income | int |
| monthly_expenses | int |
| current_savings | int |
| has_pension | boolean |
| futures_json | jsonb |
| plan_json | jsonb |

## Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/Bhavy-29/paisa-mirror.git
cd paisa-mirror

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env

# Open .env and fill in:
#   GEMINI_API_KEY=your_google_gemini_key
#   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
#   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# 4. Run the development server
npm run dev

# 5. Open http://localhost:3000