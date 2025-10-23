"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch } from "@/store/hook";
import { fetchProfile } from "@/api/auth";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const [loading, setLoading] = useState(!user);
  // Wrap publicRoutes in useMemo for stable reference
  const publicRoutes = useMemo(() => ["/login", "/register" , "/" , "/menu" , "/contact" , "/about" , "/cart"], []);

  useEffect(() => {
  const checkAuth = async () => {
    if (user) return setLoading(false);

    try {
      const loggedIn = await dispatch(fetchProfile());

      if (!loggedIn && !publicRoutes.includes(pathname)) {
        // Not logged in and trying to access private route
        router.replace("/login");
      }

      if (loggedIn && ["/login", "/register"].includes(pathname)) {
        // Logged in but on login/register page → redirect to home
        router.replace("/");
      } 
    } catch {
      if (!publicRoutes.includes(pathname)) {
        router.replace("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  checkAuth();
}, [user, pathname, router, dispatch , publicRoutes]);


  if (loading) return <Loader />;

  return <>{children}</>;
}