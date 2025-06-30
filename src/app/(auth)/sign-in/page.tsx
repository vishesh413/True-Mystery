"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { Eye, EyeOff, Loader2, Mail, Lock } from "lucide-react";

import { signInSchema } from "@/schemas/signinSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";

export default function SignInPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        identifier: data.identifier,
        password: data.password,
      });

      if (result?.error) {
        toast.error("Login Failed", {
          description: "Incorrect username or password",
        });
        return;
      }

      if (result?.url) {
        toast.success("Login successful!");
        router.replace("/dashboard");
      }
    } catch (error) { 
      toast.error("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white px-6 py-12 overflow-hidden">
      <StarsBackground />
      <ShootingStars />

      <div className="relative w-full max-w-md z-10 group">
        <div className="absolute -inset-[2px] bg-cyan-300 rounded-[inherit] blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

        <div className="relative px-8 py-10 bg-black/60 backdrop-blur-xl rounded-2xl border border-cyan-400 group-hover:shadow-[0_0_20px_3px_rgba(0,255,255,0.2)] transition duration-300">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-extrabold text-white bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-purple-400 mb-2 animate-fade-in">
              Sign In to MysteryVerse
            </h1>
            <p className="text-gray-300 animate-fade-in delay-100">
              Welcome back to the anonymous realm
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 animate-fade-in delay-200"
            >
              <FormField
                name="identifier"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Username or Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-cyan-400" />
                        <Input
                          {...field}
                          placeholder="john@example.com"
                          className="pl-10 pr-4 bg-white/10 border border-white/10 text-white placeholder:text-white/60 rounded-xl focus:ring-[0.5px]  focus:border-white"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-cyan-400" />
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10 bg-white/10 border border-white/10 text-white placeholder:text-white/60 rounded-xl focus:ring-[0.5px] focus:border-white"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-2.5 text-cyan-300 hover:text-white"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative px-8 py-3 rounded-md bg-black text-cyan-400 font-bold tracking-widest uppercase text-sm border border-cyan-500/50 hover:border-cyan-500 transition-all duration-300 ease-in-out hover:text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:shadow-[0_0_35px_rgba(34,211,238,0.45)] active:translate-y-1 active:shadow-[0_0_15px_rgba(34,211,238,0.45)] active:scale-[0.98] w-full"
              >
                <span className="flex items-center justify-center gap-2 relative z-10">
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <svg
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-4 h-4 transition-transform duration-300 group-hover:scale-125"
                      >
                        <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg> 
                      Sign In
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-3.5 h-3.5 transition-all duration-300 group-hover:-rotate-45 group-hover:scale-150"
                      >
                        <path d="M12 2v20m0-20L4 12m8-10l8 10"></path>
                      </svg>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-600/25 to-blue-600/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl rounded-md" />
                <div className="absolute -inset-1 -z-10 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-20 group-hover:opacity-30 blur-xl rounded-md transition-all duration-300 group-hover:blur-2xl" />
              </button>
            </form>
          </Form>

          <p className="text-center text-sm text-gray-300 mt-6">
            Not a member?{' '}
            <Link href="/sign-up" className="text-cyan-400 hover:text-cyan-300 font-semibold">
              Join Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}