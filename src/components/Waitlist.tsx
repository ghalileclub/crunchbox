import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, Mail, ChevronDown } from 'lucide-react'
import { WAITLIST_PLACES } from '../data/content'
import { CerealShape, cerealField } from './ui/Cereal'

const AMBIENT = cerealField(10, 91)
const COLORS = ['#FFC53D', '#FF4F8B', '#B6F23B', '#FFFBF5']

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

export function Waitlist() {
  const [email, setEmail] = useState('')
  const [place, setPlace] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isEmail(email)) {
      setError(true)
      return
    }
    setError(false)
    setSubmitted(true)
  }

  return (
    <section id="waitlist" className="relative scroll-mt-24 bg-cream px-5 py-20 sm:px-8 sm:py-28">
      <div className="container-x !px-0">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-ink px-6 py-16 sm:px-12 sm:py-20">
          {/* Atmosphere */}
          <div className="grain-overlay opacity-[0.07]" />
          <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-berry/30 blur-[100px]" />
          <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-electric/30 blur-[100px]" />

          {/* Floating cereal */}
          <div className="pointer-events-none absolute inset-0">
            {AMBIENT.map((p, i) => (
              <div
                key={i}
                className="absolute animate-floaty opacity-80"
                style={{ top: `${p.top}%`, left: `${p.left}%`, animationDelay: `${p.delay}s` }}
              >
                <CerealShape kind={p.kind} color={COLORS[i % COLORS.length]} size={p.size} rotate={p.rotate} />
              </div>
            ))}
          </div>

          <div className="relative mx-auto max-w-xl text-center">
            <span className="chip border-milk/15 bg-milk/5 text-milk/70">Early access</span>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-milk sm:text-5xl">
              Be first to crunch.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-lg text-milk/55">
              Join the waitlist for launch-day pricing and first dibs when boxes ship. No spam, just
              crunch.
            </p>

            <div className="mt-10">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-3xl border border-lime/30 bg-lime/10 px-6 py-10"
                  >
                    <motion.span
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 320, damping: 16, delay: 0.05 }}
                      className="flex h-14 w-14 items-center justify-center rounded-full bg-lime text-ink"
                    >
                      <Check className="h-7 w-7" strokeWidth={3} />
                    </motion.span>
                    <div>
                      <div className="font-display text-2xl font-extrabold text-milk">
                        You're on the list.
                      </div>
                      <p className="mt-1 text-milk/60">Crunch is coming. We'll email you first.</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mx-auto flex max-w-md flex-col gap-3"
                  >
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/35" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (error) setError(false)
                        }}
                        placeholder="you@email.com"
                        aria-label="Email address"
                        className="w-full rounded-2xl border-2 border-transparent bg-milk py-4 pl-12 pr-4 text-base font-semibold text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-electric"
                      />
                    </div>

                    <div className="relative">
                      <select
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                        aria-label="Where would you eat Crunchbox?"
                        className="w-full appearance-none rounded-2xl border-2 border-transparent bg-milk py-4 pl-4 pr-10 text-base font-semibold text-ink outline-none transition-colors focus:border-electric"
                        style={{ color: place ? '#0B0B12' : 'rgba(11,11,18,0.4)' }}
                      >
                        <option value="" disabled>
                          Where would you eat Crunchbox?
                        </option>
                        {WAITLIST_PLACES.map((p) => (
                          <option key={p} value={p} style={{ color: '#0B0B12' }}>
                            {p}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/40" />
                    </div>

                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-left text-sm font-semibold text-berry"
                      >
                        Please enter a valid email.
                      </motion.p>
                    )}

                    <motion.button
                      type="submit"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className="group mt-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-lime py-4 text-base font-extrabold text-ink transition-[filter] hover:brightness-105"
                    >
                      Join the waitlist
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={2.6} />
                    </motion.button>
                    <p className="mt-1 text-xs text-milk/40">
                      No backend here — this is an MVP demo. Your email stays in the browser.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
