import { Cart } from "@common/types/cart";
import { useHook } from "@common/utils/use-hook";
import { useMutationHook } from "@common/utils/use-hook";

{
  /*
   * useAddItem hat hier keinen Typ zur vereinfachung.
   * Folge 204 gibt ein Beispiel, wie ein Typ zugewiesen wird
   */
}
const useAddItem = () => {
  const hook = useHook((hooks) => {
    return hooks.cart.useAddItem;
  });

  return useMutationHook({ ...hook });
};

export default useAddItem;

{
  /*
* Das ist das selbe wie: 

const useHook = (fn) => {
  const string = "test"
  return fn(string) //hier wird fn gecalled! In fn wird string übergeben
}
console.log(useHook((a)=> a)); // "test"
* HIER: 
* useHook wird eine Arrow-Funktion übergeben.
* Diese nimmt den Ihr übergebenen Hook und gibt den addItem Hook zurück

*/
}
