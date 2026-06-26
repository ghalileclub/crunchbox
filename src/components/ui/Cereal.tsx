import type { CSSProperties } from 'react'

export type CerealShapeKind = 'ring' | 'circle' | 'square' | 'pill' | 'star'

interface CerealShapeProps {
  kind: CerealShapeKind
  color: string
  size: number
  rotate?: number
  style?: CSSProperties
  className?: string
}

/**
 * A single piece of cereal rendered purely with CSS/SVG.
 * Used inside the box window and as floating ambient pieces.
 */
export function CerealShape({ kind, color, size, rotate = 0, style, className }: CerealShapeProps) {
  const base: CSSProperties = {
    width: size,
    height: size,
    transform: `rotate(${rotate}deg)`,
    ...style,
  }

  if (kind === 'star') {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        style={{ transform: `rotate(${rotate}deg)`, ...style }}
        className={className}
        aria-hidden="true"
      >
        <path
          d="M12 1.6l2.9 6.1 6.7.9-4.9 4.6 1.2 6.6-5.9-3.2-5.9 3.2 1.2-6.6L2.4 8.6l6.7-.9z"
          fill={color}
        />
      </svg>
    )
  }

  if (kind === 'ring') {
    return (
      <div
        className={className}
        style={{
          ...base,
          borderRadius: '50%',
          border: `${Math.max(2, size * 0.28)}px solid ${color}`,
          background: 'transparent',
          boxShadow: `inset 0 -2px 3px rgba(0,0,0,0.18)`,
        }}
        aria-hidden="true"
      />
    )
  }

  if (kind === 'square') {
    return (
      <div
        className={className}
        style={{
          ...base,
          borderRadius: Math.max(3, size * 0.22),
          background: color,
          boxShadow: `inset 0 2px 2px rgba(255,255,255,0.45), inset 0 -3px 4px rgba(0,0,0,0.2)`,
        }}
        aria-hidden="true"
      />
    )
  }

  if (kind === 'pill') {
    return (
      <div
        className={className}
        style={{
          ...base,
          width: size * 1.7,
          height: size * 0.85,
          borderRadius: 999,
          background: color,
          boxShadow: `inset 0 2px 2px rgba(255,255,255,0.4), inset 0 -3px 4px rgba(0,0,0,0.2)`,
        }}
        aria-hidden="true"
      />
    )
  }

  // circle (default)
  return (
    <div
      className={className}
      style={{
        ...base,
        borderRadius: '50%',
        background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.55), ${color} 60%)`,
        boxShadow: `inset 0 -3px 5px rgba(0,0,0,0.22)`,
      }}
      aria-hidden="true"
    />
  )
}

export interface FieldPiece {
  kind: CerealShapeKind
  top: number
  left: number
  size: number
  rotate: number
  colorKey: 0 | 1 | 2
  delay: number
}

const KINDS: CerealShapeKind[] = ['ring', 'circle', 'square', 'pill', 'star']

/**
 * Deterministic pseudo-random field of cereal pieces so SSR/CSR and re-renders
 * stay stable. Seeded by a simple LCG.
 */
export function cerealField(count: number, seed = 7): FieldPiece[] {
  let s = seed * 9301 + 49297
  const rand = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
  const pieces: FieldPiece[] = []
  for (let i = 0; i < count; i++) {
    pieces.push({
      kind: KINDS[Math.floor(rand() * KINDS.length)],
      top: 8 + rand() * 80,
      left: 8 + rand() * 80,
      size: 12 + rand() * 16,
      rotate: rand() * 360,
      colorKey: Math.floor(rand() * 3) as 0 | 1 | 2,
      delay: rand() * 2,
    })
  }
  return pieces
}
