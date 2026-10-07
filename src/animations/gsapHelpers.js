import { gsap } from 'gsap'

// Call context.revert() in the effect cleanup when adding a timeline.
export function createSectionAnimation(callback, scope) {
  return gsap.context(callback, scope)
}
