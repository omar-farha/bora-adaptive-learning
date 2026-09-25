import { z } from "zod";
import { Type } from "@google/genai";
import type { Question, QuestionType } from "@/types/learning";

// ---------------------------------------------------------------------------
// Gemini can't express a discriminated union well in structured output, so we
// ask it for one flat "raw question" shape and fold it into our typed
// discriminated union afterwards (rawQuestionToQuestion below).
// ---------------------------------------------------------------------------

export const rawQuestionSchema = z.object({
  id: z.string().min(1),
  concept: z.string().min(1),
  type: z.enum(["mcq", "true_false", "fill_blank", "short_answer", "explain_own_words"]),
  prompt: z.string().min(1),
  explanation: z.string().min(1),
  options: z.array(z.string()).default([]),
  correctIndex: z.number().int().default(-1),
  correctAnswer: z.string().default(""),
  acceptableAnswers: z.array(z.string()).default([]),
  modelAnswer: z.string().default(""),
});

export type RawQuestion = z.infer<typeof rawQuestionSchema>;

export function rawQuestionToQuestion(raw: RawQuestion): Question | null {
  const base = {
    id: raw.id,
    concept: raw.concept,
    prompt: raw.prompt,
    explanation: raw.explanation,
  };

  switch (raw.type) {
    case "mcq":
      if (raw.options.length < 2 || raw.correctIndex < 0 || raw.correctIndex >= raw.options.length) {
        return null;
      }
      return { ...base, type: "mcq", options: raw.options, correctIndex: raw.correctIndex };
    case "true_false": {
      const normalized = raw.correctAnswer.trim().toLowerCase();
      if (!normalized) return null;
      const correctAnswer = normalized === "true" || normalized === "صح" || normalized === "صحيح";
      return { ...base, type: "true_false", correctAnswer };
    }
    case "fill_blank":
      if (!raw.correctAnswer) return null;
      return {
        ...base,
        type: "fill_blank",
        correctAnswer: raw.correctAnswer,
        acceptableAnswers: raw.acceptableAnswers,
      };
    case "short_answer":
    case "explain_own_words":
      if (!raw.modelAnswer) return null;
      return { ...base, type: raw.type, modelAnswer: raw.modelAnswer };
    default:
      return null;
  }
}

export const vocabularyItemSchema = z.object({
  term: z.string().min(1),
  simpleExplanation: z.string().min(1),
  example: z.string().optional(),
});

export const rawLessonSectionSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  explanation: z.string().min(1),
  simpleExplanation: z.string().min(1),
  example: z.string().min(1),
  visualStructure: z.array(z.string()).default([]),
  vocabulary: z.array(vocabularyItemSchema).default([]),
  audioScript: z.string().min(1),
  question: rawQuestionSchema,
});

export const misconceptionSchema = z.object({
  concept: z.string().min(1),
  commonMistake: z.string().min(1),
  clarification: z.string().min(1),
});

export const rawGeneratedLessonSchema = z.object({
  lessonTitle: z.string().min(1),
  learningObjectives: z.array(z.string()).min(1),
  concepts: z.array(z.string()).min(1),
  sections: z.array(rawLessonSectionSchema).min(1).max(6),
  finalQuestions: z.array(rawQuestionSchema).min(2).max(6),
  misconceptions: z.array(misconceptionSchema).default([]),
  estimatedDurationMinutes: z.number().int().min(1).max(60),
});

// Gemini structured-output schema (subset of JSON Schema the SDK accepts).
const rawQuestionGeminiSchema = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.STRING },
    concept: { type: Type.STRING },
    type: {
      type: Type.STRING,
      enum: ["mcq", "true_false", "fill_blank", "short_answer", "explain_own_words"],
    },
    prompt: { type: Type.STRING },
    explanation: { type: Type.STRING },
    options: { type: Type.ARRAY, items: { type: Type.STRING } },
    correctIndex: { type: Type.INTEGER },
    correctAnswer: { type: Type.STRING },
    acceptableAnswers: { type: Type.ARRAY, items: { type: Type.STRING } },
    modelAnswer: { type: Type.STRING },
  },
  required: [
    "id",
    "concept",
    "type",
    "prompt",
    "explanation",
    "options",
    "correctIndex",
    "correctAnswer",
    "acceptableAnswers",
    "modelAnswer",
  ],
};

export const geminiLessonResponseSchema = {
  type: Type.OBJECT,
  properties: {
    lessonTitle: { type: Type.STRING },
    learningObjectives: { type: Type.ARRAY, items: { type: Type.STRING } },
    concepts: { type: Type.ARRAY, items: { type: Type.STRING } },
    sections: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          title: { type: Type.STRING },
          explanation: { type: Type.STRING },
          simpleExplanation: { type: Type.STRING },
          example: { type: Type.STRING },
          visualStructure: { type: Type.ARRAY, items: { type: Type.STRING } },
          vocabulary: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                term: { type: Type.STRING },
                simpleExplanation: { type: Type.STRING },
                example: { type: Type.STRING },
              },
              required: ["term", "simpleExplanation"],
            },
          },
          audioScript: { type: Type.STRING },
          question: rawQuestionGeminiSchema,
        },
        required: [
          "id",
          "title",
          "explanation",
          "simpleExplanation",
          "example",
          "audioScript",
          "question",
        ],
      },
    },
    finalQuestions: { type: Type.ARRAY, items: rawQuestionGeminiSchema },
    misconceptions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          concept: { type: Type.STRING },
          commonMistake: { type: Type.STRING },
          clarification: { type: Type.STRING },
        },
        required: ["concept", "commonMistake", "clarification"],
      },
    },
    estimatedDurationMinutes: { type: Type.INTEGER },
  },
  required: [
    "lessonTitle",
    "learningObjectives",
    "concepts",
    "sections",
    "finalQuestions",
    "estimatedDurationMinutes",
  ],
};

export const answerAnalysisSchema = z.object({
  isCorrect: z.boolean(),
  feedback: z.string().min(1),
  misconception: z.string().nullable(),
  recommendedRepresentation: z
    .enum(["definition", "analogy", "visual", "step_by_step"])
    .nullable(),
});

export const geminiAnswerAnalysisSchema = {
  type: Type.OBJECT,
  properties: {
    isCorrect: { type: Type.BOOLEAN },
    feedback: { type: Type.STRING },
    misconception: { type: Type.STRING },
    recommendedRepresentation: {
      type: Type.STRING,
      enum: ["definition", "analogy", "visual", "step_by_step", "none"],
    },
  },
  required: ["isCorrect", "feedback"],
};

export const remediationContentSchema = z.object({
  representation: z.enum(["definition", "analogy", "visual", "step_by_step"]),
  title: z.string().min(1),
  content: z.string().min(1),
});

export const geminiRemediationSchema = {
  type: Type.OBJECT,
  properties: {
    representation: {
      type: Type.STRING,
      enum: ["definition", "analogy", "visual", "step_by_step"],
    },
    title: { type: Type.STRING },
    content: { type: Type.STRING },
  },
  required: ["representation", "title", "content"],
};

export const teachBackAnalysisSchema = z.object({
  coveredPoints: z.array(z.string()).default([]),
  missingPoints: z.array(z.string()).default([]),
  encouragement: z.string().min(1),
});

export const geminiTeachBackSchema = {
  type: Type.OBJECT,
  properties: {
    coveredPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
    missingPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
    encouragement: { type: Type.STRING },
  },
  required: ["coveredPoints", "missingPoints", "encouragement"],
};

export type QuestionTypeSet = QuestionType;
