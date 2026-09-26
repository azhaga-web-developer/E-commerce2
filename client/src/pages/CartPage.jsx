import { Link } from 'react-router-dom';
import { productPrice, useStore } from '../context/StoreContext.jsx';

const money = (amount) => `₹${Math.round(amount).toLocaleString('en-IN')}`;

function CartPage() {
  const { cart, cartTotal, setQuantity, removeFromCart, toggleWishlist } = useStore();
  return <div className="checkout-page cart-page">
    <div className="container checkout-topline"><div className="checkout-heading"><span className="eyebrow">YOUR BAG</span><h1>Shopping cart</h1><p>{cart.reduce((sum, item) => sum + item.quantity, 0)} items ready for checkout.</p></div></div>
    {!cart.length ? <div className="container empty-state"><h2>Your cart is empty</h2><p>Find something you love and add it to your bag.</p><Link className="primary-btn" to="/shop">Continue shopping</Link></div> : <div className="container checkout-layout">
      <main className="checkout-main"><section className="checkout-section cart-section"><div className="section-label"><h2>Items in your cart</h2><Link to="/shop">Continue shopping</Link></div>
        {cart.map(({ key, product, quantity, size, color }) => <article className="checkout-item" key={key}><Link className="checkout-thumb" to={`/product/${product.id}`}><img src={product.image} alt={product.name} /></Link><div className="checkout-item-details"><b><Link to={`/product/${product.id}`}>{product.name}</Link></b><span>{[color, size && `Size ${size}`].filter(Boolean).join(' • ') || product.brand}</span><strong>{money(productPrice(product))}</strong><div className="item-links"><button type="button" onClick={() => toggleWishlist(product)}>♡ Save for later</button><button type="button" onClick={() => removeFromCart(key)}>Remove</button></div></div><div className="item-quantity"><button type="button" aria-label="Decrease quantity" onClick={() => setQuantity(key, quantity - 1)}>−</button><span>{quantity}</span><button type="button" aria-label="Increase quantity" onClick={() => setQuantity(key, quantity + 1)}>＋</button></div><b>{money(productPrice(product) * quantity)}</b></article>)}
      </section></main>
      <aside className="checkout-side"><section className="checkout-summary"><h2>Order summary <small>{cart.length} products</small></h2><div><span>Subtotal</span><b>{money(cartTotal)}</b></div><div><span>Shipping</span><b>{cartTotal >= 999 ? 'Free' : '₹79'}</b></div><hr /><div className="total"><span>Total<small>Shipping calculated at checkout</small></span><b>{money(cartTotal + (cartTotal >= 999 || cartTotal === 0 ? 0 : 79))}</b></div><Link className="place-order" to="/checkout">Continue to checkout →</Link><Link className="continue-shopping" to="/shop">← Continue shopping</Link></section></aside>
    </div>}
  </div>;
}

export default CartPage;
