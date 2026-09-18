let currentUtterance: SpeechSynthesisUtterance | null = null;

export function speak(text: string, voiceName?: string): void {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    console.warn("Speech synthesis not supported in this browser.");
    return;
  }

  stopSpeaking();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  const voices = window.speechSynthesis.getVoices();

  if (voiceName) {
    const match = voices.find((v) => v.name === voiceName);
    if (match) utterance.voice = match;
  }

  if (!utterance.voice) {
    const preferred =
      voices.find((v) => v.lang === "en-IN" && v.name.toLowerCase().includes("female")) ||
      voices.find((v) => v.lang === "en-IN") ||
      voices.find((v) => v.lang === "hi-IN") ||
      voices.find((v) => v.name.toLowerCase().includes("female"));
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