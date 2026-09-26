import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import ShopPage from './pages/ShopPage.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import AdminPage from './pages/AdminPage.jsx';
import AdminProductsPage from './pages/AdminProductsPage.jsx';
import AdminAddProductPage from './pages/AdminAddProductPage.jsx';
import AdminOrdersPage from './pages/AdminOrdersPage.jsx';
import AdminCategoriesPage from './pages/AdminCategoriesPage.jsx';
import AdminInventoryPage from './pages/AdminInventoryPage.jsx';
import AdminCustomersPage from './pages/AdminCustomersPage.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

function App() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <AuthProvider>
      <div className={`app-shell ${isAdmin ? '' : 'storefront bg-surface text-on-surface antialiased'}`}>
        {!isAdmin && <Navbar />}

      <main className={isAdmin ? 'page-content' : 'page-content storefront-main pt-[160px] bg-surface min-h-[calc(100vh-280px)]'}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route path="/admin/add-product" element={<AdminAddProductPage />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/admin/categories" element={<AdminCategoriesPage />} />
          <Route path="/admin/inventory" element={<AdminInventoryPage />} />
          <Route path="/admin/customers" element={<AdminCustomersPage />} />
        </Routes>
      </main>

        {!isAdmin && <Footer />}
      </div>
    </AuthProvider>
  );
}

export default App;
