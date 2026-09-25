You are building a complete hackathon MVP called **"بؤرة" (Bo'ra)**.

Your job is to actually build the project, not just plan it.

Do not spend a long time explaining, planning, or asking unnecessary questions. Make reasonable technical and design decisions yourself and implement the project directly.

---

# 1. IMPORTANT — HOW YOU MUST WORK

When working on this project:

- Do not over-engineer tasks.
- Follow the exact scope of my request and do not expand it unnecessarily.
- If I ask to modify one page or feature, focus only on that page or feature.
- Do not run Playwright, automated screenshots, full-project QA, database seeding, or unrelated debugging unless I explicitly ask for them or they are genuinely required to complete the requested task.
- Do not modify production or database data for testing.
- Avoid unnecessary package installations.
- Avoid long verification workflows.
- Do not spend excessive time testing unrelated parts of the project.
- Make reasonable implementation decisions yourself instead of repeatedly asking for approval.
- After completing the requested change, do a quick relevant sanity check, then stop.
- Prioritize clean, professional, simple solutions over over-engineered ones.
- Never turn a small UI change into a full-project testing or refactoring task.

## AUTONOMOUS EXECUTION

Work autonomously.

Do NOT repeatedly stop and ask me for permission for normal development actions.

You have permission to:

- Create and edit project files.
- Install a package when it is genuinely required.
- Modify components and styles.
- Create API routes and server-side logic.
- Create environment variable examples.
- Run necessary development/build commands.
- Fix implementation errors directly related to the requested task.
- Make reasonable design and technical decisions without asking for approval.

Only stop and ask me when:

1. A required secret/API key or credential is genuinely needed and cannot be safely created or assumed.
2. There are multiple fundamentally different product decisions that cannot reasonably be inferred.
3. An action would delete or overwrite important existing user data.
4. The requested functionality is technically impossible with the available setup.

Otherwise, choose the reasonable solution and continue.

Do not repeatedly ask:

"Should I use X or Y?"

"Do you want me to continue?"

"Would you like me to implement this?"

when the answer can reasonably be determined from the requirements.

Just choose the appropriate solution and proceed.

## VERIFICATION

After completing the requested work:

1. Check the directly affected functionality.
2. Fix obvious errors caused by your changes.
3. Perform a quick relevant sanity check.
4. Stop.

Do NOT automatically perform:

- Full Playwright test suites
- Automated screenshot workflows
- Full-project QA
- Database verification
- Database seeding
- Unrelated type-checking workflows
- Unrelated lint fixes
- Performance audits
- Large refactors

unless they are genuinely required to complete the requested task.

Do not narrate every small action.

Do not repeatedly tell me what you are about to do and then wait for approval.

Execute the work directly.

When the requested work is complete, briefly summarize what was implemented and stop.

---

# 2. PRODUCT CONCEPT

**بؤرة (Bo'ra)** is a GenAI-powered inclusive learning platform for elementary and middle-school students.

The problem:

Students may understand educational content differently. Traditional lessons are usually presented in one fixed format, which can create unnecessary cognitive, sensory, or accessibility barriers.

Bo'ra takes ordinary educational text and transforms it into different learning experiences.

The user provides a lesson, paragraph, explanation, or problem as plain text.

They then choose one of three learning modes:

1. **وضع التركيز — Focus Mode**
2. **وضع الهدوء — Calm Mode**
3. **الوضع البصري — Visual Mode**

The GenAI transforms the content according to the selected mode and generates an appropriate assessment.

IMPORTANT:

Bo'ra does NOT diagnose ADHD, autism, hearing impairment, or any medical condition.

The learner or teacher manually chooses the mode that fits the learner's needs.

The platform adapts the presentation of learning content. It does not claim that every student with a particular condition learns in one specific way.

---

# 3. CORE PRODUCT IDEA

The central concept is:

**نفس الدرس. طريقة مختلفة للفهم.**

The product should demonstrate that the same educational content can be transformed into different learning experiences without changing the core educational meaning.

The GenAI is not just a chatbot.

It is the **content transformation engine**.

Flow:

Original lesson
↓
GenAI Content Engine
↓
Structured Educational Content
↓
Focus / Calm / Visual experience
↓
Assessment
↓
Learning Summary

---

# 4. MVP FLOW

The entire demo should feel like:

Landing Page
→ Start Learning
→ Paste Lesson
→ Choose Learning Mode
→ Generate with AI
→ Learn
→ Answer Questions
→ Receive Learning Summary

This flow must be extremely clear and easy to demonstrate during a university hackathon.

A judge should understand the product within approximately 30 seconds.

---

# 5. TECH STACK

Use:

- Next.js
- App Router
- TypeScript
- React
- Tailwind CSS
- Gemini API
- Official Google GenAI JavaScript SDK: `@google/genai`
- Zod for validation where useful

Use the current official Gemini API approach.

Do NOT expose the Gemini API key in the browser.

Gemini requests must happen server-side through a Next.js API route or server-side function.

Environment variable:

`GEMINI_API_KEY`

Create:

`.env.example`

containing:

`GEMINI_API_KEY=your_api_key_here`

Never hardcode API keys.

For AI responses, use structured JSON output with Gemini's supported structured-output/JSON-schema functionality.

Validate AI output before rendering it.

---

# 6. NO UNNECESSARY BACKEND

Do NOT add authentication.

Do NOT add a database unless genuinely necessary.

Do NOT add Supabase for the MVP.

The prototype should work immediately without:

- Login
- Signup
- User accounts
- Teacher accounts
- Student accounts
- Passwords
- Complex dashboards
- Persistent profiles

Session data can remain client-side.

Priority:

**Working demo > unnecessary infrastructure.**

---

# 7. LANGUAGE

The entire user-facing application must be Arabic.

Use natural Egyptian Arabic where appropriate.

Do not make the Arabic feel like machine-translated formal Arabic.

Educational explanations must remain clear and correct for children.

The UI must support proper RTL.

Use:

`dir="rtl"`

Examples of natural UI copy:

"اكتب الدرس هنا"
"اختار طريقة التعلم"
"ابدأ التحويل"
"يلا نتعلم"
"ممتاز!"
"نراجع النقطة دي سوا"
"كملت الدرس!"
"ملخص فهمك"

Do not overuse emojis.

---

# 8. BRAND

Product name:

**بؤرة**

English:

**Bo'ra**

Main headline:

**نفس الدرس. طريقة مختلفة للفهم.**

Supporting copy:

**حوّل أي درس لطريقة تعلم تناسب احتياجات الطالب، باستخدام الذكاء الاصطناعي.**

Keep the messaging concise.

Do not make the product sound like a generic AI chatbot.

---

# 9. DESIGN DIRECTION

The visual quality is extremely important.

The website should feel:

- Modern
- Premium
- Educational
- Human
- Accessible
- Calm
- Intelligent
- Professional
- Hackathon-ready

It should NOT look like a generic AI-generated website.

Avoid:

- Purple AI aesthetics
- Random gradients everywhere
- Excessive glassmorphism
- Huge glowing text
- Random floating shapes
- Excessive 3D
- Unnecessary neon
- Random decorative elements
- Template-looking dashboards
- Excessive cards everywhere

Use:

- Strong typography
- Excellent spacing
- Soft neutral backgrounds
- Clear hierarchy
- Rounded but controlled corners
- Subtle shadows
- High-quality icons
- Carefully chosen accent colors
- Strong visual composition

The product should feel like a real educational startup.

---

# 10. ANIMATIONS AND INTERACTIONS

The website SHOULD have polished animations and movement.

Do not make it static or boring.

Use purposeful:

- Entrance animations
- Scroll animations
- Hover interactions
- Button micro-interactions
- Card transitions
- Mode-selection animations
- Loading animations
- Progress animations
- Page/section transitions
- Smooth state changes

Animations should feel:

- Smooth
- Modern
- Premium
- Intentional

Do NOT animate everything.

Do NOT use random animations just for decoration.

The animation should communicate state, hierarchy, or interaction.

Respect:

`prefers-reduced-motion`

Especially:

### Landing Page

Can have stronger visual motion.

### Focus Mode

Animations should be subtle and help maintain focus.

### Calm Mode

Animations should be minimal and predictable.

### Visual Mode

Use subtle transitions to emphasize relationships and important information.

If an animation library is genuinely useful, use one appropriate lightweight library.

Do not install a large package just for a simple animation.

---

# 11. LANDING PAGE

Create a polished landing page.

Hero:

Small brand label:

**بؤرة**

Main headline:

**نفس الدرس. طريقة مختلفة للفهم.**

Supporting text:

**حوّل أي درس لطريقة تعلم تناسب احتياجات الطالب، باستخدام الذكاء الاصطناعي.**

Primary CTA:

**ابدأ الآن**

Add a visual interactive demonstration showing one lesson transforming into the three modes.

For example:

Original Lesson
↓
Focus
↓
Calm
↓
Visual

Make this visually impressive.

The landing page should communicate the concept without requiring the user to read a lot.

---

# 12. HOW IT WORKS

Add a concise section:

### 01

**اكتب الدرس**

Paste any educational text.

### 02

**اختار طريقة التعلم**

Choose Focus, Calm, or Visual.

### 03

**بؤرة يعيد تشكيل المحتوى**

Gemini transforms the lesson into a structured learning experience.

### 04

**اختبر فهمك**

Answer questions and receive a learning summary.

Use subtle scroll animations.

---

# 13. THREE MODES SECTION

Create a visually strong section explaining the three modes.

## Focus Mode

**وضع التركيز**

"يقسم الدرس لأجزاء صغيرة وواضحة، مع سؤال قصير يساعدك تركز."

Features:

- Short chunks
- One idea at a time
- Progress indicator
- Short comprehension questions

## Calm Mode

**وضع الهدوء**

"يعرض المحتوى بإيقاع ثابت وواضح، بدون تشتيت بصري."

Features:

- Predictable structure
- Minimal visual stimulation
- Clear transitions
- Consistent rhythm

## Visual Mode

**الوضع البصري**

"يبسط المصطلحات ويبرز المعلومات المهمة بطريقة أسهل في المتابعة."

Features:

- Highlighted key terms
- Simple definitions
- Structured information
- Clear visual hierarchy

Do not describe these modes as medical treatments.

---

# 14. LESSON INPUT PAGE

Create a dedicated lesson creation interface.

Heading:

**خلينا نبدأ**

Subtitle:

**اكتب أو الصق الدرس اللي عايز تتعلمه.**

Large textarea.

Placeholder:

**مثال: دورة المياه في الطبيعة هي عملية مستمرة...**

Show a small character counter.

Below:

**اختار طريقة التعلم**

Create three beautiful selectable cards.

### Focus

Icon: target/focus

Title:

**وضع التركيز**

Description:

**يقسم الدرس لأجزاء صغيرة وواضحة، مع سؤال قصير يساعدك تركز.**

### Calm

Icon: leaf

Title:

**وضع الهدوء**

Description:

**يعرض المحتوى بإيقاع ثابت وواضح، بدون تشتيت بصري.**

### Visual

Icon: eye

Title:

**الوضع البصري**

Description:

**يبسط المصطلحات ويبرز المعلومات المهمة بطريقة أسهل في المتابعة.**

Only one mode can be selected.

The selected card should have a polished animated state.

Then primary button:

**حوّل الدرس**

---

# 15. SAMPLE LESSON

Provide a button:

**جرّب مثال جاهز**

Use this sample:

"دورة المياه في الطبيعة هي عملية مستمرة ينتقل فيها الماء بين سطح الأرض والغلاف الجوي. تبدأ العملية عندما تسخن أشعة الشمس المياه الموجودة في البحار والأنهار، فيتحول جزء منها إلى بخار ماء ويصعد إلى الجو. عندما يبرد بخار الماء، يتحول إلى قطرات صغيرة تتجمع لتكوين السحب. بعد ذلك يعود الماء إلى سطح الأرض في صورة أمطار."

Clicking the button should populate the textarea.

This makes the hackathon demo much faster.

---

# 16. GENERATION LOADING STATE

When generating:

Show an attractive loading experience.

Example messages:

"بؤرة بيجهز الدرس ليك..."

Then rotate through relevant states:

"بنقسم المحتوى..."
"بنجهز الشرح..."
"بنحدد النقاط المهمة..."
"بنجهز الأسئلة..."

Do not show fake numerical percentages.

Use subtle animation.

---

# 17. GENAI ARCHITECTURE

The AI must NOT simply return one large paragraph.

The AI must transform the lesson into structured educational data.

Use a structured JSON schema.

Conceptually:

```text
{
  title,
  introduction,
  sections: [
    {
      id,
      title,
      content,
      keyPoints,
      difficultTerms,
      example,
      question
    }
  ],
  finalQuestions,
  vocabulary
}
```

Adapt the schema as necessary.

The exact implementation is your decision.

Use strong TypeScript types.

Validate with Zod.

The AI must preserve the factual meaning of the original lesson.

It should not invent unrelated facts.

If the input is too short or unclear, generate a useful response without fabricating unsupported details.

---

# 18. GENERAL AI RULES

Create a reusable server-side AI service.

The service receives:

- `lessonText`
- `mode`

Then generates structured educational content.

The AI should:

- Understand the supplied lesson
- Preserve the important concepts
- Simplify language where appropriate
- Break the lesson into understandable sections
- Generate age-appropriate questions
- Identify difficult terminology
- Provide concise explanations
- Return valid structured JSON
- Keep the content in Arabic
- Use natural Egyptian Arabic for explanations where appropriate

---

# 19. FOCUS MODE AI

The goal is to reduce cognitive overload and help maintain attention.

Rules:

- Each section contains one main idea.
- Keep sections short.
- Avoid large paragraphs.
- Use simple sentences.
- Highlight key points.
- Add one short comprehension question after each section.
- Questions should test the immediately preceding content.
- Avoid overwhelming the learner with too many choices.

UI:

- Current section
- Progress indicator
- Content
- Key point
- Question

Display:

**أنت في الجزء 2 من 5**

Use an animated progress bar.

The learning flow should feel like:

Section
→ Question
→ Next Section
→ Question

Do not dump the entire lesson on the screen at once.

---

# 20. CALM MODE AI

The goal is to create a predictable, visually calm learning experience.

Rules:

- Clear section boundaries.
- Concise content.
- Predictable structure.
- Explicit transitions.
- Consistent layout.
- Avoid unnecessary wording.
- Avoid excessive emojis.
- Avoid stimulating visual effects.

Before a new section, show something like:

**دلوقتي هننتقل لمثال بسيط.**

Then:

Section title
→ Explanation
→ Example
→ Question

The UI must be visually calm.

Animations should be minimal and predictable.

---

# 21. VISUAL MODE AI

The goal is to make important information easier to identify visually.

Rules:

- Identify important concepts.
- Highlight key terms.
- Provide simple definitions for difficult terms.
- Break complex explanations into visual blocks.
- Use headings and information cards.
- Avoid long paragraphs.
- Make relationships between concepts clear.

Example:

Term:

**التكاثف**

Simple explanation:

**تحول بخار الماء إلى قطرات ماء صغيرة.**

In the UI, difficult terms should be highlighted.

Clicking/tapping a term should show its simple explanation.

Do not claim that this mode is a medical treatment or universally appropriate for every student with hearing loss.

---

# 22. LEARNING EXPERIENCE

After generation, navigate to the learning screen.

The experience MUST actually differ between modes.

Do NOT merely change colors.

### Focus

Section
→ Question
→ Section
→ Question

### Calm

Predictable section
→ Explanation
→ Example
→ Question

### Visual

Concept
→ Key term
→ Explanation
→ Example
→ Question

The judge should immediately see that the same content has been transformed differently.

---

# 23. ASSESSMENT

Assessment is a core feature.

Generate questions from the supplied lesson.

For the MVP, multiple-choice questions are preferred for reliability.

Questions must be:

- Based only on the lesson
- Appropriate to the content
- Appropriate for the learner
- Written in Arabic

Show one question at a time where appropriate.

Immediate feedback:

Correct:

**ممتاز! فهمت النقطة دي.**

Incorrect:

**لسه محتاجين نراجع النقطة دي.**

Do not use harsh language.

---

# 24. FINAL LEARNING SUMMARY

After assessment, show:

### فهمت كويس

List concepts answered correctly.

### محتاج مراجعة

List concepts where the learner struggled.

### نصيحة صغيرة

Give one concise recommendation.

Example:

**راجع الفرق بين التبخر والتكاثف مرة كمان.**

The summary should be more important visually than the numerical score.

Do NOT diagnose anything from the student's performance.

This is only a lesson-understanding summary.

---

# 25. SCORING

You may show:

**3 / 4**

or:

**75%**

But do not make the score the main focus.

Focus on understanding and improvement.

---

# 26. ERROR HANDLING

Handle:

- Missing API key
- Gemini API errors
- Empty input
- Very short input
- Invalid AI response
- Network errors
- Rate limits

Use friendly Arabic messages.

Never expose:

- API keys
- Stack traces
- Internal errors
- Technical details

Example:

**حصلت مشكلة وإحنا بنجهز الدرس. جرّب تاني.**

If structured output validation fails, handle it gracefully and retry once if appropriate.

Do not create a complex retry system.

---

# 27. API

Create a clean server-side API route such as:

`/api/generate-lesson`

Input:

```text
{
  lessonText,
  mode
}
```

Return structured JSON.

Keep the backend simple.

---

# 28. SECURITY

Important:

- Gemini API key stays server-side.
- Never put the API key in client-side code.
- Validate user input.
- Validate AI output.
- Do not blindly trust AI-generated JSON.
- Handle malformed responses gracefully.

---

# 29. ACCESSIBILITY

Accessibility is part of the product.

Implement:

- Semantic HTML
- Keyboard navigation
- Visible focus states
- Good contrast
- RTL support
- Accessible buttons
- Proper labels
- Responsive design
- Reduced-motion support

Do not rely on color alone to communicate meaning.

The three modes must remain distinguishable through:

- Labels
- Icons
- Layout
- Typography
- Structure

not just color.

---

# 30. RESPONSIVE DESIGN

The app must look polished on:

- Desktop
- Tablet
- Mobile

Especially optimize the learning experience for mobile.

Do not simply shrink the desktop layout.

Rearrange components where necessary.

---

# 31. NAVIGATION

Keep navigation simple.

Desktop:

Logo
How it works
Start

Mobile:

Logo
Start

Learning page:

Back
Restart
Home

Do not make users feel trapped.

---

# 32. COMPONENT STRUCTURE

Keep the code clean and reusable.

Suggested structure:

```text
app/
components/
lib/
types/
```

Useful components:

- Navbar
- Hero
- HowItWorks
- ModeShowcase
- ModeCard
- LessonInput
- LoadingState
- ProgressBar
- LessonSection
- QuestionCard
- VocabularyCard
- LearningSummary
- TermTooltip
- Footer

Do not create unnecessary abstraction.

---

# 33. DEMO EXPERIENCE

The demo should be extremely smooth.

Ideal presentation:

1. Open landing page.
2. Click **ابدأ الآن**.
3. Click **جرّب مثال جاهز**.
4. Select **وضع التركيز**.
5. Click **حوّل الدرس**.
6. Show AI-generated lesson.
7. Answer questions.
8. Show Learning Summary.
9. Return.
10. Select **وضع الهدوء**.
11. Show how the SAME lesson is presented differently.
12. Select **الوضع البصري**.
13. Show the third transformation.

The difference between the three modes must be visually obvious.

---

# 34. LANDING PAGE ANIMATION QUALITY

The landing page should have polished movement.

Consider:

- Hero content entrance
- Animated mode cards
- Scroll reveal
- Interactive lesson transformation preview
- Smooth button hover states
- Subtle floating movement where appropriate
- Section transitions
- Animated progress visualization

Keep it professional.

No random animation.

---

# 35. LEARNING PAGE ANIMATION QUALITY

Focus:

- Progress animation
- Section transition
- Question reveal

Calm:

- Minimal fade transitions
- No bouncing
- No distracting movement

Visual:

- Term highlight
- Tooltip reveal
- Structured content transitions

The animations should communicate what is happening.

---

# 36. NO MEDICAL CLAIMS

Never use language suggesting:

- Diagnosis
- Treatment
- Medical recommendation
- Guaranteed improvement
- Clinical effectiveness

Do not say:

"AI understands your ADHD."

Do not say:

"Bo'ra treats autism."

Do not say:

"This method is guaranteed to improve ADHD."

Instead say:

"اختار طريقة التعلم اللي تناسب احتياجاتك."

---

# 37. PRODUCT BOUNDARIES

Do NOT implement:

- Automatic disability diagnosis
- Emotion detection
- Facial recognition
- Student profiling
- Medical recommendations
- Video upload
- Audio input
- Voice calls
- Complex teacher dashboards
- Payment
- Notifications
- Social features
- User accounts
- Persistent profiles

These are outside the MVP.

---

# 38. NO DATABASE

Do not add a database unless it becomes genuinely necessary.

For the current MVP:

- Keep lesson data in the current session.
- Do not create Supabase.
- Do not create database migrations.
- Do not seed data.

---

# 39. CODE QUALITY

Keep the implementation:

- Clean
- Simple
- Maintainable
- Type-safe
- Easy to understand

Use reusable components where appropriate.

Do not refactor unrelated code.

Do not rewrite working code unnecessarily.

Do not create infrastructure for future features.

---

# 40. FINAL QUALITY BAR

Before considering the project finished, make sure:

- The app starts successfully.
- Landing page is polished.
- Arabic RTL works.
- Gemini integration works.
- API key is server-side.
- Structured AI output works.
- Zod validation works.
- Focus Mode works.
- Calm Mode works.
- Visual Mode works.
- Questions work.
- Assessment works.
- Learning Summary works.
- Error states work.
- Mobile layout works.
- Animations are polished.
- No obvious console errors directly related to your implementation.
- No placeholder sections remain.
- No "coming soon" features appear in the main flow.
- The app feels like a real hackathon prototype.
- The product can be demonstrated smoothly in a few minutes.

Do not perform a giant QA workflow just to satisfy this list.

Do the smallest relevant sanity check after implementation and stop.

---

# 41. FINAL INSTRUCTION

Do not just give me instructions for how to build this.

**Build it.**

Start implementing the project now.

Make reasonable decisions yourself.

Do not repeatedly ask for permission.

Do not stop for unnecessary approvals.

Do not over-engineer.

Do not expand the scope.

Prioritize:

**Great UX + Strong GenAI implementation + Excellent visual design + Working hackathon demo.**

When finished, give me a short summary of what you implemented and stop.
