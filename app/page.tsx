'use client';
import React, { useState, useRef } from 'react';
import LandingHeader from '@/components/navigation/LandingHeader';
import MagicalBowl from '@/components/landing/MagicalBowl';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('browse');
  const tabContentRef = useRef<HTMLElement>(null);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Scroll to tab content section smoothly
    if (tabContentRef.current) {
      tabContentRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      {/* Header with Navigation - now functional */}
      <LandingHeader activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Hero Section */}
      <section className="min-h-[80vh] mt-[70px] bg-gradient-to-br from-[#FFF8F0]/95 via-[#FFF0D2]/90 to-[#FFE6B4]/95 flex items-center justify-center relative overflow-hidden px-6 py-12">
        
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><pattern id='sweet-pattern' x='0' y='0' width='20' height='20' patternUnits='userSpaceOnUse'><circle cx='10' cy='10' r='1' fill='%23D4AF37' opacity='0.1'/></pattern></defs><rect width='100' height='100' fill='url(%23sweet-pattern)'/></svg>")`
          }}
        />
        
        <div className="container max-w-[1400px] mx-auto px-4 relative z-2">
          {/* Hero Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Hero Content - Left Side */}
            <div className="max-w-[600px]">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6 border border-[#D4AF37]/20 text-sm font-semibold text-[#FF6B35]"
                   style={{ animation: 'slideInUp 1s ease-out 0.2s both' }}>
                <span>✨</span>
                Trusted by 10,000+ Happy Customers
              </div>
              
              {/* Title */}
              <h1 className="font-playfair text-[clamp(2.5rem,5vw,4rem)] font-extrabold leading-[1.1] mb-4 bg-gradient-to-r from-[#1A1A1A] to-[#FF6B35] bg-clip-text text-transparent"
                  style={{ animation: 'slideInUp 1s ease-out 0.4s both' }}>
                Find Your Sweet Side of You
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg text-[#666] mb-6 leading-[1.5]"
                 style={{ animation: 'slideInUp 1s ease-out 0.6s both' }}>
                The premium marketplace connecting South Asian communities with authentic 
                bulk sweet vendors for weddings, festivals, and special celebrations.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex gap-4 mb-8 flex-col sm:flex-row"
                   style={{ animation: 'slideInUp 1s ease-out 0.8s both' }}>
                <button 
                  onClick={() => handleTabChange('browse')}
                  className="px-8 py-4 border-none rounded-full font-semibold cursor-pointer transition-all duration-300 text-white bg-gradient-to-r from-[#D4AF37] to-[#FF6B35] shadow-[0_4px_15px_rgba(212,175,55,0.3)] hover:translate-y-[-2px] hover:shadow-[0_8px_25px_rgba(212,175,55,0.4)] text-lg rounded-[50px]"
                >
                  Start Shopping
                </button>
                <button 
                  onClick={() => handleTabChange('vendor')}
                  className="px-8 py-4 bg-white text-[#FF6B35] border-2 border-[#FF6B35] rounded-full font-semibold cursor-pointer transition-all duration-300 hover:bg-[#FF6B35] hover:text-white hover:translate-y-[-2px] text-lg"
                >
                  Become a Vendor
                </button>
              </div>
              
              {/* Stats */}
              <div className="flex gap-8 justify-center sm:justify-start"
                   style={{ animation: 'slideInUp 1s ease-out 1s both' }}>
                <div className="text-center">
                  <div className="font-playfair text-[2.5rem] font-bold text-[#FF6B35] block">500+</div>
                  <div className="text-sm text-[#666] font-medium">Verified Vendors</div>
                </div>
                <div className="text-center">
                  <div className="font-playfair text-[2.5rem] font-bold text-[#FF6B35] block">50K+</div>
                  <div className="text-sm text-[#666] font-medium">Orders Delivered</div>
                </div>
                <div className="text-center">
                  <div className="font-playfair text-[2.5rem] font-bold text-[#FF6B35] block">25+</div>
                  <div className="text-sm text-[#666] font-medium">Cities Served</div>
                </div>
              </div>
            </div>
            
            {/* Hero Visual - Right Side */}
            <div className="relative h-[500px] flex items-center justify-center"
                 style={{ animation: 'slideInRight 1.2s ease-out 0.5s both' }}>
              <MagicalBowl />
            </div>
          </div>
        </div>
      </section>

      {/* Tab Content Section */}
      <section ref={tabContentRef} className="py-16 bg-white">
        <div className="container max-w-[1400px] mx-auto px-4">
          <div className="bg-white border rounded-lg overflow-hidden shadow-lg">
            <div className="p-8 min-h-[500px]">
              
              {/* Browse Collection Content */}
              {activeTab === 'browse' && (
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">Browse Collection</h2>
                  <p className="text-lg text-gray-600 mb-8">Explore our curated collection of authentic sweets from verified artisans.</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-8">
                    {[
                      { name: 'Bengali Classics', icon: '🍡', count: '85+ varieties', category: 'MISHTI' },
                      { name: 'Gujarati Delights', icon: '🥮', count: '65+ varieties', category: 'JALEBI' },
                      { name: 'Punjabi Specialties', icon: '🧈', count: '45+ varieties', category: 'LADDU' },
                      { name: 'South Indian', icon: '🥧', count: '55+ varieties', category: 'HALWA' },
                      { name: 'Festival Specials', icon: '🎉', count: '120+ varieties', category: 'SEASONAL' },
                      { name: 'Premium Collection', icon: '👑', count: '35+ varieties', category: 'BARFI' },
                    ].map((category, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          // Navigate to products page with category filter
                          window.location.href = `/products?category=${category.category}`;
                        }}
                        style={{
                          backgroundColor: 'white',
                          borderRadius: '1rem',
                          padding: '1.5rem',
                          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                          border: '2px solid transparent',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          textAlign: 'center'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#ff6b35'
                          e.currentTarget.style.transform = 'scale(1.05)'
                          e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'transparent'
                          e.currentTarget.style.transform = 'scale(1)'
                          e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                        }}
                      >
                        <div style={{
                          fontSize: '2.5rem',
                          marginBottom: '1rem',
                          filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.3))'
                        }}>
                          {category.icon}
                        </div>
                        <h3 style={{
                          fontSize: '1rem',
                          fontWeight: '600',
                          marginBottom: '0.5rem',
                          color: '#1f2937'
                        }}>
                          {category.name}
                        </h3>
                        <p style={{
                          color: '#64748b',
                          fontSize: '0.875rem'
                        }}>
                          {category.count}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Our Vendors Content */}
              {activeTab === 'vendors' && (
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">Meet Our Verified Vendors</h2>
                  <p className="text-lg text-gray-600 mb-8">Discover authentic sweet makers who bring generations of tradition and expertise.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { name: 'Sweet Kolkata', avatar: '🏪', specialty: 'Bengali Sweets Specialist', rating: 4.9 },
                      { name: 'Gujarati Sweets House', avatar: '🏛️', specialty: 'Traditional Gujarati Mithai', rating: 4.7 },
                      { name: 'Punjab Da Dhaba', avatar: '🌾', specialty: 'Authentic Punjabi Sweets', rating: 4.8 }
                    ].map((vendor, index) => (
                      <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border hover:border-orange-500 transition-all duration-300">
                        <div className="text-center mb-4">
                          <div className="text-4xl mb-2">{vendor.avatar}</div>
                          <h3 className="text-xl font-bold mb-1">{vendor.name}</h3>
                          <p className="text-gray-600 text-sm">{vendor.specialty}</p>
                          <div className="text-yellow-500 mt-2">⭐ {vendor.rating}</div>
                        </div>
                        <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 rounded hover:shadow-lg transition-all duration-300">
                          View Store
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Become a Vendor Content */}
              {activeTab === 'vendor' && (
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">Join Our Vendor Network</h2>
                  <p className="text-lg text-gray-600 mb-8">Grow your sweet business by connecting with thousands of customers across the region.</p>
                  
                  <form className="space-y-6 max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Business Name *</label>
                        <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500" placeholder="Your business name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Owner Name *</label>
                        <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500" placeholder="Your full name" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Email *</label>
                        <input type="email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500" placeholder="your@email.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Phone *</label>
                        <input type="tel" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500" placeholder="+1 (xxx) xxx-xxxx" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Areas Served *</label>
                        <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500" placeholder="Charlotte, Matthews, Huntersville..." />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">Years of Experience *</label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500">
                          <option value="">Select experience level</option>
                          <option value="1-2">1-2 years</option>
                          <option value="3-5">3-5 years</option>
                          <option value="6-10">6-10 years</option>
                          <option value="10+">10+ years</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">Business Description *</label>
                      <textarea className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500" rows={4} placeholder="Tell us about your business, what makes your sweets special..."></textarea>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" id="terms" className="h-4 w-4 text-orange-500 border-gray-300 rounded" />
                      <label htmlFor="terms" className="text-sm text-gray-600">
                        I agree to the <span className="text-orange-500 font-medium">Terms of Service</span> and <span className="text-orange-500 font-medium">Privacy Policy</span>
                      </label>
                    </div>
                    
                    <button type="submit" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold px-8 py-3 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
                      Submit Application
                    </button>
                  </form>
                </div>
              )}
              
              {/* Contact Us Content */}
              {activeTab === 'contact' && (
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">Get in Touch</h2>
                  <p className="text-lg text-gray-600 mb-8">Have questions? We're here to help you find your perfect sweet experience.</p>
                  
                  <div className="grid lg:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 text-xl">📧</div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Email Us</h3>
                          <p className="text-gray-600">hello@merawawalameetha.com</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 text-xl">📞</div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Call Us</h3>
                          <p className="text-gray-600">+1 (704) 555-SWEET</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <form className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <input type="text" placeholder="Your Name" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500" />
                          <input type="email" placeholder="Your Email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500" />
                        </div>
                        <textarea placeholder="How can we help you?" rows={5} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"></textarea>
                        <button type="submit" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300">
                          Send Message
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
              
            </div>
          </div>
        </div>
      </section>
    </>
  );
}