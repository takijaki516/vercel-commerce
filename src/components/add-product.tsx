"use client";

import * as React from "react";
import { ReloadIcon, CheckIcon } from "@radix-ui/react-icons";
import { useFormState, useFormStatus } from "react-dom";
import { Collection } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createCollection } from "@/app/(admin)/admin/collections/new/actions";
import { getAllCollections } from "@/app/(admin)/admin/products/new/actions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { getMessageFromCode } from "@/lib/utils";

interface AddProductProps {
  collections: Collection[];
}

export function AddProduct({ collections }: AddProductProps) {
  const router = useRouter();
  const [availableForSaleValue, setAvailableForSaleValue] = React.useState<
    boolean | undefined
  >();
  const [existingCollections, setExistingCollections] =
    React.useState<Collection[]>(collections);

  return (
    <form className="grid w-full gap-4 lg:grid-cols-4">
      <div className="col-span-2 flex flex-col space-y-5">
        
      </div>

      <div className="col-span-2 flex flex-col justify-between space-y-3">
        <div>
          <div>
            <Label>main image</Label>
            <Input />
          </div>

          <div>
            <Label>2 more images</Label>
            <Input />
          </div>
        </div>

        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="col-start-2 col-end-4 w-full" aria-disabled={pending}>
      {pending ? (
        <ReloadIcon />
      ) : (
        <div className="flex items-center">
          {"Create Account"}
          <CheckIcon className="ml-2 h-6 w-6" />
        </div>
      )}
    </Button>
  );
}
