import {
  Snowflake,
  CupSoda,
  Sparkles,
  Trash2,
  Train,
  Laptop,
  Plane,
  Dumbbell,
  GraduationCap,
  Building2,
  Hotel,
  Moon,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Step {
  k: string
  title: string
  copy: string
}

export const STEPS: Step[] = [
  { k: '01', title: 'Separate', copy: 'Cereal stays sealed up top. Milk stays cold and fresh below. Nothing touches.' },
  { k: '02', title: 'Activate', copy: 'Pull the tab. The seal releases and the cereal drops straight into the milk.' },
  { k: '03', title: 'Crunch', copy: 'Eat right out of the box. No bowl, no spoon-hunting, no cleanup. Anywhere.' },
]

export interface Benefit {
  label: string
  icon: LucideIcon
}

export const BENEFITS: Benefit[] = [
  { label: 'No bowl', icon: CupSoda },
  { label: 'No fridge panic', icon: Snowflake },
  { label: 'No soggy cereal', icon: Sparkles },
  { label: 'No cleanup', icon: Trash2 },
  { label: 'Commute-ready', icon: Train },
  { label: 'Desk-friendly', icon: Laptop },
  { label: 'Airport-friendly', icon: Plane },
  { label: 'Gym bag-friendly', icon: Dumbbell },
]

export interface Testimonial {
  quote: string
  name: string
  meta: string
  accent: string
}

export const TESTIMONIALS: Testimonial[] = [
  { quote: 'Finally, breakfast that works between class and the gym.', name: 'Maya', meta: 'UCLA', accent: '#FF4F8B' },
  { quote: 'This would save me every single morning before work.', name: 'Alex', meta: 'NYC', accent: '#2D5BFF' },
  { quote: 'The most obvious idea ever. I need this in airports.', name: 'Sam', meta: 'London', accent: '#FFC53D' },
  { quote: 'I ate it one-handed on the subway. Game over.', name: 'Priya', meta: 'Toronto', accent: '#B6F23B' },
  { quote: 'No soggy cereal at my desk by 9am. Sold.', name: 'Diego', meta: 'Austin', accent: '#6B4226' },
  { quote: 'Threw three in my gym bag. Crunch survived leg day.', name: 'Noa', meta: 'Berlin', accent: '#FF4F8B' },
]

export interface UseCase {
  title: string
  copy: string
  icon: LucideIcon
  tint: string
}

export const USE_CASES: UseCase[] = [
  { title: 'Students', copy: 'Between a 9am lecture and a closing library.', icon: GraduationCap, tint: '#2D5BFF' },
  { title: 'Commuters', copy: 'One hand on the rail, one on breakfast.', icon: Train, tint: '#FF4F8B' },
  { title: 'Office', copy: 'Desk drawer to mouth in five seconds.', icon: Building2, tint: '#FFC53D' },
  { title: 'Airports', copy: 'Through security, gate-side, no liquids drama.', icon: Plane, tint: '#B6F23B' },
  { title: 'Hotels', copy: 'Skip the $24 lobby cereal. Bring your own.', icon: Hotel, tint: '#6B4226' },
  { title: 'Gyms', copy: 'Post-lift protein crunch, zero prep.', icon: Dumbbell, tint: '#2D5BFF' },
  { title: 'Late-night', copy: 'Midnight cravings without the midnight dishes.', icon: Moon, tint: '#FF4F8B' },
]

export interface Faq {
  q: string
  a: string
}

export const FAQS: Faq[] = [
  {
    q: 'How does Crunchbox actually work?',
    a: 'Every box has two sealed chambers. Crunchy cereal lives in the top compartment, kept completely dry. Shelf-stable milk sits in the bottom. When you pull the activation tab, the seal between them releases and the cereal drops into the milk — so it only ever gets wet the moment you decide to eat.',
  },
  {
    q: 'Does the cereal get soggy?',
    a: 'Not until you want it to. The compartments are fully separated until activation, so the cereal stays crunchy on the shelf, in your bag, and in your hand. You control the exact moment milk meets cereal — we call it the crunch window.',
  },
  {
    q: 'Does it need refrigeration?',
    a: 'No. Crunchbox ships with a shelf-stable milk option that stays good at room temperature until opened, so it can live in a backpack, desk drawer, or carry-on. Prefer it cold? Pop it in a fridge for a few hours first — it tastes even better.',
  },
  {
    q: 'What milk options are available?',
    a: 'At launch we plan to offer classic dairy plus oat and a lactose-free option, all in the shelf-stable format. You will pick your milk per box when ordering opens. Tell us your preference on the waitlist and it helps us decide what to stock first.',
  },
  {
    q: 'Is it recyclable?',
    a: 'That is the goal and a core part of the design brief. We are engineering the outer shell to be widely recyclable and minimizing mixed materials. Final packaging specs will be confirmed before launch — we would rather get it right than overpromise.',
  },
  {
    q: 'When will it launch?',
    a: 'We are in pre-launch and finalizing the first production run. Join the waitlist to lock in early-access pricing and to be first in line when boxes ship. Waitlisters get notified before anyone else.',
  },
  {
    q: 'Can I buy in bulk for offices, hotels, or schools?',
    a: 'Yes — bulk and recurring orders are exactly who the 12 and 24-packs are for. Subscriptions make restocking a breakroom, dorm, or hotel pantry automatic. Join the waitlist and note your use case, and we will reach out about volume options.',
  },
  {
    q: 'Is this real checkout?',
    a: 'Not yet — this is an early Crunchbox experience, so checkout is simulated while we finish the first run. You can build your box and add to cart to show us what you want, then join the waitlist for genuine early access the moment ordering is live.',
  },
]

export const MARQUEE_ITEMS = [
  'NO BOWL REQUIRED',
  'FRESH CRUNCH',
  'BREAKFAST ANYWHERE',
  'ZERO CLEANUP',
  'CEREAL REINVENTED',
  'COLD MILK, BUILT IN',
  'OPEN · DROP · CRUNCH',
]

export const NAV_LINKS = [
  { label: 'How it works', href: '#how' },
  { label: 'Flavors', href: '#flavors' },
  { label: 'Build your box', href: '#build' },
  { label: 'Why Crunchbox', href: '#why' },
  { label: 'FAQ', href: '#faq' },
]

export const WAITLIST_PLACES = ['School', 'Office', 'Airport', 'Gym', 'Home', 'Hotel', 'Other']
