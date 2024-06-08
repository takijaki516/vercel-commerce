"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { createUrl } from "@/lib/utils";
import { GridTileImage } from "../grid/tile";

export function Gallery({
  images,
}: {
  images: { src: string; altText: string }[];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const imageSearchParam = searchParams.get("image");
  const imageIndex = imageSearchParam ? parseInt(imageSearchParam) : 0;

  const nextSearchParams = new URLSearchParams(searchParams.toString());
  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  nextSearchParams.set("image", nextImageIndex.toString());
  const nextUrl = createUrl(pathname, nextSearchParams);

  const previousSearchParams = new URLSearchParams(searchParams.toString());
  const previousImageIndex =
    imageIndex === 0 ? images.length - 1 : imageIndex - 1;
  previousSearchParams.set("image", previousImageIndex.toString());
  const previousUrl = createUrl(pathname, previousSearchParams);

  const buttonClassName = "h-full px-6 transition-all ease-in-out";

  return (
    <>
      <div>
        {images[imageIndex] && (
          <Image
            className="h-full w-full object-contain"
            fill
            alt={images[imageIndex].altText as string}
            src={images[imageIndex].src}
          />
        )}

        {images.length > 1 ? (
          <div>
            <div>
              <Link
                href={previousUrl}
                className={buttonClassName}
                scroll={false} // REVIEW:
              >
                <ArrowLeftIcon />
              </Link>
              <div className="mx-1 h-6 w-px bg-neutral-500"></div>
              <Link href={nextUrl} className={buttonClassName} scroll={false}>
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        ) : null}
      </div>

      {images.length > 1 ? (
        <ul>
          {images.map((image, idx) => {
            const isActive = idx === imageIndex;
            const imageSearchParams = new URLSearchParams(
              searchParams.toString(),
            );

            imageSearchParams.set("image", idx.toString());

            return (
              <li key={image.src} className="h-20 w-20">
                <Link
                  href={createUrl(pathname, imageSearchParams)}
                  scroll={false}
                  className="h-full w-full"
                >
                  <GridTileImage
                    alt={image.altText}
                    src={image.src}
                    width={80}
                    height={80}
                    active={isActive}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
}
