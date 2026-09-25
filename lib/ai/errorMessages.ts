export const AI_ERROR_MESSAGES: Record<string, string> = {
  MISSING_API_KEY: "الخدمة مش متاحة دلوقتي. تواصل مع فريق بؤرة.",
  EMPTY_RESPONSE: "حصلت مشكلة وإحنا بنجهز المحتوى. جرّب تاني.",
  INVALID_JSON: "حصلت مشكلة وإحنا بنجهز المحتوى. جرّب تاني.",
  VALIDATION_FAILED: "حصلت مشكلة وإحنا بنجهز المحتوى. جرّب تاني.",
  API_ERROR: "في مشكلة في الاتصال دلوقتي. جرّب تاني بعد شوية.",
};

export function statusForAiError(code: string): number {
  return code === "MISSING_API_KEY" ? 503 : 502;
}
