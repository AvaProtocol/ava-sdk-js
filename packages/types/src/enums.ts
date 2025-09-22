export enum WorkflowStatus {
  Active = "active",
  Completed = "completed",
  Failed = "failed",
  Canceled = "canceled",
  Executing = "executing",
}

export enum ExecutionStatus {
  Unspecified = "unspecified",
  Pending = "pending",
  Success = "success",
  Failed = "failed",
  PartialSuccess = "partialSuccess",
}

export enum TriggerType {
  Unspecified = "unspecified",
  Manual = "manualTrigger",
  FixedTime = "fixedTimeTrigger",
  Cron = "cronTrigger",
  Block = "blockTrigger",
  Event = "eventTrigger",
}

export enum NodeType {
  Unspecified = "unspecified",
  ETHTransfer = "ethTransfer",
  ContractWrite = "contractWrite",
  ContractRead = "contractRead",
  GraphQLQuery = "graphql",
  RestAPI = "restApi",
  CustomCode = "customCode",
  Branch = "branch",
  Filter = "filter",
  Loop = "loop",
}

export enum ExecutionMode {
  Sequential = "sequential",
  Parallel = "parallel",
}

export enum ErrorCode {
  // Standard success - no error
  ERROR_CODE_UNSPECIFIED = 0,
  
  // 1000-1999: Authentication and Authorization errors  
  UNAUTHORIZED = 1000,              // Invalid or missing authentication
  FORBIDDEN = 1001,                 // Insufficient permissions
  INVALID_SIGNATURE = 1002,         // Signature verification failed
  EXPIRED_TOKEN = 1003,             // Auth token has expired
  
  // 2000-2999: Resource Not Found errors
  TASK_NOT_FOUND = 2000,            // Task/workflow not found
  EXECUTION_NOT_FOUND = 2001,       // Execution not found  
  WALLET_NOT_FOUND = 2002,          // Smart wallet not found
  SECRET_NOT_FOUND = 2003,          // Secret not found
  TOKEN_METADATA_NOT_FOUND = 2004,  // Token metadata not found
  
  // 3000-3999: Validation and Bad Request errors
  INVALID_REQUEST = 3000,           // General request validation failed
  INVALID_TRIGGER_CONFIG = 3001,    // Trigger configuration is invalid
  INVALID_NODE_CONFIG = 3002,       // Node configuration is invalid
  INVALID_WORKFLOW = 3003,          // Workflow structure is invalid
  INVALID_ADDRESS = 3004,           // Blockchain address format invalid
  INVALID_SIGNATURE_FORMAT = 3005,  // Signature format invalid
  MISSING_REQUIRED_FIELD = 3006,    // Required field is missing
  
  // 4000-4999: Resource State errors
  TASK_ALREADY_EXISTS = 4000,       // Task with same ID already exists
  TASK_ALREADY_COMPLETED = 4001,    // Cannot modify completed task
  TASK_ALREADY_CANCELLED = 4002,    // Cannot modify cancelled task
  EXECUTION_IN_PROGRESS = 4003,     // Operation not allowed during execution
  WALLET_ALREADY_EXISTS = 4004,     // Wallet already exists for salt
  SECRET_ALREADY_EXISTS = 4005,     // Secret with same name exists
  
  // 5000-5999: External Service errors
  RPC_NODE_ERROR = 5000,            // Blockchain RPC node error
  TENDERLY_API_ERROR = 5001,        // Tenderly simulation error
  TOKEN_LOOKUP_ERROR = 5002,        // Token metadata lookup failed
  SIMULATION_ERROR = 5003,          // Workflow simulation failed
  
  // 6000-6999: Internal System errors
  STORAGE_UNAVAILABLE = 6000,       // Database/storage system unavailable
  STORAGE_WRITE_ERROR = 6001,       // Failed to write to storage
  STORAGE_READ_ERROR = 6002,        // Failed to read from storage
  TASK_DATA_CORRUPTED = 6003,       // Task data cannot be decoded
  EXECUTION_ENGINE_ERROR = 6004,    // Task execution engine error
  
  
  // 7000-7999: Rate Limiting and Quota errors
  RATE_LIMIT_EXCEEDED = 7000,       // API rate limit exceeded
  QUOTA_EXCEEDED = 7001,            // User quota exceeded
  TOO_MANY_REQUESTS = 7002,         // Too many concurrent requests
  
  // 8000-8999: Smart Wallet specific errors
  SMART_WALLET_RPC_ERROR = 8000,        // Smart wallet RPC call failed
  SMART_WALLET_NOT_FOUND = 8001,        // Smart wallet address not found
  SMART_WALLET_DEPLOYMENT_ERROR = 8002,  // Failed to deploy smart wallet
  INSUFFICIENT_BALANCE = 8003,           // Insufficient balance for operation
} 