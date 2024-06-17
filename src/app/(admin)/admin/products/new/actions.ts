"use server";

import { auth } from "@/auth";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomBytes } from "node:crypto";
import { prismaDB } from "@/lib/prisma-db";

import { CreateProductFormValues } from "./provider/form-provider";

const s3Client = new S3Client({
  region: process.env.AWS_BUCKER_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});

type CreateProductParams = Omit<
  CreateProductFormValues,
  "mainImage" | "images"
> & {
  imagesUrl: string[];
};

export async function createProduct(formValues: CreateProductParams) {
  const session = await auth();
  if (!session) {
    return { failure: "Not authenticated" };
  }

  // TODO: add server side validation
  await prismaDB.product.create({
    data: {
      title: formValues.title,
      description: formValues.description,
      price: +formValues.price,
      availableForSale: Boolean(formValues.availableForSale),
      mainImage: formValues.imagesUrl[0].split("?")[0], // NOTE: first element is main image,
      product_images: {
        create: formValues.imagesUrl.slice(1).map((imageUrl) => {
          return {
            url: imageUrl.split("?")[0],
          };
        }),
      },
      size_variants: {
        create: [
          { size: "xs", count: +formValues.xs },
          { size: "sm", count: +formValues.sm },
          { size: "md", count: +formValues.md },
          { size: "lg", count: +formValues.lg },
          { size: "xl", count: +formValues.xl },
        ],
      },
      collection: {
        connect: {
          id: formValues.collectionId,
        },
      },
    },
  });
}

export async function getSignedURL({
  checksum,
  fileSize,
  fileType,
  productTitle,
}: GetSignedURLParams): Promise<SignedURLResponse> {
  const session = await auth();
  if (!session) {
    return { failure: "Not authenticated" };
  }

  if (!allowedFileTypes.includes(fileType)) {
    return { failure: "File type not allowed" };
  }

  if (fileSize > maxFileSize) {
    return { failure: "File size too large" };
  }

  const fileName = generateFileName();

  const pubObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: `${productTitle}/${fileName}`,
    ContentType: fileType,
    ContentLength: fileSize,
    ChecksumSHA256: checksum,
    Metadata: {
      productTitle: productTitle,
      // TODO: add user id??
    },
  });

  const signedUrl = await getSignedUrl(s3Client, pubObjectCommand, {
    expiresIn: 60, // 60 seconds
  });

  return { success: { url: signedUrl } };
}

const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];

const maxFileSize = 10 * 1024 * 1024; // 10 MB

const generateFileName = (bytes = 32) => randomBytes(bytes).toString("hex");

type SignedURLResponse =
  | { failure?: undefined; success: { url: string } }
  | { failure: string; success?: undefined };

type GetSignedURLParams = {
  fileType: string;
  fileSize: number;
  checksum: string;
  productTitle: string;
};
