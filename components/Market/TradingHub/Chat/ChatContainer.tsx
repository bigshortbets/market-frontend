import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { chatStream, chatUserAtom } from '@/store/store';
import { useEthersSigner } from '@/blockchain/ethers';
import { initializeChatUser } from '@/utils/chat/initializeChatUser';
import { ChatInterface } from './ChatInterface';
import { initializeChatStream } from '@/utils/chat/initializeChatStream';
import { CONSTANTS } from '@pushprotocol/restapi';
import ReactLoading from 'react-loading';

export const ChatContainer = () => {
  const [chatUser, setChatUser] = useAtom(chatUserAtom);
  const [streamData, setStreamData] = useState<any>(undefined);
  const [stream, setStream] = useAtom(chatStream);

  const [userInitializationLoading, setUserInitializationLoading] =
    useState<boolean>(false);
  const signer = useEthersSigner();

  const initialize = async () => {
    setUserInitializationLoading(true);
    const user = await initializeChatUser(signer);

    if (user) {
      setUserInitializationLoading(false);
      setChatUser(user);
      const stream = await initializeChatStream(user);

      if (stream) {
        setStream(stream);

        stream.connect();

        stream.on(CONSTANTS.STREAM.CHAT, (message) => {
          setStreamData(message);
        });

        stream.on(CONSTANTS.STREAM.CHAT_OPS, (data) => {
          setStreamData(data);
        });
      }
    }
  };

  return (
    <div
      className='w-full  h-[calc(100vh-320px)] md:h-[calc(100vh-230px)]'
      /*   style={{ height: 'calc(100vh - 229px)' }} */
    >
      <div className='h-full flex justify-center items-center p-4 lg:hidden'>
        <p className='text-tetriary text-sm'>
          Chat doesn't have mobile devices support yet. Please use desktop
          device.
        </p>
      </div>
      {chatUser && (chatUser as any).readMode === false ? (
        <ChatInterface chatUser={chatUser} streamData={streamData} />
      ) : (
        <div className='flex h-full items-center justify-center'>
          <button
            onClick={initialize}
            className='bg-bigsbgreen w-[160px] h-[40px] flex items-center justify-center text-black rounded-md text-sm font-semibold'
          >
            {userInitializationLoading ? (
              <ReactLoading
                type='spin'
                height={20}
                width={20}
                color='#444650'
              />
            ) : (
              'Initialize Chat'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

/* h-[calc(100vh-320px)] md:h-[calc(100vh-230px)] */
