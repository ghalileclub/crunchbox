import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { NAV_LINKS } from '../data/content'
import { useCart } from '../context/CartContext'
import { useModal } from '../context/ModalContext'

function Wordmark() {
  return (
    <a href="#top" className="flex items-center gap-2" aria-label="Crunchbox home">
      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-ink">
        <span className="flex gap-[2px]">
          <span className="h-1.5 w-1.5 rounded-full bg-sun" />
          <span className="h-1.5 w-1.5 rounded-full bg-berry" />
          <span className="h-1.5 w-1.5 rounded-full bg-electric" />
        </span>
      </span>
      <span className="font-display text-lg font-extrabold tracking-tight">Crunchbox</span>
    </a>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { count, toggle } = useCart()
  const { openModal } = useModal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-2.5' : 'py-4'
        }`}
      >
        <div className="container-x">
          <div
            className={`flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 ${
              scrolled
                ? 'glass border border-ink/10 shadow-soft'
                : 'border border-transparent'
            }`}
          >
            <Wordmark />

            <nav className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="rounded-full px-3.5 py-2 text-sm font-semibold text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={() => openModal()}
                className="hidden rounded-full bg-ink px-4 py-2.5 text-sm font-extrabold text-milk transition-transform hover:-translate-y-0.5 active:scale-95 sm:inline-flex"
              >
                Pre-order
              </button>

              <button
                onClick={toggle}
                aria-label={`Open cart, ${count} items`}
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-milk transition-transform hover:-translate-y-0.5 active:scale-95"
              >
                <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={2.4} />
                <AnimatePresence>
                  {count > 0 && (
                    <motion.span
                      key={count}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-berry px-1 text-[11px] font-extrabold text-milk"
                    >
                      {count}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-milk lg:hidden"
              >
                <Menu className="h-5 w-5" strokeWidth={2.4} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] lg:hidden"
          >
            <div className="absolute inset-0 bg-ink/40" onClick={() => setMenuOpen(false)} />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-cream p-6"
            >
              <div className="flex items-center justify-between">
                <Wordmark />
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-milk"
                >
                  <X className="h-5 w-5" strokeWidth={2.4} />
                </button>
              </div>

              <div className="mt-8 flex flex-col gap-1">
                {NAV_LINKS.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05 }}
                    className="rounded-2xl px-4 py-3.5 font-display text-xl font-bold transition-colors hover:bg-ink/5"
                  >
                    {l.label}
                  </motion.a>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMenuOpen(false)
                    openModal()
                  }}
                  className="w-full rounded-full bg-ink py-3.5 text-sm font-extrabold text-milk"
                >
                  Pre-order now
                </button>
                <a
                  href="#flavors"
                  onClick={() => setMenuOpen(false)}
                  className="w-full rounded-full bg-electric py-3.5 text-center text-sm font-extrabold text-milk"
                >
                  Shop Crunchbox
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
