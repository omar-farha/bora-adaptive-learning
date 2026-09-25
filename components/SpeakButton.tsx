"use client";

import { useEffect, useState } from "react";
import { Volume2, Square } from "lucide-react";

interface SpeakButtonProps {
  text: string;
  colorVar: string;
  rate?: number;
  label?: string;
  onBoundary?: (charIndex: number) => void;
  onEnd?: () => void;
}

export default function SpeakButton({
  text,
  colorVar,
  rate = 1,
  label = "اسمع الشرح",
  onBoundary,
  onEnd,
}: SpeakButtonProps) {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function toggle() {
    if (!supported) return;

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ar-EG";
    utterance.rate = rate;
    utterance.onboundary = (e) => onBoundary?.(e.charIndex);
    utterance.onend = () => {
      setSpeaking(false);
      onEnd?.();
    };
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  }

  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-bold transition-colors duration-200"
      style={{ borderColor: colorVar, color: colorVar }}
    >
      {speaking ? <Square size={14} /> : <Volume2 size={14} />}
      {speaking ? "إيقاف" : label}
    </button>
  );
}
