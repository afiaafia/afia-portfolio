"use client"

import { usePathname } from "next/navigation"
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"

import {
  createMascotEngine,
} from "./mascot-engine"

import type {
  MascotEngine,
  MascotEngineSnapshot,
} from "./mascot-engine"

import {
  getActionBehavior,
  getRouteGreeting,
  getSceneGreeting,
} from "./mascot-behaviors"

import type {
  MascotAction,
} from "./mascot-types"

import styles from "./mascot.module.css"

const INITIAL_SNAPSHOT: MascotEngineSnapshot = {
  motion: {
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    dragging: false,
    grounded: true,
    jumping: false,
  },
  expression: {
    mood: "idle",
    blink: false,
    eyeOffset: { x: 0, y: 0 },
    sleeping: false,
    lastInteraction: Date.now(),
  },
  activeScene: null,
  target: null,
}

export default function MascotWidget() {
  const pathname = usePathname()
  const engineRef = useRef<MascotEngine | null>(null)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const dragMovedRef = useRef(false)
  const lastGreetingRef = useRef(0)
  const bubbleTimerRef = useRef<number | null>(null)

  const [snapshot, setSnapshot] =
    useState<MascotEngineSnapshot>(INITIAL_SNAPSHOT)
  const [ready, setReady] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [action, setAction] = useState<MascotAction | null>(null)

  const showMessage = useCallback(
    (nextMessage: string, duration = 2400) => {
      setMessage(nextMessage)

      if (bubbleTimerRef.current !== null) {
        window.clearTimeout(bubbleTimerRef.current)
      }

      if (duration > 0) {
        bubbleTimerRef.current = window.setTimeout(() => {
          setMessage(null)
          bubbleTimerRef.current = null
        }, duration)
      }
    },
    [],
  )

  useEffect(() => {
    const engine = createMascotEngine(
      {
        x: Math.max(12, window.innerWidth - 116),
        y: Math.max(90, window.innerHeight - 164),
      },
      {
        onUpdate: setSnapshot,
        onSceneChange: (sceneId) => {
          const greeting = getSceneGreeting(sceneId)
          if (greeting) showMessage(greeting, 2200)
        },
      },
      {
        reducedMotion: window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches,
        enableCursorTracking: true,
        enableDragging: true,
        enableSceneAwareness: true,
      },
    )

    engineRef.current = engine
    engine.start()
    setReady(true)

    return () => {
      engine.stop()
      engineRef.current = null

      if (bubbleTimerRef.current !== null) {
        window.clearTimeout(bubbleTimerRef.current)
      }
    }
  }, [showMessage])

  useEffect(() => {
    if (!ready || !engineRef.current) return

    const now = Date.now()
    if (now - lastGreetingRef.current < 1800) return

    lastGreetingRef.current = now
    showMessage(getRouteGreeting(pathname), 2600)
    engineRef.current.greet()
  }, [pathname, ready, showMessage])

  const runAction = useCallback(
    (nextAction: MascotAction) => {
      const engine = engineRef.current
      if (!engine) return

      const behavior = getActionBehavior(nextAction)

      setAction(nextAction)
      engine.setMood(behavior.mood)
      showMessage(behavior.message ?? "", behavior.duration || 0)

      if (nextAction === "jump") {
        engine.jump()
      } else if (nextAction === "sleep") {
        engine.sleep()
      } else if (nextAction === "wake") {
        engine.wake()
      } else if (nextAction === "greet" || nextAction === "wave") {
        engine.greet()
      }

      if (nextAction !== "sleep") {
        window.setTimeout(() => {
          setAction((current) =>
            current === nextAction ? null : current,
          )
        }, behavior.duration || 1400)
      }

      setMenuOpen(false)
    },
    [showMessage],
  )

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (
      (event.target as HTMLElement).closest(
        `.${styles.menuToggle}, .${styles.actionMenu}`,
      )
    ) return
    if (!engineRef.current) return

    dragMovedRef.current = false
    event.currentTarget.setPointerCapture(event.pointerId)

    engineRef.current.beginPointerDrag(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    })
  }

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (!snapshot.motion.dragging || !engineRef.current) return

    if (event.movementX !== 0 || event.movementY !== 0) {
      dragMovedRef.current = true
    }

    engineRef.current.movePointerDrag(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    })
  }

  const handlePointerUp = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    engineRef.current?.endPointerDrag(event.pointerId)

    if (dragMovedRef.current) {
      showMessage("You can move me anywhere!", 1800)
    }
  }

  const sleeping = snapshot.expression.sleeping ||
    snapshot.expression.mood === "sleeping"

  if (!ready) return null

  return (
    <div
      ref={rootRef}
      className={[
        styles.mascot,
        snapshot.motion.dragging ? styles.dragging : "",
        snapshot.motion.jumping ? styles.jumping : "",
        sleeping ? styles.sleeping : "",
        action ? styles[`action_${action}`] : "",
      ].filter(Boolean).join(" ")}
      style={{
        transform: `translate3d(${snapshot.motion.position.x}px, ${snapshot.motion.position.y}px, 0)`,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      aria-label="Interactive purple kitty mascot"
    >
      {message && (
        <div className={styles.bubble} role="status">
          {message}
        </div>
      )}

      <button
        type="button"
        className={styles.kittyButton}
        aria-label={sleeping ? "Wake up the kitty" : "Interact with the kitty"}
        onClick={() => {
          if (dragMovedRef.current) {
            dragMovedRef.current = false
            return
          }

          if (sleeping) {
            runAction("wake")
          } else {
            runAction("wave")
          }
        }}
      >
        <svg
          className={styles.kitty}
          viewBox="0 0 120 140"
          role="img"
          aria-label="Purple cartoon cat"
        >
          <defs>
            <linearGradient id="mascot-fur" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#D8B4FE" />
              <stop offset="52%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#7E22CE" />
            </linearGradient>
            <linearGradient id="mascot-inner-ear" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F5D0FE" />
              <stop offset="100%" stopColor="#C084FC" />
            </linearGradient>
          </defs>

          <ellipse
            cx="60"
            cy="130"
            rx="34"
            ry="6"
            fill="#A855F7"
            opacity=".18"
          />

          <g className={styles.tail}>
            <path
              d="M83 104 C105 107 110 91 101 80 C96 74 89 77 92 84"
              fill="none"
              stroke="#9333EA"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M83 104 C105 107 110 91 101 80 C96 74 89 77 92 84"
              fill="none"
              stroke="#D8B4FE"
              strokeWidth="3"
              strokeLinecap="round"
              opacity=".75"
            />
          </g>

          <path
            d="M29 49 L21 12 Q20 7 25 11 L48 29 Z"
            fill="url(#mascot-fur)"
            stroke="#7E22CE"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M91 49 L99 12 Q100 7 95 11 L72 29 Z"
            fill="url(#mascot-fur)"
            stroke="#7E22CE"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          <path
            d="M29 35 L27 20 L41 31 Z"
            fill="url(#mascot-inner-ear)"
          />
          <path
            d="M91 35 L93 20 L79 31 Z"
            fill="url(#mascot-inner-ear)"
          />

          <path
            d="M60 24 C39 24 25 40 25 63 L25 91 C25 111 40 122 60 122 C80 122 95 111 95 91 L95 63 C95 40 81 24 60 24 Z"
            fill="url(#mascot-fur)"
            stroke="#7E22CE"
            strokeWidth="2"
          />

          <path
            d="M42 98 Q60 110 78 98 Q73 117 60 117 Q47 117 42 98Z"
            fill="#F5D0FE"
            opacity=".9"
          />

          {sleeping ? (
            <g
              fill="none"
              stroke="#4C1D95"
              strokeWidth="3"
              strokeLinecap="round"
            >
              <path d="M38 65 Q45 72 52 65" />
              <path d="M68 65 Q75 72 82 65" />
            </g>
          ) : (
            <g>
              <g className={styles.eye}>
                <ellipse cx="44" cy="64" rx="8" ry="10" fill="#2E1065" />
                <ellipse
                  cx={44 + snapshot.expression.eyeOffset.x * 0.55}
                  cy={61 + snapshot.expression.eyeOffset.y * 0.55}
                  rx="3"
                  ry="4"
                  fill="#FFFFFF"
                />
              </g>
              <g className={styles.eye}>
                <ellipse cx="76" cy="64" rx="8" ry="10" fill="#2E1065" />
                <ellipse
                  cx={76 + snapshot.expression.eyeOffset.x * 0.55}
                  cy={61 + snapshot.expression.eyeOffset.y * 0.55}
                  rx="3"
                  ry="4"
                  fill="#FFFFFF"
                />
              </g>
            </g>
          )}

          <path
            d="M56 77 Q60 73 64 77 Q60 83 56 77Z"
            fill="#581C87"
          />
          <path
            d="M60 82 Q55 88 50 83 M60 82 Q65 88 70 83"
            fill="none"
            stroke="#581C87"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <ellipse cx="34" cy="79" rx="7" ry="4" fill="#F0ABFC" opacity=".75" />
          <ellipse cx="86" cy="79" rx="7" ry="4" fill="#F0ABFC" opacity=".75" />

          <path
            d="M28 84 L11 81 M29 89 L12 91 M92 84 L109 81 M91 89 L108 91"
            fill="none"
            stroke="#6B21A8"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          <path
            d="M43 111 Q35 117 39 122 M77 111 Q85 117 81 122"
            fill="none"
            stroke="#7E22CE"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <button
        type="button"
        className={styles.menuToggle}
        aria-label={menuOpen ? "Close kitty actions" : "Open kitty actions"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? "×" : "＋"}
      </button>

      {menuOpen && (
        <div className={styles.actionMenu} aria-label="Kitty actions">
          <button type="button" onClick={() => runAction("wave")}>
            Wave
          </button>
          <button type="button" onClick={() => runAction("jump")}>
            Jump
          </button>
          <button type="button" onClick={() => runAction("spin")}>
            Spin
          </button>
          <button
            type="button"
            onClick={() => runAction(sleeping ? "wake" : "sleep")}
          >
            {sleeping ? "Wake" : "Sleep"}
          </button>
        </div>
      )}
    </div>
  )
}
