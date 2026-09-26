import { createContext, useContext, useMemo, useState } from 'react';

const StoreContext = createContext(null);
const CART_KEY = 'yourbrand.store.cart';
const WISHLIST_KEY = 'yourbrand.store.wishlist';

function readItems(key) {
  try { return JSON.parse(localStorage.getItem(key) || '[]'); }
  catch { return []; }
}

function identity(product) { return String(product.id || product._id); }
export function productPrice(product) {
  const price = Number(product?.price || 0);
  return product?.priceInRupees ? price : (product?.isDemo || identity(product).startsWith('demo-')) ? Math.round(price * 83) : price;
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(readItems(CART_KEY));
  const [wishlist, setWishlist] = useState(readItems(WISHLIST_KEY));
  const updateCart = (update) => setCart((current) => {
    const next = update(current);
    localStorage.setItem(CART_KEY, JSON.stringify(next));
    return next;
  });
  const updateWishlist = (update) => setWishlist((current) => {
    const next = update(current);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
    return next;
  });
  const addToCart = (product, quantity = 1, options = {}) => updateCart((items) => {
    const id = identity(product);
    const key = `${id}:${options.size || ''}:${options.color || ''}`;
    const existing = items.find((item) => item.key === key);
    if (existing) return items.map((item) => item.key === key ? { ...item, quantity: item.quantity + quantity } : item);
    return [...items, { key, product: { ...product, id }, quantity, size: options.size || '', color: options.color || '' }];
  });
  const setQuantity = (key, quantity) => updateCart((items) => quantity <= 0 ? items.filter((item) => item.key !== key) : items.map((item) => item.key === key ? { ...item, quantity } : item));
  const removeFromCart = (key) => updateCart((items) => items.filter((item) => item.key !== key));
  const toggleWishlist = (product) => updateWishlist((items) => {
    const id = identity(product);
    return items.some((item) => identity(item) === id) ? items.filter((item) => identity(item) !== id) : [...items, { ...product, id }];
  });
  const isWishlisted = (product) => wishlist.some((item) => identity(item) === identity(product));
  const clearCart = () => updateCart(() => []);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + productPrice(item.product) * item.quantity, 0);
  const value = useMemo(() => ({ cart, wishlist, cartCount, cartTotal, addToCart, setQuantity, removeFromCart, toggleWishlist, isWishlisted, clearCart }), [cart, wishlist]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used inside StoreProvider');
  return context;
}
