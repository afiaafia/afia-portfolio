import type {
  MascotPoint,
  MascotVelocity,
} from "./mascot-types"

import {
  calculateVelocity,
  clampPoint,
} from "./mascot-physics"

import type {
  PhysicsBounds,
} from "./mascot-physics"

export type PointerSample = {
  point: MascotPoint
  time: number
}

export type DragSession = {
  pointerId: number
  offset: MascotPoint
  active: boolean
}

export type CursorState = {
  position: MascotPoint
  velocity: MascotVelocity
  distance: number
  nearby: boolean
}

const CURSOR_REACTION_DISTANCE = 300

export function createDragSession(
  pointerId: number,
  pointer: MascotPoint,
  mascot: MascotPoint,
): DragSession {
  return {
    pointerId,
    offset: {
      x: pointer.x - mascot.x,
      y: pointer.y - mascot.y,
    },
    active: true,
  }
}

export function getDraggedPosition(
  session: DragSession,
  pointer: MascotPoint,
  bounds: PhysicsBounds,
): MascotPoint {
  return clampPoint(
    {
      x: pointer.x - session.offset.x,
      y: pointer.y - session.offset.y,
    },
    bounds,
  )
}

export function getCursorState(
  cursor: MascotPoint,
  mascotCenter: MascotPoint,
  previous?: PointerSample,
  time = performance.now(),
): CursorState {
  const dx = cursor.x - mascotCenter.x
  const dy = cursor.y - mascotCenter.y
  const distance = Math.hypot(dx, dy)

  let velocity: MascotVelocity = { x: 0, y: 0 }

  if (previous) {
    const elapsed = Math.max(
      0.001,
      Math.min(0.05, (time - previous.time) / 1000),
    )

    velocity = calculateVelocity(previous.point, cursor, elapsed)
  }

  return {
    position: { ...cursor },
    velocity,
    distance,
    nearby: distance <= CURSOR_REACTION_DISTANCE,
  }
}

export function getEyeOffset(
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

export function getPointerReaction(
  cursor: MascotPoint,
  mascotCenter: MascotPoint,
): "none" | "curious" | "excited" {
  const distance = Math.hypot(
    cursor.x - mascotCenter.x,
    cursor.y - mascotCenter.y,
  )

  if (distance < 95) return "excited"
  if (distance < CURSOR_REACTION_DISTANCE) return "curious"

  return "none"
}
