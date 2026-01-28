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
      <section className={styles.container} aria-label="Carregando produtos" aria-busy="true">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} aria-label={`Carregando produto ${index + 1}`} />
        ))}
      </section>
    );
  }

  if (products.length === 0 && !isLoading) {
    return (
      <section className={styles.emptyStateContainer} aria-label="Nenhum produto encontrado">
        <Suspense fallback={<EmptyStateSkeleton />}>
          <EmptyState />
        </Suspense>
      </section>
    );
  }

  return (
    <>
      <section className={styles.container} aria-label="Lista de produtos">
        {products.map((product, index) => (
          <ProductCard key={product.id} {...product} index={index} />
        ))}
      </section>
      <nav className={styles.loadMoreContainer} aria-label="Navegação de produtos">
        <Button
          label={buttonLabel}
          variant="secondary"
          size="lg"
          percentage={isComplete ? 100 : progressPercentage}
          onClick={() => fetchNextPage()}
          disabled={isComplete || isFetchingNextPage}
          aria-label={isComplete ? "Todos os produtos foram carregados" : `Carregar mais produtos. ${progressPercentage}% carregado`}
        />
      </nav>
    </>
  );
}
