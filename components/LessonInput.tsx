"use client";

import { motion } from "framer-motion";
import { Wand2, Sparkles } from "lucide-react";
import { ENVIRONMENTS, getEnvironmentMeta } from "@/lib/environments";
import { SAMPLE_LESSON } from "@/lib/sampleLesson";
import EnvironmentCard from "@/components/EnvironmentCard";
import type { LearningMode, LearningProfile } from "@/types/learning";

const MAX_LENGTH = 4000;

interface LessonInputProps {
  lessonText: string;
  onLessonTextChange: (value: string) => void;
  mode: LearningMode;
  onModeChange: (mode: LearningMode) => void;
  profile: LearningProfile;
  onSubmit: () => void;
  error: string | null;
}

export default function LessonInput({
  lessonText,
  onLessonTextChange,
  mode,
  onModeChange,
  profile,
  onSubmit,
  error,
}: LessonInputProps) {
  const canSubmit = lessonText.trim().length >= 10;
  const recommended = getEnvironmentMeta(profile.recommendedMode);

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">خلينا نبدأ</h1>
        <p className="mt-2 text-muted">اكتب أو الصق الدرس اللي عايز تتعلمه.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-8"
      >
        <div className="rounded-2xl border border-border bg-card p-2 shadow-soft focus-within:border-accent">
          <textarea
            value={lessonText}
            maxLength={MAX_LENGTH}
            onChange={(e) => onLessonTextChange(e.target.value)}
            placeholder="مثال: دورة المياه في الطبيعة هي عملية مستمرة..."
            aria-label="نص الدرس"
            className="h-48 w-full resize-none rounded-xl bg-transparent p-4 text-base leading-relaxed text-foreground outline-none placeholder:text-muted/70 sm:h-56"
          />
        </div>

        <div className="mt-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onLessonTextChange(SAMPLE_LESSON)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:border-accent hover:text-accent"
          >
            <Wand2 size={15} />
            جرّب مثال جاهز
          </button>
          <span className="text-xs font-medium text-muted font-num">
            {lessonText.length} / {MAX_LENGTH}
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-12"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">اختار بيئة التعلم</h2>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
            style={{ background: recommended.softVar, color: recommended.colorVar }}
          >
            <Sparkles size={12} />
            بؤرة رشحلك: {recommended.shortLabel}
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {ENVIRONMENTS.map((env, i) => (
            <EnvironmentCard
              key={env.id}
              environment={env}
              variant="selectable"
              selected={mode === env.id}
              recommended={profile.recommendedMode === env.id}
              onSelect={() => onModeChange(env.id)}
              index={i}
            />
          ))}
        </div>
      </motion.div>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          role="alert"
          className="mt-6 rounded-xl border border-amber/40 bg-amber-soft px-4 py-3 text-sm font-semibold text-amber"
        >
          {error}
        </motion.p>
      )}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-10"
      >
        <button
          type="button"
          disabled={!canSubmit}
          onClick={onSubmit}
          className="w-full rounded-full bg-accent px-8 py-4 text-lg font-bold text-accent-foreground shadow-card transition-all duration-200 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 sm:w-auto"
        >
          حوّل الدرس
        </button>
      </motion.div>
    </div>
  );
}
