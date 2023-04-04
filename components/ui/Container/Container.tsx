import {
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
  ComponentType,
} from "react";

interface Props {
  children: ReactNode[] | ReactNode;
  //el ist ein Component, das HTML Atrribute tragen kann (wie id, lang, style) und ist ein HTML Element (wie p, h1)
  el?: ComponentType<HTMLAttributes<HTMLElement>>;
}

//el ist eine Komponente, die als prop el an die FunctionalCOmponent weitergegeben wird.
//Standard ist diese ein div
const Container: FunctionComponent<Props> = ({
  children,
  el: Component = "div",
}) => {
  return <Component className="px-6 mx-auto max-w-8xl">{children}</Component>;
};
export default Container;
