import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminChrome from '../components/AdminChrome.jsx';

const fallbackProducts = [
  { name: 'AeroFlex Running Shoes', sku: 'AF-RUN-09', category: 'Footwear', color: 'Navy Blue / US 10', price: 2499, originalPrice: 3499, stock: 6, rating: 4.8, sales: 184, status: 'Live', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnBg96qw81KdzsMv22sZcxx5ozqiHhtSjGkTfJkbLCgrQgZEEeW07ga1jHZCtHxe56xjyw3B1Ox42yjyBxmhQ5GqaOdxH5ckwI79cjREv6NgTqedvZRwkzq3HVKK6YZmN1Za6ERCs83QspbF6rAWa4qxCsG9z_m-qHPVNIgOupZe5g7kHbQBNP8Ag-9ObvbG_32PvoDuZuqBZ9h-lG12Ve33glK9en6ctJ2xsWHY8' },
  { name: 'Nomad Crisp Oxford Shirt', sku: 'NM-OXF-M', category: 'Apparel', color: 'Sky Blue / Medium', price: 1899, stock: 42, rating: 4.6, sales: 310, status: 'Live', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUqBfao6xMejkJ-YvB4tduX5-MKc1TQFHu-IQxFjp6FbyAzP69NwZ_i4eXgLKx78wMUOGLnzfrxC8FFi2n4o3Goi8Zv7lkcMUNKTiaS9i8h9HsL4t-eRZII2V1W4D3CaZYJz-NNnzfiaJ93Su6nr4L8nVOhGaoHmWIaplkDuWQRHb9bggWw_cpmj5rZoX0KqjimGgbMS3lXP4l2-0OPnfISI5_LMp6kczjmRBWsCw' },
  { name: 'Aura Pro Wireless Headphones', sku: 'AU-ANC-01', category: 'Electronics', color: 'Matte Black / ANC', price: 7999, originalPrice: 9999, stock: 89, rating: 4.9, sales: 540, status: 'Live', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApOabSfOIyYJVVqF9iwMdWnrGaWU1TG1xVSgWsNlxDmAwPJyOLNfVvaCDASU2gyA4FbLJ6icpDLh8Hz2w0OKjU4IvXrZpg1zJ_rzi3E32QMHigqlHmSZnK_HxSnAV8AihvCnq_yJ_2cbe8ODw2RDOrRy5MSVnmjGM-7otLMd6tbAaFr_5GuDmCe8pBYP2WoaLtnbWYPDAVJb5jtOHcJGMqL0kmt_Ez2atliItWCBY' },
  { name: 'StudioCore Oversized Tee', sku: 'SC-TEE-XL', category: 'Apparel', color: 'Charcoal / XL', price: 1199, stock: 0, rating: 4.4, sales: 92, status: 'Paused', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfVXHq9_FKylhn060AEQnMX230XRk1olmSF_XFCRPBoRFhiPr6fuSBOrD1R9gOP82FInCgBEOtG4c3YdjTYSePkeZo5wV1Og2l9bLMnEGf-9z9-M-R9B53bDT0LtTMzsD91kgxhEMql2FAmfw_nVpua7R6b0zFb1t8MDpDS5xQ9lHgqywiCL7hqFZzIQy1l0UW6Su3CRPRSoNqxJ_6jKZPoIavcGrakMVswiSUYHc' },
  { name: 'TerraGrip Trail Hiking Shoes', sku: 'TG-TRL-08', category: 'Footwear', color: 'Earth Brown / 8 UK', price: 3850, originalPrice: 4200, stock: 24, rating: 4.7, sales: 218, status: 'Live', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCwN0YyI8RWmrJfknbs6P5_3SAnZpAuJ15gW5I-vzqf0X06GiCP-Nw2ewPCt-rR7pT-wIBGZxXx6iecCD9yj403Xc5Pw0SirkhwCXGMxoYJupJOHPc3fOItCKlLusHT9cPgOKYw-roZ0Dh7qfzfz3DSC2A-tjm-QNdCtq86P5MwcjBVhcl4XtDsQyxk4G4hW_6dzTC9eS-mtPuzQAHtNEAjusFqlifDraUAfuDT10' },
  { name: 'Verve Chronograph Watch', sku: 'VC-WAT-01', category: 'Accessories', color: 'Silver / Navy Dial', price: 8499, stock: 18, rating: 4.9, sales: 86, status: 'Live', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAK845mHeXoQ8B9xGl4CF9SkuShBBCeDt0xL56oKx-Vmmh-UTB7klWjRG6zNQ85eJewGs4223pVmPJiAzGcI7dFC8L2L72KpVRW1-8dx2RGE3ZWzFGoNiUmB0PYEy36Vruf8Zs0hMvhLXKUV4U2lfj-VtbVo_sRzLD7HLCZ2bSoN3iozt99YFYPc-Sswg3qOdfOJeKZKswjQicrETiu8GF_YSSAZI1EcRNFN7yBEXs' },
  { name: 'Nordic Knit Merino Wool', sku: 'NK-SWT-L', category: 'Apparel', color: 'Warm Beige / Large', price: 3299, originalPrice: 4499, stock: 2, rating: 4.8, sales: 142, status: 'Live', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNE2xiI7I49PHp-tzqlxNZ7L1R_OJak72vCf7Pipduiir3js2Jr9cYJypLrbnhHbBcytav8VMMR81ZVjNQcy_k7cc451aKBufLgL7CccrO1fAvNc-6Qze4ibF1VN286lGH-rrEaIQpewcHMAgfVxC43c0_-4GwTaqqLIQbCDMzv4cmh1MHUAtZCu70CEQ_l7KeGzWL6odBFoyZjMdECP6cbjhKZEEn8wtyx4RH_lM' }
];

const money = (value) => `₹${Math.round(Number(value) || 0).toLocaleString('en-IN')}`;

function AdminProductsPage() {
  const [products, setProducts] = useState(fallbackProducts);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [stockFilter, setStockFilter] = useState('All');

  useEffect(() => {
    fetch('/api/products').then((res) => res.json()).then((data) => {
      if (data.products?.length) setProducts(data.products.map((product, index) => ({
        ...fallbackProducts[index % fallbackProducts.length], ...product,
        sku: String(product.id || fallbackProducts[index % fallbackProducts.length].sku).toUpperCase(),
        price: Number(product.price) > 200 ? Number(product.price) : Math.round(Number(product.price) * 83),
        originalPrice: Number(product.originalPrice) > 200 ? Number(product.originalPrice) : Math.round(Number(product.originalPrice || product.price) * 83),
        stock: Number(product.stock ?? (index === 0 ? 6 : index * 12 + 6)),
        image: product.image || fallbackProducts[index % fallbackProducts.length].image
      })));
    }).catch(() => {});
  }, []);

  const visibleProducts = useMemo(() => products.filter((product) => {
    const text = `${product.name} ${product.sku} ${product.category}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (category === 'All Categories' || product.category === category) && (stockFilter === 'All' || (stockFilter === 'In stock' ? product.stock > 0 : product.stock === 0));
  }), [products, query, category, stockFilter]);

  return <AdminChrome active="Products">
    <div className="catalog-heading">
      <div><span className="catalog-breadcrumb">Products</span><h1>Products <small>v2.4.1</small></h1><p>Add, update and manage everything in your product catalog across 156 items.</p></div>
      <div className="catalog-actions"><button type="button">☷ &nbsp; Bulk Actions⌄</button><button type="button">⇩ &nbsp; Export CSV</button><Link to="/admin/add-product">＋ &nbsp; Add Product</Link></div>
    </div>

    <div className="catalog-stats">
      {[
        ['ALL PRODUCTS', '156', '100% active base', 'blue'], ['ACTIVE IN STOCK', '142', '91%', 'blue'], ['LOW STOCK ALERT', '8', 'Needs restock', 'orange'], ['OUT OF STOCK', '6', 'Critical', 'red'], ['DRAFTS & STAGED', '4', 'Unpublished', 'muted']
      ].map(([label, number, detail, tone]) => <article className={`catalog-stat ${tone}`} key={label}><div><span>{label}</span><b className="catalog-stat-icon">{tone === 'orange' ? '⚠' : tone === 'red' ? '⊘' : tone === 'muted' ? '≡' : '▣'}</b></div><strong>{number}</strong><small>{detail}</small><i><em /></i></article>)}
    </div>

    <div className="catalog-tools"><label className="catalog-search">⌕ <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by product name, SKU, or tags..." /></label><select value={category} onChange={(event) => setCategory(event.target.value)}><option>All Categories</option>{[...new Set(products.map((item) => item.category))].map((item) => <option key={item}>{item}</option>)}</select><select value={stockFilter} onChange={(event) => setStockFilter(event.target.value)}><option value="All">Stock Status: All</option><option>In stock</option><option>Out of stock</option></select><button type="button">Brand: All⌄</button><button type="button">☷ Price Range</button><button className="catalog-view" type="button" aria-label="Table view">▤ &nbsp; ▦</button></div>

    <div className="catalog-table-wrap"><table className="catalog-table"><thead><tr><th><input type="checkbox" aria-label="Select all products" /></th><th>PRODUCT <span>↕</span></th><th>CATEGORY</th><th>PRICE <span>↕</span></th><th>INVENTORY &amp; STOCK <span>↕</span></th><th>RATING &amp; SALES</th><th>STATUS</th><th></th></tr></thead><tbody>{visibleProducts.map((product) => {
      const old = Number(product.originalPrice) || 0;
      const sale = old > Number(product.price);
      const stock = Number(product.stock) || 0;
      return <tr key={product.id || product.sku || product.name}><td><input type="checkbox" aria-label={`Select ${product.name}`} /></td><td><div className="catalog-product"><img src={product.image} alt="" /><div><strong>{product.name}</strong><small>SKU: {product.sku} <i>•</i> {product.color}</small></div></div></td><td><span className="catalog-category">{product.category}</span></td><td><strong>{money(product.price)}</strong>{sale ? <><del>{money(old)}</del><small className="catalog-sale">{Math.round((1 - Number(product.price) / old) * 100)}% OFF</small></> : <small>Regular price</small>}</td><td><div className={`catalog-stock ${stock > 0 && stock < 10 ? 'low' : stock === 0 ? 'empty' : ''}`}><span>{stock === 0 ? '● Out of Stock' : stock < 10 ? '● Low Stock' : '● In Stock'}</span><small>{stock === 0 ? '0 left' : stock < 10 ? `${stock} left` : `${stock} in stock`}</small></div><div className="catalog-stock-bar"><i style={{ width: `${Math.min(stock / 90 * 100, 100)}%` }} /></div></td><td><span className="catalog-rating">★ {product.rating || 4.8}</span><small>{product.sales || product.reviews || 184} sales</small></td><td><span className={`catalog-status ${stock === 0 ? 'paused' : ''}`}><i />{stock === 0 ? 'Paused' : 'Live'}</span></td><td><button className="catalog-preview" type="button" aria-label={`Preview ${product.name}`}>◎</button></td></tr>;
    })}</tbody></table>{visibleProducts.length === 0 && <div className="catalog-empty">No products match those filters.</div>}<div className="catalog-pagination"><span>Showing 1–{visibleProducts.length} of 156 products <label>Show <select defaultValue="7"><option>7</option><option>14</option><option>28</option></select> per page</label></span><nav><button type="button" disabled>‹ Previous</button><b>1</b><button type="button">2</button><button type="button">3</button><i>…</i><button type="button">23</button><button type="button">Next ›</button></nav></div></div>
  </AdminChrome>;
}

export default AdminProductsPage;
