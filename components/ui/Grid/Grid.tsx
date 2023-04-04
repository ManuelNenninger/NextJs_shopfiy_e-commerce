import { FunctionComponent, ReactNode } from "react";
import s from "./Grid.module.css";
import cn from "classnames";

interface Props {
  children: ReactNode[] | ReactNode;
  layout?: "A" | "B";
}

const Grid: FunctionComponent<Props> = ({ children, layout = "A" }) => {
  //Hier kominierst Du classNames jenachdem, welches Layout gewählt ist
  const rootClassNames = cn(s.root, {
    [s.layoutA]: layout === "A",
    [s.layoutB]: layout === "B",
  });

  return <div className={rootClassNames}>{children}</div>;
};

export default Grid;
