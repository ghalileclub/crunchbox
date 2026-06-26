import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useSpring } from 'framer-motion'
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useModal, CHECKOUT_MODAL } from '../context/ModalContext'

function Subtotal({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 160, damping: 24 })
  const [display, setDisplay] = useState(value)
  useEffect(() => {
    spring.set(value)
  }, [value, spring])
  useEffect(() => spring.on('change', (v) => setDisplay(v)), [spring])
  return <>${display.toFixed(2)}</>
}

export function CartDrawer() {
  const { items, isOpen, close, subtotal, count, setQty, removeItem } = useCart()
  const { openModal } = useModal()

  // Lock scroll + Esc to close
  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, close])

  function handleCheckout() {
    close()
    openModal(CHECKOUT_MODAL)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={close} />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-lift"
            role="dialog"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" strokeWidth={2.4} />
                <h2 className="font-display text-lg font-extrabold tracking-tight">
                  Your box{count > 0 ? ` · ${count}` : ''}
                </h2>
              </div>
              <button
                onClick={close}
                aria-label="Close cart"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-milk transition-transform hover:-translate-y-0.5 active:scale-95"
              >
                <X className="h-5 w-5" strokeWidth={2.4} />
              </button>
            </div>

            {/* Items */}
            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-milk shadow-soft">
                  <ShoppingBag className="h-9 w-9 text-ink/30" strokeWidth={1.8} />
                </span>
                <p className="mt-6 font-display text-xl font-extrabold">Your box is empty</p>
                <p className="mt-2 text-ink/55">Add a flavor or build a custom box to get started.</p>
                <a
                  href="#flavors"
                  onClick={close}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-extrabold text-milk transition-transform hover:-translate-y-0.5 active:scale-95"
                >
                  Shop flavors
                  <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
                </a>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <ul className="space-y-3">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="flex gap-4 rounded-3xl border border-ink/10 bg-milk p-3">
                          {/* Thumbnail */}
                          <div
                            className="relative h-20 w-16 shrink-0 overflow-hidden rounded-2xl"
                            style={{
                              background: `linear-gradient(150deg, ${item.color}, ${item.colorAlt ?? item.color})`,
                            }}
                          >
                            <div className="absolute inset-x-2 top-2 h-7 rounded-lg bg-white/25" />
                            <div className="absolute inset-x-0 bottom-0 h-7 bg-white/70" />
                          </div>

                          <div className="flex flex-1 flex-col">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <div className="truncate font-display text-sm font-extrabold leading-tight">
                                  {item.name}
                                </div>
                                {item.subtitle && (
                                  <div className="mt-0.5 truncate text-xs text-ink/50">
                                    {item.subtitle}
                                  </div>
                                )}
                              </div>
                              <button
                                onClick={() => removeItem(item.id)}
                                aria-label={`Remove ${item.name}`}
                                className="shrink-0 rounded-full p-1 text-ink/40 transition-colors hover:bg-ink/5 hover:text-berry"
                              >
                                <X className="h-4 w-4" strokeWidth={2.4} />
                              </button>
                            </div>

                            <div className="mt-auto flex items-center justify-between pt-2">
                              <div className="flex items-center gap-1 rounded-full border border-ink/15 bg-cream p-1">
                                <button
                                  onClick={() => setQty(item.id, item.qty - 1)}
                                  aria-label="Decrease quantity"
                                  className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-ink hover:text-milk"
                                >
                                  <Minus className="h-3.5 w-3.5" strokeWidth={2.8} />
                                </button>
                                <span className="w-6 text-center text-sm font-extrabold tabular-nums">
                                  {item.qty}
                                </span>
                                <button
                                  onClick={() => setQty(item.id, item.qty + 1)}
                                  aria-label="Increase quantity"
                                  className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-ink hover:text-milk"
                                >
                                  <Plus className="h-3.5 w-3.5" strokeWidth={2.8} />
                                </button>
                              </div>
                              <div className="font-display text-sm font-extrabold">
                                ${(item.price * item.qty).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              </div>
            )}

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-ink/10 bg-cream px-6 py-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-ink/55">Subtotal</span>
                  <span className="font-display text-2xl font-extrabold tabular-nums">
                    <Subtotal value={subtotal} />
                  </span>
                </div>
                <p className="mt-1 text-xs text-ink/45">Shipping & taxes calculated at checkout.</p>
                <motion.button
                  onClick={handleCheckout}
                  whileTap={{ scale: 0.97 }}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-electric py-4 text-sm font-extrabold text-milk transition-[filter] hover:brightness-110"
                >
                  Checkout
                  <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
                </motion.button>
                <button
                  onClick={close}
                  className="mt-2 w-full py-2 text-sm font-semibold text-ink/50 transition-colors hover:text-ink"
                >
                  Keep shopping
                </button>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
