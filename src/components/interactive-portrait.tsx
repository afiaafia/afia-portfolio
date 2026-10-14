"use client"

import Image from "next/image"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react"

export function InteractivePortrait() {
  const prefersReducedMotion = useReducedMotion()

  const rotateXValue = useMotionValue(0)
  const rotateYValue = useMotionValue(0)

  const rotateX = useSpring(rotateXValue, {
    stiffness: 160,
    damping: 22,
    mass: 0.6,
  })

  const rotateY = useSpring(rotateYValue, {
    stiffness: 160,
    damping: 22,
    mass: 0.6,
  })

  function handlePointerMove(event: React.MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return

    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height

    rotateXValue.set((0.5 - y) * 16)
    rotateYValue.set((x - 0.5) * 16)
  }

  function resetTilt() {
    rotateXValue.set(0)
    rotateYValue.set(0)
  }

  return (
    <div className="relative mx-auto flex w-full max-w-[440px] items-center justify-center py-8 sm:py-10 lg:ml-auto">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-[76%] w-[76%] rounded-full bg-violet-600/20 blur-[65px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute aspect-square w-[88%] rounded-full border border-violet-400/15"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute aspect-square w-[82%] rounded-full border border-violet-300/20"
      />

      <motion.div
        onMouseMove={handlePointerMove}
        onMouseLeave={resetTilt}
        onFocus={() => undefined}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1000,
        }}
        className="relative aspect-square w-[76%] max-w-[330px] rounded-full p-[5px] shadow-[0_24px_80px_rgba(0,0,0,0.5),0_0_45px_rgba(139,92,246,0.2)]"
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 25deg, #2e174e, #c4b5fd, #7c3aed, #211034, #a78bfa, #2e174e)",
          }}
        />

        <div className="absolute inset-[2px] rounded-full border border-white/20" />

        <div className="absolute inset-[5px] overflow-hidden rounded-full bg-[#0b0a12]">
          <Image
            src="/images/afia-portrait.jpg"
            alt="Afia Mubassira"
            fill
            priority
            sizes="(max-width: 640px) 70vw, (max-width: 1024px) 300px, 330px"
            className="object-cover object-center"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_25px_rgba(11,10,18,0.18)]"
          />
        </div>
      </motion.div>
    </div>
  )
}
