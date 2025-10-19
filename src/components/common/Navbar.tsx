import { RootState } from "@/store/store";
import Image from "next/image";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Spicy_Rice } from "next/font/google";
import Link from "next/link";
import { useAppDispatch } from "@/store/hook";
import { getStoreDetails } from "@/api/auth";

const spicy_rice = Spicy_Rice({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-courgette",
});

const Navbar = () => {
  return (
    <div className="flex gap-7 py-2 px-4  rounded-3xl bg-black/50 backdrop-blur-md">
      <div className="text-white flex gap-2 items-center justify-center">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={100}
          height={100}
          className="object-contain h-10 w-10"
        />
        <h1 className={spicy_rice.className}>FOODY</h1>
      </div>
      <div className="flex gap-6 items-center justify-center font-semibold text-sm">
        <Link href={"/menu"}>
          <p>MENU</p>
        </Link>
        <Link href={"/about"}>
          <p>ABOUT</p>
        </Link>
        <Link href={"/contact"}>
          <p>CONTACT</p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
