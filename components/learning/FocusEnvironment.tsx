"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lightbulb, ArrowLeft } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";
import AdaptiveQuestion from "@/components/AdaptiveQuestion";
import SpeakButton from "@/components/SpeakButton";
import type { GeneratedLesson } from "@/types/learning";

interface FocusEnvironmentProps {
  lesson: GeneratedLesson;
  onComplete: () => void;
}

const COLOR = "var(--focus-color)";

export default function FocusEnvironment({ lesson, onComplete }: FocusEnvironmentProps) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"content" | "question">("content");
  const [showExample, setShowExample] = useState(false);

  const total = lesson.sections.length;
  const section = lesson.sections[index];
  const isLast = index === total - 1;

  function goToQuestion() {
    setPhase("question");
  }

  function handleNext() {
    setShowExample(false);
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 text-center"
        >
          <h1 className="text-2xl font-extrabold text-foreground">{lesson.lessonTitle}</h1>
        </motion.div>
      )}

      <ProgressBar
        current={index + 1}
        total={total}
        colorVar={COLOR}
        label={`أنت في الجزء ${index + 1} من ${total}`}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={`${index}-${phase}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="mt-6"
        >
          {phase === "content" ? (
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
              <p className="mt-3 text-base leading-relaxed text-foreground/90">
                {section.explanation}
              </p>

              <div
                className="mt-5 flex items-start gap-2.5 rounded-xl p-4"
                style={{ background: "var(--focus-soft)" }}
              >
                <Lightbulb size={18} className="mt-0.5 shrink-0" style={{ color: COLOR }} />
                <p className="text-sm font-semibold text-foreground">{section.simpleExplanation}</p>
              </div>

              {showExample && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 rounded-xl border border-dashed border-border p-4"
                >
                  <p className="text-xs font-bold uppercase tracking-wide text-muted">مثال</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">
                    {section.example}
                  </p>
                </motion.div>
              )}

              <div className="mt-5 flex flex-wrap gap-3">
                <SpeakButton text={section.audioScript} colorVar={COLOR} label="اسمع الشرح" />
                {!showExample && (
                  <button
                    type="button"
                    onClick={() => setShowExample(true)}
                    className="rounded-full border px-4 py-2 text-sm font-bold transition-colors duration-200"
                    style={{ borderColor: COLOR, color: COLOR }}
                  >
                    ورّيني مثال
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={goToQuestion}
                className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: COLOR }}
              >
                جاوب على السؤال
                <ArrowLeft size={15} />
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
