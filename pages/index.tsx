import { Inter } from 'next/font/google';
import { Navbar } from '@/components/Navbar/Navbar';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`min-h-screen  ${inter.className} bg-secondary-bg flex flex-col`}
    >
      <Navbar />
      {/* Some empty state for UI */}
      <div className="h-[calc(100vh-80px)] p-6 flex-col flex gap-y-6">
        <div className="flex-1 flex gap-6 justify-evenly">
          <div className="animate-pulse bg-primary-bg w-full rounded-xl"></div>
          <div className="animate-pulse bg-primary-bg w-full rounded-xl"></div>
        </div>
        <div className="flex-1 flex gap-6 justify-evenly">
          <div className="animate-pulse bg-primary-bg w-full rounded-xl"></div>
          <div className="animate-pulse bg-primary-bg w-full rounded-xl"></div>
        </div>
      </div>
    </main>
  );
}
