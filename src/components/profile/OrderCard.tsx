import { OrderStatus, FoodType } from "@/constants/typeConstants";
import { Orders } from "@/types/type";
import { Plus, Package, Leaf, Drumstick } from "lucide-react";
import Image from "next/image";
import React from "react";

const statusStyles: Record<string, string> = {
  [OrderStatus.PENDING]: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  [OrderStatus.COOKING]: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  [OrderStatus.DELIVERED]: "bg-green-500/10 text-green-400 border border-green-500/20",
  [OrderStatus.CANCELLED]: "bg-red-500/10 text-red-400 border border-red-500/20",
};
    
function utcToISTString(utcDateString: string) {
  const utcDate = new Date(utcDateString);
  return utcDate.toLocaleString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  });
}

const renderProductIcon = (foodType: string) =>
  foodType === FoodType.VEG ? (
    <span className="flex items-center justify-center w-5 h-5 border-2 border-green-500 rounded">
      <Leaf className="w-3 h-3 text-green-500" />
    </span>
  ) : (
    <span className="flex items-center justify-center w-5 h-5 border-2 border-red-500 rounded">
      <Drumstick className="w-3 h-3 text-red-500" />
    </span>
  );

interface OrderCardProps {
  order: Orders;
  isExpanded: boolean;
  toggleOrderExpansion: (orderId: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, isExpanded, toggleOrderExpansion }) => {
  const itemsToShow = isExpanded ? order.orderItems : order.orderItems.slice(0, 2);

  return (
    <div className="bg-zinc-800 rounded-xl p-4 border border-zinc-700">
      {/* Order Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-700">
        <div>
          <h3 className="text-zinc-100 font-medium">Order #{order.orderNo}</h3>
          <p className="text-xs text-zinc-500">
            {utcToISTString(order.createdAt.toString())}
          </p>
        </div>
        <div className="text-right">
          <p className="text-zinc-100 font-semibold">₹{order.totalAmount.toFixed(2)}</p>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              statusStyles[order.status] || ""
            }`}
          >
            {order.status}
          </span>
        </div>
      </div>
      {/* Order Items */}
      <div className="space-y-3">
        {itemsToShow.map((item, index: number) => (
          <div key={index} className="flex items-center justify-between py-2 border-b border-zinc-700 last:border-b-0">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-12 h-12 rounded-lg bg-zinc-900 flex items-center justify-center flex-shrink-0">
                {item.product.image?.url ? (
                  <Image
                    width={48}
                    height={48}
                    quality={100}
                    src={item.product.image.url}
                    alt={item.product.name}
                    className="object-cover w-12 h-12 rounded-lg"
                  />
                ) : (
                  <Package className="w-6 h-6 text-zinc-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-zinc-200 font-medium text-sm truncate">{item.product.name}</h4>
                  {renderProductIcon(item.product.foodType)}
                </div>
                <p className="text-xs text-zinc-500">Qty: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="text-zinc-100 font-semibold text-sm">
                  ₹{(item.product.price * item.quantity).toFixed(2)}
                </p>
                <p className="text-xs text-zinc-500">₹{item.product.price} each</p>
              </div>
            </div>
          </div>
        ))}
        {order.orderItems.length > 2 && (
          <button
            onClick={() => toggleOrderExpansion(order._id)}
            className="w-full flex items-center justify-center gap-2 py-2 text-violet-400 hover:text-violet-300 transition-colors text-sm font-medium"
          >
            <Plus className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-45" : ""}`} />
            {isExpanded ? "Show Less" : `Show ${order.orderItems.length - 2} more items`}
          </button>
        )}
      </div>
    </div>
  );
};
export default OrderCard;