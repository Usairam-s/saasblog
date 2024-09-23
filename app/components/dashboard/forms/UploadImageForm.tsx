"use client";
import { UploadDropzone } from "@/app/utils/UploadthingComponents";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import React, { useState } from "react";
import { SubmitButton } from "../SubmitButtons";
import { toast } from "sonner";
import { UpdateImage } from "@/app/actions";

interface iAppProp {
  siteId: string;
}

export default function UploadImageForm({ siteId }: iAppProp) {
  const [imageUrl, setImageUrl] = useState<undefined | string>(undefined);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Image</CardTitle>
        <CardDescription>
          This is image of your site. You can chnage it here
        </CardDescription>
      </CardHeader>
      <CardContent>
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt="uploaded_image"
              width={200}
              height={200}
              className="size-[200x] object-cover rounded-lg"
            />
          </>
        ) : (
          <>
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
      </CardContent>
      <CardFooter>
        <form action={UpdateImage}>
          <input className="hidden" name="siteId" value={siteId} />
          <input className="hidden" name="imageUrl" value={imageUrl} />

          <SubmitButton text="Change image" />
        </form>
      </CardFooter>
    </Card>
  );
}
