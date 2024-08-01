export const abi = [
  {
    inputs: [
      {
        internalType: 'uint64',
        name: 'market',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'order_id',
        type: 'uint64',
      },
    ],
    name: 'cancel_order',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint64',
        name: 'market',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'position_id',
        type: 'uint64',
      },
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        internalType: 'uint32',
        name: 'quantity',
        type: 'uint32',
      },
    ],
    name: 'close_position',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'market',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'tick_size',
        type: 'uint256',
      },
      {
        internalType: 'uint32',
        name: 'lifetime',
        type: 'uint32',
      },
      {
        internalType: 'uint8',
        name: 'initial_margin',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'maintenance_margin',
        type: 'uint8',
      },
      {
        internalType: 'uint32',
        name: 'contract_unit',
        type: 'uint32',
      },
      {
        internalType: 'uint8',
        name: 'contract_unit_decimals',
        type: 'uint8',
      },
    ],
    name: 'create_market',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint64',
        name: 'market',
        type: 'uint64',
      },
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        internalType: 'uint32',
        name: 'quantity',
        type: 'uint32',
      },
      {
        internalType: 'enum Market.OrderSide',
        name: 'order_side',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'margin',
        type: 'uint8',
      },
    ],
    name: 'create_order',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint64',
        name: 'market',
        type: 'uint64',
      },
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        internalType: 'uint32',
        name: 'quantity',
        type: 'uint32',
      },
      {
        internalType: 'enum Market.OrderSide',
        name: 'order_side',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'margin',
        type: 'uint8',
      },
    ],
    name: 'create_order_with_margin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint64',
        name: 'market',
        type: 'uint64',
      },
    ],
    name: 'delete_market',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint64',
        name: 'market',
        type: 'uint64',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint64',
        name: 'market',
        type: 'uint64',
      },
      {
        internalType: 'uint64',
        name: 'position_id',
        type: 'uint64',
      },
    ],
    name: 'mark_to_market',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint64',
        name: 'market',
        type: 'uint64',
      },
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
    ],
    name: 'oracle_price',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint64',
        name: 'market',
        type: 'uint64',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint64',
        name: 'market',
        type: 'uint64',
      },
    ],
    name: 'withdraw_all',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
