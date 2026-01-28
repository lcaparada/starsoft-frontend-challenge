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
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              handleClose();
            }
          }}
          aria-hidden="true"
          role="presentation"
        />
      )}
      <aside
        className={`${styles.cart} ${isOpen ? styles.open : ""}`}
        aria-label="Carrinho de compras"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        aria-hidden={!isOpen}
        hidden={!isOpen}
      >
        <div className={styles.cartHeader}>
          <button
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Fechar carrinho"
          >
            <Icon name="arrowLeft" size={24} />
          </button>
          <h2 className={styles.cartTitle} id="cart-title">Mochila de Compras</h2>
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
              <section className={styles.totalValue} aria-label={`Total do carrinho: ${total.toFixed(2)} ETH`}>
                <Image
                  src="/images/eth-logo.png"
                  alt=""
                  width={29}
                  height={29}
                  aria-hidden="true"
                />
                <span className={styles.totalValueText}>
                  {total.toFixed(2)} ETH
                </span>
              </section>
            </div>
            <div style={{ flexShrink: 0 }}>
              <Button
                label="FINALIZAR COMPRA"
                variant="primary"
                aria-label={`Finalizar compra no valor de ${total.toFixed(2)} ETH`}
              />
            </div>
          </>
        )}
      </aside>
    </>
  );
};

