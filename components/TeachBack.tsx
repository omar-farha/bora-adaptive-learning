"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Circle, Sparkles } from "lucide-react";
import type { GeneratedLesson, TeachBackAnalysis } from "@/types/learning";

interface TeachBackProps {
  lesson: GeneratedLesson;
  colorVar: string;
  onComplete: (analysis: TeachBackAnalysis | null) => void;
}

export default function TeachBack({ lesson, colorVar, onComplete }: TeachBackProps) {
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<TeachBackAnalysis | null>(null);

  async function handleSubmit() {
    if (explanation.trim().length < 3) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/teach-back", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonContext: lesson.lessonTitle,
          keyPoints: lesson.concepts,
          studentExplanation: explanation.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "حصلت مشكلة، جرّب تاني.");
        setLoading(false);
        return;
      }
      setAnalysis(data.analysis as TeachBackAnalysis);
    } catch {
      setError("في مشكلة في الاتصال دلوقتي.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-12 sm:px-8">
      <div className="mb-6 text-center">
        <div
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{ background: `${colorVar}1a`, color: colorVar }}
        >
          <Sparkles size={22} />
        </div>
        <h1 className="mt-4 text-2xl font-extrabold text-foreground">قدر تشرحها؟</h1>
        <p className="mt-2 text-sm text-muted">
          اكتب بكلامك إنت إيه اللي فهمته من الدرس ده.
        </p>
      </div>

      {!analysis && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <textarea
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            placeholder="اشرحلي الدرس بكلامك..."
            className="h-36 w-full resize-none rounded-2xl border border-border bg-card p-4 text-base leading-relaxed outline-none focus:border-accent"
          />
          {error && <p className="mt-3 text-sm font-semibold text-amber">{error}</p>}
          <div className="mt-4 flex justify-between">
            <button
              type="button"
              onClick={() => onComplete(null)}
              className="text-sm font-semibold text-muted underline decoration-border underline-offset-4 hover:text-foreground"
            >
              تخطي الخطوة دي
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading || explanation.trim().length < 3}
              className="rounded-full px-6 py-3 text-sm font-bold text-white disabled:opacity-40"
              style={{ background: colorVar }}
            >
              {loading ? "بؤرة بيراجع..." : "أرسل الشرح"}
            </button>
          </div>
        </motion.div>
      )}

      {analysis && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm font-semibold text-foreground">{analysis.encouragement}</p>

          {analysis.coveredPoints.length > 0 && (
            <div className="mt-5">
              <p className="text-xs font-bold text-muted">فهمت:</p>
              <ul className="mt-2 space-y-2">
                {analysis.coveredPoints.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Check size={15} className="text-[var(--calm-color)]" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {analysis.missingPoints.length > 0 && (
            <div className="mt-5">
              <p className="text-xs font-bold text-muted">نراجع سوا:</p>
              <ul className="mt-2 space-y-2">
                {analysis.missingPoints.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Circle size={13} className="text-[var(--amber)]" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            type="button"
            onClick={() => onComplete(analysis)}
            className="mt-6 w-full rounded-full py-3.5 text-sm font-bold text-white sm:w-auto sm:px-8"
            style={{ background: colorVar }}
          >
            شوف ملخص فهمك
          </button>
        </motion.div>
      )}
    </div>
  );
}
