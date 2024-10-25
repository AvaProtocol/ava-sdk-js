// src/index.ts
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

// src/config.ts
var DEFAULT_JWT_EXPIRATION = 24 * 60 * 60;
var configs = {
  development: {
    endpoint: process.env.AVS_RPC_URL || "localhost:2206"
  },
  staging: {
    endpoint: "aggregator-holesky.avaprotocol.org:2206"
  },
  production: {
    endpoint: "aggregator.avaprotocol.org:2206"
  }
};

// src/auth.ts
var getKeyRequestMessage = (address, expiredAt) => {
  return `key request for ${address} expired at ${expiredAt}`;
};

// src/index.ts
import * as path from "path";
var protoPath = path.resolve(__dirname, "grpc_codegen", "avs.proto");
var packageDefinition = protoLoader.loadSync(protoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
var apProto = protoDescriptor.aggregator;
var BaseClient = class {
  // A JWT token for admin operations
  // protected wallet?: any;
  constructor(config) {
    this.endpoint = config.endpoint;
    this.rpcClient = new apProto.Aggregator(
      config.endpoint,
      // TODO: switch to the TLS after we're able to update all the operator
      grpc.credentials.createInsecure()
    );
  }
  async authWithJwtToken(address, jwtToken, expiredAt) {
    console.log("Authenticating with JWT token: ", jwtToken);
    const expirationTime = expiredAt || Math.floor(Date.now() / 1e3) + DEFAULT_JWT_EXPIRATION;
    const result = await this._callRPC(
      "GetKey",
      {
        owner: address,
        expired_at: expirationTime,
        signature: jwtToken
      }
    );
    this.adminToken = result.key;
    return { key: result.key };
  }
  // This flow can be used where the signature is generate from outside, such as in front-end and pass in
  async authWithSignature(address, signature, expiredAtEpoch) {
    console.log(
      "Authenticating with signature:",
      signature,
      "Expired at epoch:",
      expiredAtEpoch
    );
    let result = await this._callRPC("GetKey", {
      owner: address,
      expired_at: expiredAtEpoch,
      signature
    });
    this.adminToken = result.key;
    return { key: result.key };
  }
  async sendRequest(method, request = {}, metadata) {
    if (metadata === void 0) {
      metadata = new grpc.Metadata();
    }
    if (!this.adminToken) {
      throw new Error(
        "Authentication required. Please call authWithJwtToken() or authWithSignature() before making requests."
      );
    }
    metadata.add("adminToken", this.adminToken);
    return this._callRPC(method, request, metadata);
  }
  isAuthenticated() {
    return !!this.adminToken;
  }
  _callRPC(method, request = {}, metadata = new grpc.Metadata()) {
    return new Promise((resolve2, reject) => {
      this.rpcClient[method].bind(this.rpcClient)(
        request,
        metadata,
        (error, response) => {
          if (error) reject(error);
          else resolve2(response);
        }
      );
    });
  }
};
var Client = class extends BaseClient {
  constructor(config) {
    super(config);
  }
  async listTask() {
    return this.sendRequest("ListTasks");
  }
  async getSmartWalletAddress(address) {
    const result = await this.sendRequest(
      "GetSmartAccountAddress",
      { owner: address }
    );
    return result;
  }
  // TODO: generate the type def using protobuf typescriplt gen util
  async getTask(taskId) {
    const result = await this.sendRequest("GetTask", { bytes: taskId });
    return result;
  }
};
export {
  Client as default,
  getKeyRequestMessage
};
