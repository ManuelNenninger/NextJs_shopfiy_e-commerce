import "@assets/main.css";
import "keen-slider/keen-slider.min.css";

import { AppProps } from "next/app";
import { FunctionComponent } from "react";
import { UIProvider } from "@components/ui/context";

interface LayoutProps {
  children?: React.ReactNode[] | React.ReactNode;
  layout?: "A" | "B";
}
//Wenn kein Layout vorhanden ist.
const Noop: FunctionComponent<LayoutProps> = ({ children }) => <>{children}</>;

{
  /*
   * AppProps & { Component: { Layout: FunctionComponent<LayoutProps> }
   * Du erweiterst die AppProps, der Component, um Layout. Layout ist eine FunctionComponent und bekommt Props (LayoutProps)
   */
}

function MyApp({
  Component,
  pageProps,
}: AppProps & { Component: { Layout: FunctionComponent<LayoutProps> } }) {
  const Layout = Component.Layout ?? Noop;

  return (
    <>
      <UIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UIProvider>
    </>
  );
}

export default MyApp;
