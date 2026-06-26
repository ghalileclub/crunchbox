import type { CSSProperties } from 'react'

interface MarqueeProps {
  items: string[]
  className?: string
  /** seconds for one full loop */
  duration?: number
  reverse?: boolean
  separator?: 'dot' | 'star'
  textClassName?: string
}

export function Marquee({
  items,
  className = '',
  duration = 32,
  reverse = false,
  separator = 'dot',
  textClassName = '',
}: MarqueeProps) {
  const style = {
    '--marquee-duration': `${duration}s`,
  } as CSSProperties

  const Sep = () =>
    separator === 'star' ? (
      <span className="px-5 text-current opacity-60">✦</span>
    ) : (
      <span className="px-5 text-current opacity-50">•</span>
    )

  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((it, i) => (
        <span key={i} className={`flex items-center whitespace-nowrap ${textClassName}`}>
          {it}
          <Sep />
        </span>
      ))}
    </div>
  )

  return (
    <div className={`overflow-hidden ${className}`} style={style}>
      <div
        className="marquee-track"
        style={reverse ? { animationDirection: 'reverse' } : undefined}
      >
        {row}
        {row}
      </div>
    </div>
  )
}
