import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useStore, productPrice } from '../context/StoreContext.jsx';
import { apiUrl } from '../api.js';

export const extraProducts = [
  {
    id: 'demo-shoe', name: 'AeroFlex Running Shoes', brand: 'AeroFlex', category: 'Footwear', price: 30, originalPrice: 42, rating: 4.7, reviews: 128,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnBg96qw81KdzsMv22sZcxx5ozqiHhtSjGkTfJkbLCgrQgZEEeW07ga1jHZCtHxe56xjyw3B1Ox42yjyBxmhQ5GqaOdxH5ckwI79cjREv6NgTqedvZRwkzq3HVKK6YZmN1Za6ERCs83QspbF6rAWa4qxCsG9z_m-qHPVNIgOupZe5g7kHbQBNP8Ag-9ObvbG_32PvoDuZuqBZ9h-lG12Ve33glK9en6ctJ2xsWHY8', description: 'Engineered for quiet utility and everyday movement.'
  },
  {
    id: 'demo-shirt', name: 'Nomad Crisp Oxford', brand: 'Nomad', category: 'Apparel', price: 22, originalPrice: 30, rating: 4.8, reviews: 84,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUqBfao6xMejkJ-YvB4tduX5-MKc1TQFHu-IQxFjp6FbyAzP69NwZ_i4eXgLKx78wMUOGLnzfrxC8FFi2n4o3Goi8Zv7lkcMUNKTiaS9i8h9HsL4t-eRZII2V1W4D3CaZYJz-NNnzfiaJ93Su6nr4L8nVOhGaoHmWIaplkDuWQRHb9bggWw_cpmj5rZoX0KqjimGgbMS3lXP4l2-0OPnfISI5_LMp6kczjmRBWsCw', description: 'A breathable cotton essential for every occasion.'
  },
  { id: 'demo-headphones', name: 'Aura Pro Wireless Headphones', brand: 'Aura', category: 'Electronics', price: 60, originalPrice: 80, rating: 4.9, reviews: 310, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApOabSfOIyYJVVqF9iwMdWnrGaWU1TG1xVSgWsNlxDmAwPJyOLNfVvaCDASU2gyA4FbLJ6icpDLh8Hz2w0OKjU4IvXrZpg1zJ_rzi3E32QMHigqlHmSZnK_HxSnAV8AihvCnq_yJ_2cbe8ODw2RDOrRy5MSVnmjGM-7otLMd6tbAaFr_5GuDmCe8pBYP2WoaLtnbWYPDAVJb5jtOHcJGMqL0kmt_Ez2atliItWCBY', description: 'Wireless sound with comfortable, noise-cancelling earcups.' },
  { id: 'demo-pack', name: 'UrbanEdge Minimal Backpack', brand: 'UrbanEdge', category: 'Accessories', price: 26, originalPrice: 35, rating: 4.6, reviews: 92, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQLx1fO0B6y5lSw__DGlueix8phdIv1DTIhZDNk-2fzNH_reByEmXW15m-zWrLkkwso9UuKG-2GNeJrr_9OSITyb7Vd3On06tJvXIyDA2tvou11Y0JyZcHl0DAZTipgPSDZZKR_ztboBwwF1iPIjn5SpAeMgN4QKiRkCt8j53OENHg8ZICuWl2Zmh6mN_YlRSMbXASVDamFlZk6KGgbaeo0aU9NoO03Z_2kBTeorg', description: 'A clean, durable daypack for everyday carry.' },
  { id: 'demo-trail', name: 'TerraGrip Trail Hiking Shoes', brand: 'AeroFlex', category: 'Footwear', price: 42, originalPrice: 60, rating: 4.8, reviews: 67, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCwN0YyI8RWmrJfknbs6P5_3SAnZpAuJ15gW5I-vzqf0X06GiCP-Nw2ewPCt-rR7pT-wIBGZxXx6iecCD9yj403Xc5Pw0SirkhwCXGMxoYJupJOHPc3fOItCKlLusHT9cPgOKYw-roZ0Dh7qfzfz3DSC2A-tjm-QNdCtq86P5MwcjBVhcl4XtDsQyxk4G4hW_6dzTC9eS-mtPuzQAHtNEAjusFqlifDraUAfuDT10', description: 'Grip and cushioning for all-terrain weekend hikes.' },
  { id: 'demo-tee', name: 'StudioCore Oversized Tee', brand: 'StudioCore', category: 'Apparel', price: 12, originalPrice: 18, rating: 4.5, reviews: 114, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfVXHq9_FKylhn060AEQnMX230XRk1olmSF_XFCRPBoRFhiPr6fuSBOrD1R9gOP82FInCgBEOtG4c3YdjTYSePkeZo5wV1Og2l9bLMnEGf-9z9-M-R9B53bDT0LtTMzsD91kgxhEMql2FAmfw_nVpua7R6b0zFb1t8MDpDS5xQ9lHgqywiCL7hqFZzIQy1l0UW6Su3CRPRSoNqxJ_6jKZPoIavcGrakMVswiSUYHc', description: 'A heavyweight cotton tee with a relaxed fit.' },
  { id: 'demo-knit', name: 'Nordic Knit Merino Wool', brand: 'Nomad', category: 'Apparel', price: 35, originalPrice: 47, rating: 4.9, reviews: 42, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNE2xiI7I49PHp-tzqlxNZ7L1R_OJak72vCf7Pipduiir3js2Jr9cYJypLrbnhHbBcytav8VMMR81ZVjNQcy_k7cc451aKBufLgL7CccrO1fAvNc-6Qze4ibF1VN286lGH-rrEaIQpewcHMAgfVxC43c0_-4GwTaqqLIQbCDMzv4cmh1MHUAtZCu70CEQ_l7KeGzWL6odBFoyZjMdECP6cbjhKZEEn8wtyx4RH_lM', description: 'Soft merino knitwear in a timeless warm neutral.' },
  { id: 'demo-watch', name: 'Verve Chronograph Watch', brand: 'UrbanEdge', category: 'Accessories', price: 40, originalPrice: 55, rating: 4.7, reviews: 88, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAK845mHeXoQ8B9xGl4CF9SkuShBBCeDt0xL56oKx-Vmmh-UTB7klWjRG6zNQ85eJewGs4223pVmPJiAzGcI7dFC8L2L72KpVRW1-8dx2RGE3ZWzFGoNiUmB0PYEy36Vruf8Zs0hMvhLXKUV4U2lfj-VtbVo_sRzLD7HLCZ2bSoN3iozt99YFYPc-Sswg3qOdfOJeKZKswjQicrETiu8GF_YSSAZI1EcRNFN7yBEXs', description: 'A minimal chronograph with a brushed steel finish.' },
  { id: 'demo-earbuds', name: 'PulsePro Smart Earbuds', brand: 'Aura', category: 'Electronics', price: 20, originalPrice: 32, rating: 4.6, reviews: 76, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXyysjCGTeHu0lQji48gg7FkPHG2W4IgrkoXH6qFnYuihhngWVpsPVEOZPaW2oWS0jx64y7TE8ZDgPycLpIsKqM8Esi1p4IeAyNR58RBVq1zJ0yNNTDVtubkLaEbLkVIGNmqRvZWj26hNr4zEkEmU90DBrvd7xxwhTnvbeZ6QmiAP28fFh3pvQccj0q8v2qK6vHS_s8e_p7yBX6fKSXrkDm_aVbedKsKuRrkE_tcc', description: 'Compact everyday audio with a simple charging case.' }
];

const inr = (value) => `₹${Math.round(value).toLocaleString('en-IN')}`;

function FilterPanel({ category, setCategory, brand, setBrand, categoryOptions, brandOptions, maxPrice, setMaxPrice, minRating, setMinRating, inStock, setInStock, clear }) {
  return (
    <aside className="shop-filters">
      <div className="filter-heading"><strong>Filters</strong><button type="button" className="clear-filter" onClick={clear}>Clear all</button></div>
      <FilterGroup title="Category"><label className="filter-check"><input type="radio" name="category" checked={!category} onChange={() => setCategory('')} /><span>All products</span></label>{categoryOptions.map((value) => <label className="filter-check" key={value}><input type="radio" name="category" checked={category.toLowerCase() === value.toLowerCase()} onChange={() => setCategory(value)} /><span>{value}</span></label>)}</FilterGroup>
      <FilterGroup title="Brand">{brandOptions.map((value) => <label className="filter-check" key={value}><input type="radio" name="brand" checked={brand === value} onChange={() => setBrand(brand === value ? '' : value)} /><span>{value}</span></label>)}</FilterGroup>
      <FilterGroup title="Maximum price"><input aria-label="Maximum price" type="range" min="500" max="12000" step="500" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} /><div className="range-values"><span>₹500</span><span>{inr(maxPrice)}</span></div></FilterGroup>
      <FilterGroup title="Customer rating"><label className="filter-check"><input type="checkbox" checked={minRating >= 4} onChange={(event) => setMinRating(event.target.checked ? 4 : 0)} /><span>★★★★☆ &amp; above</span></label></FilterGroup>
      <FilterGroup title="Availability"><label className="filter-check"><input type="checkbox" checked={inStock} onChange={(event) => setInStock(event.target.checked)} /><span>In stock</span></label></FilterGroup>
    </aside>
  );
}

function FilterGroup({ title, children }) {
  return <section className="filter-group"><h3>{title}<span>⌃</span></h3>{children}</section>;
}

function ShopCard({ product, index, addToCart, toggleWishlist, isWishlisted }) {
  const discount = 20 + (index % 4) * 5;
  const available = product.isDemo || product.stock === undefined || product.stock > 0;
  return <article className="shop-card">
    <div className="shop-card-image"><Link to={`/product/${product.id}`}><img src={product.image} alt={product.name} /></Link><span className="discount-badge">{index === 0 ? '★ BEST SELLER' : index === 2 ? 'SALE' : `${discount}% OFF`}</span><button className="heart-button" type="button" aria-label={`${isWishlisted(product) ? 'Remove' : 'Save'} ${product.name}`} onClick={() => toggleWishlist(product)}>{isWishlisted(product) ? '♥' : '♡'}</button></div>
    <div className="shop-card-body"><div className="shop-card-meta"><span>{product.brand?.toUpperCase()}</span><b>☆ {product.rating} ({product.reviews})</b></div><h2><Link to={`/product/${product.id}`}>{product.name}</Link></h2><p>{product.description}</p><div className="shop-price"><strong>{inr(productPrice(product))}</strong>{product.originalPrice && <del>{inr(productPrice({ ...product, price: product.originalPrice }))}</del>}<button className="quick-add" type="button" disabled={!available} aria-label={`${available ? 'Add' : 'Unavailable'} ${product.name} ${available ? 'to cart' : ''}`} onClick={() => addToCart(product)}>{available ? '＋' : '×'}</button></div></div>
  </article>;
}

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState('Recommended');
  const [showFilters, setShowFilters] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [brand, setBrand] = useState('');
  const [maxPrice, setMaxPrice] = useState(12000);
  const [minRating, setMinRating] = useState(0);
  const [inStock, setInStock] = useState(false);
  const { addToCart, toggleWishlist, isWishlisted } = useStore();

  useEffect(() => {
    fetch(apiUrl('/api/products')).then((res) => res.json()).then((data) => setProducts((data.products || []).map((product) => ({ ...product, isDemo: Boolean(data.demo) })))).catch(() => setProducts([]));
  }, []);
  useEffect(() => setCategory(searchParams.get('category') || ''), [searchParams]);

  const catalog = useMemo(() => {
    const query = (searchParams.get('q') || '').trim().toLowerCase();
    return [...extraProducts, ...products].map((product) => ({ ...product, id: product.id || product._id, categoryName: product.categoryName || product.category?.name || product.category })).filter((product) => {
      const productCategory = String(product.categoryName || product.category || '').toLowerCase();
      const targetCategory = ['men', 'women'].includes(category.toLowerCase()) ? 'apparel' : category.toLowerCase();
      return (!category || productCategory.includes(targetCategory)) && (!brand || product.brand === brand) && productPrice(product) <= maxPrice && Number(product.rating || 0) >= minRating && (!inStock || product.stock === undefined || product.stock > 0) && (!query || `${product.name} ${product.brand} ${product.description}`.toLowerCase().includes(query));
    }).sort((a, b) => sort === 'Price: Low to High' ? productPrice(a) - productPrice(b) : sort === 'Price: High to Low' ? productPrice(b) - productPrice(a) : 0);
  }, [products, sort, category, brand, maxPrice, minRating, inStock, searchParams]);
  const clearFilters = () => { setCategory(''); setBrand(''); setMaxPrice(12000); setMinRating(0); setInStock(false); setSearchParams({}); };
  const activeFilterCount = Number(Boolean(category)) + Number(Boolean(brand)) + Number(maxPrice < 12000) + Number(Boolean(minRating)) + Number(Boolean(inStock));
  const allProducts = [...extraProducts, ...products].map((product) => ({ ...product, isDemo: product.isDemo || String(product.id || '').startsWith('demo-'), categoryName: product.categoryName || product.category?.name || product.category }));
  const categoryOptions = [...new Set(allProducts.map((product) => product.categoryName).filter(Boolean))].sort();
  const brandOptions = [...new Set(allProducts.map((product) => product.brand).filter(Boolean))].sort();

  return <div className="shop-page">
    <div className="container shop-breadcrumb">⌂ Home&nbsp; / &nbsp;Shop</div>
    <div className="container shop-title-row"><div><h1>Shop All Products <span>{catalog.length} products</span></h1><p>Browse the full collection and find something that's right for you. Engineered for quiet utility<br className="desktop-only" /> and everyday longevity.</p></div><div className="desktop-sort">Sort by: <select value={sort} onChange={(event) => setSort(event.target.value)}><option>Recommended</option><option>Price: Low to High</option><option>Price: High to Low</option></select></div></div>
    {(category || brand || maxPrice < 12000 || minRating || inStock || searchParams.get('q')) && <div className="container active-filters"><span>Active filters:</span>{category && <button onClick={() => setCategory('')}>{category} ×</button>}{brand && <button onClick={() => setBrand('')}>{brand} ×</button>}{maxPrice < 12000 && <button onClick={() => setMaxPrice(12000)}>Under {inr(maxPrice)} ×</button>}{minRating > 0 && <button onClick={() => setMinRating(0)}>4+ stars ×</button>}{inStock && <button onClick={() => setInStock(false)}>In stock ×</button>}{searchParams.get('q') && <b>Search: {searchParams.get('q')}</b>}<button type="button" onClick={clearFilters}>Clear all</button></div>}
    <div className="container mobile-shop-controls"><button type="button" onClick={() => setShowFilters(!showFilters)}>☷ Filters <b>{activeFilterCount}</b></button><label>↕ Sort: <select value={sort} onChange={(event) => setSort(event.target.value)}><option>Recommended</option><option>Price: Low to High</option><option>Price: High to Low</option></select></label></div>
    <div className="container shop-layout"><div className={showFilters ? 'mobile-filter-open' : 'mobile-filter-hidden'}><FilterPanel {...{ category, setCategory, brand, setBrand, categoryOptions, brandOptions, maxPrice, setMaxPrice, minRating, setMinRating, inStock, setInStock, clear: clearFilters }} /></div><main className="shop-results">{catalog.length ? <div className="shop-grid">{catalog.map((product, index) => <ShopCard product={product} index={index} addToCart={addToCart} toggleWishlist={toggleWishlist} isWishlisted={isWishlisted} key={product.id || product._id} />)}</div> : <section className="empty-state"><h2>No products match these filters</h2><p>Try changing your category, price range, or search.</p><button className="secondary-btn" onClick={clearFilters}>Clear filters</button></section>}<div className="shop-pagination"><span>Showing {catalog.length} products</span></div></main></div>
    <div className="container shop-services"><span>🚚<b>Free Shipping</b></span><span>◷<b>Easy Returns</b></span><span>♧<b>100% Genuine</b></span></div>
    <nav className="mobile-bottom-nav"><Link to="/">⌂<span>Home</span></Link><Link to="/shop">▦<span>Categories</span></Link><Link to="/shop?filter=offers">◇<span>Offers</span></Link><Link to="/wishlist">♡<span>Wishlist</span></Link><Link to="/login">♙<span>Account</span></Link></nav>
  </div>;
}

export default ShopPage;
