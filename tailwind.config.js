/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Premium contrast
        ink: '#0B0B12',
        navy: '#0E1230',
        // Milk / cream
        cream: '#FBF3E4',
        milk: '#FFFBF5',
        // Cereal palette
        electric: '#2D5BFF',
        sun: '#FFC53D',
        berry: '#FF4F8B',
        cocoa: '#6B4226',
        lime: '#B6F23B',
      },
      fontFamily: {
        display: ['Unbounded', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(11,11,18,0.25)',
        lift: '0 30px 60px -20px rgba(11,11,18,0.35)',
        glow: '0 0 0 1px rgba(255,255,255,0.06), 0 20px 50px -20px rgba(45,91,255,0.45)',
        inset: 'inset 0 2px 6px rgba(255,255,255,0.5), inset 0 -8px 20px rgba(0,0,0,0.12)',
        box: '0 24px 50px -16px rgba(11,11,18,0.45), inset 0 1px 0 rgba(255,255,255,0.45)',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(8deg)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(220%)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        marquee: 'marquee var(--marquee-duration, 32s) linear infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        shimmer: 'shimmer 2.6s ease-in-out infinite',
        'gradient-slow': 'gradientShift 14s ease infinite',
      },
    },
  },
  plugins: [],
}
