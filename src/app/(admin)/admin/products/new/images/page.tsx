"use client";

import * as React from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { CreateProductFormValues } from "../provider/form-provider";
import { FormField, FormItem } from "@/components/ui/form";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";

export default function AdminNewVariantPage() {
  const { control, trigger } = useFormContext<CreateProductFormValues>();

  const mainImageDropzoneConfig = {
    maxFiles: 1,
    maxSize: 4 * 1024 * 1024,
    multiple: false,
  };

  const imagesDropzoneConfig = {
    maxFiles: 3,
    maxSize: 4 * 1024 * 1024,
    multiple: true,
  };

  const router = useRouter();

  return (
    <div className="flex flex-col space-y-4">
      <FormField
        control={control}
        name="mainImage"
        render={({ field }) => {
          return (
            <FormItem>
              <FileUploader
                value={field.value}
                onValueChange={field.onChange}
                dropzoneOptions={mainImageDropzoneConfig}
                reSelect={true}
              >
                {field.value && field.value.length > 0 ? (
                  <FileUploaderContent>
                    <div>Main Image</div>
                    {field.value.map((file, i) => (
                      <FileUploaderItem
                        key={i}
                        index={i}
                        className="h-52 w-52 bg-orange-200"
                      >
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          fill
                          className="rounded-md"
                        />
                      </FileUploaderItem>
                    ))}
                  </FileUploaderContent>
                ) : (
                  <FileInput>
                    <div className="flex h-32 w-full flex-col items-center justify-center rounded-md border bg-background px-4 py-2 text-sm text-neutral-400">
                      <p className="text-neutral-400">Drop files here</p>
                      <p>main image</p>
                    </div>
                  </FileInput>
                )}
              </FileUploader>
            </FormItem>
          );
        }}
      />

      <FormField
        control={control}
        name="images"
        render={({ field }) => {
          return (
            <FormItem>
              <FileUploader
                value={field.value}
                onValueChange={field.onChange}
                dropzoneOptions={imagesDropzoneConfig}
              >
                {field.value &&
                field.value.length > 0 &&
                field.value.length === 3 ? (
                  <FileUploaderContent>
                    {field.value.map((file, i) => {
                      return (
                        <FileUploaderItem
                          key={i}
                          index={i}
                          className="flex items-center"
                        >
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            height={40}
                            width={40}
                            className="object-cover"
                          />
                          <span className="text-green-700">{file.name}</span>
                        </FileUploaderItem>
                      );
                    })}
                  </FileUploaderContent>
                ) : (
                  <FileInput>
                    <div className="flex h-32 w-full flex-col items-center justify-center rounded-md border bg-background px-4 py-2 text-sm text-neutral-400">
                      <p className="text-neutral-400">Drop files here</p>
                      <p>3 images</p>
                    </div>
                  </FileInput>
                )}

                {field.value &&
                  field.value.length > 0 &&
                  field.value.length !== 3 && (
                    <FileUploaderContent>
                      {field.value.map((file, i) => {
                        return (
                          <FileUploaderItem
                            key={i}
                            index={i}
                            className="flex items-center"
                          >
                            <Image
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              height={40}
                              width={40}
                              className="object-cover"
                            />
                            <span className="text-red-700">{file.name}</span>
                          </FileUploaderItem>
                        );
                      })}
                    </FileUploaderContent>
                  )}
              </FileUploader>
            </FormItem>
          );
        }}
      />

      <div className="flex w-full flex-col space-y-2">
        <Button
          type="button"
          onClick={() => {
            router.back();
          }}
        >
          previous
        </Button>
        <Button type="submit">
          <CheckIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
