import axios from "axios";

// Local mock server started in globalSetup (tests/mock-server/server.ts).
// The aggregator makes HTTP calls to this URL during test execution.
export const MOCKED_API_ENDPOINT_AGGREGATOR =
  "http://localhost:19876";

// Mock responses
export const mockRestApiResponse = {
  status: 200,
  data: {
    success: true,
    message: "Test successful",
    data: {
      id: "123",
      value: 42,
    },
  },
};

export const mockRestApiError = {
  status: 400,
  data: {
    success: false,
    message: "Test failed",
    error: "Invalid request",
  },
};

// Mock axios for REST API calls
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.post.mockImplementation((url: string) => {

  if (url === "http://localhost:3000/api/test") {
    return Promise.resolve(mockRestApiResponse);
  }

  console.log("[Mock] Unknown endpoint, returning error");
  return Promise.reject(new Error("Unknown API endpoint"));
});
