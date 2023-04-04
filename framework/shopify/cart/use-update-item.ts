import { useUpdateItem } from "@common/cart";
import { checkoutLineItemsUpdateMutation } from "@framework/utils/mutations";
import { checkoutToCart, getCheckoutId } from "@framework/utils";
import { CheckoutLineItemsUpdatePayload } from "@framework/schema";
import { Cart } from "@common/types/cart";
import { MutationHook } from "@common/types/hooks";
import useCart from "./use-cart";

export default useUpdateItem;

export type UpdateItemDescriptor = {
  fetcherInput: {
    id: string;
    variantId: string;
    quantity: number;
  };
  fetcherOutput: {
    checkoutLineItemsUpdate: CheckoutLineItemsUpdatePayload;
  };
  data: Cart;
};

export const handler: MutationHook<UpdateItemDescriptor> = {
  fetcherOptions: {
    query: checkoutLineItemsUpdateMutation,
  },
  async fetcher({ input: item, options, fetch }) {
    const variables = {
      checkoutId: getCheckoutId(),
      lineItems: [
        {
          id: item.id,
          variantId: item.variantId,
          quantity: item.quantity ?? 1,
        },
      ],
    };

    const { data } = await fetch({
      ...options,
      variables,
    });

    const cart = checkoutToCart(data.checkoutLineItemsUpdate.checkout);
    return cart;
  },
  useHook: ({ fetch }) => {
    const { mutate: updateCart } = useCart();

    return async (input) => {
      const data = await fetch(input);
      updateCart(data, false);
      return data;
    };
  },
};
