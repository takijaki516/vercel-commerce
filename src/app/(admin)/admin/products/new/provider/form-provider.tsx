"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFormState } from "react-dom";

import { Collection } from "@prisma/client";
import { Form } from "@/components/ui/form";

export const variantsOptions = ["xs", "sm", "md", "lg", "xl"] as const;

const createProductFormSchema = z.object({
  collectionTitle: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.string(),
  availableForSale: z.enum(["true", "false"]), // REVIEW:
  xs: z.enum(["true", "false"]),
  sm: z.enum(["true", "false"]),
  md: z.enum(["true", "false"]),
  lg: z.enum(["true", "false"]),
  xl: z.enum(["true", "false"]),
  mainImage: z.instanceof(File).optional(),
  images: z.instanceof(FileList).optional(),
});

export type CreateProductFormValues = z.infer<typeof createProductFormSchema>;

const defaultValues: CreateProductFormValues = {
  collectionTitle: "",
  title: "",
  description: "",
  price: "0",
  availableForSale: "false",
  xs: "false",
  sm: "false",
  md: "false",
  lg: "false",
  xl: "false",
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
  const [existingCollections, setExistingCollections] =
    React.useState<Collection[]>(collections);

  const form = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductFormSchema),
    defaultValues,
  });

  const onSubmit = async (formValues: CreateProductFormValues) => {
    console.log(formValues);
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
