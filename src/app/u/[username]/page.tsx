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
  "What would you say if no one knew it was you?",
  "A compliment you never gave, but still remember.",
  "Describe a moment you wish you could relive.",
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
        className="w-full max-w-3xl bg-[#090e1a] bg-opacity-90 rounded-2xl border border-cyan-500 shadow-lg p-8 sm:p-10 z-10"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-center text-white mb-10"
        >
          Say What’s On Your Heart — Anonymously 💬
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
                  <p className="text-sm text-cyan-400 mt-1">
                    Be real. Be kind. Be anonymous.
                  </p>
                </FormItem>
              )}
            />

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={!messageContent || isLoading}
                className="group relative w-[180px] py-3 rounded-md bg-black text-cyan-400 font-bold tracking-widest uppercase text-xs border border-cyan-500/50 hover:border-cyan-500 transition-all duration-300 hover:text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:shadow-[0_0_35px_rgba(34,211,238,0.45)] active:translate-y-1 active:shadow-[0_0_15px_rgba(34,211,238,0.45)] active:scale-[0.98]"
              >
                <span className="flex items-center justify-center gap-2 relative z-10">
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>Send It</>
                  )}
                </span>
              </button>
            </div>
          </form>
        </Form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12"
        >
          <div className="text-left mb-4">
            <h3 className="text-white text-2xl font-bold">Stuck on What to Say?</h3>
            <p className="text-cyan-300 text-sm mt-1">
              Dive deep or keep it light — these prompts can unlock memories, confessions, or compliments you’ve been holding in.
            </p>
          </div>

          <Card className="bg-white/5 border border-transparent rounded-xl shadow-[0_0_20px_2px_rgba(6,182,212,0.3)]">
            <CardHeader className="pb-2">
              <h3 className="text-lg font-medium text-white px-6">Suggestions</h3>
            </CardHeader>
            <CardContent className="flex flex-col space-y-3 px-6 pb-4">
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

          <button
            onClick={fetchSuggestedMessages}
            disabled={isSuggestLoading}
            className="mt-4 group relative w-[180px] py-3 rounded-md bg-black text-cyan-400 font-bold text-xs uppercase border border-cyan-500/50 hover:border-cyan-500 transition-all duration-300 hover:text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:shadow-[0_0_35px_rgba(34,211,238,0.45)] active:translate-y-1 active:shadow-[0_0_15px_rgba(34,211,238,0.45)] active:scale-[0.98]"
          >
            <span className="relative z-10">
              {isSuggestLoading ? 'Loading Ideas...' : 'Get suggestion'}
            </span>
          </button>
        </motion.div>

        <Separator className="my-10 border-cyan-500" />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <div className="mb-4 text-cyan-300 font-semibold text-lg">
            Want to Know What Others Truly Think About You?
          </div>
          <Link href="/sign-up" className="inline-block w-full">
            <button className="group relative w-[180px] mx-auto py-3 rounded-md bg-black text-cyan-400 font-bold text-xs uppercase border border-cyan-500/50 hover:border-cyan-500 transition-all duration-300 hover:text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:shadow-[0_0_35px_rgba(34,211,238,0.45)] active:translate-y-1 active:shadow-[0_0_15px_rgba(34,211,238,0.45)] active:scale-[0.98]">
              <span className="relative z-10">Get Your Own Page</span>
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
