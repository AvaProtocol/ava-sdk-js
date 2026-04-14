/**
 * Local HTTP mock server for integration tests.
 *
 * The SDK tests talk to a real aggregator via gRPC, which in turn makes
 * HTTP calls to external URLs. This server runs on localhost so the
 * aggregator can reach it, giving tests deterministic responses without
 * depending on external services.
 *
 * Started in Jest globalSetup, stopped in globalTeardown.
 * See https://github.com/AvaProtocol/ava-sdk-js/issues/211
 */

import http from "http";

export const MOCK_SERVER_PORT = 19876;
export const MOCK_SERVER_HOST = `http://localhost:${MOCK_SERVER_PORT}`;

// Canned response data
const graphqlResponse = {
  data: {
    test: [
      { id: "1", name: "item_one", value: 100 },
      { id: "2", name: "item_two", value: 200 },
    ],
  },
};

const restGetResponse = {
  success: true,
  message: "Mock GET response",
  data: { id: "123", value: 42 },
};

const restPostResponse = {
  success: true,
  message: "Mock POST response",
  data: { id: "456", created: true },
};

function createMockServer(): http.Server {
  return http.createServer((req, res) => {
    const url = new URL(req.url || "/", `http://${req.headers.host}`);
    const path = url.pathname;

    // CORS headers (aggregator may send these)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
      res.writeHead(204);
      res.end();
      return;
    }

    // Route: /graphql — accept any query, return canned data
    if (path === "/graphql") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(graphqlResponse));
      return;
    }

    // Route: /get — REST GET endpoint
    if (path === "/get") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(restGetResponse));
      return;
    }

    // Route: /post — REST POST endpoint
    if (path === "/post") {
      // Collect body but we don't need it for the mock
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(restPostResponse));
      });
      return;
    }

    // Route: /posts/:id — REST GET for specific resource
    if (path.startsWith("/posts/")) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          id: path.split("/").pop(),
          title: "Mock Post",
          body: "This is a mock post response",
          userId: 1,
        })
      );
      return;
    }

    // Route: /status/:code — return specific HTTP status code with
    // standard status text (matches what curl/fetch would report)
    const statusMatch = path.match(/^\/status\/(\d+)$/);
    if (statusMatch) {
      const code = parseInt(statusMatch[1], 10);
      const statusTextMap: Record<number, string> = {
        400: "Bad Request",
        401: "Unauthorized",
        403: "Forbidden",
        404: "Not Found",
        429: "Too Many Requests",
        500: "Internal Server Error",
        502: "Bad Gateway",
        503: "Service Unavailable",
      };
      const statusText = statusTextMap[code] || "Error";
      res.writeHead(code, statusText, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: statusText, status: code }));
      return;
    }

    // Fallback: 200 that echoes the POST body so tests can verify
    // templated request bodies round-tripped correctly. Arbitrary paths
    // (e.g. template-resolved URLs like /{{pathParams.endpoint}}) are
    // accepted to avoid breaking tests that don't care about the path.
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      let echoedBody: unknown = null;
      if (body) {
        try {
          echoedBody = JSON.parse(body);
        } catch {
          echoedBody = body;
        }
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: true,
          message: "Mock server generic response",
          path,
          method: req.method,
          data: echoedBody,
        })
      );
    });
  });
}

// For globalSetup / globalTeardown
let serverInstance: http.Server | null = null;

export function startMockServer(): Promise<void> {
  return new Promise((resolve, reject) => {
    serverInstance = createMockServer();
    serverInstance.listen(MOCK_SERVER_PORT, () => {
      console.log(`\n  Mock server listening on ${MOCK_SERVER_HOST}\n`);
      resolve();
    });
    serverInstance.on("error", reject);
  });
}

export function stopMockServer(): Promise<void> {
  return new Promise((resolve) => {
    if (serverInstance) {
      serverInstance.close(() => resolve());
    } else {
      resolve();
    }
  });
}
