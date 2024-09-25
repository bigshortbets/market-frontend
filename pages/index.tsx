import { Inter } from 'next/font/google';
import { useMarkets } from '@/requests/useMarkets';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Market } from '@/components/Market/Market';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';
import { useCurrentBlock } from '@/requests/useCurrentBlock';
import { useAtom } from 'jotai';
import { initialLoadingAtom, marketsAtom } from '@/store/store';
import { useCurrentMarket } from '@/hooks/useCurrentMarket';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  useCurrentMarket();
  useCurrentBlock();

  const { markets } = useMarkets();

  const [initialLoading, setInitialLoading] = useAtom(initialLoadingAtom);

  useEffect(() => {
    setInitialLoading(true);

    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className={`${inter.className} text-white`}>
      <Head>
        <title>
          BigShortBet$ P2P Market - Trade on Unique & Event-Based Markets
          Without Intermediaries
        </title>
      </Head>
      <Market markets={markets} />
      <Toaster position='top-center' />
    </main>
  );
}
