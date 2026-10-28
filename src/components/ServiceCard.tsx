import React from 'react';
import { Star, Heart, Clock } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceCardProps {
  service: ServiceItem;
  isFavorite: boolean;
  onToggleFavorite: (serviceId: string, e: React.MouseEvent) => void;
  onSelectService: (service: ServiceItem) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  isFavorite,
  onToggleFavorite,
  onSelectService,
}) => {
  const formattedPrice = `₦${service.priceNGN.toLocaleString()}`;

  return (
    <div
      onClick={() => onSelectService(service)}
      className="group relative rounded-3xl bg-[#141414] border border-[#222222] hover:border-[#D4AF37]/50 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between shadow-lg hover:shadow-xl hover:shadow-[#D4AF37]/5"
    >
      {/* Top Image Container with Badges */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1E1E1E]">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

        {/* Rating Badge */}
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 text-white text-[10px] font-semibold">
          <Star className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
          <span>{service.rating.toFixed(1)}</span>
          <span className="text-[#888]">({service.reviewsCount})</span>
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => onToggleFavorite(service.id, e)}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              isFavorite ? 'fill-[#E11D48] text-[#E11D48]' : 'text-white'
            }`}
          />
        </button>

        {/* Hair Included Banner Tag */}
        {service.hairIncluded && (
          <div className="absolute top-2.5 left-2.5">
            <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/90 text-black text-[9px] font-bold uppercase tracking-wider shadow">
              Hair Included
            </span>
          </div>
        )}
      </div>

      {/* Card Info Content */}
      <div className="p-3 flex flex-col flex-grow justify-between gap-2">
        <div>
          <div className="flex items-center gap-1 text-[11px] text-[#A0A0A0] mb-0.5">
            <span className="truncate">{service.stylist.name}</span>
            <span>·</span>
            <span className="text-[#D4AF37]">{service.category}</span>
          </div>

          <h3 className="font-semibold text-xs sm:text-sm text-[#F8F5F0] leading-snug group-hover:text-[#D4AF37] transition-colors line-clamp-1">
            {service.title}
          </h3>

          <div className="flex items-center gap-2 mt-1 text-[11px] text-[#8E8E8E]">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#A0A0A0]" />
              {service.duration}
            </span>
            <span>·</span>
            <span className="truncate">{service.location.split(',')[0]}</span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-[#1F1F1F] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#888] block">From</span>
            <span className="font-serif-luxury font-bold text-sm sm:text-base text-[#F8F5F0] tracking-tight group-hover:text-[#D4AF37] transition-colors">
              {formattedPrice}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectService(service);
            }}
            className="px-2.5 py-1.5 rounded-lg bg-[#222222] text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-semibold hover:bg-[#D4AF37] hover:text-black transition-all flex items-center gap-1"
          >
            <span>Book</span>
          </button>
        </div>
      </div>
    </div>
  );
};
