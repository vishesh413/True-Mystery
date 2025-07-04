import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from './context/AuthProvider';
import { Toaster as Sonner } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mystry Message',
  description: 'Real feedback from real people.',
  viewport: 'width=1024',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div>
            {children}
            <Sonner richColors position="top-center" />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}