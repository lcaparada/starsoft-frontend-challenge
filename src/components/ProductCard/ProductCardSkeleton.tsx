import styles from "./ProductCardSkeleton.module.scss";

interface ProductCardSkeletonProps {
  "aria-label"?: string;
}

export const ProductCardSkeleton = ({ "aria-label": ariaLabel }: ProductCardSkeletonProps = {}) => {
  return (
    <div className={styles.card} aria-label={ariaLabel || "Carregando produto"} aria-busy="true">
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

