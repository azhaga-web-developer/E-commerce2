import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminChrome from '../components/AdminChrome.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { apiUrl } from '../api.js';

const money = (value) => `₹${Math.round(Number(value) || 0).toLocaleString('en-IN')}`;
const when = (value) => new Date(value).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

function MetricCard({ label, value, detail, icon, className = '' }) {
  return <article className={`metric-card ${className}`}><div><span>{label}</span><b>{value}</b><small>{detail}</small></div><i>{icon}</i></article>;
}

function AdminPage() {
  const { token, user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const loadSummary = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(apiUrl('/api/admin/dashboard'), { headers: { Authorization: `Bearer ${token}` } });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || 'Could not load dashboard data.');
      setSummary(data);
    } catch (loadError) { setError(loadError.message); }
    finally { setLoading(false); }
  }, [token]);
  useEffect(() => { loadSummary(); }, [loadSummary]);

  const metrics = summary?.metrics;
  const orders = summary?.recentOrders || [];
  const lowStock = summary?.lowStock || [];
  const statuses = summary?.statusCounts || {};

  return <AdminChrome active="Dashboard"><div className="admin-main-content">
    <div className="admin-greeting"><div><h1>Welcome, <strong>{user?.name || 'Admin'}</strong></h1><p>Live totals and recent activity from your MongoDB store.</p></div><button className="export-button" type="button" onClick={loadSummary} disabled={loading}>{loading ? 'Loading…' : '↻ Refresh data'}</button></div>
    {error && <p className="auth-error" role="alert">{error}</p>}
    <div className="admin-metrics"><MetricCard label="TOTAL REVENUE" value={metrics ? money(metrics.revenue) : loading ? '…' : '—'} detail="Orders excluding cancelled" icon="₹" /><MetricCard label="TOTAL ORDERS" value={metrics ? metrics.orderCount.toLocaleString('en-IN') : loading ? '…' : '—'} detail={`${statuses.Processing || 0} processing`} icon="▣" /><MetricCard label="CUSTOMER ACCOUNTS" value={metrics ? metrics.customers.toLocaleString('en-IN') : loading ? '…' : '—'} detail="Non-admin customers" icon="♙" /><MetricCard label="ACTIVE PRODUCTS" value={metrics ? metrics.productCount.toLocaleString('en-IN') : loading ? '…' : '—'} detail={`${metrics?.lowStockCount ?? 0} low-stock alerts`} icon="▤" className="low-stock" /></div>
    <div className="admin-lower admin-live-panels"><section className="admin-panel recent-orders"><div className="panel-heading"><div><h2>Recent orders</h2><p>Newest orders recorded by the store.</p></div><Link to="/admin/orders">View all orders →</Link></div>
      {loading && <p className="admin-data-empty">Loading orders…</p>}{!loading && !orders.length && <p className="admin-data-empty">No orders have been placed yet.</p>}
      {!!orders.length && <div className="orders-table"><div className="order-table-head"><span>ORDER</span><span>CUSTOMER</span><span>DATE</span><span>AMOUNT</span><span>STATUS</span></div>{orders.map((order) => <article key={order._id}><b>#{order._id.slice(-8).toUpperCase()}</b><span className="customer">{order.user?.name || 'Unknown customer'}<small>{order.user?.email || ''}</small></span><span>{when(order.createdAt)}</span><strong>{money(order.total)}</strong><span className={`order-status ${String(order.status).toLowerCase()}`}>● {order.status}</span></article>)}</div>}
    </section><section className="admin-panel inventory-panel"><div className="panel-heading"><div><h2>Low stock</h2><p>Active products with five or fewer units.</p></div><Link to="/admin/products">Catalog →</Link></div>{!lowStock.length && <p className="admin-data-empty">No low-stock products.</p>}{lowStock.map((product) => <article className="inventory-item" key={product._id}><img src={product.image} alt={product.name} /><div><strong>{product.name}</strong><small>{product.brand}</small><b>Stock: <em>{product.stock}</em></b></div></article>)}<Link className="manage-catalog" to="/admin/products">Manage products →</Link></section></div>
  </div></AdminChrome>;
}

export default AdminPage;
