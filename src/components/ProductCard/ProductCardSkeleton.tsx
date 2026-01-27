import styles from "./ProductCardSkeleton.module.scss";

export const ProductCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <section className={styles.imageContainer}>
        <div className={styles.imageSkeleton} />
      </section>
      <div>
        <section className={styles.infoContainer}>
          <div className={styles.titleSkeleton} />
          <div className={styles.descriptionSkeleton} />
          <div className={styles.descriptionSkeleton} />
        </section>
        <section className={styles.priceContainer}>
          <div className={styles.ethLogoSkeleton} />
          <div className={styles.priceSkeleton} />
        </section>
        <div className={styles.buttonSkeleton} />
      </div>
    </div>
  );
};

