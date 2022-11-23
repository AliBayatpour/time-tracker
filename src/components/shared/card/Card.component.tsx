import styles from "./card.module.scss";

type Props = {
  children?: JSX.Element | JSX.Element[];
  className?: string;
  variant?: "primary" | "secondary" | "tertiary" | "basic";
};

const Card: React.FC<Props> = ({ variant, className, children }) => {
  return (
    <div
      className={`w-100 p-3 ${styles.card} ${
        styles["card--" + (variant ?? "basic")]
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
