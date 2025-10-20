import { Star } from 'lucide-react';
import React from 'react';

const Ratings = () => {
  const starClass = "h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400";
  
  const ratingData = [
    {
      title: "HYGIENIC",
      description: "Best Hygiene Standards"
    },
    {
      title: "QUALITY",
      description: "Premium Ingredients"
    },
    {
      title: "SERVICE",
      description: "Exceptional Experience"
    }
  ];

  return (
    <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6'>
      {ratingData.map((rating, index) => (
        <div 
          key={index}
          className='flex flex-col p-4 sm:p-5 lg:p-6 border border-zinc-700 bg-zinc-950/50 rounded-xl lg:rounded-2xl justify-center items-center hover:border-zinc-600'
        >
          <div className='flex gap-1 sm:gap-2 mb-2 sm:mb-3'>
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={starClass} />
            ))}
          </div>
          <h1 className='text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-1 sm:mb-2 tracking-wide'>
            {rating.title}
          </h1>
          <p className='text-xs sm:text-sm text-gray-400 text-center'>
            {rating.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Ratings;