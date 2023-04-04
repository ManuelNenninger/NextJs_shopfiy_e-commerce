import { ReactNode } from "react";
{
  /*
   * Der Core Api Provider bekommt hier die Framework (z.B Shopify) spezifische Config.
   * Ansonsten Wrapped er ganz normal die Children.
   * Der ApiProvider aus dem Framework wird dann in Layout um die Children gewrapped.
   * useApiProvider == useCoreApiProvider aus Common.
   */
}
import {
  ApiProvider as CoreApiProvider,
  useApiProvider as useCoreApiProvider,
} from "@common";
import { shopifyHooks } from "./hooks";

import { getConfig } from "./api/config";
const config = getConfig();

interface ShopifyApiProviderProps {
  children: ReactNode | ReactNode[];
}

export const ApiProvider = ({ children }: ShopifyApiProviderProps) => {
  return (
    <CoreApiProvider config={{ ...config }} hooks={shopifyHooks}>
      {children}
    </CoreApiProvider>
  );
};

export const useApiProvider = () => useCoreApiProvider();
