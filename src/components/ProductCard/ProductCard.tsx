import Image from "next/image"
import styles from "./ProductCard.module.scss"
import { Button } from "../Button/Button";

interface ProductCardProps {
  title: string;
}

export const ProductCard = ({ title }: ProductCardProps) => {
  return (
    <div className={styles.card}>
      <section className={styles.imageContainer}>
        <Image
          src="https://github.com/shadcn.png"
          alt="Product Card"
          width={100}
          height={100}
          className={styles.image}
        />
      </section>
      <div>
        <section className={styles.infoContainer}>
          <span className={styles.title}>{title}</span>
          <span className={styles.description}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
        </section>
        <section className={styles.priceContainer}>
          <Image src={"/images/eth-logo.png"} alt="ETH Logo" width={29} height={29} />
          <span >32 ETH</span>
        </section>
        <Button label="COMPRAR" />
      </div>

    </div>
  )
}