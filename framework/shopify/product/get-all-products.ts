import {
  fetchApi,
  normalizeProduct,
  getAllProductsQuery,
  normalizePageInfo,
} from "../utils";
import { ProductConnection } from "../schema";
import { GetAllProductsReturnType } from "@common/types/product";
import { ApiConfig } from "@common/types/api";
import { Variables } from "@common/types/api";

type ReturnType = {
  products: ProductConnection;
};

type PropTypes = {
  config: ApiConfig;
  variables?: Variables;
};

const getAllProducts = async ({
  config,
  variables,
}: PropTypes): Promise<GetAllProductsReturnType> => {
  const { data } = await config.fetch<ReturnType>({
    query: getAllProductsQuery,
    variables,
  });

  const products =
    data.products.edges.map(({ node: product, cursor }) => {
      return normalizeProduct(product, cursor);
    }) ?? null;

  const navigationInfo = normalizePageInfo({
    products: products,
    pageInfo: data?.products?.pageInfo,
  });

  return { products, navigationInfo };
};

export default getAllProducts;

{
  /*
   *The cursor field is a string value that represents the position of the resource in the list.
   * You can use the cursor value to paginate through the list of resources by passing it as the after parameter in a subsequent query. For example, to retrieve the * next page of products after the first page, you would pass the cursor value of the last product in the first page as the after parameter in your next query.
   */
}
