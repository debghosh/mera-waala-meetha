import React from 'react';
import LandingHeader from '@/components/navigation/LandingHeader';
import MagicalBowl from '@/components/landing/MagicalBowl';

export default function HomePage() {
  return (
    <>
      {/* Header with Navigation */}
      <LandingHeader />

      {/* Hero Section - NOT full screen, with proper top margin */}
      <section className="min-h-[calc(100vh-70px)] mt-[70px] bg-gradient-to-br from-[#FFF8F0]/95 via-[#FFF0D2]/90 to-[#FFE6B4]/95 flex items-center justify-center relative overflow-hidden px-6 py-12">
        
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
                <button className="px-8 py-4 border-none rounded-full font-semibold cursor-pointer transition-all duration-300 text-white bg-gradient-to-r from-[#D4AF37] to-[#FF6B35] shadow-[0_4px_15px_rgba(212,175,55,0.3)] hover:translate-y-[-2px] hover:shadow-[0_8px_25px_rgba(212,175,55,0.4)] text-lg rounded-[50px]">
                  Start Shopping
                </button>
                <button className="px-8 py-4 bg-white text-[#FF6B35] border-2 border-[#FF6B35] rounded-full font-semibold cursor-pointer transition-all duration-300 hover:bg-[#FF6B35] hover:text-white hover:translate-y-[-2px] text-lg">
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
    </>
  );
}