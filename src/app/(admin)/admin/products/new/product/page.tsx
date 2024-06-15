"use client";

import { useFormContext } from "react-hook-form";
import { CheckIcon, CircleIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { CreateProductFormValues } from "../provider/form-provider";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { variantsOptions } from "../provider/form-provider";
import { Button } from "@/components/ui/button";

export default function AdminNewProductPage() {
  const router = useRouter();
  const { control, trigger } = useFormContext<CreateProductFormValues>();

  const onClickNext = async () => {
    const isValid = await trigger();
    if (isValid) {
      router.push("/admin/products/new/images");
    }
  };

  return (
    <div className="flex flex-col space-y-8">
      <FormField
        control={control}
        name="title"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>product title</FormLabel>
              <FormControl>
                <Input type="text" placeholder="enter title" {...field} />
              </FormControl>
            </FormItem>
          );
        }}
      />

      <FormField
        control={control}
        name="description"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>product description</FormLabel>
              <FormControl>
                <Input type="text" placeholder="enter description" {...field} />
              </FormControl>
            </FormItem>
          );
        }}
      />

      <FormField
        control={control}
        name="price"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>product price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="enter price" {...field} />
              </FormControl>
            </FormItem>
          );
        }}
      />

      <FormField
        control={control}
        name="availableForSale"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>is product available for sale</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="true" />
                    </FormControl>
                    <FormLabel>SALE</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="false" />
                    </FormControl>
                    <FormLabel>NOT SALE</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          );
        }}
      />

      <div className="flex w-full space-x-8">
        {variantsOptions.map((variant, idx) => (
          <FormField
            key={idx}
            control={control}
            name={variant}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>{variant}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="true" />
                        </FormControl>
                        <FormLabel>
                          <CircleIcon />
                        </FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="false" />
                        </FormControl>
                        <FormLabel>
                          <Cross1Icon />
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              );
            }}
          />
        ))}
      </div>

      <div className="flex w-full flex-col space-y-2">
        <Button
          type="button"
          onClick={() => {
            router.back();
          }}
        >
          previous
        </Button>
        <Button type="button" onClick={onClickNext}>
          Next
        </Button>
      </div>
    </div>
  );
}
