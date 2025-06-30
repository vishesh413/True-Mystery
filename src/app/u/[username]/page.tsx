'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import * as z from 'zod';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { messageSchema } from '@/schemas/messageSchema';
import { StarsBackground } from '@/components/ui/stars-background';
import { ShootingStars } from '@/components/ui/shooting-stars';
import { motion } from 'framer-motion';

const specialChar = '||';
const initialSuggestions = [
  'Your top 3 favorite songs?',
  'A message to your future self?',
  'One thing you regret not doing?',
];

export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch('content');

  const [isLoading, setIsLoading] = useState(false);
  const [isSuggestLoading, setIsSuggestLoading] = useState(false);
  const [suggestedMessages, setSuggestedMessages] = useState<string[]>(initialSuggestions);

  const handleMessageClick = (message: string) => {
    form.setValue('content', message);
  };

  const fetchSuggestedMessages = async () => {
    setIsSuggestLoading(true);
    try {
      const res = await axios.post('/api/suggest-messages', null);
      if (res.status === 200 && res.data.result) {
        const parsed = res.data.result.split(specialChar).map((m: string) => m.trim());
        setSuggestedMessages(parsed);
      } else {
        toast.error('Invalid response from suggestion API');
      }
    } catch (error) {
      toast.error('Error fetching suggestions');
      console.error(error);
    } finally {
      setIsSuggestLoading(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const res = await axios.post('/api/send-message', {
        ...data,
        username,
      });
      toast.success(res.data.message);
      form.reset({ content: '' });
      await fetchSuggestedMessages();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data as { message?: string };
        toast.error(data?.message || 'Something went wrong. Please try again.');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-black relative overflow-hidden px-4 py-20">
      <StarsBackground />
      <ShootingStars />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full max-w-3xl bg-black/70 backdrop-blur-2xl rounded-3xl border border-cyan-500/40 p-8 shadow-[0_0_40px_#14b8a680] z-10"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-center text-transparent text-white bg-clip-text mb-10"
        >
          Send an Anonymous Message
        </motion.h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-cyan-300 text-lg font-medium">
                    Message for @{username}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your anonymous message here..."
                      className="w-full bg-white/10 text-white border border-cyan-500 placeholder:text-white rounded-xl px-4 py-3 resize-none focus:ring-[1px] focus:border-white"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <button
              type="submit"
              disabled={!messageContent || isLoading}
              className="group relative w-full py-4 rounded-md bg-black text-cyan-400 font-bold tracking-widest uppercase text-sm border border-cyan-500/50 hover:border-cyan-500 transition-all duration-300 ease-in-out hover:text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:shadow-[0_0_35px_rgba(34,211,238,0.45)] active:translate-y-1 active:shadow-[0_0_15px_rgba(34,211,238,0.45)] active:scale-[0.98]"
            >
              <span className="flex items-center justify-center gap-3 relative z-10">
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <svg
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 transition-transform duration-300 group-hover:scale-125"
                    >
                      <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                    Send It
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 transition-all duration-300 group-hover:-rotate-45 group-hover:scale-150"
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12"
        >
          <div className="text-center mb-4">
            <button
              onClick={fetchSuggestedMessages}
              disabled={isSuggestLoading}
              className="group relative w-full py-4 rounded-md bg-black text-cyan-400 font-bold tracking-widest uppercase text-sm border border-cyan-500/50 hover:border-cyan-500 transition-all duration-300 ease-in-out hover:text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:shadow-[0_0_35px_rgba(34,211,238,0.45)] active:translate-y-1 active:shadow-[0_0_15px_rgba(34,211,238,0.45)] active:scale-[0.98]"
            >
              <span className="relative z-10">
                {isSuggestLoading ? 'Loading...' : 'Get Fresh Suggestions'}
              </span>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-600/25 to-blue-600/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl rounded-md" />
              <div className="absolute -inset-1 -z-10 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-20 group-hover:opacity-30 blur-xl rounded-md transition-all duration-300 group-hover:blur-2xl" />
            </button>
            <p className="text-cyan-300 text-sm mt-2">Click a message to auto-fill it.</p>
          </div>

          <Card className="bg-white/5 border border-transparent rounded-xl shadow-[0_0_20px_2px_rgba(6,182,212,0.3)]">
            <CardHeader>
              <h3 className="text-2xl font-semibold text-white px-6 py-4">
                Suggested Messages
              </h3>
            </CardHeader>
            <CardContent className="flex flex-col space-y-3 px-6 py-4">
              {suggestedMessages.length === 0 ? (
                <p className="text-white text-center">No suggestions available.</p>
              ) : (
                suggestedMessages.map((message, index) => (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    key={index}
                    onClick={() => handleMessageClick(message)}
                    className="w-full px-4 py-2 border border-white/10 text-white rounded-xl text-left hover:bg-white/10 transition"
                  >
                    {message}
                  </motion.button>
                ))
              )}
            </CardContent>
          </Card>
        </motion.div>

        <Separator className="my-10 border-cyan-500" />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <div className="mb-4 text-cyan-300 font-semibold text-lg">
            Want Your Own Message Board?
          </div>
          <Link href="/sign-up" className="inline-block w-full">
            <button className="group relative w-full py-4 rounded-md bg-black text-cyan-400 font-bold tracking-widest uppercase text-sm border border-cyan-500/50 hover:border-cyan-500 transition-all duration-300 ease-in-out hover:text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:shadow-[0_0_35px_rgba(34,211,238,0.45)] active:translate-y-1 active:shadow-[0_0_15px_rgba(34,211,238,0.45)] active:scale-[0.98]">
              <span className="relative z-10">Create Account</span>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-600/25 to-blue-600/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl rounded-md" />
              <div className="absolute -inset-1 -z-10 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-20 group-hover:opacity-30 blur-xl rounded-md transition-all duration-300 group-hover:blur-2xl" />
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
