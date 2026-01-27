import { ProgressBar } from "../ProgressBar/ProgressBar";
import { Icon, IconName } from "../Icon/Icon";
import styles from "./Button.module.scss";

interface ButtonProps extends React.ComponentProps<"button"> {
  label?: string;
  variant?: "primary" | "secondary";
  percentage?: number;
  icon?: IconName;
}

export const Button = ({
  variant = "primary",
  label,
  className,
  percentage,
  icon,
  ...props
}: ButtonProps) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    icon && styles.withIcon,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.buttonContainer}>
      {(!!percentage && percentage > 0) && <ProgressBar progress={percentage} />}
      <button
        className={buttonClasses}
        {...props}
      >
        {icon && <Icon name={icon} size={24} />}
        {label && <span>{label}</span>}
      </button>
    </div>
  );
};


