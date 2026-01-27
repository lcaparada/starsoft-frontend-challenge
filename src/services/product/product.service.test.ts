import { ProductService } from "./product.service";
import { apiClient } from "@/src/lib/api";
import { GetAllProductsApiResponse } from "./types/product.service.types";

jest.mock("@/src/lib/api", () => ({
  apiClient: {
    get: jest.fn(),
  },
}));

describe("ProductService", () => {
  let service: ProductService;

  beforeEach(() => {
    service = new ProductService();
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("should call apiClient.get with correct URL and params", async () => {
      const mockResponse: GetAllProductsApiResponse = {
        products: [],
        count: 0,
      };
      (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

      await service.getAll({
        page: 1,
        rows: 10,
        sortBy: "name",
        orderBy: "ASC",
      });

      expect(apiClient.get).toHaveBeenCalledWith(
        "api/v1/products?page=1&rows=10&sortBy=name&orderBy=ASC"
      );
    });

    it("should call apiClient.get with base URL when no params provided", async () => {
      const mockResponse: GetAllProductsApiResponse = {
        products: [],
        count: 0,
      };
      (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

      await service.getAll();

      expect(apiClient.get).toHaveBeenCalledWith("api/v1/products?");
    });

    it("should return API response correctly", async () => {
      const mockResponse: GetAllProductsApiResponse = {
        products: [
          {
            id: 1,
            name: "Test Product",
            description: "Description",
            price: "100.00",
            image: "image.jpg",
            createdAt: "2024-01-01T00:00:00.000Z",
          },
        ],
        count: 1,
      };
      (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await service.getAll();

      expect(result).toEqual(mockResponse);
    });

    it("should handle errors and throw with custom message", async () => {
      const error = new Error("Network error");
      (apiClient.get as jest.Mock).mockRejectedValue(error);

      await expect(service.getAll()).rejects.toThrow(
        "Failed to fetch products: Network error"
      );
    });

    it("should handle unknown errors", async () => {
      (apiClient.get as jest.Mock).mockRejectedValue("Unknown error");

      await expect(service.getAll()).rejects.toThrow(
        "Failed to fetch products: Unknown error"
      );
    });

    it("should build query string with only provided params", async () => {
      const mockResponse: GetAllProductsApiResponse = {
        products: [],
        count: 0,
      };
      (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

      await service.getAll({
        page: 2,
        rows: 5,
      });

      expect(apiClient.get).toHaveBeenCalledWith(
        "api/v1/products?page=2&rows=5"
      );
    });

    it("should handle all query params correctly", async () => {
      const mockResponse: GetAllProductsApiResponse = {
        products: [],
        count: 0,
      };
      (apiClient.get as jest.Mock).mockResolvedValue(mockResponse);

      await service.getAll({
        page: 3,
        rows: 20,
        sortBy: "price",
        orderBy: "DESC",
      });

      expect(apiClient.get).toHaveBeenCalledWith(
        "api/v1/products?page=3&rows=20&sortBy=price&orderBy=DESC"
      );
    });
  });
});

