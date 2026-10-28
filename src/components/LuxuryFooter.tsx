import React from 'react';
import { MapPin, Clock, ShieldCheck, MessageCircle, Instagram } from 'lucide-react';
import { PolicyData } from './PolicyModal';

interface LuxuryFooterProps {
  onOpenPolicy: (policy: PolicyData) => void;
  onOpenWhatsAppConcierge: () => void;
}

export const POLICIES: Record<string, PolicyData> = {
  terms: {
    title: 'Terms & Booking Conditions',
    tagline: 'Standard Client Agreement for Studio Appointments',
    sections: [
      {
        heading: 'Punctuality Guarantee',
        body: 'To protect your dedicated appointment time and respect other VIP clients, please arrive promptly at your scheduled start time. A grace period of 15 minutes is observed before a reschedule notice may apply.',
      },
      {
        heading: 'Hair Preparation & Condition',
        body: 'Hair should be washed, detangled, and thoroughly blow-dried before your appointment, unless an organic scalp detox and wash add-on is explicitly included in your booking.',
      },
      {
        heading: 'VIP Suite Amenities',
        body: 'Clients enjoy complimentary chilled Chapman, Italian espresso, and Starlink Wi-Fi. Personal belongings remain secure within our private gated perimeter.',
      },
    ],
  },
  deposit: {
    title: 'Deposit Policy',
    tagline: 'Transparent 30% Booking Commitment',
    sections: [
      {
        heading: 'Why We Require 30%',
        body: 'Your 30% deposit guarantees your master braider’s uninterrupted focus and reserves your private AC chair without queue overlap.',
      },
      {
        heading: 'Rescheduling Window',
        body: 'You may reschedule your appointment up to 24 hours prior to your scheduled time without losing your deposit. The credit transfers seamlessly to your new preferred date.',
      },
      {
        heading: 'Balance Settlement',
        body: 'The remaining 70% balance is payable upon complete satisfaction at our Ugbor GRA studio via bank transfer or POS.',
      },
    ],
  },
  returns: {
    title: 'Return & Exchange Policy',
    tagline: 'Product & Hair Care Satisfaction Protocol',
    sections: [
      {
        heading: 'Product Guarantee',
        body: 'Unopened hair care items (Argan Silk Growth Oil, Edge Control Pomade, and Deep Repair Masks) with safety seals intact may be exchanged within 7 days of delivery.',
      },
      {
        heading: 'Hygiene & Satin Bonnets',
        body: 'Due to strict hygiene standards, satin bonnets and custom human hair curl blends cannot be returned once unsealed or worn.',
      },
      {
        heading: 'Damaged in Transit',
        body: 'If any bottle or jar arrives damaged, our concierge will dispatch an instant replacement to your Ugbor address on the same business day.',
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    tagline: 'High-Discretion VIP Client Confidentiality',
    sections: [
      {
        heading: 'Data Discretion',
        body: 'We collect your name and WhatsApp contact purely to coordinate your appointment, confirm door codes, and provide delivery dispatch notes.',
      },
      {
        heading: 'Zero Third-Party Sharing',
        body: 'Your contact details are never sold, rented, or distributed to advertising networks. All communication remains strictly between you and our Ugbor concierge team.',
      },
      {
        heading: 'Photo Consents',
        body: 'Style showcase photos are only captured and shared with your explicit verbal permission.',
      },
    ],
  },
};

export const LuxuryFooter: React.FC<LuxuryFooterProps> = ({
  onOpenPolicy,
  onOpenWhatsAppConcierge,
}) => {
  return (
    <footer className="w-full bg-[#121212] border-t border-[#1F1F1F] text-[#F8F5F0] px-5 pt-8 pb-10">
      <div className="space-y-6">
        {/* Brand & Studio Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-serif-luxury italic text-xl font-bold text-[#D4AF37]">
              Eterniou
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#A0A0A0] px-2 py-0.5 rounded border border-[#2A2A2A] bg-[#181818]">
              LUXURY CONCIERGE
            </span>
          </div>

          <p className="text-xs text-[#C0C0C0] flex items-center gap-1.5 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span>Ugbor GRA & Adesuwa Corridor, Benin City, Edo State</span>
          </p>
        </div>

        {/* Operating Hours Card */}
        <div className="p-3.5 rounded-2xl bg-[#0D0D0D] border border-[#222222] space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Studio Operating Hours</span>
          </div>
          <p className="text-[11px] text-[#A0A0A0]">
            Mon – Sat: <span className="text-white font-medium">8:00 AM – 7:00 PM</span> | Sun:{' '}
            <span className="text-[#D4AF37] font-medium">VIP By Appointment</span>
          </p>
        </div>

        {/* Client Care & Policies (Clickable Modal Triggers) */}
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#888888] block">
            Client Care & Studio Policies
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => onOpenPolicy(POLICIES.terms)}
              className="p-2.5 rounded-xl bg-[#181818] border border-[#282828] text-left text-[#DCDCDC] hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-colors"
            >
              Terms & Booking
            </button>
            <button
              onClick={() => onOpenPolicy(POLICIES.deposit)}
              className="p-2.5 rounded-xl bg-[#181818] border border-[#282828] text-left text-[#DCDCDC] hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-colors"
            >
              Deposit Policy (30%)
            </button>
            <button
              onClick={() => onOpenPolicy(POLICIES.returns)}
              className="p-2.5 rounded-xl bg-[#181818] border border-[#282828] text-left text-[#DCDCDC] hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-colors"
            >
              Return & Exchange
            </button>
            <button
              onClick={() => onOpenPolicy(POLICIES.privacy)}
              className="p-2.5 rounded-xl bg-[#181818] border border-[#282828] text-left text-[#DCDCDC] hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-colors"
            >
              Privacy Policy
            </button>
          </div>
        </div>

        {/* Quick Concierge Links & Copyright */}
        <div className="pt-4 border-t border-[#1C1C1C] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#737373]">
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenWhatsAppConcierge}
              className="flex items-center gap-1.5 text-[#25D366] hover:underline"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Direct WhatsApp Desk</span>
            </button>
            <span>·</span>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#E11D48] hover:underline"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>@eterniouluxury</span>
            </a>
          </div>

          <p>© 2026 Eterniou Luxury. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
