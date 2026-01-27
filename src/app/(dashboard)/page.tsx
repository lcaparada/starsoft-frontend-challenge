"use client";

import { lazy, Suspense } from "react";
import {
  ProductCard,
  ProductCardSkeleton,
  Button,
  EmptyStateSkeleton,
} from "@/src/components";
import styles from "./page.module.scss";
import { useGetAllProducts } from "@/src/use-cases";

const EmptyState = lazy(() =>
  import("@/src/components").then((module) => ({ default: module.EmptyState }))
);

export default function Home() {
  const {
    products,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    total,
  } = useGetAllProducts({
    initialPage: 1,
    rows: 8,
    sortBy: "id",
    orderBy: "ASC",
  });

  const displayedCount = products.length;
  const progressPercentage =
    total > 0 ? Math.round((displayedCount / total) * 100) : 0;
  const isComplete = !hasNextPage && displayedCount > 0;
  const buttonLabel = isComplete ? "Você já viu tudo" : "Carregar mais";

  if (isLoading) {
    return (
      <div className={styles.container}>
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (products.length === 0 && !isLoading) {
    return (
      <div className={styles.emptyStateContainer}>
        <Suspense fallback={<EmptyStateSkeleton />}>
          <EmptyState />
        </Suspense>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        {products.map((product, index) => (
          <ProductCard key={product.id} {...product} index={index} />
        ))}
      </div>
      <div className={styles.loadMoreContainer}>
        <Button
          label={buttonLabel}
          variant="secondary"
          size="lg"
          percentage={isComplete ? 100 : progressPercentage}
          onClick={() => fetchNextPage()}
          disabled={isComplete || isFetchingNextPage}
        />
      </div>
    </>
  );
}
