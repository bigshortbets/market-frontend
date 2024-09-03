import { PushAPI } from '@pushprotocol/restapi';

export const fetchChatRequests = async (user: PushAPI) => {
  const requests = await user.chat.list('REQUESTS');
  if (requests) {
    return requests;
  }
};
