"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface TermTooltipProps {
  term: string;
  explanation: string;
  example?: string;
  colorVar: string;
}

export default function TermTooltip({
  term,
  explanation,
  example,
  colorVar,
}: TermTooltipProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <span ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="mx-0.5 rounded-md border-b-2 px-1 font-bold transition-colors duration-150"
        style={{
          borderColor: colorVar,
          background: open ? `${colorVar}22` : "transparent",
          color: colorVar,
        }}
      >
        {term}
      </button>

      <AnimatePresence>
        {open && (
          <motion.span
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            role="tooltip"
            className="absolute top-full right-1/2 z-20 mt-2 w-56 translate-x-1/2 rounded-xl border border-border bg-card p-3 text-sm font-normal leading-relaxed text-foreground shadow-lift"
          >
            <p>{explanation}</p>
            {example && <p className="mt-1.5 text-xs text-muted">مثال: {example}</p>}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
