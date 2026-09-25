"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { recommendMode, type ProfileAnswers } from "@/lib/profile";
import type { LearningProfile } from "@/types/learning";

interface StepOption {
  value: string;
  label: string;
  description?: string;
}

interface Step {
  key: keyof ProfileAnswers;
  question: string;
  options: StepOption[];
}

const STEPS: Step[] = [
  {
    key: "focus",
    question: "إيه اللي بيساعدك تركز؟",
    options: [
      { value: "short_chunks", label: "أجزاء قصيرة", description: "أفضل الدرس يتقسم لقطع صغيرة" },
      { value: "one_at_a_time", label: "فكرة واحدة بس", description: "مش عايز حاجات كتير قدامي مرة واحدة" },
      { value: "frequent_questions", label: "أسئلة متكررة", description: "الأسئلة بتخليني منتبه أكتر" },
      { value: "long_explanations", label: "شرح متواصل وأطول", description: "بافهم أحسن لما الشرح متكامل" },
    ],
  },
  {
    key: "presentation",
    question: "بتفضل الشرح إزاي؟",
    options: [
      { value: "visual", label: "بصري", description: "صور وأشكال ومخططات" },
      { value: "audio", label: "صوتي", description: "أسمع الشرح بدل ما أقراه" },
      { value: "text", label: "نص مكتوب", description: "أقرا الشرح بنفسي" },
      { value: "examples", label: "أمثلة", description: "أفهم أحسن من خلال أمثلة عملية" },
      { value: "step_by_step", label: "خطوة بخطوة", description: "شرح متسلسل ومرتب" },
    ],
  },
  {
    key: "motion",
    question: "الحركة والانتقالات في الشاشة تفضلها إزاي؟",
    options: [
      { value: "none", label: "من غيرها خالص", description: "بدون أي حركة" },
      { value: "gentle", label: "بسيطة وهادية", description: "انتقالات لطيفة بس" },
      { value: "normal", label: "عادية", description: "مش فارقة معايا" },
    ],
  },
  {
    key: "sound",
    question: "بتفضل الصوت في التجربة إزاي؟",
    options: [
      { value: "silent", label: "من غير صوت", description: "أفضل التجربة صامتة" },
      { value: "optional", label: "اختياري", description: "أشغله لو احتجته" },
      { value: "audio_first", label: "صوت أساسي", description: "أفضل السمع على القراءة" },
    ],
  },
  {
    key: "readingSupport",
    question: "لو القراءة صعبة عليك أحيانًا، إيه اللي يساعدك؟",
    options: [
      { value: "read_aloud", label: "قراءة بصوت عالي", description: "حد يقرالي النص" },
      { value: "highlight_while_reading", label: "تظليل الكلام وأنا باقراه", description: "أتابع بعيني وهو بيتحدد" },
      { value: "shorter_sentences", label: "جمل أقصر", description: "الجمل الطويلة بتلخبطني" },
      { value: "explain_words", label: "شرح الكلمات الصعبة", description: "محتاج تفسير للمصطلحات" },
    ],
  },
  {
    key: "pacing",
    question: "بتفضل جلسات التعلم إزاي؟",
    options: [
      { value: "very_short", label: "قصيرة جدًا", description: "دقايق قليلة بس" },
      { value: "short", label: "قصيرة", description: "مش طويلة أوي" },
      { value: "normal", label: "عادية", description: "مدة درس طبيعية" },
    ],
  },
];

interface ProfileOnboardingProps {
  onComplete: (profile: LearningProfile) => void;
}

export default function ProfileOnboarding({ onComplete }: ProfileOnboardingProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<ProfileAnswers>>({});

  const step = STEPS[stepIndex];
  const isLast = stepIndex === STEPS.length - 1;
  const currentValue = answers[step.key];

  function selectOption(value: string) {
    const updated = { ...answers, [step.key]: value } as Partial<ProfileAnswers>;
    setAnswers(updated);

    if (isLast) {
      const complete = updated as ProfileAnswers;
      const recommendedMode = recommendMode(complete);
      const profile: LearningProfile = {
        focus: complete.focus,
        presentation: complete.presentation,
        motion: complete.motion,
        density: "balanced",
        sound: complete.sound,
        contrast: "standard",
        readingSupport: complete.readingSupport,
        pacing: complete.pacing,
        recommendedMode,
      };
      onComplete(profile);
      return;
    }

    setTimeout(() => setStepIndex((i) => i + 1), 220);
  }

  function goBack() {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-14 sm:px-8">
      <div className="mb-8 flex items-center justify-center gap-1.5">
        {STEPS.map((_, i) => (
          <span
            key={i}
            className="h-1.5 rounded-full bg-accent transition-all duration-300"
            style={{ width: i === stepIndex ? 28 : 8, opacity: i <= stepIndex ? 1 : 0.25 }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={stepIndex}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-center text-2xl font-extrabold text-foreground sm:text-3xl">
            {step.question}
          </h1>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {step.options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => selectOption(option.value)}
                className="rounded-2xl border p-5 text-right shadow-soft transition-all duration-150 hover:border-accent hover:shadow-card"
                style={{
                  borderColor: currentValue === option.value ? "var(--accent)" : "var(--border)",
                  borderWidth: currentValue === option.value ? 2 : 1,
                  background: "var(--card)",
                }}
              >
                <p className="font-bold text-foreground">{option.label}</p>
                {option.description && (
                  <p className="mt-1 text-sm text-muted">{option.description}</p>
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={goBack}
          disabled={stepIndex === 0}
          className="inline-flex items-center gap-1 text-sm font-semibold text-muted transition-colors hover:text-foreground disabled:opacity-0"
        >
          <ChevronRight size={16} />
          رجوع
        </button>
        <span className="text-xs font-semibold text-muted font-num">
          {stepIndex + 1} / {STEPS.length}
        </span>
      </div>
    </div>
  );
}
