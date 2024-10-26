"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = exports.DEFAULT_JWT_EXPIRATION = void 0;
exports.getRpcEndpoint = getRpcEndpoint;
exports.DEFAULT_JWT_EXPIRATION = 24 * 60 * 60; // 24 hours
// Define the configs object with typed keys
var configs = {
    development: {
        endpoint: process.env.AVS_RPC_URL || "localhost:2206",
    },
    staging: {
        endpoint: "aggregator-holesky.avaprotocol.org:2206",
    },
    production: {
        endpoint: "aggregator.avaprotocol.org:2206",
    },
};
exports.configs = configs;
// Function to get RPC endpoint with improved type safety
function getRpcEndpoint(env) {
    return configs[env].endpoint;
}
