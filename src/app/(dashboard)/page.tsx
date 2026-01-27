"use client";

import { Cart, ProductCard } from "@/src/components";
import styles from "./page.module.scss";
import { useState } from "react";

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(true);


  const handleCartClose = () => {
    setIsCartOpen(false);
  }

  return (
    <div className={styles.container}>
      {Array.from({ length: 10 }).map((_, index) => (
        <ProductCard key={index} title="Lorem Ipsum" />
      ))}
      <Cart isOpen={isCartOpen} onClose={handleCartClose} />
    </div>
  );
}
