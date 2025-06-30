'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Loader2, RefreshCcw } from 'lucide-react';

import { acceptMessageSchema } from '@/schemas/acceptMessageSchema';
import { ApiResponse } from '@/types/ApiResponse';
import { Message } from '@/model/User';
import { User } from 'next-auth';
import MessageCard from '@/components/MessageCard';

import { StarsBackground } from '@/components/ui/stars-background';
import { ShootingStars } from '@/components/ui/shooting-stars';

export default function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
    defaultValues: {
      acceptMessages: false,
    },
  });

  const { register, watch, setValue } = form;
  const acceptMessages = watch('acceptMessages');

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const res = await axios.get<ApiResponse>('/api/accept-messages');
      setValue('acceptMessages', res.data.isAcceptingMessages ?? false);
    } catch (err) {
      const e = err as AxiosError<ApiResponse>;
      toast.error(e.response?.data.message || 'Failed to fetch settings');
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(async (refresh = false) => {
    setIsLoading(true);
    try {
      const res = await axios.get<ApiResponse>('/api/get-messages');
      setMessages(res.data.messages || []);
      if (refresh)
        toast('✅ Refreshed', {
          description: 'Latest messages loaded.',
        });
    } catch (err) {
      const e = err as AxiosError<ApiResponse>;
      toast.error(e.response?.data.message || 'Failed to fetch messages');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (session?.user) {
      fetchMessages();
      fetchAcceptMessage();
    }
  }, [session, fetchAcceptMessage, fetchMessages]);

  const handleSwitchChange = async (checked: boolean) => {
    setIsSwitchLoading(true);
    try {
      const res = await axios.post<ApiResponse>('/api/accept-messages', {
        acceptMessages: checked,
      });
      setValue('acceptMessages', checked);
      toast.success(res.data.message);
    } catch (err) {
      const e = err as AxiosError<ApiResponse>;
      toast.error(e.response?.data.message || 'Failed to update settings');
    } finally {
      setIsSwitchLoading(false);
    }
  };

  const handleDeleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m._id !== id));
  };

  if (!session?.user) return <div />;

  const username = (session.user as User).username;
  const baseUrl =
    typeof window !== 'undefined'
      ? `${window.location.protocol}//${window.location.host}`
      : '';
  const profileUrl = `${baseUrl}/u/${username}`;

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center py-12 px-6 bg-black text-white">
      <StarsBackground />
      <ShootingStars />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-5xl bg-black bg-opacity-70 rounded-2xl border border-cyan-500 shadow-[0_0_25px_3px_rgba(6,182,212,0.5)] p-10 backdrop-blur-md"
      >
        <h1 className="text-5xl font-bold mb-12 font-serif drop-shadow-md select-none">
          📋 User Dashboard
        </h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="flex-grow rounded-lg border border-gray-600 bg-gray-900 text-white px-5 py-3 focus:ring-2 focus:ring-cyan-400 transition"
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(profileUrl);
              toast.success('Link copied to clipboard', {
              });
            }}
            className="group relative px-6 py-3 rounded-md bg-black text-cyan-400 font-bold uppercase text-xs border border-cyan-500/50 hover:border-cyan-500 transition-all duration-300 ease-in-out hover:text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:shadow-[0_0_35px_rgba(34,211,238,0.45)] active:translate-y-1 active:shadow-[0_0_15px_rgba(34,211,238,0.45)] active:scale-[0.98]"
          >
            Copy link
          </button>
        </div>

        <div className="flex flex-col items-start gap-4 mb-10 px-6 py-5 rounded-xl border border-white/10 transition-all duration-300">
          <div className="flex items-center gap-3">
            <Switch
              {...register('acceptMessages')}
              checked={acceptMessages}
              onCheckedChange={handleSwitchChange}
              disabled={isSwitchLoading}
              className="w-[44px] h-[24px] bg-gray-900 border border-cyan-500 data-[state=checked]:bg-cyan-600 focus-visible:ring-0 focus-visible:ring-offset-0 transition"
            />
            <span className="text-lg font-medium text-white tracking-wide">
              Accept Messages:{' '}
              <span
                className={`font-semibold transition-colors duration-300 ${
                  acceptMessages
                    ? 'text-cyan-400 drop-shadow-[0_0_4px_rgba(34,211,238,0.6)]'
                    : 'text-orange-400 drop-shadow-[0_0_2px_rgba(251,146,60,0.5)]'
                }`}
              >
                {acceptMessages ? 'On' : 'Off'}
              </span>
            </span>
          </div>

          <button
            onClick={() => fetchMessages(true)}
            disabled={isLoading}
            className="group relative px-6 py-3 rounded-md bg-black text-cyan-400 font-bold uppercase text-xs border border-cyan-500/50 hover:border-cyan-500 transition-all duration-300 ease-in-out hover:text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:shadow-[0_0_35px_rgba(34,211,238,0.45)] active:translate-y-1 active:shadow-[0_0_15px_rgba(34,211,238,0.45)] active:scale-[0.98] flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <RefreshCcw className="h-5 w-5" />
            )}
            <span>Refresh</span>
          </button>
        </div>

        <Separator className="mb-8 border-gray-700" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {messages.length > 0 ? (
            messages.map((m, i) => (
              <motion.div
                key={m._id as string}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <MessageCard message={m} onMessageDelete={handleDeleteMessage} />
              </motion.div>
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3, ease: 'easeOut' }}
              className="relative text-center text-lg font-serif text-transparent bg-gradient-to-r from-cyan-400 via-white to-cyan-300 bg-clip-text 
              animate-text-shimmer drop-shadow-[0_0_15px_rgba(34,211,238,0.9)]"
            >
              <span className="animate-float">No messages to display.</span>
            </motion.p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
