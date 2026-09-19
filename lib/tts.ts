let currentUtterance: SpeechSynthesisUtterance | null = null;

const FEMALE_KEYWORDS = [
  "female",
  "woman",
  "samantha",
  "victoria",
  "karen",
  "moira",
  "tessa",
  "fiona",
  "zira",
  "heera",
  "swara",
  "veena",
  "lekha",
  "priya",
  "aditi",
  "neerja"
];

export function speak(text: string, voiceName?: string): void {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    console.warn("Speech synthesis not supported in this browser.");
    return;
  }

  stopSpeaking();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.92;
  utterance.pitch = 1.15;
  utterance.volume = 1.0;

  const voices = window.speechSynthesis.getVoices();

  if (voiceName) {
    const match = voices.find((v) => v.name === voiceName);
    if (match) utterance.voice = match;
  }

  if (!utterance.voice) {
    const preferred =
      voices.find(
        (v) =>
          (v.lang === "en-IN" || v.lang === "hi-IN") &&
          FEMALE_KEYWORDS.some((k) => v.name.toLowerCase().includes(k))
      ) ||
      voices.find(
        (v) =>
          v.lang === "en-IN" &&
          !v.name.toLowerCase().includes("male")
      ) ||
      voices.find((v) =>
        FEMALE_KEYWORDS.some((k) => v.name.toLowerCase().includes(k))
      ) ||
      voices.find((v) => v.lang === "en-IN") ||
      voices.find((v) => v.lang === "hi-IN");

    if (preferred) utterance.voice = preferred;
  }

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  currentUtterance = null;
}

export function getAvailableVoices(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined" || !window.speechSynthesis) return [];
  return window.speechSynthesis.getVoices();
}