import { motion, useReducedMotion } from 'framer-motion'
import { STEPS } from '../data/content'
import { Reveal } from './ui/Reveal'
import { CerealShape, type CerealShapeKind } from './ui/Cereal'

const PALETTE = ['#FFC53D', '#FF4F8B', '#2D5BFF', '#B6F23B', '#6B4226']
const KINDS: CerealShapeKind[] = ['ring', 'circle', 'square', 'star', 'pill']

function MilkPool() {
  return (
    <div className="absolute inset-x-0 bottom-0 h-[38%] overflow-hidden rounded-b-3xl">
      <div className="absolute inset-0 bg-gradient-to-b from-milk to-[#F1E7D2]" />
      <div className="absolute inset-x-0 top-0 h-3 -translate-y-1/2 rounded-full bg-white/70 blur-[3px]" />
    </div>
  )
}

function StepVisual({ variant }: { variant: number }) {
  const reduce = useReducedMotion()

  // Static cereal positions per variant
  const topCluster = [
    { x: '22%', y: '14%', s: 22, c: 0, k: 0 },
    { x: '52%', y: '10%', s: 18, c: 1, k: 1 },
    { x: '68%', y: '20%', s: 20, c: 2, k: 2 },
    { x: '38%', y: '26%', s: 16, c: 3, k: 3 },
    { x: '58%', y: '30%', s: 17, c: 4, k: 1 },
  ]

  const inMilk = [
    { x: '24%', y: '64%', s: 20, c: 0, k: 0 },
    { x: '44%', y: '68%', s: 18, c: 1, k: 1 },
    { x: '62%', y: '63%', s: 19, c: 2, k: 2 },
    { x: '74%', y: '70%', s: 15, c: 3, k: 3 },
    { x: '34%', y: '72%', s: 16, c: 4, k: 4 },
  ]

  return (
    <div className="relative h-52 w-full overflow-hidden rounded-3xl border border-ink/10 bg-gradient-to-b from-[#FFFDF8] to-[#FBF3E4] shadow-inner">
      <MilkPool />

      {/* Divider / seal */}
      <div
        className={`absolute inset-x-5 top-[46%] border-t-2 border-dashed transition-all ${
          variant === 0 ? 'border-ink/30' : 'border-ink/10'
        }`}
      />

      {/* Separate: cereal sealed up top */}
      {variant === 0 &&
        topCluster.map((p, i) => (
          <div key={i} className="absolute animate-floaty" style={{ left: p.x, top: p.y, animationDelay: `${i * 0.3}s` }}>
            <CerealShape kind={KINDS[p.k]} color={PALETTE[p.c]} size={p.s} rotate={i * 25} />
          </div>
        ))}

      {/* Activate: cereal dropping into milk */}
      {variant === 1 &&
        topCluster.map((p, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: p.x, top: 0 }}
            initial={{ y: 20, opacity: 0 }}
            animate={reduce ? { y: 110, opacity: 1 } : { y: [10, 120], opacity: [0, 1, 1, 0.9] }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 1.4, delay: i * 0.22, repeat: Infinity, repeatDelay: 1.1, ease: 'easeIn' }
            }
          >
            <CerealShape kind={KINDS[p.k]} color={PALETTE[p.c]} size={p.s} rotate={i * 30} />
          </motion.div>
        ))}

      {/* Crunch: cereal floating in milk */}
      {variant === 2 &&
        inMilk.map((p, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: p.x, top: p.y }}
            animate={reduce ? undefined : { y: [0, -4, 0], rotate: [0, 6, 0] }}
            transition={{ duration: 2.4 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <CerealShape kind={KINDS[p.k]} color={PALETTE[p.c]} size={p.s} rotate={i * 18} />
          </motion.div>
        ))}
    </div>
  )
}

export function HowItWorks() {
  return (
    <section id="how" className="relative py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="chip mx-auto mb-4 border-ink/15 bg-milk text-ink/70">
            <span className="h-2 w-2 rounded-full bg-electric" />
            How it works
          </p>
          <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Open. Drop. Crunch.
          </h2>
          <p className="mt-4 text-ink/65 sm:text-lg">
            Three moves between you and the freshest bowl of cereal you’ve never had to wash.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.k} delay={i * 0.12}>
              <div className="group flex h-full flex-col rounded-[1.75rem] border border-ink/10 bg-milk p-5 shadow-soft transition-shadow hover:shadow-lift">
                <StepVisual variant={i} />
                <div className="mt-5 flex items-center gap-3">
                  <span className="font-display text-2xl font-extrabold text-ink/20">{step.k}</span>
                  <h3 className="font-display text-xl font-bold">{step.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{step.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
