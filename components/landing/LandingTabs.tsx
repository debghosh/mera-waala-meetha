'use client';

import React, { useState } from 'react';

const LandingTabs = () => {
  const [activeTab, setActiveTab] = useState('browse');

  return (
    <section className="container mx-auto bg-white/95 backdrop-blur-[20px] rounded-[20px] p-6 my-8 shadow-[0_20px_60px_rgba(0,0,0,0.1)] max-w-[1200px]">
      
      {/* Tab Navigation - exact from HTML */}
      <div className="flex justify-center gap-6 mb-8 border-b-2 border-[#E5E7EB] flex-wrap">
        {[
          { id: 'browse', label: 'Browse Collection' },
          { id: 'vendors', label: 'Our Vendors' },
          { id: 'become-vendor', label: 'Become a Vendor' },
          { id: 'contact', label: 'Contact Us' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-base font-semibold cursor-pointer relative transition-all duration-300 rounded-t-[10px] whitespace-nowrap ${
              activeTab === tab.id
                ? 'text-[#FF6B35] bg-[rgba(255,107,53,0.1)]'
                : 'text-[#666] hover:text-[#FF6B35] hover:bg-[rgba(255,107,53,0.05)]'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-[-2px] left-0 right-0 h-[3px] bg-gradient-to-r from-[#D4AF37] to-[#FF6B35] rounded-[2px]"></div>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content - exact from HTML */}
      <div className="min-h-[400px]" style={{ animation: 'fadeInUp 0.5s ease' }}>
        {activeTab === 'browse' && <BrowseCollection />}
        {activeTab === 'vendors' && <OurVendors />}
        {activeTab === 'become-vendor' && <BecomeVendor />}
        {activeTab === 'contact' && <ContactUs />}
      </div>
    </section>
  );
};

// Browse Collection - exact from HTML
const BrowseCollection = () => (
  <div>
    <div className="text-center mb-8">
      <h2 className="font-['Playfair_Display',serif] text-[2.5rem] font-bold mb-4 text-[#1A1A1A]">
        Discover Authentic Sweets
      </h2>
      <p className="text-lg text-[#666] max-w-[600px] mx-auto">
        Explore our curated collection of traditional sweets from verified artisans across different regions
      </p>
    </div>
    
    {/* Collection Preview - exact grid from HTML */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mt-8">
      {[
        { name: 'Bengali Classics', icon: 'Rasgulla', count: '85+ varieties' },
        { name: 'Gujarati Delights', icon: 'Dhokla', count: '65+ varieties' },
        { name: 'Punjabi Specialties', icon: 'Laddu', count: '45+ varieties' },
        { name: 'South Indian', icon: 'Mysore Pak', count: '55+ varieties' },
        { name: 'Festival Specials', icon: 'Jalebi', count: '120+ varieties' },
        { name: 'Premium Collection', icon: 'Barfi', count: '35+ varieties' },
      ].map((category, index) => (
        <div
          key={index}
          className="bg-white rounded-[16px] p-6 text-center shadow-[0_8px_30px_rgba(0,0,0,0.1)] border-2 border-transparent hover:border-[#FF6B35] transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_15px_40px_rgba(255,107,53,0.2)] cursor-pointer"
        >
          <div className="text-[2.5rem] mb-4 font-['Playfair_Display',serif] font-bold text-[#FF6B35] filter drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
            {category.icon}
          </div>
          <h3 className="font-['Playfair_Display',serif] text-lg font-semibold mb-2 text-[#1A1A1A]">{category.name}</h3>
          <p className="text-[#666] text-sm">{category.count}</p>
        </div>
      ))}
    </div>

    <div className="text-center mt-12">
      <button className="bg-gradient-to-r from-[#D4AF37] to-[#FF6B35] text-white font-semibold px-8 py-4 rounded-full text-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
        Sign Up to Explore Full Collection
      </button>
    </div>
  </div>
);

// Placeholder components
const OurVendors = () => (
  <div className="text-center">
    <h2 className="font-['Playfair_Display',serif] text-[2.5rem] font-bold mb-4 text-[#1A1A1A]">Meet Our Verified Vendors</h2>
    <p className="text-[#666]">Vendor showcase coming next...</p>
  </div>
);

const BecomeVendor = () => (
  <div className="text-center">
    <h2 className="font-['Playfair_Display',serif] text-[2.5rem] font-bold mb-4 text-[#1A1A1A]">Join Our Vendor Network</h2>
    <p className="text-[#666]">Vendor registration coming next...</p>
  </div>
);

const ContactUs = () => (
  <div className="text-center">
    <h2 className="font-['Playfair_Display',serif] text-[2.5rem] font-bold mb-4 text-[#1A1A1A]">Get in Touch</h2>
    <p className="text-[#666]">Contact form coming next...</p>
  </div>
);

export default LandingTabs;