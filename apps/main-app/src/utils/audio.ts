let audioContext: AudioContext | null = null;

function context(): AudioContext | null {
  try {
    audioContext ??= new AudioContext();
    if (audioContext.state === 'suspended') void audioContext.resume();
    return audioContext;
  } catch {
    return null;
  }
}

export function speakEnglish(word: string, enabled: boolean): void {
  if (!enabled || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-US';
  utterance.rate = 0.68;
  utterance.pitch = 1.12;
  utterance.volume = 1;

  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find((voice) => /en-US/i.test(voice.lang) && /female|samantha|zira|ava/i.test(voice.name))
    ?? voices.find((voice) => /en-US/i.test(voice.lang));
  if (preferred) utterance.voice = preferred;
  window.speechSynthesis.speak(utterance);
}

export function playChime(kind: 'tap' | 'success' | 'complete', enabled: boolean): void {
  if (!enabled) return;
  const ctx = context();
  if (!ctx) return;

  const notes = kind === 'complete' ? [523.25, 659.25, 783.99] : kind === 'success' ? [523.25, 659.25] : [440];
  const now = ctx.currentTime;
  notes.forEach((frequency, index) => {
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, now + index * 0.09);
    gain.gain.exponentialRampToValueAtTime(0.12, now + index * 0.09 + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.09 + 0.2);
    oscillator.connect(gain).connect(ctx.destination);
    oscillator.start(now + index * 0.09);
    oscillator.stop(now + index * 0.09 + 0.22);
  });
}
