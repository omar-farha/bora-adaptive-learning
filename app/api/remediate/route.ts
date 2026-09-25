import { NextRequest, NextResponse } from "next/server";
import { remediationRequestSchema } from "@/lib/ai/requestSchemas";
import { generateRemediation, AIServiceError } from "@/lib/ai/aiService";
import { AI_ERROR_MESSAGES, statusForAiError } from "@/lib/ai/errorMessages";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "الرجاء إدخال بيانات صحيحة." }, { status: 400 });
  }

  const parsed = remediationRequestSchema.safeParse(body);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message || "البيانات المدخلة غير صحيحة.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    const remediation = await generateRemediation(parsed.data);
    return NextResponse.json({ remediation });
  } catch (error) {
    if (error instanceof AIServiceError) {
      const message = AI_ERROR_MESSAGES[error.message] || AI_ERROR_MESSAGES.API_ERROR;
      return NextResponse.json({ error: message }, { status: statusForAiError(error.message) });
    }
    return NextResponse.json({ error: "حصلت مشكلة غير متوقعة. جرّب تاني." }, { status: 500 });
  }
}
