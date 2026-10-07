const referenceFrame = 1000 / 60
// Two-stage damping: the pointer target is eased first, then each layer eases toward it.
// This removes the velocity "kick" a single lerp produces when the cursor starts moving.
const targetLerp = .06
const layerLerp = .045
const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

function limitOffset(x, y, limit) {
  const distance = Math.hypot(x, y)
  const factor = distance > limit ? limit / distance : 1
  return { x: x * factor, y: y * factor }
}

const ease = (current, target, factor) => current + (target - current) * factor

// Parallax touches ONLY the inner background and couple wrappers.
// Entrance transforms live on their parents (.hero-camera-plane / .hero-couple),
// so each element has exactly one transform writer. Text and UI are never moved here.
export function createHeroMotion(root) {
  const stage = root.querySelector('.hero-stage')
  const background = root.querySelector('.hero-background-motion')
  const couple = root.querySelector('.hero-couple-motion')
  if (!stage || !background || !couple) return () => {}

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const desktopPointer = window.matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)')

  const layers = [
    { element: background, x: 0, y: 0, rx: NaN, ry: NaN, max: 2.5, rangeX: 2.5, rangeY: 1.6 },
    { element: couple, x: 0, y: 0, rx: NaN, ry: NaN, max: 5, rangeX: 5, rangeY: 2.6 },
  ]

  const write = (layer) => {
    // Round to 1/100px so we skip no-op style writes but keep sub-pixel smoothness.
    const rx = Math.round(layer.x * 100) / 100
    const ry = Math.round(layer.y * 100) / 100
    if (rx === layer.rx && ry === layer.ry) return
    layer.rx = rx
    layer.ry = ry
    layer.element.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
  }

  let pointerEnabled = false
  let rawX = 0
  let rawY = 0
  let smoothX = 0
  let smoothY = 0
  let bounds = stage.getBoundingClientRect()
  let inView = bounds.bottom > 0 && bounds.top < window.innerHeight
  let frameId = 0
  let previousFrame = 0
  let elapsed = 0
  let disposed = false

  const resetPointer = () => { rawX = 0; rawY = 0 }
  const updatePointer = (event) => {
    if (event.pointerType !== 'mouse') return
    const x = clamp(((event.clientX - bounds.left) / Math.max(bounds.width, 1)) * 2 - 1, -1, 1)
    const y = clamp(((event.clientY - bounds.top) / Math.max(bounds.height, 1)) * 2 - 1, -1, 1)
    const target = limitOffset(x, y, 1)
    rawX = target.x
    rawY = target.y
  }
  const refreshBounds = () => { bounds = stage.getBoundingClientRect() }

  const updateInputMode = () => {
    const enabled = !reducedMotion.matches && desktopPointer.matches && navigator.maxTouchPoints === 0
    if (enabled === pointerEnabled) return
    stage.removeEventListener('pointermove', updatePointer)
    stage.removeEventListener('pointerleave', resetPointer)
    stage.removeEventListener('pointerenter', refreshBounds)
    pointerEnabled = enabled
    resetPointer()
    if (enabled) {
      stage.addEventListener('pointerenter', refreshBounds, { passive: true })
      stage.addEventListener('pointermove', updatePointer, { passive: true })
      stage.addEventListener('pointerleave', resetPointer, { passive: true })
    }
  }

  const renderFrame = (timestamp) => {
    const delta = previousFrame ? clamp(timestamp - previousFrame, 0, 32) : referenceFrame
    previousFrame = timestamp
    elapsed += delta
    const step = delta / referenceFrame
    // Frame-rate independent damping; never catches up in one jump after a pause.
    const targetFactor = 1 - Math.pow(1 - targetLerp, step)
    const layerFactor = 1 - Math.pow(1 - layerLerp, step)

    smoothX = ease(smoothX, pointerEnabled ? rawX : 0, targetFactor)
    smoothY = ease(smoothY, pointerEnabled ? rawY : 0, targetFactor)

    // Very slow ambient drift on the background only (~70s cycle, ≤ ~1px).
    const phase = elapsed * Math.PI * 2 / 70000
    const ambientX = Math.sin(phase) * .9
    const ambientY = Math.sin(phase * .7 + 1.3) * .5

    const [bg, cp] = layers
    const bgTarget = limitOffset(smoothX * bg.rangeX + ambientX, smoothY * bg.rangeY + ambientY, bg.max)
    const cpTarget = pointerEnabled
      ? limitOffset(smoothX * cp.rangeX, smoothY * cp.rangeY, cp.max)
      : { x: 0, y: 0 }

    bg.x = ease(bg.x, bgTarget.x, layerFactor)
    bg.y = ease(bg.y, bgTarget.y, layerFactor)
    cp.x = ease(cp.x, cpTarget.x, layerFactor)
    cp.y = ease(cp.y, cpTarget.y, layerFactor)
    write(bg)
    write(cp)

    frameId = window.requestAnimationFrame(renderFrame)
  }

  const stop = () => {
    window.cancelAnimationFrame(frameId)
    frameId = 0
    previousFrame = 0
  }
  const syncPlayback = () => {
    updateInputMode()
    if (disposed || reducedMotion.matches || document.hidden || !inView) {
      stop()
      if (reducedMotion.matches) {
        smoothX = 0
        smoothY = 0
        layers.forEach((layer) => {
          layer.x = 0
          layer.y = 0
          write(layer)
        })
      }
      return
    }
    if (!frameId) frameId = window.requestAnimationFrame(renderFrame)
  }
  const handleResize = () => {
    refreshBounds()
    syncPlayback()
  }
  const handleVisibility = () => {
    resetPointer()
    syncPlayback()
  }
  const observer = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting
    syncPlayback()
  })

  layers.forEach(write)
  observer.observe(stage)
  window.addEventListener('resize', handleResize, { passive: true })
  document.addEventListener('visibilitychange', handleVisibility)
  reducedMotion.addEventListener('change', syncPlayback)
  desktopPointer.addEventListener('change', syncPlayback)
  syncPlayback()

  return () => {
    disposed = true
    stop()
    observer.disconnect()
    stage.removeEventListener('pointerenter', refreshBounds)
    stage.removeEventListener('pointermove', updatePointer)
    stage.removeEventListener('pointerleave', resetPointer)
    window.removeEventListener('resize', handleResize)
    document.removeEventListener('visibilitychange', handleVisibility)
    reducedMotion.removeEventListener('change', syncPlayback)
    desktopPointer.removeEventListener('change', syncPlayback)
    layers.forEach(({ element }) => { element.style.transform = '' })
  }
}
