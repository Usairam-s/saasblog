"use client";
import { EditPostAction } from "@/app/actions";
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
import { Atom } from "lucide-react";
import Image from "next/image";
import { JSONContent } from "novel";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import slugify from "slugify";
import { toast } from "sonner";
import TailwindEditor from "../EditorWrapper";
import { SubmitButton } from "../SubmitButtons";

interface iAppProps {
  data: {
    slug: string;
    title: string;
    smallDescription: string;
    articleContent: any;
    id: string;
    image: string;
  };
  siteId: string;
}

export default function EditArticleForm({ data, siteId }: iAppProps) {
  const [lastResult, action] = useFormState(EditPostAction, undefined);
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
  const [imageUrl, setImageUrl] = useState<string | undefined>(data.image);
  const [article, setArticle] = useState<JSONContent | undefined>(
    data.articleContent
  );
  const [title, setTitle] = useState<undefined | string>(data.title);
  const [slug, setSlug] = useState<undefined | string>(data.slug);
  const [descp, setDescp] = useState<undefined | string>(data.smallDescription);

  function slugGeneration() {
    const titleInput = title;
    if (titleInput?.length === 0 || titleInput === undefined) {
      return toast.error("Please enter the title first");
    }
    setSlug(slugify(titleInput));

    return toast.success("Slug has been created!");
  }
  return (
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
          <input type="hidden" name="articleId" value={data.id} />
          <input type="hidden" name="siteId" value={siteId} />
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
              defaultValue={data.smallDescription}
              placeholder="Write here about your article in short"
              value={descp}
              onChange={(e) => setDescp(e.target.value)}
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
              value={JSON.stringify(article)}
            />
            <TailwindEditor initialValue={article} onChange={setArticle} />
            <p className="text-red-500 text-xs">
              {fields.articleContent.errors}
            </p>
          </div>
          <SubmitButton text="Edit Article" />
        </form>
      </CardContent>
    </Card>
  );
}
