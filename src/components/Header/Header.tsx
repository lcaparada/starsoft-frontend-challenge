"use client";

import { useState, lazy, Suspense } from "react";
import { Icon } from "../Icon/Icon";
import styles from "./Header.module.scss";

const Cart = lazy(() =>
  import("../Cart/Cart").then((module) => ({ default: module.Cart }))
);

export const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <Icon name="logo" size={101} />
        <button
          className={styles.bag}
          onClick={() => setIsCartOpen(true)}
          aria-label="Abrir carrinho"
        >
          <Icon name="bag" size={33} />
          <span>0</span>
        </button>
      </header>

      {isCartOpen && (
        <Suspense
          fallback={
            <div style={{ display: "none" }}>Carregando carrinho...</div>
          }
        >
          <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </Suspense>
      )}
    </>
  );
};