import Image from "next/image"
import styles from "./ProductCard.module.scss"
import { Button } from "../Button/Button";
import { Product } from "@/src/types";



export const ProductCard = ({ title, description, price, image }: Product) => {
  return (
    <div className={styles.card}>
      <section className={styles.imageContainer}>
        <Image
          src={image}
          alt="Product Card"
          width={100}
          height={100}
          className={styles.image}
        />
      </section>
      <div className={styles.content}>
        <section className={styles.infoContainer}>
          <span className={styles.title}>{title}</span>
          <span className={styles.description}>{description}</span>
        </section>
        <div className={styles.footer}>
          <section className={styles.priceContainer}>
            <Image src={"/images/eth-logo.png"} alt="ETH Logo" width={29} height={29} />
            <span>{price} ETH</span>
          </section>
          <Button label="COMPRAR" />
        </div>
      </div>
    </div>
  );
};