import { useHook, useSWRHook } from "../utils/use-hook";
import { ApiHooks } from "@common/types/hooks";
import Cookies from "js-cookie";
import { useApiProvider } from "@common";
import { SWRResponse } from "swr";
import { Cart } from "@common/types/cart";

export type UseCartType = SWRResponse<Cart, any> & {
  isEmpty: boolean;
};
//ACHTUNG!: Der Response Type von useCart ist nicht wie in Folge 208, da so viel übersichtlicher
const useCart = (): UseCartType => {
  const hook = useHook((hooks: ApiHooks) => hooks.cart.useCart);
  const { checkoutCookie } = useApiProvider();

  {
    /*
     * In useSWRHook wird fetcherOptions, fetcher und useHook übergeben
     * fetcher wird allerdings durch fetcherWrapper überschrieben
     * fetcherWrapper gibt den selben fetcher aus hook.fetcher zurück
     * Wird fetcher dann in useData aus dem File use-hook gecalled, werden ihm Argumente übergeben. Hier als context zusammengefasst
     * Context.input bekommt dann die CheckOutId
     * Du könntest auch in useData schreiben: 
    try {
      return await hook.fetcher({
        fetch: fetcher,
        options: hook.fetchOptions,
        input: {checkoutId: Cookies.get(SHOPIFY_CHECKOUT_ID_COOKIE)},
      });
    } catch (error) {
      throw error;
    }
     */
  }
  const fetcherWrapper: typeof hook.fetcher = (context) => {
    context.input.checkoutId = Cookies.get(checkoutCookie);

    return hook.fetcher(context);
  };
  return useSWRHook({ ...hook, fetcher: fetcherWrapper });
};

export default useCart;
