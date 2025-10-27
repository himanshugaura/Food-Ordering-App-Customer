"use client";

import { logout } from "@/api/auth";
import { getAllOrders, getPendingOrders } from "@/api/order";
import OrderCard from "@/components/profile/OrderCard";
import { useAppDispatch } from "@/store/hook";
import { RootState } from "@/store/store";
import { User, LogOut, ChevronDown, Package } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";

const months = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

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

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [activeTab, setActiveTab] = useState<"current" | "previous">("current");
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const dispatch = useAppDispatch();
  const router = useRouter();

  const pendingOrders = useSelector((state: RootState) => state.orders.pendingOrders);
  const previousOrders = useSelector((state: RootState) => state.orders.orders);

  useEffect(() => {
    if (!pendingOrders) {
      dispatch(getPendingOrders());
    }
  }, [dispatch, pendingOrders]);

  useEffect(() => {
    if (!previousOrders || previousOrders.length === 0 || activeTab === "previous") {
      dispatch(getAllOrders(selectedMonth));
    }
  }, [dispatch, selectedMonth, activeTab , previousOrders]);

  const filteredOrders = useMemo(() => {
    if (!previousOrders) return [];
    return previousOrders.filter(order => {
      const orderMonth = new Date(order.createdAt).getMonth() + 1;
      return orderMonth === selectedMonth;
    });
  }, [previousOrders, selectedMonth]);

  const handleLogout = async () => {
    try {
      const res = await dispatch(logout());
      if (res) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(orderId)) {
        newExpanded.delete(orderId);
      } else {
        newExpanded.add(orderId);
      }
      return newExpanded;
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Profile Card */}
        <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 mb-6">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                {user?.avatar ? (
                  <Image
                    width={1920}
                    height={1080}
                    quality={100}
                    src={user.avatar}
                    alt="user-avatar"
                    className="object-cover w-24 h-24 rounded-full"
                  />
                ) : (
                  <User className="w-12 h-12 text-black" strokeWidth={1.5} />
                )}
              </div>
            </div>
          </div>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-zinc-50 mb-1">{user?.name || "John Doe"}</h1>
            <p className="text-zinc-500">@{user?.username}</p>
          </div>
          <button
            className="w-full flex items-center gap-3 px-4 py-3.5 bg-zinc-800 rounded-xl text-left transition-colors border border-zinc-700 cursor-pointer hover:bg-zinc-750"
            onClick={handleLogout}
          >
            <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center">
              <LogOut className="w-5 h-5 text-red-400" strokeWidth={1.5} />
            </div>
            <span className="text-zinc-200 font-medium">Logout</span>
          </button>
        </div>

        {/* Orders Section */}
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-zinc-800">
            <button
              onClick={() => setActiveTab("current")}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === "current"
                  ? "text-violet-400 border-b-2 border-violet-400 bg-zinc-800/50"
                  : "text-zinc-500"
              }`}
            >
              Current Orders
            </button>
            <button
              onClick={() => setActiveTab("previous")}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === "previous"
                  ? "text-violet-400 border-b-2 border-violet-400 bg-zinc-800/50"
                  : "text-zinc-500"
              }`}
            >
              Previous Orders
            </button>
          </div>

          {/* Month Filter - Only for Previous Orders */}
          {activeTab === "previous" && (
            <div className="p-4 border-b border-zinc-800">
              <div className="relative">
                <select
                  value={selectedMonth}
                  onChange={e => setSelectedMonth(Number(e.target.value))}
                  className="w-full appearance-none bg-zinc-800 text-zinc-200 px-4 py-3 rounded-xl border border-zinc-700 focus:outline-none focus:border-violet-500 cursor-pointer"
                >
                  {months.map((month, idx) => (
                    <option key={month} value={idx + 1}>
                      {month}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 pointer-events-none" />
              </div>
            </div>
          )}

          {/* Orders List */}
          <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
            {activeTab === "current" ? (
              pendingOrders && pendingOrders.length > 0 ? (
                pendingOrders.map(order => (
                  <OrderCard
                    key={order._id}
                    order={order}
                    isExpanded={expandedOrders.has(order._id)}
                    toggleOrderExpansion={toggleOrderExpansion}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
                  <p className="text-zinc-500">No current orders</p>
                </div>
              )
            ) : filteredOrders && filteredOrders.length > 0 ? (
              filteredOrders.map(order => (
                <OrderCard
                  key={order._id}
                  order={order}
                  isExpanded={expandedOrders.has(order._id)}
                  toggleOrderExpansion={toggleOrderExpansion}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
                <p className="text-zinc-500">
                  No orders found for {months[selectedMonth - 1]}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="text-center mt-6">
          <p className="text-zinc-600 text-sm">
            Member since {user?.createdAt ? utcToISTString(user.createdAt.toString()).split(",")[0] : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;