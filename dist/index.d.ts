import { Metadata } from '@grpc/grpc-js';

type Environment = "production" | "development" | "staging";
interface KeyExchangeResp {
    key: string;
}
interface ClientOption {
    privateKey?: string;
    jwtApiKey?: string;
    presignSignature?: string;
    signatureExpiredAt?: number;
    env?: Environment;
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
    smart_account_address: string;
}
interface TransactionResp {
    hash: string;
}
interface BalanceResp {
    balance: string;
}

declare const getKeyRequestMessage: (address: string, expiredAt: number) => string;

declare class BaseClient {
    readonly env: Environment;
    readonly rpcClient: any;
    protected authkey?: string;
    protected wallet?: any;
    constructor(opts: ClientOption);
    authWithJwtToken(address: string, jwtToken: string, expiredAt?: number): Promise<KeyExchangeResp>;
    authWithSignature(address: string, signature: string, expiredAtEpoch: number): Promise<KeyExchangeResp>;
    protected sendRequest<TResponse, TRequest extends object = {}>(method: string, request?: TRequest, metadata?: Metadata): Promise<TResponse>;
    isAuthenticated(): boolean;
    private _callRPC;
}
declare class Client extends BaseClient {
    constructor(config: ClientOption);
    listTask(): Promise<TaskListResp>;
    getSmartWalletAddress(address: string): Promise<SmartWalletResp>;
    getTask(taskId: string): Promise<any>;
}

export { type BalanceResp, type ClientOption, type Environment, type KeyExchangeResp, type SmartWalletResp, type TaskListResp, type TaskResp, type TransactionResp, Client as default, getKeyRequestMessage };
