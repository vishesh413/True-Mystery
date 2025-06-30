'use client';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { verifySchema } from '@/schemas/verifySchema';
import { StarsBackground } from '@/components/ui/stars-background';
import { ShootingStars } from '@/components/ui/shooting-stars';
import { toast } from 'sonner'; // 🔥 Sonner import

export default function VerifyAccount() {
  const router = useRouter();
  const params = useParams<{ username: string }>();

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const response = await axios.post<ApiResponse>(`/api/verify-code`, {
        username: params.username,
        code: data.code,
      });

      toast.success(response.data.message); // ✅ Sonner toast success

      router.replace('/sign-in');
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data.message ?? 'An error occurred. Please try again.'
      ); // ✅ Sonner toast error
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-4 py-10">
      <StarsBackground />
      <ShootingStars />

      <div className="relative w-full max-w-md z-10 group">
        <div className="absolute -inset-[2px] bg-cyan-300 rounded-[inherit] blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

        <div className="relative px-10 py-12 bg-black/60 backdrop-blur-xl rounded-2xl border border-cyan-400 group-hover:shadow-[0_0_20px_3px_rgba(0,255,255,0.2)] transition duration-300 space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-purple-400 mb-3 animate-fade-in">
              Verify Your Account
            </h1>
            <p className="text-gray-300 animate-fade-in delay-100">
              Enter the 6-digit code sent to your email
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7 animate-fade-in delay-200">
              <FormField
                name="code"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Verification Code</FormLabel>
                    <Input
                      {...field}
                      placeholder="e.g. 123456"
                      className="bg-white/20 text-white placeholder:text-white/60 border-white/30 focus:ring-2 focus:outline-none"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <button
                type="submit"
                className="group relative px-8 py-3 rounded-md bg-black text-cyan-400 font-bold tracking-widest uppercase text-sm border border-cyan-500/50 hover:border-cyan-500 transition-all duration-300 ease-in-out hover:text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:shadow-[0_0_35px_rgba(34,211,238,0.45)] active:translate-y-1 active:shadow-[0_0_15px_rgba(34,211,238,0.45)] active:scale-[0.98] w-full"
              >
                <span className="flex items-center justify-center gap-3 relative z-10">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 transition-transform duration-300 group-hover:scale-125"
                  >
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  Verify
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 transition-all duration-300 group-hover:-rotate-45 group-hover:scale-150"
                  >
                    <path d="M12 2v20m0-20L4 12m8-10l8 10"></path>
                  </svg>
                </span>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-600/25 to-blue-600/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl rounded-md" />
                <div className="absolute -inset-1 -z-10 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-20 group-hover:opacity-30 blur-xl rounded-md transition-all duration-300 group-hover:blur-2xl" />
              </button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
