import { Link, useLocation } from 'react-router-dom';

function AdminChrome({ children, active = 'Products', title = '' }) {
  const location = useLocation();
  const links = [['Dashboard', '/admin', '▦'], ['Orders', '/admin/orders', '▣'], ['Add Product', '/admin/add-product', '⊞']];
  return <div className="admin-page admin-subpage"><aside className="admin-sidebar"><Link to="/" className="admin-brand"><span className="brand-mark">N</span><span>YourBrand<small>ADMIN</small></span></Link><nav>{links.map(([name, href, icon]) => <Link className={active === name ? 'active' : ''} to={href} key={name}>{icon} &nbsp; {name}</Link>)}</nav><div className="admin-sidebar-bottom"><Link to="/">⌂ &nbsp; View Storefront ↗</Link><Link to="/">ⓘ &nbsp; Help & Docs ›</Link></div></aside><div className="admin-content"><header className="admin-topbar"><button className="admin-menu" type="button">☰</button><Link to="/" className="admin-mobile-brand">YourBrand<small>ADMIN</small></Link><input placeholder="Search orders, products, customers..." /><span className="store-pill">● Store Live<br /><small>99.98% uptime</small></span><Link className="new-button" to="/admin/add-product">＋ New⌄</Link><span>♧</span><span className="admin-avatar">A</span><span>Arun K.⌄</span></header><main className="admin-main">{children}</main></div><nav className="admin-mobile-nav"><Link to="/admin">▦<span>Dashboard</span></Link><Link to="/admin/orders">▣<span>Orders</span></Link><Link to="/admin/add-product">⊞<span>Add Product</span></Link></nav></div>;
}

export default AdminChrome;
