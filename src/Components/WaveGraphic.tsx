
import React from 'react';

const WaveGraphic: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-[#38d39f] to-[#22a6b3] dark:from-[#059669] dark:to-[#0d9488] transition-colors duration-700">
      {/* Decorative Geometric Shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-48 h-48 bg-white opacity-10 rotate-45 rounded-xl"></div>
      <div className="absolute bottom-[20%] right-[-5%] w-32 h-32 bg-white opacity-10 rotate-12 rounded-lg"></div>
      <div className="absolute top-[40%] left-[20%] w-16 h-16 bg-white opacity-5 rounded-full blur-md"></div>
      
      {/* Large Soft Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent dark:from-black/40"></div>
    </div>
  );
};

export default WaveGraphic;

