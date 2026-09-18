# Testing Checklist — Paisa Mirror

Every item below was manually verified on both laptop and mobile.

## Landing Page
- [x] Dark background renders correctly
- [x] Custom mirror logo visible on desktop
- [x] "Find out" button navigates to /questionnaire

## Questionnaire
- [x] Photo upload works (shows preview)
- [x] All 6 questions accept input
- [x] Progress bar updates with each step
- [x] "Back" and "Next" buttons work
- [x] Final button saves to localStorage and goes to /reveal

## Reveal Screen
- [x] Split-screen renders on desktop
- [x] Stacked layout on mobile
- [x] Parent photo appears in both halves
- [x] corpusA (dependent) shows in red on left
- [x] corpusB (independent) shows in gold on right
- [x] Numbers match a manual compound-interest calculation
- [x] "Hear what she has to say" triggers AI voices
- [x] Voice playback works and can be replayed

## Plan Screen
- [x] Monthly SIP amount renders
- [x] Target corpus renders
- [x] First step card displays
- [x] Conversation script displays
- [x] "Start over" clears localStorage and returns home

## API & Integrations
- [x] /api/persona returns text from Gemini
- [x] API key is server-side only (not exposed to client)
- [x] Supabase profiles table exists and accepts inserts

## Deployment
- [x] Live URL accessible
- [x] Works on mobile data
- [x] Works on desktop

## Browser Compatibility
- [x] Chrome
- [x] Safari
- [x] Edge

## Known Limitations
- Face aging uses static aged photos, not a live API
- Browser speechSynthesis voice varies by device and OS
- Supabase persistence is optional — app works fully offline with localStorage
-