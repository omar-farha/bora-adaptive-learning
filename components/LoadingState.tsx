"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const MESSAGES = [
  "بؤرة بيجهز الدرس ليك...",
  "بنقسم المحتوى...",
  "بنجهز الشرح...",
  "بنحدد النقاط المهمة...",
  "بنجهز الأسئلة...",
];

export default function LoadingState() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 1700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
        className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-soft text-accent"
      >
        <Sparkles size={28} />
      </motion.div>

      <div className="h-8">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="text-lg font-bold text-foreground"
          >
            {MESSAGES[index]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2 w-2 rounded-full bg-accent/60"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
