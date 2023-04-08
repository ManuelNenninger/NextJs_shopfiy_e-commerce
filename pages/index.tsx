import { Layout } from "@components/common/";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { getConfig } from "@framework/api/config";
import { getAllProducts } from "@framework/product";
import { ProductCard } from "@components/product";
import { Grid, Hero, Marquee } from "@components/ui/";

{
  /*
   * Jedes Framework (z.B Shopfiy) hat seine eigene API-config. Darin wird defeniert, welche API-Endpoints verwendet werden, welche Fetcher Functionen genommen werden etc.
   * Jedes Framework hat auch seine eigene Fetcher Funktion (utilities/fetch-api) und sein individuelles normalizen.
   * Die Framework Config muss dabei immer der common APiConfig Type entsprechen
   */
}
export async function getStaticProps() {
  const config = getConfig();

  const { products } = await getAllProducts({
    config,
    variables: { first: 3 },
  });
  return {
    props: { products },
  };
}

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const message: string = "Hello World";

  return (
    <>
      <Grid>
        {products.slice(0, 3).map((product) => {
          console.log(product);
          return <ProductCard key={product.id} product={product} />;
        })}
      </Grid>
      <Hero
        headline="Cookies, ice cream and muffin"
        description="Marshmallow tart jelly icing cotton candy tootsie roll cotton candy candy canes. Cake liquorice sesame snaps. Cupcake cake cheesecake pie marshmallow lollipop soufflé marshmallow dessert. Cheesecake jujubes halvah chupa chups lollipop tootsie roll. Jelly-o tiramisu jelly toffee cake croissant lemon drops pudding. Donut sesame snaps gummi bears toffee. Sesame snaps jelly-o oat cake chocolate marzipan cake lollipop. Gingerbread cheesecake jujubes fruitcake cake. Tiramisu cotton candy marzipan candy canes oat cake pudding bonbon."
      />
      <Marquee>
        {products.slice(0, 3).map((product) => {
          console.log(product);
          return (
            <ProductCard key={product.id} variant="slim" product={product} />
          );
        })}
      </Marquee>
      <Grid layout="B">
        {products.slice(0, 3).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </>
  );
}

//hier gibst Du der 'Home' Componente ein neues Property. Und zwar die Layout COmponente
//Die kannst Du dann in _app.tsx abgreifen und als wrapper verwenden
Home.Layout = Layout;
