"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Captions } from "lucide-react";
import AdaptiveQuestion from "@/components/AdaptiveQuestion";
import HighlightedContent from "@/components/HighlightedContent";
import type { GeneratedLesson } from "@/types/learning";

interface HearingEnvironmentProps {
  lesson: GeneratedLesson;
  onComplete: () => void;
}

const COLOR = "var(--visual-color)";

export default function HearingEnvironment({ lesson, onComplete }: HearingEnvironmentProps) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"content" | "question">("content");

  const total = lesson.sections.length;
  const section = lesson.sections[index];
  const isLast = index === total - 1;

  function handleNext() {
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

      <div className="mb-5 flex items-center gap-2 text-xs font-bold text-muted">
        <span
          className="flex h-6 w-6 items-center justify-center rounded-full font-num"
          style={{ background: "var(--visual-soft)", color: COLOR }}
        >
          {index + 1}
        </span>
        مفهوم {index + 1} من {total}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${index}-${phase}`}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3 }}
        >
          {phase === "content" ? (
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h2 className="text-lg font-bold text-foreground">{section.title}</h2>

              <div
                className="mt-4 flex items-start gap-2.5 rounded-xl p-4 text-white"
                style={{ background: COLOR }}
              >
                <Captions size={18} className="mt-0.5 shrink-0" />
                <p className="text-base font-bold leading-relaxed">{section.explanation}</p>
              </div>

              {section.visualStructure.length > 0 && (
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {section.visualStructure.map((step, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span
                        className="rounded-lg px-3 py-2 text-xs font-bold"
                        style={{ background: "var(--visual-soft)", color: COLOR }}
                      >
                        {step}
                      </span>
                      {i < section.visualStructure.length - 1 && (
                        <span className="text-muted">←</span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {section.vocabulary.length > 0 && (
                <div className="mt-5 grid gap-3 border-t border-border pt-4 sm:grid-cols-2">
                  {section.vocabulary.map((v) => (
                    <div key={v.term} className="rounded-xl border border-border p-3">
                      <p className="text-sm font-extrabold" style={{ color: COLOR }}>
                        {v.term}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-muted">
                        {v.simpleExplanation}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-5">
                <HighlightedContent
                  content={section.example}
                  terms={section.vocabulary}
                  colorVar={COLOR}
                  className="text-sm leading-relaxed text-foreground/85"
                />
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
              nextLabel={isLast ? "كملت الدرس!" : "المفهوم اللي بعده"}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
