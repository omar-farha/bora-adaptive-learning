"use client";

import { motion } from "framer-motion";
import { Clock, CheckCircle2 } from "lucide-react";
import type { GeneratedLesson } from "@/types/learning";

interface LessonMapProps {
  lesson: GeneratedLesson;
  colorVar: string;
  onStart: () => void;
}

export default function LessonMap({ lesson, colorVar, onStart }: LessonMapProps) {
  const steps = [...lesson.sections.map((s) => s.title), "اختبار فهمك"];

  return (
    <div className="mx-auto max-w-2xl px-5 py-14 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">درس النهاردة</h1>
        <p className="mt-2 text-muted">{lesson.lessonTitle}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-soft"
      >
        <ol className="space-y-3">
          {steps.map((step, i) => (
            <li key={i} className="flex items-center gap-3">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold font-num"
                style={{ background: `${colorVar}1a`, color: colorVar }}
              >
                {i + 1}
              </span>
              <span className="text-sm font-semibold text-foreground">{step}</span>
            </li>
          ))}
        </ol>

        <div className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-sm font-semibold text-muted">
          <Clock size={15} />
          الوقت المتوقع: {lesson.estimatedDurationMinutes} دقايق
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-4 flex items-center justify-center gap-1.5"
      >
        {steps.map((_, i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full" style={{ background: colorVar, opacity: 0.3 }} />
        ))}
      </motion.div>

      <motion.button
        type="button"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        onClick={onStart}
        className="mx-auto mt-8 flex items-center gap-2 rounded-full px-8 py-3.5 text-base font-bold text-white shadow-card transition-transform duration-200 hover:scale-[1.01]"
        style={{ background: colorVar }}
      >
        <CheckCircle2 size={18} />
        يلا نبدأ
      </motion.button>
    </div>
  );
}
