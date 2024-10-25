"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => Client,
  getKeyRequestMessage: () => getKeyRequestMessage
});
module.exports = __toCommonJS(src_exports);
var grpc = __toESM(require("@grpc/grpc-js"), 1);
var protoLoader = __toESM(require("@grpc/proto-loader"), 1);

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
var path = __toESM(require("path"), 1);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getKeyRequestMessage
});
