# Paisa Mirror

See your parents at 70 — two futures, one choice.

Built at **TechnoFora '26** · FinTech Track · Problem Statement #5
**Live demo:** https://paisa-mirror-deploy.vercel.app
---

## The Problem

India has a retirement crisis. Most families never plan, and the money conversation between parents and children is avoided until it is too late. By then, the parent depends on the child, and the child is unprepared.

Only a small fraction of Indians are financially literate enough to plan for retirement.

## Our Solution

**Paisa Mirror** lets a user upload a photo of their parent and see two AI-generated versions of that parent at age 70:

- **Dependent future** — parent has no savings, relies on the child financially
- **Independent future** — parent is free and self-funded

Both versions speak to the user with real compound-interest math behind their words. The app then gives a concrete monthly savings plan and a 3-line conversation script the user can use to talk to their parent.

## Features

- Upload any photo of a parent
- 6-step questionnaire (name, age, income, savings, pension, money habits)
- Real compound-interest projections for both futures
- AI-generated voices from both futures (via Google Gemini)
- Split-screen reveal comparing the two futures side-by-side
- Voice playback using browser text-to-speech
- Monthly SIP plan with step-up recommendation
- Suggested conversation script

## Tech Stack

- **Framework:** Next.js (App Router), TypeScript
- **Styling:** Tailwind CSS
- **AI:** Google Gemini API (server-side via Next.js API route)
- **Voice:** Browser SpeechSynthesis API
- **Database:** Supabase (profiles table)
- **Deployment:** Vercel

## System Architecture

1. User lands on the app and completes a photo + questionnaire flow. Data is stored in localStorage.
2. The reveal page reads the profile and calls `calculateFutures()` from `lib/projection.ts` to compute both future corpora using compound-interest math.
3. On demand, the page builds two persona prompts (`lib/prompts.ts`) and calls `/api/persona`, which forwards the request to Google Gemini using a server-side API key.
4. The returned text is spoken aloud with `lib/tts.ts` and displayed on both halves of the split-screen.

## APIs Used

- **Google Gemini API** — generates persona dialogue for both futures
- **Browser SpeechSynthesis** — text-to-speech for persona lines
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
git clone https://github.com/Bhavy-29/paisa-mirror.git
cd paisa-mirror
npm install
cp .env.example .env
# Fill in .env:
# GEMINI_API_KEY=your_gemini_key
# NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
npm run dev