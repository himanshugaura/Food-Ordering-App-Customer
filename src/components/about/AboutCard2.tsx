import Image from 'next/image';
import React from 'react';

const AboutCard2 = () => {
  return (
    <div className="flex flex-col justify-center  lg:flex-row-reverse bg-zinc-950 rounded-3xl overflow-hidden max-w-7xl mx-auto min-h-[400px] gap-2">
      {/* Content Section */}
      <div className="flex-1 px-10 py-5 sm:p-10 flex flex-col justify-center items-center border border-zinc-700 rounded-3xl">
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-4xl font-light text-white mb-8 lg:mb-12 leading-tight tracking-[0.15em] uppercase text-center md:text-left">
          DINING ELEVATED
        </h1>
        <p className="text-sm sm:text-base text-white leading-relaxed font-light text-justify px-8 md:px-0">
          A perfect harmony of taste, ambiance, and culinary artistry, designed to delight all your senses in every visit.
        </p>
      </div>

      {/* Image Section */}
      <div className="flex-1 relative min-h-[300px] sm:min-h-[350px] lg:min-h-[400px]">
        <Image
          src="/aboutSec.avif"
          alt="Elegant dining experience"
          className="w-full h-full object-cover rounded-3xl"
          width={1920}
          height={1080}
        />
      </div>
    </div>
  );
};

export default AboutCard2;