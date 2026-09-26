import { Link } from 'react-router-dom';
import { productPrice, useStore } from '../context/StoreContext.jsx';

const money = (amount) => `₹${Math.round(amount).toLocaleString('en-IN')}`;

function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  return <section className="container page-header wishlist-page">
    <div className="shop-breadcrumb"><Link to="/">Home</Link> / Wishlist</div>
    <h1>Your wishlist <span>{wishlist.length} saved</span></h1>
    {!wishlist.length ? <div className="empty-state"><h2>Your wishlist is empty</h2><p>Tap the heart on a product to save it here.</p><Link className="primary-btn" to="/shop">Explore products</Link></div> : <div className="shop-grid">{wishlist.map((product, index) => <article className="shop-card" key={product.id || product._id}>
      <div className="shop-card-image"><Link to={`/product/${product.id || product._id}`}><img src={product.image} alt={product.name} /></Link><button className="wishlist-remove" type="button" onClick={() => toggleWishlist(product)} aria-label={`Remove ${product.name} from wishlist`}>× <span>Remove</span></button></div>
      <div className="shop-card-body"><div className="shop-card-meta"><span>{product.brand}</span><b>☆ {product.rating || 0} ({product.reviews || 0})</b></div><h2><Link to={`/product/${product.id || product._id}`}>{product.name}</Link></h2><div className="shop-price"><strong>{money(productPrice(product))}</strong><button className="quick-add" onClick={() => addToCart(product)} aria-label={`Add ${product.name} to cart`}>＋</button></div></div>
    </article>)}</div>}
  </section>;
}

export default WishlistPage;
