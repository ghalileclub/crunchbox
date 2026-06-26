import { useEffect, useState } from 'react'
import { motion, useSpring, useReducedMotion } from 'framer-motion'
import { Check, Repeat, Truck, ShoppingBag } from 'lucide-react'
import { FLAVORS, PACKS, SUBSCRIPTION_DISCOUNT } from '../data/products'
import { useCart } from '../context/CartContext'
import { CrunchboxMockup } from './ui/CrunchboxMockup'
import { Reveal } from './ui/Reveal'

function AnimatedPrice({ value }: { value: number }) {
  const reduce = useReducedMotion()
  const spring = useSpring(value, { stiffness: 140, damping: 22 })
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    if (reduce) {
      setDisplay(value)
      return
    }
    spring.set(value)
  }, [value, spring, reduce])

  useEffect(() => spring.on('change', (v) => setDisplay(v)), [spring])

  return <>${display.toFixed(2)}</>
}

export function BuildYourBox() {
  const reduce = useReducedMotion()
  const { addItem } = useCart()
  const [selected, setSelected] = useState<string[]>(['classic-frosted', 'cocoa-cloud', 'berry-blast'])
  const [packId, setPackId] = useState('pack-12')
  const [subscribe, setSubscribe] = useState(true)
  const [added, setAdded] = useState(false)

  const pack = PACKS.find((p) => p.id === packId)!
  const price = pack.price * (subscribe ? 1 - SUBSCRIPTION_DISCOUNT : 1)
  const saved = pack.price - price

  function toggleFlavor(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    )
  }

  const chosen = FLAVORS.filter((f) => selected.includes(f.id))
  const previewFlavors = chosen.length ? chosen : [FLAVORS[5]]

  function handleAdd() {
    if (!selected.length) return
    const label = chosen.map((f) => f.short).join(', ')
    addItem({
      id: `custom-${packId}-${subscribe ? 'sub' : 'once'}-${[...selected].sort().join('-')}`,
      name: `Custom ${pack.name}${subscribe ? ' · Subscription' : ''}`,
      subtitle: label,
      price: Number(price.toFixed(2)),
      color: chosen[0]?.theme.body ?? '#2D5BFF',
      colorAlt: chosen[0]?.theme.accent ?? '#FFC53D',
    })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1400)
  }

  return (
    <section id="build" className="relative scroll-mt-24 overflow-hidden bg-milk py-24 sm:py-32">
      <div className="grain-overlay" />
      <div className="container-x relative">
        <Reveal>
          <div className="max-w-2xl">
            <span className="chip border-ink/10 bg-cream text-ink/60">Build your box</span>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
              Your breakfast, <span className="text-gradient">your rules</span>.
            </h2>
            <p className="mt-4 text-lg text-ink/60">
              Mix flavors, choose a size, and decide how often it shows up. Subscribers crunch for
              15% less.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Controls */}
          <Reveal>
            <div className="rounded-5xl border border-ink/10 bg-cream p-6 shadow-soft sm:p-8">
              {/* Flavors */}
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-extrabold">1 · Choose flavors</h3>
                  <span className="text-sm font-semibold text-ink/45">
                    {selected.length} selected
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {FLAVORS.map((f) => {
                    const on = selected.includes(f.id)
                    return (
                      <button
                        key={f.id}
                        onClick={() => toggleFlavor(f.id)}
                        className="group relative inline-flex items-center gap-2 rounded-full border-2 px-4 py-2.5 text-sm font-bold transition-all"
                        style={{
                          borderColor: on ? f.theme.accent : 'rgba(11,11,18,0.12)',
                          background: on ? f.theme.accent : 'transparent',
                          color: on ? f.theme.accentText : '#0B0B12',
                        }}
                      >
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{
                            background: on ? f.theme.accentText : f.theme.body,
                            border: on
                              ? '2px solid transparent'
                              : '2px solid rgba(11,11,18,0.15)',
                          }}
                        />
                        {f.short}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="my-7 h-px bg-ink/10" />

              {/* Pack size */}
              <div>
                <h3 className="font-display text-lg font-extrabold">2 · Pick a size</h3>
                <div className="mt-4 grid grid-cols-3 gap-2.5">
                  {PACKS.map((p) => {
                    const on = p.id === packId
                    return (
                      <button
                        key={p.id}
                        onClick={() => setPackId(p.id)}
                        className={`relative overflow-hidden rounded-2xl border-2 px-3 py-4 text-center transition-all ${
                          on
                            ? 'border-ink bg-ink text-milk'
                            : 'border-ink/12 bg-milk text-ink hover:border-ink/30'
                        }`}
                      >
                        <div className="font-display text-2xl font-extrabold leading-none">
                          {p.size}
                        </div>
                        <div className="mt-1 text-[11px] font-bold uppercase tracking-wide opacity-60">
                          boxes
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="my-7 h-px bg-ink/10" />

              {/* Frequency */}
              <div>
                <h3 className="font-display text-lg font-extrabold">3 · How often?</h3>
                <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  <button
                    onClick={() => setSubscribe(false)}
                    className={`flex items-start gap-3 rounded-2xl border-2 p-4 text-left transition-all ${
                      !subscribe ? 'border-ink bg-ink/[0.03]' : 'border-ink/12 hover:border-ink/30'
                    }`}
                  >
                    <ShoppingBag className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={2.4} />
                    <span>
                      <span className="block font-extrabold">One-time</span>
                      <span className="text-sm text-ink/55">Just this box, no commitment.</span>
                    </span>
                  </button>
                  <button
                    onClick={() => setSubscribe(true)}
                    className={`relative flex items-start gap-3 rounded-2xl border-2 p-4 text-left transition-all ${
                      subscribe ? 'border-electric bg-electric/[0.06]' : 'border-ink/12 hover:border-ink/30'
                    }`}
                  >
                    <Repeat className="mt-0.5 h-5 w-5 shrink-0 text-electric" strokeWidth={2.4} />
                    <span>
                      <span className="flex items-center gap-2 font-extrabold">
                        Subscribe
                        <span className="rounded-full bg-lime px-2 py-0.5 text-[10px] font-extrabold text-ink">
                          SAVE 15%
                        </span>
                      </span>
                      <span className="text-sm text-ink/55">Every 2 weeks. Skip anytime.</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Summary / preview */}
          <Reveal delay={0.1}>
            <div className="sticky top-24 flex flex-col overflow-hidden rounded-5xl bg-ink p-6 text-milk shadow-lift sm:p-8">
              {/* Fanned preview */}
              <div className="relative flex h-44 items-center justify-center">
                {previewFlavors.slice(0, 4).map((f, i, arr) => {
                  const mid = (arr.length - 1) / 2
                  const offset = i - mid
                  return (
                    <motion.div
                      key={f.id}
                      initial={false}
                      animate={{
                        rotate: offset * 9,
                        x: offset * 38,
                        y: Math.abs(offset) * 8,
                      }}
                      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                      className="absolute"
                      style={{ zIndex: 10 - Math.abs(offset) }}
                    >
                      <CrunchboxMockup theme={f.theme} name={f.short} scale={0.4} />
                    </motion.div>
                  )
                })}
              </div>

              <div className="mt-8 space-y-3 border-t border-milk/10 pt-6 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-milk/55">Size</span>
                  <span className="font-bold">{pack.name}</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-milk/55">Flavors</span>
                  <span className="text-right font-bold">
                    {chosen.length ? chosen.map((f) => f.short).join(', ') : 'Surprise mix'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-milk/55">Plan</span>
                  <span className="font-bold">{subscribe ? 'Every 2 weeks' : 'One-time'}</span>
                </div>
              </div>

              <div className="mt-6 flex items-end justify-between border-t border-milk/10 pt-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wide text-milk/45">
                    {subscribe ? 'Per delivery' : 'Total'}
                  </div>
                  <div className="font-display text-4xl font-extrabold leading-none">
                    <AnimatedPrice value={price} />
                  </div>
                </div>
                {subscribe && (
                  <motion.div
                    key={saved.toFixed(2)}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="rounded-full bg-lime/15 px-3 py-1.5 text-sm font-extrabold text-lime"
                  >
                    Save ${saved.toFixed(2)}
                  </motion.div>
                )}
              </div>

              <motion.button
                onClick={handleAdd}
                disabled={!selected.length}
                whileTap={{ scale: selected.length ? 0.96 : 1 }}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime py-4 text-sm font-extrabold text-ink transition-[filter,opacity] hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4" strokeWidth={3} /> Added to cart
                  </>
                ) : selected.length ? (
                  <>Add custom box to cart</>
                ) : (
                  <>Pick at least one flavor</>
                )}
              </motion.button>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-milk/40">
                <Truck className="h-3.5 w-3.5" /> Free shipping on subscriptions
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
