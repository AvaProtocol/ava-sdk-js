import { startMockServer } from "./server";

export default async function globalSetup() {
  await startMockServer();
}
