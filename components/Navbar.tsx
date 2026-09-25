import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight text-foreground"
        >
          بؤرة
        </Link>

        <div className="flex items-center gap-6">
          <a
            href="#how-it-works"
            className="hidden text-sm font-medium text-muted transition-colors hover:text-foreground sm:inline-block"
          >
            طريقة العمل
          </a>
          <Link
            href="/my-learning"
            className="hidden text-sm font-medium text-muted transition-colors hover:text-foreground sm:inline-block"
          >
            تعلمي
          </Link>
          <Link
            href="/teacher"
            className="hidden text-sm font-medium text-muted transition-colors hover:text-foreground sm:inline-block"
          >
            للمعلم
          </Link>
          <Link
            href="/lesson"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground shadow-soft transition-transform duration-200 hover:scale-[1.03] hover:shadow-card active:scale-[0.98]"
          >
            ابدأ الآن
          </Link>
        </div>
      </nav>
    </header>
  );
}
