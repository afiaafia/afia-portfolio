import type {
  MascotPoint,
  MascotScene,
} from "./mascot-types"

export type SceneTarget = {
  id: string
  element: HTMLElement
  bounds: DOMRect
  center: MascotPoint
  visibleRatio: number
}

const DEFAULT_SCENES = [
  "home",
  "hero",
  "about",
  "work",
  "projects",
  "stack",
  "build-log",
  "contact",
  "resume",
  "github",
]

export function getSceneId(element: HTMLElement): string {
  return (
    element.dataset.mascotScene ||
    element.id ||
    element.dataset.scene ||
    "unnamed"
  )
}

export function discoverScenes(
  root: ParentNode = document,
): MascotScene[] {
  const elements = root.querySelectorAll<HTMLElement>(
    "[data-mascot-scene], [data-scene], section[id], main[id]",
  )

  const unique = new Map<string, MascotScene>()

  elements.forEach((element) => {
    const id = getSceneId(element)

    if (id === "unnamed" || unique.has(id)) return

    unique.set(id, {
      id,
      element,
      bounds: element.getBoundingClientRect(),
    })
  })

  return [...unique.values()]
}

export function discoverNamedSections(
  root: ParentNode = document,
): MascotScene[] {
  const elements = root.querySelectorAll<HTMLElement>(
    "main, main > section, main section, [data-mascot-scene]",
  )

  const scenes: MascotScene[] = []
  const seen = new Set<HTMLElement>()

  elements.forEach((element, index) => {
    if (seen.has(element)) return
    seen.add(element)

    const id =
      element.dataset.mascotScene ||
      element.id ||
      element.dataset.scene ||
      `section-${index + 1}`

    scenes.push({
      id,
      element,
      bounds: element.getBoundingClientRect(),
    })
  })

  return scenes
}

export function getVisibleScenes(
  scenes: MascotScene[],
  viewportHeight = window.innerHeight,
): SceneTarget[] {
  return scenes
    .map((scene) => {
      const bounds = scene.element.getBoundingClientRect()

      const visibleTop = Math.max(0, bounds.top)
      const visibleBottom = Math.min(viewportHeight, bounds.bottom)
      const visibleHeight = Math.max(0, visibleBottom - visibleTop)

      const visibleRatio =
        bounds.height > 0
          ? Math.min(1, visibleHeight / bounds.height)
          : 0

      return {
        id: scene.id,
        element: scene.element,
        bounds,
        center: {
          x: bounds.left + bounds.width / 2,
          y: bounds.top + bounds.height / 2,
        },
        visibleRatio,
      }
    })
    .filter((scene) => scene.visibleRatio > 0)
}

export function getActiveScene(
  scenes: MascotScene[],
  viewportHeight = window.innerHeight,
): SceneTarget | null {
  const visible = getVisibleScenes(scenes, viewportHeight)

  if (visible.length === 0) return null

  const viewportCenter = viewportHeight / 2

  return visible.reduce((best, candidate) => {
    const bestDistance = Math.abs(
      best.bounds.top + best.bounds.height / 2 - viewportCenter,
    )

    const candidateDistance = Math.abs(
      candidate.bounds.top +
        candidate.bounds.height / 2 -
        viewportCenter,
    )

    if (candidate.visibleRatio > best.visibleRatio + 0.25) {
      return candidate
    }

    if (
      Math.abs(candidate.visibleRatio - best.visibleRatio) <= 0.25 &&
      candidateDistance < bestDistance
    ) {
      return candidate
    }

    return best
  })
}

export function getMascotPerch(
  scene: SceneTarget,
  mascotSize = { width: 96, height: 116 },
  margin = 18,
): MascotPoint {
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  const left = Math.max(
    margin,
    Math.min(
      viewportWidth - mascotSize.width - margin,
      scene.bounds.right - mascotSize.width - margin,
    ),
  )

  const top = Math.max(
    80,
    Math.min(
      viewportHeight - mascotSize.height - margin,
      scene.bounds.top + 90,
    ),
  )

  return { x: left, y: top }
}

export function findSceneByName(
  scenes: MascotScene[],
  name: string,
): MascotScene | null {
  const normalized = name.toLowerCase()

  return (
    scenes.find((scene) => {
      const id = scene.id.toLowerCase()

      return (
        id === normalized ||
        id.includes(normalized) ||
        DEFAULT_SCENES.some(
          (known) => id === known && normalized === known,
        )
      )
    }) ?? null
  )
}

export function getSceneByRoute(
  pathname: string,
  scenes: MascotScene[],
): MascotScene | null {
  const route = pathname
    .split("/")
    .filter(Boolean)[0] || "home"

  return (
    findSceneByName(scenes, route) ||
    findSceneByName(scenes, "hero") ||
    findSceneByName(scenes, "home") ||
    scenes[0] ||
    null
  )
}
