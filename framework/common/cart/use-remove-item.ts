import { useHook, useMutationHook } from "@common/utils/use-hook";
import { RemoveItemDescriptor } from "@framework/cart/use-remove-item";

const useRemoveItem = () => {
  const hook = useHook((hooks) => {
    return hooks.cart.useRemoveItem;
  });

  return useMutationHook<RemoveItemDescriptor>({ ...hook });
};

export default useRemoveItem;
