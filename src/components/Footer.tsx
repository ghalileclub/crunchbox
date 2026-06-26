import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Instagram, ArrowRight, Check } from 'lucide-react'
import { useModal } from '../context/ModalContext'

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.82a4.28 4.28 0 0 1-1.05-2.82h-3.2v12.86a2.59 2.59 0 1 1-2.59-2.59c.27 0 .53.04.78.12V9.9a5.86 5.86 0 0 0-.78-.05 5.82 5.82 0 1 0 5.82 5.82V9.01a7.45 7.45 0 0 0 4.36 1.4V7.2a4.28 4.28 0 0 1-3.16-1.38z" />
    </svg>
  )
}

function FooterWordmark() {
  return (
    <a href="#top" className="flex items-center gap-2" aria-label="Crunchbox home">
      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-milk">
        <span className="flex gap-[2px]">
          <span className="h-1.5 w-1.5 rounded-full bg-sun" />
          <span className="h-1.5 w-1.5 rounded-full bg-berry" />
          <span className="h-1.5 w-1.5 rounded-full bg-electric" />
        </span>
      </span>
      <span className="font-display text-lg font-extrabold tracking-tight text-milk">Crunchbox</span>
    </a>
  )
}

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Shop',
    links: [
      { label: 'Flavors', href: '#flavors' },
      { label: 'Build your box', href: '#build' },
      { label: 'Multipacks', href: '#flavors' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'How it works', href: '#how' },
      { label: 'Why Crunchbox', href: '#why' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Waitlist', href: '#waitlist' },
      { label: 'Our story', href: '#why' },
      { label: 'Contact', href: '#waitlist' },
    ],
  },
]

export function Footer() {
  const { openModal } = useModal()
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return
    setDone(true)
  }

  return (
    <footer className="relative overflow-hidden bg-ink pt-20 text-milk">
      <div className="grain-overlay opacity-[0.05]" />
      <div className="container-x relative">
        <div className="grid gap-12 pb-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand + newsletter */}
          <div className="max-w-sm">
            <FooterWordmark />
            <p className="mt-4 text-milk/55">
              The bowl-free breakfast box. Crunchy cereal, cold milk, zero mess — anywhere mornings
              take you.
            </p>

            <div className="mt-6">
              <div className="text-sm font-bold uppercase tracking-wide text-milk/45">
                Get launch updates
              </div>
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div
                    key="ok"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 flex items-center gap-2 rounded-2xl border border-lime/30 bg-lime/10 px-4 py-3 text-sm font-bold text-lime"
                  >
                    <Check className="h-4 w-4" strokeWidth={3} /> You're subscribed.
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 flex items-center gap-2 rounded-2xl border border-milk/15 bg-milk/5 p-1.5 focus-within:border-milk/30"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      aria-label="Email for newsletter"
                      className="w-full bg-transparent px-3 py-2 text-sm font-semibold text-milk outline-none placeholder:text-milk/35"
                    />
                    <button
                      type="submit"
                      aria-label="Subscribe"
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-lime text-ink transition-transform hover:-translate-y-0.5 active:scale-95"
                    >
                      <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Crunchbox on Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-milk/15 text-milk/70 transition-colors hover:bg-milk hover:text-ink"
              >
                <Instagram className="h-5 w-5" strokeWidth={2.2} />
              </a>
              <a
                href="#"
                aria-label="Crunchbox on TikTok"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-milk/15 text-milk/70 transition-colors hover:bg-milk hover:text-ink"
              >
                <TikTokIcon className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="text-sm font-bold uppercase tracking-wide text-milk/45">
                {col.title}
              </div>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-milk/70 transition-colors hover:text-milk"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-milk/10 py-8 sm:flex-row">
          <p className="font-display text-lg font-extrabold tracking-tight">
            Soggy cereal is cancelled.
          </p>
          <button
            onClick={() => openModal()}
            className="inline-flex items-center gap-2 rounded-full bg-milk px-5 py-3 text-sm font-extrabold text-ink transition-transform hover:-translate-y-0.5 active:scale-95"
          >
            Pre-order now
            <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
          </button>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-milk/10 py-8 text-sm text-milk/40 sm:flex-row">
          <span>© {new Date().getFullYear()} Crunchbox. All rights reserved.</span>
          <span className="flex items-center gap-4">
            <a href="#" className="transition-colors hover:text-milk/70">Privacy</a>
            <a href="#" className="transition-colors hover:text-milk/70">Terms</a>
            <span className="text-milk/25">Demo experience · not a real store</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
