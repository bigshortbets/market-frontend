import { Inter } from 'next/font/google';
import { useMarkets } from '@/requests/useMarkets';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Market } from '@/components/Market/Market';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';
import { useCurrentBlock } from '@/requests/useCurrentBlock';
import { useAtom } from 'jotai';
import { marketsAtom } from '@/store/store';
import { useCurrentMarket } from '@/hooks/useCurrentMarket';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  /*  */
  useMarkets();
  useCurrentMarket();
  useCurrentBlock();
  /*  */

  const [minimumLoadingTime, setMinimumLoadingTime] = useState(true);
  const [markets] = useAtom(marketsAtom);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinimumLoadingTime(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const isLoading = minimumLoadingTime || markets === undefined;

  return (
    <main className={`${inter.className} text-white`}>
      <Head>
        <title>bigshortbet$ P2P Market</title>
      </Head>
      {isLoading ? <LoadingScreen /> : <Market markets={markets} />}
      <Toaster position='top-center' />
    </main>
  );
}
