import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'

export interface ModalConfig {
  title: string
  subtitle: string
  /** Eyebrow label shown above the title */
  eyebrow?: string
}

interface ModalContextValue {
  isOpen: boolean
  config: ModalConfig
  openModal: (config?: Partial<ModalConfig>) => void
  closeModal: () => void
}

const DEFAULT_CONFIG: ModalConfig = {
  eyebrow: 'Early access',
  title: 'Be first to crunch.',
  subtitle: 'Drop your email and we’ll get you in line before boxes ship.',
}

const CHECKOUT_CONFIG: ModalConfig = {
  eyebrow: 'Almost there',
  title: 'Checkout is coming soon.',
  subtitle: 'Crunchbox is launching shortly. Join the waitlist to get early access and lock in launch pricing.',
}

const ModalContext = createContext<ModalContextValue | null>(null)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [config, setConfig] = useState<ModalConfig>(DEFAULT_CONFIG)

  const openModal = useCallback((next?: Partial<ModalConfig>) => {
    setConfig({ ...DEFAULT_CONFIG, ...next })
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => setIsOpen(false), [])

  return (
    <ModalContext.Provider value={{ isOpen, config, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useModal(): ModalContextValue {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('useModal must be used within ModalProvider')
  return ctx
}

// eslint-disable-next-line react-refresh/only-export-components
export const CHECKOUT_MODAL = CHECKOUT_CONFIG
