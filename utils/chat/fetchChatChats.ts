import { PushAPI } from '@pushprotocol/restapi';

export const fetchChatChats = async (user: PushAPI) => {
  const chats = await user.chat.list('CHATS');
  if (chats) {
    return chats;
  }
};
