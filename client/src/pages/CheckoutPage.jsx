import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { productPrice, useStore } from '../context/StoreContext.jsx';
import { apiUrl } from '../api.js';

const money = (amount) => `₹${Math.round(amount).toLocaleString('en-IN')}`;

function CheckoutPage() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { cart, cartTotal, setQuantity, removeFromCart, clearCart } = useStore();
  const paymentMethod = 'cod';
  const [error, setError] = useState('');
  const [order, setOrder] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const previewOrder = cart.some(({ product }) => product.isDemo || String(product.id).startsWith('demo-'));

  const placeOrder = async (event) => {
    event.preventDefault();
    setError('');
    if (!cart.length) return setError('Your cart is empty. Add a product before checking out.');
    if (!token) return navigate('/login', { state: { from: '/checkout' } });
    setSubmitting(true);
    try {
      if (previewOrder && import.meta.env.PROD) throw new Error('Preview products cannot be ordered. Please choose an available product from the live catalog.');
      if (previewOrder) {
        const preview = `PREVIEW-${Date.now().toString().slice(-6)}`;
        clearCart();
        setOrder({ id: preview, preview: true });
        return;
      }
      const form = new FormData(event.currentTarget);
      const shippingAddress = {
        fullName: form.get('fullName'),
        address: form.get('address'),
        city: form.get('city'),
        postalCode: form.get('postalCode'),
        phone: form.get('phone')
      };
      const response = await fetch(apiUrl('/api/orders'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          items: cart.map(({ product, quantity, size, color }) => ({ product: product.id, quantity, size, color })),
          shippingAddress,
          paymentMethod
        })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || 'We could not place your order. Please try again.');
      setOrder(data.order);
      clearCart();
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (order) return <div className="container page-header order-success"><div className="success-mark">✓</div><h1>Order received</h1><p>{order.preview ? 'Your preview order is complete. Preview products are saved in this browser only.' : 'Your order has been placed successfully.'}</p><p>Order reference: <strong>{order._id || order.id}</strong></p><Link className="primary-btn" to="/shop">Continue shopping</Link></div>;

  return <div className="checkout-page">
    <div className="container checkout-topline"><div className="checkout-heading"><span className="eyebrow">SECURE CHECKOUT</span><h1>Delivery and payment</h1><p>Review your items and enter a delivery address.</p></div><nav className="checkout-steps"><span className="current">1 <b>Cart</b></span><i></i><span className="current">2 <b>Address</b></span><i></i><span>3 <b>Payment</b></span></nav></div>
    {!cart.length ? <div className="container empty-state"><h2>Your cart is empty</h2><p>Add a product before continuing to checkout.</p><Link className="primary-btn" to="/shop">Browse products</Link></div> : <form onSubmit={placeOrder} className="container checkout-layout">
      <main className="checkout-main">
        <section className="checkout-section cart-section"><div className="section-label"><h2>Items in cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</h2><Link to="/cart">Edit cart</Link></div>{cart.map(({ key, product, quantity, size, color }) => <article className="checkout-item" key={key}><div className="checkout-thumb"><img src={product.image} alt={product.name} /></div><div className="checkout-item-details"><b>{product.name}</b><span>{[color, size && `Size ${size}`].filter(Boolean).join(' • ')}</span><strong>{money(productPrice(product))}</strong></div><div className="item-quantity"><button type="button" aria-label="Decrease quantity" onClick={() => setQuantity(key, quantity - 1)}>−</button><span>{quantity}</span><button type="button" aria-label="Increase quantity" onClick={() => setQuantity(key, quantity + 1)}>＋</button></div><button type="button" onClick={() => removeFromCart(key)} aria-label={`Remove ${product.name}`}>Remove</button></article>)}</section>
        <section className="checkout-section address-section"><div className="section-label"><h2><i>1</i> Delivery address</h2></div><p className="step-subtitle">Where should we deliver your order?</p><div className="checkout-address-form"><label>Full name<input name="fullName" autoComplete="name" required /></label><label>Phone number<input name="phone" type="tel" autoComplete="tel" required /></label><label className="address-wide">Street address<input name="address" autoComplete="street-address" required /></label><label>City<input name="city" autoComplete="address-level2" required /></label><label>Postal code<input name="postalCode" autoComplete="postal-code" required /></label></div></section>
        <section className="checkout-section payment-section"><div className="section-label"><h2><i>2</i> Payment method</h2></div><label className="radio-option active"><input type="radio" name="paymentMethod" checked readOnly /><span><b>Cash on delivery</b><em>Pay when your order arrives</em></span></label><p className="step-subtitle">Online payment is not enabled yet.</p></section>
      </main>
      <aside className="checkout-side"><section className="checkout-summary"><h2>Order summary <small>{cart.length} products</small></h2><div><span>Subtotal</span><b>{money(cartTotal)}</b></div><div><span>Shipping</span><b>{cartTotal >= 999 ? 'Free' : money(79)}</b></div><hr /><div className="total"><span>Total<small>Includes shipping and taxes</small></span><b>{money(cartTotal + (cartTotal >= 999 ? 0 : 79))}</b></div>{error && <p className="auth-error" role="alert">{error}</p>}<button className="place-order" type="submit" disabled={submitting}>{submitting ? 'Placing order…' : 'Place order →'}</button><Link className="continue-shopping" to="/cart">← Back to cart</Link><ul className="checkout-assurances"><li>Secure checkout</li><li>Easy returns</li></ul></section></aside>
    </form>}
  </div>;
}

export default CheckoutPage;
