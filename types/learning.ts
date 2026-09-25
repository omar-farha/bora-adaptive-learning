export type LearningMode = "focus" | "predictable" | "hearing" | "reading";

export type QuestionType =
  | "mcq"
  | "true_false"
  | "fill_blank"
  | "short_answer"
  | "explain_own_words";

export interface QuestionBase {
  id: string;
  concept: string;
  type: QuestionType;
  prompt: string;
  explanation: string;
}

export interface MCQQuestion extends QuestionBase {
  type: "mcq";
  options: string[];
  correctIndex: number;
}

export interface TrueFalseQuestion extends QuestionBase {
  type: "true_false";
  correctAnswer: boolean;
}

export interface FillBlankQuestion extends QuestionBase {
  type: "fill_blank";
  correctAnswer: string;
  acceptableAnswers: string[];
}

export interface OpenQuestion extends QuestionBase {
  type: "short_answer" | "explain_own_words";
  modelAnswer: string;
}

export type Question =
  | MCQQuestion
  | TrueFalseQuestion
  | FillBlankQuestion
  | OpenQuestion;

export interface VocabularyItem {
  term: string;
  simpleExplanation: string;
  example?: string;
}

export interface LessonSection {
  id: string;
  title: string;
  explanation: string;
  simpleExplanation: string;
  example: string;
  visualStructure: string[];
  vocabulary: VocabularyItem[];
  audioScript: string;
  question: Question;
}

export interface Misconception {
  concept: string;
  commonMistake: string;
  clarification: string;
}

export interface GeneratedLesson {
  lessonTitle: string;
  learningObjectives: string[];
  concepts: string[];
  sections: LessonSection[];
  finalQuestions: Question[];
  misconceptions: Misconception[];
  estimatedDurationMinutes: number;
}

export interface GenerateLessonRequest {
  lessonText: string;
  mode: LearningMode;
  profile: LearningProfile;
}

// ---- Learning profile (onboarding) ----

export type FocusPreference =
  | "short_chunks"
  | "one_at_a_time"
  | "frequent_questions"
  | "long_explanations";

export type PresentationPreference = "visual" | "audio" | "text" | "examples" | "step_by_step";

export type MotionPreference = "none" | "gentle" | "normal";
export type DensityPreference = "minimal" | "balanced" | "detailed";
export type SoundPreference = "silent" | "optional" | "audio_first";
export type ContrastPreference = "soft" | "standard" | "high";

export type ReadingSupportPreference =
  | "read_aloud"
  | "highlight_while_reading"
  | "shorter_sentences"
  | "explain_words";

export type PacingPreference = "very_short" | "short" | "normal";

export interface LearningProfile {
  focus: FocusPreference;
  presentation: PresentationPreference;
  motion: MotionPreference;
  density: DensityPreference;
  sound: SoundPreference;
  contrast: ContrastPreference;
  readingSupport: ReadingSupportPreference;
  pacing: PacingPreference;
  recommendedMode: LearningMode;
}

// ---- Learning signals / events (client-side only, stored locally) ----

export interface LearningEvent {
  id: string;
  timestamp: number;
  lessonTitle: string;
  mode: LearningMode;
  concept: string;
  questionType: QuestionType;
  correct: boolean;
  attempts: number;
  helpRequested: boolean;
}

export type RepresentationType = "definition" | "analogy" | "visual" | "step_by_step";

export interface AdaptationDecision {
  concept: string;
  nextRepresentation: RepresentationType;
  reason: string;
}

export interface AnswerAnalysis {
  isCorrect: boolean;
  feedback: string;
  misconception: string | null;
  recommendedRepresentation: RepresentationType | null;
}

export interface RemediationContent {
  representation: RepresentationType;
  title: string;
  content: string;
}

export interface TeachBackAnalysis {
  coveredPoints: string[];
  missingPoints: string[];
  encouragement: string;
}

// ---- Learning history (localStorage) ----

export interface LessonHistoryEntry {
  id: string;
  lessonTitle: string;
  mode: LearningMode;
  completedAt: number;
  correctCount: number;
  totalCount: number;
  conceptsUnderstood: string[];
  conceptsToReview: string[];
}
