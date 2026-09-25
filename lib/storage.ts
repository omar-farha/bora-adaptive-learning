import type { LearningProfile, LessonHistoryEntry } from "@/types/learning";

const PROFILE_KEY = "bora:learning-profile";
const HISTORY_KEY = "bora:lesson-history";

function safeGet<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function safeSet(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable (private mode, quota, etc.) — fail silently, it's non-critical.
  }
}

export function getLearningProfile(): LearningProfile | null {
  return safeGet<LearningProfile>(PROFILE_KEY);
}

export function saveLearningProfile(profile: LearningProfile) {
  safeSet(PROFILE_KEY, profile);
}

export function clearLearningProfile() {
  try {
    window.localStorage.removeItem(PROFILE_KEY);
  } catch {
    // ignore
  }
}

export function getLessonHistory(): LessonHistoryEntry[] {
  return safeGet<LessonHistoryEntry[]>(HISTORY_KEY) || [];
}

export function addLessonHistoryEntry(entry: LessonHistoryEntry) {
  const history = getLessonHistory();
  history.unshift(entry);
  safeSet(HISTORY_KEY, history.slice(0, 50));
}
