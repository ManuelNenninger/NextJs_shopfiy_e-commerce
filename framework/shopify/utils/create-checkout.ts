import { ApiFetcher } from "@common/types/api";
import { Checkout, CheckoutCreatePayload, Maybe } from "@framework/schema";
import { checkoutCreateMutation } from "./mutations";
import Cookies from "js-cookie";
import {
  SHOPIFY_CHECKOUT_ID_COOKIE,
  SHOPIFY_CHECKOUT_URL_COOKIE,
  SHOPIFY_COOKIE_EXPIRE,
} from "@framework/const";

{
  /*
   * CheckOut ist eine async Funktion
   * Sie erhält eine fetch Funktion vom Typ Fetch
   * Sie gibt zurück data vom Typ CheckoutCreatePayload: {data: checkoutCreate: {....}}
   * createCheckout gibt nach destructuring nur checkout vom Typ Checkout zurück
   * es kann auch sein, dass Checkout undefinded ist.
   *
   * In checkout Data ist die CheckOut_id
   * Diese wird als Coockie in den Browser gesetzt
   * Ebenso die webURL die spezifisch auf den Shopify Webshop zeigt
   * Coocke namen sind in const.ts genau wie expirations Tage
   */
}
const createCheckout = async (
  fetch: ApiFetcher<{ checkoutCreate: CheckoutCreatePayload }>
): Promise<Checkout> => {
  const { data } = await fetch({
    query: checkoutCreateMutation,
  });

  const { checkout } = data.checkoutCreate;

  if (!checkout) {
    throw new Error("Checkout cannot be created!");
  }

  const checkoutId = checkout?.id;

  if (checkoutId) {
    const options = {
      expires: SHOPIFY_COOKIE_EXPIRE,
    };

    Cookies.set(SHOPIFY_CHECKOUT_ID_COOKIE, checkoutId, options);
    Cookies.set(SHOPIFY_CHECKOUT_URL_COOKIE, checkout?.webUrl, options);
  }
  return checkout;
};

export default createCheckout;
