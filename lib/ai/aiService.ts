import { callStructured, AIServiceError } from "./geminiClient";
import {
  rawGeneratedLessonSchema,
  geminiLessonResponseSchema,
  rawQuestionToQuestion,
  answerAnalysisSchema,
  geminiAnswerAnalysisSchema,
  remediationContentSchema,
  geminiRemediationSchema,
  teachBackAnalysisSchema,
  geminiTeachBackSchema,
} from "./schema";
import {
  buildLessonPrompt,
  buildAnswerAnalysisPrompt,
  buildRemediationPrompt,
  buildTeachBackPrompt,
} from "./prompts";
import type {
  GeneratedLesson,
  LearningMode,
  LearningProfile,
  AnswerAnalysis,
  RemediationContent,
  TeachBackAnalysis,
  RepresentationType,
} from "@/types/learning";

export { AIServiceError };

async function generateOnce(
  lessonText: string,
  mode: LearningMode,
  profile: LearningProfile
): Promise<GeneratedLesson | null> {
  const prompt = buildLessonPrompt(lessonText, mode, profile);
  const raw = await callStructured({ prompt, responseSchema: geminiLessonResponseSchema });
  const parsed = rawGeneratedLessonSchema.safeParse(raw);

  if (!parsed.success) {
    console.error("[bora] lesson schema validation failed:", parsed.error.issues);
    return null;
  }

  const sections = [];
  for (const rawSection of parsed.data.sections) {
    const question = rawQuestionToQuestion(rawSection.question);
    if (!question) {
      console.error("[bora] dropped malformed section question:", rawSection.question);
      continue;
    }
    sections.push({ ...rawSection, question });
  }

  if (sections.length === 0) {
    console.error("[bora] all sections had malformed questions, rejecting generation");
    return null;
  }

  const finalQuestions = parsed.data.finalQuestions
    .map((q) => {
      const converted = rawQuestionToQuestion(q);
      if (!converted) console.error("[bora] dropped malformed final question:", q);
      return converted;
    })
    .filter((q): q is NonNullable<typeof q> => q !== null);

  if (finalQuestions.length < 2) {
    console.error("[bora] too few valid final questions after filtering:", finalQuestions.length);
    return null;
  }

  return {
    lessonTitle: parsed.data.lessonTitle,
    learningObjectives: parsed.data.learningObjectives,
    concepts: parsed.data.concepts,
    sections,
    finalQuestions,
    misconceptions: parsed.data.misconceptions,
    estimatedDurationMinutes: parsed.data.estimatedDurationMinutes,
  };
}

export async function generateLesson(
  lessonText: string,
  mode: LearningMode,
  profile: LearningProfile
): Promise<GeneratedLesson> {
  let lesson: GeneratedLesson | null;

  try {
    lesson = await generateOnce(lessonText, mode, profile);
  } catch (error) {
    console.error("[bora] Gemini call failed:", error);
    if (error instanceof AIServiceError) throw error;
    throw new AIServiceError("API_ERROR");
  }

  if (!lesson) {
    try {
      lesson = await generateOnce(lessonText, mode, profile);
    } catch (error) {
      console.error("[bora] Gemini retry call failed:", error);
      if (error instanceof AIServiceError) throw error;
      throw new AIServiceError("API_ERROR");
    }
  }

  if (!lesson) {
    throw new AIServiceError("VALIDATION_FAILED");
  }

  return lesson;
}

export async function analyzeAnswer(params: {
  lessonContext: string;
  concept: string;
  questionPrompt: string;
  correctAnswerDescription: string;
  studentAnswer: string;
}): Promise<AnswerAnalysis> {
  const prompt = buildAnswerAnalysisPrompt(params);

  let raw: unknown;
  try {
    raw = await callStructured({ prompt, responseSchema: geminiAnswerAnalysisSchema });
  } catch (error) {
    console.error("[bora] analyzeAnswer call failed:", error);
    throw new AIServiceError("API_ERROR");
  }

  const parsed = answerAnalysisSchema.safeParse(
    normalizeAnswerAnalysis(raw as Record<string, unknown>)
  );

  if (!parsed.success) {
    console.error("[bora] answer analysis validation failed:", parsed.error.issues);
    throw new AIServiceError("VALIDATION_FAILED");
  }

  return parsed.data;
}

function normalizeAnswerAnalysis(raw: Record<string, unknown>) {
  const rec = raw as {
    recommendedRepresentation?: string;
    misconception?: string;
  };
  return {
    ...raw,
    misconception: rec.misconception || null,
    recommendedRepresentation:
      !rec.recommendedRepresentation || rec.recommendedRepresentation === "none"
        ? null
        : rec.recommendedRepresentation,
  };
}

export async function generateRemediation(params: {
  lessonContext: string;
  concept: string;
  representation: RepresentationType;
  previousExplanation: string;
}): Promise<RemediationContent> {
  const prompt = buildRemediationPrompt(params);

  let raw: unknown;
  try {
    raw = await callStructured({ prompt, responseSchema: geminiRemediationSchema });
  } catch (error) {
    console.error("[bora] generateRemediation call failed:", error);
    throw new AIServiceError("API_ERROR");
  }

  const parsed = remediationContentSchema.safeParse(raw);
  if (!parsed.success) {
    console.error("[bora] remediation validation failed:", parsed.error.issues);
    throw new AIServiceError("VALIDATION_FAILED");
  }

  return parsed.data;
}

export async function analyzeTeachBack(params: {
  lessonContext: string;
  keyPoints: string[];
  studentExplanation: string;
}): Promise<TeachBackAnalysis> {
  const prompt = buildTeachBackPrompt(params);

  let raw: unknown;
  try {
    raw = await callStructured({ prompt, responseSchema: geminiTeachBackSchema });
  } catch (error) {
    console.error("[bora] analyzeTeachBack call failed:", error);
    throw new AIServiceError("API_ERROR");
  }

  const parsed = teachBackAnalysisSchema.safeParse(raw);
  if (!parsed.success) {
    console.error("[bora] teach-back validation failed:", parsed.error.issues);
    throw new AIServiceError("VALIDATION_FAILED");
  }

  return parsed.data;
}
