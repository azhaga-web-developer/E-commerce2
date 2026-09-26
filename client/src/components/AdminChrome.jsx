import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function AdminChrome({ children, active = 'Products', title = '' }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const links = [['Dashboard', '/admin', '▦'], ['Orders', '/admin/orders', '▣'], ['Add Product', '/admin/add-product', '⊞']];
  const name = user?.name || 'Admin';
  const initials = name.split(/\s+/).map((part) => part[0]).slice(0, 2).join('').toUpperCase();
  return <div className="admin-page admin-subpage"><aside className="admin-sidebar"><Link to="/" className="admin-brand"><span className="brand-mark">N</span><span>YourBrand<small>ADMIN</small></span></Link><nav>{links.map(([label, href, icon]) => <Link className={active === label ? 'active' : ''} to={href} key={label}>{icon} &nbsp; {label}</Link>)}</nav><div className="admin-sidebar-bottom"><Link to="/">⌂ &nbsp; View Storefront ↗</Link></div></aside><div className="admin-content"><header className="admin-topbar"><Link to="/" className="admin-mobile-brand">YourBrand<small>ADMIN</small></Link><span className="store-pill">● Store admin</span><Link className="new-button" to="/admin/add-product">＋ New product</Link><span className="admin-avatar">{initials}</span><span>{name}</span><button type="button" className="admin-signout" onClick={() => { logout(); navigate('/'); }}>Sign out</button></header><main className="admin-main">{children}</main></div><nav className="admin-mobile-nav"><Link to="/admin">▦<span>Dashboard</span></Link><Link to="/admin/orders">▣<span>Orders</span></Link><Link to="/admin/add-product">⊞<span>Add Product</span></Link></nav></div>;
}

export default AdminChrome;
