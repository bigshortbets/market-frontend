import { PushAPI, CONSTANTS } from '@pushprotocol/restapi';

export const chatSendMessage = async (user: PushAPI) => {
  const to = '0x3C6cAf27B5B55C70C232B27132d9eef628712A6f';
  return await user.chat.send(to, {
    content: 'Siema',
    type: 'Text',
  });
};
