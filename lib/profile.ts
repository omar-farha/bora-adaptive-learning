import type {
  FocusPreference,
  PresentationPreference,
  MotionPreference,
  SoundPreference,
  ReadingSupportPreference,
  PacingPreference,
  LearningMode,
} from "@/types/learning";

export interface ProfileAnswers {
  focus: FocusPreference;
  presentation: PresentationPreference;
  motion: MotionPreference;
  sound: SoundPreference;
  readingSupport: ReadingSupportPreference;
  pacing: PacingPreference;
}

// A simple, transparent point-scoring heuristic — not a diagnosis, just a
// starting recommendation the student can freely override.
export function recommendMode(answers: ProfileAnswers): LearningMode {
  const scores: Record<LearningMode, number> = {
    focus: 0,
    predictable: 0,
    hearing: 0,
    reading: 0,
  };

  if (["short_chunks", "one_at_a_time", "frequent_questions"].includes(answers.focus)) {
    scores.focus += 2;
  } else {
    scores.predictable += 1;
  }

  if (answers.presentation === "visual") {
    scores.hearing += 2;
    scores.predictable += 1;
  } else if (answers.presentation === "audio") {
    scores.reading += 2;
  } else if (answers.presentation === "step_by_step") {
    scores.predictable += 2;
  } else if (answers.presentation === "examples") {
    scores.focus += 1;
  }

  if (answers.motion !== "normal") {
    scores.predictable += 1;
  }

  if (answers.sound === "silent") {
    scores.hearing += 2;
  } else if (answers.sound === "audio_first") {
    scores.reading += 2;
  }

  if (answers.readingSupport === "read_aloud" || answers.readingSupport === "highlight_while_reading") {
    scores.reading += 2;
  } else if (answers.readingSupport === "shorter_sentences") {
    scores.reading += 1;
  } else if (answers.readingSupport === "explain_words") {
    scores.hearing += 1;
  }

  if (answers.pacing !== "normal") {
    scores.focus += 1;
  }

  const order: LearningMode[] = ["focus", "predictable", "hearing", "reading"];
  return order.reduce((best, mode) => (scores[mode] > scores[best] ? mode : best), order[0]);
}
