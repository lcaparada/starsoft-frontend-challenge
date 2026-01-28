import { Icon } from "../Icon/Icon";
import styles from "./Counter.module.scss";

interface CounterProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  "aria-label"?: string;
}

export const Counter = ({
  value,
  onIncrement,
  onDecrement,
  min = 0,
  max,
  disabled = false,
  "aria-label": ariaLabel,
}: CounterProps) => {
  const canDecrement = !disabled && value > min;
  const canIncrement = !disabled && (max === undefined || value < max);

  return (
    <div
      className={styles.counter}
      role="group"
      aria-label={ariaLabel || "Contador de quantidade"}
    >
      <button
        type="button"
        className={`${styles.counterButton} ${styles.decrement}`}
        onClick={onDecrement}
        disabled={!canDecrement}
        aria-label="Diminuir quantidade"
      >
        <Icon name="minus" size={16} aria-hidden="true" />
      </button>
      <span className={styles.counterValue} aria-live="polite" aria-atomic="true">
        {value}
      </span>
      <button
        type="button"
        className={`${styles.counterButton} ${styles.increment}`}
        onClick={onIncrement}
        disabled={!canIncrement}
        aria-label="Aumentar quantidade"
      >
        <Icon name="plus" size={16} aria-hidden="true" />
      </button>
    </div>
  );
};

