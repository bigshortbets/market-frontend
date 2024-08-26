import { getApiInstance } from '@/blockchain/polkadotApi';
import { Option, Tuple } from '@polkadot/types';
import { convertToSS58 } from './convertToSS58';

interface DisplayName {
  info: {
    display: { Raw: string } | null;
  };
}

type DisplayNameResponse = [DisplayName] | null;

export async function fetchDisplayName(
  address: string
): Promise<string | null> {
  try {
    const api = await getApiInstance();

    const identityInfoCodec = (await api.query.identity.identityOf(
      convertToSS58(address)
    )) as Option<Tuple>;

    const data = identityInfoCodec.toHuman() as DisplayNameResponse;

    if (data?.[0]?.info?.display?.Raw) {
      return data[0].info.display.Raw;
    }

    return null;
  } catch (error) {
    console.error('Error fetching display name:', error);
    throw error;
  }
}
