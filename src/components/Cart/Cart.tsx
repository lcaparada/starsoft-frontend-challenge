"use client";

import styles from "./Cart.module.scss";
import { Icon } from "../Icon/Icon";
import Image from "next/image";
import { Button } from "../Button/Button";
import { CartCard } from "../CartCard/CartCard";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import {
  closeCart,
  selectCartItems,
  selectCartTotal,
  selectCartIsOpen,
} from "@/src/store/slices/cart";

export const Cart = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectCartIsOpen);
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);

  const handleClose = () => {
    dispatch(closeCart());
  };

  return (
    <>
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={handleClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`${styles.cart} ${isOpen ? styles.open : ""}`}
        aria-label="Carrinho de compras"
      >
        <div className={styles.cartHeader}>
          <button
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Fechar carrinho"
          >
            <Icon name="arrowLeft" size={24} />
          </button>
          <h2 className={styles.cartTitle}>Mochila de Compras</h2>
        </div>
        <div className={styles.cartCardsContainer}>
          {items.length === 0 ? (
            <div className={styles.emptyCart}>
              <p>Seu carrinho está vazio</p>
            </div>
          ) : (
            items.map((item, index) => <CartCard key={item.id} {...item} index={index} />)
          )}
        </div>
        {items.length > 0 && (
          <>
            <div className={styles.totalContainer}>
              <span className={styles.totalText}>TOTAL</span>
              <section className={styles.totalValue}>
                <Image
                  src="/images/eth-logo.png"
                  alt="ETH Logo"
                  width={29}
                  height={29}
                />
                <span className={styles.totalValueText}>
                  {total.toFixed(2)} ETH
                </span>
              </section>
            </div>
            <div style={{ flexShrink: 0 }}>
              <Button label="FINALIZAR COMPRA" variant="primary" />
            </div>
          </>
        )}
      </aside>
    </>
  );
};

