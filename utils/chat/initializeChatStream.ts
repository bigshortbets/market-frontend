import { CONSTANTS, PushAPI } from '@pushprotocol/restapi';

export const initializeChatStream = async (user: PushAPI) => {
  const stream = await user.initStream(
    [CONSTANTS.STREAM.CHAT, CONSTANTS.STREAM.CHAT_OPS],
    {
      filter: {
        channels: ['*'],
        chats: ['*'],
      },
      connection: {
        retries: 3,
      },
      raw: false,
    }
  );
  if (stream) {
    return stream;
  }
};
