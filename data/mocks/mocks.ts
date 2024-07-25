/* Place for object, responses mocks */
/* User Settlements Mock */

import { MarketSettlementsType } from '@/types/marketSettlementsTypes';

const mock: MarketSettlementsType[] = [
  {
    amount: '360',
    type: 'OUTGOING',
    timestamp: '2024-06-20T20:35:29.000000Z',
    market: {
      id: '9223372036854775820',
      ticker: 'BIGSB_EL:BIDENX2024',
    },
  },
  {
    amount: '360',
    type: 'INGOING',
    timestamp: '2024-06-20T20:35:29.000000Z',
    market: {
      id: '9223372036854775820',
      ticker: 'BIGSB_EL:BIDENX2024',
    },
  },
  {
    amount: '89',
    type: 'OUTGOING',
    timestamp: '2024-06-20T20:39:41.000000Z',
    market: {
      id: '9223372036854775811',
      ticker: 'NYMEX:MCLQ2024',
    },
  },
  {
    amount: '32',
    type: 'INGOING',
    timestamp: '2024-06-20T20:39:41.000000Z',
    market: {
      id: '9223372036854775811',
      ticker: 'NYMEX:MCLQ2024',
    },
  },
];
