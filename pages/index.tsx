import { Inter } from 'next/font/google';
import { Navbar } from '@/components/Navbar/Navbar';
import { useMarkets } from '@/api/useMarkets';
import { WhaleLoading } from '@/components/WhaleLoading';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { markets, selectedMarket } = useMarkets();

  return (
    <main
      onClick={() => console.log(selectedMarket)}
      className={`min-h-screen  ${inter.className} bg-secondary-bg flex flex-col`}
    >
      <Navbar />
      {/* Some empty state for UI */}
      <div className="h-[calc(100vh-80px)] p-6 flex-col flex justify-center items-center">
        <div className="animate-pulse">
          <WhaleLoading />
        </div>
        {/* <div className="flex-1 flex gap-6 justify-evenly">
          <div className="animate-pulse bg-primary-bg w-full rounded-xl">
            <WhaleLoading />
          </div>
          <div className="animate-pulse bg-primary-bg w-full rounded-xl"></div>
        </div>
        <div className="flex-1 flex gap-6 justify-evenly">
          <div className="animate-pulse bg-primary-bg w-full rounded-xl"></div>
          <div className="animate-pulse bg-primary-bg w-full rounded-xl"></div>
        </div> */}
      </div>
    </main>
  );
}
