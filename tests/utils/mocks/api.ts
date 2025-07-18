import axios from "axios";

// A mocked URL set up on the aggregator to return a mock response for testing purpose
export const MOCKED_API_ENDPOINT_AGGREGATOR =
  "https://mock-api.ap-aggregator.local";

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
