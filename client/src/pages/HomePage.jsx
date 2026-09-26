import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../components/Icon.jsx';
import { useStore } from '../context/StoreContext.jsx';
import { apiUrl } from '../api.js';

const fallbackPicks = [
  {
    id: 'demo-shoe',
    name: 'AeroFlex Running Shoes',
    description: 'Lightweight everyday running shoes designed for comfort.',
    price: 2499,
    originalPrice: 3499,
    rating: 4.7,
    reviews: 128,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBl-e9N6gllfqvm9mb5qEig72Hn56wq3vkzmW8nAn4z8AcPVzbUohAwEGOUjvwRNnziAVi3GmZ4lSRSJHLeKUi2xrqSLVSkMGold-Avrq4t2BNvnJOGxikns69DRKZbo8WTtHXX1ByqDzrLCNuHLHjamQHKnYxHGJtqm_eXz-CILJsDt-lUHy8wNLstCXntVhcWd0BljZv-JJhAZ37HQJTyxH_-1ihZA35D4OzmE3A'
  },
  {
    id: 'demo-shirt',
    name: 'Nomad Oxford Cotton Shirt',
    description: 'Crisp breathable fit tailored for work and weekend.',
    price: 1799,
    originalPrice: 2499,
    rating: 4.8,
    reviews: 84,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgFz7fWB9iUn94Kyw8p98soVLxPdYQyZfssRc8ICRTPZmYvTxM5RADpNr_7sNlE2WirGPQwJxFpmO-xG4ll6OtgWKouv0616I93s6ijU-oqdxPBG3wjM4Vr5_xPGiU4fNqgo8BGWrMX2K7o1nd4dPHKI8J1WwfPkiBGqBXcX2bhX7fCPJ0RrVIK7l0_6HSTXXGgpjsbHITYeB0kFgX3fmuSw6Cazly0BiZsmheBtY'
  },
  {
    id: 'demo-headphones',
    name: 'Aura ANC Wireless Headphones',
    description: 'Active noise cancellation with 40-hour battery life.',
    price: 4999,
    originalPrice: 7999,
    rating: 4.9,
    reviews: 310,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFw2XhrT2WudKI8CFA_ja9auvsrWUT7iLfsLZDKcxwZjdi6UQxBIRxejo6Zmj1iwbCYgfiLIxUybiVUwDdmxv1dw2po4Tc2oJBLOVNFMtSaFZ94IxKy1oKrCAGIND63PGzp-xOiy6u5Jq8besqnvKXaF3TKjxyuvYxUSApDbNwTEmcIy6muuS932jH73ZQFZZDZgme435WQc6dHn73I8o7JfdC2bGHZjGk0fnsUhg'
  },
  {
    id: 'demo-watch',
    name: 'Classic Minimalist Leather Chrono',
    description: 'Sleek water-resistant everyday timepiece.',
    price: 3299,
    originalPrice: 4500,
    rating: 4.6,
    reviews: 95,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyMEpGwn3jkhJc5YRvAP5q4MTvzv4E9fWdDxFrDzffQ8ZhVVX-6p4lA6qidYzpwRxaKiKKFLeZUvvagu_bwuhE74F1LxwzdAVbevnU4XgqOXFjpa4vVUEhnvUVvbBHdn4OSuK9PWwvgZQTFKKr6CI-Di1BoliACgVFaBCfr-bBoni_5Jl-PIEXXJzwQtxF5mAHc0TkaYSpgZRC9C5wHusYfz-z2pji4ZqBKIS8swQ'
  }
];

const categories = [
  {
    name: 'Men',
    copy: 'Everyday essentials, timeless styles and everything in between.',
    to: '/shop?category=Men',
    span: 'md:col-span-3 lg:col-span-4',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCB5UsKznOoYp32JzCFH1136TZ4ypJ53mVb6U6cUQdOZY1YQDrZncKXPCoc3zbqA6DqgWsp2xeneENfnJ4PNWKZ68blXLKYydPgcRQXDpbVdw6om2zoQ7Ao1K0BLqWJHwkJ9rcKeWyTfNow6WJz8AMUVlp2idadb68QFea5sXQLkE6_ezcA8XC7EZBntFc9KljoIlAttEupDikmsQebfnG1FqL-jJ3k7rIPA4XQb80'
  },
  {
    name: 'Women',
    copy: 'New looks, everyday favourites and pieces made to stand out.',
    to: '/shop?category=Women',
    span: 'md:col-span-3 lg:col-span-4',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnvTcxBucb-tA9oIzQHrhh1SBEtP7UzrFv2cK60uPsuibUONSFHBjnIsBIV5QVe9RMyl8OofacggCYpK1tqKlxMP5pc2nA9sN0rxrpkqnFZtVFh6xHL4oerT4I_XjBPDUG1a1Y7w2PEwLwU8hkfmsacLVgYZMYYrTnzrzzc9_WcUKfwxRhCTfzpOUrbpT4o-aqmLuDQoHh_z8BUMXV-9DEKdEcSN-yaDT3ovkb6eg'
  },
  {
    name: 'Electronics',
    copy: 'Smart gadgets and useful tech for everyday life.',
    to: '/shop?category=Electronics',
    span: 'md:col-span-6 lg:col-span-4',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXyysjCGTeHu0lQji48gg7FkPHG2W4IgrkoXH6qFnYuihhngWVpsPVEOZPaW2oWS0jx64y7TE8ZDgPycLpIsKqM8Esi1p4IeAyNR58RBVq1zJ0yNNTDVtubkLaEbLkVIGNmqRvZWj26hNr4zEkEmU90DBrvd7xxwhTnvbeZ6QmiAP28fFh3pvQccj0q8v2qK6vHS_s8e_p7yBX6fKSXrkDm_aVbedKsKuRrkE_tcc'
  },
  {
    name: 'Footwear',
    copy: 'Find your next favourite pair, from everyday sneakers to something a little sharper.',
    to: '/shop?category=Footwear',
    span: 'md:col-span-3 lg:col-span-6',
    wide: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqob_ev5h8T_nNzSznq2bm-lSOrpkM-O0K6bn32u82cqPYr2ztp_Dq91EC3J83vAeRO4FjsW2en7986wvr51DqAxRoaBAH0tjU6v_sFIPbATvclf1rQH0BgLxDCEiVhtCHrmypzxSA2ClDjrghZDWv0h1gF7yUgP6eKO-ZEpWEGuDlI91LhSIMH3PM7neeK_yLPHVbkHlETMIwTgjvIf9qGCDcYQ2IuWKoZzf-pJw'
  },
  {
    name: 'Accessories',
    copy: 'The finishing touches that make an outfit your own.',
    to: '/shop?category=Accessories',
    span: 'md:col-span-3 lg:col-span-6',
    wide: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9QqFRsUQvilSw8wwypgRTmTUBK5E0vCiHsDF2Wy14Py3pQJYJ4TdNbtX8Ng_gDEpyVCjC0KWaObIiBCmChqgC28WolyGRFZNhJHFXToE-21TzL6NZPSN6FiTc7dWPzJw8WjMFk0zGQ3vhSXeK-Ts4kctCP3rTGdmWTCiTIKfrHsP_pJxSOSWAyUa9zAMsCNmBYAckETJAUGs27ADd5TeuBiLG5272h1ga0zor1Wk'
  }
];

const deals = [
  {
    name: 'PulsePro Smart Band',
    price: '₹1,649',
    original: '₹2,999',
    off: '45% OFF',
    left: 4,
    claimed: 82,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHfwrkTRSrokwYkBR5WFtTyM-7CdC4O_a4eAtnpeBRM0aeEdkQv2ZNMP8L8cfHIo21suxMXK3UNt3dPAcxnLIaDY-_oORfbzcFEYvtbXQk0yrRegIyTSftyWgsf8YSUERqB0N-G-WkM6ZUVoNwBZLTA0NBN0tv4xXYZ_cREWpVckC1bVbZNA88Tlq6INeSaNfUJzMmuwsZaVBNBtFlzz8bTHtQJ7vU4ZfjaF0FuRg'
  },
  {
    name: 'Everyday Heavy Hoodie',
    price: '₹1,499',
    original: '₹2,999',
    off: '50% OFF',
    left: 2,
    claimed: 92,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgfNqDSeUVd6xwSOepk6u1uq2z9hNWDqVwR6L27VpcjYzb74jS1IrguqIbZcdwox9NaU018EenMmpFz47PUc3GOj9DoKkHwE0_JJ8iVqNnUxbs1i_Afn44DtKnC5LwycQMw7iUF1aicUhKN-58wOL1RFPMhkHg6DFF-fh-w1qXU6yRq2UOHJakzY2rCCBcxony103QMsRPMOEdE23QdFncV4YPhsGE858DDfoLXks'
  }
];

const reviews = [
  {
    initials: 'PS',
    name: 'Priya S.',
    city: 'Bengaluru',
    tone: 'bg-secondary-fixed text-on-secondary-fixed',
    quote: 'Exactly what I was looking for. The product looked just like the pictures, arrived on time and the quality was better than I expected.'
  },
  {
    initials: 'AK',
    name: 'Arun K.',
    city: 'Mumbai',
    tone: 'bg-surface-container-high text-on-surface',
    quote: 'Really happy with the purchase. The ordering process was simple and delivery was quick. I’ll definitely be checking out the new arrivals.'
  },
  {
    initials: 'RM',
    name: 'Rahul M.',
    city: 'Delhi NCR',
    tone: 'bg-primary-fixed text-on-primary-fixed',
    quote: 'Good quality without the crazy price. I’ve ordered a few times now and haven’t had a bad experience yet.'
  }
];

const rupees = (value) => `₹${Math.round(Number(value) || 0).toLocaleString('en-IN')}`;

function asStorePrice(product) {
  if (product.price > 200) {
    return { price: product.price, originalPrice: product.originalPrice || Math.round(product.price * 1.3) };
  }
  return {
    price: Math.round(product.price * 83),
    originalPrice: Math.round((product.originalPrice || product.price * 1.3) * 83)
  };
}

function HomePage() {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [offset, setOffset] = useState(0);
  const [timer, setTimer] = useState({ hours: 8, minutes: 42, seconds: 19 });

  useEffect(() => {
    fetch(apiUrl('/api/products'))
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch(() => setProducts([]));
  }, []);

  useEffect(() => {
    const tick = setInterval(() => {
      setTimer((current) => {
        let { hours, minutes, seconds } = current;
        if (seconds > 0) seconds -= 1;
        else {
          seconds = 59;
          if (minutes > 0) minutes -= 1;
          else {
            minutes = 59;
            hours = hours > 0 ? hours - 1 : 12;
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  const featured = useMemo(() => {
    const live = products.slice(0, 4).map((product) => {
      const pricing = asStorePrice(product);
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        rating: product.rating || 4.6,
        reviews: product.reviews || 64,
        image: product.image,
        ...pricing
      };
    });
    return live.length === 4 ? live : (import.meta.env.PROD ? live : fallbackPicks);
  }, [products]);

  const visiblePicks = [...featured.slice(offset), ...featured.slice(0, offset)].slice(0, 4);
  const pad = (value) => String(value).padStart(2, '0');

  return (
    <div className="flex flex-col w-full">
      <section className="relative w-full overflow-hidden bg-surface-container-lowest">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-secondary-fixed opacity-40 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-surface-container-high opacity-60 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-margin py-space-xl lg:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            <div className="lg:col-span-6 flex flex-col items-start space-y-space-md">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-on-surface text-label-badge tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                NEW SEASON • NEW PICKS
              </div>
              <h1 className="text-[36px] leading-[44px] lg:text-display text-on-surface tracking-tight font-extrabold">
                Find Something You'll Love.
              </h1>
              <p className="text-body-lg text-on-surface-variant max-w-xl">
                From everyday essentials to products worth showing off, discover a collection made for the way you shop, live and spend.
              </p>
              <div className="flex flex-wrap items-center gap-space-sm pt-2 w-full sm:w-auto">
                <Link to="/shop" className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-primary text-on-primary text-label-lg hover:bg-inverse-surface transition-all shadow-md group">
                  <span>Shop Now</span>
                  <Icon name="arrow_forward" className="text-[20px] transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <Link to="/shop?filter=new" className="inline-flex items-center justify-center h-12 px-6 rounded-lg bg-surface-container text-on-surface text-label-lg hover:bg-surface-container-high transition-colors">
                  Explore New Arrivals
                </Link>
              </div>
              <div className="flex items-center gap-2 pt-4 text-on-surface-variant text-label-md">
                <Icon name="local_shipping" className="text-secondary text-[20px]" />
                <span>Free shipping on orders above ₹999</span>
              </div>
            </div>

            <div className="lg:col-span-6 relative mt-6 lg:mt-0">
              <div className="relative w-full aspect-[4/5] max-h-[580px] rounded-xl overflow-hidden shadow-xl bg-surface-container">
                <img
                  className="w-full h-full object-cover"
                  alt="AeroFlex sneakers"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoBJa9C_MwgtlKufvQBanqnlWwnmAIXeor-rmgg9A4rKk9q19JxdonELIFF1KezbJQKuQDtL0s-XvaUty4iLF4oZa1DE4MKggk9YJL2XDK-AzyvjFO-1zWjFlfvJZw9X839YciHEol2ToqnRQXgnjE4X0Dy90y3LE0GrM2F_Bx6GAQh4eA9oM2rQb57msNiiP3xfyoOwtT9ro6UCNQ-u-6uD6vRzZxRSHFkTJnkV8"
                />
                <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-surface-container-lowest/90 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary flex items-center justify-center">
                    <Icon name="shopping_bag" className="text-[20px]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-label-md text-on-surface-variant uppercase tracking-wider">Featured Release</span>
                    <span className="text-headline-sm text-on-surface leading-none">AeroFlex Series • ₹2,499</span>
                  </div>
                </div>
                <div className="absolute top-6 right-6 bg-surface-container-lowest/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                  <Icon name="star" filled className="text-[18px] text-tertiary-fixed-dim" />
                  <span className="text-label-md text-on-surface font-semibold">4.9</span>
                  <span className="text-body-sm text-on-surface-variant">(2.4k Happy Customers)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-space-xl max-w-7xl mx-auto px-4 md:px-margin">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-4">
          <div className="space-y-1 max-w-xl">
            <span className="text-label-badge uppercase tracking-widest text-secondary font-bold">Curated Catalog</span>
            <h2 className="text-headline-md lg:text-headline-lg text-on-surface">Shop by Category</h2>
            <p className="text-body-md text-on-surface-variant">Start with what you're looking for. We've organized our collection so you can get there faster.</p>
          </div>
          <Link to="/shop" className="inline-flex items-center gap-1 text-secondary text-label-lg hover:underline underline-offset-4">
            <span>View all categories</span>
            <Icon name="arrow_forward" className="text-[18px]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-gutter">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.to}
              className={`group ${category.span} bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col ${category.wide ? 'sm:flex-row' : ''}`}
            >
              <div className={`relative overflow-hidden bg-surface-container-low ${category.wide ? 'w-full sm:w-1/2 aspect-square sm:aspect-auto' : 'w-full aspect-[4/3]'}`}>
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={category.image} alt={category.name} />
              </div>
              <div className={`p-space-md flex flex-col flex-1 justify-between space-y-3 ${category.wide ? 'sm:w-1/2' : ''}`}>
                <div>
                  <h3 className="text-headline-sm text-on-surface">{category.name}</h3>
                  <p className="text-body-sm text-on-surface-variant mt-1">{category.copy}</p>
                </div>
                <span className="inline-flex items-center gap-1 text-label-lg text-secondary group-hover:translate-x-1 transition-transform">
                  Shop Now →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="w-full py-space-xl bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-4 md:px-margin">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-3">
            <div className="space-y-1">
              <span className="text-label-badge uppercase tracking-widest text-on-tertiary-container font-bold">Staff Selected</span>
              <h2 className="text-headline-md lg:text-headline-lg text-on-surface">Featured Picks</h2>
              <p className="text-body-md text-on-surface-variant">A few products we're particularly excited about right now.</p>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" className="w-10 h-10 rounded-full bg-surface-container-lowest text-on-surface hover:bg-surface-container flex items-center justify-center shadow-sm" onClick={() => setOffset((value) => (value - 1 + featured.length) % featured.length)} aria-label="Previous picks">
                <Icon name="west" className="text-[20px]" />
              </button>
              <button type="button" className="w-10 h-10 rounded-full bg-surface-container-lowest text-on-surface hover:bg-surface-container flex items-center justify-center shadow-sm" onClick={() => setOffset((value) => (value + 1) % featured.length)} aria-label="Next picks">
                <Icon name="east" className="text-[20px]" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {visiblePicks.map((product) => {
              const discount = Math.max(1, Math.round((1 - product.price / product.originalPrice) * 100));
              return (
                <article key={product.id} className="group bg-surface-container-lowest rounded-xl p-3 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
                  <Link to={`/product/${product.id}`} className="relative aspect-[4/5] rounded-lg overflow-hidden bg-surface-container mb-3">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src={product.image} alt={product.name} />
                    <span className="absolute top-2.5 left-2.5 bg-tertiary-fixed text-on-tertiary-fixed text-label-badge px-2 py-0.5 rounded-full uppercase">{discount}% OFF</span>
                    <button type="button" aria-label={isWishlisted(product) ? 'Remove from Wishlist' : 'Add to Wishlist'} className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-sm text-on-surface hover:text-error transition-colors flex items-center justify-center shadow-sm" onClick={(event) => { event.preventDefault(); event.stopPropagation(); toggleWishlist({ ...product, priceInRupees: true }); }}>
                      <Icon name="favorite" filled={isWishlisted(product)} className="text-[18px]" />
                    </button>
                  </Link>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Icon name="star" filled className="text-[16px] text-tertiary-fixed-dim" />
                        <span className="text-label-md text-on-surface">{product.rating}</span>
                        <span className="text-body-sm text-on-surface-variant">· {product.reviews} reviews</span>
                      </div>
                      <Link to={`/product/${product.id}`} className="text-title-md text-on-surface group-hover:text-secondary transition-colors">{product.name}</Link>
                      <p className="text-body-sm text-on-surface-variant line-clamp-1 mt-0.5">{product.description}</p>
                    </div>
                    <div className="pt-3 mt-3 flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-headline-sm text-on-surface">{rupees(product.price)}</span>
                        <span className="text-body-sm text-outline line-through">{rupees(product.originalPrice)}</span>
                      </div>
                      <button type="button" className="p-2 rounded-lg bg-primary text-on-primary hover:bg-secondary transition-colors flex items-center justify-center" title="Add to Cart" onClick={() => addToCart({ ...product, priceInRupees: true })}>
                        <Icon name="shopping_bag" className="text-[18px]" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full py-space-xl max-w-7xl mx-auto px-4 md:px-margin">
        <div className="bg-primary-container text-on-primary rounded-xl p-6 lg:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-secondary opacity-20 blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center relative z-10">
            <div className="lg:col-span-5 flex flex-col items-start space-y-space-md">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-container text-on-tertiary-container text-label-badge font-bold uppercase">
                <Icon name="bolt" className="text-[14px]" />
                LIMITED TIME
              </div>
              <h2 className="text-headline-md lg:text-headline-lg text-on-primary leading-tight">Good Deals Don't Wait.</h2>
              <p className="text-body-md text-on-primary-container max-w-md">
                Save on selected products while the offer lasts. Once the timer hits zero, these prices are gone.
              </p>
              <div className="flex items-center gap-3 py-2">
                <div className="flex flex-col items-center justify-center w-16 h-16 rounded-lg bg-inverse-surface shadow-inner">
                  <span className="text-headline-md text-on-primary font-bold">{pad(timer.hours)}</span>
                  <span className="text-label-badge text-on-primary-container uppercase">Hours</span>
                </div>
                <span className="text-on-primary-container text-headline-md">:</span>
                <div className="flex flex-col items-center justify-center w-16 h-16 rounded-lg bg-inverse-surface shadow-inner">
                  <span className="text-headline-md text-on-primary font-bold">{pad(timer.minutes)}</span>
                  <span className="text-label-badge text-on-primary-container uppercase">Minutes</span>
                </div>
                <span className="text-on-primary-container text-headline-md">:</span>
                <div className="flex flex-col items-center justify-center w-16 h-16 rounded-lg bg-inverse-surface shadow-inner">
                  <span className="text-headline-md text-tertiary-fixed-dim font-bold">{pad(timer.seconds)}</span>
                  <span className="text-label-badge text-on-primary-container uppercase">Seconds</span>
                </div>
              </div>
              <Link to="/shop?filter=sale" className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-secondary text-on-secondary text-label-lg hover:bg-secondary-container transition-colors shadow-md">
                <span>Shop the Sale</span>
                <Icon name="local_fire_department" className="text-[18px]" />
              </Link>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-gutter mt-6 lg:mt-0">
              {deals.map((deal) => (
                <Link to="/shop?filter=sale" key={deal.name} className="bg-surface-container-lowest text-on-surface rounded-xl p-4 shadow-lg flex flex-col justify-between">
                  <div>
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-surface-container mb-3">
                      <img className="w-full h-full object-cover" src={deal.image} alt={deal.name} />
                      <span className="absolute top-2 left-2 bg-tertiary-fixed text-on-tertiary-fixed text-label-badge px-2 py-0.5 rounded-full font-bold">{deal.off}</span>
                    </div>
                    <h4 className="text-title-md text-on-surface">{deal.name}</h4>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-headline-sm text-on-surface">{deal.price}</span>
                      <span className="text-body-sm text-outline line-through">{deal.original}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 space-y-1.5">
                    <div className="flex items-center justify-between text-label-md">
                      <span className="text-error font-bold flex items-center gap-1">
                        <Icon name="warning" className="text-[14px]" />
                        Only {deal.left} left at this price!
                      </span>
                      <span className="text-on-surface-variant font-medium">{deal.claimed}% Claimed</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                      <div className="h-full bg-error rounded-full" style={{ width: `${deal.claimed}%` }} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-space-xl bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-4 md:px-margin">
          <div className="text-center max-w-2xl mx-auto mb-space-xl space-y-2">
            <span className="text-label-badge uppercase tracking-widest text-secondary font-bold">The Brand Promise</span>
            <h2 className="text-headline-md lg:text-headline-lg text-on-surface">Shopping Without the Headache</h2>
            <p className="text-body-md text-on-surface-variant">We keep the important things simple — good products, straightforward pricing and an experience that doesn't get in your way.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {[
              ['local_shipping', 'Free Shipping', 'Get free delivery on orders above ₹999.'],
              ['lock', 'Secure Payments', 'Pay safely using trusted payment methods.'],
              ['autorenew', 'Easy Returns', 'Changed your mind? Return eligible products within 7 days.'],
              ['support_agent', 'Customer Support', 'Have a question about an order or product? Our support team is ready to help.']
            ].map(([icon, title, copy]) => (
              <div key={title} className="p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors flex flex-col space-y-space-sm">
                <div className="w-12 h-12 rounded-xl bg-surface-container-lowest text-secondary flex items-center justify-center shadow-sm">
                  <Icon name={icon} className="text-[26px]" />
                </div>
                <h3 className="text-headline-sm text-on-surface">{title}</h3>
                <p className="text-body-sm text-on-surface-variant">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-space-xl bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-4 md:px-margin">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-2">
            <div>
              <span className="text-label-badge uppercase tracking-widest text-secondary font-bold">Community Voice</span>
              <h2 className="text-headline-md lg:text-headline-lg text-on-surface">What Our Customers Say</h2>
              <p className="text-body-md text-on-surface-variant">Real feedback from people who've shopped with us.</p>
            </div>
            <div className="flex items-center gap-1 text-on-surface text-label-md">
              <span className="font-bold">4.8 / 5.0</span>
              <span className="text-on-surface-variant">across 12,000+ verified ratings</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {reviews.map((review) => (
              <article key={review.name} className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-tertiary-fixed-dim">
                      {Array.from({ length: 5 }).map((_, index) => <Icon key={index} name="star" filled className="text-[18px]" />)}
                    </div>
                    <span className="inline-flex items-center gap-1 text-label-badge text-secondary bg-surface-container px-2 py-0.5 rounded-full">
                      <Icon name="verified" className="text-[12px]" />
                      Verified Purchase
                    </span>
                  </div>
                  <p className="text-body-md text-on-surface leading-relaxed">“{review.quote}”</p>
                </div>
                <div className="pt-3 flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-label-lg font-bold ${review.tone}`}>{review.initials}</div>
                  <div>
                    <p className="text-title-md text-on-surface">{review.name}</p>
                    <p className="text-body-sm text-on-surface-variant">{review.city}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-space-xl max-w-7xl mx-auto px-4 md:px-margin">
        <div className="bg-surface-container-lowest rounded-xl p-8 sm:p-12 lg:p-16 shadow-md text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mb-4">
            <Icon name="mark_email_read" className="text-[24px]" />
          </div>
          <h2 className="text-headline-md lg:text-headline-lg text-on-surface max-w-xl">Don't Miss What's New</h2>
          <p className="text-body-md text-on-surface-variant max-w-md mt-2 mb-space-md">
            Get new arrivals, special offers and the occasional good reason to come back.
          </p>
          <form
            className="w-full max-w-md flex flex-col sm:flex-row gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              if (email.trim()) setSubscribed(true);
            }}
          >
            <div className="relative flex-1">
              <Icon name="mail" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]" />
              <input
                className="w-full pl-11 pr-4 py-3 bg-surface-container-low text-on-surface placeholder:text-outline text-body-sm rounded-lg outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/20 transition-all"
                placeholder="Enter your email address"
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <button className="h-12 px-8 rounded-lg bg-primary text-on-primary text-label-lg hover:bg-secondary transition-colors whitespace-nowrap shadow-sm" type="submit">
              Subscribe
            </button>
          </form>
          {subscribed && <p className="mt-3 text-secondary text-label-md">✓ Thank you for subscribing! Welcome to YourBrand.</p>}
          <p className="text-body-sm text-on-surface-variant/80 mt-space-sm">No unnecessary emails. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
