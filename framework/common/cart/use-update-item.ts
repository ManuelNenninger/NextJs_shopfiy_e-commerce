import { useHook, useMutationHook } from "@common/utils/use-hook";

{
  /*
   * Return Type wurde hier weggelassen.
   * Die Syntax ist somit besser verständlich und für spätere verwendung verständlicher
   * Falls doch benötigt, siehe Folge 224
   * Der Return Type ist: (input: UpdateItemDescriptor["fetcherInput"]) => Promise<UpdateItemDescriptor["data"]>
   * UpdateItemDescriptor ist aus @framework/cart/use-update-item
   */
}
const useUpdateItem = () => {
  const hook = useHook((hooks) => {
    return hooks.cart.useUpdateItem;
  });

  return useMutationHook({ ...hook });
};

export default useUpdateItem;
