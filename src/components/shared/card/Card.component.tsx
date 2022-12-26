import classes from "./card.module.scss";

type Props = {
  children?: JSX.Element | JSX.Element[];
  className?: string;
  variant?: "primary" | "secondary" | "tertiary" | "basic";
  styles?: React.CSSProperties | undefined;
};

const Card: React.FC<Props> = ({ variant, className, children, styles }) => {
  return (
    <div
      className={`w-100 p-3 ${classes.card} ${
        classes["card--" + (variant ?? "basic")]
      } ${className}`}
      style={styles}
    >
      {children}
    </div>
  );
};

export default Card;
