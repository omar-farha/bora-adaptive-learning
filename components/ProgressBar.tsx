"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
  colorVar: string;
  label?: string;
}

export default function ProgressBar({
  current,
  total,
  colorVar,
  label,
}: ProgressBarProps) {
  const percent = Math.min(100, Math.round((current / total) * 100));

  return (
    <div>
      {label && (
        <p className="mb-2 text-sm font-bold text-foreground/80 font-num">
          {label}
        </p>
      )}
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-background-alt"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: colorVar }}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
