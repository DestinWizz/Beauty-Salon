import React, { useState } from 'react';
import { ShoppingBag, Check, Sparkles, Plus, ArrowRight } from 'lucide-react';
import { PRODUCTS_DATA } from '../data/servicesData';
import { ProductItem } from '../types';

interface ProductsSectionProps {
  onAddToCart: (product: ProductItem) => void;
  cartCount: number;
  onOpenCart: () => void;
  onSelectProduct: (product: ProductItem) => void;
  onViewAllProducts?: () => void;
  limit?: number; // Optional limit for Home tab (e.g. 2 items)
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  onAddToCart,
  cartCount,
  onOpenCart,
  onSelectProduct,
  onViewAllProducts,
  limit,
}) => {
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const displayedProducts = limit ? PRODUCTS_DATA.slice(0, limit) : PRODUCTS_DATA;

  const handleAdd = (e: React.MouseEvent, product: ProductItem) => {
    e.stopPropagation();
    onAddToCart(product);
    setRecentlyAddedId(product.id);
    setTimeout(() => setRecentlyAddedId(null), 1800);
  };

  return (
    <section className="px-5 py-6 border-t border-[#1C1C1C] bg-[#0A0A0A]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest block mb-1">
            HAIR CARE ESSENTIALS
          </span>
          <h2 className="font-serif-luxury text-2xl font-bold text-[#F8F5F0]">
            Our Products
          </h2>
          <p className="text-xs text-[#A0A0A0] max-w-md mt-1 leading-relaxed">
            Experience the difference with top-tier products that enhance both the aesthetics and health of your hair.
          </p>
        </div>

        {cartCount > 0 ? (
          <button
            onClick={onOpenCart}
            className="self-start sm:self-auto px-4 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38F2B] text-black text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#D4AF37]/20 active:scale-95 transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>View Bag ({cartCount})</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] self-start sm:self-auto">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-medium">Studio Care Formula</span>
          </div>
        )}
      </div>

      {/* Product Cards Grid: Fully Clickable to trigger Product Detail Modal */}
      <div className="grid grid-cols-2 gap-3.5">
        {displayedProducts.map((product) => {
          const isJustAdded = recentlyAddedId === product.id;

          return (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="group relative rounded-3xl bg-[#141414] text-[#F8F5F0] p-3.5 flex flex-col justify-between shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border border-[#C5A059]/30 hover:border-[#D4AF37]/70 cursor-pointer"
            >
              {/* Floating Top-Right Add to Order Button */}
              <button
                onClick={(e) => handleAdd(e, product)}
                title={`Add ${product.title} to Order`}
                className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90 shadow-md ${
                  isJustAdded
                    ? 'bg-[#34D399] text-black scale-110 font-bold'
                    : 'bg-[#1F1F1F] text-[#D4AF37] border border-[#C5A059]/40 hover:bg-[#D4AF37] hover:text-black'
                }`}
              >
                {isJustAdded ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : (
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                )}
              </button>

              {/* Bestseller Badge */}
              {product.badge && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#0A0A0A]/90 text-[#D4AF37] border border-[#D4AF37]/30 backdrop-blur-sm">
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Product Image Frame */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#0C0C0C] border border-[#222222] mb-3 flex items-center justify-center p-2 group-hover:border-[#C5A059]/40 transition-colors">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover object-center rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Product Info */}
              <div className="flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-semibold text-xs text-white line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-[10px] text-[#A0A0A0] line-clamp-1 mt-0.5">
                    {product.subtitle}
                  </p>
                  <p className="text-[9px] text-[#777777] line-clamp-2 mt-1 leading-snug">
                    {product.description}
                  </p>
                </div>

                {/* Price & Action Row */}
                <div className="mt-2.5 pt-2 border-t border-[#202020] flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-[#777777] block">Price</span>
                    <span className="font-serif-luxury font-bold text-sm text-[#D4AF37]">
                      ₦{product.priceNGN.toLocaleString()}
                    </span>
                  </div>

                  <span className="text-[10px] text-[#A0A0A0] group-hover:text-white transition-colors underline decoration-[#D4AF37]/50 underline-offset-2">
                    Details
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* When Limited on Home Tab: Stylish Fade-Out Preview Card that switches to Explore */}
        {limit && PRODUCTS_DATA.length > limit && onViewAllProducts && (
          <div
            onClick={onViewAllProducts}
            className="group relative rounded-3xl bg-gradient-to-br from-[#161616] via-[#121212] to-[#0A0A0A] border border-dashed border-[#C5A059]/40 hover:border-[#D4AF37] p-4 flex flex-col justify-between items-center text-center cursor-pointer transition-all hover:scale-[1.02] shadow-xl"
          >
            <div className="w-12 h-12 rounded-full bg-[#1A1A1A] border border-[#2B2B2B] flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform mt-3">
              <ShoppingBag className="w-5 h-5 stroke-[2]" />
            </div>

            <div className="my-2">
              <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider block mb-0.5">
                Full Collection
              </span>
              <h4 className="font-serif-luxury font-bold text-sm text-white">
                +{PRODUCTS_DATA.length - limit} More Essentials
              </h4>
              <p className="text-[10px] text-[#888888] mt-1 leading-tight max-w-[120px] mx-auto">
                Satin bonnets, hair masks & deep moisture formulas.
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewAllProducts();
              }}
              className="w-full py-2 px-3 rounded-full bg-[#1F1F1F] group-hover:bg-[#D4AF37] text-white group-hover:text-black text-[10px] font-bold flex items-center justify-center gap-1 transition-all"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* Prominent View All Products (Explore) Button on Home Tab */}
      {limit && onViewAllProducts && (
        <div className="mt-4">
          <button
            onClick={onViewAllProducts}
            className="w-full py-2.5 px-4 rounded-2xl bg-[#141414] border border-[#C5A059]/30 hover:border-[#D4AF37] text-xs font-semibold text-[#D4AF37] hover:text-white flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <span>View All Products & Maintenance (Explore)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </section>
  );
};
