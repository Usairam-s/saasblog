"use client";

import { CreateArticleAction } from "@/app/actions";
import TailwindEditor from "@/app/components/dashboard/EditorWrapper";
import { UploadDropzone } from "@/app/utils/UploadthingComponents";
import { postSchema } from "@/app/utils/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ArrowLeft, Atom } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JSONContent } from "novel";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import slugify from "slugify";
import { SubmitButton } from "@/app/components/dashboard/SubmitButtons";

export default function CreateArticle({
  params,
}: {
  params: { siteId: string };
}) {
  const [lastResult, action] = useFormState(CreateArticleAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: postSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [value, setValue] = useState<JSONContent | undefined>(undefined);
  const [title, setTitle] = useState<undefined | string>(undefined);
  const [slug, setSlug] = useState<undefined | string>(undefined);

  function slugGeneration() {
    const titleInput = title;
    if (titleInput?.length === 0 || titleInput === undefined) {
      return toast.error("Please enter the title first");
    }
    setSlug(slugify(titleInput));

    return toast.success("Slug has been created!");
  }
  return (
    <section className="w-full">
      <div className="flex w-full gap-4 mb-10 items-center border-b border-dashed pb-6 justify-start">
        <Link href={`/dashboard/sites/${params.siteId}`}>
          <ArrowLeft />
        </Link>
        <h2 className="text-xl">Create Article</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Article Details</CardTitle>
          <CardDescription>Enter the detials for article</CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
          <form
            id={form.id}
            onSubmit={form.onSubmit}
            action={action}
            className="flex flex-col gap-6"
          >
            <input className="hidden" name="siteId" value={params.siteId} />
            <div className="flex flex-col gap-2">
              <Label>Title</Label>
              <Input
                name={fields.title.name}
                key={fields.title.key}
                defaultValue={fields.title.initialValue}
                placeholder="NextJs Marketplace"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <p className="text-red-500 text-xs">{fields.title.errors}</p>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Slug</Label>
              <Input
                name={fields.slug.name}
                key={fields.slug.key}
                defaultValue={fields.slug.initialValue}
                placeholder="Article Slug"
                value={slug}
              />
              <p className="text-red-500 text-xs">{fields.slug.errors}</p>
              <Button
                className="flex items-center gap-2 w-fit"
                variant={"secondary"}
                onClick={slugGeneration}
              >
                <Atom /> Generate Slug
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Small Description</Label>
              <Textarea
                name={fields.smallDescription.name}
                key={fields.smallDescription.key}
                defaultValue={fields.smallDescription.initialValue}
                placeholder="Write here about your article in short"
              />
              <p className="text-red-500 text-xs">
                {fields.smallDescription.errors}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Upload Image</Label>
              {imageUrl ? (
                <>
                  <input
                    className="hidden"
                    name={fields.coverImage.name}
                    key={fields.coverImage.key}
                    defaultValue={fields.coverImage.initialValue}
                    value={imageUrl}
                  />
                  <Image
                    src={imageUrl}
                    alt="image"
                    className="object-cover"
                    width={200}
                    height={200}
                  />
                </>
              ) : (
                <>
                  {" "}
                  <UploadDropzone
                    onClientUploadComplete={(res) => {
                      setImageUrl(res[0].url);
                      toast.success("Image Uploaded Sucessfully");
                    }}
                    endpoint="imageUploader"
                    onUploadError={() => {
                      toast.error("Image Uplaod Failed");
                    }}
                  />
                </>
              )}
              <p className="text-red-500 text-xs">{fields.coverImage.errors}</p>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Write Article</Label>
              <input
                className="hidden"
                name={fields.articleContent.name}
                key={fields.articleContent.key}
                defaultValue={fields.articleContent.initialValue}
                value={JSON.stringify(value)}
              />
              <TailwindEditor initialValue={value} onChange={setValue} />
              <p className="text-red-500 text-xs">
                {fields.articleContent.errors}
              </p>
            </div>
            <SubmitButton text="Create Article" />
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
