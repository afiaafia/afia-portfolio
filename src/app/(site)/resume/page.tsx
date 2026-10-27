import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume | Afia A.",
  description:
    "View or download Afia A.'s resume, including education, technical skills, projects, and experience.",
};

export default function ResumePage() {
  return (
    <main className="min-h-screen px-4 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-violet-400">
              Resume / CV
            </p>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              A closer look at my work.
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              My education, technical skills, projects, and development
              experience in one place.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="/resume.pdf"
              download="Afia-Mubassira-Resume.pdf"
              className="inline-flex items-center justify-center rounded-full bg-violet-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-600"
            >
              Download Resume
              <span className="ml-2" aria-hidden="true">
                ↓
              </span>
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-medium transition hover:border-violet-400 hover:text-violet-400"
            >
              Open PDF ↗
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <p className="text-sm font-medium">Afia-Mubassira-Resume.pdf</p>
            <span className="text-xs text-muted-foreground">PDF Preview</span>
          </div>

          <iframe
            src="/resume.pdf"
            title="Afia Mubassira's Resume"
            className="h-[70vh] min-h-[500px] w-full bg-white sm:h-[85vh]"
          />
        </div>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Prefer a copy? Use the Download Resume button above.
        </p>
      </div>
    </main>
  );
}
