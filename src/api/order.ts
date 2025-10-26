import { apiConnector } from "@/utils/apiConnector";
import toast from "react-hot-toast";
import { OrderEndpoints, RazorpayEndpoints } from "./apis";
import { OnlineOrderResponse, OrderItem, PaymentResponse, RazorpayInstance, RazorpayOptions } from "@/types/type";
// Cash order
export const createCashOrder = (orderItems: OrderItem[]) => async (): Promise<boolean> => {
  try {
    const res = await apiConnector("POST", OrderEndpoints.PLACE_CASH_ORDER, { orderItems });
    if (res.success) {
      toast.success("Order placed successfully");
      return true;
    } else {
      toast.error(res.message || "Order placement failed");
      return false;
    }
  } catch (error) {
    console.error("Create order error:", error);
    toast.error("Unable to place order");
    return false;
  }
};

// Online order
export const createOnlineOrder = (orderItems: OrderItem[]) => async (): Promise<OnlineOrderResponse | null> => {
  try {
    const res = await apiConnector("POST", OrderEndpoints.PLACE_ONLINE_ORDER, { orderItems });
    if (res.success && res.data) {
      toast.success("Order placed successfully");
      return res.data as OnlineOrderResponse;
    } else {
      toast.error(res.message || "Order placement failed");
      return null;
    }
  } catch (error) {
    console.error("Create order error:", error);
    toast.error("Unable to place order");
    return null;
  }
};

// Helper to cancel unpaid order on client action (popup closed)
async function cancelUnpaidOrderClient(params: { razorpayOrderId?: string; orderId?: string }) {
  try {
    await apiConnector("POST", RazorpayEndpoints.CANCEL_UNPAID_ORDER, params);
  } catch (e) {
    // Silent fail; server also handles webhook-based cleanup on payment.failed
    console.warn("Cancel unpaid order request failed", e);
  }
}

export const openPaymentPopup = async (
  paymentInitiated: OnlineOrderResponse,
  onSuccess?: () => void
): Promise<void> => {
  const options: RazorpayOptions = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
    amount: paymentInitiated.totalAmount * 100,
    currency: "INR",
    name: "Foody",
    description: "Order Payment",
    order_id: paymentInitiated.razorpayOrderId,
    method: {
      upi: true,
      card: true,
      netbanking: true,
      wallet: true,
    },
    handler: async (paymentResponse: PaymentResponse) => {
      try {
        const verifyRes = await apiConnector("POST", RazorpayEndpoints.VERIFY_PAYMENT, {
          razorpay_payment_id: paymentResponse.razorpay_payment_id,
          razorpay_order_id: paymentResponse.razorpay_order_id,
          razorpay_signature: paymentResponse.razorpay_signature,
        });

        if (verifyRes.success) {
          toast.success("Payment successful!");
          if (onSuccess) onSuccess();
        } else {
          await cancelUnpaidOrderClient({ razorpayOrderId: paymentInitiated.razorpayOrderId });
          toast.error("Payment verification failed!");
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        await cancelUnpaidOrderClient({ razorpayOrderId: paymentInitiated.razorpayOrderId });
        toast.error("Payment verification failed!");
      }
    },
    modal: {
      ondismiss: async () => {
        await cancelUnpaidOrderClient({ razorpayOrderId: paymentInitiated.razorpayOrderId });
        toast.error("Payment cancelled. Order removed.");
      },
    },
  };

  if (typeof window !== "undefined" && window.Razorpay) {
    const rzp: RazorpayInstance = new window.Razorpay(options);
    rzp.open();
  } else {
    toast.error("Razorpay SDK not loaded");
  }
};