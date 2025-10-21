import { fetchAllCategories, fetchProductsByCategory } from "@/api/product";
import { useAppDispatch } from "@/store/hook";
import type { RootState } from "@/store/store";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import FoodCategories from "./FoodCategories";

const Products = () => {
  const dispatch = useAppDispatch();
  const products = useSelector((state: RootState) => state.product.products) || [];

  const rawCategories = useSelector((state: RootState) => state.product.categories);
  const categories = useMemo(
    () => rawCategories || [],
    [rawCategories]
  );
  const [queryCategory, setQueryCategory] = useState<string | undefined>(undefined);

  // Fetch categories on mount
  useEffect(() => {
    const fetchData = async () => {
      try { 
        await dispatch(fetchAllCategories());
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  // Set initial category when categories are loaded
  useEffect(() => {
    if (categories.length > 0 && !queryCategory) {
      setQueryCategory(categories[0]._id);
    }
  }, [categories, queryCategory]);

  // Fetch products when queryCategory changes
  useEffect(() => {
    const fetchData = async () => {
      if (queryCategory) {
        try { 
          await dispatch(fetchProductsByCategory(queryCategory));
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
    };
    fetchData();
  }, [dispatch, queryCategory]);

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      {/* Fixed Category Selector */}
      <div className="flex-shrink-0 p-8 pb-4">
        <FoodCategories 
          categories={categories} 
          selectedCategory={queryCategory}
          onCategorySelect={setQueryCategory}
        />
      </div>

      {/* Scrollable Products Grid */}
      <div className="flex-1 overflow-y-auto px-8 pb-8">
        <div className="w-full fade-in animate-in slide-in-from-bottom duration-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6 py-10">
            {products && products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p className="text-center text-gray-200 mt-10 col-span-full">
                No products available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;