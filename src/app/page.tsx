"use client";
import React from "react";

export default function Home() {
  const sidebarItems = [
    {
      src: "/menu.avif",
      alt: "menu",
      label: "MENU",
      delay: "0ms"
    },
    {
      src: "/contact.avif",
      alt: "reservation",
      label: "CONTACT",
      delay: "150ms"
    },
    {
      src: "/about.avif",
      alt: "our space",
      label: "OUR SPACE",
      delay: "300ms"
    }
  ];

  return (
    <div className="min-h-screen md:h-screen w-full p-2 md:p-4">
      <div className="flex flex-col md:flex-col lg:flex-row gap-4 rounded-3xl overflow-hidden h-full">
        {/* Hero Section */}
        <div className="flex-1 rounded-3xl relative flex items-end md:items-center justify-start bg-black overflow-hidden min-h-[50vh] h-[100vh] shadow-2xl animate-fade-in duration-700">
          <video 
            className="w-full h-full object-cover absolute inset-0 opacity-90" 
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent md:bg-gradient-to-r md:from-black/60 md:via-black/30 md:to-transparent"></div>
          
          <div className="relative z-10 p-8 md:p-16 animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#ede7d3] drop-shadow-2xl tracking-wide leading-tight">
              FOOD <br />
              SENSATION
            </h1>
            <p className="text-[#ede7d3]/80 mt-4 text-sm md:text-base font-light tracking-wider hidden md:block">
              Lorem ipsum dolor sit amet.
            </p>
          </div>
        </div>

        {/* Sidebar Images */}
        <div className="grid grid-cols-1 grid-rows-3 md:grid-rows-1 md:grid-cols-3 gap-4 w-full lg:w-[23%] lg:grid-cols-1 lg:grid-rows-3 h-full">
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl overflow-hidden relative group cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 animate-fade-slide-in"
              style={{ 
                animationDelay: item.delay,
                opacity: 0,
                animationFillMode: 'forwards'
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 brightness-90 group-hover:brightness-100"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>
              
              {/* Label */}
              <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full text-xs md:text-sm text-white font-medium tracking-wider group-hover:bg-[#ede7d3] group-hover:text-black transition-all duration-300 shadow-lg">
                {item.label} &rarr;
              </div>
              
              {/* Hover border effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#ede7d3]/50 rounded-2xl transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }

        .animate-fade-slide-in {
          animation: fadeSlideIn 0.8s ease-out;
        }

        @media (max-width: 768px) {
          .animate-fade-slide-in {
            animation: fadeIn 0.8s ease-out;
          }
          
          .flex-col.md\\:flex-row {
            flex-direction: column !important;
          }
          .md\\:max-w-[340px] {
            max-width: 100% !important;
          }
          .md\\:w-[30%] {
            width: 100% !important;
          }
          .flex-1 {
            min-height: 50vh !important;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .md\\:w-[30%] {
            width: 35% !important;
          }
        }

        @media (min-width: 1400px) {
          .md\\:w-[30%] {
            width: 28% !important;
          }
        }
      `}</style>
    </div>
  );
}