import { motion, useReducedMotion } from 'framer-motion'
import type { CSSProperties } from 'react'
import type { BoxTheme } from '../../data/products'
import { CerealShape, cerealField, type CerealShapeKind } from './Cereal'

interface CrunchboxMockupProps {
  theme: BoxTheme
  name: string
  /** 1 = 240x380px. Scales the whole box. */
  scale?: number
  /** Animate cereal dropping from the top chamber into the milk. */
  activate?: boolean
  className?: string
  style?: CSSProperties
}

const BASE_W = 240
const BASE_H = 380

export function CrunchboxMockup({
  theme,
  name,
  scale = 1,
  activate = false,
  className,
  style,
}: CrunchboxMockupProps) {
  const reduce = useReducedMotion()
  const w = BASE_W * scale
  const h = BASE_H * scale

  const cerealColors = [theme.cereal, theme.cerealAlt, theme.cerealThird]
  const windowPieces = cerealField(11, 13)
  const dropPieces = cerealField(5, 29)

  return (
    <div
      className={className}
      style={{ width: w, height: h, position: 'relative', ...style }}
    >
      {/* Floor shadow */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: -18 * scale,
          width: w * 0.78,
          height: 26 * scale,
          transform: 'translateX(-50%)',
          background: 'radial-gradient(ellipse at center, rgba(11,11,18,0.34), rgba(11,11,18,0) 70%)',
          filter: 'blur(2px)',
        }}
      />

      {/* The box */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 34 * scale,
          overflow: 'hidden',
          background: `linear-gradient(150deg, ${theme.body}, ${theme.bodyDark})`,
          boxShadow:
            '0 26px 50px -18px rgba(11,11,18,0.5), inset 0 2px 0 rgba(255,255,255,0.5), inset 0 -10px 24px rgba(0,0,0,0.22)',
        }}
      >
        {/* Top cap seam */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 12 * scale,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.55), rgba(255,255,255,0))',
          }}
        />

        {/* Cereal chamber */}
        <div
          style={{
            position: 'absolute',
            top: '6%',
            left: '9%',
            right: '9%',
            height: '40%',
            borderRadius: 18 * scale,
            background: 'rgba(255,255,255,0.16)',
            boxShadow:
              'inset 0 4px 10px rgba(0,0,0,0.28), inset 0 -2px 4px rgba(255,255,255,0.25)',
            overflow: 'hidden',
          }}
        >
          {/* window glass highlight */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 45%)',
            }}
          />
          {/* static cereal in window */}
          {windowPieces.map((p, i) => (
            <CerealShape
              key={i}
              kind={p.kind}
              color={cerealColors[p.colorKey]}
              size={p.size * scale}
              rotate={p.rotate}
              style={{
                position: 'absolute',
                top: `${p.top}%`,
                left: `${p.left}%`,
              }}
            />
          ))}
        </div>

        {/* Activation seam (peel hint) */}
        <div
          style={{
            position: 'absolute',
            top: '47.5%',
            left: '8%',
            right: '8%',
            height: 0,
            borderTop: `${Math.max(1, 1.5 * scale)}px dashed rgba(255,255,255,0.6)`,
          }}
        />

        {/* Label band */}
        <div
          style={{
            position: 'absolute',
            top: '48.5%',
            left: 0,
            right: 0,
            height: '13%',
            background: theme.label,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2 * scale,
            boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 4 * scale,
              marginBottom: 1 * scale,
            }}
          >
            <span style={{ width: 6 * scale, height: 6 * scale, borderRadius: 999, background: theme.cereal }} />
            <span style={{ width: 6 * scale, height: 6 * scale, borderRadius: 999, background: theme.cerealAlt }} />
            <span style={{ width: 6 * scale, height: 6 * scale, borderRadius: 999, background: theme.cerealThird }} />
          </div>
          <span
            style={{
              fontFamily: 'Unbounded, sans-serif',
              fontWeight: 800,
              fontSize: 13 * scale,
              letterSpacing: '0.02em',
              color: theme.labelText,
              lineHeight: 1,
            }}
          >
            CRUNCHBOX
          </span>
          <span
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 700,
              fontSize: 7.5 * scale,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: theme.labelText,
              opacity: 0.8,
            }}
          >
            {name}
          </span>
        </div>

        {/* Milk chamber */}
        <div
          style={{
            position: 'absolute',
            top: '61.5%',
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(180deg, ${theme.milk}, ${theme.milkDark})`,
            overflow: 'hidden',
          }}
        >
          {/* milk surface line + sheen */}
          <div
            style={{
              position: 'absolute',
              top: 6 * scale,
              left: '8%',
              right: '8%',
              height: 10 * scale,
              borderRadius: 999,
              background: 'rgba(255,255,255,0.6)',
              filter: 'blur(2px)',
            }}
          />
          {/* a couple pieces floating in the milk */}
          <CerealShape
            kind="ring"
            color={theme.cereal}
            size={16 * scale}
            rotate={20}
            style={{ position: 'absolute', top: 14 * scale, left: '24%' }}
          />
          <CerealShape
            kind="circle"
            color={theme.cerealAlt}
            size={13 * scale}
            rotate={0}
            style={{ position: 'absolute', top: 20 * scale, left: '58%' }}
          />
        </div>

        {/* Dropping cereal overlay (spans chambers) */}
        {activate && !reduce && (
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {dropPieces.map((p, i) => (
              <motion.div
                key={i}
                style={{ position: 'absolute', left: `${18 + i * 14}%`, top: '20%' }}
                initial={{ y: 0, opacity: 0 }}
                animate={{
                  y: [0, h * 0.5],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: p.delay + i * 0.35,
                  repeat: Infinity,
                  repeatDelay: 1.6,
                  ease: 'easeIn',
                }}
              >
                <CerealShape
                  kind={(['ring', 'circle', 'square'] as CerealShapeKind[])[i % 3]}
                  color={cerealColors[i % 3]}
                  size={(14 + (i % 3) * 3) * scale}
                  rotate={p.rotate}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Global gloss highlight */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(115deg, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(0,0,0,0.12) 100%)',
            pointerEvents: 'none',
          }}
        />
        {/* Left edge sheen */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: 10 * scale,
            background: 'linear-gradient(90deg, rgba(255,255,255,0.5), rgba(255,255,255,0))',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  )
}
