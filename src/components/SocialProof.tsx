import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { TESTIMONIALS, MARQUEE_ITEMS } from '../data/content'
import { Marquee } from './Marquee'
import { Reveal, RevealItem } from './ui/Reveal'

export function SocialProof() {
  return (
    <section className="relative overflow-hidden bg-milk py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <span className="chip border-ink/10 bg-cream text-ink/60">The internet agrees</span>
              <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
                Breakfast people are{' '}
                <span className="text-gradient">already obsessed</span>.
              </h2>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-ink/10 bg-cream px-4 py-3">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-sun text-sun" strokeWidth={0} />
                ))}
              </div>
              <span className="text-sm font-bold text-ink/70">Loved in early testing</span>
            </div>
          </div>
        </Reveal>

        <Reveal stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <RevealItem key={t.name}>
              <motion.figure
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="flex h-full flex-col justify-between rounded-3xl border border-ink/10 bg-cream p-6 shadow-soft"
              >
                <div>
                  <span
                    className="inline-flex h-10 w-10 items-center justify-center rounded-2xl"
                    style={{ background: `${t.accent}1F`, color: t.accent }}
                  >
                    <Quote className="h-5 w-5 fill-current" strokeWidth={0} />
                  </span>
                  <blockquote className="mt-4 font-display text-lg font-bold leading-snug tracking-tight text-ink">
                    “{t.quote}”
                  </blockquote>
                </div>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full font-display text-sm font-extrabold text-milk"
                    style={{ background: t.accent }}
                  >
                    {t.name.charAt(0)}
                  </span>
                  <span className="text-sm">
                    <span className="font-extrabold text-ink">{t.name}</span>
                    <span className="block text-ink/45">{t.meta}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </RevealItem>
          ))}
        </Reveal>
      </div>

      {/* Secondary ticker */}
      <div className="mt-16 -rotate-1">
        <Marquee
          items={MARQUEE_ITEMS}
          duration={28}
          reverse
          separator="star"
          className="border-y border-ink/10 bg-electric py-4 text-milk"
          textClassName="font-display text-base font-extrabold uppercase tracking-tight sm:text-lg"
        />
      </div>
    </section>
  )
}
