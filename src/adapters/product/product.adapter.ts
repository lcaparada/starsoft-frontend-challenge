import { Product } from "@/src/types/product.types";
import {
  GetAllProductsApiResponse,
  ApiProduct,
} from "@/src/services/product/types/product.service.types";

export class ProductAdapter {
  static toDomain(
    apiResponse: GetAllProductsApiResponse,
    page: number = 1,
    rows: number = 10
  ): {
    products: Product[];
    count: number;
    pagination: {
      page: number;
      rows: number;
      totalPages: number;
    };
  } {
    const products = (apiResponse?.products ?? []).map((apiProduct) =>
      this.mapApiProductToDomain(apiProduct)
    );
    const count = apiResponse?.count ?? 0;
    const totalPages = Math.ceil(count / rows) || 1;

    return {
      products,
      count,
      pagination: {
        page,
        rows,
        totalPages,
      },
    };
  }

  private static mapApiProductToDomain(apiProduct: ApiProduct): Product {
    const price = apiProduct?.price
      ? parseFloat(apiProduct.price)
      : 0;
    const parsedPrice = isNaN(price) ? 0 : price;

    return {
      id: apiProduct?.id?.toString() ?? "",
      title: apiProduct?.name ?? "",
      description: apiProduct?.description ?? "",
      price: parsedPrice,
      image: apiProduct?.image ?? "",
    };
  }
}

