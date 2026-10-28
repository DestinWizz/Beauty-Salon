import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoryPills } from './components/CategoryPills';
import { ServiceCard } from './components/ServiceCard';
import { ProductsSection } from './components/ProductsSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { PolicyModal, PolicyData } from './components/PolicyModal';
import { LuxuryFooter } from './components/LuxuryFooter';
import { CartDrawer } from './components/CartDrawer';
import { BookingModal } from './components/BookingModal';
import { StudioLocationSection } from './components/StudioLocationSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BottomNav, NavTab } from './components/BottomNav';
import { FilterModal } from './components/FilterModal';
import { NotificationsModal } from './components/NotificationsModal';
import { BookingsListModal } from './components/BookingsListModal';
import { StylistProfileModal } from './components/StylistProfileModal';
import { SERVICES_DATA, PRODUCTS_DATA, MASTER_STYLISTS } from './data/servicesData';
import { CategoryType, ServiceItem, ProductItem, CartItem, BookingDetails, Stylist } from './types';
import { Search, ChevronDown, Clock, Phone, MessageCircle, MapPin, Sparkles, ShoppingBag } from 'lucide-react';

export default function App() {
  // Navigation & View States
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');

  // Interactive Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: PRODUCTS_DATA[0], quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Product Detail Modal State
  const [selectedProductDetail, setSelectedProductDetail] = useState<ProductItem | null>(null);

  // Policy Modal State
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyData | null>(null);

  // Filter States
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [priceFilter, setPriceFilter] = useState<'all' | 'under40' | '40to50' | 'over50'>('all');
  const [hairIncludedOnly, setHairIncludedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'priceAsc' | 'priceDesc'>('featured');

  // Booking & Modal States
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<ServiceItem | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isStylistProfileOpen, setIsStylistProfileOpen] = useState(false);
  const [isBookingsModalOpen, setIsBookingsModalOpen] = useState(false);

  // Favorites & Booked State
  const [favorites, setFavorites] = useState<string[]>(['boho-box-braids', 'waist-knotless-braids']);
  const [bookings, setBookings] = useState<BookingDetails[]>([
    {
      service: SERVICES_DATA[0],
      date: 'Tue 27 Oct',
      timeSlot: '1:30 PM',
      hairLength: 'Waist-Length',
      hairColor: '#1B Natural Black',
      hairLengthAddonPrice: 5000,
      addons: ['Scalp Spa & Steam'],
      addonsTotal: 6000,
      totalPriceNGN: 69000,
      clientName: 'Valued VIP Client',
      clientPhone: '+234 803 123 4567',
      clientNotes: '',
      bookingRef: 'ETR-884920',
      createdAt: '27/10/2026',
    },
  ]);

  // Cart Management Handlers
  const handleAddToCart = (product: ProductItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  // Direct WhatsApp Concierge Trigger
  const handleOpenWhatsAppConcierge = () => {
    const text = encodeURIComponent(
      'Hello Eterniou Luxury Hair Concierge, I would like to inquire about booking an appointment or ordering hair care essentials in Ugbor GRA, Benin City.'
    );
    window.open(`https://wa.me/2348030000000?text=${text}`, '_blank');
  };

  // Toggle favorite
  const handleToggleFavorite = (serviceId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]
    );
  };

  // Filtered Services Logic
  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter((service) => {
      if (selectedCategory !== 'All' && service.category !== selectedCategory) {
        return false;
      }
      if (hairIncludedOnly && !service.hairIncluded) {
        return false;
      }
      if (priceFilter === 'under40' && service.priceNGN >= 40000) return false;
      if (priceFilter === '40to50' && (service.priceNGN < 40000 || service.priceNGN > 50000)) return false;
      if (priceFilter === 'over50' && service.priceNGN <= 50000) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = service.title.toLowerCase().includes(q);
        const matchesStylist = service.stylist.name.toLowerCase().includes(q);
        const matchesCategory = service.category.toLowerCase().includes(q);
        const matchesLocation = service.location.toLowerCase().includes(q);
        return matchesTitle || matchesStylist || matchesCategory || matchesLocation;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'priceAsc') return a.priceNGN - b.priceNGN;
      if (sortBy === 'priceDesc') return b.priceNGN - a.priceNGN;
      return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
    });
  }, [selectedCategory, hairIncludedOnly, priceFilter, searchQuery, sortBy]);

  const handleBookingConfirmed = (newBooking: BookingDetails) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const resetFilters = () => {
    setSelectedCategory('All');
    setPriceFilter('all');
    setHairIncludedOnly(false);
    setSearchQuery('');
    setSortBy('featured');
    setIsFilterModalOpen(false);
  };

  const handleGoToExplore = () => {
    setActiveTab('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#F8F5F0] flex flex-col justify-start">
      {/* Pure, Ultra-Clean Responsive Mobile-First Application Shell */}
      <div className="w-full max-w-xl mx-auto min-h-screen bg-[#0A0A0A] flex flex-col relative shadow-2xl border-x border-[#181818]">
        {/* Clean Header with Shopping Cart Counter */}
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenFilters={() => setIsFilterModalOpen(true)}
          unreadCount={2}
          cartCount={totalCartCount}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* Main Content Area based on Tab */}
        <main className="flex-1 pb-24 overflow-y-auto no-scrollbar">
          {activeTab === 'home' && (
            <>
              {/* Native Hero & Discovery Header */}
              <HeroBanner
                onExploreClick={() => {
                  const element = document.getElementById('curated-looks-section');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                onOpenWhatsAppConcierge={handleOpenWhatsAppConcierge}
              />

              {/* Horizontal Category Navigation Pills */}
              <CategoryPills
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                onViewAll={() => {
                  setSelectedCategory('All');
                  setActiveTab('explore');
                }}
              />

              {/* Curated Looks & Service-First Grid (Primary Focus) */}
              <section id="curated-looks-section" className="px-5 pt-3 pb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-[#F8F5F0] tracking-tight">
                      Curated Looks
                    </h2>
                    <span className="text-xs text-[#A0A0A0] bg-[#161616] px-2 py-0.5 rounded-full border border-[#242424]">
                      {filteredServices.length} Nearby
                    </span>
                  </div>

                  {/* Location indicator */}
                  <div className="flex items-center gap-1 text-xs text-[#D4AF37] font-medium cursor-pointer">
                    <span className="truncate max-w-[120px]">Ugbor GRA</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* 2-Column Responsive Service Card Grid */}
                {filteredServices.length === 0 ? (
                  <div className="text-center py-12 px-4 rounded-3xl bg-[#121212] border border-[#222]">
                    <Search className="w-8 h-8 text-[#555] mx-auto mb-2" />
                    <h4 className="font-semibold text-sm text-white">No styles match criteria</h4>
                    <p className="text-xs text-[#888] mt-1 mb-3">
                      Try clearing filters or search for another braid technique.
                    </p>
                    <button
                      onClick={resetFilters}
                      className="px-4 py-2 rounded-full bg-[#D4AF37] text-black text-xs font-bold"
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {filteredServices.map((service) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        isFavorite={favorites.includes(service.id)}
                        onToggleFavorite={handleToggleFavorite}
                        onSelectService={(s) => setSelectedServiceForBooking(s)}
                      />
                    ))}
                  </div>
                )}
              </section>

              {/* STREAMLINED HOME TAB PRODUCTS (Limited to 2 items + stylish fade-out card) */}
              <ProductsSection
                onAddToCart={handleAddToCart}
                cartCount={totalCartCount}
                onOpenCart={() => setIsCartOpen(true)}
                onSelectProduct={(p) => setSelectedProductDetail(p)}
                onViewAllProducts={handleGoToExplore}
                limit={2}
              />

              {/* LOCAL TRUST & PHYSICAL ANCHOR WITH EMBEDDED GOOGLE MAPS */}
              <StudioLocationSection onOpenWhatsAppConcierge={handleOpenWhatsAppConcierge} />

              {/* TESTIMONIALS WITH CLIENT AVATARS */}
              <TestimonialsSection onOpenWhatsAppConcierge={handleOpenWhatsAppConcierge} />

              {/* LUXURY WEB-APP FOOTER (LEGAL & TRUST LINKS) */}
              <LuxuryFooter
                onOpenPolicy={(policy) => setSelectedPolicy(policy)}
                onOpenWhatsAppConcierge={handleOpenWhatsAppConcierge}
              />
            </>
          )}

          {activeTab === 'explore' && (
            <div className="space-y-5">
              <div className="px-5 pt-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] block">
                  Catalog & Styles
                </span>
                <h1 className="font-serif-luxury text-2xl font-bold text-white">
                  Explore Hairstyle Gallery
                </h1>
                <p className="text-xs text-[#A0A0A0] mt-1">
                  Browse master braider creations with transparent Naira pricing and instant slot reservation.
                </p>
              </div>

              {/* Quick Category filter buttons */}
              <div className="px-5 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                {(['All', 'Braids', 'Locs', 'Knotless', 'Wig Revamp', 'Styling'] as CategoryType[]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap border transition-all ${
                      selectedCategory === cat
                        ? 'bg-[#D4AF37] text-black font-semibold border-[#D4AF37]'
                        : 'bg-[#141414] text-[#A0A0A0] border-[#252525]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Sort By Strip */}
              <div className="px-5 flex items-center justify-between text-xs text-[#A0A0A0]">
                <span>Showing {filteredServices.length} looks</span>
                <div className="flex items-center gap-1">
                  <span>Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-[#161616] border border-[#2B2B2B] rounded-lg px-2 py-1 text-xs text-white focus:outline-none"
                  >
                    <option value="featured">Featured</option>
                    <option value="rating">Highest Rated</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Service Cards Grid */}
              <div className="px-5 grid grid-cols-2 gap-3">
                {filteredServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    isFavorite={favorites.includes(service.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onSelectService={(s) => setSelectedServiceForBooking(s)}
                  />
                ))}
              </div>

              {/* Full Products Catalog in Explore Tab (No Limit) */}
              <ProductsSection
                onAddToCart={handleAddToCart}
                cartCount={totalCartCount}
                onOpenCart={() => setIsCartOpen(true)}
                onSelectProduct={(p) => setSelectedProductDetail(p)}
              />

              {/* Luxury Footer on Explore Tab */}
              <LuxuryFooter
                onOpenPolicy={(policy) => setSelectedPolicy(policy)}
                onOpenWhatsAppConcierge={handleOpenWhatsAppConcierge}
              />
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="px-5 py-4 space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] block">
                  Client Portal
                </span>
                <h1 className="font-serif-luxury text-2xl font-bold text-white">
                  Your Appointments
                </h1>
                <p className="text-xs text-[#A0A0A0] mt-1">
                  Manage your reserved salon slots, view booking codes, and access VIP concierge.
                </p>
              </div>

              {bookings.length === 0 ? (
                <div className="text-center py-12 px-4 rounded-3xl bg-[#141414] border border-[#242424]">
                  <p className="text-xs text-[#888] mb-3">No active bookings yet.</p>
                  <button
                    onClick={() => setActiveTab('home')}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B8922B] text-black font-bold text-xs"
                  >
                    Browse Styles Now
                  </button>
                </div>
              ) : (
                bookings.map((b) => (
                  <div
                    key={b.bookingRef}
                    className="p-4 rounded-3xl bg-[#141414] border border-[#262626] space-y-3 shadow-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/30">
                          #{b.bookingRef}
                        </span>
                        <h3 className="font-semibold text-sm text-white mt-1">
                          {b.service.title}
                        </h3>
                        <p className="text-xs text-[#A0A0A0]">
                          With {b.service.stylist.name} · {b.service.duration}
                        </p>
                      </div>

                      <div className="w-12 h-12 rounded-2xl overflow-hidden border border-[#333]">
                        <img
                          src={b.service.image}
                          alt={b.service.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="p-2.5 rounded-2xl bg-[#0D0D0D] border border-[#1E1E1E] text-xs space-y-1">
                      <div className="flex justify-between text-[#DCDCDC]">
                        <span>Scheduled:</span>
                        <span className="font-semibold text-white">
                          {b.date} at {b.timeSlot}
                        </span>
                      </div>
                      <div className="flex justify-between text-[#A0A0A0]">
                        <span>Hair Specs:</span>
                        <span>{b.hairLength} · {b.hairColor}</span>
                      </div>
                      <div className="flex justify-between text-[#A0A0A0]">
                        <span>VIP Studio:</span>
                        <span>Ugbor GRA Suite A</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#222]">
                      <div>
                        <span className="text-[10px] text-[#888] block">30% Deposit Paid</span>
                        <span className="font-serif-luxury font-bold text-sm text-[#34D399]">
                          ₦{Math.round(b.totalPriceNGN * 0.3).toLocaleString()}
                        </span>
                      </div>

                      <a
                        href={`https://wa.me/2348030000000?text=${encodeURIComponent(
                          `Hello Eterniou Concierge, I am inquiring about my booking ${b.bookingRef} for ${b.service.title}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-full bg-[#25D366] text-black font-bold text-xs flex items-center gap-1.5 shadow hover:bg-[#20ba5a] transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-black" />
                        <span>Concierge WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="px-5 pt-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] block">
                  Studio Concierge & Profile
                </span>
                <h1 className="font-serif-luxury text-2xl font-bold text-white">
                  Eterniou Master Stylists
                </h1>
                <p className="text-xs text-[#A0A0A0] mt-1">
                  Meet our lead braiders and explore private suite accommodations.
                </p>
              </div>

              {/* Master Braider Featured Card */}
              <div className="mx-5 p-4 rounded-3xl bg-[#141414] border border-[#282828] space-y-3 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#D4AF37] shrink-0">
                    <img
                      src={MASTER_STYLISTS.aaliyah.avatar}
                      alt={MASTER_STYLISTS.aaliyah.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-white">
                      {MASTER_STYLISTS.aaliyah.name}
                    </h3>
                    <p className="text-xs text-[#D4AF37]">{MASTER_STYLISTS.aaliyah.title}</p>
                    <p className="text-[11px] text-[#888]">
                      {MASTER_STYLISTS.aaliyah.experience} · 310+ VIP Clients
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[#B5B5B5] leading-relaxed">
                  {MASTER_STYLISTS.aaliyah.bio}
                </p>

                <button
                  onClick={() => setIsStylistProfileOpen(true)}
                  className="w-full py-2.5 rounded-2xl bg-[#1A1A1A] border border-[#333] text-xs font-semibold text-white hover:border-[#D4AF37] transition-colors"
                >
                  View Full Credentials & Sanitation Proof
                </button>
              </div>

              {/* Studio Direct Contact */}
              <div className="mx-5 p-4 rounded-3xl bg-[#141414] border border-[#242424] space-y-2.5 text-xs shadow-lg">
                <h4 className="font-semibold text-white">Direct Ugbor Concierge</h4>
                <div className="space-y-1.5 text-[#B0B0B0]">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Suite 4, Eterniou Luxury Pavilions, Off Adesuwa Road, Ugbor GRA, Benin City</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Monday – Saturday: 8:00 AM – 7:00 PM</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>VIP Direct line: +234 (0) 803 000 0000</span>
                  </p>
                </div>
                <button
                  onClick={handleOpenWhatsAppConcierge}
                  className="w-full py-2.5 mt-2 rounded-full bg-[#25D366] text-black font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#20ba5a] transition-colors shadow"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-black" />
                  <span>Chat with Concierge</span>
                </button>
              </div>

              {/* Luxury Footer on Profile Tab */}
              <LuxuryFooter
                onOpenPolicy={(policy) => setSelectedPolicy(policy)}
                onOpenWhatsAppConcierge={handleOpenWhatsAppConcierge}
              />
            </div>
          )}
        </main>

        {/* Floating Bottom Navigation Pill Dock */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          bookingsCount={bookings.length}
        />

        {/* Interactive Slide-out Cart Drawer */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveCartItem}
          onClearCart={handleClearCart}
        />

        {/* Click-to-View Product Detail Modal */}
        <ProductDetailModal
          product={selectedProductDetail}
          onClose={() => setSelectedProductDetail(null)}
          onAddToCart={(product) => {
            handleAddToCart(product);
            setIsCartOpen(true);
          }}
        />

        {/* Interactive Legal Policy Modal */}
        <PolicyModal
          policy={selectedPolicy}
          onClose={() => setSelectedPolicy(null)}
        />

        {/* Interactive Service Booking Modal / View */}
        {selectedServiceForBooking && (
          <BookingModal
            service={selectedServiceForBooking}
            isFavorite={favorites.includes(selectedServiceForBooking.id)}
            onToggleFavorite={handleToggleFavorite}
            onClose={() => setSelectedServiceForBooking(null)}
            onBookingConfirmed={handleBookingConfirmed}
          />
        )}

        {/* Filter Modal */}
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          priceFilter={priceFilter}
          onPriceFilterChange={setPriceFilter}
          hairIncludedOnly={hairIncludedOnly}
          onToggleHairIncluded={() => setHairIncludedOnly(!hairIncludedOnly)}
          onReset={resetFilters}
        />

        {/* Notifications Modal */}
        <NotificationsModal
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
          onSelectPromo={() => {
            setSelectedServiceForBooking(SERVICES_DATA[0]);
          }}
        />

        {/* Stylist Profile Modal */}
        <StylistProfileModal
          isOpen={isStylistProfileOpen}
          onClose={() => setIsStylistProfileOpen(false)}
          onBookWithStylist={(st) => {
            const found = SERVICES_DATA.find((s) => s.stylist.id === st.id) || SERVICES_DATA[0];
            setSelectedServiceForBooking(found);
          }}
        />

        {/* User Bookings Modal */}
        <BookingsListModal
          isOpen={isBookingsModalOpen}
          onClose={() => setIsBookingsModalOpen(false)}
          bookings={bookings}
          onExploreStyles={() => setActiveTab('explore')}
        />
      </div>
    </div>
  );
}
