"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import type { EnvironmentMeta } from "@/lib/environments";

interface EnvironmentCardProps {
  environment: EnvironmentMeta;
  variant?: "display" | "selectable";
  selected?: boolean;
  recommended?: boolean;
  onSelect?: () => void;
  index?: number;
}

export default function EnvironmentCard({
  environment,
  variant = "display",
  selected = false,
  recommended = false,
  onSelect,
  index = 0,
}: EnvironmentCardProps) {
  const Icon = environment.icon;

  const cardInner = (
    <>
      <div className="flex items-start justify-between">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ background: environment.softVar, color: environment.colorVar }}
        >
          <Icon size={22} />
        </div>
        {variant === "selectable" ? (
          <div
            className="flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-200"
            style={{
              borderColor: selected ? environment.colorVar : "var(--border)",
              background: selected ? environment.colorVar : "transparent",
            }}
          >
            {selected && <Check size={14} className="text-white" />}
          </div>
        ) : (
          recommended && (
            <span
              className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold"
              style={{ background: environment.softVar, color: environment.colorVar }}
            >
              <Sparkles size={10} />
              مقترح
            </span>
          )
        )}
      </div>

      <h3 className="mt-5 text-lg font-bold text-foreground">{environment.label}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{environment.description}</p>

      {variant === "display" && (
        <ul className="mt-5 space-y-2 border-t border-border pt-4">
          {environment.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-foreground/80">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: environment.colorVar }} />
              {f}
            </li>
          ))}
        </ul>
      )}

      {variant === "selectable" && recommended && (
        <span
          className="mt-4 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold"
          style={{ background: environment.softVar, color: environment.colorVar }}
        >
          <Sparkles size={10} />
          مقترح ليك
        </span>
      )}
    </>
  );

  if (variant === "selectable") {
    return (
      <motion.button
        type="button"
        onClick={onSelect}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.08 }}
        whileTap={{ scale: 0.98 }}
        aria-pressed={selected}
        className="relative w-full rounded-2xl border bg-card p-6 text-right shadow-soft transition-all duration-200 hover:shadow-card"
        style={{
          borderColor: selected ? environment.colorVar : "var(--border)",
          borderWidth: selected ? 2 : 1,
          boxShadow: selected ? `0 8px 28px -8px ${environment.colorVar}55` : undefined,
        }}
      >
        {cardInner}
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow duration-300 hover:shadow-card"
    >
      {cardInner}
    </motion.div>
  );
}
