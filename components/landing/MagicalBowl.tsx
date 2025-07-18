import React from 'react';

interface FloatingSweetProps {
  children: React.ReactNode;
  className?: string;
  animationClass: string;
  delay?: string;
}

const FloatingSweet = ({ 
  children, 
  className = '', 
  animationClass, 
  delay = '0s' 
}: FloatingSweetProps) => (
  <div 
    className={`absolute rounded-full flex items-center justify-center font-bold text-center leading-none bg-white/90 border-2 border-primary-gold top-1/2 left-1/2 ${animationClass} ${className}`}
    style={{ animationDelay: delay }}
  >
    {children}
  </div>
);

const MagicalBowl = () => {
  return (
    <div className="relative w-[500px] h-[500px] mx-auto lg:w-[400px] lg:h-[400px] md:w-[320px] md:h-[320px]">
      {/* Main Bowl Container */}
      <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-white/10 via-primary-gold/5 to-primary-orange/10 backdrop-blur-xl border-2 border-white/20 shadow-[0_0_60px_rgba(212,175,55,0.3)]">
        
        {/* Orbiting Sweets */}
        <FloatingSweet 
          animationClass="animate-orbit1 text-primary-orange w-[60px] h-[60px] text-[1.8rem]"
          delay="0s"
        >
          🧈
        </FloatingSweet>
        
        <FloatingSweet 
          animationClass="animate-orbit2 text-primary-gold w-[55px] h-[55px] text-[1.6rem]"
          delay="-2s"
        >
          🥮
        </FloatingSweet>
        
        <FloatingSweet 
          animationClass="animate-orbit3 text-accent-saffron w-[50px] h-[50px] text-[1.5rem]"
          delay="-4s"
        >
          🍡
        </FloatingSweet>
        
        <FloatingSweet 
          animationClass="animate-orbit4 text-secondary-red w-[45px] h-[45px] text-[1.4rem]"
          delay="-6s"
        >
          🧁
        </FloatingSweet>
        
        <FloatingSweet 
          animationClass="animate-orbit5 text-primary-orange w-[40px] h-[40px] text-[1.3rem]"
          delay="-8s"
        >
          🥧
        </FloatingSweet>
        
        {/* Center Sweet */}
        <FloatingSweet 
          animationClass="animate-centerFloat text-primary-gold w-[140px] h-[140px] text-[5rem] z-10 border-4 shadow-[0_0_40px_rgba(212,175,55,0.6)]"
          delay="-4s"
        >
          🍯
        </FloatingSweet>
      </div>
    </div>
  );
};

export default MagicalBowl;