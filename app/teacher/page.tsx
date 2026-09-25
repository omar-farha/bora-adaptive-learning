"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingState from "@/components/LoadingState";
import { ENVIRONMENTS } from "@/lib/environments";
import { getLessonHistory } from "@/lib/storage";
import type { GeneratedLesson, LearningMode, LearningProfile, LessonHistoryEntry } from "@/types/learning";

const GRADES = ["الصف الرابع", "الصف الخامس", "الصف السادس", "الإعدادي"];
const SUBJECTS = ["علوم", "لغة عربية", "دراسات اجتماعية", "رياضيات"];

const NEUTRAL_PROFILE: LearningProfile = {
  focus: "frequent_questions",
  presentation: "text",
  motion: "normal",
  density: "balanced",
  sound: "optional",
  contrast: "standard",
  readingSupport: "explain_words",
  pacing: "normal",
  recommendedMode: "focus",
};

export default function TeacherPage() {
  const [lessonText, setLessonText] = useState("");
  const [grade, setGrade] = useState(GRADES[0]);
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [selectedModes, setSelectedModes] = useState<LearningMode[]>(["focus"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<GeneratedLesson | null>(null);
  const [history, setHistory] = useState<LessonHistoryEntry[]>([]);

  useEffect(() => {
    setHistory(getLessonHistory());
  }, []);

  function toggleMode(mode: LearningMode) {
    setSelectedModes((prev) =>
      prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode]
    );
  }

  async function handlePreview() {
    if (lessonText.trim().length < 10 || selectedModes.length === 0) return;
    setLoading(true);
    setError(null);
    setPreview(null);

    try {
      const res = await fetch("/api/generate-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonText,
          mode: selectedModes[0],
          profile: { ...NEUTRAL_PROFILE, recommendedMode: selectedModes[0] },
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "حصلت مشكلة، جرّب تاني.");
        return;
      }
      setPreview(data.lesson as GeneratedLesson);
    } catch {
      setError("في مشكلة في الاتصال دلوقتي.");
    } finally {
      setLoading(false);
    }
  }

  const understood = [...new Set(history.flatMap((h) => h.conceptsUnderstood))];
  const review = [...new Set(history.flatMap((h) => h.conceptsToReview))];
  const totalAnswers = history.reduce((sum, h) => sum + h.totalCount, 0);
  const totalCorrect = history.reduce((sum, h) => sum + h.correctCount, 0);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-extrabold text-foreground">مساحة المعلم</h1>
          <p className="mt-2 text-muted">جهّز درس تكيفي وعاين إزاي بؤرة هيحوله للطلاب.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-soft"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold text-muted">المرحلة الدراسية</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-accent"
              >
                {GRADES.map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-muted">المادة</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-accent"
              >
                {SUBJECTS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5">
            <label className="text-xs font-bold text-muted">نص الدرس</label>
            <textarea
              value={lessonText}
              onChange={(e) => setLessonText(e.target.value)}
              placeholder="الصق نص الدرس هنا..."
              className="mt-1.5 h-32 w-full resize-none rounded-xl border border-border bg-background p-3 text-sm outline-none focus:border-accent"
            />
          </div>

          <div className="mt-5">
            <label className="text-xs font-bold text-muted">بيئات الدعم المطلوبة</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {ENVIRONMENTS.map((env) => (
                <button
                  key={env.id}
                  type="button"
                  onClick={() => toggleMode(env.id)}
                  className="rounded-full border px-3 py-1.5 text-xs font-bold transition-colors"
                  style={{
                    borderColor: selectedModes.includes(env.id) ? env.colorVar : "var(--border)",
                    background: selectedModes.includes(env.id) ? env.softVar : "transparent",
                    color: selectedModes.includes(env.id) ? env.colorVar : "var(--muted)",
                  }}
                >
                  {env.shortLabel}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="mt-4 text-sm font-semibold text-amber">{error}</p>}

          <button
            type="button"
            onClick={handlePreview}
            disabled={loading || lessonText.trim().length < 10 || selectedModes.length === 0}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-soft disabled:opacity-40"
          >
            <Sparkles size={16} />
            عاين الدرس ({grade} - {subject})
          </button>
        </motion.div>

        {loading && <LoadingState />}

        {preview && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-soft"
          >
            <h2 className="text-lg font-bold text-foreground">{preview.lessonTitle}</h2>
            <p className="mt-1 text-xs font-semibold text-muted font-num">
              الوقت المتوقع: {preview.estimatedDurationMinutes} دقايق · {preview.sections.length} أقسام
            </p>
            <ul className="mt-4 space-y-2">
              {preview.sections.map((s) => (
                <li key={s.id} className="rounded-xl border border-border p-3">
                  <p className="text-sm font-bold text-foreground">{s.title}</p>
                  <p className="mt-1 text-xs text-muted">{s.explanation}</p>
                </li>
              ))}
            </ul>
            {preview.misconceptions.length > 0 && (
              <div className="mt-4 border-t border-border pt-4">
                <p className="text-xs font-bold text-muted">أخطاء شائعة متوقعة</p>
                <ul className="mt-2 space-y-1.5">
                  {preview.misconceptions.map((m) => (
                    <li key={m.concept} className="text-xs text-foreground/80">
                      <span className="font-bold">{m.concept}:</span> {m.clarification}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-10"
        >
          <h2 className="text-xl font-bold text-foreground">متابعة التقدم</h2>
          <p className="mt-1.5 flex items-start gap-1.5 text-xs text-muted">
            <Info size={13} className="mt-0.5 shrink-0" />
            نسخة العرض دي بتعرض نشاط التعلم على المتصفح ده بس (من غير حسابات طلاب حقيقية).
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-5 text-center">
              <p className="text-2xl font-extrabold text-foreground font-num">{history.length}</p>
              <p className="mt-1 text-xs text-muted">دروس مكتملة</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 text-center">
              <p className="text-2xl font-extrabold text-foreground font-num">
                {totalAnswers > 0 ? Math.round((totalCorrect / totalAnswers) * 100) : 0}%
              </p>
              <p className="mt-1 text-xs text-muted">نسبة الإجابات الصح</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 text-center">
              <p className="text-2xl font-extrabold text-foreground font-num">{review.length}</p>
              <p className="mt-1 text-xs text-muted">مفاهيم محتاجة مراجعة</p>
            </div>
          </div>

          {review.length > 0 && (
            <div className="mt-4 rounded-2xl border p-5" style={{ borderColor: "var(--amber)", background: "var(--amber-soft)" }}>
              <p className="text-sm font-bold text-[var(--amber)]">أكتر المفاهيم محتاجة مراجعة</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {review.map((c) => (
                  <li key={c} className="rounded-full bg-card px-3 py-1 text-xs font-semibold text-foreground">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {understood.length === 0 && review.length === 0 && (
            <p className="mt-4 rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted">
              لسه مفيش نشاط تعلم مسجل على المتصفح ده.
            </p>
          )}
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
