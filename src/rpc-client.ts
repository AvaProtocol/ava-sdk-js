export interface Rpc {
  // Add necessary methods based on your gRPC implementation
  // For example:
  request: (service: string, method: string, data: any) => Promise<any>;
}

// You can add a concrete implementation here if needed
