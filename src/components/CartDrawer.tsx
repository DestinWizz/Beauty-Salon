import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle, ExternalLink, Check, Copy, Sparkles, MapPin } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [copiedSuccess, setCopiedSuccess] = useState(false);
  const [clientName, setClientName] = useState('');
  const [deliveryNote, setDeliveryNote] = useState('Doorstep Delivery in Ugbor GRA');

  if (!isOpen) return null;

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotalNGN = cartItems.reduce(
    (acc, item) => acc + item.product.priceNGN * item.quantity,
    0
  );

  // Construct structured WhatsApp order string
  const itemsTextList = cartItems
    .map(
      (item) =>
        `• ${item.quantity}x ${item.product.title} (₦${(
          item.product.priceNGN * item.quantity
        ).toLocaleString()})`
    )
    .join('\n');

  const whatsappOrderMessage = `Hello Eterniou Luxury Concierge, I would like to order hair care essentials!

🛍️ ORDER ITEMS:
${itemsTextList}

💰 Total Amount: ₦${subtotalNGN.toLocaleString()}
📍 Delivery: ${deliveryNote}
👤 Client: ${clientName.trim() ? clientName.trim() : 'VIP Client'}
⚡ Corridor: Ugbor GRA / Adesuwa Corridor, Benin City`;

  const encodedWhatsAppURL = `https://wa.me/2348030000000?text=${encodeURIComponent(
    whatsappOrderMessage
  )}`;

  const handleCopyOrderText = () => {
    navigator.clipboard.writeText(whatsappOrderMessage);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm transition-opacity duration-300">
      {/* Background tap to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-out Drawer Panel */}
      <div className="relative w-full max-w-md h-full bg-[#0E0E0E] text-[#F8F5F0] border-l border-[#262626] shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="px-5 py-4 bg-[#121212] border-b border-[#222222] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif-luxury font-bold text-base text-white">
                Maintenance Bag
              </h3>
              <span className="text-[11px] text-[#A0A0A0]">
                {totalItemsCount} item{totalItemsCount === 1 ? '' : 's'} selected
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-[11px] text-[#888888] hover:text-[#E11D48] transition-colors"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#1C1C1C] border border-[#2B2B2B] flex items-center justify-center text-[#A0A0A0] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Drawer Body: Cart Items List */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 no-scrollbar">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 rounded-full bg-[#161616] border border-[#2A2A2A] flex items-center justify-center mx-auto mb-3 text-[#D4AF37]">
                <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h4 className="font-semibold text-sm text-white mb-1">Your bag is empty</h4>
              <p className="text-xs text-[#888888] max-w-xs mx-auto mb-5 leading-relaxed">
                Add our luxury Argan Silk Oil, Edge Control Pomade, or Mulberry Silk Bonnet to maintain salon-fresh braids.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38F2B] text-black font-bold text-xs shadow-md shadow-[#D4AF37]/20"
              >
                Explore Hair Care Essentials
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3 rounded-2xl bg-[#141414] border border-[#C5A059]/20 flex items-center gap-3 transition-colors hover:border-[#C5A059]/40"
                >
                  {/* Thumbnail */}
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#0A0A0A] border border-[#222222] shrink-0 p-1 flex items-center justify-center">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-xs text-white truncate">
                      {item.product.title}
                    </h4>
                    <p className="text-[10px] text-[#A0A0A0] truncate">
                      {item.product.volumeOrSize}
                    </p>
                    <span className="font-serif-luxury font-bold text-xs text-[#D4AF37] block mt-0.5">
                      ₦{item.product.priceNGN.toLocaleString()}
                    </span>
                  </div>

                  {/* Quantity adjustment controls */}
                  <div className="flex items-center gap-1.5 bg-[#0D0D0D] border border-[#262626] rounded-full p-1 shrink-0">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, -1)}
                      aria-label="Decrease quantity"
                      className="w-6 h-6 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#B0B0B0] hover:text-white active:scale-90 transition-transform"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center text-xs font-bold text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, 1)}
                      aria-label="Increase quantity"
                      className="w-6 h-6 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#B0B0B0] hover:text-white active:scale-90 transition-transform"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    aria-label={`Remove ${item.product.title}`}
                    className="p-1.5 text-[#666666] hover:text-[#E11D48] transition-colors shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {/* Delivery / Pickup Preferences */}
              <div className="p-3 rounded-2xl bg-[#141414] border border-[#222222] space-y-2 mt-2">
                <span className="text-[11px] font-semibold text-white block">
                  Delivery Details
                </span>
                <input
                  type="text"
                  placeholder="Your Name (Optional)"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0A0A0A] border border-[#282828] text-xs text-white placeholder-[#666] focus:outline-none focus:border-[#D4AF37]"
                />
                <select
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0A0A0A] border border-[#282828] text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="Doorstep Delivery in Ugbor GRA">Doorstep Delivery (Ugbor GRA)</option>
                  <option value="Doorstep Delivery in Adesuwa Road">Doorstep Delivery (Adesuwa Road)</option>
                  <option value="Doorstep Delivery in Sapele Road / GRA">Doorstep Delivery (Sapele Road / GRA)</option>
                  <option value="Pickup at Eterniou Studio Suite 4">Pickup at Studio Suite 4</option>
                </select>
                <div className="flex items-center gap-1.5 text-[10px] text-[#A0A0A0] pt-0.5">
                  <MapPin className="w-3 h-3 text-[#D4AF37] shrink-0" />
                  <span>Same-day dispatched from Ugbor GRA Studio</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer: Subtotal & WhatsApp Checkout */}
        {cartItems.length > 0 && (
          <div className="p-5 bg-[#121212] border-t border-[#222222] space-y-3">
            <div className="space-y-1.5 text-xs text-[#A0A0A0]">
              <div className="flex justify-between">
                <span>Subtotal ({totalItemsCount} items)</span>
                <span className="text-white font-medium">
                  ₦{subtotalNGN.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span>Corridor Dispatch</span>
                <span className="text-[#34D399] font-medium">VIP Express Available</span>
              </div>
              <div className="pt-2 border-t border-[#222222] flex justify-between items-center text-sm">
                <span className="font-semibold text-white">Estimated Total</span>
                <span className="font-serif-luxury font-bold text-lg text-[#D4AF37]">
                  ₦{subtotalNGN.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Primary Action: Confirm Order via WhatsApp Concierge */}
            <div className="space-y-2">
              <a
                href={encodedWhatsAppURL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-full bg-[#25D366] text-black font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#20ba5a] transition-all shadow-lg shadow-[#25D366]/20 active:scale-98"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                <span>Confirm Order via WhatsApp Concierge</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyOrderText}
                  className="flex-1 py-2 px-3 rounded-full bg-[#1C1C1C] border border-[#2E2E2E] text-xs text-[#B0B0B0] hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copiedSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#34D399]" />
                      <span className="text-[#34D399]">Order Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Order Text</span>
                    </>
                  )}
                </button>

                <button
                  onClick={onClose}
                  className="flex-1 py-2 px-3 rounded-full bg-[#161616] border border-[#2E2E2E] text-xs text-[#888888] hover:text-white text-center"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
