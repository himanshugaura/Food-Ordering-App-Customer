import React from "react";

interface CheckoutButtonProps {
  orderId: string; // razorpayOrderId from backend
  amount: number;  // in INR
  currency: string;
  userName: string;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  orderId,
  amount,
  currency,
  userName,
}) => {
  const handlePayment = () => {
    const options: any = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amount * 100, 
      currency,
      name: "Foody",
      description: "Order Payment",
      order_id: orderId,
      prefill: {
        name: userName,
      },
      theme: {
        color: "#2563EB",
      },
      handler: function (response: any) {
        // Payment completed, call backend to confirm signature
        fetch("/api/payment/success", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          }),
        })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              alert("Payment successful!");
            } else {
              alert("Payment verification failed!");
            }
          });
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <button
      onClick={handlePayment}
      className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
    >
      Pay Now
    </button>
  );
};

export default CheckoutButton;
