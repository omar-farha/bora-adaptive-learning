import { z } from "zod";

export const learningProfileSchema = z.object({
  focus: z.enum(["short_chunks", "one_at_a_time", "frequent_questions", "long_explanations"]),
  presentation: z.enum(["visual", "audio", "text", "examples", "step_by_step"]),
  motion: z.enum(["none", "gentle", "normal"]),
  density: z.enum(["minimal", "balanced", "detailed"]),
  sound: z.enum(["silent", "optional", "audio_first"]),
  contrast: z.enum(["soft", "standard", "high"]),
  readingSupport: z.enum([
    "read_aloud",
    "highlight_while_reading",
    "shorter_sentences",
    "explain_words",
  ]),
  pacing: z.enum(["very_short", "short", "normal"]),
  recommendedMode: z.enum(["focus", "predictable", "hearing", "reading"]),
});

export const generateLessonRequestSchema = z.object({
  lessonText: z.string().min(10, "الدرس قصير جدًا").max(8000, "الدرس طويل جدًا"),
  mode: z.enum(["focus", "predictable", "hearing", "reading"]),
  profile: learningProfileSchema,
});

export const analyzeAnswerRequestSchema = z.object({
  lessonContext: z.string().min(1).max(500),
  concept: z.string().min(1).max(200),
  questionPrompt: z.string().min(1).max(1000),
  correctAnswerDescription: z.string().min(1).max(500),
  studentAnswer: z.string().min(1).max(1000),
});

export const remediationRequestSchema = z.object({
  lessonContext: z.string().min(1).max(500),
  concept: z.string().min(1).max(200),
  representation: z.enum(["definition", "analogy", "visual", "step_by_step"]),
  previousExplanation: z.string().min(1).max(1000),
});

export const teachBackRequestSchema = z.object({
  lessonContext: z.string().min(1).max(500),
  keyPoints: z.array(z.string().min(1)).min(1).max(10),
  studentExplanation: z.string().min(3, "اكتب شرح أطول شوية").max(2000),
});
