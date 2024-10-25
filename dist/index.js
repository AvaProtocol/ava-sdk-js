// src/index.ts
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

// src/config.ts
var DEFAULT_JWT_EXPIRATION = 24 * 60 * 60;
var configs = {
  development: {
    AVS_RPC_URL: process.env.AVS_RPC_URL || "localhost:2206"
  },
  staging: {
    AVS_RPC_URL: "aggregator-holesky.avaprotocol.org:2206"
  },
  production: {
    AVS_RPC_URL: "aggregator.avaprotocol.org:2206"
  }
};
function getRpcEndpoint(env) {
  return configs[env].AVS_RPC_URL;
}

// src/auth.ts
var getKeyRequestMessage = (address, expiredAt) => {
  return `key request for ${address} expired at ${expiredAt}`;
};

// src/index.ts
var packageDefinition = protoLoader.loadSync("./grpc_codegen/avs.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
var apProto = protoDescriptor.aggregator;
var BaseClient = class {
  constructor(opts) {
    this.env = opts.env || "production";
    this.rpcClient = new apProto.Aggregator(
      getRpcEndpoint(this.env),
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
    this.authkey = result.key;
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
    this.authkey = result.key;
    return { key: result.key };
  }
  async sendRequest(method, request = {}, metadata) {
    if (metadata === void 0) {
      metadata = new grpc.Metadata();
    }
    if (!this.authkey) {
      throw new Error(
        "Authentication required. Please call authWithJwtToken() or authWithSignature() before making requests."
      );
    }
    metadata.add("authkey", this.authkey);
    return this._callRPC(method, request, metadata);
  }
  isAuthenticated() {
    return !!this.authkey;
  }
  _callRPC(method, request = {}, metadata = new grpc.Metadata()) {
    return new Promise((resolve, reject) => {
      this.rpcClient[method].bind(this.rpcClient)(
        request,
        metadata,
        (error, response) => {
          if (error) reject(error);
          else resolve(response);
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
