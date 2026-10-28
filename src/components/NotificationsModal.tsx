import React from 'react';
import { X, Bell, Sparkles, Zap, ShieldCheck } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPromo: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onSelectPromo,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'notif-1',
      icon: Sparkles,
      iconColor: 'text-[#D4AF37]',
      title: 'Weekend VIP Slots Just Released',
      desc: 'Master Braider Aaliyah Hale has added 2 priority afternoon slots for this Saturday in Ugbor GRA.',
      time: '15m ago',
      actionText: 'Book Slot',
      isPromo: true,
    },
    {
      id: 'notif-2',
      icon: ShieldCheck,
      iconColor: 'text-[#3B82F6]',
      title: 'Raw Human Hair Curls Restocked',
      desc: 'Authentic tangle-free Vietnamese human hair bundles in 1B and Honey Blonde have arrived for Boho Box Braids.',
      time: '2h ago',
      actionText: null,
      isPromo: false,
    },
    {
      id: 'notif-3',
      icon: Zap,
      iconColor: 'text-[#10B981]',
      title: 'Studio Power Guarantee Active',
      desc: 'Dual 25kVA silent generators and solar storage fully verified. Uninterrupted AC comfort for all clients.',
      time: 'Yesterday',
      actionText: null,
      isPromo: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl bg-[#121212] border border-[#262626] p-5 text-white shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#222] pb-3">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="font-serif-luxury font-bold text-base text-[#F8F5F0]">
              Studio VIP Updates
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#1C1C1C] flex items-center justify-center text-[#888] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List of notifications */}
        <div className="space-y-2.5 max-h-[350px] overflow-y-auto no-scrollbar">
          {notifications.map((n) => {
            const IconComp = n.icon;
            return (
              <div
                key={n.id}
                className="p-3 rounded-2xl bg-[#161616] border border-[#242424] hover:border-[#333] transition-colors"
              >
                <div className="flex items-start gap-2.5">
                  <div className="p-2 rounded-xl bg-[#0D0D0D] border border-[#202020] shrink-0 mt-0.5">
                    <IconComp className={`w-4 h-4 ${n.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold text-white truncate">{n.title}</h4>
                      <span className="text-[10px] text-[#777] shrink-0">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-[#A0A0A0] mt-1 leading-relaxed">{n.desc}</p>
                    {n.isPromo && (
                      <button
                        onClick={() => {
                          onSelectPromo();
                          onClose();
                        }}
                        className="mt-2 text-[10px] font-semibold text-black bg-[#D4AF37] px-2.5 py-1 rounded-full hover:brightness-110"
                      >
                        Book VIP Slot
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 rounded-full bg-[#1A1A1A] text-xs text-[#A0A0A0] hover:text-white"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};
