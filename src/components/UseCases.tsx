import { motion } from 'framer-motion'
import { USE_CASES } from '../data/content'
import { Reveal, RevealItem } from './ui/Reveal'

export function UseCases() {
  return (
    <section className="relative scroll-mt-24 bg-cream py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <div className="max-w-2xl">
            <span className="chip border-ink/10 bg-milk text-ink/60">Anywhere, honestly</span>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
              Made for mornings <span className="text-gradient">on the move</span>.
            </h2>
            <p className="mt-4 text-lg text-ink/60">
              If you can hold it with one hand, you can have breakfast there.
            </p>
          </div>
        </Reveal>

        <Reveal stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {USE_CASES.map((u, i) => {
            const Icon = u.icon
            // First card spans wide on large screens for rhythm
            const wide = i === 0
            return (
              <RevealItem key={u.title} className={wide ? 'sm:col-span-2' : ''}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="group relative flex h-full min-h-[180px] flex-col justify-between overflow-hidden rounded-3xl border border-ink/10 bg-milk p-6 shadow-soft"
                >
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-40"
                    style={{ background: u.tint }}
                  />
                  <span
                    className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 group-hover:-rotate-6"
                    style={{ background: `${u.tint}1F`, color: u.tint }}
                  >
                    <Icon className="h-6 w-6" strokeWidth={2.4} />
                  </span>
                  <div className="relative mt-6">
                    <h3 className="font-display text-xl font-extrabold tracking-tight">
                      {u.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{u.copy}</p>
                  </div>
                </motion.div>
              </RevealItem>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
