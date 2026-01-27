import {
  GetAllProductsApiResponse,
  GetAllProductsParams,
} from "../types/product.service.types";

export interface IProductService {
  getAll(params?: GetAllProductsParams): Promise<GetAllProductsApiResponse>;
}

