import { useState, type PointerEvent } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { Check, Plus } from 'lucide-react'
import { FLAVORS, PACKS, type Flavor } from '../data/products'
import { useCart } from '../context/CartContext'
import { CrunchboxMockup } from './ui/CrunchboxMockup'
import { Reveal } from './ui/Reveal'

function ProductCard({ flavor, index }: { flavor: Flavor; index: number }) {
  const reduce = useReducedMotion()
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  // Subtle pointer tilt
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 200, damping: 18 })
  const sry = useSpring(ry, { stiffness: 200, damping: 18 })

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(px * 8)
    rx.set(-py * 8)
  }
  function onLeave() {
    rx.set(0)
    ry.set(0)
  }

  function handleAdd() {
    addItem({
      id: flavor.id,
      name: flavor.name,
      subtitle: 'Single box · 1',
      price: flavor.price,
      color: flavor.theme.body,
      colorAlt: flavor.theme.accent,
    })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1300)
  }

  return (
    <Reveal delay={(index % 3) * 0.06}>
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-4xl border border-ink/10 shadow-soft"
      >
        {/* Box stage */}
        <div
          className="relative flex h-64 items-end justify-center overflow-hidden pt-8"
          style={{ background: `radial-gradient(120% 90% at 50% 10%, ${flavor.theme.wash}, ${flavor.theme.wash}00 70%), ${flavor.theme.wash}` }}
        >
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-40 blur-2xl transition-opacity duration-300 group-hover:opacity-70"
            style={{ background: flavor.theme.accent }}
          />
          <motion.div
            animate={reduce ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 5 + (index % 3), repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-10 translate-y-6"
          >
            <CrunchboxMockup theme={flavor.theme} name={flavor.short} scale={0.62} />
          </motion.div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col bg-milk p-6">
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ background: flavor.theme.accent }}
            />
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-ink/50">
              {flavor.tagline}
            </span>
          </div>

          <h3 className="mt-2 font-display text-xl font-extrabold leading-tight tracking-tight">
            {flavor.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink/65">{flavor.description}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {flavor.badges.map((b) => (
              <span
                key={b}
                className="chip border-ink/10 bg-cream text-ink/70"
              >
                {b}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between gap-3 pt-2">
            <div className="leading-none">
              <span className="font-display text-2xl font-extrabold">
                ${flavor.price.toFixed(2)}
              </span>
              <span className="ml-1 text-xs font-semibold text-ink/45">/ box</span>
            </div>

            <motion.button
              onClick={handleAdd}
              whileTap={{ scale: 0.94 }}
              aria-label={`Add ${flavor.name} to cart`}
              className="relative inline-flex items-center gap-1.5 overflow-hidden rounded-full px-5 py-3 text-sm font-extrabold transition-colors"
              style={{
                background: added ? '#0B0B12' : flavor.theme.accent,
                color: added ? '#FFFBF5' : flavor.theme.accentText,
              }}
            >
              <motion.span
                key={added ? 'added' : 'add'}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="inline-flex items-center gap-1.5"
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4" strokeWidth={3} /> Added
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" strokeWidth={3} /> Add
                  </>
                )}
              </motion.span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Reveal>
  )
}

function PackCard({ index }: { index: number }) {
  const pack = PACKS[index]
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const accents = ['#FFC53D', '#2D5BFF', '#FF4F8B']
  const accent = accents[index % accents.length]

  function handleAdd() {
    addItem({
      id: pack.id,
      name: pack.name,
      subtitle: `${pack.size} boxes · mixed`,
      price: pack.price,
      color: accent,
      colorAlt: '#0B0B12',
    })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1300)
  }

  const perBox = pack.price / pack.size

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-milk/15 bg-navy/60 p-6 text-milk"
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-40 blur-2xl"
        style={{ background: accent }}
      />
      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-extrabold">{pack.name}</span>
          <span
            className="rounded-full px-2.5 py-1 text-[11px] font-extrabold text-ink"
            style={{ background: accent }}
          >
            {pack.size} boxes
          </span>
        </div>
        <p className="mt-2 text-sm text-milk/60">{pack.blurb}</p>
      </div>

      <div className="relative mt-6 flex items-end justify-between">
        <div className="leading-none">
          <div className="font-display text-2xl font-extrabold">${pack.price.toFixed(2)}</div>
          <div className="mt-1 text-xs font-semibold text-milk/45">
            ${perBox.toFixed(2)} per box
          </div>
        </div>
        <button
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 rounded-full bg-milk px-4 py-2.5 text-sm font-extrabold text-ink transition-transform hover:-translate-y-0.5 active:scale-95"
        >
          {added ? <Check className="h-4 w-4" strokeWidth={3} /> : <Plus className="h-4 w-4" strokeWidth={3} />}
          {added ? 'Added' : 'Add'}
        </button>
      </div>
    </motion.div>
  )
}

export function Flavors() {
  return (
    <section id="flavors" className="relative scroll-mt-24 bg-cream py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <div className="max-w-2xl">
            <span className="chip border-ink/10 bg-milk text-ink/60">Six flavors</span>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
              Pick your <span className="text-gradient">crunch</span>.
            </h2>
            <p className="mt-4 text-lg text-ink/60">
              Every box is the same clever two-chamber design. The only hard part is choosing a
              flavor — so don't, and grab the variety pack.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FLAVORS.map((f, i) => (
            <ProductCard key={f.id} flavor={f} index={i} />
          ))}
        </div>

        {/* Multipack band */}
        <Reveal>
          <div className="mt-12 overflow-hidden rounded-5xl bg-ink p-8 sm:p-10">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="font-display text-2xl font-extrabold tracking-tight text-milk sm:text-3xl">
                  Stock up and save
                </h3>
                <p className="mt-2 max-w-md text-milk/55">
                  Multipacks ship mixed by default. Want full control over flavors?{' '}
                  <a href="#build" className="font-bold text-lime underline-offset-4 hover:underline">
                    Build your own box ↓
                  </a>
                </p>
              </div>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {PACKS.map((_, i) => (
                <PackCard key={i} index={i} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
