import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Icon from './Icon.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useStore } from '../context/StoreContext.jsx';

const mainLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop', label: 'Shop' },
  { to: '/shop?filter=categories', label: 'Categories' },
  { to: '/shop?filter=new', label: 'New Arrivals' },
  { to: '/shop?filter=bestsellers', label: 'Best Sellers' }
];

const categoryLinks = [
  { to: '/shop?category=Men', label: 'Men' },
  { to: '/shop?category=Women', label: 'Women' },
  { to: '/shop?category=Electronics', label: 'Electronics' },
  { to: '/shop?category=Footwear', label: 'Footwear' },
  { to: '/shop?category=Accessories', label: 'Accessories' }
];

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cartCount, cartTotal, wishlist } = useStore();
  const [query, setQuery] = useState('');
  const [mobileSearch, setMobileSearch] = useState(false);

  const search = (event) => {
    event.preventDefault();
    const next = query.trim();
    navigate(next ? `/shop?q=${encodeURIComponent(next)}` : '/shop');
    setMobileSearch(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col">
        <div className="bg-primary-container text-on-primary-container text-label-md px-4 md:px-margin">
          <div className="max-w-7xl mx-auto flex items-center justify-between h-9">
            <div className="flex items-center gap-space-xs text-on-primary">
              <Icon name="auto_awesome" className="text-[16px] text-tertiary-fixed-dim" />
              <span className="font-medium">Free shipping on orders above ₹999</span>
            </div>
            <div className="hidden sm:flex items-center gap-space-lg">
              <Link to="/cart" className="hover:text-on-primary transition-colors flex items-center gap-1 text-label-md">
                <Icon name="local_shipping" className="text-[14px]" />
                Track Order
              </Link>
              <span className="text-outline-variant/40">|</span>
              <Link to="/shop" className="hover:text-on-primary transition-colors flex items-center gap-1 text-label-md">
                <Icon name="help" className="text-[14px]" />
                Help &amp; FAQs
              </Link>
            </div>
          </div>
        </div>

        <div className="px-4 md:px-margin py-space-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-space-lg h-16">
            <div className="flex items-center gap-space-xl min-w-0">
              <Link to="/" className="flex items-center gap-space-xs shrink-0">
                <span className="h-8 w-8 rounded-lg bg-primary-container text-on-primary grid place-items-center font-extrabold">Y</span>
                <span className="text-headline-sm text-on-surface tracking-tight hidden sm:inline">YourBrand</span>
              </Link>
              <nav className="hidden xl:flex items-center gap-space-md">
                {mainLinks.map((link) => (
                  <NavLink
                    key={link.label}
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) =>
                      isActive
                        ? 'text-on-surface font-semibold'
                        : 'text-on-surface-variant hover:text-on-surface text-title-md transition-colors'
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <Link to="/shop?filter=offers" className="text-on-surface-variant hover:text-on-surface text-title-md transition-colors flex items-center gap-1.5">
                  Offers
                  <span className="bg-tertiary-fixed text-on-tertiary-fixed text-label-badge px-2 py-0.5 rounded-full uppercase tracking-wider">HOT</span>
                </Link>
              </nav>
            </div>

            <form onSubmit={search} className="flex-1 max-w-md hidden md:block">
              <div className="relative flex items-center w-full">
                <Icon name="search" className="absolute left-3 text-on-surface-variant text-[20px] pointer-events-none" />
                <input
                  className="w-full pl-10 pr-4 py-2 bg-surface-container-low text-on-surface placeholder:text-outline text-body-sm rounded-full outline-none focus:ring-2 focus:ring-secondary/20 transition-all"
                  placeholder="Search for products, brands and more..."
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
            </form>

            <div className="flex items-center gap-space-md">
              <button
                type="button"
                className="md:hidden p-2 text-on-surface-variant hover:text-on-surface"
                onClick={() => setMobileSearch((open) => !open)}
                aria-label="Search"
              >
                <Icon name="search" />
              </button>
              <Link to="/wishlist" className="relative p-2 text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center" aria-label="Wishlist">
                <Icon name="favorite" className="text-[24px]" />
                {wishlist.length > 0 && <span className="absolute -top-0.5 -right-0.5 bg-secondary text-on-secondary text-label-badge w-4 h-4 rounded-full flex items-center justify-center">{wishlist.length}</span>}
              </Link>
              <Link to="/cart" className="flex items-center gap-space-xs p-1.5 pl-2.5 rounded-full hover:bg-surface-container transition-colors group">
                <div className="relative">
                  <Icon name="shopping_bag" className="text-[24px] text-on-surface-variant group-hover:text-on-surface" />
                  {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-secondary text-on-secondary text-label-badge w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>}
                </div>
                <div className="hidden sm:flex flex-col text-left pr-1.5">
                  <span className="text-label-badge text-outline">Cart</span>
                  <span className="text-label-md text-on-surface">₹{Math.round(cartTotal).toLocaleString('en-IN')}</span>
                </div>
              </Link>
              <div className="h-6 w-px bg-surface-container-high hidden sm:block" />
              {user ? (
                <div className="flex items-center gap-2">
                  <Link to="/login" className="flex items-center gap-space-xs pl-1 pr-2 py-1 rounded-full hover:bg-surface-container transition-colors">
                    <span className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed grid place-items-center text-label-lg font-bold">{user.name?.split(/\s+/).map((part) => part[0]).slice(0, 2).join('').toUpperCase()}</span>
                    <span className="text-label-lg text-on-surface hidden lg:inline">{user.name}</span>
                  </Link>
                  <button type="button" onClick={() => { logout(); navigate('/'); }} className="text-label-md text-on-surface-variant hover:text-on-surface">Sign out</button>
                </div>
              ) : (
                <div className="flex items-center gap-2 shrink-0">
                  <Link to="/login" className="px-3 py-2 rounded-lg text-label-md text-on-surface hover:bg-surface-container transition-colors">Sign in</Link>
                  <Link to="/register" className="px-3 py-2 rounded-lg bg-primary text-on-primary text-label-md hover:bg-inverse-surface transition-colors">Create account</Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {mobileSearch && (
          <form onSubmit={search} className="md:hidden px-4 pb-3">
            <input
              autoFocus
              className="w-full px-4 py-2 bg-surface-container-low text-on-surface placeholder:text-outline text-body-sm rounded-full outline-none"
              placeholder="Search products..."
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </form>
        )}

        <div className="px-4 md:px-margin bg-surface-container-lowest border-t border-surface-container-high">
          <div className="max-w-7xl mx-auto flex items-center gap-space-lg h-11 overflow-x-auto text-label-lg">
            <nav className="flex items-center gap-space-lg whitespace-nowrap">
              {categoryLinks.map((link) => (
                <Link key={link.label} to={link.to} className="text-on-surface-variant hover:text-on-surface transition-colors">
                  {link.label}
                </Link>
              ))}
              <Link to="/shop?filter=sale" className="text-on-tertiary-container hover:text-tertiary-container transition-colors flex items-center gap-1 font-bold">
                <Icon name="local_fire_department" className="text-[16px]" />
                Sale
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
