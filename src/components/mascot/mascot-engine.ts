import {
  beginDrag,
  beginJump,
  endDrag,
  moveWhileDragging,
  stepPhysics,
  stopMotion,
} from "./mascot-physics"

import {
  createDragSession,
  getDraggedPosition,
} from "./mascot-interactions"

import type { DragSession } from "./mascot-interactions"

import {
  createExpressionState,
  shouldFallAsleep,
  updateExpression,
} from "./mascot-expressions"

import type {
  MascotExpressionState,
} from "./mascot-expressions"

import {
  discoverNamedSections,
  getActiveScene,
  getMascotPerch,
} from "./mascot-scenes"

import type {
  SceneTarget,
} from "./mascot-scenes"

import {
  DEFAULT_MASCOT_OPTIONS,
} from "./mascot-types"

import type {
  MascotEngineOptions,
  MascotMotionState,
  MascotPoint,
} from "./mascot-types"

import type {
  PhysicsBounds,
} from "./mascot-physics"

export type MascotEngineSnapshot = {
  motion: MascotMotionState
  expression: MascotExpressionState
  activeScene: string | null
  target: MascotPoint | null
}

export type MascotEngineCallbacks = {
  onUpdate?: (snapshot: MascotEngineSnapshot) => void
  onSceneChange?: (sceneId: string | null) => void
}

export type MascotEngine = {
  start: () => void
  stop: () => void
  jump: (strength?: number) => void
  beginPointerDrag: (
    pointerId: number,
    pointer: MascotPoint,
  ) => void
  movePointerDrag: (
    pointerId: number,
    pointer: MascotPoint,
  ) => void
  endPointerDrag: (pointerId: number) => void
  setMood: (mood: MascotExpressionState["mood"]) => void
  greet: () => void
  wake: () => void
  sleep: () => void
  getSnapshot: () => MascotEngineSnapshot
}

export function createMascotEngine(
  initialPosition: MascotPoint,
  callbacks: MascotEngineCallbacks = {},
  options: Partial<MascotEngineOptions> = {},
): MascotEngine {
  const config = {
    ...DEFAULT_MASCOT_OPTIONS,
    ...options,
  }

  let motion = {
    ...createInitialMotion(initialPosition),
  }

  let expression = createExpressionState()
  let drag: DragSession | null = null
  let activeScene: string | null = null
  let target: MascotPoint | null = null
  let scenes: ReturnType<typeof discoverNamedSections> = []
  let running = false
  let frame = 0
  let lastFrame = 0
  let lastSceneScan = 0
  let lastSleepCheck = Date.now()
  let sceneChangeCooldown = 0

  function getBounds(): PhysicsBounds {
    const width = window.innerWidth
    const height = window.innerHeight

    return {
      left: 8,
      top: 78,
      right: Math.max(8, width - 104),
      bottom: Math.max(78, height - 132),
    }
  }

  function getSnapshot(): MascotEngineSnapshot {
    return {
      motion: {
        ...motion,
        position: { ...motion.position },
        velocity: { ...motion.velocity },
      },
      expression: {
        ...expression,
        eyeOffset: { ...expression.eyeOffset },
      },
      activeScene,
      target: target ? { ...target } : null,
    }
  }

  function notify() {
    callbacks.onUpdate?.(getSnapshot())
  }

  function scanScene(now: number) {
    if (!config.enableSceneAwareness || now - lastSceneScan < 350) {
      return
    }

    lastSceneScan = now
    scenes = discoverNamedSections()
    const scene = getActiveScene(scenes)

    if (!scene || scene.id === activeScene) return

    activeScene = scene.id
    target = getMascotPerch(scene as SceneTarget)
    sceneChangeCooldown = now + 1200
    callbacks.onSceneChange?.(activeScene)
  }

  function updateSceneMovement(dt: number, now: number) {
    if (
      !target ||
      motion.dragging ||
      now < sceneChangeCooldown ||
      config.reducedMotion
    ) {
      return
    }

    const dx = target.x - motion.position.x
    const dy = target.y - motion.position.y
    const distance = Math.hypot(dx, dy)

    if (distance < 12) {
      motion = stopMotion(motion)
      target = null
      return
    }

    const speed = Math.min(210, distance * 1.6)
    const factor = Math.min(1, speed * dt / Math.max(distance, 1))

    motion = {
      ...motion,
      position: {
        x: motion.position.x + dx * factor,
        y: motion.position.y + dy * factor,
      },
      velocity: {
        x: dx * factor / Math.max(dt, 0.001),
        y: dy * factor / Math.max(dt, 0.001),
      },
      grounded: true,
      jumping: false,
    }
  }

  function tick(now: number) {
    if (!running) return

    const dt = lastFrame
      ? Math.min((now - lastFrame) / 1000, 1 / 30)
      : 0

    lastFrame = now

    scanScene(now)

    if (!config.reducedMotion) {
      if (motion.jumping || !motion.grounded || motion.dragging) {
        motion = stepPhysics(motion, dt, getBounds())
      } else if (!motion.dragging) {
        updateSceneMovement(dt, now)
      }
    }

    if (
      now - lastSleepCheck > 1000 &&
      shouldFallAsleep(expression)
    ) {
      expression = updateExpression(expression, "sleep")
      lastSleepCheck = now
    }

    notify()
    frame = window.requestAnimationFrame(tick)
  }

  function start() {
    if (running) return

    running = true
    lastFrame = 0
    frame = window.requestAnimationFrame(tick)
  }

  function stop() {
    running = false

    if (frame) {
      window.cancelAnimationFrame(frame)
      frame = 0
    }
  }

  function jump(strength = 1) {
    if (config.reducedMotion) return

    expression = updateExpression(expression, "jump")
    motion = beginJump(motion, strength)
    target = null
    notify()
  }

  function beginPointerDrag(
    pointerId: number,
    pointer: MascotPoint,
  ) {
    if (!config.enableDragging) return

    drag = createDragSession(
      pointerId,
      pointer,
      motion.position,
    )

    motion = beginDrag(motion)
    expression = updateExpression(expression, "drag-start")
    target = null
    notify()
  }

  function movePointerDrag(
    pointerId: number,
    pointer: MascotPoint,
  ) {
    if (!drag?.active || drag.pointerId !== pointerId) return

    const position = getDraggedPosition(
      drag,
      pointer,
      getBounds(),
    )

    motion = moveWhileDragging(motion, position, getBounds())
    notify()
  }

  function endPointerDrag(pointerId: number) {
    if (!drag?.active || drag.pointerId !== pointerId) return

    drag = null
    motion = endDrag(motion)
    expression = updateExpression(expression, "drag-end")
    notify()
  }

  function setMood(mood: MascotExpressionState["mood"]) {
    expression = {
      ...expression,
      mood,
      sleeping: mood === "sleeping",
      lastInteraction: Date.now(),
    }
    notify()
  }

  function greet() {
    expression = updateExpression(expression, "greet")
    notify()
  }

  function wake() {
    expression = updateExpression(expression, "wake")
    notify()
  }

  function sleep() {
    expression = updateExpression(expression, "sleep")
    motion = stopMotion(motion)
    notify()
  }

  return {
    start,
    stop,
    jump,
    beginPointerDrag,
    movePointerDrag,
    endPointerDrag,
    setMood,
    greet,
    wake,
    sleep,
    getSnapshot,
  }
}

function createInitialMotion(position: MascotPoint): MascotMotionState {
  return {
    position: { ...position },
    velocity: { x: 0, y: 0 },
    dragging: false,
    grounded: true,
    jumping: false,
  }
}
