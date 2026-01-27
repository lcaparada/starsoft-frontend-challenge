import { apiClient } from "@/src/lib/api";
import { IProductService } from "./interfaces/product.service.interface";
import {
  GetAllProductsApiResponse,
  GetAllProductsParams,
} from "./types/product.service.types";

export class ProductService implements IProductService {
  private readonly basePath = "api/v1/products";

  async getAll(
    params?: GetAllProductsParams
  ): Promise<GetAllProductsApiResponse> {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(params ?? {}).forEach(([key, value]) => {
        queryParams.append(key, value.toString());
      });
      const response =
        await apiClient.get<GetAllProductsApiResponse>(`${this.basePath}?${queryParams.toString()}`);
      return response;
    } catch (error) {
      throw new Error(
        `Failed to fetch products: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }
}

export const productService = new ProductService()