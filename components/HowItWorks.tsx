"use client";

import { motion } from "framer-motion";
import { UserCog, PenLine, Sparkles, RefreshCw } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: UserCog,
    title: "قولنا بتتعلم إزاي",
    description: "أسئلة سريعة عن طريقة تركيزك وفهمك، مش عن أي تشخيص.",
  },
  {
    number: "02",
    icon: PenLine,
    title: "اكتب الدرس",
    description: "الصق أي درس أو فقرة تعليمية عايز تفهمها.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "بؤرة يبني تجربة تعلم",
    description: "الذكاء الاصطناعي يحول الدرس لتجربة تناسب تفضيلاتك.",
  },
  {
    number: "04",
    icon: RefreshCw,
    title: "يتكيف معاك أول بأول",
    description: "تجاوب غلط، بؤرة يشرحلك بطريقة تانية، وتستلم ملخص فهمك.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-14 max-w-xl"
      >
        <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
          طريقة العمل
        </h2>
        <p className="mt-3 text-muted">أربع خطوات بسيطة من الدرس للفهم.</p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow duration-300 hover:shadow-card"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold text-border">
                  {step.number}
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <Icon size={18} />
                </div>
              </div>
              <h3 className="mt-5 text-lg font-bold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
