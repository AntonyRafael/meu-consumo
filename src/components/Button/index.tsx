import { ButtonHTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  rounded?: boolean;
  fullWidth?: boolean;
  textColor?: string;
  backgroundColor?: string;
}

const Button = ({
  children,
  onClick,
  className,
  rounded = false,
  fullWidth = false,
  textColor = "white",
  backgroundColor = "#1C575E",
  tabIndex = -1,
  disabled = false,
  ...props
}: IButtonProps) => {
  return (
    <button
      className={`${styles.button} ${disabled && styles.disabled} ${className}`}
      tabIndex={tabIndex}
      style={{
        borderRadius: rounded ? "25px" : "8px",
        width: fullWidth ? "100%" : "auto",
        color: textColor,
        backgroundColor,
      }}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
