import { CartItem } from "@/types/type";
import React from "react";
import { Leaf, Beef, Plus, Minus, Trash2 } from "lucide-react";
import { useAppDispatch } from "@/store/hook";
import { decreaseQuantity, increaseQuantity, removeCartItem } from "@/store/features/cart.slice";

interface CartCardProps {
  item: CartItem;
}

const CartCard: React.FC<CartCardProps> = ({ item }) => {
  const { product, quantity } = item;
    const dispatch = useAppDispatch();
  const handleQuantityIncrement = () => {
    dispatch(increaseQuantity(product._id));
  };

const handleQuantityDecrement = () => {
    if (quantity > 1) {
      dispatch(decreaseQuantity(product._id));
    }
  };

  const handleRemove = () => {
    dispatch(removeCartItem(product._id));
  };

  return (
    <div className="group bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-4 border border-zinc-800/50 hover:border-zinc-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-black/20">
      <div className="flex items-start gap-4">
        {/* Product Image */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-zinc-800/50 flex items-center justify-center flex-shrink-0 overflow-hidden ring-1 ring-zinc-800/50">
          {product.image?.url ? (
            <img
              src={product.image.url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-3xl sm:text-4xl font-bold text-zinc-700">
              {product.name.charAt(0).toUpperCase()}
            </span>
          )}
          {/* Food Type Badge */}
          <div className="absolute top-2 right-2">
            {product.foodType === "VEG" ? (
              <span className="flex items-center justify-center w-5 h-5 bg-zinc-900/80 backdrop-blur-sm border-2 border-green-500 rounded">
                <Leaf className="w-2.5 h-2.5 text-green-500" />
              </span>
            ) : (
              <span className="flex items-center justify-center w-5 h-5 bg-zinc-900/80 backdrop-blur-sm border-2 border-red-500 rounded">
                <Beef className="w-2.5 h-2.5 text-red-500" />
              </span>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="text-zinc-100 font-semibold text-base sm:text-lg leading-tight">
                {product.name}
              </h3>
              <button
                onClick={handleRemove}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 flex-shrink-0"
                aria-label="Remove item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-zinc-400 text-sm mb-3">₹{product.price} each</p>
          </div>

          {/* Quantity Controls & Total */}
          <div className="flex items-center justify-between gap-3">
            {/* Quantity Controls */}
            <div className="flex items-center gap-2 bg-zinc-800/50 rounded-lg p-1 ring-1 ring-zinc-800">
              <button
                onClick={handleQuantityDecrement}
                disabled={quantity <= 1}
                className="w-7 h-7 rounded-md bg-zinc-700/50 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed text-zinc-300 hover:text-white transition-all duration-200 flex items-center justify-center"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center font-semibold text-zinc-100 text-sm">
                {quantity}
              </span>
              <button
                onClick={handleQuantityIncrement}
                className="w-7 h-7 rounded-md bg-zinc-700/50 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-all duration-200 flex items-center justify-center"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Item Total */}
            <div className="text-right">
              <p className="text-xs text-zinc-500 mb-0.5">Total</p>
              <p className="text-zinc-100 font-bold text-lg">
                ₹{(product.price * quantity).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;