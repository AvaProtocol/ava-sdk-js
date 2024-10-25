import { Metadata } from '@grpc/grpc-js';

declare const getKeyRequestMessage: (address: string, expiredAt: number) => string;

type Environment = "production" | "development" | "staging";
interface KeyExchangeResp {
    key: string;
}
interface ClientParams {
    adminToken?: string;
    endpoint: string;
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

declare class BaseClient {
    readonly endpoint: string;
    readonly rpcClient: any;
    protected adminToken?: string;
    constructor(config: ClientParams);
    authWithJwtToken(address: string, jwtToken: string, expiredAt?: number): Promise<KeyExchangeResp>;
    authWithSignature(address: string, signature: string, expiredAtEpoch: number): Promise<KeyExchangeResp>;
    protected sendRequest<TResponse, TRequest extends object = {}>(method: string, request?: TRequest, metadata?: Metadata): Promise<TResponse>;
    isAuthenticated(): boolean;
    private _callRPC;
}
declare class Client extends BaseClient {
    constructor(config: ClientParams);
    listTask(): Promise<TaskListResp>;
    getSmartWalletAddress(address: string): Promise<SmartWalletResp>;
    getTask(taskId: string): Promise<any>;
}

export { type BalanceResp, type ClientParams, type Environment, type KeyExchangeResp, type SmartWalletResp, type TaskListResp, type TaskResp, type TransactionResp, Client as default, getKeyRequestMessage };
