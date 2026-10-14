import type { MascotAction, MascotPoint } from "./mascot-types"
import type { MascotMood } from "./mascot-types"

export type MascotBehavior = {
  mood: MascotMood
  action: MascotAction | null
  message: string | null
  duration: number
}

export type MascotBehaviorContext = {
  pathname?: string
  scene?: string | null
  pointer?: MascotPoint | null
  idleSeconds?: number
}

const ROUTE_GREETINGS: Record<string, string> = {
  "/": "Hey! Welcome to my corner of the web.",
  "/about": "A little more about me!",
  "/work": "Let's look at what I've been building.",
  "/projects": "Curious about my projects?",
  "/stack": "My tools of the trade.",
  "/build-log": "Notes from the debugging trenches.",
  "/contact": "Want to get in touch?",
  "/resume": "Here's my experience so far.",
  "/github": "Let's explore the code.",
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
}

export function getActionBehavior(
  action: MascotAction,
): MascotBehavior {
  return { ...ACTION_BEHAVIORS[action] }
}

export function getRouteGreeting(
  pathname: string,
): string {
  return ROUTE_GREETINGS[pathname] ??
    `Exploring ${pathname.replaceAll("/", "").replaceAll("-", " ")}?`
}

export function getSceneGreeting(
  scene: string | null | undefined,
): string | null {
  if (!scene) return null

  const normalized = scene.toLowerCase()

  if (normalized.includes("about")) {
    return "A little more about me!"
  }

  if (
    normalized.includes("work") ||
    normalized.includes("project")
  ) {
    return "Look what I've been building!"
  }

  if (normalized.includes("contact")) {
    return "Let's connect!"
  }

  if (
    normalized.includes("stack") ||
    normalized.includes("tech")
  ) {
    return "Tools make the magic happen."
  }

  if (
    normalized.includes("build") ||
    normalized.includes("log")
  ) {
    return "Every bug teaches something."
  }

  return null
}

export function getIdleBehavior(
  idleSeconds: number,
): MascotBehavior | null {
  if (idleSeconds >= 90) {
    return {
      mood: "sleeping",
      action: "sleep",
      message: "Zzz...",
      duration: 0,
    }
  }

  if (idleSeconds >= 45) {
    return {
      mood: "shy",
      action: null,
      message: null,
      duration: 0,
    }
  }

  if (idleSeconds >= 20) {
    return {
      mood: "curious",
      action: null,
      message: null,
      duration: 0,
    }
  }

  return null
}

export function getPointerBehavior(
  distance: number,
): MascotBehavior | null {
  if (distance < 55) {
    return {
      mood: "excited",
      action: null,
      message: null,
      duration: 250,
    }
  }

  if (distance < 120) {
    return {
      mood: "curious",
      action: null,
      message: null,
      duration: 250,
    }
  }

  return null
}

export function getGreetingCooldown(
  lastGreetingAt: number,
  now: number,
  cooldown = 8000,
): boolean {
  return now - lastGreetingAt >= cooldown
}

export function getRandomIdleAction(): MascotAction {
  const actions: MascotAction[] = [
    "wave",
    "jump",
    "spin",
    "play",
  ]

  return actions[Math.floor(Math.random() * actions.length)]
}
