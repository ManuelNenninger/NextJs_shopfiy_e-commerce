import { createContext, ReactNode, useContext, useMemo } from "react";
import { ApiConfig, ApiProviderContext } from "./types/api";
import { ApiHooks } from "./types/hooks";
import { SHOPIFY_CHECKOUT_ID_COOKIE } from "@framework/const";

{
  /*
   * Das ist der Core ApiProvider
   * Er stellt Api-Configs wie die Fetcher Funktion, den API-Endpoint und Keys zur verfügung
   * Er ist unspezifisch vom Framework
   * Damit er die Framework spezifischen Configuration (fetcher Funktion, Endpoint, ...) bekommt, wird er vom Framework (index.tx) importiert
   * und erhält die Framework speztifische Config.
   * Im Layout wird dann der ApiProvider Wrapper um die Children gewrapped.
   */
}

interface ApiProviderProps {
  children: ReactNode | ReactNode[];
  config: ApiConfig;
  hooks: ApiHooks;
}

export const ApiContext = createContext<Partial<ApiProviderContext>>({});

export const ApiProvider = ({ children, config, hooks }: ApiProviderProps) => {
  {
    /*
     * Vo der Framework Config wird hier die CoreCOnfig gebaut
     * Es wird nur die Fetcher - Funktion übergeben
     */
  }
  const coreConfig = useMemo(() => {
    return {
      fetcher: config.fetch,
      hooks,
      checkoutCookie: config.checkoutCookie,
    };
  }, [config.fetch, config.checkoutCookie, hooks]);

  return (
    <ApiContext.Provider value={coreConfig}>{children}</ApiContext.Provider>
  );
};

export const useApiProvider = () => {
  return useContext(ApiContext) as ApiProviderContext;
};
