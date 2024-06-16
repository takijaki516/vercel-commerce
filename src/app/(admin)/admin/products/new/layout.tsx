import { getAllCollections } from "../../actions";
import { HookFormProvider } from "./provider/form-provider";

export default async function AdminNewProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const existingCollections = await getAllCollections();

  return (
    <div className="flex w-full flex-col items-center px-4 pb-6">
      <h1 className="pb-6 text-3xl">Add New Product</h1>
      <HookFormProvider collections={existingCollections}>
        {children}
      </HookFormProvider>
    </div>
  );
}
