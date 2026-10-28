import React from 'react';
import { X, Star, ShieldCheck, Award, MapPin, Sparkles, MessageCircle, Clock } from 'lucide-react';
import { MASTER_STYLISTS } from '../data/servicesData';
import { Stylist } from '../types';

interface StylistProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookWithStylist: (stylist: Stylist) => void;
}

export const StylistProfileModal: React.FC<StylistProfileModalProps> = ({
  isOpen,
  onClose,
  onBookWithStylist,
}) => {
  if (!isOpen) return null;
  const stylist = MASTER_STYLISTS.aaliyah;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-md rounded-3xl bg-[#121212] border border-[#282828] p-5 text-white shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto no-scrollbar space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#222] pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="font-serif-luxury font-bold text-base text-[#F8F5F0]">
              Master Braider Credentials
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#1C1C1C] flex items-center justify-center text-[#888] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Card */}
        <div className="text-center pt-2">
          <div className="relative w-24 h-24 rounded-full mx-auto p-1 bg-gradient-to-tr from-[#D4AF37] via-[#E8D9B5] to-[#99772B] shadow-xl">
            <img
              src={stylist.avatar}
              alt={stylist.name}
              className="w-full h-full object-cover rounded-full"
            />
            <div className="absolute bottom-0 right-0 p-1.5 rounded-full bg-[#10B981] ring-2 ring-[#121212]">
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
            </div>
          </div>

          <h2 className="font-serif-luxury text-xl font-bold text-white mt-3">
            {stylist.name}
          </h2>
          <p className="text-xs text-[#D4AF37] font-semibold">{stylist.title}</p>
          <p className="text-[11px] text-[#A0A0A0] flex items-center justify-center gap-1 mt-1">
            <MapPin className="w-3 h-3 text-[#D4AF37]" />
            <span>{stylist.location}</span>
          </p>

          <div className="flex items-center justify-center gap-4 mt-3 py-2 px-4 rounded-2xl bg-[#181818] border border-[#252525] max-w-xs mx-auto">
            <div>
              <div className="flex items-center justify-center gap-1 text-[#D4AF37] font-bold text-sm">
                <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                <span>{stylist.rating}</span>
              </div>
              <span className="text-[10px] text-[#777]">310+ Reviews</span>
            </div>
            <div className="w-[1px] h-8 bg-[#2A2A2A]" />
            <div>
              <span className="font-bold text-sm text-white block">{stylist.experience}</span>
              <span className="text-[10px] text-[#777]">Master Level</span>
            </div>
            <div className="w-[1px] h-8 bg-[#2A2A2A]" />
            <div>
              <span className="font-bold text-sm text-[#34D399] block">100%</span>
              <span className="text-[10px] text-[#777]">Clean Edges</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="p-3.5 rounded-2xl bg-[#171717] border border-[#242424] text-xs text-[#B5B5B5] leading-relaxed">
          <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider block mb-1">
            Artistry Philosophy
          </span>
          {stylist.bio}
        </div>

        {/* Core Specialties */}
        <div>
          <span className="text-xs font-semibold text-[#DCDCDC] block mb-2">
            Verified Signature Techniques
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-[#151515] border border-[#222]">
              <span className="font-semibold text-white block">Tension-Free Knotless</span>
              <span className="text-[10px] text-[#777]">Zero headache, moves on Day 1</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#151515] border border-[#222]">
              <span className="font-semibold text-white block">Human Hair Boho Mix</span>
              <span className="text-[10px] text-[#777]">Tangle-free raw curls</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#151515] border border-[#222]">
              <span className="font-semibold text-white block">Lightweight Soft Locs</span>
              <span className="text-[10px] text-[#777]">Featherlight 24" length</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#151515] border border-[#222]">
              <span className="font-semibold text-white block">Sterile Tool Sanitizing</span>
              <span className="text-[10px] text-[#777]">Hospital-grade UV sterilizer</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-2 border-t border-[#222]">
          <button
            onClick={() => {
              onBookWithStylist(stylist);
              onClose();
            }}
            className="w-full py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8922B] text-black font-bold text-xs shadow-lg shadow-[#D4AF37]/20 hover:brightness-110"
          >
            Book Appointment with {stylist.name.split(' ')[0]}
          </button>
          <a
            href="https://wa.me/2348030000000?text=Hello%20Aaliyah%2C%20I%20would%20like%20to%20consult%20with%20you%20on%20Eterniou%20Luxury."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-full bg-[#1A1A1A] border border-[#333] text-xs text-[#25D366] font-semibold flex items-center justify-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Direct WhatsApp Inquiry</span>
          </a>
        </div>
      </div>
    </div>
  );
};
