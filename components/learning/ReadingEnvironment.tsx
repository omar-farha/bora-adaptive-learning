"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Square, Wand2 } from "lucide-react";
import AdaptiveQuestion from "@/components/AdaptiveQuestion";
import TermTooltip from "@/components/TermTooltip";
import { escapeRegExp } from "@/lib/utils";
import type { GeneratedLesson, VocabularyItem } from "@/types/learning";

interface ReadingEnvironmentProps {
  lesson: GeneratedLesson;
  onComplete: () => void;
}

const COLOR = "var(--reading-color)";
const SPEEDS = [0.75, 1, 1.25];

function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!؟?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function renderWithVocabulary(text: string, vocabulary: VocabularyItem[], colorVar: string) {
  if (!vocabulary.length) return text;
  const pattern = vocabulary.map((v) => escapeRegExp(v.term)).join("|");
  if (!pattern) return text;
  const regex = new RegExp(`(${pattern})`, "g");
  const parts = text.split(regex);

  return parts.map((part, i) => {
    const match = vocabulary.find((v) => v.term === part);
    if (match) {
      return (
        <TermTooltip
          key={i}
          term={match.term}
          explanation={match.simpleExplanation}
          example={match.example}
          colorVar={colorVar}
        />
      );
    }
    return part;
  });
}

export default function ReadingEnvironment({ lesson, onComplete }: ReadingEnvironmentProps) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"content" | "question">("content");
  const [simplified, setSimplified] = useState(false);
  const [rate, setRate] = useState(1);
  const [playingSentence, setPlayingSentence] = useState(-1);
  const supported = useRef(typeof window !== "undefined" && "speechSynthesis" in window);

  const total = lesson.sections.length;
  const section = lesson.sections[index];
  const isLast = index === total - 1;
  const activeText = simplified ? section.simpleExplanation : section.explanation;
  const sentences = splitSentences(activeText);

  useEffect(() => {
    return () => {
      if (supported.current) window.speechSynthesis.cancel();
    };
  }, [index, phase]);

  function playFrom(startIndex: number) {
    if (!supported.current) return;
    window.speechSynthesis.cancel();

    let i = startIndex;
    function speakNext() {
      if (i >= sentences.length) {
        setPlayingSentence(-1);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(sentences[i]);
      utterance.lang = "ar-EG";
      utterance.rate = rate;
      utterance.onstart = () => setPlayingSentence(i);
      utterance.onend = () => {
        i += 1;
        speakNext();
      };
      utterance.onerror = () => setPlayingSentence(-1);
      window.speechSynthesis.speak(utterance);
    }
    speakNext();
  }

  function stop() {
    if (supported.current) window.speechSynthesis.cancel();
    setPlayingSentence(-1);
  }

  function handleNext() {
    stop();
    setSimplified(false);
    if (isLast) {
      onComplete();
      return;
    }
    setIndex((i) => i + 1);
    setPhase("content");
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-10 sm:px-8">
      {index === 0 && phase === "content" && (
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-extrabold text-foreground">{lesson.lessonTitle}</h1>
        </div>
      )}

      <div className="mb-5 flex items-center gap-2">
        {lesson.sections.map((_, i) => (
          <span
            key={i}
            className="h-1.5 rounded-full transition-all duration-500"
            style={{ width: i === index ? 28 : 8, background: i <= index ? COLOR : "var(--border)" }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${index}-${phase}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {phase === "content" ? (
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h2 className="text-xl font-bold text-foreground">{section.title}</h2>

              <p className="mt-4 text-lg leading-loose text-foreground/90">
                {sentences.map((sentence, i) => (
                  <span
                    key={i}
                    className="rounded transition-colors duration-200"
                    style={{
                      background: i === playingSentence ? "var(--reading-soft)" : "transparent",
                      boxDecorationBreak: "clone",
                      WebkitBoxDecorationBreak: "clone",
                    }}
                  >
                    {renderWithVocabulary(sentence + " ", section.vocabulary, COLOR)}
                  </span>
                ))}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                {supported.current && (
                  <button
                    type="button"
                    onClick={() => (playingSentence >= 0 ? stop() : playFrom(0))}
                    className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold text-white"
                    style={{ background: COLOR }}
                  >
                    {playingSentence >= 0 ? <Square size={14} /> : <Play size={14} />}
                    {playingSentence >= 0 ? "إيقاف" : "اقرا بصوت عالي"}
                  </button>
                )}

                <div className="flex items-center gap-1 rounded-full border border-border p-1">
                  {SPEEDS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRate(s)}
                      className="rounded-full px-2.5 py-1 text-xs font-bold font-num"
                      style={{
                        background: rate === s ? COLOR : "transparent",
                        color: rate === s ? "#fff" : "var(--muted)",
                      }}
                    >
                      {s}x
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    stop();
                    setSimplified((v) => !v);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-bold transition-colors duration-200"
                  style={{ borderColor: COLOR, color: COLOR }}
                >
                  <Wand2 size={14} />
                  {simplified ? "النص الأصلي" : "بسّط الجملة"}
                </button>
              </div>

              <button
                type="button"
                onClick={() => setPhase("question")}
                className="mt-6 rounded-full px-6 py-3 text-sm font-bold text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: COLOR }}
              >
                جاوب على السؤال
              </button>
            </div>
          ) : (
            <AdaptiveQuestion
              question={section.question}
              lessonContext={lesson.lessonTitle}
              previousExplanation={section.explanation}
              accentColor={COLOR}
              onResolved={handleNext}
              nextLabel={isLast ? "كملت الدرس!" : "الجزء اللي بعده"}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
