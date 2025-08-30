import { CartItem, Order, User } from '../components/types';

export type State = { cart: CartItem[]; orders: Order[]; user: User | null };

export type Action =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'ADD_TO_CART'; payload: Omit<CartItem, 'qty'> }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QTY'; payload: { id: string; qty: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'SET_ORDERS'; payload: Order[] };

export const initialState: State = { cart: [], orders: [], user: null };

export default function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_USER': return { ...state, user: action.payload };
    case 'SET_CART': return { ...state, cart: action.payload };
    case 'ADD_TO_CART': { const exists = state.cart.find(i=>i.id===action.payload.id); if (exists) return { ...state, cart: state.cart.map(i=>i.id===action.payload.id?{...i, qty:i.qty+1}:i) }; return { ...state, cart:[...state.cart, {...action.payload, qty:1}] } }
    case 'REMOVE_FROM_CART': return { ...state, cart: state.cart.filter(i=>i.id!==action.payload) };
    case 'UPDATE_QTY': return { ...state, cart: state.cart.map(i=>i.id===action.payload.id?{...i, qty: action.payload.qty}:i) };
    case 'CLEAR_CART': return { ...state, cart: [] };
    case 'ADD_ORDER': return { ...state, orders: [action.payload, ...state.orders] };
    case 'SET_ORDERS': return { ...state, orders: action.payload };
    default: return state;
  }
}