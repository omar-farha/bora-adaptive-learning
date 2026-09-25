import type { LearningMode, LearningProfile, RepresentationType } from "@/types/learning";

const modeInstructions: Record<LearningMode, string> = {
  focus: `
البيئة المطلوبة: بيئة التركيز (Focus Environment).
الهدف: تقليل الحمل الذهني ومساعدة الطالب على التركيز على فكرة واحدة في كل مرة.
قواعد:
- قسّم الدرس لأقسام قصيرة جدًا، كل قسم فكرة واحدة بس. لو الدرس فيه 3 جمل أو أكتر، استخدم 4 إلى 6 أقسام. لو قصير جدًا استخدم عدد أقل يكفي فعليًا.
- explanation و simpleExplanation قصار (سطرين لثلاثة بحد أقصى)، من غير حشو.
- audioScript يكون نسخة مسموعة قصيرة ومباشرة من الشرح، مناسبة للقراءة بصوت عالٍ.
- سؤال كل قسم (question) يختبر نفس فكرة القسم بس، وميكونش معقد.
`,
  predictable: `
البيئة المطلوبة: بيئة الاستقرار والتوقع (Predictable Learning Environment).
الهدف: تجربة تعلم منظمة ومتوقعة، كل قسم له بداية ونهاية واضحة.
قواعد:
- قسّم الدرس لأقسام بحجم متوازن ومتسق. لو الدرس فيه 3 جمل أو أكتر استخدم 3 إلى 5 أقسام.
- كل قسم يتبع نفس الترتيب: شرح، ثم مثال، ثم خطوات بصرية لو مناسب (visualStructure).
- استخدم أسلوب واضح وهادئ من غير مبالغة أو علامات تعجب كتير.
- visualStructure لازم تتملى لكل قسم بخطوات قصيرة توضح تسلسل الفكرة (حتى لو خطوتين بس).
`,
  hearing: `
البيئة المطلوبة: بيئة الصم وضعاف السمع (Deaf & Hard-of-Hearing Learning Environment).
الهدف: إيصال المعلومة بصريًا بالكامل من غير اعتماد على الصوت.
قواعد:
- ركّز جدًا على vocabulary: استخرج كل مصطلح صعب في القسم وحط له simpleExplanation قصيرة وواضحة جدًا (تعريف من سطر واحد).
- visualStructure لازم تتملى دايمًا بخطوات أو مكونات واضحة تلخص الفكرة بصريًا (حتى لو مفهوم بسيط، اعمل خطوتين أو تلاتة).
- explanation يكون منظم وواضح ومكتوب كأنه "caption" للمفهوم: جملة قصيرة تشرح المعنى مباشرة من غير حشو.
- audioScript ماله لازمة كبيرة هنا لكن املاه بنص قصير بديل بصري.
- لو الدرس فيه 3 جمل أو أكتر (أو فيه أكتر من مرحلة/مفهوم واضح)، استخدم 3 إلى 5 أقسام بحيث كل مفهوم ياخد قسم لوحده. استخدم عدد أقل بس لو الدرس فعلاً جملة أو جملتين.
`,
  reading: `
البيئة المطلوبة: بيئة دعم القراءة (Reading Support Environment).
الهدف: تسهيل القراءة على الطلاب اللي بيواجهوا صعوبة فيها.
قواعد:
- استخدم جمل قصيرة جدًا وبسيطة في كل explanation و simpleExplanation.
- استخرج كل كلمة ممكن تكون صعبة في القراءة أو الفهم وحطها في vocabulary مع شرح مبسط جدًا.
- audioScript لازم يكون نسخة مطابقة تمامًا للنص المكتوب في explanation (نفس الجمل بالظبط) عشان تتقرا بصوت عالي وهي بتتحدد على الشاشة في نفس الوقت.
- خلي الجمل قصيرة بما يكفي إنها تتقسم بسهولة لجمل منفصلة للقراءة المتزامنة.
- لو الدرس فيه 3 جمل أو أكتر، استخدم 3 إلى 5 أقسام بحيث كل مرحلة تاخد قسم لوحدها. استخدم عدد أقل بس لو الدرس فعلاً جملة أو جملتين.
`,
};

function profileHints(profile: LearningProfile): string {
  const hints: string[] = [];

  if (profile.pacing === "very_short") {
    hints.push("الطالب بيفضل جلسات قصيرة جدًا، خلي كل قسم مختصر قد الإمكان.");
  } else if (profile.pacing === "short") {
    hints.push("الطالب بيفضل جلسات قصيرة، تجنب الحشو.");
  }

  if (profile.presentation === "visual") {
    hints.push("الطالب بيفهم بصريًا أكتر، اهتم بـ visualStructure في كل قسم.");
  } else if (profile.presentation === "audio") {
    hints.push("الطالب بيفضل الصوت، اهتم إن audioScript يكون واضح ومترابط.");
  } else if (profile.presentation === "examples") {
    hints.push("الطالب بيفهم بالأمثلة أكتر من التعريفات، خلي example قوي وملموس في كل قسم.");
  } else if (profile.presentation === "step_by_step") {
    hints.push("الطالب بيفضل الشرح خطوة بخطوة، استخدم visualStructure كخطوات متسلسلة واضحة.");
  }

  if (profile.readingSupport === "shorter_sentences") {
    hints.push("قصّر الجمل قد الإمكان في كل النصوص.");
  } else if (profile.readingSupport === "explain_words") {
    hints.push("زوّد عدد المصطلحات في vocabulary حتى لو بسيطة نسبيًا.");
  }

  return hints.length ? `ملاحظات عن الطالب:\n- ${hints.join("\n- ")}` : "";
}

export function buildLessonPrompt(
  lessonText: string,
  mode: LearningMode,
  profile: LearningProfile
): string {
  return `
أنت محرك تحويل محتوى تعليمي اسمه "بؤرة". مهمتك تاخد الدرس المحدد بالضبط تحت وتحوله لتجربة تعلم تكيفية منظمة بصيغة JSON.

تحذير مهم جدًا: الدرس المطلوب تحويله هو النص الموجود بين علامتي *** تحت، ولا حاجة غيره. ممنوع منعًا باتًا إنك تتكلم عن أي موضوع تاني غير الموضوع المذكور فعليًا في الدرس ده. لازم تستخدم نفس الكلمات والمفاهيم الموجودة في الدرس الأصلي.

الدرس المطلوب تحويله:
***
${lessonText}
***

قواعد عامة:
- افهم الدرس اللي فوق بالظبط وحافظ على المعلومات الصحيحة فيه، ماتخترعش معلومات مش موجودة فيه.
- لو الدرس قصير، اعمل أقل عدد أقسام وأسئلة يكفي عشان تغطي المحتوى الموجود فعليًا من غير حشو.
- استخدم لغة عربية مصرية طبيعية وواضحة ومناسبة لطلاب المرحلة الابتدائية والإعدادية.
- كل سؤال (question لكل قسم، وfinalQuestions) لازم يكون فيه حقل type بواحدة من القيم: mcq, true_false, fill_blank, short_answer, explain_own_words. نوّع بين الأنواع دي، ماتخليش كل الأسئلة mcq.
- كل سؤال لازم يحتوي على كل الحقول التالية دايمًا (options, correctIndex, correctAnswer, acceptableAnswers, modelAnswer)، حتى لو مش كلها مستخدمة فعليًا حسب النوع. املا الحقول الغير مستخدمة بقيم افتراضية فاضية (array فاضي [] أو نص فاضي "" أو -1)، لكن املا الحقول المطلوبة فعليًا للنوع بقيم حقيقية ومنطقية بالشكل ده:
  - mcq: options لازم تكون 4 اختيارات بالظبط (مش فاضية)، و correctIndex رقم حقيقي من 0 لـ 3 (ممنوع تسيبه فاضي أو -1).
  - true_false: correctAnswer لازم تكون "true" أو "false" بالظبط.
  - fill_blank: correctAnswer لازم تكون الإجابة الصحيحة الحقيقية، و acceptableAnswers صيغ تانية مقبولة لو موجودة.
  - short_answer أو explain_own_words: modelAnswer لازم تكون إجابة نموذجية حقيقية قصيرة.
- finalQuestions لازم تكون من 2 إلى 5 أسئلة تغطي أهم المفاهيم الموجودة فعليًا في الدرس، كل سؤال مرتبط بمفهوم (concept) واضح.
- misconceptions: اكتب من صفر إلى 3 أخطاء شائعة متوقعة في فهم الدرس ده، كل واحد فيه concept و commonMistake و clarification.
- estimatedDurationMinutes: رقم تقديري منطقي (من 3 لـ 20) حسب طول الدرس.
- ماتديش أي تشخيص طبي أو نصايح طبية، المحتوى تعليمي بحت.

${modeInstructions[mode]}

${profileHints(profile)}

رجّع النتيجة بصيغة JSON مطابقة تمامًا للـ schema المحدد، من غير أي نص إضافي خارج الـ JSON.
`.trim();
}

export function buildAnswerAnalysisPrompt(params: {
  lessonContext: string;
  concept: string;
  questionPrompt: string;
  correctAnswerDescription: string;
  studentAnswer: string;
}): string {
  return `
أنت مساعد تعليمي بيحلل إجابة طالب عشان يكتشف سوء الفهم (misconception) لو موجود، مش بس يقول صح أو غلط.

سياق الدرس: ${params.lessonContext}
المفهوم: ${params.concept}
السؤال: ${params.questionPrompt}
الإجابة الصحيحة المتوقعة: ${params.correctAnswerDescription}
إجابة الطالب: ${params.studentAnswer}

حلل إجابة الطالب:
- isCorrect: هل الإجابة صح فعليًا أو قريبة بما يكفي من الصح.
- feedback: رسالة قصيرة ومشجعة بالعربي المصري (متستخدمش كلمة "خطأ" بشكل قاسي، استخدم أسلوب زي "قربت جدًا" أو "في نقطة محتاجين نظبطها").
- misconception: لو فيه سوء فهم واضح من الإجابة، اوصفه في جملة قصيرة. لو مفيش، سيبه null.
- recommendedRepresentation: لو الإجابة غلط، اقترح واحدة من (definition, analogy, visual, step_by_step) كطريقة شرح تانية تساعد الطالب يفهم. لو الإجابة صح، رجّع "none".

رجّع JSON بس مطابق للـ schema.
`.trim();
}

const representationLabel: Record<RepresentationType, string> = {
  definition: "تعريف مبسط",
  analogy: "تشبيه من الحياة اليومية",
  visual: "شرح بصري بخطوات",
  step_by_step: "شرح تفصيلي خطوة بخطوة",
};

export function buildRemediationPrompt(params: {
  lessonContext: string;
  concept: string;
  representation: RepresentationType;
  previousExplanation: string;
}): string {
  return `
أنت معلم بيشرح مفهوم لطالب حاول يفهمه قبل كده وماقدرش، فمحتاج طريقة شرح مختلفة تمامًا.

سياق الدرس: ${params.lessonContext}
المفهوم: ${params.concept}
الشرح اللي اتقال قبل كده ومانفعش: "${params.previousExplanation}"

اكتب شرح جديد للمفهوم ده باستخدام أسلوب: ${representationLabel[params.representation]}.
الشرح لازم يكون مختلف فعليًا عن الشرح السابق، مش نفس الكلام بصياغة تانية.
اكتبه بالعربي المصري البسيط المناسب لطلاب المرحلة الابتدائية والإعدادية.

رجّع JSON فيه:
- representation: "${params.representation}"
- title: عنوان قصير للشرح الجديد
- content: الشرح نفسه (فقرة قصيرة، سطرين لأربعة بحد أقصى)
`.trim();
}

export function buildTeachBackPrompt(params: {
  lessonContext: string;
  keyPoints: string[];
  studentExplanation: string;
}): string {
  return `
أنت معلم بتسمع طالب بيحاول يشرحلك مفهوم بكلامه هو، عشان تتأكد إنه فاهمه فعلاً.

سياق الدرس: ${params.lessonContext}
النقاط الأساسية المفروض تكون واضحة في شرح الطالب:
${params.keyPoints.map((p, i) => `${i + 1}. ${p}`).join("\n")}

شرح الطالب:
"${params.studentExplanation}"

حلل شرح الطالب وحدد:
- coveredPoints: قائمة بالنقاط اللي الطالب فهمها ووضحها صح (اكتبها بصيغة قريبة من النقاط الأساسية اللي فوق).
- missingPoints: قائمة بالنقاط اللي ماتوضحتش أو غلط فيها.
- encouragement: جملة تشجيعية قصيرة بالعربي المصري.

رجّع JSON بس.
`.trim();
}
