import useCart from "@common/cart/use-cart";
import { Cart } from "@common/types/cart";
import { SWRHook } from "@common/types/hooks";
import { Checkout } from "@framework/schema";
import {
  createCheckout,
  getCheckoutQuery,
  checkoutToCart,
} from "@framework/utils";
import { useMemo } from "react";
import { useApiProvider } from "@common";
import Cookies from "js-cookie";

//!!!!
export default useCart;

export type UseCartHookDescriptor = {
  fetcherInput: {
    checkoutId: string;
  };
  fetcherOutput: {
    node: Checkout;
  };
  data: Cart;
};

export const handler: SWRHook<UseCartHookDescriptor> = {
  fetcherOptions: {
    query: getCheckoutQuery,
  },
  fetcher: async ({ fetch, options, input: { checkoutId } }) => {
    let checkout: Checkout;

    if (checkoutId) {
      const { data } = await fetch({
        ...options,
        variables: {
          checkoutId,
        },
      });

      checkout = data.node;
    } else {
      //Wenn keine CheckOut_Id (also Coockie) gesetzt ist, hol die CheckOut_Id von Shopify Server und den checkOut
      checkout = await createCheckout(fetch as any);
    }

    //Normalize CheckOut Response
    const cart = checkoutToCart(checkout);

    return cart;
  },
  useHook: ({ useData }) => {
    {
      /*
       * Wenn nach erfolgtem Kauf - also completed CheckOut - man zurück auf den Store geht, ist der CheckOut und seine Items immer noch da
       * Prüfe also, ob der CheckOut completed ist.
       * Falls ja, lösch den checkOut Coockie, sodass ein neuer angefertigt wird.
       * Hier wird über useApiProvider auf den Namen des CheckOut Coockies zugegriffen
       * Letztendlich ist das einfach unter const.ts die Konstatne SHOPIFY_CHECKOUT_ID_COOKIE.
       * Der Name ist abhängig vom Framework (shopify, shopify local)
       */
    }
    const { checkoutCookie } = useApiProvider();

    const result = useData({
      swrOptions: {
        revalidateOnFocus: false,
      },
    });
    if (result.data?.completedAt) {
      Cookies.remove(checkoutCookie);
    }
    //debugger;
    return useMemo(() => {
      return { ...result, isEmpty: (result.data?.lineItems.length ?? 0) <= 0 };
    }, [result]);
  },
};

{
  /*
Same wie: 

...
async fetcher({fetch, options}: any) {
     const data = await fetch({...options})
     return { data }
   },
....
*/
}
