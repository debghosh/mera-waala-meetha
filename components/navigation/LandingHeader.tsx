'use client';

import React from 'react';

const LandingHeader = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-primary-gold/10 transition-all duration-300 min-h-[70px]">
      <nav className="container max-w-[1400px] mx-auto px-4 h-[70px] flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-gold to-primary-orange rounded-xl flex items-center justify-center text-2xl shadow-lg">
            🍯
          </div>
          <span className="font-playfair text-2xl font-bold bg-gradient-to-r from-primary-gold to-primary-orange bg-clip-text text-transparent">
            Mera Waala Meetha
          </span>
        </div>
        
        {/* Navigation Menu */}
        <div className="hidden lg:flex items-center gap-8">
          <a href="#" className="text-text-dark font-semibold text-base cursor-pointer transition-all duration-300 relative padding-y-2 hover:text-primary-orange group">
            Browse Collection
            <div className="absolute bottom-[-5px] left-0 w-0 h-[3px] bg-gradient-to-r from-primary-gold to-primary-orange transition-all duration-300 rounded-sm group-hover:w-full"></div>
          </a>
          <a href="#" className="text-text-dark font-semibold text-base cursor-pointer transition-all duration-300 relative padding-y-2 hover:text-primary-orange group">
            Our Vendors
            <div className="absolute bottom-[-5px] left-0 w-0 h-[3px] bg-gradient-to-r from-primary-gold to-primary-orange transition-all duration-300 rounded-sm group-hover:w-full"></div>
          </a>
          <a href="#" className="text-text-dark font-semibold text-base cursor-pointer transition-all duration-300 relative padding-y-2 hover:text-primary-orange group">
            Become a Vendor
            <div className="absolute bottom-[-5px] left-0 w-0 h-[3px] bg-gradient-to-r from-primary-gold to-primary-orange transition-all duration-300 rounded-sm group-hover:w-full"></div>
          </a>
          <a href="#" className="text-text-dark font-semibold text-base cursor-pointer transition-all duration-300 relative padding-y-2 hover:text-primary-orange group">
            Contact Us
            <div className="absolute bottom-[-5px] left-0 w-0 h-[3px] bg-gradient-to-r from-primary-gold to-primary-orange transition-all duration-300 rounded-sm group-hover:w-full"></div>
          </a>
        </div>
        
        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <button className="px-6 py-2 bg-white text-primary-orange border-2 border-primary-orange rounded-lg font-semibold hover:bg-primary-orange hover:text-white transition-all duration-300">
            Sign In
          </button>
          <button className="px-6 py-2 bg-gradient-to-r from-primary-gold to-primary-orange text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
            Join Now
          </button>
        </div>
      </nav>
    </header>
  );
};

export default LandingHeader;