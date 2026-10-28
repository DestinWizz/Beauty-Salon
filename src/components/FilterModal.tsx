import React from 'react';
import { X, Check } from 'lucide-react';
import { CategoryType } from '../types';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  priceFilter: 'all' | 'under40' | '40to50' | 'over50';
  onPriceFilterChange: (val: 'all' | 'under40' | '40to50' | 'over50') => void;
  hairIncludedOnly: boolean;
  onToggleHairIncluded: () => void;
  onReset: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  selectedCategory,
  onSelectCategory,
  priceFilter,
  onPriceFilterChange,
  hairIncludedOnly,
  onToggleHairIncluded,
  onReset,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl bg-[#121212] border border-[#262626] p-5 text-white shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#222] pb-3">
          <h3 className="font-serif-luxury font-bold text-base text-[#F8F5F0]">
            Filter Curated Styles
          </h3>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#1C1C1C] flex items-center justify-center text-[#888] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Categories */}
        <div>
          <label className="text-xs font-semibold text-[#A0A0A0] block mb-2">Hairstyle Category</label>
          <div className="flex flex-wrap gap-1.5">
            {(['All', 'Braids', 'Locs', 'Knotless', 'Wig Revamp', 'Styling'] as CategoryType[]).map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-semibold'
                    : 'bg-[#181818] text-[#B0B0B0] border-[#2A2A2A] hover:border-[#444]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Price Tier */}
        <div>
          <label className="text-xs font-semibold text-[#A0A0A0] block mb-2">Price Tier</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'all', label: 'All Prices' },
              { id: 'under40', label: 'Under ₦40,000' },
              { id: '40to50', label: '₦40k – ₦50,000' },
              { id: 'over50', label: 'Above ₦50,000' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => onPriceFilterChange(p.id as any)}
                className={`py-2 px-2.5 rounded-xl text-xs text-left border transition-all ${
                  priceFilter === p.id
                    ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37] font-semibold'
                    : 'bg-[#161616] border-[#262626] text-[#A0A0A0]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Hair Included Switch */}
        <div className="pt-2 border-t border-[#222]">
          <button
            onClick={onToggleHairIncluded}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#161616] border border-[#262626] text-xs text-left"
          >
            <div>
              <span className="font-semibold text-white block">Hair Included Only</span>
              <span className="text-[10px] text-[#777]">
                Styles supplying premium extensions & curls
              </span>
            </div>
            <div
              className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                hairIncludedOnly
                  ? 'bg-[#D4AF37] border-[#D4AF37] text-black'
                  : 'border-[#444] bg-transparent'
              }`}
            >
              {hairIncludedOnly && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </button>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={onReset}
            className="flex-1 py-2 rounded-full bg-[#181818] border border-[#2B2B2B] text-xs text-[#A0A0A0] hover:text-white"
          >
            Reset All
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8922B] text-black font-bold text-xs shadow-md shadow-[#D4AF37]/20"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
