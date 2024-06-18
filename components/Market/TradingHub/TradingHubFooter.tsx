import React from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaXTwitter } from 'react-icons/fa6';
import { FaTelegramPlane } from 'react-icons/fa';
import { FaBook } from 'react-icons/fa';
import { SiGitbook } from 'react-icons/si';

export const TradingHubFooter = () => {
  const {
    isPending,
    error,
    data: bigsbPriceData,
  } = useQuery({
    queryKey: ['bigsbPrice'],
    queryFn: () =>
      axios
        .get(
          'https://api.coingecko.com/api/v3/simple/price?ids=bigshortbets&vs_currencies=usd'
        )
        .then((res) => res.data),
  });

  return (
    <div className='h-[58px] border-t border-[#444650] flex justify-between items-center'>
      <div className='pl-5 flex items-center gap-2.5'>
        <a
          href='https://x.com/bigshortbets'
          target='_blank'
          className='text-[20px] text-[#4ECB7D]'
        >
          <FaXTwitter />
        </a>
        <a
          href='https://t.me/BigShortBetsENG'
          target='_blank'
          className='text-[20px] text-[#4ECB7D]'
        >
          <FaTelegramPlane />
        </a>
        <a
          href='https://docs.bigsb.network/'
          target='_blank'
          className='text-[20px] text-[#4ECB7D]'
        >
          <SiGitbook />
        </a>
      </div>
      <div className='pr-5 flex items-center gap-2.5'>
        <p className='text-[13px] mr-2'>
          $BigSB: {Number(bigsbPriceData?.bigshortbets.usd).toFixed(2)}$
        </p>
        <a
          href='https://coinmarketcap.com/currencies/bigshortbets/'
          target='_blank'
        >
          <Image
            src='/coinmarketcap.svg'
            alt='uniswap'
            height={20}
            width={20}
          />
        </a>
        <a
          href='https://coinpaprika.com/coin/bigsb-bigshortbets/'
          target='_blank'
        >
          <Image src='/coinpaprika.svg' alt='uniswap' height={20} width={20} />
        </a>
        <a
          href='https://www.coingecko.com/pl/waluty/bigshortbets'
          target='_blank'
        >
          <Image src='/coingecko.svg' alt='uniswap' height={20} width={20} />
        </a>
        <a
          href='https://app.uniswap.org/swap?use=V2&outputCurrency=0x131157c6760f78f7ddf877c0019eba175ba4b6f6'
          target='_blank'
        >
          <Image src='/uniswap.svg' alt='uniswap' height={21} width={21} />
        </a>
      </div>
    </div>
  );
};
