"use client";
import { JSX, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store/hook";
import { RootState } from "@/store/store";
import { getProductsByCart } from "@/api/cart";
import CartCard from "@/components/cart/CartCard";
import {
  ShoppingBag,
  ArrowRight,
  Package,
  Banknote,
  CreditCard,
  Loader2,
} from "lucide-react";
import { SparklesText } from "@/components/ui/sparkles-text";
import { PaymentMethod } from "@/constants/typeConstants";
import {
  createCashOrder,
  createOnlineOrder,
  openPaymentPopup,
} from "@/api/order";
import { OrderItem } from "@/types/type";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.CartItems);
  const dispatch = useAppDispatch();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.CASH
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

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

  const user = useSelector((state: RootState) => state.auth.user);
  const { subtotal, itemCount } = useMemo(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    return { subtotal, itemCount };
  }, [cartItems]);

  const orderItems: OrderItem[] = cartItems.map((item) => ({
    product: item.product._id,
    quantity: item.quantity,
  }));

  const handleProceedToBuy = async () => {
    if (isSubmitting) return;
    if (!orderItems.length) {
      alert("Cart is empty!");
      return;
    }

    if (!user) {
      toast.error("Please login to place order.");
      router.push("/login");
      return;
    }

    setIsSubmitting(true);
    try {
      if (paymentMethod === PaymentMethod.CASH) {
        const orderSuccess = await dispatch(createCashOrder(orderItems));
        if (orderSuccess) {
          router.push("/profile");
        } else {
          console.error("Order creation failed");
        }
      } else {
        const orderRes = await dispatch(createOnlineOrder(orderItems));
        if (!orderRes) {
          console.error("Payment initiation failed");
          return;
        }
        openPaymentPopup(orderRes);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error processing order:", error.message);
      } else {
        console.error("Unknown error processing order");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-black text-zinc-100 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-zinc-100 flex items-center gap-3">
              <ShoppingBag className="w-8 h-8" />
              Your Cart
            </h1>
          </div>
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

  const PaymentTile = ({
    label,
    value,
    selected,
    onClick,
    icon,
  }: {
    label: string;
    value: PaymentMethod;
    selected: boolean;
    onClick: () => void;
    icon: JSX.Element;
  }) => (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        "flex-1 flex items-center gap-3 rounded-xl border p-4 transition-all",
        "bg-zinc-900/40 hover:bg-zinc-900/70 border-zinc-800",
        selected
          ? "ring-2 ring-blue-500 border-blue-500 shadow-md shadow-blue-500/10"
          : "ring-0",
      ].join(" ")}
    >
      <span
        className={[
          "grid place-items-center w-10 h-10 rounded-lg",
          selected
            ? "bg-blue-500/15 text-blue-400 border border-blue-500/40"
            : "bg-zinc-800 text-zinc-300 border border-zinc-700",
        ].join(" ")}
      >
        {icon}
      </span>
      <div className="text-left">
        <div className="font-semibold">{label}</div>
        <div className="text-xs text-zinc-500">
          {value === PaymentMethod.CASH
            ? "Pay on delivery"
            : "UPI / Card / Netbanking / Wallet"}
        </div>
      </div>
      <span className="ml-auto">
        <span
          className={[
            "inline-block w-3 h-3 rounded-full",
            selected
              ? "bg-blue-500 shadow-[0_0_0_3px] shadow-blue-500/25"
              : "bg-zinc-600",
          ].join(" ")}
        />
      </span>
    </button>
  );

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

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800/50 shadow-xl shadow-black/20">
                <h2 className="text-xl font-bold text-zinc-100 mb-6">
                  Order Summary
                </h2>

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
                    <p className="mt-1 text-xs text-zinc-500">
                      Inclusive of all taxes
                    </p>
                  </div>
                </div>

                {/* Improved Payment Method Selector */}
                <div className="mb-6">
                  <label className="block text-zinc-300 font-semibold mb-2">
                    Select Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <PaymentTile
                      label="Cash"
                      value={PaymentMethod.CASH}
                      selected={paymentMethod === PaymentMethod.CASH}
                      onClick={() => setPaymentMethod(PaymentMethod.CASH)}
                      icon={<Banknote className="w-5 h-5" />}
                    />
                    <PaymentTile
                      label="Online"
                      value={PaymentMethod.ONLINE}
                      selected={paymentMethod === PaymentMethod.ONLINE}
                      onClick={() => setPaymentMethod(PaymentMethod.ONLINE)}
                      icon={<CreditCard className="w-5 h-5" />}
                    />
                  </div>
                </div>

                <button
                  onClick={handleProceedToBuy}
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className={[
                    "w-full text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2",
                    "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30",
                    isSubmitting
                      ? "opacity-70 cursor-not-allowed hover:from-blue-600 hover:to-blue-500"
                      : "hover:scale-[1.02] active:scale-[0.98] cursor-pointer",
                  ].join(" ")}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Proceed to Order
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                {/* Small reassurance text */}
                <p className="mt-3 text-xs text-zinc-500">
                  Secure payments powered by Razorpay. Your order will appear in
                  your profile once placed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
