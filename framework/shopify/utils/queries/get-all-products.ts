const productConnection = `
   pageInfo {
     hasNextPage
     hasPreviousPage
   }
   edges {
    cursor,
     node {
       id
       title
       vendor
       handle
       description
       priceRange {
         minVariantPrice {
           amount
           currencyCode
         }
       }
       images(first: 1) {
         pageInfo {
           hasNextPage
           hasPreviousPage
         }
         edges {
           node {
             originalSrc
             altText
             width
             height
           }
         }
       }
     }
   }
 `;

const getAllProductsQuery = `
   query getAllProducts($first: Int = 250, $after: String ) {
     products(first: $first, after: $after) {
       ${productConnection}
     }
   }
 `;

export default getAllProductsQuery;
