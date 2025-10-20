import React from "react";
import { Category } from "@/types/type";
import { SparklesText } from "../ui/sparkles-text";

interface FoodCategoriesProps {
  categories: Category[];
  selectedCategory?: string;
  onCategorySelect: (categoryId: string) => void;
}

const FoodCategories: React.FC<FoodCategoriesProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="w-full mx-auto md:p-2 py-8">
      <div className="text-center mb-12 space-y-2">
        <SparklesText>
          Food Menu
        </SparklesText>
        <p className="text-gray-200 text-sm">Discover your favorite dishes</p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6 sm:gap-8">
        {categories.map((category, index) => (
          <div
            key={category._id}
            className={`flex flex-col items-center gap-3 group cursor-pointer transition-all duration-300 ease-out ${
              selectedCategory === category._id ? "scale-105" : "hover:-translate-y-1"
            }`}
            onClick={() => onCategorySelect(category._id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onCategorySelect(category._id);
              }
            }}
            tabIndex={0}
            role="button"
            aria-pressed={selectedCategory === category._id}
            style={{
              animation: `fadeInUp 0.5s ease-out ${index * 0.04}s both`,
            }}
          >
            <div
              className={`relative w-20 h-20 rounded-full overflow-hidden transition-all duration-300 ${
                selectedCategory === category._id
                  ? "ring-[3px] ring-orange-500 ring-offset-2 shadow-lg shadow-orange-500/30"
                  : "ring-[2px] ring-gray-200/80 group-hover:ring-orange-400 group-hover:ring-offset-2 group-hover:shadow-lg group-hover:shadow-orange-400/20"
              }`}
            >
              <img
                src={category.image.url}
                alt={category.name}
                className={`w-full h-full object-cover transition-all duration-500 ${
                  selectedCategory === category._id
                    ? "scale-105"
                    : "group-hover:scale-110"
                }`}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 transition-opacity duration-300 ${
                  selectedCategory === category._id
                    ? "opacity-0"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              />
              {selectedCategory === category._id && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                  <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md animate-scaleIn">
                    <svg
                      className="w-4 h-4 text-orange-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
            <h3
              className={`text-center font-semibold text-xs transition-all duration-300 leading-tight ${
                selectedCategory === category._id
                  ? "text-orange-500"
                  : "text-gray-200 group-hover:text-orange-500"
              }`}
            >
              {category.name.toString().toUpperCase()}
            </h3>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default FoodCategories;