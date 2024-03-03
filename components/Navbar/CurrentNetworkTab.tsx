import { switchToBigShortBetsChain } from '@/utils/switchToBigShortBetsChain';
import { useNetwork } from 'wagmi';

export const CurrentNetworkTab = () => {
  const { chain } = useNetwork();

  return (
    <div
      className={`flex rounded-md bg-secondary-bg p-2 gap-2 items-center ${
        chain?.id === 2137 ? 'pointer-events-none' : 'cursor-pointer'
      }`}
      onClick={switchToBigShortBetsChain}
    >
      <div
        className={`w-[10px] h-[10px] rounded-full  ${
          chain?.id === 2137 ? 'bg-[#73D391]' : 'bg-gray-500 '
        }`}
      ></div>
      <p className='text-xs'>{chain?.name}</p>
    </div>
  );
};
