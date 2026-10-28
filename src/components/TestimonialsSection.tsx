import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, MapPin, CheckCircle2 } from 'lucide-react';
import { LOCAL_REVIEWS } from '../data/servicesData';

interface TestimonialsSectionProps {
  onOpenWhatsAppConcierge: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? LOCAL_REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === LOCAL_REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const activeReview = LOCAL_REVIEWS[currentIndex];

  return (
    <section className="px-5 py-8 border-t border-[#1C1C1C] bg-[#0A0A0A]">
      {/* Header matching inspo2 client love layout */}
      <div className="text-center mb-6">
        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#D4AF37] block mb-1">
          CLIENT LOVE
        </span>
        <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#F8F5F0]">
          What Our Clients Say
        </h2>
        <div className="w-10 h-[2px] bg-gradient-to-r from-[#D4AF37] to-[#8C6D23] mx-auto mt-2 rounded-full" />
      </div>

      {/* Testimonials Carousel Wrapper with Left & Right Arrows */}
      <div className="relative">
        {/* Navigation Arrows */}
        <button
          onClick={prevReview}
          aria-label="Previous testimonial"
          className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-[#181818]/90 border border-[#333333] text-white flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all shadow-lg active:scale-90"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={nextReview}
          aria-label="Next testimonial"
          className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-[#181818]/90 border border-[#333333] text-white flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all shadow-lg active:scale-90"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Active Testimonial Card */}
        <div className="mx-6 rounded-3xl bg-[#141414] border border-[#262626] p-5 shadow-xl transition-all duration-300">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            {/* Circular High-End Client Profile Avatar Photo */}
            <div className="relative shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-lg shadow-[#D4AF37]/15">
                <img
                  src={activeReview.avatar}
                  alt={activeReview.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#10B981] border-2 border-[#141414] flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            {/* Testimonial Content & Rating */}
            <div className="flex-1 text-center sm:text-left">
              {/* Crisp 5-star gold rating badge */}
              <div className="flex items-center justify-center sm:justify-start gap-1 mb-2">
                {[...Array(activeReview.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                ))}
                <span className="text-[10px] text-[#A0A0A0] ml-1.5 font-medium">5.0 Verified</span>
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-[#DCDCDC] leading-relaxed italic mb-3">
                "{activeReview.text}"
              </p>

              {/* Client Name & Local Corridor */}
              <div className="pt-2 border-t border-[#222222] flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                <div>
                  <span className="font-semibold text-white tracking-wide">
                    — {activeReview.name}
                  </span>
                  <span className="text-[11px] text-[#D4AF37] flex items-center justify-center sm:justify-start gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#D4AF37]" />
                    {activeReview.corridor}
                  </span>
                </div>
                <span className="text-[10px] text-[#777777]">
                  Style: {activeReview.service}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-4">
          {LOCAL_REVIEWS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                currentIndex === idx
                  ? 'w-6 bg-[#D4AF37]'
                  : 'w-1.5 bg-[#333333] hover:bg-[#555555]'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
