"use client";
import Navbar from "@/components/common/Navbar";
import Image from "next/image";
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
      <div className="flex flex-col md:flex-col lg:flex-row gap-4 rounded-3xl overflow-hidden h-full relative">
        {/* Hero Section */}
        <div className="flex-1 relative flex items-end md:items-end justify-start overflow-hidden min-h-[70vh] md:min-h-[50vh] h-[100vh] shadow-2xl animate-fade-in duration-700">
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 md:hidden">
            <Navbar />
          </div>
          <div className="hidden md:block absolute top-10 left-10 z-20">
            <Navbar />
          </div>
          <video 
            className="w-full rounded-3xl h-full object-cover absolute inset-0 opacity-90" 
            autoPlay
            muted
            playsInline
            loop
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>

          <div className="relative z-10 p-8 md:p-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold text-white drop-shadow-2xl tracking-wide leading-tight">
              FOOD <br />
              SENSATION
            </h1>
          </div>
        </div>

        {/* Sidebar Images */}
        <div className="grid grid-cols-1 grid-rows-3 md:grid-rows-1 md:grid-cols-3 gap-4 w-full lg:w-[23%] lg:grid-cols-1 lg:grid-rows-3 h-full">
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl overflow-hidden relative group cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 animate-fade-slide-in sidebar-item"
              style={{ 
                animationDelay: item.delay,
                opacity: 0,
                animationFillMode: 'forwards'
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={200}
                height={200}
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

      {/* Animations and Responsive Height */}
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
          /* Increase hero section height */
          .flex-1 {
            min-height: 70vh !important;
            height: auto !important;
          }

          /* Decrease sidebar item height */
          .sidebar-item {
            min-height: 30vh;
            max-height: 30vh;
            height: 28vw;
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