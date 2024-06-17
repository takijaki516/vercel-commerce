"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { Collection } from "@prisma/client";
import { toast } from "sonner";
import { CheckIcon, ReloadIcon } from "@radix-ui/react-icons";

import { createCollection } from "../../../collections/new/actions";
import {
  CreateProductFormValues,
  useProductFormContext,
} from "../provider/form-provider";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { getMessageFromCode } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function AdminNewCollectionPage() {
  const router = useRouter();
  const { existingCollections, setExistingCollections } =
    useProductFormContext();
  const { control, trigger } = useFormContext<CreateProductFormValues>();

  const onClickNext = async () => {
    const isValid = await trigger();
    if (isValid) {
      router.push("/admin/products/new/product");
    }
  };

  return (
    <div className="flex flex-col">
      <FormField
        control={control}
        name="collectionId"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Collection</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select a collection" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {existingCollections.map((item, idx) => (
                    <SelectItem key={idx} value={item.id}>
                      {item.title}
                    </SelectItem>
                  ))}
                  <AddNewCollectionDialog
                    setExistingCollections={setExistingCollections}
                  />
                </SelectContent>
              </Select>

              <Input type="hidden" name={field.name} value={field.value} />
            </FormItem>
          );
        }}
      />

      <Button type="button" onClick={onClickNext} className="mt-5">
        Next
      </Button>
    </div>
  );
}

function AddNewCollectionDialog({
  setExistingCollections,
}: {
  setExistingCollections: React.Dispatch<React.SetStateAction<Collection[]>>;
}) {
  const [result, dispatch] = useFormState(createCollection, undefined);
  const { pending } = useFormStatus();
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (result) {
      if (result.type === "error") {
        toast.error(getMessageFromCode(result.resultCode));
        setIsDialogOpen(false);
      } else {
        toast.success(getMessageFromCode(result.resultCode));
        setExistingCollections((prev) => [...prev, result.data!]);
        setIsDialogOpen(false);
      }
    }
  }, [result, router, setExistingCollections]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full text-xs">
          Add NewCollection
        </Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <form
          className="flex flex-col space-y-4"
          action={dispatch}
          onSubmit={(e) => e.stopPropagation()}
        >
          <div>
            <Label htmlFor="title">title</Label>
            <Input
              id="title"
              type="text"
              name="title"
              placeholder="enter title"
            />
          </div>

          <div>
            <Label htmlFor="description">description</Label>
            <Input
              id="description"
              type="text"
              name="description"
              placeholder="enter description"
            />
          </div>

          <Button
            className="col-start-2 col-end-4 w-full"
            aria-disabled={pending}
            type="submit"
          >
            {pending ? (
              <ReloadIcon />
            ) : (
              <div className="flex items-center">
                {"Create Collection"}
                <CheckIcon className="ml-2 h-6 w-6" />
              </div>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
