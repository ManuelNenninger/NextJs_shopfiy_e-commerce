import { getConfig } from "@framework/api/config";
import { useSWRInfinityHook } from "@common/utils/use-hook";
import { getAllProducts } from "@framework/product";
import { GetAllProductsReturnType } from "@common/types/product";
import { SWRInfiniteResponse } from "swr/infinite";

const useGetInfinityProducts = (
  initialData: GetAllProductsReturnType[]
): SWRInfiniteResponse<GetAllProductsReturnType> => {
  const config = getConfig();

  const queryFunction = (
    pageIndex: number,
    previousPageData: GetAllProductsReturnType
  ) => {
    return {
      config,
      variables: {
        first: 2, //Wie viele Produkte sollen bei jeder pagination hinzukommen
        after: previousPageData?.navigationInfo?.lastProductCursor,
      },
    };
  };

  return useSWRInfinityHook(getAllProducts, queryFunction, initialData);
};

export default useGetInfinityProducts;

{
  /*
   * die previousPageData ist beim initial render null
   * der parameter "after", welcher an getAllProducts übergeben wird, ist somit auch null.
   * Es werden somit die initialdaten des ersten fetch von getAllProducts nur validiert und erneut gefetched.
   * Bei jedem weiteren setSize wird in getKey der lastProductCursor dem "after" Parameter zugewiesen.
   * first ist dabei der Parameter der angibt, wie viele Producte nach dem letzten geladen werden
   * ----------
   * Initial Data ist vom Type GetAllProductsReturnType, da es der initiale fetch von egtAllProducts ist
   * useSWRInfinity gibt aber ein Array zurück, deshalb ist initialData ein Array (z.B [firstData, secondPagination, thirdPagination])
   */
}
