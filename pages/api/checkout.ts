import { NextApiRequest, NextApiResponse } from "next";
import { SHOPIFY_CHECKOUT_URL_COOKIE } from "@framework/const";

export default function checkout(req: NextApiRequest, res: NextApiResponse) {
  {
    /*
     * Deine WebApplikation setzt einen Coockie mit dem namen wie in SHOPIFY_CHECKOUT_URL_COOKIE
     * Hier ist die checkout Url hinterlegt
     * über req greifst  Du auf alle Coockies zu und wählst den, mit dem Namen aus SHOPIFY_CHECKOUT_URL_COOKIE
     * Wenn Coockie, dann redirect  zu der Url
     */
  }

  const { cookies } = req;
  const checkoutUrl = cookies[SHOPIFY_CHECKOUT_URL_COOKIE];

  if (checkoutUrl) {
    res.redirect(checkoutUrl);
  } else {
    res.redirect("/");
  }
}
