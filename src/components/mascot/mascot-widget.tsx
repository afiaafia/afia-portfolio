"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { createMascotEngine } from "./mascot-engine";

import type { MascotEngine, MascotEngineSnapshot } from "./mascot-engine";

import {
  getActionBehavior,
  getClickDialogue,
  getRouteGreeting,
  getSceneGreeting,
} from "./mascot-behaviors";

import type { MascotAction } from "./mascot-types";

import {
  cancelMascotAudio,
  getMascotAudioClip,
  playMascotAudio,
} from "./mascot-speech";

import styles from "./mascot.module.css";

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
};

let kittyAudio: HTMLAudioElement | null = null;

function stopKittySound() {
  if (!kittyAudio) return;

  kittyAudio.pause();
  kittyAudio.currentTime = 0;
}

function playKittySound() {
  try {
    if (!kittyAudio) {
      kittyAudio = new Audio("/sounds/meow.mp3");
      kittyAudio.volume = 0.45;
    }

    cancelMascotAudio();
    stopKittySound();
    void kittyAudio.play().catch(() => {});
  } catch {
    // Keep mascot interaction working if audio is unavailable.
  }
}

function getSpeechBubbleDuration(text: string, minimum: number): number {
  return Math.max(minimum, Math.min(8000, 1200 + text.length * 65));
}

function logMascotSpeech(message: string, details?: unknown): void {
  if (process.env.NODE_ENV === "development") {
    console.info(`[mascot speech] ${message}`, details ?? "");
  }
}

function warnMascotSpeech(message: string, details?: unknown): void {
  if (process.env.NODE_ENV === "development") {
    console.warn(`[mascot speech] ${message}`, details ?? "");
  }
}

export default function MascotWidget() {
  const pathname = usePathname();
  const engineRef = useRef<MascotEngine | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const dragMovedRef = useRef(false);
  const pointerStartRef = useRef<{
    pointerId: number;
    point: { x: number; y: number };
  } | null>(null);
  const activeActionRef = useRef<MascotAction | null>(null);
  const greetingCooldownUntilRef = useRef(0);
  const spokenGreetingCooldownRef = useRef(0);
  const greetingActionTimerRef = useRef<number | null>(null);
  const hasInitialSceneRef = useRef(false);
  const bubbleTimerRef = useRef<number | null>(null);
  const audioMessageIdRef = useRef(0);
  const voiceEnabledRef = useRef(false);
  const lastDialogueRef = useRef<string | null>(null);

  const [snapshot, setSnapshot] =
    useState<MascotEngineSnapshot>(INITIAL_SNAPSHOT);
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [action, setAction] = useState<MascotAction | null>(null);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [blinking, setBlinking] = useState(false);

  const showMessage = useCallback((nextMessage: string, duration = 2400) => {
    setMessage(nextMessage);

    if (bubbleTimerRef.current !== null) {
      window.clearTimeout(bubbleTimerRef.current);
    }

    if (duration > 0) {
      bubbleTimerRef.current = window.setTimeout(() => {
        setMessage(null);
        bubbleTimerRef.current = null;
      }, duration);
    }
  }, []);

  const playDialogue = useCallback(
    (text: string, fallbackDuration: number) => {
      const clip = getMascotAudioClip(text);
      const messageId = ++audioMessageIdRef.current;

      if (!clip) {
        warnMascotSpeech("No audio clip is mapped for this dialogue.", {
          text,
        });
        showMessage(text, fallbackDuration);
        return false;
      }

      showMessage(text, 0);
      stopKittySound();

      const started = playMascotAudio(clip, {
        onEnded: () => {
          if (audioMessageIdRef.current === messageId) {
            setMessage(null);
          }
        },
        onError: (error) => {
          if (audioMessageIdRef.current !== messageId) return;
          warnMascotSpeech("Audio clip failed; keeping the text bubble.", {
            clip,
            error,
          });
          showMessage(text, fallbackDuration);
        },
      });

      if (!started) {
        showMessage(text, fallbackDuration);
      }

      return started;
    },
    [showMessage],
  );

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let allowBlinking = !reducedMotion.matches;
    let nextBlinkTimer = 0;
    let closeBlinkTimer = 0;

    const scheduleBlink = () => {
      if (!allowBlinking) return;

      nextBlinkTimer = window.setTimeout(
        () => {
          if (!allowBlinking) return;

          setBlinking(true);
          closeBlinkTimer = window.setTimeout(() => {
            setBlinking(false);
            scheduleBlink();
          }, 180);
        },
        2800 + Math.random() * 2800,
      );
    };

    const handleMotionPreferenceChange = () => {
      allowBlinking = !reducedMotion.matches;
      window.clearTimeout(nextBlinkTimer);
      window.clearTimeout(closeBlinkTimer);

      if (allowBlinking) {
        scheduleBlink();
      } else {
        setBlinking(false);
      }
    };

    reducedMotion.addEventListener("change", handleMotionPreferenceChange);
    scheduleBlink();

    return () => {
      allowBlinking = false;
      window.clearTimeout(nextBlinkTimer);
      window.clearTimeout(closeBlinkTimer);
      reducedMotion.removeEventListener("change", handleMotionPreferenceChange);
    };
  }, []);

  const triggerGreeting = useCallback(
    (greeting: string, duration: number) => {
      const now = Date.now();
      const engine = engineRef.current;

      if (
        now < greetingCooldownUntilRef.current ||
        activeActionRef.current !== null ||
        engine?.getSnapshot().expression.sleeping
      )
        return;

      greetingCooldownUntilRef.current = now + Math.max(1800, duration);
      lastDialogueRef.current = greeting;

      if (greetingActionTimerRef.current !== null) {
        window.clearTimeout(greetingActionTimerRef.current);
      }

      activeActionRef.current = "greet";
      setAction("greet");
      const shouldSpeak =
        voiceEnabledRef.current && now >= spokenGreetingCooldownRef.current;

      if (shouldSpeak) {
        spokenGreetingCooldownRef.current = now + 8000;
        playDialogue(greeting, getSpeechBubbleDuration(greeting, duration));
      } else {
        showMessage(greeting, duration);
      }
      engine?.greet();

      greetingActionTimerRef.current = window.setTimeout(() => {
        if (activeActionRef.current === "greet") {
          activeActionRef.current = null;
          setAction(null);
        }
        greetingActionTimerRef.current = null;
      }, 1500);
    },
    [playDialogue, showMessage],
  );

  useEffect(() => {
    const engine = createMascotEngine(
      {
        x: Math.max(12, window.innerWidth - 116),
        y: Math.max(90, window.innerHeight - 164),
      },
      {
        onUpdate: setSnapshot,
        onSceneChange: (sceneId) => {
          if (!hasInitialSceneRef.current) {
            hasInitialSceneRef.current = true;
            return;
          }

          const greeting = getSceneGreeting(
            sceneId,
            lastDialogueRef.current ?? undefined,
          );
          if (greeting) triggerGreeting(greeting, 2200);
        },
      },
      {
        reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)")
          .matches,
        enableCursorTracking: true,
        enableDragging: true,
        enableSceneAwareness: true,
      },
    );

    engineRef.current = engine;
    engine.start();
    setReady(true);

    return () => {
      engine.stop();
      engineRef.current = null;

      if (bubbleTimerRef.current !== null) {
        window.clearTimeout(bubbleTimerRef.current);
      }

      cancelMascotAudio();

      if (greetingActionTimerRef.current !== null) {
        window.clearTimeout(greetingActionTimerRef.current);
      }

      hasInitialSceneRef.current = false;
    };
  }, [triggerGreeting]);

  useEffect(() => {
    if (!ready) return;

    triggerGreeting(
      getRouteGreeting(pathname, lastDialogueRef.current ?? undefined),
      2600,
    );
  }, [pathname, ready, triggerGreeting]);

  const runAction = useCallback(
    (nextAction: MascotAction, messageOverride?: string) => {
      const engine = engineRef.current;
      if (!engine) return;

      const behavior = getActionBehavior(nextAction);
      const actionMessage = messageOverride ?? behavior.message ?? "";
      activeActionRef.current = nextAction;
      cancelMascotAudio();

      if (nextAction === "wave" || nextAction === "greet") {
        greetingCooldownUntilRef.current =
          Date.now() + Math.max(1800, behavior.duration);
      }

      setAction(nextAction);
      engine.setMood(behavior.mood);

      if (voiceEnabledRef.current && actionMessage && nextAction !== "sleep") {
        spokenGreetingCooldownRef.current = Date.now() + 8000;
        playDialogue(
          actionMessage,
          getSpeechBubbleDuration(actionMessage, behavior.duration),
        );
      } else {
        showMessage(actionMessage, behavior.duration || 0);
      }

      if (nextAction === "jump") {
        engine.jump();
      } else if (nextAction === "sleep") {
        engine.sleep();
      } else if (nextAction === "wake") {
        engine.wake();
      } else if (nextAction === "greet" || nextAction === "wave") {
        engine.greet();
      }

      if (nextAction !== "sleep") {
        window.setTimeout(() => {
          if (activeActionRef.current === nextAction) {
            activeActionRef.current = null;
            setAction(null);
          }
        }, behavior.duration || 1400);
      }

      setMenuOpen(false);
    },
    [playDialogue, showMessage],
  );

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (
      (event.target as HTMLElement).closest(
        `.${styles.menuToggle}, .${styles.actionMenu}`,
      )
    )
      return;

    if (!engineRef.current) return;

    // Record the pointer first. A click alone must not start dragging.
    pointerStartRef.current = {
      pointerId: event.pointerId,
      point: {
        x: event.clientX,
        y: event.clientY,
      },
    };
    dragMovedRef.current = false;
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const engine = engineRef.current;
    const start = pointerStartRef.current;

    if (!engine || !start || start.pointerId !== event.pointerId) {
      return;
    }

    const point = {
      x: event.clientX,
      y: event.clientY,
    };

    const distance = Math.hypot(
      point.x - start.point.x,
      point.y - start.point.y,
    );

    if (!engine.getSnapshot().motion.dragging) {
      // Ignore tiny pointer movements so normal clicks still work.
      if (distance < 7) return;

      cancelMascotAudio();
      audioMessageIdRef.current += 1;
      if (bubbleTimerRef.current !== null) {
        window.clearTimeout(bubbleTimerRef.current);
        bubbleTimerRef.current = null;
      }
      setMessage(null);
      dragMovedRef.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);

      engine.beginPointerDrag(event.pointerId, start.point);
    }

    if (engine.getSnapshot().motion.dragging) {
      dragMovedRef.current = true;
      engine.movePointerDrag(event.pointerId, point);
    }
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const start = pointerStartRef.current;

    if (!start || start.pointerId !== event.pointerId) return;

    const engine = engineRef.current;

    if (engine?.getSnapshot().motion.dragging) {
      engine.endPointerDrag(event.pointerId);
    }

    pointerStartRef.current = null;

    if (dragMovedRef.current) {
      showMessage("You can move me anywhere!", 1800);
    }
  };

  const sleeping =
    snapshot.expression.sleeping || snapshot.expression.mood === "sleeping";

  const toggleVoice = () => {
    if (voiceEnabledRef.current) {
      logMascotSpeech("Voice disabled by visitor.");
      voiceEnabledRef.current = false;
      setVoiceEnabled(false);
      cancelMascotAudio();
      audioMessageIdRef.current += 1;
      showMessage("Voice off. I'll keep chatting in text!", 2200);
      return;
    }

    const greeting = getClickDialogue(
      pathname,
      snapshot.activeScene,
      lastDialogueRef.current ?? undefined,
    );

    logMascotSpeech("Voice enabled by visitor.", {
      clip: getMascotAudioClip(greeting),
    });
    voiceEnabledRef.current = true;
    setVoiceEnabled(true);
    lastDialogueRef.current = greeting;
    spokenGreetingCooldownRef.current = Date.now() + 8000;
    playDialogue(greeting, getSpeechBubbleDuration(greeting, 3200));
  };

  if (!ready) return null;

  return (
    <div
      ref={rootRef}
      className={[
        styles.mascot,
        snapshot.motion.dragging ? styles.dragging : "",
        snapshot.motion.jumping ? styles.jumping : "",
        sleeping ? styles.sleeping : "",
        action ? styles[`action_${action}`] : "",
      ]
        .filter(Boolean)
        .join(" ")}
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
            dragMovedRef.current = false;
            return;
          }

          if (sleeping) {
            logMascotSpeech("Cat clicked.", {
              voiceEnabled: voiceEnabledRef.current,
              clip: getMascotAudioClip(getActionBehavior("wake").message ?? ""),
            });
            if (!voiceEnabledRef.current) playKittySound();
            runAction("wake");
          } else {
            const greeting = getClickDialogue(
              pathname,
              snapshot.activeScene,
              lastDialogueRef.current ?? undefined,
            );
            lastDialogueRef.current = greeting;
            logMascotSpeech("Cat clicked.", {
              voiceEnabled: voiceEnabledRef.current,
              clip: getMascotAudioClip(greeting),
            });

            if (!voiceEnabledRef.current) playKittySound();
            runAction("wave", greeting);
          }
        }}
      >
        <span className={styles.kittyVisual} aria-hidden="true">
          <Image
            className={`${styles.kitty} ${styles.kittyNormal}`}
            src="/images/kitty.png"
            alt=""
            width={444}
            height={415}
            sizes="104px"
            draggable={false}
          />
          <Image
            className={`${styles.kitty} ${styles.kittyWave}`}
            src="/images/kitty-wave.png"
            alt=""
            width={600}
            height={560}
            sizes="104px"
            draggable={false}
          />
          <span
            className={`${styles.eyelids} ${blinking ? styles.blinking : ""}`}
            aria-hidden="true"
          >
            <span className={`${styles.eyelid} ${styles.eyelidLeft}`} />
            <span className={`${styles.eyelid} ${styles.eyelidRight}`} />
          </span>
        </span>
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
          <button
            type="button"
            className={styles.voiceToggle}
            aria-label={
              voiceEnabled
                ? "Disable spoken dialogue"
                : "Enable spoken dialogue"
            }
            aria-pressed={voiceEnabled}
            onClick={toggleVoice}
          >
            {voiceEnabled ? "Voice: On" : "Voice: Off"}
          </button>
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
  );
}
