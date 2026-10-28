import React, { useState } from 'react';
import {
  X,
  ArrowLeft,
  Heart,
  Star,
  CheckCircle,
  ShieldCheck,
  Lock,
  Sparkles,
  Clock,
  MapPin,
  MessageCircle,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import { ServiceItem, BookingDetails } from '../types';

interface BookingModalProps {
  service: ServiceItem | null;
  isFavorite: boolean;
  onToggleFavorite: (serviceId: string, e: React.MouseEvent) => void;
  onClose: () => void;
  onBookingConfirmed: (booking: BookingDetails) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  service,
  isFavorite,
  onToggleFavorite,
  onClose,
  onBookingConfirmed,
}) => {
  if (!service) return null;

  // Next 7 dynamic days starting from current date
  const generateDates = () => {
    const dates = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push({
        fullDate: d.toISOString().split('T')[0],
        dayName: dayNames[d.getDay()],
        dayNum: d.getDate(),
        month: d.toLocaleString('en-US', { month: 'short' }),
      });
    }
    return dates;
  };

  const datesList = generateDates();

  const [selectedDateIndex, setSelectedDateIndex] = useState(1);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('1:30 PM');
  const [selectedLength, setSelectedLength] = useState<'Mid-Back' | 'Waist-Length' | 'Butt-Length'>('Waist-Length');
  const [selectedColor, setSelectedColor] = useState('#1B Natural Black');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['Scalp Spa & Steam']);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [showSuccessReceipt, setShowSuccessReceipt] = useState(false);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  // Pricing calculations purely in Naira
  const lengthAddonNGN = selectedLength === 'Waist-Length' ? 5000 : selectedLength === 'Butt-Length' ? 10000 : 0;

  const addonPricesNGN: Record<string, number> = {
    'Scalp Spa & Steam': 6000,
    'Ozone Scalp Therapy': 3500,
    'Edge Care Butter': 2500,
  };

  const addonsTotalNGN = selectedAddons.reduce((acc, curr) => acc + (addonPricesNGN[curr] || 0), 0);
  const totalNGN = service.priceNGN + lengthAddonNGN + addonsTotalNGN;
  const depositNGN = Math.round(totalNGN * (service.depositPercentage / 100));

  const availableSlots = [
    { time: '10:00 AM', status: 'Available' },
    { time: '1:30 PM', status: 'Popular' },
    { time: '4:00 PM', status: 'Last 1 Slot' },
    { time: '6:30 PM', status: 'VIP Evening' },
  ];

  const selectedDateObj = datesList[selectedDateIndex];
  const dateFormatted = `${selectedDateObj.dayName} ${selectedDateObj.dayNum} ${selectedDateObj.month}`;

  // WhatsApp concierge message builder
  const bookingRef = `ETR-${Math.floor(100000 + Math.random() * 900000)}`;
  const whatsappMessage = `Hello Eterniou Luxury Concierge, I would like to book an appointment!
✨ Service: ${service.title}
💇 Stylist: ${service.stylist.name} (${service.stylist.experience})
📅 Date: ${dateFormatted} at ${selectedTimeSlot}
📏 Length: ${selectedLength}
🎨 Hair Color: ${selectedColor}
💆 Add-ons: ${selectedAddons.length > 0 ? selectedAddons.join(', ') : 'None'}
💰 Total Price: ₦${totalNGN.toLocaleString()}
🔒 30% Deposit: ₦${depositNGN.toLocaleString()}
📍 Location: Ugbor GRA / Adesuwa Corridor, Benin City
👤 Client: ${clientName || 'Guest Client'} (${clientPhone || 'No Phone provided'})
Ref: ${bookingRef}`;

  const encodedWhatsAppURL = `https://wa.me/2348030000000?text=${encodeURIComponent(whatsappMessage)}`;

  const handleConfirmBooking = () => {
    const bookingDetails: BookingDetails = {
      service,
      date: dateFormatted,
      timeSlot: selectedTimeSlot,
      hairLength: selectedLength,
      hairColor: selectedColor,
      hairLengthAddonPrice: lengthAddonNGN,
      addons: selectedAddons,
      addonsTotal: addonsTotalNGN,
      totalPriceNGN: totalNGN,
      clientName: clientName || 'Valued VIP Client',
      clientPhone: clientPhone || '+234...',
      clientNotes: '',
      bookingRef,
      createdAt: new Date().toLocaleDateString(),
    };

    onBookingConfirmed(bookingDetails);
    setShowSuccessReceipt(true);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(whatsappMessage);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  const toggleAddon = (addon: string) => {
    if (selectedAddons.includes(addon)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== addon));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg min-h-screen sm:min-h-0 sm:max-h-[92vh] bg-[#0E0E0E] text-[#F8F5F0] border-0 sm:border border-[#282828] sm:rounded-3xl flex flex-col overflow-hidden shadow-2xl">
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-5 py-3.5 bg-[#0E0E0E]/95 backdrop-blur-md border-b border-[#202020]">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#A0A0A0] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Service Booking</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => onToggleFavorite(service.id, e)}
              className="w-8 h-8 rounded-full bg-[#1A1A1A] border border-[#2B2B2B] flex items-center justify-center hover:scale-105 transition-transform"
            >
              <Heart
                className={`w-4 h-4 ${
                  isFavorite ? 'fill-[#E11D48] text-[#E11D48]' : 'text-white'
                }`}
              />
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#1A1A1A] border border-[#2B2B2B] flex items-center justify-center text-[#A0A0A0] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 no-scrollbar">
          {/* Main Editorial Style Visual Frame */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-[#1A1A1A] border border-[#252525] shadow-lg">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20" />

            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#D4AF37] bg-black/60 px-2 py-0.5 rounded-full border border-[#D4AF37]/30 backdrop-blur-sm">
                  {service.category} Signature
                </span>
                <p className="text-xs text-[#E5E5E5] mt-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Est. Duration: {service.duration}</span>
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-[#A0A0A0] block">Starting at</span>
                <span className="font-serif-luxury text-xl font-bold text-[#F8F5F0]">
                  ₦{service.priceNGN.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Service Title & Rating info */}
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#F8F5F0]">
                {service.title}
              </h2>
              <CheckCircle className="w-5 h-5 text-[#3B82F6] shrink-0 fill-[#3B82F6]/20" />
            </div>

            <div className="flex items-center gap-2 mt-1.5 text-xs text-[#A3A3A3]">
              <span className="flex items-center gap-1 text-[#F8F5F0] font-semibold">
                <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                {service.rating}
              </span>
              <span>({service.reviewsCount} verified reviews)</span>
              <span>·</span>
              <span className="text-[#D4AF37] flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {service.location}
              </span>
            </div>
          </div>

          {/* Three High-End Service Highlights Badges matching inspo */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2.5 rounded-xl bg-[#151515] border border-[#262626] text-center">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] mx-auto mb-1" />
              <span className="text-[10px] font-semibold text-[#E0E0E0] block">Master Braider</span>
              <span className="text-[9px] text-[#777]">Certified Artist</span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#151515] border border-[#262626] text-center">
              <Sparkles className="w-4 h-4 text-[#D4AF37] mx-auto mb-1" />
              <span className="text-[10px] font-semibold text-[#E0E0E0] block">
                {service.hairIncluded ? 'Hair Included' : 'Hair Optional'}
              </span>
              <span className="text-[9px] text-[#777]">Pre-stretched & Sanitized</span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#151515] border border-[#262626] text-center">
              <Lock className="w-4 h-4 text-[#D4AF37] mx-auto mb-1" />
              <span className="text-[10px] font-semibold text-[#E0E0E0] block">30% Deposit</span>
              <span className="text-[9px] text-[#777]">Guaranteed Seat</span>
            </div>
          </div>

          {/* Stylist Profile Integration Card */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#171717] to-[#121212] border border-[#262626]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#D4AF37] shrink-0">
                <img
                  src={service.stylist.avatar}
                  alt={service.stylist.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm text-[#F8F5F0] truncate">
                    {service.stylist.name}
                  </h4>
                  <span className="text-[10px] font-medium text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded-full border border-[#D4AF37]/30">
                    {service.stylist.experience}
                  </span>
                </div>
                <p className="text-[11px] text-[#A0A0A0] truncate">{service.stylist.title}</p>
                <p className="text-[10px] text-[#737373] mt-0.5 line-clamp-2">
                  {service.stylist.bio}
                </p>
              </div>
            </div>
          </div>

          {/* Customization: Hair Length & Color */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-[#DCDCDC] block mb-1.5">
                Choose Hair Length
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'Mid-Back', label: 'Mid-Back', price: '+₦0' },
                  { id: 'Waist-Length', label: 'Waist-Length', price: '+₦5,000' },
                  { id: 'Butt-Length', label: 'Butt-Length', price: '+₦10,000' },
                ].map((len) => (
                  <button
                    key={len.id}
                    onClick={() => setSelectedLength(len.id as any)}
                    className={`py-2 px-2 rounded-xl text-xs text-center border transition-all ${
                      selectedLength === len.id
                        ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37] font-semibold'
                        : 'bg-[#141414] border-[#222] text-[#A0A0A0] hover:border-[#333]'
                    }`}
                  >
                    <div>{len.label}</div>
                    <div className="text-[10px] opacity-75">{len.price}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#DCDCDC] block mb-1.5">
                Extension Hair Color
              </label>
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                {[
                  '#1 Jet Black',
                  '#1B Natural Black',
                  '#2 Dark Chocolate',
                  '#27 Honey Blonde',
                  '#30 Warm Auburn',
                  '#Burgundy Wine',
                ].map((col) => (
                  <button
                    key={col}
                    onClick={() => setSelectedColor(col)}
                    className={`px-3 py-1.5 rounded-full text-[11px] whitespace-nowrap border transition-all ${
                      selectedColor === col
                        ? 'bg-[#F8F5F0] text-black border-white font-semibold'
                        : 'bg-[#141414] text-[#A0A0A0] border-[#252525] hover:border-[#444]'
                    }`}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>

            {/* Optional VIP Scalp Add-ons */}
            <div>
              <label className="text-xs font-semibold text-[#DCDCDC] block mb-1.5">
                VIP Scalp Care Add-ons
              </label>
              <div className="space-y-1.5">
                {[
                  {
                    id: 'Scalp Spa & Steam',
                    desc: 'Ozone steam detox wash & deep conditioning',
                    price: '+₦6,000',
                  },
                  {
                    id: 'Ozone Scalp Therapy',
                    desc: 'Anti-itch peppermint stimulation for hair growth',
                    price: '+₦3,500',
                  },
                  {
                    id: 'Edge Care Butter',
                    desc: 'Organic chebe edge growth treatment butter',
                    price: '+₦2,500',
                  },
                ].map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition-all ${
                        isChecked
                          ? 'bg-[#1A1A1A] border-[#D4AF37]/60'
                          : 'bg-[#121212] border-[#222222] hover:border-[#333]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                            isChecked
                              ? 'bg-[#D4AF37] border-[#D4AF37] text-black'
                              : 'border-[#555] bg-transparent'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div>
                          <span className="text-xs font-medium text-[#F8F5F0] block">
                            {addon.id}
                          </span>
                          <span className="text-[10px] text-[#777]">{addon.desc}</span>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-[#D4AF37]">{addon.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Date Picker Section matching main-inspo.webp */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#F8F5F0]">Select Date & Time</span>
              <span className="text-[11px] text-[#A0A0A0]">{selectedDateObj.month} 2026</span>
            </div>

            {/* Horizontal Calendar Picker */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {datesList.map((d, index) => {
                const isSelected = selectedDateIndex === index;
                return (
                  <button
                    key={d.fullDate}
                    onClick={() => setSelectedDateIndex(index)}
                    className={`flex-1 min-w-[54px] py-2.5 rounded-2xl flex flex-col items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-gradient-to-b from-[#D4AF37] to-[#B8922B] text-black font-bold shadow-lg shadow-[#D4AF37]/25 scale-105'
                        : 'bg-[#151515] border border-[#222222] text-[#A0A0A0] hover:border-[#383838] hover:text-white'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-medium">{d.dayName}</span>
                    <span className="text-base font-bold my-0.5">{d.dayNum}</span>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black"></span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slot Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#DCDCDC]">Available Slots</span>
              <span className="text-[10px] text-[#D4AF37]">3 remaining today</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {availableSlots.map((slot) => {
                const isSelected = selectedTimeSlot === slot.time;
                return (
                  <button
                    key={slot.time}
                    onClick={() => setSelectedTimeSlot(slot.time)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38F2B] text-black font-bold border-[#D4AF37] shadow-md shadow-[#D4AF37]/20'
                        : 'bg-[#141414] border-[#222222] text-[#DCDCDC] hover:border-[#333]'
                    }`}
                  >
                    <span className="text-xs block">{slot.time}</span>
                    <span
                      className={`text-[9px] block mt-0.5 ${
                        isSelected ? 'text-black/80 font-semibold' : 'text-[#777]'
                      }`}
                    >
                      {slot.status}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Client Details input */}
          <div className="p-3.5 rounded-2xl bg-[#141414] border border-[#222222] space-y-2.5">
            <span className="text-xs font-semibold text-[#F8F5F0] block">
              VIP Contact Information
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Full Name (e.g. Osasere)"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#0A0A0A] border border-[#282828] text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#D4AF37]"
              />
              <input
                type="tel"
                placeholder="WhatsApp Phone (e.g. 0803...)"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#0A0A0A] border border-[#282828] text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <p className="text-[10px] text-[#777] flex items-center gap-1">
              <Info className="w-3 h-3 text-[#D4AF37]" />
              Zero DM back-and-forth. Pre-fills instantly to lock your slot with our concierge.
            </p>
          </div>

          {/* Pricing Summary */}
          <div className="p-3.5 rounded-2xl bg-[#121212] border border-[#222222] space-y-1.5 text-xs text-[#A0A0A0]">
            <div className="flex justify-between">
              <span>Base Style ({service.title})</span>
              <span className="text-white font-medium">
                ₦{service.priceNGN.toLocaleString()}
              </span>
            </div>
            {lengthAddonNGN > 0 && (
              <div className="flex justify-between">
                <span>Length Upgrade ({selectedLength})</span>
                <span className="text-white font-medium">
                  +₦{lengthAddonNGN.toLocaleString()}
                </span>
              </div>
            )}
            {addonsTotalNGN > 0 && (
              <div className="flex justify-between">
                <span>Scalp Care Add-ons</span>
                <span className="text-white font-medium">
                  +₦{addonsTotalNGN.toLocaleString()}
                </span>
              </div>
            )}
            <div className="pt-2 border-t border-[#222222] flex justify-between items-center text-sm">
              <span className="font-semibold text-white">Total Amount</span>
              <span className="font-serif-luxury font-bold text-base text-[#D4AF37]">
                ₦{totalNGN.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center text-[11px] text-[#888]">
              <span>30% Deposit to Lock Seat</span>
              <span className="text-[#34D399] font-semibold">
                ₦{depositNGN.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Sticky Bottom CTA Bar */}
        <div className="sticky bottom-0 z-20 px-5 py-3.5 bg-[#0E0E0E]/95 backdrop-blur-md border-t border-[#202020] flex items-center gap-3">
          <div className="shrink-0">
            <span className="text-[10px] text-[#888] block">Deposit (30%)</span>
            <span className="font-serif-luxury font-bold text-base text-[#D4AF37]">
              ₦{depositNGN.toLocaleString()}
            </span>
          </div>

          <button
            onClick={handleConfirmBooking}
            className="flex-1 py-3 px-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#B38F2B] text-black font-bold text-xs hover:brightness-110 active:scale-98 transition-all shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2"
          >
            <span>Confirm & WhatsApp Concierge</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Success Confirmation Modal Overlay */}
        {showSuccessReceipt && (
          <div className="absolute inset-0 z-30 bg-[#0A0A0A]/95 backdrop-blur-md flex flex-col justify-between p-6">
            <div className="text-center pt-4">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center mx-auto mb-3 shadow-xl shadow-[#D4AF37]/15">
                <CheckCircle className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                Slot Reserved
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold text-white mt-1">
                Booking Reference #{bookingRef}
              </h3>
              <p className="text-xs text-[#A0A0A0] mt-1 max-w-sm mx-auto">
                Your luxury appointment is pre-booked for <strong className="text-white">{dateFormatted} at {selectedTimeSlot}</strong> with <strong className="text-[#D4AF37]">{service.stylist.name}</strong>.
              </p>
            </div>

            {/* Quick Summary Box */}
            <div className="p-4 rounded-2xl bg-[#141414] border border-[#252525] space-y-2 text-xs">
              <div className="flex justify-between border-b border-[#222] pb-1.5">
                <span className="text-[#888]">Service:</span>
                <span className="font-semibold text-white">{service.title}</span>
              </div>
              <div className="flex justify-between border-b border-[#222] pb-1.5">
                <span className="text-[#888]">Location:</span>
                <span className="text-white">Ugbor GRA Studio, Benin City</span>
              </div>
              <div className="flex justify-between border-b border-[#222] pb-1.5">
                <span className="text-[#888]">Hair Details:</span>
                <span className="text-white">{selectedLength} · {selectedColor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#888]">Total / 30% Deposit:</span>
                <span className="text-[#D4AF37] font-bold">
                  ₦{totalNGN.toLocaleString()} (Dep: ₦{depositNGN.toLocaleString()})
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2 pb-2">
              <a
                href={encodedWhatsAppURL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-full bg-[#25D366] text-black font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#20ba5a] transition-colors shadow-lg shadow-[#25D366]/20"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                <span>Open in WhatsApp Concierge Now</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleCopyMessage}
                className="w-full py-2.5 px-4 rounded-full bg-[#1A1A1A] border border-[#333] text-xs text-[#DCDCDC] hover:text-white flex items-center justify-center gap-2"
              >
                {copiedSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#34D399]" />
                    <span className="text-[#34D399]">Booking Message Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Booking Text</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setShowSuccessReceipt(false);
                  onClose();
                }}
                className="w-full py-2 text-xs text-[#888] hover:text-white transition-colors"
              >
                Done / Back to Explore
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
