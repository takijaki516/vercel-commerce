import { AddProduct } from "@/components/add-product";

export default async function AdminNewProductPage() {
  return (
    <div className="flex w-full flex-col items-center px-4">
      <h1 className="text-3xl">New Product</h1>
      <AddProduct />
    </div>
  );
}
