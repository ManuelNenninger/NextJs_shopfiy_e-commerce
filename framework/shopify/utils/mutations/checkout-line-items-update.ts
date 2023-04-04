{
  /*
   * Die Queries findest Du auch unter dem NEXT-SHOPIFY-LOCAL-SERVER unter mutations
   */
}
import { checkoutDetailFragment } from "../common";

const checkoutLineItemUpdateMutation = /* GraphQL */ `
  mutation($checkoutId: ID!, $lineItems: [CheckoutLineItemUpdateInput!]!) {
    checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
      checkoutUserErrors {
        field
        message
      }
      checkout {
        ${checkoutDetailFragment}
      }
    }
  }
`;
export default checkoutLineItemUpdateMutation;
