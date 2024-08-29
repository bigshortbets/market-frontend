import { PushAPI, CONSTANTS } from '@pushprotocol/restapi';

export const chatSendMessage = async (signer: any) => {
  const user = await PushAPI.initialize(signer, {
    env: CONSTANTS.ENV.STAGING,
  });

  const to = '0xe284Baa0f218d53FD9fB1A773cdABF119B2040C8';

  return await user.chat.send(to, {
    content: 'Hello Bob!',
    type: 'Text',
  });
};
