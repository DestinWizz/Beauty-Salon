import React from 'react';
import { X, Shield, FileText } from 'lucide-react';

export interface PolicyData {
  title: string;
  tagline: string;
  sections: { heading: string; body: string }[];
}

interface PolicyModalProps {
  policy: PolicyData | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ policy, onClose }) => {
  if (!policy) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-[#121212] text-[#F8F5F0] border border-[#C5A059]/40 rounded-3xl p-5 shadow-2xl z-10 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#222222] pb-3 mb-3 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <FileText className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="font-serif-luxury font-bold text-base text-white">
                {policy.title}
              </h3>
              <p className="text-[10px] text-[#A0A0A0]">{policy.tagline}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close policy modal"
            className="w-7 h-7 rounded-full bg-[#1C1C1C] border border-[#2B2B2B] flex items-center justify-center text-[#A0A0A0] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 no-scrollbar text-xs text-[#B5B5B5] leading-relaxed">
          {policy.sections.map((sec, idx) => (
            <div key={idx} className="p-3 rounded-2xl bg-[#161616] border border-[#242424] space-y-1">
              <h4 className="font-semibold text-white text-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                {sec.heading}
              </h4>
              <p className="text-[11px] text-[#9E9E9E] leading-normal">{sec.body}</p>
            </div>
          ))}

          <div className="p-2.5 rounded-xl bg-[#0D0D0D] border border-[#1F1F1F] text-[10px] text-[#737373] text-center">
            Studio Location: Suite 4, Eterniou Luxury Pavilions, Ugbor GRA, Benin City.
          </div>
        </div>

        {/* Dismiss Button */}
        <div className="pt-3 border-t border-[#222222] mt-2 shrink-0">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-full bg-[#1C1C1C] hover:bg-[#252525] text-xs font-semibold text-white transition-colors"
          >
            I Understand & Close
          </button>
        </div>
      </div>
    </div>
  );
};
