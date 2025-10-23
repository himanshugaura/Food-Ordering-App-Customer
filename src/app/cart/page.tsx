"use client";
import { getProductsByCart } from "@/api/cart";
import CartCard from "@/components/cart/CartCard";
import { useAppDispatch } from "@/store/hook";
import { RootState } from "@/store/store";
import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { ShoppingBag, ArrowRight, Package } from "lucide-react";
import { SparklesText } from "@/components/ui/sparkles-text";

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.CartItems);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        await dispatch(getProductsByCart());
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCartData();
  }, [dispatch]);

  // Calculate totals
  const { subtotal, itemCount } = useMemo(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    return { subtotal, itemCount };
  }, [cartItems]);

  const handleProceedToBuy = () => {
    // TODO: Navigate to checkout
    console.log("Proceed to checkout");
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-black text-zinc-100 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-zinc-100 flex items-center gap-3">
              <ShoppingBag className="w-8 h-8" />
              Your Cart
            </h1>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-16 sm:py-24">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
              <Package className="w-12 h-12 sm:w-16 sm:h-16 text-zinc-700" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-zinc-300 mb-2">
              Your cart is empty
            </h2>
            <p className="text-zinc-500 text-sm sm:text-base">
              Add items to get started
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <SparklesText>
            <h1 className="text-3xl sm:text-4xl font-bold text-zinc-100 flex items-center gap-3 mb-2">
              <ShoppingBag className="w-8 h-8" />
              Your Cart
            </h1>
          </SparklesText>
          <p className="text-zinc-400 text-sm sm:text-base">
            {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartCard key={item.product._id} item={item} />
            ))}
          </div>

          {/* Order Summary - Sticky on desktop */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800/50 shadow-xl shadow-black/20">
                <h2 className="text-xl font-bold text-zinc-100 mb-6">
                  Order Summary
                </h2>

                {/* Summary Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>Items ({itemCount})</span>
                    <span className="text-zinc-300">
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="border-t border-zinc-800 pt-4">
                    <div className="flex items-center justify-between text-lg font-bold">
                      <span className="text-zinc-100">Total</span>
                      <span className="text-zinc-100">
                        ₹{subtotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Proceed to Buy Button */}
                <button
                  onClick={handleProceedToBuy}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  Proceed to Buy
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
