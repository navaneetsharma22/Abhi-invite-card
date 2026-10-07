import { useReducedMotion as useMotionPreference } from 'motion/react'
export function useReducedMotion() {
  return Boolean(useMotionPreference())
}
