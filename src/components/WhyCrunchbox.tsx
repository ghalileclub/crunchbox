import { motion, useReducedMotion } from 'framer-motion'
import { BENEFITS } from '../data/content'
import { Reveal, RevealItem } from './ui/Reveal'

const TINTS = ['#2D5BFF', '#FF4F8B', '#FFC53D', '#B6F23B', '#6B4226', '#2D5BFF', '#FF4F8B', '#FFC53D']

export function WhyCrunchbox() {
  const reduce = useReducedMotion()

  return (
    <section id="why" className="relative scroll-mt-24 bg-cream py-24 sm:py-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* Statement */}
          <Reveal>
            <div className="lg:sticky lg:top-28 lg:self-start">
              <span className="chip border-ink/10 bg-milk text-ink/60">Why Crunchbox</span>
              <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl">
                Cereal was never the problem.
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/65">
                The bowl, the milk, the spoon, and the cleanup were. Crunchbox deletes all four —
                so the only thing left is the part you actually liked.
              </p>
              <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-ink/10 bg-milk px-5 py-4 shadow-soft">
                <span className="font-display text-3xl font-extrabold text-electric">5s</span>
                <span className="text-sm font-semibold leading-tight text-ink/60">
                  from bag to bite.
                  <br />
                  No prep, no dishes.
                </span>
              </div>
            </div>
          </Reveal>

          {/* Benefit grid */}
          <Reveal stagger className="grid grid-cols-2 gap-4 sm:grid-cols-2">
            {BENEFITS.map((b, i) => {
              const Icon = b.icon
              const tint = TINTS[i % TINTS.length]
              return (
                <RevealItem key={b.label}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className="group flex h-full flex-col gap-4 rounded-3xl border border-ink/10 bg-milk p-5 shadow-soft sm:p-6"
                  >
                    <span
                      className="inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 group-hover:-rotate-6"
                      style={{ background: `${tint}1F`, color: tint }}
                    >
                      <Icon className="h-6 w-6" strokeWidth={2.4} />
                    </span>
                    <div>
                      <div className="font-display text-base font-extrabold leading-tight">
                        {b.label}
                      </div>
                    </div>
                    {!reduce && (
                      <span
                        className="mt-auto h-1 w-8 rounded-full opacity-50 transition-all duration-300 group-hover:w-12"
                        style={{ background: tint }}
                      />
                    )}
                  </motion.div>
                </RevealItem>
              )
            })}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
