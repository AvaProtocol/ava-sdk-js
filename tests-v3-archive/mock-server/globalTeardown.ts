import { stopMockServer } from "./server";

export default async function globalTeardown() {
  await stopMockServer();
}
