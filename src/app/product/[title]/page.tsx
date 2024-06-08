import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import * as React from "react";

import { Footer } from "@/components/footer";
import { GridTileImage } from "@/components/grid/tile";
import { getProductByTitle } from "@/app/actions";
import { Gallery } from "@/components/product/gallery";
import { Image } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: { title: string };
}): Promise<Metadata> {
  const product = await getProductByTitle(params.title);
  if (!product) return notFound();

  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: { title: string };
}) {
  const product = await getProductByTitle(params.title);

  if (!product) return notFound();

  const productJsonLd = {};

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <React.Suspense
              fallback={<div className="relative aspect-square h-full" />}
            >
              {/*  TODO: fix DB SCHEMA */}
              <Gallery
                images={product.images.map((image: Image) => ({
                  src: image.url,
                  altText: image.altText,
                }))}
              />
            </React.Suspense>
          </div>

          <div className="basis-full lg:basis-2/6">
            <ProductDescription />
          </div>
        </div>

        <RelatedProducts id={product.id} />
      </div>

      <Footer />
    </>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getRelatedProducts(id);

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product: any) => (
          <li key={product.title}>
            <Link href={`/product/${product.title}`}>
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.price,
                  currencyCode: product.currencyCode,
                }}
                src={product.featuredImage}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
