"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, RefreshCcw, Sparkles, Repeat, LayoutDashboard } from "lucide-react";
import type { AssessmentResult } from "@/components/AssessmentStage";

interface LearningSummaryProps {
  results: AssessmentResult[];
  teachBackMissingPoints?: string[];
  onTryAnotherMode: () => void;
  onNewLesson: () => void;
}

export default function LearningSummary({
  results,
  teachBackMissingPoints = [],
  onTryAnotherMode,
  onNewLesson,
}: LearningSummaryProps) {
  const understood = [...new Set(results.filter((r) => r.correct).map((r) => r.concept))];
  const needsReview = [
    ...new Set([...results.filter((r) => !r.correct).map((r) => r.concept), ...teachBackMissingPoints]),
  ];

  const correctCount = results.filter((r) => r.correct).length;
  const total = results.length;

  const advice =
    needsReview.length > 0
      ? `راجع ${needsReview[0]} مرة كمان.`
      : "أداء ممتاز! جرّب تحول درس جديد أو تشوف وضع تعلم تاني.";

  return (
    <div className="mx-auto max-w-2xl px-5 py-14 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
          <Sparkles size={26} />
        </div>
        <h1 className="mt-5 text-3xl font-extrabold text-foreground">
          ملخص فهمك
        </h1>
        <p className="mt-2 text-sm text-muted font-num">
          {correctCount} / {total}
        </p>
      </motion.div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border p-6 shadow-soft"
          style={{ borderColor: "var(--calm-color)", background: "var(--calm-soft)" }}
        >
          <h2 className="flex items-center gap-2 font-bold text-[var(--calm-color)]">
            <CheckCircle2 size={18} />
            فهمت كويس
          </h2>
          <ul className="mt-4 space-y-2">
            {understood.length === 0 && (
              <li className="text-sm text-muted">مفيش نقاط لسه، كمل المحاولة.</li>
            )}
            {understood.map((c) => (
              <li key={c} className="text-sm font-semibold text-foreground/85">
                {c}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl border p-6 shadow-soft"
          style={{ borderColor: "var(--amber)", background: "var(--amber-soft)" }}
        >
          <h2 className="flex items-center gap-2 font-bold text-[var(--amber)]">
            <Repeat size={18} />
            محتاج مراجعة
          </h2>
          <ul className="mt-4 space-y-2">
            {needsReview.length === 0 && (
              <li className="text-sm text-muted">ولا حاجة، فاهم كل النقاط!</li>
            )}
            {needsReview.map((c) => (
              <li key={c} className="text-sm font-semibold text-foreground/85">
                {c}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-soft"
      >
        <h3 className="text-sm font-bold text-muted">نصيحة صغيرة</h3>
        <p className="mt-2 text-base font-semibold text-foreground">{advice}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-9 flex flex-col gap-3 sm:flex-row"
      >
        <button
          type="button"
          onClick={onTryAnotherMode}
          className="flex-1 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground shadow-soft transition-transform duration-200 hover:scale-[1.01] active:scale-[0.98]"
        >
          جرّب بيئة تعلم تانية بنفس الدرس
        </button>
        <button
          type="button"
          onClick={onNewLesson}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-bold text-foreground transition-colors duration-200 hover:bg-background-alt"
        >
          <RefreshCcw size={15} />
          درس جديد
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-5 text-center"
      >
        <Link
          href="/my-learning"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted underline decoration-border underline-offset-4 hover:text-foreground"
        >
          <LayoutDashboard size={14} />
          شوف كل تقدمك في تعلمي
        </Link>
      </motion.div>
    </div>
  );
}
