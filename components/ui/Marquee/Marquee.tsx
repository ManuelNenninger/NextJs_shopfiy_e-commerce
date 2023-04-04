import { ReactNode, FC } from "react";
import MarqueeTicker from "react-fast-marquee";
import s from "./Marquee.module.css";
import cn from "classnames";

interface Props {
  children: ReactNode[] | ReactNode;
  variant?: "primary" | "secondary";
}

const Marquee: FC<Props> = ({ children, variant = "primary" }) => {
  const rootClassName = cn(s.root, {
    [s.secondary]: variant === "secondary",
  });

  return (
    <div className={rootClassName}>
      <MarqueeTicker speed={60}>
        {<div className={s.container}>{children}</div>}
      </MarqueeTicker>
    </div>
  );
};

export default Marquee;
