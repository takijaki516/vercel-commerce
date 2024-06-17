import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Suspense } from "react";
import { prismaDB } from "@/lib/prisma-db";

import { Footer } from "@/components/footer";
import { Gallery } from "@/components/product/gallery";
import { ProductDescription } from "@/components/product/product-description";
import { GridTileImage } from "@/components/grid/tile";

export async function generateMetadata({
  params: { id },
}: {
  params: {
    id: string;
  };
}): Promise<Metadata> {
  const product = await prismaDB.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    return notFound();
  }

  const { mainImage } = product;
  return {
    title: product.title,
    description: product.description,
    // TODO: openGraph를 위한 이미지를 추가
  };
}

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prismaDB.product.findUnique({
    where: {
      id,
    },
    include: {
      product_images: true,
      collection: true,
    },
  });

  if (!product) return notFound();

  // TODO: add jsonLD for SEO

  const productImages = [{ src: product.mainImage, altText: "main image" }];
  product.product_images.forEach((image, idx) => {
    productImages.push({ src: image.url, altText: `alt image ${idx + 1}` });
  });

  return (
    <>
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Suspense
              fallback={
                <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
              }
            >
              <Gallery images={productImages} />
            </Suspense>
          </div>

          <div className="basis-full lg:basis-2/6">
            <ProductDescription product={product} />
          </div>
        </div>

        <RelatedProducts
          collectionTitle={product.collection.title}
          productId={product.id}
        />
      </div>

      <Footer />
    </>
  );
}

async function RelatedProducts({
  collectionTitle,
  productId,
}: {
  collectionTitle: string;
  productId: string;
}) {
  // TODO: add filter to exclude current product
  const relatedProducts = await prismaDB.collection.findUnique({
    where: {
      title: collectionTitle,
      products: {
        some: {
          id: {
            not: productId,
          },
        },
      },
    },

    include: {
      products: true,
    },
  });

  if (!relatedProducts || relatedProducts.products.length === 0) {
    return null;
  }

  return (
    <div className="py-8">
      <h2 className="mb-4 text-xl font-bold">Related Products</h2>

      <ul className="no-scrollbar flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.products.map((product) => (
          <li
            key={product.id}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link href={`/product/${product.id}`}>
              <GridTileImage
                alt={product.title}
                label={{ title: product.title, amount: product.price }}
                src={product.mainImage}
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
