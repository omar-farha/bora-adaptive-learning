export default function Footer() {
  return (
    <footer className="border-t border-border bg-background-alt">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 py-10 text-center sm:px-8">
        <span className="text-lg font-extrabold text-foreground">بؤرة</span>
        <p className="max-w-md text-sm text-muted">
          حوّل أي درس لطريقة تعلم تناسب احتياجات الطالب، باستخدام الذكاء
          الاصطناعي.
        </p>
        <p className="mt-4 text-xs text-muted">
          مشروع هاكاثون تعليمي — بؤرة لا تشخّص أي حالة صحية أو تعليمية.
        </p>
      </div>
    </footer>
  );
}
