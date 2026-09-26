import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AdminChrome from '../components/AdminChrome.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { apiUrl } from '../api.js';

const money = (value) => `₹${Math.round(Number(value) || 0).toLocaleString('en-IN')}`;

function AdminProductsPage() {
  const { token } = useAuth();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [stockFilter, setStockFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState(location.state?.message || '');

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(apiUrl('/api/products/admin/all'), { headers: { Authorization: `Bearer ${token}` } });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || 'Could not load the catalog.');
      setProducts(data.products || []);
    } catch (loadError) { setError(loadError.message); }
    finally { setLoading(false); }
  }, [token]);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  const removeProduct = async (product) => {
    if (!window.confirm(`Delete “${product.name}” from the catalog?`)) return;
    setError('');
    setNotice('');
    try {
      const productId = product._id || product.id;
      const response = await fetch(apiUrl(`/api/products/${productId}`), { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || 'Could not delete this product.');
      setProducts((current) => current.filter((item) => (item._id || item.id) !== productId));
      setNotice(`${product.name} was deleted.`);
    } catch (deleteError) { setError(deleteError.message); }
  };

  const categories = [...new Set(products.map((product) => product.categoryName || product.category?.name).filter(Boolean))].sort();
  const visibleProducts = useMemo(() => products.filter((product) => {
    const productCategory = product.categoryName || product.category?.name || '';
    const text = `${product.name} ${product.brand} ${productCategory}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (category === 'All Categories' || productCategory === category) && (stockFilter === 'All' || (stockFilter === 'In stock' ? product.stock > 0 : product.stock === 0));
  }), [products, query, category, stockFilter]);
  const inStockCount = products.filter((product) => product.isActive && product.stock > 0).length;
  const lowStockCount = products.filter((product) => product.isActive && product.stock > 0 && product.stock <= 5).length;
  const outOfStockCount = products.filter((product) => product.isActive && product.stock === 0).length;

  return <AdminChrome active="Products">
    <div className="catalog-heading"><div><span className="catalog-breadcrumb">Products</span><h1>Product catalog</h1><p>Manage products currently stored in your catalog.</p></div><div className="catalog-actions"><button type="button" onClick={loadProducts}>↻ &nbsp; Refresh</button><Link to="/admin/add-product">＋ &nbsp; Add Product</Link></div></div>
    {notice && <p className="admin-notice" role="status">{notice}<button type="button" onClick={() => setNotice('')}>×</button></p>}{error && <p className="auth-error" role="alert">{error}</p>}
    <div className="catalog-stats">{[['PRODUCTS', products.length, 'In database', 'blue'], ['ACTIVE IN STOCK', inStockCount, 'Available to sell', 'blue'], ['LOW STOCK', lowStockCount, '5 or fewer remaining', 'orange'], ['OUT OF STOCK', outOfStockCount, 'Unavailable', 'red']].map(([label, number, detail, tone]) => <article className={`catalog-stat ${tone}`} key={label}><div><span>{label}</span><b className="catalog-stat-icon">{tone === 'orange' ? '⚠' : tone === 'red' ? '⊘' : '▣'}</b></div><strong>{number}</strong><small>{detail}</small><i><em /></i></article>)}</div>
    <div className="catalog-tools"><label className="catalog-search">⌕ <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search product or brand…" /></label><select value={category} onChange={(event) => setCategory(event.target.value)}><option>All Categories</option>{categories.map((item) => <option key={item}>{item}</option>)}</select><select value={stockFilter} onChange={(event) => setStockFilter(event.target.value)}><option value="All">Stock Status: All</option><option>In stock</option><option>Out of stock</option></select></div>
    <div className="catalog-table-wrap"><table className="catalog-table"><thead><tr><th>PRODUCT</th><th>CATEGORY</th><th>PRICE</th><th>INVENTORY</th><th>RATING</th><th>STATUS</th><th>ACTION</th></tr></thead><tbody>{visibleProducts.map((product) => {
      const stock = Number(product.stock) || 0;
      const id = product._id || product.id;
      return <tr key={id}><td><div className="catalog-product"><img src={product.image} alt="" /><div><strong>{product.name}</strong><small>{product.brand} · {id.slice(-8)}</small></div></div></td><td><span className="catalog-category">{product.categoryName || product.category?.name || 'Uncategorized'}</span></td><td><strong>{money(product.price)}</strong>{product.originalPrice > product.price && <del>{money(product.originalPrice)}</del>}</td><td><div className={`catalog-stock ${stock > 0 && stock < 6 ? 'low' : stock === 0 ? 'empty' : ''}`}><span>● {stock === 0 ? 'Out of stock' : stock < 6 ? 'Low stock' : 'In stock'}</span><small>{stock} left</small></div></td><td><span className="catalog-rating">★ {product.rating || '—'}</span><small>{product.reviews || 0} reviews</small></td><td><span className={`catalog-status ${product.isActive ? '' : 'paused'}`}><i />{product.isActive ? 'Live' : 'Hidden'}</span></td><td><button className="catalog-delete" type="button" onClick={() => removeProduct(product)}>Delete</button></td></tr>;
    })}</tbody></table>{loading && <div className="catalog-empty">Loading products…</div>}{!loading && visibleProducts.length === 0 && <div className="catalog-empty">{products.length ? 'No products match those filters.' : 'No products have been added yet.'}</div>}<div className="catalog-pagination">Showing {visibleProducts.length} of {products.length} products</div></div>
  </AdminChrome>;
}

export default AdminProductsPage;
