"use client";

import Image from "next/image";
import styles from "./CartCard.module.scss";
import { Button } from "../Button/Button";
import { Counter } from "../Counter/Counter";
import { ImageWithLoading } from "../ImageWithLoading/ImageWithLoading";
import { useAppDispatch } from "@/src/store/hooks";
import { updateQuantity, removeItem } from "@/src/store/slices/cart";
import { CartItem } from "@/src/store/slices/cart";
import { motion } from "motion/react";

type CartCardProps = CartItem & {
  index?: number;
};

export const CartCard = ({
  id,
  title,
  description,
  price,
  image,
  index = 0,
  quantity,
}: CartCardProps) => {
  const dispatch = useAppDispatch();

  const handleIncrement = () => {
    dispatch(updateQuantity({ id, quantity: quantity + 1 }));
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      dispatch(updateQuantity({ id, quantity: quantity - 1 }));
    } else {
      dispatch(removeItem(id));
    }
  };

  const handleRemove = () => {
    dispatch(removeItem(id));
  };

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}>
      <section className={styles.imageContainer}>
        <ImageWithLoading
          src={image}
          alt={title}
          width={161}
          height={161}
          className={styles.image}
        />
      </section>
      <section className={styles.infoContainer}>
        <span className={styles.title}>{title}</span>
        <span className={styles.description}>{description}</span>
        <div className={styles.priceContainer}>
          <Image
            src={"/images/eth-logo.png"}
            alt="ETH Logo"
            width={29}
            height={29}
          />
          <span>{price} ETH</span>
        </div>
        <div className={styles.counterContainer}>
          <Counter
            value={quantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
          <Button icon="trash" onClick={handleRemove} />
        </div>
      </section>
    </motion.div>
  );
};