import { QueryKeys } from "@/src/infra/query-keys";
import { productService } from "@/src/services";
import { OrderBy, SortBy } from "@/src/services/product/types/product.service.types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ProductAdapter } from "@/src/adapters/product/product.adapter";

interface UseGetAllProductsProps {
  initialPage?: number;
  rows?: number;
  sortBy?: SortBy;
  orderBy?: OrderBy;
}

export const useGetAllProducts = ({
  initialPage = 1,
  rows = 10,
  sortBy = "id",
  orderBy = "ASC",
}: UseGetAllProductsProps) => {
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [QueryKeys.GetAllProducts, orderBy, sortBy, rows, initialPage],
    queryFn: async ({ pageParam = initialPage }) => {
      const response = await productService.getAll({
        page: pageParam,
        orderBy,
        sortBy,
        rows,
      });
      return ProductAdapter.toDomain(response, pageParam, rows);
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined;
      return lastPage.pagination.page < lastPage.pagination.totalPages
        ? lastPage.pagination.page + 1
        : undefined;
    },
    initialPageParam: initialPage,
  });

  return { 
    data,
    products: data?.pages.flatMap((page) => page.products) ?? [],
    isLoading, 
    error, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage,
    total: data?.pages[0]?.count ?? 0,
    totalPages: data?.pages[0]?.pagination.totalPages ?? 0,
  };
};