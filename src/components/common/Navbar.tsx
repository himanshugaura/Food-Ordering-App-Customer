import { RootState } from "@/store/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spicy_Rice } from "next/font/google";
import Link from "next/link";
import { useAppDispatch } from "@/store/hook";
import { fetchProfile } from "@/api/auth";
import { ShoppingCart, User } from "lucide-react";

const spicy_rice = Spicy_Rice({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-courgette",
});

const Navbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchProfile());
      } catch (error) {
        console.error("Error fetching store details:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="relative">
      <div className="flex items-center justify-between py-2 px-4 gap-7 rounded-3xl bg-black/50 backdrop-blur-md">
        {/* Logo and Hamburger */}
        <div className="flex items-center gap-4">
          <Link href={"/"}>
            <div className="text-white flex gap-2 items-center justify-center">
              <Image
                src={"/logo.png"}
                alt="logo"
                width={1920}
                height={1080}
                quality={100}
                className="object-contain h-10 w-10"
              />
              <h1 className={spicy_rice.className}>FOODY</h1>
            </div>
          </Link>

          {/* Hamburger Menu Button - Mobile Only */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center font-semibold text-sm text-white">
          <Link href={"/menu"}>
            <p className="hover:text-gray-300 transition-colors">MENU</p>
          </Link>
          <Link href={"/about"}>
            <p className="hover:text-gray-300 transition-colors">ABOUT</p>
          </Link>
          <Link href={"/contact"}>
            <p className="hover:text-gray-300 transition-colors">CONTACT</p>
          </Link>
          <Link href={"/cart"} onClick={() => setIsMenuOpen(false)}>
            <p className="hover:text-gray-300 transition-colors">
              <ShoppingCart />
            </p>
          </Link>
          <Link href={"/profile"}>
            <div className="bg-white rounded-full flex items-center justify-center w-10 h-10 overflow-hidden">
              {user?.avatar ? (
                <Image
                  src={user.avatar}
                  alt="user-avatar"
                  width={1920}
                  height={1080}
                  quality={100}
                  className="object-cover w-10 h-10 rounded-full"
                />
              ) : (
                <User className="w-5 h-5 text-gray-700" />
              )}
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 py-4 px-4 rounded-3xl bg-black/50 backdrop-blur-md z-50">
          <div className="flex flex-col gap-4 items-center font-semibold text-sm text-white">
            <Link href={"/menu"} onClick={() => setIsMenuOpen(false)}>
              <p className="hover:text-gray-300 transition-colors">MENU</p>
            </Link>
            <Link href={"/about"} onClick={() => setIsMenuOpen(false)}>
              <p className="hover:text-gray-300 transition-colors">ABOUT</p>
            </Link>
            <Link href={"/contact"} onClick={() => setIsMenuOpen(false)}>
              <p className="hover:text-gray-300 transition-colors">CONTACT</p>
            </Link>
            <Link href={"/cart"} onClick={() => setIsMenuOpen(false)}>
              <p className="hover:text-gray-300 transition-colors">
                <ShoppingCart />
              </p>
            </Link>
            <Link href={"/profile"} onClick={() => setIsMenuOpen(false)}>
              <div className="bg-white rounded-full flex items-center justify-center w-10 h-10 overflow-hidden">
                {user?.avatar ? (
                  <Image
                    src={user.avatar}
                    alt="user-avatar"
                    width={1920}
                    height={1080}
                    quality={100}
                    className="object-cover w-10 h-10 rounded-full"
                  />
                ) : (
                  <User className="w-5 h-5 text-gray-700" />
                )}
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;