import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { FAQS } from '../data/content'
import { Reveal } from './ui/Reveal'

function FaqRow({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-ink/10">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="font-display text-lg font-extrabold tracking-tight text-ink sm:text-xl">
          {q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
            isOpen ? 'bg-electric text-milk' : 'bg-cream text-ink'
          }`}
        >
          <Plus className="h-5 w-5" strokeWidth={2.6} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 pr-12 text-[15px] leading-relaxed text-ink/65">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative scroll-mt-24 bg-milk py-24 sm:py-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28 lg:self-start">
              <span className="chip border-ink/10 bg-cream text-ink/60">FAQ</span>
              <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
                Good questions.<br />Honest answers.
              </h2>
              <p className="mt-4 max-w-sm text-lg text-ink/60">
                Still curious? Join the waitlist and we'll keep you posted as launch gets closer.
              </p>
              <a
                href="#waitlist"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-extrabold text-milk transition-transform hover:-translate-y-0.5 active:scale-95"
              >
                Join the waitlist
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              {FAQS.map((f, i) => (
                <FaqRow
                  key={f.q}
                  q={f.q}
                  a={f.a}
                  isOpen={open === i}
                  onToggle={() => setOpen((cur) => (cur === i ? null : i))}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
