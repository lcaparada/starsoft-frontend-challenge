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
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      itemProp="name"
      itemScope
      itemType="https://schema.org/Product"
    >
      <section className={styles.imageContainer} aria-label={`Imagem do produto ${title}`}>
        <ImageWithLoading
          src={image}
          alt={`${title} - ${description}`}
          width={100}
          height={100}
          className={styles.image}
          loading={index < 4 ? "eager" : "lazy"}
        />
      </section>
      <article className={styles.content}>
        <section className={styles.infoContainer}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </section>
        <div className={styles.footer}>
          <section className={styles.priceContainer} aria-label={`Preço: ${price} ETH`}>
            <Image
              src={"/images/eth-logo.png"}
              alt=""
              width={29}
              height={29}
              aria-hidden="true"
            />
            <span>{price} ETH</span>
          </section>
          <Button
            label="COMPRAR"
            onClick={handleAddToCart}
            aria-label={`Adicionar ${title} ao carrinho por ${price} ETH`}
          />
        </div>
      </article>
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="price" content={price.toString()} />
      <meta itemProp="priceCurrency" content="ETH" />
    </motion.article>
  );
};