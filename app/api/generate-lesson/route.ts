import { NextRequest, NextResponse } from "next/server";
import { generateLessonRequestSchema } from "@/lib/ai/requestSchemas";
import { generateLesson, AIServiceError } from "@/lib/ai/aiService";
import { AI_ERROR_MESSAGES, statusForAiError } from "@/lib/ai/errorMessages";

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "الرجاء إدخال بيانات صحيحة." }, { status: 400 });
  }

  const parsedRequest = generateLessonRequestSchema.safeParse(body);

  if (!parsedRequest.success) {
    const message = parsedRequest.error.issues[0]?.message || "البيانات المدخلة غير صحيحة.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    const lesson = await generateLesson(
      parsedRequest.data.lessonText,
      parsedRequest.data.mode,
      parsedRequest.data.profile
    );
    return NextResponse.json({ lesson });
  } catch (error) {
    if (error instanceof AIServiceError) {
      const message = AI_ERROR_MESSAGES[error.message] || AI_ERROR_MESSAGES.API_ERROR;
      return NextResponse.json({ error: message }, { status: statusForAiError(error.message) });
    }
    return NextResponse.json({ error: "حصلت مشكلة غير متوقعة. جرّب تاني." }, { status: 500 });
  }
}
