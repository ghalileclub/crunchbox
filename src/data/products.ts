export interface BoxTheme {
  /** Main box body gradient stops */
  body: string
  bodyDark: string
  /** Cereal piece colors */
  cereal: string
  cerealAlt: string
  cerealThird: string
  /** Milk fill color */
  milk: string
  milkDark: string
  /** Label band */
  label: string
  labelText: string
  /** UI accent used for the flavor's section tint + buttons */
  accent: string
  accentText: string
  /** Soft background wash behind the product card */
  wash: string
}

export interface Flavor {
  id: string
  name: string
  short: string
  tagline: string
  description: string
  price: number
  badges: string[]
  theme: BoxTheme
}

export const FLAVORS: Flavor[] = [
  {
    id: 'classic-frosted',
    name: 'Classic Frosted Crunch',
    short: 'Frosted',
    tagline: 'The OG, glazed.',
    description: 'Frosted golden flakes with a sugar-glass shatter. The one everyone steals from your bag.',
    price: 4.99,
    badges: ['12g protein', 'Lower sugar', 'No bowl'],
    theme: {
      body: '#FFD15C',
      bodyDark: '#F2A91E',
      cereal: '#FFE7A6',
      cerealAlt: '#FFFFFF',
      cerealThird: '#E89B1C',
      milk: '#FFFDF7',
      milkDark: '#F3E7CE',
      label: '#0B0B12',
      labelText: '#FFD15C',
      accent: '#FFC53D',
      accentText: '#0B0B12',
      wash: '#FFF4D6',
    },
  },
  {
    id: 'cocoa-cloud',
    name: 'Cocoa Cloud',
    short: 'Cocoa',
    tagline: 'Chocolate milk, built in.',
    description: 'Deep cocoa puffs that turn the milk into dessert. Tastes like skipping the rules.',
    price: 4.99,
    badges: ['12g protein', 'Real cocoa', 'Ready in 5s'],
    theme: {
      body: '#7A4A2B',
      bodyDark: '#4F2D17',
      cereal: '#3A2114',
      cerealAlt: '#C58A5A',
      cerealThird: '#1F120A',
      milk: '#EBD8C2',
      milkDark: '#CDB196',
      label: '#FFFBF5',
      labelText: '#4F2D17',
      accent: '#6B4226',
      accentText: '#FFFBF5',
      wash: '#EAD9C8',
    },
  },
  {
    id: 'berry-blast',
    name: 'Berry Blast',
    short: 'Berry',
    tagline: 'Pink milk superiority.',
    description: 'Tart berry loops that bleed color into the milk. Loud, fruity, unbothered.',
    price: 4.99,
    badges: ['12g protein', 'Real fruit', 'No bowl'],
    theme: {
      body: '#FF6FA5',
      bodyDark: '#E6266F',
      cereal: '#C0246B',
      cerealAlt: '#FFC7DE',
      cerealThird: '#8E1E86',
      milk: '#FFEFF6',
      milkDark: '#F4CFE0',
      label: '#0B0B12',
      labelText: '#FF6FA5',
      accent: '#FF4F8B',
      accentText: '#FFFBF5',
      wash: '#FFE2EE',
    },
  },
  {
    id: 'cinnamon-swirl',
    name: 'Cinnamon Swirl',
    short: 'Cinnamon',
    tagline: 'Churro energy, 7am.',
    description: 'Cinnamon-dusted squares with a warm finish. The milk at the bottom is the prize.',
    price: 4.99,
    badges: ['12g protein', 'Whole grain', 'Ready in 5s'],
    theme: {
      body: '#E0913E',
      bodyDark: '#B66A1E',
      cereal: '#8A4B1C',
      cerealAlt: '#F6D9A8',
      cerealThird: '#5E3210',
      milk: '#FFF6E7',
      milkDark: '#EAD3AE',
      label: '#0B0B12',
      labelText: '#E0913E',
      accent: '#C9742B',
      accentText: '#FFFBF5',
      wash: '#FBE7CB',
    },
  },
  {
    id: 'peanut-butter-power',
    name: 'Peanut Butter Power',
    short: 'PB Power',
    tagline: 'The protein one.',
    description: 'Roasted peanut clusters with serious staying power. Built for gym bags and long mornings.',
    price: 4.99,
    badges: ['16g protein', 'Big crunch', 'No bowl'],
    theme: {
      body: '#E7BD6A',
      bodyDark: '#B9812F',
      cereal: '#7A531F',
      cerealAlt: '#F0D9A0',
      cerealThird: '#553707',
      milk: '#FFF7E9',
      milkDark: '#E8D2A6',
      label: '#0B0B12',
      labelText: '#E7BD6A',
      accent: '#A9772E',
      accentText: '#FFFBF5',
      wash: '#F6E6C5',
    },
  },
  {
    id: 'variety-pack',
    name: 'Variety Pack',
    short: 'Variety',
    tagline: 'Commitment issues? Same.',
    description: 'A rotating mix of every flavor so breakfast never gets boring. Different box, every day.',
    price: 4.99,
    badges: ['All flavors', 'Best value', 'No bowl'],
    theme: {
      body: '#2D5BFF',
      bodyDark: '#1B3BCC',
      cereal: '#FFC53D',
      cerealAlt: '#FF4F8B',
      cerealThird: '#B6F23B',
      milk: '#FFFBF5',
      milkDark: '#E7E2F0',
      label: '#FFFBF5',
      labelText: '#2D5BFF',
      accent: '#2D5BFF',
      accentText: '#FFFBF5',
      wash: '#E2E9FF',
    },
  },
]

export interface Pack {
  size: number
  id: string
  name: string
  blurb: string
  price: number
}

/** Pack pricing used by the bundle builder and pack cards */
export const PACKS: Pack[] = [
  { size: 4, id: 'pack-4', name: '4-Pack', blurb: 'A week of head starts.', price: 16.99 },
  { size: 12, id: 'pack-12', name: '12-Pack', blurb: 'The household staple.', price: 39.99 },
  { size: 24, id: 'pack-24', name: '24-Pack Office Box', blurb: 'Feed the whole floor.', price: 74.99 },
]

export const SUBSCRIPTION_DISCOUNT = 0.15
