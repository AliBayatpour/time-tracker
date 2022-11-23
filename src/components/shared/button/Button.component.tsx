import { Link } from "react-router-dom";
import styles from "./button.module.scss";

type Props = {
  onClick?: () => void;
  variant?: "primary" | "secondary" | "tertiary" | "basic";
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  children?: JSX.Element | string;
  className?: string;
  size?: "default" | "large" | "small" | "fab" | "round";
  role?: "button" | "link";
  to?: string;
};

const Button: React.FC<Props> = ({
  onClick,
  type,
  disabled = false,
  variant,
  children,
  className,
  size,
  role = "button",
  to = "/",
}) => {
  if (role === "button") {
    return (
      <button
        className={`d-flex align-items-center justify-content-center ${
          styles.btn
        } ${styles["btn--" + (variant ?? "basic")]}  ${
          styles["btn--" + (size ?? "default")]
        } ${className}`}
        onClick={onClick}
        disabled={disabled}
        type={type ?? "button"}
      >
        {children}
      </button>
    );
  }
  return (
    <Link
      className={`d-flex align-items-center justify-content-center ${
        styles.btn
      } ${styles["btn--" + (variant ?? "basic")]}  ${
        styles["btn--" + (size ?? "default")]
      } ${className}`}
      to={to}
    >
      {children}
    </Link>
  );
};

export default Button;
