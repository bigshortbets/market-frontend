import React from 'react';
import Image from 'next/image';

export const TradingHubFooter = () => {
  return (
    <div className='h-[58px] border-t border-[#444650] flex justify-between items-center'>
      <div></div>
      <div className='pr-5 flex items-center gap-2.5'>
        <p>$BigSB:</p>
        <a
          href='https://coinmarketcap.com/currencies/bigshortbets/'
          target='_blank'
        >
          <Image
            src='/coinmarketcap.svg'
            alt='uniswap'
            height={23}
            width={23}
          />
        </a>
        <a
          href='https://coinpaprika.com/coin/bigsb-bigshortbets/'
          target='_blank'
        >
          <Image src='/coinpaprika.svg' alt='uniswap' height={23} width={23} />
        </a>
        <a
          href='https://www.coingecko.com/pl/waluty/bigshortbets'
          target='_blank'
        >
          <Image src='/coingecko.svg' alt='uniswap' height={23} width={23} />
        </a>
        <a
          href='https://app.uniswap.org/swap?use=V2&outputCurrency=0x131157c6760f78f7ddf877c0019eba175ba4b6f6'
          target='_blank'
        >
          <Image src='/uniswap.svg' alt='uniswap' height={24} width={24} />
        </a>
      </div>
    </div>
  );
};
