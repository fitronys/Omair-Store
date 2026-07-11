import { useState, useEffect } from "react";
import { Product, CartItem } from "./types";
import { products } from "./data";
import { getProductPrice } from "./utils";
import { ProductCard } from "./components/ProductCard";
import { ProductDetail } from "./components/ProductDetail";
import { CartDrawer } from "./components/CartDrawer";
import {
  ShoppingBag,
  Search,
  SlidersHorizontal,
  GraduationCap,
  Sparkles,
  Info,
  Phone,
  Clock,
  Heart,
  ChevronUp
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>(" ");
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("toko_sekolah_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error parsing cart data:", e);
      }
    }
  }, []);

  // Save cart to localStorage on change
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("toko_sekolah_cart", JSON.stringify(newCart));
  };

  // Track scroll position to show "Back to Top" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Categories list
  const categories = ["Semua", "Olahraga", "Praktik", "Atribut", "Seragam"];

  // Filter products based on category and search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "Semua" || product.category === activeCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: Product, size: string, variant: string | undefined, quantity: number) => {
    const cartItemId = variant ? `${product.id}-${size}-${variant}` : `${product.id}-${size}`;
    const existingIndex = cart.findIndex((item) => item.id === cartItemId);
    const selectedPrice = getProductPrice(product, size, variant);

    let updatedCart = [...cart];
    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart.push({
        id: cartItemId,
        product,
        selectedSize: size,
        selectedVariant: variant,
        priceAtSelection: selectedPrice,
        quantity,
      });
    }
    saveCart(updatedCart);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: Math.max(1, newQty) };
        }
        return item;
      });
    saveCart(updatedCart);
  };

  const handleRemoveItem = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    saveCart(updatedCart);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Top Banner */}
      <div className="bg-slate-950 text-white text-[10px] md:text-xs font-bold py-2 px-4 text-center relative z-20 flex items-center justify-center gap-1.5 tracking-widest uppercase border-b border-slate-800">
        <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
        <span>Katalog Fashion Sekolah Premium • Hubungi & Order Langsung via WhatsApp Otomatis</span>
        <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b-2 border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
          
          {/* Logo Title */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-900 rounded-none flex items-center justify-center text-white border-2 border-slate-900 shadow-sm">
              <GraduationCap className="w-6 md:w-7 md:h-7" />
            </div>
            <div>
              <h1 className="font-display font-extrabold text-base md:text-lg tracking-wider text-slate-900 leading-none uppercase">
                Omair Store
              </h1>
              <p className="text-[9px] md:text-[10px] text-blue-600 font-mono mt-1 font-bold tracking-widest">
                PREMIUM GEOMETRIC APPAREL
              </p>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative">
            <Search className="absolute left-3.5 text-slate-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery === " " ? "" : searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="CARI SERAGAM, ATRIBUT...."
              className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-slate-200 focus:border-blue-600 rounded-none text-xs uppercase tracking-wider font-bold transition-all outline-none"
            />
          </div>

          {/* Cart Icon & Info */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-slate-900 text-white hover:bg-blue-600 rounded-none border border-slate-950 flex items-center justify-center transition-all active:scale-95 shadow-md group"
              aria-label="Keranjang Belanja"
            >
              <ShoppingBag className="w-5 h-5 transition-transform" />
              {totalCartItems > 0 && (
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white font-mono font-black text-[9px] w-5 h-5 rounded-none flex items-center justify-center border-2 border-white shadow-xs"
                >
                  {totalCartItems}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-slate-950 text-white relative py-12 md:py-20 px-4 overflow-hidden border-b-4 border-blue-600">
        {/* Abstract shapes inside Hero */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-none pointer-events-none border-l border-b border-slate-800" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-slate-500/10 rounded-none pointer-events-none border-r border-t border-slate-800" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-950 border-2 border-blue-600 rounded-none text-blue-400 text-[10px] font-extrabold uppercase tracking-widest"
          >
            <Sparkles className="w-3 h-3" />
            <span>Koleksi Terpopuler Angkatan Baru</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="font-display text-2xl md:text-5xl font-black tracking-tight leading-tight uppercase"
          >
            Tampil Keren, Percaya Diri, <br />
            <span className="text-blue-500 underline decoration-2 underline-offset-4">Dan Nyaman Di Sekolah</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-slate-400 text-xs md:text-sm max-w-2xl mx-auto leading-relaxed font-mono"
          >
            Temukan Baju Praktik Jurusan, Baju Olahraga, atribut, dan seragam sekolah premium terbaik dengan pengiriman cepat dan jaminan kualitas nomor satu.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="pt-4 flex flex-wrap justify-center items-center gap-4 text-[10px] text-slate-300 font-extrabold uppercase tracking-wider"
          >
            <span className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 border border-slate-800">
              <Clock className="w-3.5 h-3.5 text-blue-500" /> Respon WA Cepat (09.00 - 18.00)
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 border border-slate-800">
              <Phone className="w-3.5 h-3.5 text-blue-500" /> Checkout Otomatis WhatsApp
            </span>
          </motion.div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-slate-50">
        
        {/* Search Bar - Mobile Only */}
        <div className="md:hidden mb-6 relative">
          <Search className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery === " " ? "" : searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="CARI SERAGAM, ATRIBUT...."
            className="w-full pl-10 pr-4 py-3 bg-white border-2 border-slate-900 focus:border-blue-600 rounded-none text-xs uppercase tracking-wider font-bold transition-all outline-none"
          />
        </div>

        {/* Filters and Section Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b-2 border-slate-200 pb-6">
          <div>
            <h3 className="text-sm font-display font-extrabold text-slate-900 flex items-center gap-2 uppercase tracking-widest">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              Katalog Busana Sekolah
            </h3>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1 font-bold">Pilih kategori untuk menyaring apparel sekolah Anda</p>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-widest rounded-none whitespace-nowrap transition-all border-2 ${
                  activeCategory === cat
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:border-blue-600 hover:text-blue-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <AnimatePresence mode="popLayout">
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 text-center bg-white border border-slate-200 rounded-none p-6"
            >
              <div className="w-12 h-12 bg-slate-100 border border-slate-200 rounded-none flex items-center justify-center mx-auto mb-3">
                <Search className="w-4 h-4 text-slate-400" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">Tidak ada produk ditemukan</h4>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1 max-w-sm mx-auto">
                Coba ubah kata kunci pencarian Anda atau beralih ke kategori yang berbeda.
              </p>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={setSelectedProduct}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Support Info Ribbon */}
      <section className="bg-white border-y-2 border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-start gap-3.5 p-4 border border-slate-200 bg-slate-50 transition-colors hover:border-blue-600 rounded-none">
            <span className="w-10 h-10 bg-slate-950 text-white border border-slate-800 rounded-none flex items-center justify-center shrink-0 text-sm font-black">
              01
            </span>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900">Checkout Cepat</h4>
              <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                Langsung kirim order ke WhatsApp. Admin kami akan melayani detail transaksi & pembayaran.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 border border-slate-200 bg-slate-50 transition-colors hover:border-blue-600 rounded-none">
            <span className="w-10 h-10 bg-slate-950 text-white border border-slate-800 rounded-none flex items-center justify-center shrink-0 text-sm font-black">
              02
            </span>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900">Bahan Premium</h4>
              <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                Kami menjamin keaslian, ketebalan, dan kualitas benang katun rajutan serta fleece terbaik.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 border border-slate-200 bg-slate-50 transition-colors hover:border-blue-600 rounded-none">
            <span className="w-10 h-10 bg-slate-950 text-white border border-slate-800 rounded-none flex items-center justify-center shrink-0 text-sm font-black">
              03
            </span>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900">Admin 24 Jam</h4>
              <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                Tanya admin kapan pun untuk bantuan ukuran, ketersediaan, atau pesanan kustom sekolah.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t-2 border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-blue-600 rounded-none flex items-center justify-center text-white font-black shadow-md">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-display font-extrabold text-sm uppercase tracking-wider text-white">Omair Store</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-mono">
              Kami adalah penyedia busana, aksesoris, dan apparel premium dari Omair Store dengan kemudahan checkout langsung ke admin WhatsApp tanpa ribet.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Kategori Busana</h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-mono">
              <li><button onClick={() => setActiveCategory("Olahraga")} className="hover:text-blue-500 transition-colors text-left uppercase">Olahraga</button></li>
              <li><button onClick={() => setActiveCategory("Praktik")} className="hover:text-blue-500 transition-colors text-left uppercase">Praktik</button></li>
              <li><button onClick={() => setActiveCategory("Atribut")} className="hover:text-blue-500 transition-colors text-left uppercase">Atribut</button></li>
              <li><button onClick={() => setActiveCategory("Seragam")} className="hover:text-blue-500 transition-colors text-left uppercase">Seragam</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Hubungi Kami</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              Ada pertanyaan atau butuh pemesanan grosir untuk satu kelas/sekolah? Hubungi tim support kami:
            </p>
            <div className="mt-3 space-y-2 text-xs font-mono">
              <span className="block text-slate-300">📧 support@omairstore.com</span>
              <span className="block text-slate-300">📱 +62 896 898 22111</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-900 text-center flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
          <p>© {new Date().getFullYear()} Omair Store. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex gap-4">
            <span className="hover:text-blue-500 cursor-pointer">Syarat & Ketentuan</span>
            <span>•</span>
            <span className="hover:text-blue-500 cursor-pointer">Kebijakan Privasi</span>
          </div>
        </div>
      </footer>

      {/* Back to Top Floating Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 left-6 z-40 p-3 bg-slate-900 text-white border border-slate-800 rounded-none hover:bg-blue-600 hover:border-blue-600 transition-all focus:outline-hidden shadow-lg"
            aria-label="Kembali ke atas"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Product Detail Modal */}
      <ProductDetail
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
