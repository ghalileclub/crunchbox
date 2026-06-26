import { CartProvider } from './context/CartContext'
import { ModalProvider } from './context/ModalContext'
import { MARQUEE_ITEMS } from './data/content'

import { ScrollProgress } from './components/ScrollProgress'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { Marquee } from './components/Marquee'
import { Flavors } from './components/Flavors'
import { BuildYourBox } from './components/BuildYourBox'
import { WhyCrunchbox } from './components/WhyCrunchbox'
import { Innovation } from './components/Innovation'
import { SocialProof } from './components/SocialProof'
import { UseCases } from './components/UseCases'
import { Waitlist } from './components/Waitlist'
import { FAQ } from './components/FAQ'
import { Footer } from './components/Footer'
import { CartDrawer } from './components/CartDrawer'
import { WaitlistModal } from './components/WaitlistModal'

export default function App() {
  return (
    <CartProvider>
      <ModalProvider>
        <ScrollProgress />
        <Navbar />

        <main>
          <Hero />
          <HowItWorks />

          {/* Brand ticker */}
          <div className="-rotate-1 py-2">
            <Marquee
              items={MARQUEE_ITEMS}
              duration={34}
              className="border-y border-ink/10 bg-ink py-4 text-milk"
              textClassName="font-display text-base font-extrabold uppercase tracking-tight sm:text-lg"
            />
          </div>

          <Flavors />
          <BuildYourBox />
          <WhyCrunchbox />
          <Innovation />
          <SocialProof />
          <UseCases />
          <Waitlist />
          <FAQ />
        </main>

        <Footer />

        {/* Overlays */}
        <CartDrawer />
        <WaitlistModal />
      </ModalProvider>
    </CartProvider>
  )
}
