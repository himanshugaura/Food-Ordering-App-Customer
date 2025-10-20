import Image from 'next/image';
import React from 'react';

const AboutCard1 = () => {
  return (
    <div className="flex flex-col justify-center lg:flex-row  rounded-3xl overflow-hidden max-w-7xl mx-auto gap-2 ">
      {/* Content Section */}
      <div className="flex-1 px-10 py-5 sm:p-10 flex flex-col justify-center items-center border border-zinc-700 rounded-3xl">
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-4xl font-light text-white mb-8 lg:mb-12 leading-tight tracking-[0.15em] uppercase text-center md:text-left">
          CULINARY DELIGHTS REIMAGINED
        </h1>
        <p className="text-sm sm:text-base text-white leading-relaxed font-light text-justify px-8 md:px-0">
         Where flavor meets passion and creativity. Enjoy thoughtfully crafted dishes that turn every meal into an unforgettable experience.
        </p>
      </div>

      {/* Image Section */}
      <div className="flex-1 relative min-h-[300px] sm:min-h-[350px] lg:min-h-[400px]">
        <Image
          src="/contact.avif"
          alt="Elegant dining experience"
          className="w-full h-full object-cover rounded-3xl"
          width={1920}
          height={1080}
        />
      </div>
    </div>
  );
};

export default AboutCard1;