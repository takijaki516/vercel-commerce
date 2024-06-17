"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Collection } from "@prisma/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Form } from "@/components/ui/form";
import { createProduct, getSignedURL } from "../actions";

export const variantsOptions = ["xs", "sm", "md", "lg", "xl"] as const;

const createProductFormSchema = z.object({
  collectionId: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.string(),
  availableForSale: z.enum(["true", "false"]), // REVIEW:
  xs: z.string(),
  sm: z.string(),
  md: z.string(),
  lg: z.string(),
  xl: z.string(),
  mainImage: z.array(z.instanceof(File)).length(1).nullable(),
  images: z.array(z.instanceof(File)).length(3).nullable(),
});

export type CreateProductFormValues = z.infer<typeof createProductFormSchema>;

const defaultValues: CreateProductFormValues = {
  collectionId: "",
  title: "",
  description: "",
  price: "0",
  availableForSale: "false",
  xs: "0",
  sm: "0",
  md: "0",
  lg: "0",
  xl: "0",
  mainImage: null,
  images: null,
};

interface ProductFormContextTypes {
  existingCollections: Collection[];
  setExistingCollections: React.Dispatch<React.SetStateAction<Collection[]>>;
}

const ProductFormContext = React.createContext<
  ProductFormContextTypes | undefined
>(undefined);

export function useProductFormContext() {
  const context = React.useContext(ProductFormContext);
  if (!context) {
    throw new Error(
      "useProductFormContext must be used within a ProductFormProvider",
    );
  }
  return context;
}

export function HookFormProvider({
  collections,
  children,
}: {
  collections: Collection[];
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [existingCollections, setExistingCollections] =
    React.useState<Collection[]>(collections);

  const form = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductFormSchema),
    defaultValues,
  });

  // REVIEW:
  const computeSHA256 = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer); // REVIEW:
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(""); // REVIEW:
    return hashHex;
  };

  const onSubmit = async (formValues: CreateProductFormValues) => {
    try {
      const productTitle = formValues.title;

      // NOTE: first element is main image
      // TODO: refactor logic?
      const fileImages = [...formValues.mainImage!, ...formValues.images!];
      const signedUrlResults = fileImages.map(async (file) => {
        const signedUrl = await getSignedURL({
          fileSize: file.size,
          fileType: file.type,
          checksum: await computeSHA256(file),
          productTitle,
        });
        return { signedUrl, file };
      });

      const signedUrlWithFileArr = await Promise.all(signedUrlResults);

      signedUrlWithFileArr.forEach((signedUrlWithFile) => {
        if (signedUrlWithFile.signedUrl.failure !== undefined) {
          throw new Error("failed to get signed url");
        }
      });

      signedUrlWithFileArr.forEach(async (signedUrlWithFile) => {
        await fetch(signedUrlWithFile.signedUrl.success!.url, {
          method: "PUT",
          body: signedUrlWithFile.file,
          headers: {
            "Content-Type": signedUrlWithFile.file.type,
          },
        });
      });

      const { mainImage, images, ...createProductValue } = formValues;
      const imagesUrl = signedUrlWithFileArr.map((signedUrlWithFile) => {
        return signedUrlWithFile.signedUrl.success!.url;
      });
      await createProduct({ ...createProductValue, imagesUrl });

      toast.success("created product");
      router.replace("/admin/products");
    } catch (error) {
      toast.error("failed to create product");
    }
  };

  return (
    <ProductFormContext.Provider
      value={{ existingCollections, setExistingCollections }}
    >
      <Form {...form}>
        <form className="w-2/3 max-w-lg" onSubmit={form.handleSubmit(onSubmit)}>
          {children}
        </form>
      </Form>
    </ProductFormContext.Provider>
  );
}
