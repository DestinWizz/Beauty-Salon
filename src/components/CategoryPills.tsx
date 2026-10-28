import React from 'react';
import { CATEGORIES } from '../data/servicesData';
import { CategoryType } from '../types';

interface CategoryPillsProps {
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  onViewAll: () => void;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  selectedCategory,
  onSelectCategory,
  onViewAll,
}) => {
  return (
    <div className="pt-4 pb-2">
      {/* Header with Title & View All */}
      <div className="flex items-center justify-between px-5 mb-3">
        <h2 className="text-sm font-semibold text-[#F8F5F0] tracking-tight">Select by Category</h2>
        <button
          onClick={onViewAll}
          className="text-xs font-medium text-[#D4AF37] hover:text-[#EADBBD] transition-colors"
        >
          View all
        </button>
      </div>

      {/* Horizontal Scrollable Categories */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar px-5 pb-1">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="flex items-center gap-2 shrink-0 group focus:outline-none"
            >
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-200 border ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38F2B] text-black border-[#D4AF37] font-semibold shadow-md shadow-[#D4AF37]/20 scale-105'
                    : 'bg-[#141414] text-[#C0C0C0] border-[#222222] hover:border-[#383838] hover:text-white'
                }`}
              >
                {/* Circular image avatar */}
                <div
                  className={`w-6 h-6 rounded-full overflow-hidden shrink-0 border ${
                    isSelected ? 'border-black/30' : 'border-[#333333]'
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs whitespace-nowrap">{cat.label}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
