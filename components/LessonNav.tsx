"use client";

import Link from "next/link";
import { ChevronRight, RotateCcw, Home } from "lucide-react";

interface LessonNavProps {
  onBack?: () => void;
  onRestart: () => void;
  title?: string;
}

export default function LessonNav({ onBack, onRestart, title }: LessonNavProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3.5 sm:px-8">
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              aria-label="رجوع"
              className="flex h-9 w-9 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-background-alt hover:text-foreground"
            >
              <ChevronRight size={18} />
            </button>
          )}
          {title && (
            <span className="text-sm font-bold text-foreground/80">{title}</span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onRestart}
            aria-label="ابدأ من جديد"
            className="flex h-9 w-9 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-background-alt hover:text-foreground"
          >
            <RotateCcw size={16} />
          </button>
          <Link
            href="/"
            aria-label="الرئيسية"
            className="flex h-9 w-9 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-background-alt hover:text-foreground"
          >
            <Home size={17} />
          </Link>
        </div>
      </div>
    </header>
  );
}
