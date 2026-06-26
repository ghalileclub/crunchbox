import { createContext, useContext, useMemo, useReducer, useCallback, type ReactNode } from 'react'

export interface CartItem {
  id: string
  name: string
  subtitle?: string
  price: number
  qty: number
  /** Display color for the mini-thumbnail in the drawer */
  color: string
  colorAlt?: string
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

type Action =
  | { type: 'ADD'; item: Omit<CartItem, 'qty'>; qty?: number }
  | { type: 'REMOVE'; id: string }
  | { type: 'SET_QTY'; id: string; qty: number }
  | { type: 'CLEAR' }
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'TOGGLE' }

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'ADD': {
      const qtyToAdd = action.qty ?? 1
      const existing = state.items.find((i) => i.id === action.item.id)
      if (existing) {
        return {
          ...state,
          isOpen: true,
          items: state.items.map((i) =>
            i.id === action.item.id ? { ...i, qty: i.qty + qtyToAdd } : i,
          ),
        }
      }
      return {
        ...state,
        isOpen: true,
        items: [...state.items, { ...action.item, qty: qtyToAdd }],
      }
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter((i) => i.id !== action.id) }
    case 'SET_QTY':
      return {
        ...state,
        items: state.items
          .map((i) => (i.id === action.id ? { ...i, qty: Math.max(0, action.qty) } : i))
          .filter((i) => i.qty > 0),
      }
    case 'CLEAR':
      return { ...state, items: [] }
    case 'OPEN':
      return { ...state, isOpen: true }
    case 'CLOSE':
      return { ...state, isOpen: false }
    case 'TOGGLE':
      return { ...state, isOpen: !state.isOpen }
    default:
      return state
  }
}

interface CartContextValue {
  items: CartItem[]
  isOpen: boolean
  count: number
  subtotal: number
  addItem: (item: Omit<CartItem, 'qty'>, qty?: number) => void
  removeItem: (id: string) => void
  setQty: (id: string, qty: number) => void
  clear: () => void
  open: () => void
  close: () => void
  toggle: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], isOpen: false })

  const addItem = useCallback(
    (item: Omit<CartItem, 'qty'>, qty?: number) => dispatch({ type: 'ADD', item, qty }),
    [],
  )
  const removeItem = useCallback((id: string) => dispatch({ type: 'REMOVE', id }), [])
  const setQty = useCallback((id: string, qty: number) => dispatch({ type: 'SET_QTY', id, qty }), [])
  const clear = useCallback(() => dispatch({ type: 'CLEAR' }), [])
  const open = useCallback(() => dispatch({ type: 'OPEN' }), [])
  const close = useCallback(() => dispatch({ type: 'CLOSE' }), [])
  const toggle = useCallback(() => dispatch({ type: 'TOGGLE' }), [])

  const count = useMemo(() => state.items.reduce((n, i) => n + i.qty, 0), [state.items])
  const subtotal = useMemo(
    () => state.items.reduce((n, i) => n + i.qty * i.price, 0),
    [state.items],
  )

  const value: CartContextValue = {
    items: state.items,
    isOpen: state.isOpen,
    count,
    subtotal,
    addItem,
    removeItem,
    setQty,
    clear,
    open,
    close,
    toggle,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
