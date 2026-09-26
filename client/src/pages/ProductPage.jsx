import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { productPrice, useStore } from '../context/StoreContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { apiUrl } from '../api.js';
import { extraProducts } from './ShopPage.jsx';

const fallbackProducts = {
  'demo-shoe': { id: 'demo-shoe', name: 'AeroFlex Running Shoes', brand: 'AeroFlex', category: 'Footwear', price: 30, originalPrice: 42, rating: 4.7, reviews: 128, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXUmJ60fCChzwtINHxtQFZV_r0ZzNQG0lBMoQ6O6NhuCw2V0VX4g9Jj9C4kvGjatQcXnFYAs2lRyXiIQfSjha9nSvNsKf2AhxLg2bgpOGWtTj6DD8yJvq29F3ENzVtiHUy9xMRbrOuHj_sjwF-HvTrLF3YqxPsjfMua0GkJPjv-tOu3HLWJfLVUdKHxePxNK6He3b2Y5TL4bNocnmGs5zpuOR3Bf2OFAtDEy59y28', colors: ['Black / Midnight Navy', 'White', 'Navy'], sizes: ['7', '8', '9', '10', '11'], description: 'Lightweight everyday shoes built for comfortable movement, whether you are heading out for a run or spending the day on your feet.' },
  'demo-shirt': { id: 'demo-shirt', name: 'Nomad Crisp Oxford', brand: 'Nomad', category: 'Apparel', price: 22, originalPrice: 30, rating: 4.8, reviews: 84, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAx-7ZDyTEMFufCz179VbZCW5Vi9UeUIc55RO1VZ3GZugMacRi9V3wn6aNlr0h7tMaFN5xMisEimqeg65cT5LfNvSFQuBJdepo5R-67HZkAWUlp7-T7rE06ZCjgFadkGcnDfHcTU7pmTrjdIjzc0iUPiDRrJQv_YFERSFEQvc-bkR7sL3S5r6PKJoNbHc1eFCcRVtNK_1Tnjdkm6hRfJqUCZCKfPqE4VGm1R2lAHPk', colors: ['Blue', 'White'], sizes: ['S', 'M', 'L', 'XL'], description: 'A breathable cotton essential for every occasion.' }
};
const fallbackProduct = (productId) => import.meta.env.PROD ? null : (fallbackProducts[productId] || extraProducts.find((product) => product.id === productId) || null);
const inr = (value) => `₹${Math.round(value).toLocaleString('en-IN')}`;
const related = [['Nomad Oxford Cotton Shirt', '₹1,799', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAx-7ZDyTEMFufCz179VbZCW5Vi9UeUIc55RO1VZ3GZugMacRi9V3wn6aNlr0h7tMaFN5xMisEimqeg65cT5LfNvSFQuBJdepo5R-67HZkAWUlp7-T7rE06ZCjgFadkGcnDfHcTU7pmTrjdIjzc0iUPiDRrJQv_YFERSFEQvc-bkR7sL3S5r6PKJoNbHc1eFCcRVtNK_1Tnjdkm6hRfJqUCZCKfPqE4VGm1R2lAHPk'], ['Aura ANC Wireless Headphones', '₹4,999', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHh6MfgLlfMnUGoP80zilS3OdTwH3-uyKHYkiTyaf0TPZYUby9EZOsKW0fNui_ENvb7kSxp4HjNeZoLRcbNm4JWQ8-B6LiYpkrWZXIyfRAP8ek7s4Zz0Wl4ek0KKfmX9zJBVKIzbtkOaW2KmNHDDAkHm_kJV0EgI8mGjPrmIkWahotPy5H5Mp3yrETY53PDXRxp7lli2osHUgg3TIynm1j7ZIGADKOz8v4MEur6qI'], ['Classic Minimalist Chrono', '₹3,299', 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7mDlx6fAV46ON-mmmQ88gmkhGxd8V0j7kuh2W1ASV67DCXtAb-KBvbAmfBeP-J5pYf3Brhj66qjszxnHTz5GfAH3tz_3ovtTFILl4urs6x3LfGla71JP-hKA8JLqSIcwPGlSiRvzUeCuZfE41v8NeQjN6Kl0yiR0uGqYZ6ZCrE3_AxrIXOb_aCRKyBa8WYmlw9yiUPqy6d0Izp-UAJBtzr7XcM0uGQKGENf2-SF4'], ['TerraGrip Trail Shoes', '₹3,499', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGdYvVQpRUIP7ssv0smnUq3JHwiUulRXKTjzfRgNfzkxzZoiCg2uGbgb4d2wgk_vQQbqvIXqzWskQJSABd3NhUs9QNs6viNpWgLVaiZdWP1shnsCel57z-PvzM6-z1lk7FEnE8iDbL6YSSNgUoN7GaI_HSsP74Lx2hjQZOPesLQaqqfwnolexaCORsMPC9WkU4NAONrwHYrurTpDwA9lnIh4CfbTssv2JnXyD0L-w']];

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const { token, user } = useAuth();
  const [product, setProduct] = useState(fallbackProduct(id));
  const [productLoading, setProductLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('9');
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('560001');
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [reviews, setReviews] = useState([]);
  const [reviewSummary, setReviewSummary] = useState({ averageRating: 0, reviewCount: 0 });
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewError, setReviewError] = useState('');
  const [reviewSaving, setReviewSaving] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setProductLoading(true);
    fetch(apiUrl(`/api/products/${id}`))
      .then((res) => res.json())
      .then((data) => { if (active) setProduct(data.product ? { ...data.product, isDemo: Boolean(data.demo) } : fallbackProduct(id)); })
      .catch(() => { if (active) setProduct(fallbackProduct(id)); })
      .finally(() => { if (active) setProductLoading(false); });
    return () => { active = false; };
  }, [id]);
  useEffect(() => {
    let active = true;
    setReviewLoading(true);
    fetch(apiUrl(`/api/reviews/${encodeURIComponent(id)}`)).then((res) => res.json()).then((data) => {
      if (!active) return;
      if (data.success) { setReviews(data.reviews || []); setReviewSummary({ averageRating: data.averageRating || 0, reviewCount: data.reviewCount || 0 }); }
    }).catch(() => {}).finally(() => { if (active) setReviewLoading(false); });
    return () => { active = false; };
  }, [id]);
  const submitReview = async (event) => {
    event.preventDefault();
    setReviewError('');
    setReviewSaving(true);
    try {
      const response = await fetch(apiUrl(`/api/reviews/${encodeURIComponent(id)}`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ rating: reviewRating, title: reviewTitle, comment: reviewComment })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || 'Your review could not be saved.');
      setReviews((current) => [data.review, ...current.filter((item) => item._id !== data.review._id)]);
      setReviewSummary({ averageRating: data.averageRating, reviewCount: data.reviewCount });
      setReviewTitle('');
      setReviewComment('');
    } catch (error) { setReviewError(error.message); }
    finally { setReviewSaving(false); }
  };
  if (!product) return <div className="container page-header"><h1>{productLoading ? 'Loading product…' : 'Product not found'}</h1>{!productLoading && <Link to="/shop" className="inline-link">Return to shop</Link>}</div>;
  const referenceGallery = id === 'demo-shoe' ? [product.image, 'https://lh3.googleusercontent.com/aida-public/AB6AXuD38T0DXv_ItqvM3HUMpie7j-S62yQSA_nEtQqXRtWbMZTqdcoVBm-kdD1aCVOCdv4wX2eiLmB2q0kmvEgXGeu1ottuJ3O5m7YMphgNlI0CKGh57i5GX80HghBBt-hRFINseMqv-vbKNB4i-jwpVku26BotSMnMiwmnEPzPN-KGmiteN2w7sE46ecl404_byggEuN_6q5SyicrWDCcRwnoc3I49F36_IJ5owIeP0IA', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDESl4di9s8QLsS_NlA_UpNW2s2pOlIddg4Hhah87lsqiKyMxRhCmupGYKZ9vgCt5RNBd6EcjbjKtOSThoVMTmhlVC7D8LKRPA5dWfWx6Khk_E6_lOGWE3hpaRv0N8u7Z4vkOeRDh8kEEXCDjoeehxIHiKLRghj8SUkBW49hkW-n0mnQqeNr2a9C9ljk4dGuQq4CsNXIrW8yGpqqTKPlKYHx35mHrotm5dmyqp2eBw', 'https://lh3.googleusercontent.com/aida-public/AB6AXuARQM86sKSZxyGm3aNn-3hbX39TWmKLd0_Ua1PSM8my3GoJUvl0h3vliwEQFqsCkwfjofKIRh-yzZkexz4LnIaCJ1-6hNpFeyypHlCFUtn3KiGgFapDvVjStOz2kHbzD2bWV9UGKo9B_BDWYRKCpXz5joqtScazv8AU_GqTbuZfPyVE4OcrDGFBKLlAyyFS_y9FssE4QEp0EHQ5MLyTx9UdfJfWvylTUF-0kfum7TI', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBsLhou-8XF1QBaMIN7lNsu_sdGlKVBO1V-zhClX9wBqRhNGp3J52dhbGcsJzPoin4yg9OZEFx0GFiBJfAtQcF-wCcI_UJQd9hiZHpXogD2QDOH5-hLlBVV8oD3TUQap4MLxAXfWwMzIvVyEHW7UgSlHj3CqbFe3p6sM6EjQriPalA8pmWX3VhKZUMX8tV_Qsezl3xoir-HtUhHdfxNvsE62rNcxl1PjG4sYYTpRk'] : [product.image, product.image, product.image, product.image];
  const gallery = referenceGallery.slice(0, 4);
  const colors = product.colors || ['Black', 'White', 'Navy'];
  const sizes = product.sizes || ['7', '8', '9', '10', '11'];
  const activeColor = colors.includes(selectedColor) ? selectedColor : colors[0];
  const activeSize = sizes.includes(selectedSize) ? selectedSize : sizes[0];
  const addProduct = (goToCart = false) => {
    if (!product.isDemo && product.stock === 0) return;
    addToCart(product, quantity, { size: activeSize, color: activeColor });
    setAdded(true);
    if (goToCart) navigate('/checkout');
    else window.setTimeout(() => setAdded(false), 1800);
  };
  const saved = isWishlisted(product);

  return <div className="product-detail-page">
    <div className="container product-breadcrumb">Home&nbsp; / &nbsp;{product.category}&nbsp; / &nbsp;{product.name}</div>
    <div className="container product-detail-top">
      <section className="product-gallery"><div className="main-product-image"><img src={gallery[activeImage]} alt={product.name} /><span>♧ &nbsp;Tap to Zoom</span><b>◉ 29% OFF</b></div><div className="thumbnail-row">{gallery.map((image, index) => <button type="button" className={activeImage === index ? 'selected' : ''} onClick={() => setActiveImage(index)} key={`${image}-${index}`}><img src={image} alt={`${product.name} view ${index + 1}`} /></button>)}</div><div className="product-benefits"><span>◉<b>100% Original</b><small>Direct from brand</small></span><span>◷<b>7 Day Returns</b><small>Hassle-free pickup</small></span><span>⚡<b>Free Delivery</b><small>On prepaid orders</small></span></div></section>
      <section className="purchase-panel"><div className="detail-meta"><span>YOURBRAND {String(product.categoryName || product.category?.name || product.category || '').toUpperCase()}</span><b>♧ Verified Quality</b></div><h1>{product.name}</h1><div className="detail-rating"><strong>★ {product.rating}</strong><span>{product.reviews} customer reviews</span><a href="#reviews">Ask a Question</a></div><div className="detail-price"><strong>{inr(productPrice(product))}</strong>{product.originalPrice && <del>{inr(productPrice({ ...product, price: product.originalPrice }))}</del>}<small>Inclusive of all taxes</small></div><div className="stock-note">● {product.stock === 0 && !product.isDemo ? 'Currently unavailable' : 'In Stock'}{product.stock > 0 && <b> — {product.stock} left</b>}</div><p className="detail-description">{product.description}</p><div className="choice-group"><h3>Color: <small>{activeColor}</small></h3><div className="detail-swatches">{colors.map((color) => <button type="button" className={activeColor === color ? 'selected' : ''} onClick={() => setSelectedColor(color)} key={color} aria-label={color} title={color}></button>)}</div></div><div className="choice-group"><h3>UK / India Size: <a href="#">Size Guide</a></h3><div className="size-options">{sizes.map((size) => <button type="button" className={activeSize === size ? 'selected' : ''} onClick={() => setSelectedSize(size)} key={size}>{size}</button>)}</div></div><div className="quantity-row"><button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button><span>{quantity}</span><button type="button" onClick={() => setQuantity(quantity + 1)}>＋</button><button className="wishlist-button" type="button" onClick={() => toggleWishlist(product)}>{saved ? '♥ Saved to Wishlist' : '♡ Add to Wishlist'}</button></div><div className="purchase-actions"><button className="add-cart" type="button" onClick={() => addProduct(false)}>{added ? '✓ Added to Cart' : '🛒 Add to Cart'}</button><button className="buy-now" type="button" onClick={() => addProduct(true)}>⚡ Buy Now</button></div><div className="delivery-check"><h3>▣ Check Delivery & Service Availability</h3><div><input value={pincode} onChange={(event) => setPincode(event.target.value)} /><button type="button">Check</button></div><small>◉ Delivery available to Bengaluru, {pincode}. Expected delivery in 3–5 business days (Free shipping applied).</small></div></section>
    </div>
    <section className="container product-info-section"><h2>Product Information & Policies</h2><details open><summary>☷ &nbsp; Product Details & Engineering <span>⌃</span></summary><p>Designed for everyday comfort, this product combines lightweight materials with considered details to keep you comfortable throughout the day.</p><div className="spec-table"><span>Upper Material<b>Mesh and synthetic</b></span><span>Outsole Material<b>High-grip vulcanized rubber</b></span><span>Fastening Closure<b>Lace-up ergonomic eyelets</b></span><span>Maintenance & Care<b>Wipe clean with a soft cloth</b></span><span>Country of Origin<b>India</b></span></div></details><details><summary>▣ &nbsp; Delivery & Return Terms <span>⌄</span></summary><p>Free delivery on prepaid orders and easy seven-day returns.</p></details><details className="mobile-only-detail"><summary>♧ &nbsp; Size & Fit Advice <span>⌄</span></summary></details></section>
    <section className="container reviews-panel" id="reviews"><div className="review-heading"><div><h2>Customer Ratings & Reviews</h2><p>Share your experience with this product.</p></div></div><div className="rating-summary"><strong>{reviewSummary.averageRating ? reviewSummary.averageRating.toFixed(1) : '—'}<small>{reviewSummary.averageRating ? '★'.repeat(Math.round(reviewSummary.averageRating)) : '☆☆☆☆☆'}</small><em>Based on {reviewSummary.reviewCount} {reviewSummary.reviewCount === 1 ? 'review' : 'reviews'}</em></strong><div className="review-total-note">Reviews are submitted by signed-in customers.</div></div>
      {user ? <form className="review-form" onSubmit={submitReview}><h3>Write a Review</h3><label>Your rating <span className="review-star-picker" aria-label={`Selected ${reviewRating} out of 5 stars`}>{[1, 2, 3, 4, 5].map((star) => <button key={star} type="button" aria-label={`${star} star${star > 1 ? 's' : ''}`} aria-pressed={reviewRating === star} onClick={() => setReviewRating(star)}>{star <= reviewRating ? '★' : '☆'}</button>)}</span></label><label>Review title (optional)<input value={reviewTitle} onChange={(event) => setReviewTitle(event.target.value)} maxLength={100} placeholder="Sum up your experience" /></label><label>Your review<textarea value={reviewComment} onChange={(event) => setReviewComment(event.target.value)} minLength={10} maxLength={1000} rows="4" required placeholder="What should other shoppers know? (10–1000 characters)" /></label>{reviewError && <p className="auth-error" role="alert">{reviewError}</p>}<button className="add-cart" type="submit" disabled={reviewSaving}>{reviewSaving ? 'Submitting…' : 'Submit Review'}</button></form> : <p className="review-signin"><Link to="/login">Sign in</Link> to share a review.</p>}
      {reviewLoading ? <p className="review-empty">Loading reviews…</p> : reviews.length ? <div className="review-cards">{reviews.map((review) => <article key={review._id}><b>{review.user?.name || 'Customer'} <span className="review-verified">Verified customer</span></b><small>{new Date(review.createdAt).toLocaleDateString()}</small><span className="review-stars">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>{review.title && <h3>{review.title}</h3>}<p>{review.comment}</p></article>)}</div> : <p className="review-empty">No reviews yet. Be the first to share your experience.</p>}
    </section>
    <section className="container related-section"><div className="related-heading"><div><h2>You Might Also Like</h2><p>Curated pairings tailored to you.</p></div><Link to="/shop">View Collection →</Link></div><div className="related-grid">{related.map(([name, price, image]) => <article key={name}><img src={image} alt={name} /><small>ACCESSORIES</small><h3>{name}</h3><strong>{price}</strong><button type="button">♡</button></article>)}</div></section>
    <nav className="mobile-bottom-nav"><Link to="/">⌂<span>Home</span></Link><Link to="/shop">▦<span>Categories</span></Link><Link to="/shop?filter=offers">◇<span>Offers</span></Link><Link to="/wishlist">♡<span>Wishlist</span></Link><Link to="/login">♙<span>Account</span></Link></nav>
  </div>;
}

export default ProductPage;
