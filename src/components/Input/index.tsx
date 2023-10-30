import { InputHTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface InputType extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: string;
  iconColor?: string;
  error: boolean;
}

const Input = ({ label, icon, iconColor, error, ...props }: InputType) => {
  const Icon = icon ? (
    <span
      className={`fa ${icon} ${styles.inputIcon}`}
      style={{ color: iconColor || "#333" }}
    />
  ) : null;

  const Error = error ? (
    <p className={styles.error}>Campo {props.placeholder} é obrigatório</p>
  ) : null;

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.inputWrapper}
        style={{ borderColor: iconColor || "#333" }}
      >
        {Icon}
        <input className={styles.inputField} {...props} />
      </div>
      {Error}
    </div>
  );
};

export default Input;
