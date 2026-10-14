import type { MascotMood, MascotPoint } from "./mascot-types"

export type MascotExpressionState = {
  mood: MascotMood
  blink: boolean
  eyeOffset: MascotPoint
  lastInteraction: number
  sleeping: boolean
}

export type ExpressionEvent =
  | "pointer-near"
  | "pointer-away"
  | "pointer-click"
  | "drag-start"
  | "drag-end"
  | "jump"
  | "idle"
  | "sleep"
  | "wake"
  | "greet"

export function createExpressionState(
  now = Date.now(),
): MascotExpressionState {
  return {
    mood: "idle",
    blink: false,
    eyeOffset: { x: 0, y: 0 },
    lastInteraction: now,
    sleeping: false,
  }
}

export function updateExpression(
  state: MascotExpressionState,
  event: ExpressionEvent,
  now = Date.now(),
): MascotExpressionState {
  const next: MascotExpressionState = {
    ...state,
    lastInteraction: now,
  }

  switch (event) {
    case "pointer-near":
      next.mood = state.sleeping ? "sleeping" : "curious"
      break

    case "pointer-away":
      next.mood = state.sleeping ? "sleeping" : "idle"
      break

    case "pointer-click":
      next.mood = "surprised"
      next.sleeping = false
      break

    case "drag-start":
      next.mood = "excited"
      next.sleeping = false
      break

    case "drag-end":
      next.mood = "happy"
      break

    case "jump":
      next.mood = "excited"
      next.sleeping = false
      break

    case "idle":
      next.mood = state.sleeping ? "sleeping" : "idle"
      break

    case "sleep":
      next.mood = "sleeping"
      next.sleeping = true
      next.blink = false
      next.eyeOffset = { x: 0, y: 0 }
      break

    case "wake":
      next.mood = "curious"
      next.sleeping = false
      next.blink = false
      break

    case "greet":
      next.mood = "happy"
      next.sleeping = false
      break
  }

  return next
}

export function updateEyeDirection(
  cursor: MascotPoint,
  eyeCenter: MascotPoint,
  maxOffset = 5,
): MascotPoint {
  const dx = cursor.x - eyeCenter.x
  const dy = cursor.y - eyeCenter.y
  const distance = Math.hypot(dx, dy)

  if (distance < 0.001) {
    return { x: 0, y: 0 }
  }

  const amount = Math.min(maxOffset, distance / 35)

  return {
    x: (dx / distance) * amount,
    y: (dy / distance) * amount,
  }
}

export function shouldFallAsleep(
  state: MascotExpressionState,
  now = Date.now(),
  idleDelayMs = 45_000,
): boolean {
  if (state.sleeping) return false

  return now - state.lastInteraction >= idleDelayMs
}

export function getBlinkDuration(
  mood: MascotMood,
): number {
  switch (mood) {
    case "excited":
      return 100
    case "sleeping":
      return 0
    case "surprised":
      return 180
    default:
      return 140
  }
}

export function getMoodScale(
  mood: MascotMood,
): { x: number; y: number } {
  switch (mood) {
    case "excited":
      return { x: 1.06, y: 1.08 }
    case "surprised":
      return { x: 0.96, y: 1.06 }
    case "shy":
      return { x: 0.98, y: 0.98 }
    case "sleeping":
      return { x: 1.02, y: 0.94 }
    default:
      return { x: 1, y: 1 }
  }
}
