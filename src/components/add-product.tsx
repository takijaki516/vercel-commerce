"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function AddProduct() {
  return (
    <form className="grid w-full gap-4 lg:grid-cols-2">
      <div className="flex flex-col space-y-3">
        <div>
          <Label>title</Label>
          <Input />
        </div>

        <div>
          <Label>description</Label>
          <Input />
        </div>

        <div>
          <Label>price</Label>
          <Input />
        </div>

        <div>
          <Label>availableForSale</Label>
          <Input type="radio" />
        </div>

        <div>
          <Label>collection</Label>
          <Input />
        </div>

        <div>
          <div>Variants</div>
          <Label>size</Label>
          <Input />
          <Label>Count</Label>
          <Input />
        </div>
      </div>

      <div className="flex flex-col space-y-3">
        <div>
          <Label>main image</Label>
          <Input />
        </div>

        <div>
          <Label>2 more images</Label>
          <Input />
        </div>
      </div>
    </form>
  );
}

function SubmitButton() {
  return <Button>Submit</Button>;
}
