import { useCallback, useEffect, useMemo, useState } from 'react';
import AdminChrome from '../components/AdminChrome.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { apiUrl } from '../api.js';

const money = (value) => `₹${Math.round(Number(value) || 0).toLocaleString('en-IN')}`;
const orderRef = (order) => `#${String(order._id).slice(-8).toUpperCase()}`;

function AdminOrdersPage() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState('');

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(apiUrl('/api/orders/admin/all'), { headers: { Authorization: `Bearer ${token}` } });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || 'Could not load orders.');
      setOrders(data.orders || []);
    } catch (loadError) { setError(loadError.message); }
    finally { setLoading(false); }
  }, [token]);

  useEffect(() => { loadOrders(); }, [loadOrders]);

  const changeStatus = async (order, nextStatus) => {
    setUpdating(order._id);
    setError('');
    try {
      const response = await fetch(apiUrl(`/api/orders/admin/${order._id}/status`), {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: nextStatus })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || 'Could not update the order.');
      setOrders((current) => current.map((item) => item._id === order._id ? data.order : item));
    } catch (updateError) { setError(updateError.message); }
    finally { setUpdating(''); }
  };

  const visibleOrders = useMemo(() => orders.filter((order) => {
    const customer = order.user || {};
    const text = `${orderRef(order)} ${customer.name || ''} ${customer.email || ''} ${order.shippingAddress?.city || ''}`.toLowerCase();
    return (status === 'All' || order.status === status) && text.includes(query.toLowerCase());
  }), [orders, query, status]);
  const statuses = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  const exportCsv = () => {
    const rows = [['Order', 'Customer', 'Email', 'Date', 'Status', 'Payment', 'Total'], ...visibleOrders.map((order) => [orderRef(order), order.user?.name || '', order.user?.email || '', new Date(order.createdAt).toISOString(), order.status, order.paymentMethod, order.total])];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell ?? '').replaceAll('"', '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'orders.csv';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return <AdminChrome active="Orders"><div className="admin-live-orders">
    <div className="orders-heading"><div><span className="live-badge">● LIVE ORDER RECORDS</span><h1>Orders</h1><p>Review orders placed by customers and update their fulfillment status.</p></div><div className="title-actions"><button type="button" onClick={loadOrders} disabled={loading}>↻ Refresh</button><button className="publish-button" type="button" onClick={exportCsv}>⇩ Export CSV</button></div></div>
    {error && <p className="auth-error" role="alert">{error}</p>}
    <div className="order-status-tabs">{statuses.map((item) => <button type="button" className={status === item ? 'active' : ''} onClick={() => setStatus(item)} key={item}>{item} <small>{item === 'All' ? orders.length : orders.filter((order) => order.status === item).length}</small></button>)}</div>
    <div className="order-filters"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search order, customer, email, or city…" /></div>
    <div className="catalog-table-wrap admin-orders-live-table"><table className="catalog-table"><thead><tr><th>ORDER</th><th>CUSTOMER</th><th>ITEMS</th><th>DATE</th><th>PAYMENT</th><th>TOTAL</th><th>STATUS</th><th>UPDATE</th></tr></thead><tbody>{visibleOrders.map((order) => <tr key={order._id}><td><strong>{orderRef(order)}</strong></td><td><strong>{order.user?.name || 'Unknown customer'}</strong><small>{order.user?.email || ''}</small><small>{order.shippingAddress?.city || ''} {order.shippingAddress?.postalCode || ''}</small></td><td>{order.items?.reduce((count, item) => count + item.quantity, 0) || 0}<small>{order.items?.map((item) => item.name).join(', ')}</small></td><td>{new Date(order.createdAt).toLocaleDateString('en-IN')}<small>{new Date(order.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</small></td><td>{String(order.paymentMethod || 'cod').toUpperCase()}</td><td><strong>{money(order.total)}</strong></td><td><span className={`admin-order-status ${String(order.status).toLowerCase()}`}>● {order.status}</span></td><td><select aria-label={`Update status for ${orderRef(order)}`} value={order.status} disabled={updating === order._id} onChange={(event) => changeStatus(order, event.target.value)}>{['Processing', 'Shipped', 'Delivered', 'Cancelled'].map((value) => <option key={value}>{value}</option>)}</select></td></tr>)}</tbody></table>{loading && <div className="catalog-empty">Loading orders…</div>}{!loading && visibleOrders.length === 0 && <div className="catalog-empty">{orders.length ? 'No orders match your search.' : 'There are no orders yet.'}</div>}<div className="catalog-pagination">Showing {visibleOrders.length} of {orders.length} orders</div></div>
  </div></AdminChrome>;
}

export default AdminOrdersPage;
