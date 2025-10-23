"use client"

import { logout } from "@/api/auth"
import { useAppDispatch } from "@/store/hook"
import { User, Package, LogOut, ChevronDown, Leaf, Drumstick } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useSelector } from "react-redux"

const Profile = () => {
    const user = useSelector((state: any) => state.auth.user);
  const [activeTab, setActiveTab] = useState<"current" | "previous">("current")
  const [selectedMonth, setSelectedMonth] = useState("all")
    const dispatch = useAppDispatch();
    const router = useRouter();
  const handleLogout = async() => {
        try {
           const res = await dispatch(logout());
           if(res) {
            router.push("/login");
           }
        } catch (error) {
            console.error("Error during logout:", error);
        }  
  }

  const currentOrders = [
    {
      orderNo: "ORD-2024-1247",
      product: "Paneer Tikka Masala",
      quantity: 2,
      price: 899,
      status: "Preparing",
      isVeg: true,
      image: "🍛"
    },
    {
      orderNo: "ORD-2024-1248",
      product: "Butter Chicken",
      quantity: 1,
      price: 549,
      status: "Out for Delivery",
      isVeg: false,
      image: "🍗"
    }
  ]

  const previousOrders = [
    {
      orderNo: "ORD-2024-1201",
      product: "Margherita Pizza",
      quantity: 1,
      price: 399,
      status: "Delivered",
      isVeg: true,
      image: "🍕",
      month: "October"
    },
    {
      orderNo: "ORD-2024-1156",
      product: "Chicken Biryani",
      quantity: 2,
      price: 998,
      status: "Delivered",
      isVeg: false,
      image: "🍚",
      month: "September"
    },
    {
      orderNo: "ORD-2024-1089",
      product: "Veg Spring Rolls",
      quantity: 3,
      price: 450,
      status: "Delivered",
      isVeg: true,
      image: "🥟",
      month: "September"
    },
    {
      orderNo: "ORD-2024-0987",
      product: "Grilled Fish",
      quantity: 1,
      price: 749,
      status: "Delivered",
      isVeg: false,
      image: "🐟",
      month: "August"
    }
  ]

  const filteredOrders = selectedMonth === "all" 
    ? previousOrders 
    : previousOrders.filter(order => order.month === selectedMonth)

  const months = ["all", "October", "September", "August"]

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
            <h1 className="text-2xl font-semibold text-zinc-50 mb-1">
              {user?.name || "John Doe"}
            </h1>
            <p className="text-zinc-500">@{user?.username}</p>
          </div>

          <button className="w-full flex items-center gap-3 px-4 py-3.5 bg-zinc-800 rounded-xl text-left transition-colors border border-zinc-700 cursor-pointer"
          onClick={handleLogout}>
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
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full appearance-none bg-zinc-800 text-zinc-200 px-4 py-3 rounded-xl border border-zinc-700 focus:outline-none focus:border-violet-500 cursor-pointer"
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month === "all" ? "All Months" : month}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 pointer-events-none" />
              </div>
            </div>
          )}

          {/* Orders List */}
          <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
            {activeTab === "current" ? (
              currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                  <div
                    key={order.orderNo}
                    className="bg-zinc-800 rounded-xl p-4 border border-zinc-700"
                  >
                    <div className="flex items-start gap-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 rounded-lg bg-zinc-900 flex items-center justify-center text-4xl flex-shrink-0">
                        {order.image}
                      </div>

                      {/* Order Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1">
                            <h3 className="text-zinc-100 font-medium mb-1 flex items-center gap-2">
                              {order.product}
                              {order.isVeg ? (
                                <span className="flex items-center justify-center w-5 h-5 border-2 border-green-500 rounded">
                                  <Leaf className="w-3 h-3 text-green-500" fill="currentColor" />
                                </span>
                              ) : (
                                <span className="flex items-center justify-center w-5 h-5 border-2 border-red-500 rounded">
                                  <Drumstick className="w-3 h-3 text-red-500" fill="currentColor" />
                                </span>
                              )}
                            </h3>
                            <p className="text-xs text-zinc-500 mb-2">{order.orderNo}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-zinc-100 font-semibold">₹{order.price}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <p className="text-sm text-zinc-400">Qty: {order.quantity}</p>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
                  <p className="text-zinc-500">No current orders</p>
                </div>
              )
            ) : filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <div
                  key={order.orderNo}
                  className="bg-zinc-800 rounded-xl p-4 border border-zinc-700"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-lg bg-zinc-900 flex items-center justify-center text-4xl flex-shrink-0">
                      {order.image}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1">
                          <h3 className="text-zinc-100 font-medium mb-1 flex items-center gap-2">
                            {order.product}
                            {order.isVeg ? (
                              <span className="flex items-center justify-center w-5 h-5 border-2 border-green-500 rounded">
                                <Leaf className="w-3 h-3 text-green-500" fill="currentColor" />
                              </span>
                            ) : (
                              <span className="flex items-center justify-center w-5 h-5 border-2 border-red-500 rounded">
                                <Drumstick className="w-3 h-3 text-red-500" fill="currentColor" />
                              </span>
                            )}
                          </h3>
                          <p className="text-xs text-zinc-500 mb-2">{order.orderNo}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-zinc-100 font-semibold">₹{order.price}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-sm text-zinc-400">Qty: {order.quantity}</p>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
                <p className="text-zinc-500">No orders found for {selectedMonth}</p>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-zinc-600 text-sm">Member since {user?.createdAt.split("T")[0]}</p>
        </div>
      </div>
    </div>
  )
}

export default Profile