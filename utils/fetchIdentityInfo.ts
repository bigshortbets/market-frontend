/* import { getApiInstance } from '@/blockchain/polkadotApi';
import { Option, Bytes, ITuple } from '@polkadot/types';
import { IdentityInfo } from '@polkadot/types/interfaces';

export async function fetchIdentityInfo(address: string, addressConverted: boolean = false) {
  try {
    const api = await getApiInstance();

    // Convert address to the appropriate format if needed
    const accountId = addressConverted
      ? address
      : convertToSS58(address);

    // Fetching the raw Codec response from the chain
    const identityInfoCodec: Option<ITuple<[Codec, Option<Bytes>]>> = await api.query.identity.identityOf(accountId);

    // Check if the Option is None or Some
    if (identityInfoCodec.isNone) {
      return null; // No identity information found
    }

    // Unwrap the Option to get the tuple [IdentityInfo, Option<Bytes>]
    const [identityInfoCodecValue, additionalInfo] = identityInfoCodec.unwrap();

    // Cast the first element of the tuple to IdentityInfo
    const identityInfo = api.createType('IdentityInfo', identityInfoCodecValue) as IdentityInfo;

    // Parse the different fields within the identity info
    const display = identityInfo.display.isRaw ? identityInfo.display.asRaw.toUtf8() : null;
    const legal = identityInfo.legal.isRaw ? identityInfo.legal.asRaw.toUtf8() : null;
    const web = identityInfo.web.isRaw ? identityInfo.web.asRaw.toUtf8() : null;
    const riot = identityInfo.riot.isRaw ? identityInfo.riot.asRaw.toUtf8() : null;
    const email = identityInfo.email.isRaw ? identityInfo.email.asRaw.toUtf8() : null;
    const twitter = identityInfo.twitter.isRaw ? identityInfo.twitter.asRaw.toUtf8() : null;

    return {
   
      display,
      legal,
      web,
      riot,
      email,
      twitter,
      additionalInfo: additionalInfo.isSome ? additionalInfo.unwrap().toUtf8() : null,
    };
  } catch (error) {
    console.error('Error fetching identity information:', error);
    throw error;
  }
}
 */
