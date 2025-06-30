"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Sparkles } from "lucide-react";
import { Cover } from "./ui/cover";
import { User } from "next-auth";

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <nav className="w-full z-50 p-4 md:p-6 bg-gradient-to-br from-black via-gray-900 to-black shadow-[0_0_40px_5px_rgba(0,255,255,0.15)] border-b border-cyan-400/20 backdrop-blur-xl">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left: Logo */}
        <Link
          href="/"
          className="text-3xl font-black tracking-tight flex items-center gap-3 bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-500 bg-clip-text text-transparent hover:brightness-125 transition duration-300"
        >
          <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse drop-shadow-md" />
          True Mystery
        </Link>

        {/* Right: Session check */}
        {session ? (
          <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
            <span className="text-sm text-cyan-300 font-medium">
              Welcome, {user.username || user.email}
            </span>
            <button
              onClick={() => signOut()}
              className="text-xl md:text-2xl lg:text-2xl font-semibold text-center relative z-20 py-3 px-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 from-neutral-800 via-white to-white transition-all hover:scale-105 active:scale-95 duration-200 cursor-pointer rounded-xl"
            >
              <Cover>Logout</Cover>
            </button>
          </div>
        ) : (
          <Link href="/sign-in">
            <h1 className="text-xl md:text-2xl lg:text-2xl font-semibold text-center relative z-20 py-3 px-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 from-neutral-800 via-white to-white transition-all hover:scale-105 active:scale-95 duration-200 cursor-pointer rounded-xl">
              <Cover>Login</Cover>
            </h1>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
