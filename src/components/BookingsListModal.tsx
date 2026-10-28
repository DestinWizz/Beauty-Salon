import React from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle2, MessageCircle, ExternalLink, ArrowRight } from 'lucide-react';
import { BookingDetails } from '../types';

interface BookingsListModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: BookingDetails[];
  onExploreStyles: () => void;
}

export const BookingsListModal: React.FC<BookingsListModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onExploreStyles,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-[#121212] border border-[#262626] p-5 text-white shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#222] pb-3 mb-4">
          <div>
            <h3 className="font-serif-luxury font-bold text-lg text-[#F8F5F0]">
              My VIP Bookings
            </h3>
            <span className="text-[11px] text-[#A0A0A0]">
              {bookings.length} Confirmed Appointment{bookings.length === 1 ? '' : 's'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#1C1C1C] flex items-center justify-center text-[#888] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List of Bookings */}
        <div className="flex-1 overflow-y-auto space-y-3 no-scrollbar pr-1">
          {bookings.length === 0 ? (
            <div className="text-center py-10 px-4">
              <div className="w-12 h-12 rounded-full bg-[#1C1C1C] border border-[#2E2E2E] flex items-center justify-center mx-auto mb-3 text-[#D4AF37]">
                <Calendar className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-sm text-white mb-1">No Active Bookings Yet</h4>
              <p className="text-xs text-[#888] max-w-xs mx-auto mb-4">
                Browse our curated hairstyles, choose your preferred braider, and reserve your seat with transparent 30% deposit.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExploreStyles();
                }}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8922B] text-black font-bold text-xs"
              >
                Browse Curated Styles
              </button>
            </div>
          ) : (
            bookings.map((b) => {
              const whatsappChat = `https://wa.me/2348030000000?text=${encodeURIComponent(
                `Hello Eterniou Concierge, I am inquiring about my booking ${b.bookingRef} for ${b.service.title} on ${b.date} at ${b.timeSlot}.`
              )}`;

              return (
                <div
                  key={b.bookingRef}
                  className="p-4 rounded-2xl bg-[#161616] border border-[#262626] space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/30">
                          #{b.bookingRef}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-[#34D399] font-semibold">
                          <CheckCircle2 className="w-3 h-3" />
                          Seat Reserved
                        </span>
                      </div>
                      <h4 className="font-semibold text-sm text-white mt-1.5">
                        {b.service.title}
                      </h4>
                      <p className="text-xs text-[#A0A0A0]">
                        Stylist: <span className="text-white font-medium">{b.service.stylist.name}</span>
                      </p>
                    </div>

                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#333] shrink-0">
                      <img
                        src={b.service.image}
                        alt={b.service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#0F0F0F] border border-[#202020] grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-[#DCDCDC]">
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{b.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#DCDCDC]">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{b.timeSlot}</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-1.5 text-[11px] text-[#888]">
                      <MapPin className="w-3 h-3 text-[#D4AF37]" />
                      <span>Ugbor GRA Studio Suite A, Benin City</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-[#222]">
                    <div>
                      <span className="text-[10px] text-[#777] block">Total Amount</span>
                      <span className="font-serif-luxury font-bold text-sm text-[#D4AF37]">
                        ₦{b.totalPriceNGN.toLocaleString()}
                      </span>
                    </div>
                    <a
                      href={whatsappChat}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-full bg-[#25D366] text-black font-semibold text-xs flex items-center gap-1.5 hover:bg-[#20ba5a] transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-black" />
                      <span>Concierge Chat</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 mt-3 rounded-full bg-[#1A1A1A] text-xs text-[#A0A0A0] hover:text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
};
