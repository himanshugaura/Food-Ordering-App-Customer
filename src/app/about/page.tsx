"use client";
import AboutCard1 from "@/components/about/AboutCard1";
import AboutCard2 from "@/components/about/AboutCard2";
import Ratings from "@/components/about/Ratings";
import Navbar from "@/components/common/Navbar";
import { SparklesText } from "@/components/ui/sparkles-text";
import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <div className="min-h-screen md:h-screen w-full p-2 md:p-4">
      <div className="flex flex-col md:flex-col lg:flex-row gap-4 rounded-3xl overflow-hidden h-full relative">
        {/* Hero Section */}
        <div className="flex-1 relative flex items-end md:items-end justify-start overflow-hidden min-h-[50vh] md:min-h-[50vh] shadow-2xl animate-fade-in duration-700">
          {/* Navbar overlays */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 md:hidden">
            <Navbar />
          </div>
          <div className="hidden md:block absolute top-10 left-10 z-20">
            <Navbar />
          </div>
          <Image
            src={"/hero_about.webp"}
            alt="hero image"
            width={1920}
            height={1080}
            quality={100}
            className="w-full rounded-3xl h-full object-cover opacity-70 absolute inset-0"
          />

          <div className="relative z-10 p-8 md:p-16 animate-fade-in">
            <SparklesText className="text-5xl md:text-6xl lg:text-8xl font-bold text-white drop-shadow-2xl tracking-wide leading-tight">
              ABOUT
            </SparklesText>
          </div>
        </div>

        <div className="w-full lg:w-[50%] h-full flex flex-col gap-8">
          <AboutCard1 />
          <Ratings />
          <AboutCard2 />
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
          /* Reduce hero section height on mobile */
          .flex-1 {
            min-height: 40vh !important;
            height: auto !important;
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
