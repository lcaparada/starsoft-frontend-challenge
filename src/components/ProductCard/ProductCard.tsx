"use client";

import Image from "next/image";
import styles from "./ProductCard.module.scss";
import { Button } from "../Button/Button";
import { Product } from "@/src/types";
import { ImageWithLoading } from "../ImageWithLoading/ImageWithLoading";
import { motion } from "motion/react";
import { useAppDispatch } from "@/src/store/hooks";
import { addItem, openCart } from "@/src/store/slices/cart";

interface ProductCardProps extends Product {
  index?: number;
}

export const ProductCard = ({
  id,
  title,
  description,
  price,
  image,
  index = 0,
}: ProductCardProps) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addItem({ id, title, description, price, image }));
    dispatch(openCart());
  };
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <section className={styles.imageContainer}>
        <ImageWithLoading
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
          <Button label="COMPRAR" onClick={handleAddToCart} />
        </div>
      </div>
    </motion.div>
  );
};