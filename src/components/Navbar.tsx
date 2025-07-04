"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Sparkles } from "lucide-react";
import { Cover } from "./ui/cover";
import { User } from "next-auth";
import { usePathname } from "next/navigation";

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user as User;
  const pathname = usePathname();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 0 || pathname === "/" || pathname === "/dashboard") {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    checkScroll();
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, [pathname]);

  useEffect(() => {
    // Add margin-top to body on /dashboard to prevent overlap
    if (pathname === "/dashboard") {
      document.body.classList.add("pt-navbar");
    } else {
      document.body.classList.remove("pt-navbar");
    }
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 min-h-[3.5rem] md:min-h-[4rem] p-2 md:p-4 transition-all duration-500
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}
        bg-gradient-to-br from-black via-gray-900 to-black
        shadow-[0_0_40px_5px_rgba(0,255,255,0.15)] border-b border-cyan-400/20 backdrop-blur-xl`}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center h-full">
        <Link
          href="/"
          className="text-2xl md:text-3xl font-black tracking-tight flex items-center gap-3
            bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-500 bg-clip-text text-transparent
            hover:brightness-125 transition duration-300"
        >
          <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 animate-pulse drop-shadow-md" />
          True Mystery
        </Link>

        {session ? (
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 mt-2 md:mt-0">
            <span className="text-sm md:text-base text-cyan-300 font-medium">
              Welcome, {user?.username || user?.email}
            </span>
            <button
              onClick={() => signOut()}
              className="text-base md:text-lg font-bold py-2 px-6
                bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white
                rounded-lg hover:scale-105 active:scale-95 transition duration-200"
            >
              <Cover>Logout</Cover>
            </button>
          </div>
        ) : (
          <Link href="/sign-in">
            <h1 className="text-base md:text-lg font-bold py-2 px-6
              bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white
              rounded-lg hover:scale-105 active:scale-95 transition duration-200">
              <Cover>Login</Cover>
            </h1>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
