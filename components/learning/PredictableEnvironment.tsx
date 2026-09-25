"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Settings2 } from "lucide-react";
import AdaptiveQuestion from "@/components/AdaptiveQuestion";
import LessonMap from "@/components/LessonMap";
import PredictableTransition from "@/components/PredictableTransition";
import type { GeneratedLesson, DensityPreference, ContrastPreference } from "@/types/learning";

interface PredictableEnvironmentProps {
  lesson: GeneratedLesson;
  onComplete: () => void;
}

const COLOR = "var(--calm-color)";

type Phase = "map" | "content" | "transition" | "question";

const densityOptions: { value: DensityPreference; label: string }[] = [
  { value: "minimal", label: "أقل" },
  { value: "balanced", label: "متوسط" },
  { value: "detailed", label: "تفصيلي" },
];

const contrastOptions: { value: ContrastPreference; label: string }[] = [
  { value: "soft", label: "ناعم" },
  { value: "standard", label: "عادي" },
  { value: "high", label: "قوي" },
];

export default function PredictableEnvironment({ lesson, onComplete }: PredictableEnvironmentProps) {
  const [phase, setPhase] = useState<Phase>("map");
  const [index, setIndex] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [density, setDensity] = useState<DensityPreference>("balanced");
  const [contrast, setContrast] = useState<ContrastPreference>("standard");

  const total = lesson.sections.length;
  const section = lesson.sections[index];
  const isLast = index === total - 1;

  function handleQuestionResolved() {
    if (isLast) {
      onComplete();
      return;
    }
    setPhase("transition");
  }

  function advanceToNextSection() {
    setIndex((i) => i + 1);
    setPhase("content");
  }

  const contrastStyle =
    contrast === "high"
      ? { borderWidth: 2, borderColor: "var(--foreground)" }
      : contrast === "soft"
        ? { borderWidth: 1, borderColor: "var(--border)", opacity: 0.95 }
        : {};

  return (
    <div className="mx-auto max-w-2xl px-5 py-10 sm:px-8">
      {phase !== "map" && (
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {lesson.sections.map((_, i) => (
              <span
                key={i}
                className="h-1.5 rounded-full transition-all duration-500"
                style={{
                  width: i === index ? 28 : 8,
                  background: i <= index ? COLOR : "var(--border)",
                }}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setSettingsOpen((o) => !o)}
            aria-label="إعدادات العرض"
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-background-alt hover:text-foreground"
          >
            <Settings2 size={16} />
          </button>
        </div>
      )}

      {settingsOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mb-4 rounded-xl border border-border bg-card p-4"
        >
          <p className="text-xs font-bold text-muted">كثافة العرض</p>
          <div className="mt-2 flex gap-2">
            {densityOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setDensity(opt.value)}
                className="rounded-full border px-3 py-1.5 text-xs font-semibold"
                style={{
                  borderColor: density === opt.value ? COLOR : "var(--border)",
                  color: density === opt.value ? COLOR : "var(--muted)",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs font-bold text-muted">التباين</p>
          <div className="mt-2 flex gap-2">
            {contrastOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setContrast(opt.value)}
                className="rounded-full border px-3 py-1.5 text-xs font-semibold"
                style={{
                  borderColor: contrast === opt.value ? COLOR : "var(--border)",
                  color: contrast === opt.value ? COLOR : "var(--muted)",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {phase === "map" && (
          <motion.div key="map" exit={{ opacity: 0 }}>
            <LessonMap lesson={lesson} colorVar={COLOR} onStart={() => setPhase("content")} />
          </motion.div>
        )}

        {phase === "transition" && (
          <PredictableTransition
            key="transition"
            nextLabel={lesson.sections[index + 1]?.title || "المراجعة"}
            colorVar={COLOR}
            onDone={advanceToNextSection}
          />
        )}

        {(phase === "content" || phase === "question") && (
          <motion.div
            key={`${index}-${phase}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {phase === "content" ? (
              <div
                className="rounded-2xl border border-border bg-card p-7 shadow-soft"
                style={contrastStyle}
              >
                <h2 className="text-xl font-bold text-foreground">{section.title}</h2>

                <p className="mt-4 text-base leading-loose text-foreground/90">
                  {section.explanation}
                </p>

                {density !== "minimal" && section.visualStructure.length > 0 && (
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {section.visualStructure.map((step, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span
                          className="rounded-lg px-3 py-1.5 text-xs font-bold"
                          style={{ background: "var(--calm-soft)", color: COLOR }}
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

                {density === "detailed" && (
                  <div className="mt-6 border-t border-border pt-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-muted">مثال</p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                      {section.example}
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setPhase("question")}
                  className="mt-7 w-full rounded-xl py-3.5 text-sm font-bold text-white transition-colors duration-200 sm:w-auto sm:px-8"
                  style={{ background: COLOR }}
                >
                  جاهز للسؤال
                </button>
              </div>
            ) : (
              <AdaptiveQuestion
                question={section.question}
                lessonContext={lesson.lessonTitle}
                previousExplanation={section.explanation}
                accentColor={COLOR}
                onResolved={handleQuestionResolved}
                nextLabel={isLast ? "كملت الدرس!" : "نكمل"}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
