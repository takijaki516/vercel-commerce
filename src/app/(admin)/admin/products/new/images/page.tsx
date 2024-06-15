"use client";

import * as React from "react";
import { UploadIcon, FileIcon, CheckIcon } from "@radix-ui/react-icons";
import { useFormContext } from "react-hook-form";

import { CreateProductFormValues } from "../provider/form-provider";
import { FormField } from "@/components/ui/form";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AdminNewVariantPage() {
  const { control, trigger } = useFormContext<CreateProductFormValues>();
  const [files, setFiles] = React.useState<File[] | null>(null);
  const dropzoneConfig = {
    maxFiles: 1,
    maxSize: 4 * 1024 * 1024,
    multiple: false,
  };
  const router = useRouter();

  return (
    <div>
      <FormField
        control={control}
        name="mainImage"
        render={({ field }) => {
          return (
            <FileUploader
              value={files}
              onValueChange={(v) => {
                console.log(
                  "🚀 ~ file: page.tsx:43 ~ AdminNewVariantPage ~ v:",
                  v,
                );
                if (v) {
                  field.value = v[0];
                }
                setFiles(v);
              }}
              dropzoneOptions={dropzoneConfig}
              className="rounded-lg p-2"
            >
              <FileInput className="outline-dashed outline-1 outline-white">
                <Button>
                  <UploadIcon className="h-4 w-4" />
                </Button>
              </FileInput>

              <FileUploaderContent>
                {files &&
                  files.length > 0 &&
                  files.map((file, i) => (
                    <FileUploaderItem key={i} index={i}>
                      <FileIcon className="h-4 w-4" />
                      <span>{file.name}</span>
                    </FileUploaderItem>
                  ))}
              </FileUploaderContent>
            </FileUploader>
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
