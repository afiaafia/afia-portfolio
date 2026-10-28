"use client";

import { useEffect, useState } from "react";

const phrases = [
  "full-stack apps with Next.js & React.",
  "scalable backends with Node.js & MongoDB.",
  "responsive interfaces with TypeScript & Tailwind CSS.",
  "secure apps with authentication and APIs.",
];

export function RotatingTechLine() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[phraseIndex];
    let delay = deleting ? 28 : 48;

    if (!deleting && text === phrase) {
      delay = 1500;
    } else if (deleting && text === "") {
      delay = 350;
    }

    const timer = setTimeout(() => {
      if (!deleting && text === phrase) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setPhraseIndex((current) => (current + 1) % phrases.length);
      } else if (deleting) {
        setText(phrase.slice(0, text.length - 1));
      } else {
        setText(phrase.slice(0, text.length + 1));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, phraseIndex]);

  return (
    <p
      aria-label={`I build ${phrases[phraseIndex]}`}
      className="mt-4 min-h-[3.5rem] max-w-2xl text-base font-medium leading-relaxed text-violet-300 sm:text-xl"
    >
      <span className="mr-2 text-white">I build</span><span aria-hidden="true">{text}</span>
      <span
        aria-hidden="true"
        className="ml-0.5 inline-block h-[1em] w-px translate-y-0.5 animate-pulse bg-violet-400"
      />
    </p>
  );
}
