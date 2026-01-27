import styles from "./Cart.module.scss";
import { Icon } from "../Icon/Icon";
import Image from "next/image";
import { Button } from "../Button/Button";
import { CartCard } from "../CartCard/CartCard";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Cart = ({ isOpen, onClose }: CartProps) => {
  return (
    <>
      {isOpen && (
        <div className={styles.overlay} onClick={onClose} aria-hidden="true" />
      )}
      <aside
        className={`${styles.cart} ${isOpen ? styles.open : ""}`}
        aria-label="Carrinho de compras"
      >
        <div className={styles.cartHeader}>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Fechar carrinho"
          >
            <Icon name="arrowLeft" size={24} />
          </button>
          <h2 className={styles.cartTitle}>Mochila de Compras</h2>
        </div>
        <div className={styles.cartCardsContainer}>
          <CartCard />
        </div>
        <div className={styles.totalContainer}>
          <span className={styles.totalText}>TOTAL</span>
          <section className={styles.totalValue}>
            <Image src="/images/eth-logo.png" alt="ETH Logo" width={29} height={29} />
            <span className={styles.totalValueText}>32 ETH</span>
          </section>
        </div>
        <Button label="FINALIZAR COMPRA" variant="primary" />
      </aside>
    </>
  );
};

