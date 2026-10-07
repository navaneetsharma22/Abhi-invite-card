import { motion } from 'motion/react'
import { fadeUp, simpleFade } from '../../animations/motionVariants'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import SectionTitle from '../ui/SectionTitle'

export default function SectionShell({ id, eyebrow, title, children, theme = 'heritage', scriptTitle = false }) {
  const reducedMotion = useReducedMotion()
  return (
    <motion.section id={id} className={`section-shell theme-${theme} section-shell--${theme}`}
      aria-labelledby={`${id}-title`} variants={reducedMotion ? simpleFade : fadeUp}
      initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
      <div className="section-shell__content">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <SectionTitle id={`${id}-title`} script={scriptTitle}>{title}</SectionTitle>
        {children}
      </div>
    </motion.section>
  )
}
