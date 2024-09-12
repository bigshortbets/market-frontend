import { PushAPI } from '@pushprotocol/restapi';

export const fetchChatHistory = async (user: PushAPI, did: string) => {
  const history = await user.chat.history(did, {
    limit: 30,
  });
  if (history) {
    return history;
  }
};
