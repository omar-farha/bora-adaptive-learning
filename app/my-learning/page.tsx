"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Settings2, CheckCircle2, Repeat, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getLearningProfile, getLessonHistory, clearLearningProfile } from "@/lib/storage";
import { getEnvironmentMeta } from "@/lib/environments";
import type { LearningProfile, LessonHistoryEntry } from "@/types/learning";

export default function MyLearningPage() {
  const [profile, setProfile] = useState<LearningProfile | null>(null);
  const [history, setHistory] = useState<LessonHistoryEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setProfile(getLearningProfile());
    setHistory(getLessonHistory());
    setLoaded(true);
  }, []);

  const understoodConcepts = [...new Set(history.flatMap((h) => h.conceptsUnderstood))];
  const reviewConcepts = [...new Set(history.flatMap((h) => h.conceptsToReview))];

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-extrabold text-foreground">تعلمي</h1>
          <p className="mt-2 text-muted">كل الدروس اللي اتعلمتها وتقدمك فيها.</p>
        </motion.div>

        {loaded && profile && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-soft"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{
                    background: getEnvironmentMeta(profile.recommendedMode).softVar,
                    color: getEnvironmentMeta(profile.recommendedMode).colorVar,
                  }}
                >
                  <Sparkles size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted">البيئة المقترحة ليك</p>
                  <p className="font-bold text-foreground">
                    {getEnvironmentMeta(profile.recommendedMode).label}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  clearLearningProfile();
                  setProfile(null);
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-bold text-foreground/80 transition-colors hover:border-accent hover:text-accent"
              >
                <Settings2 size={13} />
                غيّر تفضيلاتك
              </button>
            </div>
          </motion.div>
        )}

        {loaded && !profile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted"
          >
            لسه معملتش ملف تعلم.{" "}
            <Link href="/lesson" className="font-bold text-accent underline">
              ابدأ دلوقتي
            </Link>
          </motion.div>
        )}

        {loaded && history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-8 grid gap-5 sm:grid-cols-2"
          >
            <div
              className="rounded-2xl border p-6 shadow-soft"
              style={{ borderColor: "var(--calm-color)", background: "var(--calm-soft)" }}
            >
              <h2 className="flex items-center gap-2 font-bold text-[var(--calm-color)]">
                <CheckCircle2 size={18} />
                فهمت كويس ({understoodConcepts.length})
              </h2>
              <ul className="mt-3 space-y-1.5">
                {understoodConcepts.slice(0, 8).map((c) => (
                  <li key={c} className="text-sm font-semibold text-foreground/85">
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="rounded-2xl border p-6 shadow-soft"
              style={{ borderColor: "var(--amber)", background: "var(--amber-soft)" }}
            >
              <h2 className="flex items-center gap-2 font-bold text-[var(--amber)]">
                <Repeat size={18} />
                محتاج مراجعة ({reviewConcepts.length})
              </h2>
              <ul className="mt-3 space-y-1.5">
                {reviewConcepts.slice(0, 8).map((c) => (
                  <li key={c} className="text-sm font-semibold text-foreground/85">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-10"
        >
          <h2 className="mb-4 text-xl font-bold text-foreground">الدروس اللي خلصتها</h2>

          {loaded && history.length === 0 && (
            <p className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted">
              لسه مفيش دروس خلصتها. كمل درسك الأول وهيظهر هنا.
            </p>
          )}

          <div className="grid gap-4">
            {history.map((entry) => {
              const meta = getEnvironmentMeta(entry.mode);
              return (
                <div
                  key={entry.id}
                  className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-soft"
                >
                  <div>
                    <p className="font-bold text-foreground">{entry.lessonTitle}</p>
                    <p className="mt-1 text-xs font-semibold" style={{ color: meta.colorVar }}>
                      {meta.label}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-muted font-num">
                    {entry.correctCount} / {entry.totalCount}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
