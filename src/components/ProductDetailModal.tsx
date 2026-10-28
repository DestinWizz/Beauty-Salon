import React, { useState } from 'react';
import { X, ShoppingBag, Check, Sparkles, Shield, Heart } from 'lucide-react';
import { ProductItem } from '../types';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onAddToCart: (product: ProductItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 900);
  };

  // Curated benefits based on product
  const getBenefits = (id: string) => {
    switch (id) {
      case 'argan-silk-growth-oil':
        return [
          'Soothes braid tension and scalp dryness immediately upon application',
          'Stimulates edge retention & follicle density with pure rosemary & peppermint',
          'Lightweight cold-pressed Moroccan argan absorbs with zero greasy residue',
        ];
      case 'edge-control-pomade':
        return [
          '48-hour sweat-resistant hold without flaking or turning white',
          'Infused with Jamaican black castor oil to nourish delicate edges',
          'Crystal-clear formula suitable for 3A to 4C hair textures',
        ];
      case 'luxury-satin-bonnet':
        return [
          'Double-layered mulberry silk charmeuse for zero friction during sleep',
          'Extra-large jumbo volume accommodates waist-length knotless braids and locs',
          'Reversible dual tone: Champagne Gold & Obsidian Charcoal',
        ];
      case 'deep-repair-hair-mask':
        return [
          'Intense salon steam hydration mends fractured cuticles after takedown',
          'Hydrolyzed keratin restores elasticity and natural bounce',
          'Deeply penetrates moisture-starved coils in just 15 minutes',
        ];
      default:
        return [
          'Salon-grade luxury formulation used in our Ugbor GRA VIP suites',
          '100% cruelty-free, sulfate-free, and mineral-oil free',
        ];
    }
  };

  const benefits = getBenefits(product.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-[#121212] text-[#F8F5F0] border border-[#C5A059]/40 rounded-3xl p-5 shadow-2xl z-10 max-h-[90vh] overflow-y-auto no-scrollbar space-y-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between border-b border-[#222222] pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
              Product Essentials
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full bg-[#1C1C1C] border border-[#2B2B2B] flex items-center justify-center text-[#A0A0A0] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Product Full-Size Image Frame */}
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#0A0A0A] border border-[#262626] flex items-center justify-center p-3 shadow-inner">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover rounded-xl"
          />
          {product.badge && (
            <div className="absolute top-3 left-3">
              <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#121212]/90 text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm backdrop-blur-sm">
                {product.badge}
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-serif-luxury text-xl font-bold text-white">
                {product.title}
              </h3>
              <p className="text-xs text-[#D4AF37] font-medium mt-0.5">
                {product.subtitle}
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-[10px] text-[#888888] block">Price</span>
              <span className="font-serif-luxury text-xl font-bold text-[#F8F5F0]">
                ₦{product.priceNGN.toLocaleString()}
              </span>
            </div>
          </div>
          <span className="inline-block text-[10px] text-[#A0A0A0] bg-[#1A1A1A] px-2 py-0.5 rounded-full border border-[#282828] mt-1">
            Size: {product.volumeOrSize}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-[#B8B8B8] leading-relaxed">
          {product.description}
        </p>

        {/* Key Benefits */}
        <div className="p-3.5 rounded-2xl bg-[#161616] border border-[#262626] space-y-2">
          <h4 className="text-xs font-semibold text-white flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Key Formulation Benefits</span>
          </h4>
          <ul className="space-y-1.5 text-[11px] text-[#A0A0A0]">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0 mt-1" />
                <span className="leading-snug text-[#C5C5C5]">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Primary CTA Button */}
        <div className="pt-2">
          <button
            onClick={handleAdd}
            disabled={isAdded}
            className={`w-full py-3.5 px-4 rounded-full font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98 ${
              isAdded
                ? 'bg-[#34D399] text-black shadow-[#34D399]/20'
                : 'bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#B38F2B] text-black shadow-[#D4AF37]/25 hover:brightness-110'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Added to Bag!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
                <span>Add to Cart (₦{product.priceNGN.toLocaleString()})</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
