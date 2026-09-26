import { Link, useLocation } from 'react-router-dom';
import Icon from './Icon.jsx';

const columns = [
  {
    title: 'Shop',
    links: [
      { to: '/shop', label: 'All Products' },
      { to: '/shop?filter=new', label: 'New Arrivals' },
      { to: '/shop?filter=bestsellers', label: 'Best Sellers' },
      { to: '/shop?filter=offers', label: 'Offers' },
      { to: '/shop', label: 'Categories' }
    ]
  },
  {
    title: 'Customer Support',
    links: [
      { to: '/shop', label: 'Contact Us' },
      { to: '/shop', label: 'FAQs' },
      { to: '/shop', label: 'Shipping & Delivery' },
      { to: '/shop', label: 'Returns & Refunds' },
      { to: '/cart', label: 'Track Order' }
    ]
  },
  {
    title: 'Account',
    links: [
      { to: '/login', label: 'My Profile' },
      { to: '/cart', label: 'My Orders' },
      { to: '/shop', label: 'Wishlist' },
      { to: '/checkout', label: 'Addresses' }
    ]
  },
  {
    title: 'Company',
    links: [
      { to: '/', label: 'About Us' },
      { to: '/shop', label: 'Contact' },
      { to: '/', label: 'Privacy Policy' },
      { to: '/', label: 'Terms & Conditions' }
    ]
  }
];

function Footer() {
  const { pathname } = useLocation();
  const isAuthPage = ['/register', '/login', '/forgot-password'].includes(pathname);

  return (
    <footer className="w-full bg-surface-container-low text-on-surface-variant border-t border-surface-container-high">
      <div className="max-w-7xl mx-auto px-4 md:px-margin pt-space-xl pb-space-lg">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-gutter ${isAuthPage ? 'lg:grid-cols-1' : ''}`}>
          <div className="lg:col-span-1 space-y-space-md">
            <Link to="/" className="flex items-center gap-space-xs">
              <span className="h-8 w-8 rounded-lg bg-primary-container text-on-primary grid place-items-center font-extrabold">Y</span>
              <span className="text-headline-sm text-on-surface tracking-tight">YourBrand</span>
            </Link>
            <p className="text-body-sm leading-relaxed">Good products. Fair prices. Simple shopping.</p>
            <div className="flex items-center gap-space-sm pt-space-xs">
              {['public', 'chat', 'share'].map((icon) => (
                <a key={icon} aria-label={icon} href="#" className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-primary-container hover:text-on-primary transition-colors">
                  <Icon name={icon} className="text-[18px]" />
                </a>
              ))}
            </div>
            <div className="space-y-space-xs pt-space-sm text-label-md text-on-surface">
              <div className="flex items-center gap-space-xs"><Icon name="verified_user" className="text-[18px] text-secondary" /><span>100% Genuine</span></div>
              <div className="flex items-center gap-space-xs"><Icon name="published_with_changes" className="text-[18px] text-secondary" /><span>Easy 7-Day Returns</span></div>
              <div className="flex items-center gap-space-xs"><Icon name="lock" className="text-[18px] text-secondary" /><span>Encrypted Payment</span></div>
            </div>
          </div>

          {!isAuthPage && columns.map((column) => (
            <div key={column.title}>
              <h4 className="text-title-md text-on-surface mb-space-md">{column.title}</h4>
              <ul className="space-y-space-xs text-body-sm">
                {column.links.map((link) => (
                  <li className="py-1" key={link.label}>
                    <Link to={link.to} className="hover:text-on-surface transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-space-xl pt-space-md border-t border-surface-container-high flex flex-col md:flex-row items-center justify-between gap-space-md text-body-sm">
          <p>© 2026 YourBrand. All rights reserved.</p>
          <div className="flex items-center gap-space-sm flex-wrap">
            {['Visa', 'Mastercard', 'UPI', 'RuPay', 'Net Banking'].map((method) => (
              <span key={method} className="px-2 py-0.5 rounded bg-surface-container text-on-surface text-label-md">{method}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
