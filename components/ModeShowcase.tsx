"use client";

import { motion } from "framer-motion";
import { ENVIRONMENTS } from "@/lib/environments";
import EnvironmentCard from "@/components/EnvironmentCard";

export default function ModeShowcase() {
  return (
    <section className="bg-background-alt py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-xl"
        >
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
            أربع بيئات تعلم مختلفة
          </h2>
          <p className="mt-3 text-muted">
            اختار البيئة اللي تناسب احتياجاتك، أو خلي بؤرة يرشحلك واحدة بناءً على تفضيلاتك.
            مفيش طريقة واحدة صح للجميع.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ENVIRONMENTS.map((env, i) => (
            <EnvironmentCard key={env.id} environment={env} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
