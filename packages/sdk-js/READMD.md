# Ava SDK for JavaScript/TypeScript

`@avaprotocol/sdk-js` is a simple, type-safe wrapper around gRPC designed to simplify integration with Ava Protocol’s AVS. It enables developers to interact with Ava Protocol efficiently, whether on the client-side or server-side, and provides full TypeScript support for a seamless development experience.

## Features

- Type-Safe SDK: Automatically generated TypeScript types from gRPC protocol buffers ensure type safety and reduce errors during development.
- Seamless Integration: Works in both Node.js and browser environments, optimized for frameworks like Next.js.
- Easy to Use: Abstracts the complexity of gRPC with a simple JavaScript/TypeScript API.
- Efficient Communication: Leverages gRPC for fast, efficient communication with Ava Protocol’s AVS (Actively Validated Services).

## Installation

To install `@avaprotocol/sdk-js`, use npm:

```bash
npm install @avaprotocol/sdk-js
```

Or with Yarn:

```bash
yarn add @avaprotocol/sdk-js
```

## Getting Started

Here’s a quick example of how to use the SDK to get started with Ava Protocol:

```typescript
import Client from "@avaprotocol/sdk-js";
import { getServerSession } from "next-auth";
import { isAuthKeyValid } from "./utils";
import { authOptions } from "./auth/[...nextauth]/route";

let avaClient: Client | null = null;
const EXPIRED_AT = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // 24 hours from now

async function initializeClient() {
  if (avaClient) return avaClient;

  if (!process.env.AVS_ENDPOINT) {
    throw new Error("AVS_ENDPOINT is not set in environment variables.");
  }

  avaClient = new Client({
    endpoint: process.env.AVS_ENDPOINT,
  });

  return avaClient;
}

/**
 * Get the client instance, lazy initialize it if it's not initialized yet
 * @returns
 */
export async function getClient() {
  if (avaClient) {
    return avaClient;
  }

  return await initializeClient();
}

/**
 * Get the auth key using authWithAPIKey() for a wallet address before user signs in with a wallet signature
 * @param walletAddress
 * @returns
 */
async function getPresignAuthKey(walletAddress: string): Promise<string> {
  const client = await getClient();

  // Since we almost certainly need this env variable, we throw an error if it's not set
  if (!process.env.AVS_API_KEY) {
    throw new Error("AVS_API_KEY is not set in environment variables.");
  }

  const resp = await client.authWithAPIKey(
    walletAddress,
    process.env.AVS_API_KEY,
    EXPIRED_AT
  );
  return resp.authKey;
}

/**
 * Get the auth key for a wallet address
 * First checks if the current session contains a valid auth key
 * If not, it will get the auth key using authWithAPIKey() for the wallet address
 * @param walletAddress
 * @returns
 */
export async function getAuthKey(
  walletAddress: string | undefined
): Promise<string | undefined> {
  const session = await getServerSession(authOptions);

  if (session?.user?.authKey) {
    if (isAuthKeyValid(session?.user?.authKey)) {
      return session?.user?.authKey;
    } else {
      console.warn(
        `AuthKey is found for ${session?.user?.walletAddress} in session, but expired. Atempting to use authWithAPIKey`
      );
    }
  }

  if (walletAddress) {
    return await getPresignAuthKey(walletAddress);
  }

  return undefined;
}
```

## Contributing

We welcome contributions! Feel free to submit pull requests or open issues for any bugs or feature requests.

## License

This project is licensed under the Apache 2.0 License. See the LICENSE file for more details.
