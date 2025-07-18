'use client';

import React from 'react';

interface LandingHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const LandingHeader: React.FC<LandingHeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl border-b border-yellow-200 transition-all duration-300 min-h-[70px]">
      <nav className="container max-w-[1400px] mx-auto px-4 h-[70px] flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">
            🍯
          </div>
          <span className="font-playfair text-2xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
            Mera Waala Meetha
          </span>
        </div>
        
        {/* Navigation Menu - Now Functional */}
        <div className="hidden lg:flex items-center gap-8">
          <button 
            onClick={() => setActiveTab('browse')}
            className={`font-semibold text-base cursor-pointer transition-all duration-300 relative py-2 ${
              activeTab === 'browse' 
                ? 'text-orange-500' 
                : 'text-gray-700 hover:text-orange-500'
            } group`}
          >
            Browse Collection
            <div className={`absolute bottom-[-5px] left-0 h-[3px] bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-300 rounded-sm ${
              activeTab === 'browse' ? 'w-full' : 'w-0 group-hover:w-full'
            }`}></div>
          </button>
          
          <button 
            onClick={() => setActiveTab('vendors')}
            className={`font-semibold text-base cursor-pointer transition-all duration-300 relative py-2 ${
              activeTab === 'vendors' 
                ? 'text-orange-500' 
                : 'text-gray-700 hover:text-orange-500'
            } group`}
          >
            Our Vendors
            <div className={`absolute bottom-[-5px] left-0 h-[3px] bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-300 rounded-sm ${
              activeTab === 'vendors' ? 'w-full' : 'w-0 group-hover:w-full'
            }`}></div>
          </button>
          
          <button 
            onClick={() => setActiveTab('vendor')}
            className={`font-semibold text-base cursor-pointer transition-all duration-300 relative py-2 ${
              activeTab === 'vendor' 
                ? 'text-orange-500' 
                : 'text-gray-700 hover:text-orange-500'
            } group`}
          >
            Become a Vendor
            <div className={`absolute bottom-[-5px] left-0 h-[3px] bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-300 rounded-sm ${
              activeTab === 'vendor' ? 'w-full' : 'w-0 group-hover:w-full'
            }`}></div>
          </button>
          
          <button 
            onClick={() => setActiveTab('contact')}
            className={`font-semibold text-base cursor-pointer transition-all duration-300 relative py-2 ${
              activeTab === 'contact' 
                ? 'text-orange-500' 
                : 'text-gray-700 hover:text-orange-500'
            } group`}
          >
            Contact Us
            <div className={`absolute bottom-[-5px] left-0 h-[3px] bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-300 rounded-sm ${
              activeTab === 'contact' ? 'w-full' : 'w-0 group-hover:w-full'
            }`}></div>
          </button>
        </div>
        
        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <button className="px-6 py-2 bg-white text-orange-500 border-2 border-orange-500 rounded-lg font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300">
            Sign In
          </button>
          <button className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
            Join Now
          </button>
        </div>
      </nav>
    </header>
  );
};

export default LandingHeader;