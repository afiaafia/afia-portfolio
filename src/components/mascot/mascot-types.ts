export type MascotMood =
  | "idle"
  | "curious"
  | "happy"
  | "excited"
  | "sleeping"
  | "surprised"
  | "shy"

export type MascotAction =
  | "wave"
  | "jump"
  | "spin"
  | "sleep"
  | "wake"
  | "greet"
  | "play"

export type MascotPoint = {
  x: number
  y: number
}

export type MascotVelocity = {
  x: number
  y: number
}

export type MascotMotionState = {
  position: MascotPoint
  velocity: MascotVelocity
  dragging: boolean
  grounded: boolean
  jumping: boolean
}

export type MascotScene = {
  id: string
  element: HTMLElement
  bounds: DOMRect
}

export type MascotEngineOptions = {
  reducedMotion: boolean
  enableCursorTracking: boolean
  enableDragging: boolean
  enableSceneAwareness: boolean
}

export const DEFAULT_MASCOT_OPTIONS: MascotEngineOptions = {
  reducedMotion: false,
  enableCursorTracking: true,
  enableDragging: true,
  enableSceneAwareness: true,
}
