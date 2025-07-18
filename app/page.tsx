import React from 'react';
import MagicalBowl from '@/components/landing/MagicalBowl';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-8 drop-shadow-lg">
          Find Your Sweet Side of You
        </h1>
        
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          The premium marketplace connecting South Asian communities with authentic bulk sweet vendors.
        </p>
        
        <MagicalBowl />
        
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all mt-8">
          Start Shopping Now
        </button>
      </div>
    </main>
  );
}