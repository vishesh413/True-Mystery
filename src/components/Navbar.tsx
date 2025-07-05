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
      <div className="container mx-auto relative flex flex-nowrap justify-between items-center h-full gap-4">
        {/* Left - Logo */}
        <Link
          href="/"
          className="text-2xl md:text-3xl font-black tracking-tight flex items-center gap-3
            bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-500 bg-clip-text text-transparent
            hover:brightness-125 transition duration-300 whitespace-nowrap"
        >
          <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 animate-pulse drop-shadow-md" />
          Mystery Threads
        </Link>

        {/* Center - Welcome Message */}
        {session && (
          <div
            className="
              absolute 
              left-1/2 
              top-[2.2rem] md:top-1/2 
              transform 
              -translate-x-1/2 
              md:-translate-y-1/2
              text-center
              hidden md:block
            "
          >
            <span className="text-sm md:text-base text-cyan-300 font-medium whitespace-nowrap">
              Welcome, {user?.username || user?.email}
            </span>
          </div>
        )}

        {/* Right - Auth Button */}
        {session ? (
          <div className="flex items-center gap-4 whitespace-nowrap">
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
          <Link href="/sign-in" className="whitespace-nowrap">
            <h1
              className="text-base md:text-lg font-bold py-2 px-6
                bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white
                rounded-lg hover:scale-105 active:scale-95 transition duration-200"
            >
              <Cover>Login</Cover>
            </h1>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
