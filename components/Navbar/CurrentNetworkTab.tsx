import { chainInfoChainId } from '@/blockchain/constants';
import { switchToBigShortBetsChain } from '@/utils/switchToBigShortBetsChain';
import { useAccount } from 'wagmi';

export const CurrentNetworkTab = () => {
  const { chain } = useAccount();

  return (
    <div
      className={`flex rounded-md bg-secondary-bg p-2 gap-2 items-center ${
        chain?.id === chainInfoChainId
          ? 'pointer-events-none'
          : 'cursor-pointer'
      }`}
      onClick={switchToBigShortBetsChain}
    >
      <div
        className={`w-[10px] h-[10px] rounded-full  ${
          chain?.id === chainInfoChainId ? 'bg-[#73D391]' : 'bg-gray-500 '
        }`}
      ></div>
      <p className='text-xs'>{chain?.name}</p>
    </div>
  );
};
