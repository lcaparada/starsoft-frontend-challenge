import styles from "./EmptyState.module.scss";
import { Icon } from "../Icon/Icon";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export const EmptyState = ({
  title = "Nenhum produto encontrado",
  description = "Não encontramos produtos no momento. Tente novamente mais tarde.",
}: EmptyStateProps) => {
  return (
    <div className={styles.container} role="status" aria-live="polite">
      <Icon name="bag" size={64} aria-hidden="true" />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

