import { getKeyRequestMessage } from "../dist";
import { ethers } from "ethers";
import _ from "lodash";

// Get wallet address from private key
export async function getAddress(privateKey: string): Promise<string> {
  const wallet = new ethers.Wallet(privateKey);
  return wallet.address;
}

// Generate a signed message from a private key
export async function generateSignature(
  privateKey: string,
  expiredAt: number
): Promise<string> {
  const wallet = new ethers.Wallet(privateKey);
  const message = getKeyRequestMessage(wallet.address, expiredAt);

  // console.log("Signing message:", message, "Expired at:", expiredAt);

  const signature = await wallet.signMessage(message);

  return signature;
}

// Helper function to ensure environment variables are defined
export function requireEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Required environment variable "${name}" is not set`);
  }
  return value;
}

let tasksToRemove: number[] = [];
export const queueTaskCleanup = (id: string) => {
  if (id in tasksToRemove) {
      return;
  }
  tasksToRemove.push(id);
}

export const teardown = async (client, authKey): Promise<void> => {
  await Promise.all(tasksToRemove.map(async (id) => {
    try {
      await client.deleteTask(id, { authKey });
    } catch (e) {
      // this is a cleanup during test, it isn't an issue if the delete failed.
      console.log("cannot cleanup task id. please clean up manually", id, e)
    }
  }));

  tasksToRemove = [];
}