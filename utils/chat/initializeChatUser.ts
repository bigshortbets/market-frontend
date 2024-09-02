import { CONSTANTS, PushAPI } from '@pushprotocol/restapi';

export const initializeChatUser = async (signer: any) => {
  const user = await PushAPI.initialize(signer, {
    env: CONSTANTS.ENV.STAGING,
  });
  if (user) {
    return user;
  }
};
