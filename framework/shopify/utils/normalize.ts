import {
  MoneyV2,
  Product as ShopifyProduct,
  SelectedOption,
  Checkout,
  CheckoutLineItemEdge,
} from "../schema";
import { ImageEdge, ProductOption, ProductVariantConnection } from "../schema";

import { Product, NavigationInfo } from "@common/types/product";
import { Cart, LineItem } from "@common/types/cart";
import { PageInfo } from "../schema";

function normalizeProductImages({ edges }: { edges: ImageEdge[] }): any {
  {
    /*
     * Wenn shopify-local ausgewählt ist, nehm den path zu localen images
     * Wenn shopify als framework ausgewählt ist, nehm die richtige url
     * Wenn garkeine url, dann zeig placeholder image
     */
  }
  return edges.map(({ node: { originalSrc: url, ...rest } }) => ({
    url:
      process.env.NEXT_PUBLIC_FRAMEWORK === "shopify_local"
        ? `/images/${url}`
        : url ?? "/product-image-placeholder.svg",
    ...rest,
  }));
}

const normalizeLineItem = ({
  node: { id, title, variant, ...rest },
}: CheckoutLineItemEdge): LineItem => {
  return {
    id,
    variantId: String(variant?.id),
    productId: String(variant?.id),
    name: title,
    path: variant?.product?.handle ?? "",
    discounts: [],
    //Die ausgewählten optionen
    options: variant?.selectedOptions.map(({ name, value }: SelectedOption) => {
      const option = normalizeProductOption({
        id,
        name,
        values: [value],
      });

      return option;
    }),
    variant: {
      id: String(variant?.id),
      sku: variant?.sku ?? "",
      name: variant?.title,
      //Wenn local shopify, dann auf locales Verzeichnis. Wenn in Deployment, dann shopfiy src
      image: {
        url:
          process.env.NEXT_PUBLIC_FRAMEWORK === "shopify_local"
            ? `/images/${variant?.image?.originalSrc}`
            : variant?.image?.originalSrc ?? "/product-image-placeholder.svg",
      },
      requiresShipping: variant?.requiresShipping ?? false,
      // actual price
      price: variant?.priceV2.amount,
      // base price
      listPrice: variant?.compareAtPriceV2?.amount,
    },
    ...rest,
  };
};

export const normalizeCart = (checkout: Checkout): Cart => {
  return {
    id: checkout.id,
    createdAt: checkout.createdAt,
    completedAt: checkout.completedAt,
    currency: {
      code: checkout.totalPriceV2.currencyCode,
    },
    taxesIncluded: checkout.taxesIncluded,
    lineItemsSubtotalPrice: +checkout.subtotalPriceV2.amount,
    totalPrice: checkout.totalPriceV2.amount,
    lineItems: checkout.lineItems.edges.map(normalizeLineItem),
    discounts: [],
  };
};

function normalizeProductPrice({ amount, currencyCode }: MoneyV2) {
  return { value: +amount, currencyCode };
}

const normalizeProductOption = ({
  id,
  values,
  name: displayName,
}: ProductOption) => {
  const normalized = {
    id,
    displayName,
    values: values.map((value) => {
      let output: any = {
        label: value,
      };
      //color
      //colour
      //Colour

      if (
        displayName.match(/colou?r/gi) ||
        displayName.toLocaleLowerCase() == "farbe"
      ) {
        output = {
          ...output,
          hexColor: value,
        };
      }

      return output;
    }),
  };

  return normalized;
};

const normalizeProductVariants = ({ edges }: ProductVariantConnection) => {
  return edges.map(({ node }) => {
    const { id, selectedOptions, sku, title, priceV2, compareAtPriceV2 } = node;

    return {
      id,
      name: title,
      sku: sku || id,
      price: +priceV2.amount,
      listPrice: +compareAtPriceV2?.amount,
      requiresShipping: true,
      options: selectedOptions.map(({ name, value }: SelectedOption) => {
        const option = normalizeProductOption({
          id,
          name,
          values: [value],
        });

        return option;
      }),
    };
  });
};

export function normalizeProduct(
  productNode: ShopifyProduct,
  cursor?: string
): Product {
  const {
    id,
    title: name,
    handle,
    vendor,
    description,
    images: imagesConnection,
    priceRange,
    options,
    variants,
    ...rest
  } = productNode;
  const product = {
    id,
    name,
    cursor: cursor ? cursor : null,
    vendor,
    description,
    path: `/${handle}`, //Das ist der Slug
    slug: handle.replace(/^\/+|\/+$/g, ""), //Hier wird der Slug nochmal gemacht
    images: normalizeProductImages(imagesConnection),
    price: normalizeProductPrice(priceRange.minVariantPrice),
    options: options
      ? options
          .filter((o) => o.name !== "Title")
          .map((o) => normalizeProductOption(o))
      : [],
    variants: variants ? normalizeProductVariants(variants) : [],
    ...rest,
  };

  return product;
}

export function arraySelector(
  array: Product[],
  position: "first" | "last" | String
): string {
  if (position === "last") {
    if (array.length > 0) {
      return array[array.length - 1].cursor;
    } else {
      return array[0].cursor;
    }
  } else if (position === "first") {
    return array[0].cursor;
  } else {
    throw new Error("Invalid position parameter.");
  }
}

export type InputType = { products: Product[]; pageInfo: PageInfo };

export function normalizePageInfo({
  products,
  pageInfo,
}: InputType): NavigationInfo {
  {
    /*
     * Die Funktion gibt Werte zurück, die für die Pagination Navigiation verwendet werden. z.B via useSWRInfinity
     */
  }
  const navigationInfo = {
    lastProductCursor: arraySelector(products, "last"),
    firstProductCursor: arraySelector(products, "first"),
    hasNextPage: pageInfo.hasNextPage,
    hasPreviousPage: pageInfo.hasPreviousPage,
  };
  return navigationInfo;
}
