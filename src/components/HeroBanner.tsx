import React from 'react';
import { ArrowRight, ShieldCheck, Sparkles, CheckCircle2, MessageCircle } from 'lucide-react';

interface HeroBannerProps {
  onExploreClick: () => void;
  onOpenWhatsAppConcierge: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreClick,
  onOpenWhatsAppConcierge,
}) => {
  return (
    <div className="px-5 pt-3 pb-2">
      {/* Hyper-Local Neighborhood Tagline */}
      <div className="flex items-center justify-between mb-3 text-[11px] text-[#A3A3A3] tracking-wide border-b border-[#1E1E1E] pb-2">
        <span className="flex items-center gap-1.5 font-medium text-[#D4AF37]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] inline-block animate-pulse"></span>
          UGDBOR GRA · ADESUWA CORRIDOR
        </span>
        <span className="text-[#888]">Benin City VIP Lounge</span>
      </div>

      {/* Hero Editorial Card */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#181818] via-[#121212] to-[#0D0D0D] border border-[#262626] p-5 shadow-2xl">
        {/* Subtle Ambient Gold Glow */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-12 gap-3 items-center relative z-10">
          <div className="col-span-7 pr-1">
            <span className="font-serif-luxury italic text-xs text-[#D4AF37] tracking-wider block mb-1">
              Handcrafted Perfection
            </span>
            <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold leading-tight text-[#F8F5F0] mb-2">
              Find Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8F5F0] via-[#EADBBD] to-[#D4AF37]">
                Perfect Style
              </span>
            </h1>
            <p className="text-[12px] text-[#B0B0B0] leading-relaxed mb-4 line-clamp-2">
              Zero DM back-and-forth. Transparent pricing, verified braiders, and private AC suites.
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={onExploreClick}
                className="px-4 py-2 rounded-full bg-[#F8F5F0] text-[#0A0A0A] font-semibold text-xs hover:bg-[#EADBBD] active:scale-95 transition-all flex items-center gap-1.5 shadow-md shadow-white/5"
              >
                <span>Explore Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Model Frame */}
          <div className="col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-[#333333] shadow-xl group">
              <img
                src="/src/assets/images/hero_boho_braids_1792949103763.jpg"
                alt="Eterniou Luxury Hair Model"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2 right-2 text-center">
                <span className="text-[9px] font-semibold uppercase tracking-widest text-[#EADBBD] bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-[#D4AF37]/30 inline-block">
                  Masterpiece
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges Strip (4 Pillar Standards) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#121212] border border-[#202020]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
          <span className="text-[11px] font-medium text-[#DCDCDC] truncate">100% Verified Braiders</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#121212] border border-[#202020]">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
          <span className="text-[11px] font-medium text-[#DCDCDC] truncate">Transparent Pricing</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#121212] border border-[#202020]">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
          <span className="text-[11px] font-medium text-[#DCDCDC] truncate">Hair Included Options</span>
        </div>
        <button
          onClick={onOpenWhatsAppConcierge}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#121212] border border-[#25D366]/30 text-left hover:border-[#25D366] transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
          <span className="text-[11px] font-medium text-[#25D366] truncate">Instant WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
