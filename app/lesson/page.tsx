"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProfileOnboarding from "@/components/onboarding/ProfileOnboarding";
import LessonInput from "@/components/LessonInput";
import LoadingState from "@/components/LoadingState";
import LessonNav from "@/components/LessonNav";
import FocusEnvironment from "@/components/learning/FocusEnvironment";
import PredictableEnvironment from "@/components/learning/PredictableEnvironment";
import HearingEnvironment from "@/components/learning/HearingEnvironment";
import ReadingEnvironment from "@/components/learning/ReadingEnvironment";
import AssessmentStage, { AssessmentResult } from "@/components/AssessmentStage";
import TeachBack from "@/components/TeachBack";
import LearningSummary from "@/components/LearningSummary";
import { getEnvironmentMeta } from "@/lib/environments";
import { getLearningProfile, saveLearningProfile, addLessonHistoryEntry } from "@/lib/storage";
import type { GeneratedLesson, LearningMode, LearningProfile, TeachBackAnalysis } from "@/types/learning";

type Stage = "onboarding" | "input" | "loading" | "learn" | "assessment" | "teachback" | "summary";

export default function LessonPage() {
  const [stage, setStage] = useState<Stage>("onboarding");
  const [profile, setProfile] = useState<LearningProfile | null>(null);
  const [lessonText, setLessonText] = useState("");
  const [mode, setMode] = useState<LearningMode>("focus");
  const [lesson, setLesson] = useState<GeneratedLesson | null>(null);
  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [teachBackAnalysis, setTeachBackAnalysis] = useState<TeachBackAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const existing = getLearningProfile();
    if (existing) {
      setProfile(existing);
      setMode(existing.recommendedMode);
      setStage("input");
    }
  }, []);

  function handleProfileComplete(newProfile: LearningProfile) {
    saveLearningProfile(newProfile);
    setProfile(newProfile);
    setMode(newProfile.recommendedMode);
    setStage("input");
  }

  async function handleSubmit() {
    if (!profile || lessonText.trim().length < 10) return;
    setError(null);
    setStage("loading");

    try {
      const res = await fetch("/api/generate-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonText, mode, profile }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "حصلت مشكلة وإحنا بنجهز الدرس. جرّب تاني.");
        setStage("input");
        return;
      }

      setLesson(data.lesson);
      setStage("learn");
    } catch {
      setError("في مشكلة في الاتصال. اتأكد من النت وجرّب تاني.");
      setStage("input");
    }
  }

  function resetAll() {
    setStage("input");
    setLessonText("");
    setLesson(null);
    setResults([]);
    setTeachBackAnalysis(null);
    setError(null);
  }

  function backToInput() {
    setStage("input");
  }

  function handleTryAnotherMode() {
    setLesson(null);
    setResults([]);
    setTeachBackAnalysis(null);
    setStage("input");
  }

  function handleAssessmentComplete(assessmentResults: AssessmentResult[]) {
    setResults(assessmentResults);
    setStage("teachback");
  }

  function handleTeachBackComplete(analysis: TeachBackAnalysis | null) {
    setTeachBackAnalysis(analysis);

    if (lesson) {
      addLessonHistoryEntry({
        id: `${Date.now()}`,
        lessonTitle: lesson.lessonTitle,
        mode,
        completedAt: Date.now(),
        correctCount: results.filter((r) => r.correct).length,
        totalCount: results.length,
        conceptsUnderstood: [...new Set(results.filter((r) => r.correct).map((r) => r.concept))],
        conceptsToReview: [
          ...new Set([
            ...results.filter((r) => !r.correct).map((r) => r.concept),
            ...(analysis?.missingPoints || []),
          ]),
        ],
      });
    }

    setStage("summary");
  }

  const envMeta = getEnvironmentMeta(mode);

  return (
    <div className="min-h-screen">
      {stage !== "onboarding" && stage !== "input" && stage !== "loading" && (
        <LessonNav
          onBack={stage === "learn" ? backToInput : undefined}
          onRestart={resetAll}
          title={lesson?.lessonTitle}
        />
      )}

      <AnimatePresence mode="wait">
        {stage === "onboarding" && (
          <motion.div key="onboarding" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ProfileOnboarding onComplete={handleProfileComplete} />
          </motion.div>
        )}

        {stage === "input" && profile && (
          <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LessonInput
              lessonText={lessonText}
              onLessonTextChange={setLessonText}
              mode={mode}
              onModeChange={setMode}
              profile={profile}
              onSubmit={handleSubmit}
              error={error}
            />
          </motion.div>
        )}

        {stage === "loading" && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LoadingState />
          </motion.div>
        )}

        {stage === "learn" && lesson && (
          <motion.div key="learn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {mode === "focus" && (
              <FocusEnvironment lesson={lesson} onComplete={() => setStage("assessment")} />
            )}
            {mode === "predictable" && (
              <PredictableEnvironment lesson={lesson} onComplete={() => setStage("assessment")} />
            )}
            {mode === "hearing" && (
              <HearingEnvironment lesson={lesson} onComplete={() => setStage("assessment")} />
            )}
            {mode === "reading" && (
              <ReadingEnvironment lesson={lesson} onComplete={() => setStage("assessment")} />
            )}
          </motion.div>
        )}

        {stage === "assessment" && lesson && (
          <motion.div key="assessment" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AssessmentStage
              questions={lesson.finalQuestions}
              lessonContext={lesson.lessonTitle}
              colorVar={envMeta.colorVar}
              onComplete={handleAssessmentComplete}
            />
          </motion.div>
        )}

        {stage === "teachback" && lesson && (
          <motion.div key="teachback" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <TeachBack lesson={lesson} colorVar={envMeta.colorVar} onComplete={handleTeachBackComplete} />
          </motion.div>
        )}

        {stage === "summary" && (
          <motion.div key="summary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LearningSummary
              results={results}
              teachBackMissingPoints={teachBackAnalysis?.missingPoints}
              onTryAnotherMode={handleTryAnotherMode}
              onNewLesson={resetAll}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
