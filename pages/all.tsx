import { Layout } from "@components/common/";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { getConfig } from "@framework/api/config";
import { getAllProducts } from "@framework/product";
import { ProductCard } from "@components/product";
import { Grid } from "@components/ui/";
import { usePaginationProducts } from "@framework/product";
import { Button } from "@components/ui";

{
  /*
   * Jedes Framework (z.B Shopfiy) hat seine eigene API-config. Darin wird defeniert, welche API-Endpoints verwendet werden, welche Fetcher Functionen genommen werden etc.
   * Jedes Framework hat auch seine eigene Fetcher Funktion (utilities/fetch-api) und sein individuelles normalizen.
   * Die Framework Config muss dabei immer der common APiConfig Type entsprechen
   */
}
export async function getStaticProps() {
  const config = getConfig();

  const { products, navigationInfo } = await getAllProducts({
    config,
    variables: { first: 1 },
  });
  return {
    props: { products, navigationInfo },
  };
}

export default function Home({
  products,
  navigationInfo,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data, isLoading, size, setSize } = usePaginationProducts([
    { products, navigationInfo },
  ]);

  return (
    <>
      <Grid layout="C">
        {data &&
          data.map((parentArray) =>
            parentArray.products.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })
          )}

        <Button
          onClick={() => {
            setSize(size + 1);
          }}
          isLoading={isLoading}
          disabled={data ? !data.slice(-1)[0].navigationInfo.hasNextPage : true}
        >
          Load more
        </Button>
      </Grid>
    </>
  );
}

//hier gibst Du der 'Home' Componente ein neues Property. Und zwar die Layout COmponente
//Die kannst Du dann in _app.tsx abgreifen und als wrapper verwenden
Home.Layout = Layout;
