interface KeyExchangeResp {
  key: string;
}

interface ClientOption {
  privateKey?: string;
  jwtApiKey?: string;
  env?: string;
  owner?: string;
}

interface TaskResp {
  id: string;
  status: string;
  result?: any;
  error?: string;
}

interface TaskListResp {
  tasks: TaskResp[];
}

interface SmartWalletResp {
  address: string;
}

interface TransactionResp {
  hash: string;
}

interface BalanceResp {
  balance: string;
}
