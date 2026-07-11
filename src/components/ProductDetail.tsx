import React, { useState, useEffect } from "react";
import { Product } from "../types";
import { formatIDR, getProductPrice } from "../utils";
import { X, ShoppingBag, Check, ShieldCheck, Truck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProductDetailProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, variant: string | undefined, quantity: number) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  // Set default size and variant on product change
  useEffect(() => {
    if (product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
    if (product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    } else {
      setSelectedVariant("");
    }
    setQuantity(1);
    setIsAdded(false);
  }, [product]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Silakan pilih ukuran terlebih dahulu!");
      return;
    }
    onAddToCart(product, selectedSize, selectedVariant || undefined, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative bg-white rounded-none overflow-hidden shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row z-10 border border-slate-300"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-none bg-slate-900 text-white hover:bg-blue-600 hover:text-white shadow-md border border-slate-800 transition-all"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Product Image Section */}
          <div className="md:w-1/2 relative bg-slate-100 h-64 md:h-auto min-h-[300px] border-r border-slate-200">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Flat shadow accent */}
            <div className="absolute inset-0 bg-slate-950/10 md:hidden pointer-events-none" />
          </div>

          {/* Product Info Section */}
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-[90vh] bg-white">
            <div>
              {/* Category */}
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-blue-600 mb-2 block">
                {product.category}
              </span>

              {/* Title */}
              <h2 className="text-xl md:text-2xl font-display font-extrabold text-slate-900 tracking-tight leading-tight uppercase">
                {product.name}
              </h2>

              {/* Price */}
              <div className="mt-3 mb-5 flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900 font-mono">
                  {formatIDR(getProductPrice(product, selectedSize, selectedVariant || undefined))}
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Stock Tersedia</span>
              </div>

              <hr className="border-slate-200 my-4" />

              {/* Description */}
              <div className="mb-6">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Deskripsi Produk</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-sans font-normal">
                  {product.description}
                </p>
              </div>

              {/* Variant Selector */}
              {product.variants && product.variants.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2.5">Pilih Varian</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant) => (
                      <button
                        key={variant}
                        onClick={() => setSelectedVariant(variant)}
                        className={`px-4 py-2.5 text-xs font-bold rounded-none border-2 transition-all duration-150 ${
                          selectedVariant === variant
                            ? "bg-slate-900 border-slate-900 text-white shadow-xs"
                            : "bg-white border-slate-200 text-slate-700 hover:border-slate-400"
                        }`}
                      >
                        {variant}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2.5">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Pilih Ukuran</h4>
                    {product.sizes[0] !== "All Size" && (
                      <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider hover:underline cursor-pointer">Panduan Ukuran</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2.5 text-xs font-bold rounded-none border-2 transition-all duration-150 ${
                          selectedSize === size
                            ? "bg-blue-600 border-blue-600 text-white shadow-xs"
                            : "bg-white border-slate-200 text-slate-700 hover:border-slate-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-6">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Jumlah</h4>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border-2 border-slate-900 rounded-none bg-slate-50 overflow-hidden">
                    <button
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      className="px-3 py-1 hover:bg-slate-200 font-extrabold text-slate-800 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 font-bold text-xs text-slate-900 bg-white border-x border-slate-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="px-3 py-1 hover:bg-slate-200 font-extrabold text-slate-800 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pemesanan via WA</span>
                </div>
              </div>
            </div>

            {/* Actions & Trust Badges */}
            <div className="mt-6 pt-4 border-t border-slate-200">
              <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`w-full py-4 px-6 rounded-none font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2.5 shadow-sm transition-all ${
                  isAdded
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white active:scale-98"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 animate-bounce" />
                    Berhasil Dimasukkan!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    Masukkan ke Keranjang
                  </>
                )}
              </button>

              {/* Trust badgets */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-2 text-center border-t border-slate-100">
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-4 h-4 text-slate-900 mb-1" />
                  <span className="text-[9px] uppercase tracking-wider text-slate-500 font-extrabold">Bahan Premium</span>
                </div>
                <div className="flex flex-col items-center">
                  <Truck className="w-4 h-4 text-slate-900 mb-1" />
                  <span className="text-[9px] uppercase tracking-wider text-slate-500 font-extrabold">Pengiriman Cepat</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
