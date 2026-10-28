import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Zap, ShieldCheck, Gem, Sparkles, MessageCircle } from 'lucide-react';

interface StudioLocationSectionProps {
  onOpenWhatsAppConcierge: () => void;
}

export const StudioLocationSection: React.FC<StudioLocationSectionProps> = ({
  onOpenWhatsAppConcierge,
}) => {
  const [showFullMapDetails, setShowFullMapDetails] = useState(false);

  const googleMapsDirectionsUrl =
    'https://www.google.com/maps/dir/?api=1&destination=Ugbor+GRA,+Benin+City,+Edo+State,+Nigeria';

  // Sleek, scannable 4 minimalist cards with punchy micro-copy as requested
  const streamlinedStandards = [
    {
      icon: Zap,
      title: '24/7 Silent Power & AC',
      subtext: 'Chilled Chapman, Starlink Wi-Fi',
      badge: 'Uninterrupted',
    },
    {
      icon: ShieldCheck,
      title: 'Zero-Tension Guarantee',
      subtext: 'Certified texture specialists',
      badge: 'Pain-Free',
    },
    {
      icon: Gem,
      title: 'Transparent 30% Deposit',
      subtext: 'Lock slot, balance on satisfaction',
      badge: 'Zero DM Wait',
    },
    {
      icon: Sparkles,
      title: 'Sterile Hair Included',
      subtext: 'Pre-stretched kanekalon & human hair',
      badge: 'Hygienic',
    },
  ];

  return (
    <section className="px-5 py-6 border-t border-[#1C1C1C] bg-[#0A0A0A]">
      {/* Section Header */}
      <div className="mb-4">
        <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-semibold uppercase tracking-wider mb-1">
          <MapPin className="w-3.5 h-3.5" />
          <span>Physical Anchor · Zone B</span>
        </div>
        <h2 className="font-serif-luxury text-2xl font-bold text-[#F8F5F0]">
          Ugbor GRA Studio & Salon Sanctuary
        </h2>
        <p className="text-xs text-[#A0A0A0] mt-1 leading-relaxed">
          Centered in the serene high-income enclave of Ugbor GRA & Adesuwa corridor, providing private AC suites, silent solar/gen power, and guaranteed zero queue delays.
        </p>
      </div>

      {/* Embedded Google Maps Section */}
      <div className="rounded-3xl overflow-hidden bg-[#141414] border border-[#252525] shadow-xl mb-5">
        {/* Map Header with Quick Details */}
        <div className="p-3.5 bg-[#121212] border-b border-[#202020] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-white">Ugbor GRA & Adesuwa Corridor</h4>
              <p className="text-[10px] text-[#A0A0A0]">Benin City, Edo State, Nigeria</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-[#25D366] bg-[#25D366]/10 px-2 py-0.5 rounded-full border border-[#25D366]/20">
            Open Today
          </span>
        </div>

        {/* Google Maps iFrame */}
        <div className="relative w-full h-[220px] bg-[#161616]">
          <iframe
            title="Eterniou Luxury Salon Map"
            src="https://maps.google.com/maps?q=Ugbor+GRA,+Benin+City,+Edo+State,+Nigeria&t=&z=14&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0 filter contrast-[1.05] grayscale-[0.1]"
            loading="lazy"
            allowFullScreen
          />
          {/* Subtle overlay badge */}
          <div className="absolute top-2 left-2 z-10 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[10px] font-medium text-white flex items-center gap-1.5 shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
            <span>Suite 4, Eterniou Luxury Pavilions</span>
          </div>
        </div>

        {/* Map Action Buttons */}
        <div className="p-3 bg-[#111111] grid grid-cols-2 gap-2">
          <a
            href={googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8922B] text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow hover:brightness-110 active:scale-98 transition-all"
          >
            <Navigation className="w-3.5 h-3.5 fill-black" />
            <span>Get Directions</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>

          <button
            onClick={() => setShowFullMapDetails(!showFullMapDetails)}
            className="py-2.5 px-3 rounded-full bg-[#1A1A1A] border border-[#2C2C2C] text-white text-xs font-semibold flex items-center justify-center gap-1.5 hover:border-[#D4AF37] transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{showFullMapDetails ? 'Hide Details' : 'View Studio Location'}</span>
          </button>
        </div>

        {/* Expandable Studio Location Details */}
        {showFullMapDetails && (
          <div className="p-3.5 bg-[#0D0D0D] border-t border-[#1F1F1F] text-xs text-[#B5B5B5] space-y-2">
            <p>
              <strong className="text-white">Full Address:</strong> Suite 4, Eterniou Luxury Pavilions, Off Adesuwa Road, Ugbor GRA, Benin City, Edo State.
            </p>
            <p>
              <strong className="text-white">Landmark:</strong> 2 minutes drive from Adesuwa Junction, direct corridor access from Sapele Road.
            </p>
            <p>
              <strong className="text-white">Parking:</strong> Dedicated VIP security personnel & gated parking inside the pavilion.
            </p>
          </div>
        )}
      </div>

      {/* STREAMLINED ELITE STUDIO STANDARDS (Sleek 2x2 Minimalist Icon Grid) */}
      <div className="space-y-2.5 mb-5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-[#F8F5F0] uppercase tracking-wider">
            Elite Studio Standards
          </h3>
          <span className="text-[10px] text-[#D4AF37] font-semibold">Zero Compromise</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {streamlinedStandards.map((std, idx) => {
            const Icon = std.icon;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#141414] border border-[#C5A059]/25 hover:border-[#D4AF37]/50 transition-all shadow-md group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-xl bg-[#1C1C1C] border border-[#2E2E2E] flex items-center justify-center text-[#D4AF37] group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-[#1A1A1A] text-[#A0A0A0] border border-[#292929]">
                      {std.badge}
                    </span>
                  </div>

                  <h4 className="font-bold text-xs text-white leading-tight">
                    {std.title}
                  </h4>
                </div>

                <p className="text-[11px] text-[#999999] mt-1.5 leading-snug">
                  {std.subtext}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Direct WhatsApp Concierge Banner */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-[#171717] via-[#141414] to-[#121212] border border-[#2A2A2A] flex items-center justify-between gap-3 shadow-lg">
        <div>
          <h4 className="text-xs font-bold text-white">Have a Bespoke Request?</h4>
          <p className="text-[11px] text-[#A0A0A0]">
            Speak with our Ugbor VIP Hair Concierge directly on WhatsApp.
          </p>
        </div>
        <button
          onClick={onOpenWhatsAppConcierge}
          className="px-4 py-2 rounded-full bg-[#25D366] text-black font-bold text-xs flex items-center gap-1.5 hover:bg-[#20ba5a] transition-colors shrink-0 shadow-md shadow-[#25D366]/20 active:scale-95"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-black" />
          <span>Chat Now</span>
        </button>
      </div>
    </section>
  );
};
