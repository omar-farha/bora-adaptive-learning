"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProgressBar from "@/components/ProgressBar";
import AdaptiveQuestion from "@/components/AdaptiveQuestion";
import type { Question } from "@/types/learning";

export interface AssessmentResult {
  concept: string;
  correct: boolean;
}

interface AssessmentStageProps {
  questions: Question[];
  lessonContext: string;
  colorVar: string;
  onComplete: (results: AssessmentResult[]) => void;
}

export default function AssessmentStage({
  questions,
  lessonContext,
  colorVar,
  onComplete,
}: AssessmentStageProps) {
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<AssessmentResult[]>([]);

  const total = questions.length;
  const question = questions[index];
  const isLast = index === total - 1;

  function handleResolved(wasCorrect: boolean) {
    const updated = [...results, { concept: question.concept, correct: wasCorrect }];
    if (isLast) {
      onComplete(updated);
      return;
    }
    setResults(updated);
    setIndex((i) => i + 1);
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-12 sm:px-8">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-extrabold text-foreground">اختبر فهمك</h1>
        <p className="mt-2 text-sm text-muted">
          جاوب على الأسئلة دي عشان نشوف فهمت الدرس ازاي.
        </p>
      </div>

      <ProgressBar
        current={index + 1}
        total={total}
        colorVar={colorVar}
        label={`سؤال ${index + 1} من ${total}`}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="mt-6"
        >
          <AdaptiveQuestion
            question={question}
            lessonContext={lessonContext}
            previousExplanation={question.explanation}
            accentColor={colorVar}
            onResolved={handleResolved}
            nextLabel={isLast ? "شوف ملخص فهمك" : "السؤال اللي بعده"}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
