import Client from "../index";
import * as grpc from "@grpc/grpc-js";

jest.mock("@grpc/grpc-js");
jest.mock("../config", () => ({
  getRpcEndpoint: jest.fn().mockReturnValue("mock-endpoint"),
}));

describe("Client", () => {
  let client: Client;
  let mockGrpcClient: any;

  beforeEach(() => {
    mockGrpcClient = {
      GetKey: jest.fn(),
      ListTasks: jest.fn(),
      GetSmartAccountAddress: jest.fn(),
      GetTask: jest.fn(),
    };

    (grpc.loadPackageDefinition as jest.Mock).mockReturnValue({
      aggregator: {
        Aggregator: jest.fn().mockImplementation(() => mockGrpcClient),
      },
    });

    client = new Client({
      env: "test",
      jwtApiKey: "mock-jwt-key",
      owner: "mock-owner",
    });
  });

  test("authenticate with JWT key", async () => {
    const mockKey = "mock-auth-key";
    mockGrpcClient.GetKey.mockImplementation(
      (request: any, metadata: any, callback: any) => {
        callback(null, { key: mockKey });
      }
    );

    await client.authenticate();
    expect(mockGrpcClient.GetKey).toHaveBeenCalled();
    // You might need to access the private authkey field for this test
    // expect((client as any).authkey).toBe(mockKey);
  });

  test("listTask", async () => {
    const mockTasks = { tasks: [{ id: "1", name: "Task 1" }] };
    mockGrpcClient.ListTasks.mockImplementation(
      (request: any, metadata: any, callback: any) => {
        callback(null, mockTasks);
      }
    );

    await (client as any).authenticate(); // Authenticate first
    const result = await client.listTask();
    expect(result).toEqual(mockTasks);
  });

  test("getSmartWalletAddress", async () => {
    const mockAddress = {
      address: "0x1234567890123456789012345678901234567890",
    };
    mockGrpcClient.GetSmartAccountAddress.mockImplementation(
      (request: any, metadata: any, callback: any) => {
        callback(null, mockAddress);
      }
    );

    await (client as any).authenticate(); // Authenticate first
    const result = await client.getSmartWalletAddress();
    expect(result).toEqual(mockAddress);
  });

  test("getTask", async () => {
    const mockTask = { id: "1", name: "Task 1", details: "Some details" };
    mockGrpcClient.GetTask.mockImplementation(
      (request: any, metadata: any, callback: any) => {
        callback(null, mockTask);
      }
    );

    await (client as any).authenticate(); // Authenticate first
    const result = await client.getTask("1");
    expect(result).toEqual(mockTask);
  });
});
