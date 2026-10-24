export type MascotAudioCallbacks = {
  onEnded: (durationMs: number) => void;
  onError: (message: string) => void;
};

const DIALOGUE_CLIPS: Record<string, string> = {
  "Meow! Welcome to Afia's little corner of the web! Want a tiny tour?":
    "/audio/kitty/home-welcome-1.mp3",
  "Psst! Wanna see what Afia has been building?":
    "/audio/kitty/home-welcome-2.mp3",
  "Curious about my human? Let's learn a little about Afia!":
    "/audio/kitty/about-1.mp3",
  "Want to meet Afia? Her story is just around the corner!":
    "/audio/kitty/about-2.mp3",
  "Ooh, look at these things she's been building!": "/audio/kitty/work-1.mp3",
  "Ready to see Afia's work? Follow my paws!": "/audio/kitty/work-2.mp3",
  "Ooh, shiny projects! Let's take a peek!": "/audio/kitty/projects-1.mp3",
  "Look at all these things Afia has been making!":
    "/audio/kitty/projects-2.mp3",
  "Want to see the tools behind the magic? Follow me!":
    "/audio/kitty/stack-1.mp3",
  "Curious what Afia builds with? Let's peek at her toolkit!":
    "/audio/kitty/stack-2.mp3",
  "Psst, the build log has tiny bugs and big lessons!":
    "/audio/kitty/build-log-1.mp3",
  "Want a peek behind the code? Afia left notes in here!":
    "/audio/kitty/build-log-2.mp3",
  "Like what you see? Let's help you get in touch with Afia!":
    "/audio/kitty/contact-1.mp3",
  "Have a question for Afia? I know just where to go!":
    "/audio/kitty/contact-2.mp3",
  "Want the quick professional tour? Afia's resume is right here!":
    "/audio/kitty/resume-1.mp3",
  "Curious about Afia's experience? Let's have a look!":
    "/audio/kitty/resume-2.mp3",
  "Psst! The code lives over here. Fancy a peek?": "/audio/kitty/github-1.mp3",
  "Want to see how the projects work? Let's visit GitHub!":
    "/audio/kitty/github-2.mp3",
  "Hi there!": "/audio/kitty/wave.mp3",
  "Wheee!": "/audio/kitty/jump.mp3",
  "Around we go!": "/audio/kitty/spin.mp3",
  "I'm awake!": "/audio/kitty/wake.mp3",
  "Play with me?": "/audio/kitty/play.mp3",
};

const audioDebugEnabled = process.env.NODE_ENV === "development";
let activeAudio: HTMLAudioElement | null = null;

function logAudio(message: string, details?: unknown): void {
  if (audioDebugEnabled) {
    console.info(`[mascot audio] ${message}`, details ?? "");
  }
}

export function getMascotAudioClip(text: string): string | null {
  return DIALOGUE_CLIPS[text] ?? null;
}

export function playMascotAudio(
  src: string,
  callbacks: MascotAudioCallbacks,
): boolean {
  if (typeof window === "undefined" || typeof Audio === "undefined") {
    callbacks.onError("Audio playback is unavailable in this environment.");
    return false;
  }

  cancelMascotAudio();

  const audio = new Audio(src);
  audio.preload = "none";
  activeAudio = audio;
  let settled = false;

  const fail = (message: string) => {
    if (settled || activeAudio !== audio) return;
    settled = true;
    activeAudio = null;
    logAudio("Clip playback failed.", { src, message });
    callbacks.onError(message);
  };

  audio.addEventListener("ended", () => {
    if (settled || activeAudio !== audio) return;
    settled = true;
    activeAudio = null;
    const durationMs = Number.isFinite(audio.duration)
      ? audio.duration * 1000
      : 0;
    logAudio("Clip ended.", { src, durationMs });
    callbacks.onEnded(durationMs);
  });

  audio.addEventListener("error", () => {
    fail(audio.error?.message ?? "The audio clip could not be loaded.");
  });

  try {
    const playback = audio.play();
    void playback.then(
      () => logAudio("Clip playback started.", { src }),
      (error: unknown) => {
        fail(error instanceof Error ? error.message : String(error));
      },
    );
    return true;
  } catch (error) {
    fail(error instanceof Error ? error.message : String(error));
    return false;
  }
}

export function cancelMascotAudio(): void {
  if (!activeAudio) return;

  const audio = activeAudio;
  activeAudio = null;
  audio.pause();
  audio.currentTime = 0;
  logAudio("Active clip canceled.");
}
