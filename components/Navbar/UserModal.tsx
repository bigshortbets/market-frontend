import { useSetIdentity } from '@/blockchain/hooks/identity/useSetIdentity';
import { useDisplayName } from '@/hooks/useDisplayName';
import { convertToSS58 } from '@/utils/convertToSS58';
import { fetchDisplayName } from '@/utils/fetchIdentityInfo';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaCopy } from 'react-icons/fa';

import { IoClose } from 'react-icons/io5';
import ReactLoading from 'react-loading';
import { useAccount } from 'wagmi';
import { IoMdRefresh } from 'react-icons/io';
import { decodeWord } from '@/utils/decodeLeaderboardWord';

interface UserModalProps {
  handleCloseModal: () => void;
  isModalOpened: boolean;
}

export const UserModal = ({
  handleCloseModal,
  isModalOpened,
}: UserModalProps) => {
  const { address } = useAccount();
  const [nameInput, setNameInput] = useState<string>('');
  const { write: writeName, isPending } = useSetIdentity(nameInput);
  const { displayName, refresh } = useDisplayName(
    address && convertToSS58(address as string)
  );

  const handleCopy = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const val = event.currentTarget.getAttribute('data-value');
    if (!val) return;

    try {
      await navigator.clipboard.writeText(val);
      toast.success('Address copied to clipboard', {
        duration: 1111,
      });
    } catch (err) {
      toast.error('Something went wrong', {
        duration: 1111,
      });
    }
  };

  const buttonDisabled = nameInput.length < 3 || nameInput.length > 18;

  return (
    <>
      <Transition appear show={isModalOpened} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={handleCloseModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black/25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center text-white'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-[350px] transform overflow-hidden  bg-[#191B24] border-[#444650] border rounded-[10px] p-6 text-left align-middle shadow-xl transition-all'>
                  <div className='flex justify-between items-center'>
                    <Dialog.Title
                      as='h3'
                      className='text-lg font-medium leading-6 text-white mb-1'
                    >
                      Your Profile
                    </Dialog.Title>

                    <button className='text-xl' onClick={handleCloseModal}>
                      <IoClose />
                    </button>
                  </div>
                  <div className='my-3'>
                    <div className='flex items-center gap-1'>
                      <p className='text-sm mb-1'>H160 Address</p>
                      <button
                        className='text-xs text-[#434552]'
                        onClick={handleCopy}
                        aria-label='Copy address'
                        data-value={address as string}
                      >
                        <FaCopy />
                      </button>
                    </div>
                    <p className='text-xs text-tetriary'>{address}</p>
                  </div>
                  <div className='my-3'>
                    <div className='flex items-center gap-1'>
                      <p className='text-sm mb-1'>SS58 Address</p>
                      <button
                        className='text-xs text-[#434552]'
                        onClick={handleCopy}
                        aria-label='Copy address'
                        data-value={address && convertToSS58(address as string)}
                      >
                        <FaCopy />
                      </button>
                    </div>
                    <p className='text-xs text-tetriary break-words'>
                      {address ? convertToSS58(address as string) : '-'}
                    </p>
                  </div>
                  <div className='my-3'>
                    <div className='flex items-center gap-1 mb-1'>
                      <p className='text-sm '>Your Username</p>
                      <button className=' text-tetriary' onClick={refresh}>
                        <IoMdRefresh />
                      </button>
                    </div>
                    <p className='text-xs text-tetriary break-words'>
                      {displayName ? decodeWord(displayName) : '-'}
                    </p>
                  </div>
                  <div>
                    <label
                      htmlFor='displayname'
                      className='text-tetriary text-xs '
                    >
                      Set Username
                    </label>
                    <input
                      onChange={(e) => setNameInput(e.target.value)}
                      id='displayname'
                      type='text'
                      className='rounded-lg bg-[#23252E] w-full h-full py-2 close-position-input text-xs outline-none px-2 mt-0.5'
                    />
                  </div>
                  <button
                    disabled={buttonDisabled}
                    onClick={writeName}
                    className={` flex items-center justify-center disabled:bg-gray-400 bg-[#4ECB7D] w-full rounded-lg text-[#01083A] text-[13px] font-semibold py-2.5 mt-3 `}
                  >
                    {isPending ? (
                      <ReactLoading
                        type='spin'
                        height={18}
                        width={18}
                        color='black'
                      />
                    ) : (
                      'Change Username'
                    )}
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
