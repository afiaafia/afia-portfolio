import type { MascotAction, MascotPoint } from "./mascot-types";
import type { MascotMood } from "./mascot-types";

export type MascotBehavior = {
  mood: MascotMood;
  action: MascotAction | null;
  message: string | null;
  duration: number;
};

export type MascotBehaviorContext = {
  pathname?: string;
  scene?: string | null;
  pointer?: MascotPoint | null;
  idleSeconds?: number;
};

const ROUTE_GREETINGS: Record<string, string[]> = {
  "/": [
    "Meow! Welcome to Afia's little corner of the web! Want a tiny tour?",
    "Psst! Wanna see what Afia has been building?",
  ],
  "/about": [
    "Curious about my human? Let's learn a little about Afia!",
    "Want to meet Afia? Her story is just around the corner!",
  ],
  "/work": [
    "Ooh, look at these things she's been building!",
    "Ready to see Afia's work? Follow my paws!",
  ],
  "/projects": [
    "Ooh, shiny projects! Let's take a peek!",
    "Look at all these things Afia has been making!",
  ],
  "/stack": [
    "Want to see the tools behind the magic? Follow me!",
    "Curious what Afia builds with? Let's peek at her toolkit!",
  ],
  "/build-log": [
    "Psst, the build log has tiny bugs and big lessons!",
    "Want a peek behind the code? Afia left notes in here!",
  ],
  "/contact": [
    "Like what you see? Let's help you get in touch with Afia!",
    "Have a question for Afia? I know just where to go!",
  ],
  "/resume": [
    "Want the quick professional tour? Afia's resume is right here!",
    "Curious about Afia's experience? Let's have a look!",
  ],
  "/github": [
    "Psst! The code lives over here. Fancy a peek?",
    "Want to see how the projects work? Let's visit GitHub!",
  ],
};

function chooseDialogue(lines: string[], previousLine?: string): string {
  const alternatives = lines.filter((line) => line !== previousLine);
  const choices = alternatives.length > 0 ? alternatives : lines;
  return choices[Math.floor(Math.random() * choices.length)];
}

function getRouteKey(pathname: string): string {
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  return firstSegment ? `/${firstSegment}` : "/";
}

const ACTION_BEHAVIORS: Record<MascotAction, MascotBehavior> = {
  wave: {
    mood: "happy",
    action: "wave",
    message: "Hi there!",
    duration: 1500,
  },
  jump: {
    mood: "excited",
    action: "jump",
    message: "Wheee!",
    duration: 1100,
  },
  spin: {
    mood: "excited",
    action: "spin",
    message: "Around we go!",
    duration: 1200,
  },
  sleep: {
    mood: "sleeping",
    action: "sleep",
    message: "Zzz...",
    duration: 0,
  },
  wake: {
    mood: "curious",
    action: "wake",
    message: "I'm awake!",
    duration: 1400,
  },
  greet: {
    mood: "happy",
    action: "greet",
    message: "Hello!",
    duration: 1600,
  },
  play: {
    mood: "curious",
    action: "play",
    message: "Play with me?",
    duration: 1800,
  },
};

export function getActionBehavior(action: MascotAction): MascotBehavior {
  return { ...ACTION_BEHAVIORS[action] };
}

export function getRouteGreeting(
  pathname: string,
  previousLine?: string,
): string {
  const route = getRouteKey(pathname);
  const lines = ROUTE_GREETINGS[route] ?? [
    `Exploring ${pathname.replaceAll("/", "").replaceAll("-", " ")}?`,
  ];

  return chooseDialogue(lines, previousLine);
}

export function getSceneGreeting(
  scene: string | null | undefined,
  previousLine?: string,
): string | null {
  if (!scene) return null;

  const normalized = scene.toLowerCase();
  let lines: string[] | null = null;

  if (normalized.includes("about")) {
    lines = ROUTE_GREETINGS["/about"];
  } else if (normalized.includes("work") || normalized.includes("project")) {
    lines = ROUTE_GREETINGS["/projects"];
  } else if (normalized.includes("contact")) {
    lines = ROUTE_GREETINGS["/contact"];
  } else if (normalized.includes("stack") || normalized.includes("tech")) {
    lines = ROUTE_GREETINGS["/stack"];
  } else if (normalized.includes("build") || normalized.includes("log")) {
    lines = ROUTE_GREETINGS["/build-log"];
  } else if (normalized.includes("resume")) {
    lines = ROUTE_GREETINGS["/resume"];
  } else if (normalized.includes("github")) {
    lines = ROUTE_GREETINGS["/github"];
  }

  return lines ? chooseDialogue(lines, previousLine) : null;
}

export function getClickDialogue(
  pathname: string,
  scene: string | null,
  previousLine?: string,
): string {
  return (
    getSceneGreeting(scene, previousLine) ??
    getRouteGreeting(pathname, previousLine)
  );
}

export function getIdleBehavior(idleSeconds: number): MascotBehavior | null {
  if (idleSeconds >= 90) {
    return {
      mood: "sleeping",
      action: "sleep",
      message: "Zzz...",
      duration: 0,
    };
  }

  if (idleSeconds >= 45) {
    return {
      mood: "shy",
      action: null,
      message: null,
      duration: 0,
    };
  }

  if (idleSeconds >= 20) {
    return {
      mood: "curious",
      action: null,
      message: null,
      duration: 0,
    };
  }

  return null;
}

export function getPointerBehavior(distance: number): MascotBehavior | null {
  if (distance < 55) {
    return {
      mood: "excited",
      action: null,
      message: null,
      duration: 250,
    };
  }

  if (distance < 120) {
    return {
      mood: "curious",
      action: null,
      message: null,
      duration: 250,
    };
  }

  return null;
}

export function getGreetingCooldown(
  lastGreetingAt: number,
  now: number,
  cooldown = 8000,
): boolean {
  return now - lastGreetingAt >= cooldown;
}

export function getRandomIdleAction(): MascotAction {
  const actions: MascotAction[] = ["wave", "jump", "spin", "play"];

  return actions[Math.floor(Math.random() * actions.length)];
}
