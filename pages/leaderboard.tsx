import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';
import { Leaderboard } from '@/components/Leaderboard/Leaderboard';

const inter = Inter({ subsets: ['latin'] });

export default function LeaderboardPage() {
  return (
    <main className={`${inter.className} text-white`}>
      <Head>
        <title>bigshortbet$ P2P Market | Leaderboard</title>
      </Head>
      <Leaderboard />
      <Toaster position='top-center' />
    </main>
  );
}
