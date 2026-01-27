"use client";

import { ProductCard, ProductCardSkeleton } from "@/src/components";
import styles from "./page.module.scss";
import { useGetAllProducts } from "@/src/use-cases";

export default function Home() {
  const { products, isLoading } = useGetAllProducts({
    initialPage: 1,
    rows: 8,
    sortBy: "id",
    orderBy: "ASC",
  });

  if (isLoading) {
    return (
      <div className={styles.container}>
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
