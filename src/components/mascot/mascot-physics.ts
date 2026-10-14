import type {
  MascotMotionState,
  MascotPoint,
  MascotVelocity,
} from "./mascot-types"

const GRAVITY = 1800
const JUMP_IMPULSE = -620
const AIR_RESISTANCE = 0.985
const GROUND_FRICTION = 0.82
const BOUNCE = 0.12
const MAX_SPEED = 1100

export type PhysicsBounds = {
  left: number
  top: number
  right: number
  bottom: number
}

export type PhysicsOptions = {
  gravity?: number
  groundFriction?: number
  bounce?: number
  maxSpeed?: number
}

export function createMotionState(
  position: MascotPoint,
): MascotMotionState {
  return {
    position: { ...position },
    velocity: { x: 0, y: 0 },
    dragging: false,
    grounded: true,
    jumping: false,
  }
}

export function clampPoint(
  point: MascotPoint,
  bounds: PhysicsBounds,
): MascotPoint {
  return {
    x: Math.max(bounds.left, Math.min(bounds.right, point.x)),
    y: Math.max(bounds.top, Math.min(bounds.bottom, point.y)),
  }
}

export function calculateVelocity(
  from: MascotPoint,
  to: MascotPoint,
  deltaSeconds: number,
): MascotVelocity {
  if (deltaSeconds <= 0) return { x: 0, y: 0 }

  return {
    x: (to.x - from.x) / deltaSeconds,
    y: (to.y - from.y) / deltaSeconds,
  }
}

export function beginJump(
  state: MascotMotionState,
  strength = 1,
): MascotMotionState {
  if (state.dragging) return state

  return {
    ...state,
    velocity: {
      x: state.velocity.x,
      y: JUMP_IMPULSE * Math.max(0.2, Math.min(1.5, strength)),
    },
    grounded: false,
    jumping: true,
  }
}

export function beginDrag(
  state: MascotMotionState,
): MascotMotionState {
  return {
    ...state,
    velocity: { x: 0, y: 0 },
    dragging: true,
    jumping: false,
    grounded: false,
  }
}

export function moveWhileDragging(
  state: MascotMotionState,
  position: MascotPoint,
  bounds: PhysicsBounds,
): MascotMotionState {
  if (!state.dragging) return state

  return {
    ...state,
    position: clampPoint(position, bounds),
  }
}

export function endDrag(
  state: MascotMotionState,
  releaseVelocity: MascotVelocity = { x: 0, y: 0 },
  maxSpeed = MAX_SPEED,
): MascotMotionState {
  if (!state.dragging) return state

  return {
    ...state,
    dragging: false,
    grounded: false,
    jumping: true,
    velocity: {
      x: Math.max(-maxSpeed, Math.min(maxSpeed, releaseVelocity.x)),
      y: Math.max(-maxSpeed, Math.min(maxSpeed, releaseVelocity.y)),
    },
  }
}

export function stepPhysics(
  state: MascotMotionState,
  deltaSeconds: number,
  bounds: PhysicsBounds,
  options: PhysicsOptions = {},
): MascotMotionState {
  if (state.dragging || deltaSeconds <= 0) return state

  // Limit frame time to prevent large jumps after a paused browser tab.
  const dt = Math.min(deltaSeconds, 1 / 30)
  const gravity = options.gravity ?? GRAVITY
  const friction = options.groundFriction ?? GROUND_FRICTION
  const bounce = options.bounce ?? BOUNCE
  const maxSpeed = options.maxSpeed ?? MAX_SPEED

  let vx = state.velocity.x
  let vy = state.velocity.y

  vy += gravity * dt
  vx *= Math.pow(AIR_RESISTANCE, dt * 60)

  vx = Math.max(-maxSpeed, Math.min(maxSpeed, vx))
  vy = Math.max(-maxSpeed, Math.min(maxSpeed, vy))

  let position = {
    x: state.position.x + vx * dt,
    y: state.position.y + vy * dt,
  }

  let grounded = false
  let jumping = true

  if (position.y >= bounds.bottom) {
    position.y = bounds.bottom

    if (Math.abs(vy) > 90) {
      vy = -Math.abs(vy) * bounce
    } else {
      vy = 0
      grounded = true
      jumping = false
    }

    vx *= friction
  }

  if (position.y <= bounds.top) {
    position.y = bounds.top
    vy = Math.abs(vy) * 0.35
  }

  if (position.x <= bounds.left) {
    position.x = bounds.left
    vx = Math.abs(vx) * 0.45
  } else if (position.x >= bounds.right) {
    position.x = bounds.right
    vx = -Math.abs(vx) * 0.45
  }

  if (grounded && Math.abs(vx) < 4) vx = 0

  return {
    position,
    velocity: { x: vx, y: vy },
    dragging: false,
    grounded,
    jumping,
  }
}

export function getJumpHeight(
  elapsedSeconds: number,
  durationSeconds = 0.68,
  maxHeight = 32,
): number {
  if (durationSeconds <= 0) return 0

  const progress = Math.max(
    0,
    Math.min(1, elapsedSeconds / durationSeconds),
  )

  return Math.sin(progress * Math.PI) * maxHeight
}

export function stopMotion(
  state: MascotMotionState,
): MascotMotionState {
  return {
    ...state,
    velocity: { x: 0, y: 0 },
    grounded: true,
    jumping: false,
  }
}
