"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface PredictableTransitionProps {
  nextLabel: string;
  colorVar: string;
  onDone: () => void;
  seconds?: number;
}

export default function PredictableTransition({
  nextLabel,
  colorVar,
  onDone,
  seconds = 3,
}: PredictableTransitionProps) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    if (remaining <= 0) {
      onDone();
      return;
    }
    const timer = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(timer);
  }, [remaining, onDone]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto flex max-w-md flex-col items-center justify-center px-5 py-24 text-center"
    >
      <p className="text-xs font-bold uppercase tracking-wide text-muted">دلوقتي هننتقل لـ</p>
      <p className="mt-2 text-xl font-extrabold text-foreground">{nextLabel}</p>

      <div
        className="mt-6 flex h-14 w-14 items-center justify-center rounded-full text-xl font-extrabold font-num"
        style={{ background: `${colorVar}1a`, color: colorVar }}
      >
        {remaining}
      </div>

      <button
        type="button"
        onClick={onDone}
        className="mt-6 text-sm font-semibold text-muted underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
      >
        تخطي
      </button>
    </motion.div>
  );
}
