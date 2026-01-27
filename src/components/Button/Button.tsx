import styles from "./Button.module.scss";

interface ButtonProps extends React.ComponentProps<"button"> {
  label: string;
  variant?: "primary" | "secondary" | "tertiary";
  isLoading?: boolean;
}

export const Button = ({
  variant = "primary",
  label,
  isLoading = false,
  disabled,
  className,
  ...props
}: ButtonProps) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    isLoading && styles.loading,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      <span>{label}</span>
    </button>
  );
};


