import { FC } from "react";
import s from "./Swatch.module.css";
import { Check } from "@components/icons";
import cn from "classnames";
import { isDark } from "@lib/color";

//Oder interface Props extends ButtonHTMLAttributes<HTMLButtonElement>, damit onClick function nicht speziell def

interface Props {
  size?: "sm" | "md" | "lg";
  color?: string;
  label?: string;
  variant?: "size" | "color" | "größe" | "farbe" | string;
  active?: boolean;
  onClick: () => void;
}

const Swatch: FC<Props> = ({
  color,
  label,
  variant,
  active,
  size = "md",
  ...rest
}) => {
  label = label?.toLowerCase();
  variant = variant?.toLocaleLowerCase();

  const rootClassName = cn(s.root, {
    [s.active]: active,
    [s.color]: color,
    [s.size]: variant === "size",
    //Wenn die color dark ist, wird die ClassName dark angewendet
    [s.dark]: color && isDark(color),
    [s.sm]: size === "sm",
  });

  return (
    <button
      style={color ? { backgroundColor: color } : {}}
      className={rootClassName}
      {...rest}
    >
      {variant === "color" ||
        ("farbe" && active && (
          <span>
            <Check />
          </span>
        ))}
      {variant === "size" || variant === "größe" ? label : null}
    </button>
  );
};

export default Swatch;
