import React from 'react';
import { Home, Compass, Bookmark, User, MessageCircle } from 'lucide-react';

export type NavTab = 'home' | 'explore' | 'bookings' | 'profile';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  bookingsCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  bookingsCount,
}) => {
  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
      <nav
        aria-label="Bottom Navigation"
        className="pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-full bg-[#101010]/95 backdrop-blur-xl border border-[#2B2B2B] shadow-2xl shadow-black/80 max-w-[360px] w-full justify-between"
      >
        {/* Home Tab */}
        <button
          onClick={() => onTabChange('home')}
          className={`flex items-center gap-2 py-2 px-3.5 rounded-full text-xs font-semibold transition-all duration-200 ${
            activeTab === 'home'
              ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8922B] text-black shadow-md shadow-[#D4AF37]/30 scale-102'
              : 'text-[#A0A0A0] hover:text-white'
          }`}
        >
          <Home className={`w-4 h-4 ${activeTab === 'home' ? 'text-black stroke-[2.5]' : ''}`} />
          {activeTab === 'home' && <span>Home</span>}
        </button>

        {/* Explore Tab */}
        <button
          onClick={() => onTabChange('explore')}
          className={`flex items-center gap-2 py-2 px-3.5 rounded-full text-xs font-semibold transition-all duration-200 ${
            activeTab === 'explore'
              ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8922B] text-black shadow-md shadow-[#D4AF37]/30 scale-102'
              : 'text-[#A0A0A0] hover:text-white'
          }`}
        >
          <Compass className={`w-4 h-4 ${activeTab === 'explore' ? 'text-black stroke-[2.5]' : ''}`} />
          {activeTab === 'explore' && <span>Explore</span>}
        </button>

        {/* Bookings Tab */}
        <button
          onClick={() => onTabChange('bookings')}
          className={`relative flex items-center gap-2 py-2 px-3.5 rounded-full text-xs font-semibold transition-all duration-200 ${
            activeTab === 'bookings'
              ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8922B] text-black shadow-md shadow-[#D4AF37]/30 scale-102'
              : 'text-[#A0A0A0] hover:text-white'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${activeTab === 'bookings' ? 'text-black stroke-[2.5]' : ''}`} />
          {bookingsCount > 0 && activeTab !== 'bookings' && (
            <span className="absolute 0 top-1 right-1 w-2 h-2 bg-[#D4AF37] rounded-full" />
          )}
          {activeTab === 'bookings' && (
            <span>
              Bookings {bookingsCount > 0 ? `(${bookingsCount})` : ''}
            </span>
          )}
        </button>

        {/* Profile / Stylist Tab */}
        <button
          onClick={() => onTabChange('profile')}
          className={`flex items-center gap-2 py-2 px-3.5 rounded-full text-xs font-semibold transition-all duration-200 ${
            activeTab === 'profile'
              ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8922B] text-black shadow-md shadow-[#D4AF37]/30 scale-102'
              : 'text-[#A0A0A0] hover:text-white'
          }`}
        >
          <User className={`w-4 h-4 ${activeTab === 'profile' ? 'text-black stroke-[2.5]' : ''}`} />
          {activeTab === 'profile' && <span>Stylist</span>}
        </button>
      </nav>
    </div>
  );
};
