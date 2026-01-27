import { ProductAdapter } from "./product.adapter";
import { GetAllProductsApiResponse } from "@/src/services/product/types/product.service.types";

describe("ProductAdapter", () => {
  describe("toDomain", () => {
    it("should transform API response to domain format correctly", () => {
      const apiResponse: GetAllProductsApiResponse = {
        products: [
          {
            id: 1,
            name: "Test Product",
            description: "Test description",
            price: "100.50",
            image: "https://example.com/image.jpg",
            createdAt: "2024-01-01T00:00:00.000Z",
          },
        ],
        count: 1,
      };

      const result = ProductAdapter.toDomain(apiResponse, 1, 10);

      expect(result).toEqual({
        products: [
          {
            id: "1",
            title: "Test Product",
            description: "Test description",
            price: 100.5,
            image: "https://example.com/image.jpg",
          },
        ],
        count: 1,
        pagination: {
          page: 1,
          rows: 10,
          totalPages: 1,
        },
      });
    });

    it("should handle null/undefined values with defaults", () => {
      const apiResponse: GetAllProductsApiResponse = {
        products: [
          {
            id: 1,
            name: null as unknown as string,
            description: undefined as unknown as string,
            price: "invalid",
            image: null as unknown as string,
            createdAt: "2024-01-01T00:00:00.000Z",
          },
        ],
        count: 1,
      };

      const result = ProductAdapter.toDomain(apiResponse);

      expect(result.products[0]).toEqual({
        id: "1",
        title: "",
        description: "",
        price: 0,
        image: "",
      });
    });

    it("should calculate totalPages correctly", () => {
      const apiResponse: GetAllProductsApiResponse = {
        products: [],
        count: 32,
      };

      const result = ProductAdapter.toDomain(apiResponse, 1, 10);

      expect(result.pagination.totalPages).toBe(4); 
    });

    it("should handle empty products array", () => {
      const apiResponse: GetAllProductsApiResponse = {
        products: [],
        count: 0,
      };

      const result = ProductAdapter.toDomain(apiResponse);

      expect(result.products).toEqual([]);
      expect(result.count).toBe(0);
      expect(result.pagination.totalPages).toBe(1);
    });

    it("should handle null/undefined apiResponse", () => {
      const apiResponse = null as unknown as GetAllProductsApiResponse;

      const result = ProductAdapter.toDomain(apiResponse);

      expect(result.products).toEqual([]);
      expect(result.count).toBe(0);
      expect(result.pagination.totalPages).toBe(1);
    });

    it("should handle missing count with default", () => {
      const apiResponse = {
        products: [],
        count: undefined as unknown as number,
      } as GetAllProductsApiResponse;

      const result = ProductAdapter.toDomain(apiResponse);

      expect(result.count).toBe(0);
      expect(result.pagination.totalPages).toBe(1);
    });

    it("should convert price string to number correctly", () => {
      const apiResponse: GetAllProductsApiResponse = {
        products: [
          {
            id: 1,
            name: "Product",
            description: "Description",
            price: "182.00000000",
            image: "image.jpg",
            createdAt: "2024-01-01T00:00:00.000Z",
          },
        ],
        count: 1,
      };

      const result = ProductAdapter.toDomain(apiResponse);

      expect(result.products[0].price).toBe(182);
    });

    it("should handle invalid price string", () => {
      const apiResponse: GetAllProductsApiResponse = {
        products: [
          {
            id: 1,
            name: "Product",
            description: "Description",
            price: "not-a-number",
            image: "image.jpg",
            createdAt: "2024-01-01T00:00:00.000Z",
          },
        ],
        count: 1,
      };

      const result = ProductAdapter.toDomain(apiResponse);

      expect(result.products[0].price).toBe(0);
    });

    it("should handle multiple products correctly", () => {
      const apiResponse: GetAllProductsApiResponse = {
        products: [
          {
            id: 1,
            name: "Product 1",
            description: "Description 1",
            price: "100.00",
            image: "image1.jpg",
            createdAt: "2024-01-01T00:00:00.000Z",
          },
          {
            id: 2,
            name: "Product 2",
            description: "Description 2",
            price: "200.00",
            image: "image2.jpg",
            createdAt: "2024-01-02T00:00:00.000Z",
          },
        ],
        count: 2,
      };

      const result = ProductAdapter.toDomain(apiResponse, 1, 10);

      expect(result.products).toHaveLength(2);
      expect(result.products[0].id).toBe("1");
      expect(result.products[1].id).toBe("2");
      expect(result.products[0].title).toBe("Product 1");
      expect(result.products[1].title).toBe("Product 2");
    });

    it("should use custom page and rows values", () => {
      const apiResponse: GetAllProductsApiResponse = {
        products: [],
        count: 50,
      };

      const result = ProductAdapter.toDomain(apiResponse, 2, 5);

      expect(result.pagination.page).toBe(2);
      expect(result.pagination.rows).toBe(5);
      expect(result.pagination.totalPages).toBe(10);
    });

    it("should handle zero count with default totalPages", () => {
      const apiResponse: GetAllProductsApiResponse = {
        products: [],
        count: 0,
      };

      const result = ProductAdapter.toDomain(apiResponse, 1, 10);

      expect(result.pagination.totalPages).toBe(1);
    });
  });
});

