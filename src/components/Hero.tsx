import { useRef, type MouseEvent } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { Button } from './ui/Button'
import { CrunchboxMockup } from './ui/CrunchboxMockup'
import { CerealShape, type CerealShapeKind } from './ui/Cereal'
import { FLAVORS } from '../data/products'

const heroTheme = FLAVORS.find((f) => f.id === 'variety-pack')!.theme

interface FloatPiece {
  kind: CerealShapeKind
  color: string
  size: number
  top: string
  left: string
  depth: number
  rotate: number
}

const FLOATERS: FloatPiece[] = [
  { kind: 'ring', color: '#FFC53D', size: 34, top: '12%', left: '6%', depth: 1.4, rotate: 12 },
  { kind: 'circle', color: '#FF4F8B', size: 26, top: '24%', left: '88%', depth: 1.8, rotate: 0 },
  { kind: 'square', color: '#2D5BFF', size: 24, top: '70%', left: '4%', depth: 1.1, rotate: 24 },
  { kind: 'star', color: '#B6F23B', size: 30, top: '78%', left: '90%', depth: 2.0, rotate: 8 },
  { kind: 'pill', color: '#6B4226', size: 22, top: '8%', left: '64%', depth: 0.9, rotate: 18 },
  { kind: 'ring', color: '#FF4F8B', size: 20, top: '52%', left: '94%', depth: 1.3, rotate: 0 },
  { kind: 'circle', color: '#FFC53D', size: 18, top: '88%', left: '40%', depth: 1.6, rotate: 0 },
  { kind: 'star', color: '#2D5BFF', size: 22, top: '4%', left: '28%', depth: 1.2, rotate: 30 },
]

function Floater({
  piece,
  px,
  py,
}: {
  piece: FloatPiece
  px: MotionValue<number>
  py: MotionValue<number>
}) {
  const x = useTransform(px, (v) => v * piece.depth * 26)
  const y = useTransform(py, (v) => v * piece.depth * 26)
  return (
    <motion.div
      className="pointer-events-none absolute z-20"
      style={{ top: piece.top, left: piece.left, x, y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6 + piece.depth * 0.15, type: 'spring', stiffness: 200, damping: 18 }}
    >
      <div className="animate-floaty" style={{ animationDelay: `${piece.depth}s` }}>
        <CerealShape kind={piece.kind} color={piece.color} size={piece.size} rotate={piece.rotate} />
      </div>
    </motion.div>
  )
}

function RotatingBadge() {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className="absolute -left-6 top-6 z-30 sm:-left-10"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.9, type: 'spring', stiffness: 220, damping: 18 }}
    >
      <div className="relative grid h-24 w-24 place-items-center rounded-full bg-ink text-milk shadow-lift sm:h-28 sm:w-28">
        <motion.svg
          viewBox="0 0 120 120"
          className="absolute inset-0 h-full w-full"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        >
          <defs>
            <path
              id="badgeCircle"
              d="M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0"
              fill="none"
            />
          </defs>
          <text
            fill="currentColor"
            style={{ fontFamily: 'Manrope, sans-serif', fontSize: 12, fontWeight: 700, letterSpacing: 2 }}
          >
            <textPath href="#badgeCircle" startOffset="0%">
              FRESH CRUNCH • NO BOWL • ANYWHERE •
            </textPath>
          </text>
        </motion.svg>
        <div className="font-display text-xl font-extrabold leading-none">
          <span className="text-sun">5</span>
          <span className="text-[10px]">s</span>
        </div>
      </div>
    </motion.div>
  )
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useSpring(mx, { stiffness: 60, damping: 18 })
  const py = useSpring(my, { stiffness: 60, damping: 18 })

  const boxX = useTransform(px, (v) => v * 30)
  const boxY = useTransform(py, (v) => v * 22)
  const boxRotate = useTransform(px, (v) => v * 6)

  function handleMouse(e: MouseEvent<HTMLDivElement>) {
    if (reduce) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    mx.set(nx)
    my.set(ny)
  }

  function resetMouse() {
    mx.set(0)
    my.set(0)
  }

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 sm:pt-32"
    >
      {/* Background gradient + blobs */}
      <div
        className="absolute inset-0 -z-10 animate-gradient-slow"
        style={{
          background:
            'linear-gradient(120deg, #FBF3E4 0%, #FFF0DA 30%, #FDE9F1 60%, #E8EEFF 100%)',
          backgroundSize: '200% 200%',
        }}
      />
      <div className="absolute -left-32 top-10 -z-10 h-96 w-96 rounded-full bg-sun/40 blur-[120px]" />
      <div className="absolute right-0 top-40 -z-10 h-[28rem] w-[28rem] rounded-full bg-berry/30 blur-[130px]" />
      <div className="absolute bottom-0 left-1/3 -z-10 h-80 w-80 rounded-full bg-electric/25 blur-[120px]" />
      <div className="grain-overlay" />

      <div className="container-x relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
          {/* Copy */}
          <div className="relative text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="chip mx-auto mb-5 border-ink/15 bg-milk/70 text-ink/80 lg:mx-0"
            >
              <span className="h-2 w-2 rounded-full bg-lime" />
              The bowl-free breakfast box
            </motion.div>

            <h1 className="font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              <RevealWord text="Crunchy cereal." delay={0.05} />
              <br />
              <RevealWord text="Cold milk." delay={0.18} className="text-gradient" />{' '}
              <RevealWord text="One box." delay={0.3} />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42 }}
              className="mx-auto mt-6 max-w-xl text-base text-ink/70 sm:text-lg lg:mx-0"
            >
              Crunchbox keeps cereal and milk separate until the exact second you eat. Open it, drop it,
              crunch it — anywhere.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.52 }}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
            >
              <Button href="#flavors" variant="dark" className="px-7 py-4 text-base">
                Shop Crunchbox <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button href="#how" variant="secondary" className="px-7 py-4 text-base">
                See how it works <ArrowDown className="h-4 w-4" />
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mx-auto mt-7 max-w-md text-xs font-semibold uppercase tracking-wider text-ink/45 lg:mx-0"
            >
              Built for students, commuters, airports, offices, gyms &amp; late-night snackers.
            </motion.p>
          </div>

          {/* Product stage */}
          <div className="relative flex h-[420px] items-center justify-center sm:h-[520px]">
            {FLOATERS.map((p, i) => (
              <Floater key={i} piece={p} px={px} py={py} />
            ))}

            <motion.div
              style={{ x: boxX, y: boxY, rotate: boxRotate }}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-20"
            >
              <RotatingBadge />
              <motion.div
                animate={reduce ? undefined : { y: [0, -14, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <CrunchboxMockup theme={heroTheme} name="Variety" scale={1.18} activate />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#how"
        aria-label="Scroll to how it works"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 text-ink/50 sm:flex"
      >
        <span className="text-[11px] font-bold uppercase tracking-widest">Scroll</span>
        <motion.span
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  )
}

function RevealWord({
  text,
  delay = 0,
  className = '',
}: {
  text: string
  delay?: number
  className?: string
}) {
  return (
    <motion.span
      className={`inline-block ${className}`}
      initial={{ opacity: 0, y: '0.4em' }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {text}
    </motion.span>
  )
}
