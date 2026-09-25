"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Target, LayoutList, Ear, BookOpenText } from "lucide-react";

type DemoMode = "focus" | "predictable" | "hearing" | "reading";

const MODES: {
  id: DemoMode;
  label: string;
  icon: typeof Target;
  color: string;
  soft: string;
  content: string;
  meta: string;
}[] = [
  {
    id: "focus",
    label: "بيئة التركيز",
    icon: Target,
    color: "var(--focus-color)",
    soft: "var(--focus-soft)",
    content: "الشمس بتسخن الميه… بتتحول لبخار.",
    meta: "الجزء 1 من 5",
  },
  {
    id: "predictable",
    label: "بيئة الاستقرار",
    icon: LayoutList,
    color: "var(--calm-color)",
    soft: "var(--calm-soft)",
    content: "دلوقتي هنشرح إزاي بيتكوّن بخار الماء.",
    meta: "خطوة 1 من 3",
  },
  {
    id: "hearing",
    label: "بيئة الصم وضعاف السمع",
    icon: Ear,
    color: "var(--visual-color)",
    soft: "var(--visual-soft)",
    content: "التبخّر: تحول الماء من سائل إلى بخار.",
    meta: "مفهوم أساسي",
  },
  {
    id: "reading",
    label: "بيئة دعم القراءة",
    icon: BookOpenText,
    color: "var(--reading-color)",
    soft: "var(--reading-soft)",
    content: "الشمس. بتسخن الميه. بتتحول لبخار.",
    meta: "قراءة بصوت عالي",
  },
];

export default function TransformDemo() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % MODES.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  const current = MODES[active];
  const Icon = current.icon;

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <p className="mb-2 text-xs font-bold text-muted">الدرس الأصلي</p>
        <p className="text-sm leading-relaxed text-foreground/80">
          دورة المياه في الطبيعة هي عملية مستمرة ينتقل فيها الماء بين سطح
          الأرض والغلاف الجوي...
        </p>
      </div>

      <div className="my-4 flex justify-center">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="text-muted"
        >
          <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
            <path
              d="M10 0V22M10 22L2 14M10 22L18 14"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {MODES.map((m, i) => (
          <button
            key={m.id}
            onClick={() => setActive(i)}
            className="rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-300"
            style={{
              background: i === active ? m.soft : "transparent",
              color: i === active ? m.color : "var(--muted)",
              border: `1px solid ${i === active ? m.color : "var(--border)"}`,
            }}
            aria-pressed={i === active}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="relative mt-4 h-40 overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 flex flex-col justify-between p-5"
            style={{ background: current.soft }}
          >
            <div className="flex items-center justify-between">
              <span
                className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1 text-xs font-bold"
                style={{ color: current.color }}
              >
                <Icon size={14} />
                {current.label}
              </span>
              <span className="text-[11px] font-semibold text-muted">{current.meta}</span>
            </div>
            <p className="text-base font-bold leading-relaxed text-foreground">
              {current.content}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
