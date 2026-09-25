"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import TransformDemo from "@/components/TransformDemo";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-noise-fade">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 pb-20 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-2 lg:items-center lg:pb-28 lg:pt-28">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-border bg-card px-4 py-1.5 text-sm font-bold text-accent shadow-soft"
          >
            بؤرة
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-balance text-4xl font-extrabold leading-[1.25] text-foreground sm:text-5xl sm:leading-[1.2]"
          >
            نفس الدرس. <br className="hidden sm:block" />
            طريقة مختلفة للفهم.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-lg text-balance text-lg leading-relaxed text-muted"
          >
            بؤرة بيحوّل أي درس لتجربة تعلم تناسبك، وبيراقب فهمك أول بأول
            عشان يغيّر طريقة الشرح لما تحتاج.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/lesson"
              className="rounded-full bg-accent px-7 py-3.5 text-base font-bold text-accent-foreground shadow-card transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              ابدأ الآن
            </Link>
            <a
              href="#how-it-works"
              className="text-base font-semibold text-foreground/80 underline decoration-border underline-offset-4 transition-colors hover:text-accent"
            >
              يعمل ازاي؟
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <TransformDemo />
        </motion.div>
      </div>
    </section>
  );
}
