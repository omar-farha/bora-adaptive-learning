"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, HelpCircle, Sparkles } from "lucide-react";
import type { Question, AnswerAnalysis, RemediationContent } from "@/types/learning";

interface AdaptiveQuestionProps {
  question: Question;
  lessonContext: string;
  previousExplanation: string;
  accentColor: string;
  onResolved: (wasCorrect: boolean) => void;
  nextLabel?: string;
}

function correctAnswerDescription(question: Question): string {
  switch (question.type) {
    case "mcq":
      return question.options[question.correctIndex];
    case "true_false":
      return question.correctAnswer ? "صح" : "غلط";
    case "fill_blank":
      return question.correctAnswer;
    case "short_answer":
    case "explain_own_words":
      return question.modelAnswer;
  }
}

type Phase = "answering" | "grading" | "feedback" | "remediation-loading" | "remediation";

export default function AdaptiveQuestion({
  question,
  lessonContext,
  previousExplanation,
  accentColor,
  onResolved,
  nextLabel = "التالي",
}: AdaptiveQuestionProps) {
  const [phase, setPhase] = useState<Phase>("answering");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedBool, setSelectedBool] = useState<boolean | null>(null);
  const [textAnswer, setTextAnswer] = useState("");
  const [wasCorrect, setWasCorrect] = useState(false);
  const [analysis, setAnalysis] = useState<AnswerAnalysis | null>(null);
  const [remediation, setRemediation] = useState<RemediationContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function fetchAnalysis(studentAnswer: string): Promise<AnswerAnalysis | null> {
    try {
      const res = await fetch("/api/analyze-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonContext,
          concept: question.concept,
          questionPrompt: question.prompt,
          correctAnswerDescription: correctAnswerDescription(question),
          studentAnswer,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "حصلت مشكلة، جرّب تاني.");
        return null;
      }
      return data.analysis as AnswerAnalysis;
    } catch {
      setError("في مشكلة في الاتصال دلوقتي.");
      return null;
    }
  }

  async function handleClosedAnswer(correct: boolean, studentAnswerLabel: string) {
    setWasCorrect(correct);

    if (correct) {
      setPhase("feedback");
      return;
    }

    setPhase("grading");
    const result = await fetchAnalysis(studentAnswerLabel);
    setAnalysis(result);
    setPhase("feedback");
  }

  async function handleOpenAnswer() {
    if (!textAnswer.trim()) return;
    setPhase("grading");
    const result = await fetchAnalysis(textAnswer.trim());
    if (!result) {
      setPhase("answering");
      return;
    }
    setAnalysis(result);
    setWasCorrect(result.isCorrect);
    setPhase("feedback");
  }

  async function requestRemediation() {
    if (!analysis?.recommendedRepresentation) return;
    setPhase("remediation-loading");
    try {
      const res = await fetch("/api/remediate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonContext,
          concept: question.concept,
          representation: analysis.recommendedRepresentation,
          previousExplanation,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "حصلت مشكلة، جرّب تاني.");
        setPhase("feedback");
        return;
      }
      setRemediation(data.remediation as RemediationContent);
      setPhase("remediation");
    } catch {
      setError("في مشكلة في الاتصال دلوقتي.");
      setPhase("feedback");
    }
  }

  const isAnswering = phase === "answering";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-border bg-card p-6 shadow-soft"
    >
      <div
        className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full"
        style={{ background: `${accentColor}1a`, color: accentColor }}
      >
        <HelpCircle size={18} />
      </div>

      <p className="text-base font-bold leading-relaxed text-foreground">{question.prompt}</p>

      {isAnswering && question.type === "mcq" && (
        <div className="mt-5 grid gap-2.5">
          {question.options.map((option, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setSelectedIndex(i);
                handleClosedAnswer(i === question.correctIndex, option);
              }}
              className="rounded-xl border border-border px-4 py-3 text-right text-sm font-semibold text-foreground transition-all duration-200 hover:border-accent"
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {isAnswering && question.type === "true_false" && (
        <div className="mt-5 grid grid-cols-2 gap-3">
          {[true, false].map((val) => (
            <button
              key={String(val)}
              type="button"
              onClick={() => {
                setSelectedBool(val);
                handleClosedAnswer(val === question.correctAnswer, val ? "صح" : "غلط");
              }}
              className="rounded-xl border border-border px-4 py-4 text-center text-sm font-bold text-foreground transition-all duration-200 hover:border-accent"
            >
              {val ? "صح" : "غلط"}
            </button>
          ))}
        </div>
      )}

      {isAnswering && question.type === "fill_blank" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!textAnswer.trim()) return;
            const normalized = textAnswer.trim();
            const correct = [question.correctAnswer, ...question.acceptableAnswers].some(
              (a) => a.trim() === normalized
            );
            handleClosedAnswer(correct, normalized);
          }}
          className="mt-5"
        >
          <input
            type="text"
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            placeholder="اكتب إجابتك هنا"
            className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-accent"
          />
          <button
            type="submit"
            className="mt-3 rounded-full px-6 py-2.5 text-sm font-bold text-white"
            style={{ background: accentColor }}
          >
            تأكيد الإجابة
          </button>
        </form>
      )}

      {isAnswering && (question.type === "short_answer" || question.type === "explain_own_words") && (
        <div className="mt-5">
          <textarea
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            placeholder="اكتب إجابتك بكلامك"
            className="h-28 w-full resize-none rounded-xl border border-border p-4 text-sm outline-none focus:border-accent"
          />
          <button
            type="button"
            onClick={handleOpenAnswer}
            disabled={!textAnswer.trim()}
            className="mt-3 rounded-full px-6 py-2.5 text-sm font-bold text-white disabled:opacity-40"
            style={{ background: accentColor }}
          >
            تأكيد الإجابة
          </button>
        </div>
      )}

      {phase === "grading" && (
        <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-muted">
          <Sparkles size={16} className="animate-pulse" />
          بؤرة بيراجع إجابتك...
        </div>
      )}

      {error && <p className="mt-4 text-sm font-semibold text-amber">{error}</p>}

      {phase === "feedback" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5"
        >
          <div className="flex items-center gap-2">
            {wasCorrect ? (
              <Check size={18} className="text-[var(--calm-color)]" />
            ) : (
              <X size={18} className="text-[var(--amber)]" />
            )}
            <p
              className="text-sm font-bold"
              style={{ color: wasCorrect ? "var(--calm-color)" : "var(--amber)" }}
            >
              {wasCorrect
                ? "ممتاز! فهمت النقطة دي."
                : analysis?.feedback || "لسه محتاجين نراجع النقطة دي."}
            </p>
          </div>

          {!wasCorrect && analysis?.misconception && (
            <p className="mt-2 text-sm leading-relaxed text-muted">{analysis.misconception}</p>
          )}

          {!wasCorrect && !analysis?.misconception && (
            <p className="mt-2 text-sm leading-relaxed text-muted">
              الإجابة الصح: {correctAnswerDescription(question)}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-3">
            {!wasCorrect && analysis?.recommendedRepresentation && (
              <button
                type="button"
                onClick={requestRemediation}
                className="inline-flex items-center gap-1.5 rounded-full border px-5 py-2.5 text-sm font-bold transition-colors duration-200"
                style={{ borderColor: accentColor, color: accentColor }}
              >
                <Sparkles size={14} />
                بؤرة يشرحلك بطريقة تانية
              </button>
            )}
            <button
              type="button"
              onClick={() => onResolved(wasCorrect)}
              className="rounded-full px-6 py-2.5 text-sm font-bold text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: accentColor }}
            >
              {nextLabel}
            </button>
          </div>
        </motion.div>
      )}

      {phase === "remediation-loading" && (
        <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-muted">
          <Sparkles size={16} className="animate-pulse" />
          بؤرة بيجهز شرح تاني...
        </div>
      )}

      {phase === "remediation" && remediation && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 rounded-xl p-4"
          style={{ background: `${accentColor}14` }}
        >
          <p className="text-xs font-bold" style={{ color: accentColor }}>
            {remediation.title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-foreground">{remediation.content}</p>

          <button
            type="button"
            onClick={() => onResolved(false)}
            className="mt-4 rounded-full px-6 py-2.5 text-sm font-bold text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: accentColor }}
          >
            فهمت، يلا نكمل
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
