import { motion, useReducedMotion } from 'framer-motion'
import { Wheat, Lock, Droplets, Utensils, Recycle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { FLAVORS } from '../data/products'
import { CrunchboxMockup } from './ui/CrunchboxMockup'
import { Reveal } from './ui/Reveal'

interface Spec {
  icon: LucideIcon
  title: string
  copy: string
  color: string
}

const LEFT: Spec[] = [
  {
    icon: Wheat,
    title: 'Cereal chamber',
    copy: 'Crunchy cereal sits sealed and bone-dry in the top compartment.',
    color: '#FFC53D',
  },
  {
    icon: Droplets,
    title: 'Milk chamber',
    copy: 'Shelf-stable milk waits below — no fridge required until you want it cold.',
    color: '#2D5BFF',
  },
]

const RIGHT: Spec[] = [
  {
    icon: Lock,
    title: 'Activation seal',
    copy: 'A pull-tab seal keeps the two apart, then releases on demand.',
    color: '#FF4F8B',
  },
  {
    icon: Utensils,
    title: 'Eat opening',
    copy: 'A wide mouth lets you eat straight from the box. No bowl, no spoon hunt.',
    color: '#B6F23B',
  },
]

function SpecCard({ spec, align, delay }: { spec: Spec; align: 'left' | 'right'; delay: number }) {
  const Icon = spec.icon
  return (
    <motion.div
      initial={{ opacity: 0, x: align === 'left' ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-start gap-3 ${align === 'left' ? 'lg:flex-row-reverse lg:text-right' : ''}`}
    >
      <span
        className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
        style={{ background: `${spec.color}1F`, color: spec.color }}
      >
        <Icon className="h-5 w-5" strokeWidth={2.4} />
      </span>
      <div>
        <div className="font-display text-base font-extrabold text-milk">{spec.title}</div>
        <p className="mt-1 text-sm leading-relaxed text-milk/55">{spec.copy}</p>
      </div>
    </motion.div>
  )
}

export function Innovation() {
  const reduce = useReducedMotion()
  const theme = FLAVORS[0].theme // Classic Frosted — gold pops on ink

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-milk sm:py-32">
      {/* Atmosphere */}
      <div className="grain-overlay opacity-[0.06]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-electric/20 blur-[120px]" />

      <div className="container-x relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="chip border-milk/15 bg-milk/5 text-milk/70">The engineering</span>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
              Engineered for the perfect{' '}
              <span className="text-lime">crunch window</span>.
            </h2>
            <p className="mt-4 text-lg text-milk/55">
              Two chambers, one seal, zero compromise. The cereal only meets the milk the exact
              second you decide.
            </p>
          </div>
        </Reveal>

        {/* Diagram */}
        <div className="mt-16 grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
          {/* Left specs */}
          <div className="order-2 flex flex-col gap-8 lg:order-1">
            {LEFT.map((s, i) => (
              <SpecCard key={s.title} spec={s} align="left" delay={0.1 + i * 0.1} />
            ))}
          </div>

          {/* Box */}
          <div className="order-1 flex justify-center lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Pedestal glow */}
              <div className="pointer-events-none absolute -inset-10 rounded-full bg-sun/10 blur-3xl" />
              <motion.div
                animate={reduce ? undefined : { y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <CrunchboxMockup theme={theme} name="Frosted" scale={1.05} activate />
              </motion.div>
            </motion.div>
          </div>

          {/* Right specs */}
          <div className="order-3 flex flex-col gap-8">
            {RIGHT.map((s, i) => (
              <SpecCard key={s.title} spec={s} align="right" delay={0.1 + i * 0.1} />
            ))}
          </div>
        </div>

        {/* Bottom rail */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-16 flex max-w-3xl flex-col items-center gap-4 rounded-3xl border border-milk/10 bg-milk/[0.04] px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-lime/15 text-lime">
                <Recycle className="h-5 w-5" strokeWidth={2.4} />
              </span>
              <div>
                <div className="font-display text-base font-extrabold">Recyclable shell</div>
                <p className="text-sm text-milk/55">
                  Designed for a widely-recyclable outer shell with minimal mixed materials.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {['Portable', 'No prep', 'Spill-resistant', 'Travel-safe'].map((t) => (
                <span key={t} className="chip border-milk/15 bg-transparent text-milk/70">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
