import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Grid } from "@/components/grid";
import { defaultSort, sorting } from "@/lib/constants";
import { getCollection, getCollectionProducts } from "@/app/actions";
import ProductGridItems from "@/components/product-grid-items";

export async function generateMetadata({
  params,
}: {
  params: { collection: string };
}): Promise<Metadata> {
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  return {
    title: collection.title,
    description: collection.description,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { collection: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;
  const collectionWithProducts = await getCollectionProducts({
    collectTitle: params.collection,
    sortKey,
    reverse,
  });

  return (
    <section>
      {collectionWithProducts?.products.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={collectionWithProducts?.products} />
        </Grid>
      )}
    </section>
  );
}
