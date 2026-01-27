import styles from "./EmptyStateSkeleton.module.scss";

export const EmptyStateSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.iconSkeleton} />
      <div className={styles.titleSkeleton} />
      <div className={styles.descriptionSkeleton} />
    </div>
  );
};

