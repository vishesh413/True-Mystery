'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Loader2, RefreshCcw } from 'lucide-react';

import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
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
    setMessages((prev) => prev.filter((m) => m._id.toString() !== id));
  };

  if (!session?.user) return <div />;

  const username = (session.user as User).username;
  const baseUrl =
    typeof window !== 'undefined'
      ? `${window.location.protocol}//${window.location.host}`
      : '';
  const profileUrl = `${baseUrl}/u/${username}`;

  return (
    <div className="relative min-h-screen flex flex-col items-center py-12 px-4 bg-black text-white pt-20">
      <StarsBackground />
      <ShootingStars />

      <div className="relative z-10 w-full max-w-6xl bg-[#090e1a] bg-opacity-90 rounded-2xl border border-cyan-500 shadow-lg p-8 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-10 flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
          🧬 Mystery Dashboard
        </h1>

        {/* Profile Link Section */}
        <div className="mb-6 w-full">
          <label className="text-sm font-semibold mb-2 block text-cyan-300 flex items-center gap-2">
            🔗 Your Profile Link
          </label>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <input
              value={profileUrl}
              readOnly
              className="flex-1 rounded-md bg-slate-800 border border-slate-600 px-4 py-2 text-sm text-white"
            />
            <div className="w-full sm:w-auto flex justify-center sm:block">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(profileUrl);
                  toast.success('Link copied!');
                }}
                className="group relative w-full sm:w-auto px-5 py-2 rounded-md bg-black text-cyan-400 font-semibold text-sm border border-cyan-500/50 hover:border-cyan-500 transition-all duration-300 hover:text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:shadow-[0_0_35px_rgba(34,211,238,0.45)] active:translate-y-1 active:scale-[0.98]"
              >
                <span className="relative z-10">Copy</span>
              </button>
            </div>
          </div>
        </div>

        {/* Accept Messages + Refresh */}
        <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 py-5 border border-white/10 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-base font-medium">
              💬 Accept Messages:{' '}
              <span
                className={`font-semibold ${
                  acceptMessages ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {acceptMessages ? 'On' : 'Off'}
              </span>
            </span>
            <Switch
              {...register('acceptMessages')}
              checked={acceptMessages}
              onCheckedChange={handleSwitchChange}
              disabled={isSwitchLoading}
              className="border border-cyan-400 bg-transparent data-[state=checked]:bg-transparent shadow-cyan-500/30 shadow-sm scale-95 transition-colors"
            />
          </div>

          <button
            onClick={() => fetchMessages(true)}
            disabled={isLoading}
            className="group relative px-5 py-2 rounded-md bg-black text-cyan-400 font-semibold text-sm border border-cyan-500/50 hover:border-cyan-500 transition-all duration-300 hover:text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:shadow-[0_0_35px_rgba(34,211,238,0.45)] active:translate-y-1 active:scale-[0.98] flex items-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCcw className="h-4 w-4" />
            )}
            <span className="relative z-10">Refresh</span>
          </button>
        </div>

        <Separator className="mb-6 border-gray-700" />

        <h2 className="text-xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
          📨 Your Messages
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {messages.length > 0 ? (
            messages.map((m) => (
              <MessageCard
                key={m._id.toString()}
                message={m}
                onMessageDelete={handleDeleteMessage}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-slate-300">
              No messages yet. Share your cosmic link and let the mysteries
              begin!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
