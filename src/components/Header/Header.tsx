"use client";

import { lazy, Suspense } from "react";
import { Icon } from "../Icon/Icon";
import styles from "./Header.module.scss";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { openCart, selectCartItemsCount } from "@/src/store/slices/cart";

const Cart = lazy(() =>
  import("../Cart/Cart").then((module) => ({ default: module.Cart }))
);

export const Header = () => {
  const dispatch = useAppDispatch();
  const itemsCount = useAppSelector(selectCartItemsCount);

  const handleOpenCart = () => {
    dispatch(openCart());
  };

  return (
    <>
      <header className={styles.header} role="banner">
        <Icon name="logo" size={101} aria-hidden="true" />
        <button
          className={styles.bag}
          onClick={handleOpenCart}
          aria-label={`Abrir carrinho. ${itemsCount} ${itemsCount === 1 ? 'item' : 'itens'} no carrinho`}
          aria-expanded="false"
          type="button"
        >
          <Icon name="bag" size={33} aria-hidden="true" />
          <span aria-live="polite" aria-atomic="true">{itemsCount}</span>
        </button>
      </header>

      <Suspense
        fallback={<div style={{ display: "none" }}>Carregando carrinho...</div>}
      >
        <Cart />
      </Suspense>
    </>
  );
};