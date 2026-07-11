import React from "react";
import { Product } from "../types";
import { formatIDR } from "../utils";
import { Eye, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  return (
    <motion.div
      id={`product-card-${product.id}`}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => onSelect(product)}
      className="group bg-white rounded-none border border-slate-200 overflow-hidden cursor-pointer flex flex-col h-full transition-all duration-300 hover:border-blue-600 hover:shadow-xs"
    >
      {/* Product Image Container */}
      <div className="relative aspect-[4/5] bg-slate-50 border-b border-slate-150">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover grayscale-10 hover:grayscale-0 transition-all duration-500 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Flat dark overlay on hover */}
        <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="bg-slate-900 text-white text-[10px] font-bold tracking-widest uppercase px-4 py-2.5 rounded-none border border-slate-700 shadow-md flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <Eye className="w-3.5 h-3.5" />
            Liat Detail
          </span>
        </div>
        {/* Category Tag (Sharp Geometric Style) */}
        <span className="absolute top-0 left-0 bg-blue-600 text-white text-[9px] font-extrabold tracking-widest uppercase px-3 py-1.5 shadow-sm">
          {product.category}
        </span>
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-white">
        <div>
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block mb-1">
            {product.category}
          </span>
          <h3 className="font-display font-bold text-slate-900 text-sm md:text-base tracking-tight leading-snug group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <p className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Harga</span>
            <span className="text-sm md:text-base font-bold text-slate-900 font-mono">
              {formatIDR(product.price)}
            </span>
          </div>

          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-all">
            Detail
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};
