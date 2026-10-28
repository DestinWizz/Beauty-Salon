import React from 'react';
import { Search, Bell, SlidersHorizontal, MapPin, ShoppingBag } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenNotifications: () => void;
  onOpenFilters: () => void;
  unreadCount: number;
  cartCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onOpenNotifications,
  onOpenFilters,
  unreadCount,
  cartCount,
  onOpenCart,
}) => {
  return (
    <header className="w-full bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#1E1E1E] sticky top-0 z-30 transition-colors">
      {/* Main Brand Top Bar (Clean, no fake status bar) */}
      <div className="px-5 pt-3.5 pb-2.5 flex items-center justify-between gap-4">
        {/* Brand Mark */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#C5A059] to-[#99772B] p-[1.5px] flex items-center justify-center shadow-lg shadow-[#D4AF37]/10 shrink-0">
            <div className="w-full h-full rounded-full bg-[#0E0E0E] flex items-center justify-center">
              <span className="font-cinzel font-bold text-sm tracking-widest text-[#D4AF37]">E</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif-luxury italic text-xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#F8F5F0] via-[#E8D9B5] to-[#D4AF37]">
                Eterniou
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-widest text-[#D4AF37] px-1.5 py-0.5 rounded border border-[#D4AF37]/30 bg-[#D4AF37]/10">
                LUXURY
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-[#A3A3A3]">
              <MapPin className="w-3 h-3 text-[#D4AF37]" />
              <span className="truncate max-w-[170px]">Ugbor GRA · Benin City</span>
            </div>
          </div>
        </div>

        {/* Right Actions: Notifications & Interactive Shopping Cart */}
        <div className="flex items-center gap-2">
          {/* Notification Bell */}
          <button
            onClick={onOpenNotifications}
            aria-label="View notifications"
            className="relative p-2 rounded-full border border-[#2D2D2D] bg-[#161616] text-[#A3A3A3] hover:text-white transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D4AF37] rounded-full ring-2 ring-[#0A0A0A]" />
            )}
          </button>

          {/* Interactive Shopping Cart Button with Live Counter Badge */}
          <button
            onClick={onOpenCart}
            aria-label="View shopping cart"
            className="relative p-2 rounded-full border border-[#C5A059]/40 bg-[#141414] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all min-h-[38px] min-w-[38px] flex items-center justify-center shadow-md active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-gradient-to-r from-[#D4AF37] to-[#B38F2B] text-black text-[10px] font-extrabold rounded-full flex items-center justify-center ring-2 ring-[#0A0A0A] shadow-sm animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Interactive Search Bar */}
      <div className="px-5 pb-3">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-[#737373] absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search styles, products, or Ugbor GRA..."
            className="w-full pl-10 pr-12 py-2.5 rounded-full bg-[#141414] border border-[#242424] text-xs sm:text-sm text-[#F8F5F0] placeholder-[#737373] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all"
          />
          <button
            onClick={onOpenFilters}
            aria-label="Filter styles"
            className="absolute right-1.5 w-8 h-8 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38F2B] text-black flex items-center justify-center shadow hover:opacity-90 transition-opacity"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-black" />
          </button>
        </div>
      </div>
    </header>
  );
};
