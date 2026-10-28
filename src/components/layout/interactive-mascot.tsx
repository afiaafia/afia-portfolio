"use client"

import { useEffect, useRef, useState } from "react"

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value))

export function InteractiveMascot() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [ready, setReady] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [blink, setBlink] = useState(false)
  const [greeting, setGreeting] = useState(false)
  const [look, setLook] = useState({ x: 0, y: 0 })

  const rootRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const motionRef = useRef({ started: 0, power: 0, phase: 0 })
  const dragRef = useRef({
    active: false,
    pointerX: 0,
    pointerY: 0,
    startX: 0,
    startY: 0,
  })

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPosition({
      x: Math.max(12, window.innerWidth - 116),
      y: Math.max(90, window.innerHeight - 164),
    })
    setReady(true)

    const move = (event: PointerEvent) => {
      if (dragRef.current.active) {
        const x = clamp(
          dragRef.current.startX + event.clientX - dragRef.current.pointerX,
          8,
          window.innerWidth - 100,
        )
        const y = clamp(
          dragRef.current.startY + event.clientY - dragRef.current.pointerY,
          78,
          window.innerHeight - 130,
        )
        setPosition({ x, y })
        return
      }

      const rect = rootRef.current?.getBoundingClientRect()
      if (!rect) return

      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = event.clientX - cx
      const dy = event.clientY - cy
      const distance = Math.hypot(dx, dy)

      setLook({
        x: distance < 300 ? clamp(dx / 35, -5, 5) : 0,
        y: distance < 300 ? clamp(dy / 35, -4, 4) : 0,
      })
    }

    const release = () => {
      if (dragRef.current.active) {
        dragRef.current.active = false
        setDragging(false)
        jump()
      }
    }

    const resize = () => {
      setPosition((p) => ({
        x: clamp(p.x, 8, window.innerWidth - 100),
        y: clamp(p.y, 78, window.innerHeight - 130),
      }))
    }

    window.addEventListener("pointermove", move)
    window.addEventListener("pointerup", release)
    window.addEventListener("pointercancel", release)
    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerup", release)
      window.removeEventListener("pointercancel", release)
      window.removeEventListener("resize", resize)
    }
  }, [])

  useEffect(() => {
    let raf = 0
    let previous = performance.now()
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    )

    const frame = (now: number) => {
      const elapsed = Math.min((now - previous) / 1000, 0.05)
      previous = now

      const motion = motionRef.current
      motion.phase += elapsed

      let lift = 0
      let rotation = 0
      let sx = 1
      let sy = 1

      if (!reducedMotion.matches) {
        const jumpTime = (now - motion.started) / 1000

        if (motion.power > 0 && jumpTime >= 0 && jumpTime < 0.68) {
          const progress = jumpTime / 0.68
          lift = Math.sin(progress * Math.PI) * 31 * motion.power
          rotation = Math.sin(progress * Math.PI * 2) * 6 * motion.power

          // Anticipation, stretch in the air, and squash on landing.
          if (progress < 0.14) {
            const anticipation = progress / 0.14
            sy = 1 - Math.sin(anticipation * Math.PI) * 0.12
            sx = 1 + Math.sin(anticipation * Math.PI) * 0.08
          } else if (progress > 0.82) {
            const landing = (progress - 0.82) / 0.18
            sx = 1 + Math.sin(landing * Math.PI) * 0.1
            sy = 1 - Math.sin(landing * Math.PI) * 0.12
          } else {
            sy = 1.04
            sx = 0.97
          }
        } else {
          motion.power = 0
          lift = Math.sin(motion.phase * 2.4) * 2.5
        }
      } else {
        motion.power = 0
      }

      if (svgRef.current) {
        svgRef.current.style.transform =
          `translateY(${-lift}px) rotate(${rotation}deg) scale(${sx}, ${sy})`
      }

      raf = window.requestAnimationFrame(frame)
    }

    raf = window.requestAnimationFrame(frame)
    return () => window.cancelAnimationFrame(raf)
  }, [])

  function jump() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    motionRef.current.started = performance.now()
    motionRef.current.power = 1
  }

  useEffect(() => {
    const blinkOnce = () => {
      setBlink(true)
      window.setTimeout(() => setBlink(false), 140)
    }

    const interval = window.setInterval(blinkOnce, 3200)
    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    let second: number | undefined

    const first = window.setTimeout(() => {
      setGreeting(true)
      second = window.setTimeout(() => setGreeting(false), 2100)
    }, 500)

    return () => {
      window.clearTimeout(first)
      if (second) window.clearTimeout(second)
    }
  }, [])

  function startDrag(event: React.PointerEvent<HTMLDivElement>) {
    if (event.button !== 0 && event.pointerType === "mouse") return

    dragRef.current = {
      active: true,
      pointerX: event.clientX,
      pointerY: event.clientY,
      startX: position.x,
      startY: position.y,
    }

    setDragging(true)
    setGreeting(false)
  }

  if (!ready) return null

  return (
    <div
      ref={rootRef}
      className="interactive-mascot"
      style={{
        left: position.x,
        top: position.y,
        touchAction: "none",
        cursor: dragging ? "grabbing" : "grab",
      }}
      onPointerDown={startDrag}
      onPointerEnter={jump}
      onClick={jump}
      role="img"
      aria-label="Interactive purple kitty. Drag to move it around."
      title="Hey! Drag me around."
    >
{greeting && !dragging && (
        <span className="greeting">Hi, there! ♡</span>
      )}

      <svg
        ref={svgRef}
        className="kitty-float"
        width="96"
        height="116"
        viewBox="0 0 100 120"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="kittyBody" x1="20" y1="15" x2="82" y2="110">
            <stop stopColor="#C4B5FD" />
            <stop offset=".52" stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#6D28D9" />
          </linearGradient>
          <linearGradient id="kittyEar" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#E9D5FF" />
            <stop offset="1" stopColor="#A78BFA" />
          </linearGradient>
        </defs>

        <ellipse cx="49" cy="109" rx="29" ry="5" fill="#8B5CF6" opacity=".17" />

        <path
          className="kitty-tail"
          d="M72 85 C91 88 94 70 85 64 C80 60 76 66 81 69"
          stroke="#8B5CF6"
          strokeWidth="9"
          strokeLinecap="round"
        />

        <g>
          <path d="M21 42 L18 12 Q17 6 23 10 L43 27Z" fill="url(#kittyBody)" />
          <path d="M23 28 L22 17 L34 27Z" fill="#F0ABFC" />
          <path d="M59 27 L78 10 Q84 6 82 14 L79 44Z" fill="url(#kittyBody)" />
          <path d="M67 27 L78 17 L76 33Z" fill="#F0ABFC" />

          <path
            d="M16 48 C16 30 29 24 50 24 C71 24 84 36 84 53 L82 79 C81 97 67 106 50 106 C31 106 18 96 17 79Z"
            fill="url(#kittyBody)"
          />

          <ellipse cx="50" cy="87" rx="19" ry="13" fill="#DDD6FE" opacity=".65" />
          <ellipse cx="28" cy="76" rx="8" ry="10" fill="#A78BFA" />
          <ellipse cx="72" cy="76" rx="8" ry="10" fill="#A78BFA" />

          <g
            className={blink ? "kitty-blink" : ""}
            style={{
              transform: `translate(${look.x}px, ${look.y}px)`,
              transformOrigin: "50px 54px",
            }}
          >
            <ellipse cx="37" cy="53" rx="5.8" ry="7.3" fill="#241438" />
            <ellipse cx="63" cy="53" rx="5.8" ry="7.3" fill="#241438" />
            <circle className="kitty-eye" cx={35 + look.x * .25} cy={50 + look.y * .25} r="2" fill="white" />
            <circle className="kitty-eye" cx={61 + look.x * .25} cy={50 + look.y * .25} r="2" fill="white" />
          </g>

          <ellipse cx="25" cy="64" rx="5" ry="2.7" fill="#F0ABFC" opacity=".85" />
          <ellipse cx="75" cy="64" rx="5" ry="2.7" fill="#F0ABFC" opacity=".85" />

          <path d="M47 61 Q50 65 53 61 Q50 68 47 61Z" fill="#F9A8D4" />
          <path d="M50 66 Q45 72 41 67 M50 66 Q55 72 59 67" stroke="#4C1D95" strokeWidth="1.6" strokeLinecap="round" />

          <path d="M30 70 L14 68 M30 74 L14 77 M70 70 L86 68 M70 74 L86 77" stroke="#EDE9FE" strokeWidth="1.2" strokeLinecap="round" opacity=".9" />

          <path
            d="M27 96 Q20 87 15 94 Q11 101 19 106 L29 107Z"
            fill="#C4B5FD"
          />

          <g className={greeting && !dragging ? "kitty-wave" : ""}>
            <path
              d="M72 80 Q79 77 81 68 L83 58"
              stroke="#8B5CF6"
              strokeWidth="9"
              strokeLinecap="round"
            />
            <ellipse cx="83" cy="55" rx="6.5" ry="8" fill="#C4B5FD" />
            <path d="M80 51 L83 48 M84 51 L87 48" stroke="#EDE9FE" strokeWidth="1.4" strokeLinecap="round" />
          </g>
        </g>
      </svg>
    </div>
  )
}
