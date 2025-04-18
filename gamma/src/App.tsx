import type React from "react";
import { useState } from "react";
import { Routes, Route, Link, useParams, useNavigate, Navigate, useLocation } from "react-router-dom";
import { useCart } from "./lib/cartContext";
import { useUser, Order as OrderType } from "./lib/userContext";

const categories = [
  { name: "Men", img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80" },
  { name: "Women", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" },
  { name: "Kids", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80" },
  { name: "Deals", img: "https://images.unsplash.com/photo-1469398715555-76331a488b91?auto=format&fit=crop&w=400&q=80" },
];

const featured = [
  { name: "Black Hoodie", price: "$49", img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80" },
  { name: "Classic White Tee", price: "$29", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" },
  { name: "Basic Joggers", price: "$39", img: "https://images.unsplash.com/photo-1469398715555-76331a488b91?auto=format&fit=crop&w=400&q=80" },
  { name: "Monochrome Jacket", price: "$79", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80" },
];

// ... data setup ...
const demoProducts = [
  { name: "Black Bomber Jacket", price: "$110", img: "https://images.unsplash.com/photo-1526178613658-3d2e2c5fda11?auto=format&fit=crop&w=400&q=80", brand: "Alpha", size: "L", category: "men" },
  { name: "White Longsleeve", price: "$44", img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&q=80", brand: "Breeze", size: "M", category: "men" },
  { name: "Canvas Pants", price: "$61", img: "https://images.unsplash.com/photo-1464347744102-11db6282f854?auto=format&fit=crop&w=400&q=80", brand: "UrbanY", size: "M", category: "men" },
  { name: "Minimalist Dress", price: "$82", img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80", brand: "Kline", size: "S", category: "women" },
  { name: "Windbreaker", price: "$53", img: "https://images.unsplash.com/photo-1516762689617-e1cdfb84b04b?auto=format&fit=crop&w=400&q=80", brand: "Alpha", size: "L", category: "women" },
  { name: "Grid Shirt", price: "$39", img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80", brand: "UrbanY", size: "S", category: "women" },
  { name: "Classic Shorts", price: "$27", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80", brand: "Breeze", size: "M", category: "kids" },
  { name: "Kids Tee BW", price: "$19", img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80", brand: "MiniCo", size: "XS", category: "kids" },
];

function Nav() {
  const { items } = useCart();
  const { user, logout } = useUser();
  const cartCount = items.reduce((n, i) => n + i.qty, 0);
  return (
    <nav className="bg-black text-white px-8 py-4 flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold tracking-widest">GAMMA</Link>
      <div className="flex gap-8 text-sm">
        {categories.map((cat) => (
          <Link key={cat.name} to={`/category/${cat.name.toLowerCase()}`} className="hover:underline font-medium">
            {cat.name}
          </Link>
        ))}
      </div>
      <div className="flex gap-2 items-center">
        {user ? (
          <>
            <Link to="/account" className="bg-gray-900 px-3 py-1 rounded font-medium flex items-center hover:bg-gray-800 transition">Account</Link>
            <Link to="/orders" className="bg-gray-900 px-3 py-1 rounded font-medium flex items-center hover:bg-gray-800 transition">Orders</Link>
            <Link to="/cart" className="relative bg-gray-900 px-3 py-1 rounded font-medium flex items-center">
              Cart
              {cartCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs bg-red-500 rounded-full text-white">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              className="ml-1 bg-gray-800 px-2 py-0.5 rounded text-sm font-semibold hover:bg-gray-700"
              title="Sign out"
              onClick={logout}
            >Sign out</button>
          </>
        ) : (
          <Link to="/login" className="bg-white text-black px-3 py-1 rounded border border-transparent hover:border-white transition font-medium">Sign In</Link>
        )}
      </div>
    </nav>
  );
}

function Home() {
  const { addToCart } = useCart();
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Nav />
      <section className="relative bg-black text-white flex items-center justify-center h-64 md:h-80 shadow-lg">
        <img
          src="https://images.unsplash.com/photo-1469398715555-76331a488b91?auto=format&fit=crop&w=1300&q=80"
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-30"
        />
        <div className="relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight">Discover Your Style</h1>
          <p className="mb-5 text-lg md:text-xl font-light">Modern looks, classic comfort—all in black & white</p>
          <button className="bg-white text-black px-6 py-2 rounded font-semibold text-lg shadow hover:bg-gray-100">Shop Now</button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-10 px-4 md:px-16">
        <h2 className="text-2xl font-semibold mb-6 text-black">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link to={`/category/${cat.name.toLowerCase()}`} key={cat.name} className="bg-white shadow text-center rounded overflow-hidden hover:scale-105 transition cursor-pointer">
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-28 object-cover grayscale"
              />
              <div className="py-3 text-black font-medium text-lg">{cat.name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-10 px-4 md:px-16 bg-neutral-100 border-t">
        <h2 className="text-2xl font-semibold mb-6 text-black">Featured</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featured.map((item) => (
            <div key={item.name} className="bg-white rounded shadow hover:scale-105 transition overflow-hidden flex flex-col">
              <img src={item.img} alt={item.name} className="w-full h-40 object-cover grayscale" />
              <div className="px-4 py-3 flex flex-col gap-1 flex-1">
                <span className="text-black text-base font-semibold mb-0.5">{item.name}</span>
                <span className="text-neutral-500 text-sm mb-2">{item.price}</span>
                <button
                  className="mt-auto bg-black text-white py-1 rounded hover:bg-neutral-800 font-medium"
                  onClick={() => addToCart({ name: item.name, price: item.price, img: item.img })}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function CategoryGrid() {
  const { category } = useParams();
  const { addToCart } = useCart();
  const normalized = (category || '').toLowerCase();
  const products = demoProducts.filter(p => p.category === normalized);
  const brands = [...new Set(products.map(p => p.brand))];
  const sizes = [...new Set(products.map(p => p.size))];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Nav />
      <section className="px-4 md:px-16 py-10 flex flex-col md:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-60 flex-shrink-0 bg-neutral-100 p-5 rounded border border-neutral-200 shadow mb-6 md:mb-0">
          <h2 className="text-lg font-bold mb-3 text-black capitalize">{category} Filters</h2>
          <div className="mb-4">
            <div className="font-semibold mb-2">Brand</div>
            {brands.map(brand => (
              <label key={brand} className="block mb-1 text-neutral-800">
                <input type="checkbox" className="mr-2" /> {brand}
              </label>
            ))}
          </div>
          <div className="mb-4">
            <div className="font-semibold mb-2">Size</div>
            {sizes.map(size => (
              <label key={size} className="block mb-1 text-neutral-800">
                <input type="checkbox" className="mr-2" /> {size}
              </label>
            ))}
          </div>
          <div>
            <div className="font-semibold mb-2">Price</div>
            <label className="block mb-1 text-neutral-800">
              <input type="checkbox" className="mr-2" /> Under $50
            </label>
            <label className="block mb-1 text-neutral-800">
              <input type="checkbox" className="mr-2" /> $51-$100
            </label>
            <label className="block mb-1 text-neutral-800">
              <input type="checkbox" className="mr-2" /> $101 & Above
            </label>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6 text-black capitalize">{category} Clothing</h1>
          {products.length === 0 ? (
            <div className="py-24 text-xl text-neutral-500 text-center">No products found for this category.</div>
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((item) => (
              <div key={item.name} className="bg-white rounded shadow hover:scale-105 transition overflow-hidden flex flex-col">
                <img src={item.img} alt={item.name} className="w-full h-44 object-cover grayscale" />
                <div className="px-4 py-3 flex flex-col gap-1 flex-1">
                  <span className="text-black text-base font-semibold mb-0.5">{item.name}</span>
                  <span className="text-neutral-500 text-sm mb-2">{item.price}</span>
                  <button
                    className="mt-auto bg-black text-white py-1 rounded hover:bg-neutral-800 font-medium"
                    onClick={() => addToCart({ name: item.name, price: item.price, img: item.img })}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>
    </div>
  );
}

function Cart() {
  const { items, removeFromCart, updateQty } = useCart();
  const navigate = useNavigate();
  const total = items.reduce((sum, i) => sum + Number.parseFloat(i.price.replace(/[^\d.]/g, '')) * i.qty, 0);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Nav />
      <section className="max-w-3xl mx-auto w-full px-4 py-10">
        <h1 className="text-3xl font-bold mb-7 text-black">Your Cart</h1>
        {items.length === 0 ? (
          <div className="text-center text-neutral-600 text-lg">Your cart is empty.</div>
        ) : (
          <>
          <div className="space-y-6 mb-8">
            {items.map(item => (
              <div key={item.name} className="flex items-center gap-4 border-b pb-5">
                <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded grayscale" />
                <div className="flex-1">
                  <div className="font-semibold text-black mb-1">{item.name}</div>
                  <div className="text-neutral-600 mb-2">{item.price}</div>
                  <div className="flex gap-3 items-center">
                    <span>Qty</span>
                    <input
                      type="number"
                      min={1}
                      value={item.qty}
                      onChange={e => updateQty(item.name, Number(e.target.value) || 1)}
                      className="w-14 px-2 py-0.5 border rounded text-center"
                    />
                    <button
                      className="ml-2 text-sm text-red-600 hover:underline"
                      onClick={() => removeFromCart(item.name)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between py-4 border-t items-center">
            <div className="text-xl font-semibold text-black">Total: ${total.toFixed(2)}</div>
            <button
              onClick={() => navigate('/checkout')}
              className="bg-black text-white px-6 py-2 rounded font-medium text-lg hover:bg-neutral-800"
            >
              Checkout
            </button>
          </div>
          </>
        )}
      </section>
    </div>
  );
}

function Checkout() {
  const { user, addOrder } = useUser();
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const total = items.reduce((sum, i) => sum + Number.parseFloat(i.price.replace(/[^\d.]/g, '')) * i.qty, 0);

  function handlePlaceOrder() {
    if (items.length > 0) {
      addOrder({
        items: items.map(i => ({ ...i })),
        total,
        date: new Date().toISOString(),
      });
      clearCart();
    }
    navigate('/orders');
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Nav />
      <section className="max-w-2xl mx-auto w-full px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-black">Checkout</h1>
        <div className="bg-neutral-100 rounded-md py-7 px-5 mb-6 shadow">
          {items.length === 0 ? (
            <div className="text-center text-neutral-600 text-lg">No items to checkout.</div>
          ) : (
            <>
            <ul className="mb-4">
              {items.map(item => (
                <li key={item.name} className="flex items-center gap-4 mb-2">
                  <img src={item.img} alt={item.name} className="w-12 h-12 object-cover rounded grayscale" />
                  <span className="flex-1 text-black">{item.name}</span>
                  <span className="text-neutral-600">x{item.qty}</span>
                  <span className="ml-2 font-semibold">{item.price}</span>
                </li>
              ))}
            </ul>
            <div className="flex border-t pt-3 mt-4 justify-between font-semibold text-lg text-black">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              className="mt-7 w-full bg-black text-white py-3 rounded font-bold text-lg hover:bg-neutral-800"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
            </>
          )}
        </div>
        {items.length > 0 && (
          <div className="text-center text-neutral-500 text-sm">(Demo checkout—no real payment)</div>
        )}
      </section>
    </div>
  );
}

function Orders() {
  const { user } = useUser();
  if (!user) return <Navigate to="/login" replace />;
  if (user.orders.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Nav />
        <div className="max-w-2xl mx-auto w-full px-4 py-20 text-center text-neutral-500 text-lg">
          <h1 className="text-3xl font-bold mb-6 text-black">Your Orders</h1>
          No orders yet.
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Nav />
      <section className="max-w-2xl mx-auto w-full px-4 py-10">
        <h1 className="text-3xl font-bold mb-7 text-black">Your Orders</h1>
        <div className="flex flex-col gap-8">
          {user.orders.map((order, idx) => (
            <div key={order.date + idx} className="border rounded p-6 bg-neutral-50">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Order on {new Date(order.date).toLocaleString()}</span>
                <span className="font-semibold">Total: ${order.total.toFixed(2)}</span>
              </div>
              <div className="flex flex-wrap gap-5 mt-2">
                {order.items.map(item => (
                  <div key={item.name} className="flex items-center gap-2 bg-white px-2 py-1 rounded shadow">
                    <img src={item.img} alt={item.name} className="w-10 h-10 object-cover rounded grayscale" />
                    <span className="font-medium text-black">{item.name}</span>
                    <span className="text-neutral-600">x{item.qty}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function AccountPage() {
  const { user } = useUser();
  if (!user) return <Navigate to="/login" replace />;
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Nav />
      <section className="max-w-lg w-full mx-auto my-12 bg-neutral-100 rounded shadow px-8 py-10">
        <h1 className="text-3xl font-bold mb-6 text-black">Your Account</h1>
        <div className="mb-5">
          <div className="font-semibold text-black mb-1">Email:</div>
          <div className="mb-3 text-neutral-800">{user.email}</div>
          <div className="font-semibold text-black mb-1">Orders placed:</div>
          <div className="mb-3 text-neutral-800">{user.orders.length}</div>
        </div>
        <div className="flex gap-4 mt-8">
          <Link to="/orders" className="bg-black text-white rounded px-4 py-2 font-semibold hover:bg-neutral-800">View Orders</Link>
          <Link to="/cart" className="bg-white border border-black text-black rounded px-4 py-2 font-semibold hover:bg-black hover:text-white transition">Go to Cart</Link>
        </div>
      </section>
    </div>
  );
}

function Login() {
  const { user, login } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (user) return <Navigate to="/" replace />;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@") || password.length < 4) {
      setError("Invalid email or password");
      return;
    }
    const err = login(email, password);
    if (err) {
      setError(err);
      return;
    }
    const dest = (location.state as { from?: { pathname?: string } })?.from?.pathname || "/";
    navigate(dest, { replace: true });
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Nav />
      <section className="flex-1 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-neutral-100 p-10 rounded shadow w-full max-w-md mx-auto flex flex-col gap-5"
        >
          <h1 className="text-2xl font-bold mb-2">Sign In to Gamma</h1>
          {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="py-2 px-3 border rounded w-full text-black"
            autoComplete="email"
          />
          <input
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="py-2 px-3 border rounded w-full text-black"
            autoComplete="current-password"
          />
          <button className="w-full bg-black text-white py-2 rounded mt-2 font-semibold hover:bg-neutral-800">
            Sign In
          </button>
          <div className="text-center text-neutral-700 text-sm mt-3">
            New to Gamma? <Link to="/signup" className="underline">Sign Up</Link>
          </div>
        </form>
      </section>
    </div>
  );
}

function Signup() {
  const { user, signup } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (user) return <Navigate to="/" replace />;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@") || password.length < 4) {
      setError("Invalid email or password");
      return;
    }
    const err = signup(email, password);
    if (err) {
      setError(err);
      return;
    }
    navigate("/", { replace: true });
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Nav />
      <section className="flex-1 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-neutral-100 p-10 rounded shadow w-full max-w-md mx-auto flex flex-col gap-5"
        >
          <h1 className="text-2xl font-bold mb-2">Create a Gamma Account</h1>
          {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="py-2 px-3 border rounded w-full text-black"
            autoComplete="email"
          />
          <input
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password (4+ chars)"
            className="py-2 px-3 border rounded w-full text-black"
            autoComplete="new-password"
          />
          <button className="w-full bg-black text-white py-2 rounded mt-2 font-semibold hover:bg-neutral-800">
            Sign Up
          </button>
          <div className="text-center text-neutral-700 text-sm mt-3">
            Already have an account? <Link to="/login" className="underline">Sign In</Link>
          </div>
        </form>
      </section>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:category" element={<CategoryGrid />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
