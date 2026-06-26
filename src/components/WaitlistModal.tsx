import { useEffect, useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, ArrowRight, Mail } from 'lucide-react'
import { useModal } from '../context/ModalContext'

export function WaitlistModal() {
  const { isOpen, config, closeModal } = useModal()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  // Reset internal state whenever the modal opens fresh
  useEffect(() => {
    if (isOpen) {
      setSubmitted(false)
      setError(false)
      setEmail('')
    }
  }, [isOpen])

  // Esc to close
  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, closeModal])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(true)
      return
    }
    setError(false)
    setSubmitted(true)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={closeModal} />

          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="relative w-full max-w-md overflow-hidden rounded-4xl bg-cream shadow-lift"
            role="dialog"
            aria-modal="true"
            aria-label={config.title}
          >
            {/* Accent header */}
            <div className="relative overflow-hidden bg-ink px-6 pb-8 pt-7 text-milk">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-berry/30 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-12 left-0 h-40 w-40 rounded-full bg-electric/30 blur-2xl" />
              <button
                onClick={closeModal}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-milk/10 text-milk transition-colors hover:bg-milk/20"
              >
                <X className="h-5 w-5" strokeWidth={2.4} />
              </button>
              <div className="relative">
                {config.eyebrow && (
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-milk/55">
                    {config.eyebrow}
                  </span>
                )}
                <h2 className="mt-2 font-display text-2xl font-extrabold leading-tight tracking-tight">
                  {config.title}
                </h2>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-6">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="ok"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-4 py-4 text-center"
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
                      <div className="font-display text-xl font-extrabold">You're on the list.</div>
                      <p className="mt-1 text-ink/60">
                        Crunch is coming. We'll email you the second boxes ship.
                      </p>
                    </div>
                    <button
                      onClick={closeModal}
                      className="mt-2 rounded-full bg-ink px-6 py-3 text-sm font-extrabold text-milk transition-transform hover:-translate-y-0.5 active:scale-95"
                    >
                      Done
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="text-ink/65">{config.subtitle}</p>
                    <div className="relative mt-4">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/35" />
                      <input
                        type="email"
                        autoFocus
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (error) setError(false)
                        }}
                        placeholder="you@email.com"
                        aria-label="Email address"
                        className="w-full rounded-2xl border-2 border-ink/10 bg-milk py-3.5 pl-12 pr-4 text-base font-semibold text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-electric"
                      />
                    </div>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm font-semibold text-berry"
                      >
                        Please enter a valid email.
                      </motion.p>
                    )}
                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.97 }}
                      className="group mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-electric py-3.5 text-sm font-extrabold text-milk transition-[filter] hover:brightness-110"
                    >
                      Get early access
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.6} />
                    </motion.button>
                    <p className="mt-3 text-center text-xs text-ink/40">
                      Demo only — your email stays in your browser.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
