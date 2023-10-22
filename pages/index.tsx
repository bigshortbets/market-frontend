import Image from 'next/image';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/Navbar/Navbar';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={`min-h-screen  ${inter.className} bg-secondary-bg `}>
      <Navbar />
    </main>
  );
}
