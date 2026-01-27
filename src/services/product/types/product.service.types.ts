export interface ApiProduct {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string; 
  createdAt: string;
}

export type SortBy = "name" | "price" | "createdAt" | "id";
export type OrderBy = "ASC" | "DESC";

export interface GetAllProductsParams {
  page?: number;
  rows?: number;
  sortBy?: SortBy;
  orderBy?: OrderBy;
}

export interface GetAllProductsApiResponse {
  products: ApiProduct[];
  count: number; 
}
