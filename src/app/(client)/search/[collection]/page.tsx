import { getProducts } from "../actions";
import { Grid } from "@/components/grid";
import ProductGridItems from "@/components/product-grid-items";
import { defaultSort, sorting } from "@/lib/constants";

// TODO: add generateMetadata
export const metadata = {
  title: "search",
  description: "search for products",
};

export default async function SearchPage({
  params,
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }; // REVIEW:
  params: { collection: string };
}) {
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) ?? defaultSort;

  const products = await getProducts({
    sortKey,
    reverse,
    query: searchValue,
    collectionTitle: params.collection,
  });

  const resultsText = products.length > 1 ? "results" : "result";

  return (
    <>
      {/* TODO: add search function */}
      {searchValue ? (
        <p className="mb-4">
          {products.length === 0
            ? "There are no products"
            : `Showing ${products.length} ${resultsText} for `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}

      {products.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      ) : null}
    </>
  );
}
