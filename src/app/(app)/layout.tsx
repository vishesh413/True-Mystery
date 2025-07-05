// layout.tsx
import Navbar from '@/components/Navbar'
import { Toaster } from '@/components/ui/sonner'

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {children}
      <Toaster richColors position="bottom-right" /> {/* ✅ Only one */}
    </div>
  )
}
