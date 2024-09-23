"use client";
import { CreateSiteAction } from "@/app/actions";
import { SubmitButton } from "@/app/components/dashboard/SubmitButtons";
import { createSite } from "@/app/utils/zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Label } from "@radix-ui/react-dropdown-menu";

import { useFormState } from "react-dom";

export default function CreateSite() {
  const [lastResult, action] = useFormState(CreateSiteAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: createSite,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <Card className="max-w-[450px] mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl">Create Site</CardTitle>
        <CardDescription>
          Enter the details and dont forget to submit
        </CardDescription>
      </CardHeader>

      <form id={form.id} onSubmit={form.onSubmit} action={action}>
        <CardContent className="mt-4 flex flex-col gap-8">
          <div className="grid ">
            <Label>Site Name</Label>
            <Input
              name={fields.name.name}
              key={fields.name.key}
              defaultValue={fields.name.initialValue}
              placeholder="Enter the site name"
            />
            <p className="text-red-500 text-xs">{fields.name.errors}</p>
          </div>
          <div className="grid gap-2">
            <Label>Subdirectory</Label>
            <Input
              name={fields.subdirectory.name}
              key={fields.subdirectory.key}
              defaultValue={fields.subdirectory.initialValue}
              placeholder="Enter the subdirectory name"
            />
            <p className="text-red-500 text-xs">{fields.subdirectory.errors}</p>
          </div>
          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea
              name={fields.description.name}
              key={fields.description.key}
              defaultValue={fields.description.initialValue}
              placeholder="Add some description here"
            />
            <p className="text-red-500 text-xs">{fields.description.errors}</p>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Create Site" />
        </CardFooter>
      </form>
    </Card>
  );
}
