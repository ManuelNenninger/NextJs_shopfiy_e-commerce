import { useAddItem } from "@common/cart";
import { MutationHook } from "@common/types/hooks";
import { checkoutLineItemsAddMutation } from "@framework/utils/mutations";
import { Cart } from "@common/types/cart";
import { CheckoutLineItemsAddPayload } from "@framework/schema";
import { checkoutToCart, getCheckoutId } from "@framework/utils";

import useCart from "@common/cart/use-cart";

export type AddItemHookDescriptor = {
  fetcherInput: {
    variantId: string;
    quantity: number;
  };
  fetcherOutput: {
    checkoutLineItemsAdd: CheckoutLineItemsAddPayload;
  };
  data: Cart;
};

export default useAddItem;

{
  /*
* Im handler wird definiert, welche fetch Funktion verwendet wird um ein item zu adden
* Der handler aus framework/shopfiy/cart/use-add-item wird in hooks als useAddItem übergeben.
* Sämmtliche Hooks gehen als shopifyHooks in den shopify api-provider
* die wiederum in den coreApiProvider unter dem Folder common weitergegeneb werden. Der Provider (mit framework spezifischer Config & Hooks) Wrapped das Layout

* In common/cart gibt es eine use-add-item Folder mit der useAddItem-Funktion. Hier wird speziell die fetch Funktion zurückgegeben. 
* Die useAddItem-Funktion greift über eine FUnktion auf den useApiProvider (core aus Common) zu und greife auf hooks (hier shopifyhooks) zu
* In Shopifyhooks unter charts.useAddItem wird dieser hander zurück gegeben. 
* Es wird dann der Funktion handler.useHook der handler.fetcher als Argument übergeben.
* sodass am ende lediglich der fetcher (welcher hier definert ist) übergeben wird
* ----------------------------------------------
* Durch use-Add-Idem wird die individuelle CheckOut_Id zusammen mit der ausgewählten Produktvariante (in lineItems) dem Server übersendet. 
* Hier in index.json auf dem LocalShopfiyServer gibt es ein Json-Object (checkout.lineItems[...]) in dem die vom Client gesendeten Varianten hinterlegt sind.
* Durch den Query get-checkOut werden dem Client alle über  use-add-item hinzugefügten Items zugesendet.
* Die identifizierung läuft über den gesetzten CheckOutCookie Id
* ----------------------------------------------
* Zu mutate: updateCart aus useCart-Function:
* Nachdem via addItem ein neues Item zum CheckOut hinzugefügt wurde, ist (theoretisch) der CheckOut im Chart auf Client nicht aktuell mit dem checkout auf dem Shopify Server
* Somit ist der Cart im CartSidebar nicht aktuell
* ABER, da jedesmal nach dem betätigen von addItem ie CartSidebar geöffnet wird, wird auch jedesmal die function useCart durchlaufen
* und somit der aktuelle checkout vom Shopfiy Server angefragt.
* Auch revalidiert useSWR in useCart neue Daten
* DENNOCH sollte man über die mutate Funktion von useSWR die aktuellsten Daten (hier: der Ckeckout nach addItem) aktualisieren
* Gerade bei use-update-item ist die Funktion wichtig, da hier der Checkout upgedated wird und der Cart (und somit useSwr) nicht neu gecalled wird. Somit würde z.B der Checkout Pritce total immer gleich bleiben
* Da useCart die SWRResponse ist (also {data, error,  mutate, ...}), kannst Du hier einfach useCart initial aufrufen und und die mutate (hier updateCart genannt) übergeben
* Die letztendlich von useHook zurückgegebene async function Updated die Cart CheckOut Daten, sobald die Response (checkout) da ist.
*/
}
export const handler: MutationHook<AddItemHookDescriptor> = {
  fetcherOptions: {
    query: checkoutLineItemsAddMutation,
  },
  fetcher: async ({ fetch, input, options }) => {
    const variables = {
      checkoutId: getCheckoutId(),
      lineItems: [
        {
          variantId: input.variantId,
          quantity: 1,
        },
      ],
    };

    const { data } = await fetch({ ...options, variables });

    const cart = checkoutToCart(data.checkoutLineItemsAdd.checkout);
    return cart;
  },
  useHook: ({ fetch }) => {
    //Siehe erklärung
    const { mutate: updateCart } = useCart();

    return async (input) => {
      const response = await fetch(input);
      await updateCart(response, false);
      return response;
    };
  },
};
