'use client';

import React from 'react';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { X } from 'lucide-react';
import { Message } from '@/model/User';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ApiResponse } from '@/types/ApiResponse';
import { toast } from 'sonner';

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

export default function MessageCard({
  message,
  onMessageDelete,
}: MessageCardProps) {
  const handleDeleteConfirm = async () => {
    try {
      const messageId = message._id.toString(); // ✅ Convert ObjectId to string
      const response = await axios.delete<ApiResponse>(
        `/api/delete-message/${messageId}`
      );
      toast.success(response.data.message);
      onMessageDelete(messageId);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error('Error', {
        description:
          axiosError.response?.data.message ?? 'Failed to delete message',
      });
    }
  };

  return (
    <Card
      className="relative w-full min-h-36 bg-black/40 backdrop-blur-lg text-white border border-white/10 rounded-xl 
                 transition-all duration-300 hover:border-cyan-500 
                 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:scale-[1.02]"
    >
      {/* Delete button (top-right corner) */}
      <div className="absolute top-3 right-3 z-10">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              aria-label="Delete message"
              className="w-8 h-8 flex items-center justify-center rounded-full 
                         text-cyan-400 hover:text-white 
                         hover:bg-cyan-500/20 border border-cyan-400/30 
                         hover:border-cyan-400/70 transition 
                         hover:rotate-90 transform duration-300 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
            >
              <X className="w-4 h-4" />
            </button>
          </AlertDialogTrigger>

          <AlertDialogContent className="bg-black/80 backdrop-blur-xl border border-white/10 text-white rounded-2xl transition-all duration-300 animate-in zoom-in-95">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-base text-gray-300 mt-2">
                This will permanently delete the message. It cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter className="flex gap-4 mt-6">
              <AlertDialogCancel
                className="group relative px-6 py-3 rounded-md bg-black text-cyan-400 font-bold uppercase text-xs border border-cyan-500/50 
                  hover:border-cyan-300 hover:text-cyan-200
                  transition-all duration-300 ease-in-out 
                  shadow-[0_0_20px_rgba(34,211,238,0.2)] 
                  hover:shadow-[0_0_25px_rgba(34,211,238,0.35)] 
                  active:translate-y-1 active:scale-[0.98]"
              >
                <span className="relative z-10">Cancel</span>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-600/25 to-blue-600/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl rounded-md" />
                <div className="absolute -inset-1 -z-10 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-20 group-hover:opacity-30 blur-xl rounded-md transition-all duration-300 group-hover:blur-2xl" />
              </AlertDialogCancel>

              <AlertDialogAction
                onClick={handleDeleteConfirm}
                className="group relative px-6 py-3 rounded-md bg-black text-red-400 font-bold uppercase text-xs border border-red-500/50 
                  hover:border-red-400 hover:text-red-300
                  transition-all duration-300 ease-in-out 
                  shadow-[0_0_20px_rgba(248,113,113,0.2)] 
                  hover:shadow-[0_0_25px_rgba(248,113,113,0.35)] 
                  active:translate-y-1 active:scale-[0.98]"
              >
                <span className="relative z-10">Delete</span>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-red-600/25 to-pink-600/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl rounded-md" />
                <div className="absolute -inset-1 -z-10 bg-gradient-to-r from-red-600 to-pink-600 opacity-20 group-hover:opacity-30 blur-xl rounded-md transition-all duration-300 group-hover:blur-2xl" />
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <CardHeader>
        <CardTitle className="text-base font-medium break-words">
          {message.content}
        </CardTitle>
        <div className="text-sm text-gray-400 mt-2">
          {dayjs(message.createdAt).format('MMM D, YYYY h:mm A')}
        </div>
      </CardHeader>

      <CardContent />
    </Card>
  );
}
