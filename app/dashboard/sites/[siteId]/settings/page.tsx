import { DeleteSite } from "@/app/actions";
import UploadImageForm from "@/app/components/dashboard/forms/UploadImageForm";
import { SubmitButton } from "@/app/components/dashboard/SubmitButtons";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function SiteSettingPage({
  params,
}: {
  params: { siteId: string };
}) {
  return (
    <section className="w-full">
      <div className="flex w-full gap-4  mb-10 items-center border-b border-dashed pb-6 justify-start">
        <Link href={`/dashboard/sites/${params.siteId}`}>
          <ArrowLeft />
        </Link>
        <h2 className="text-xl">Site Settings</h2>
      </div>

      <UploadImageForm siteId={params.siteId} />
      <Card className="border-red-500 bg-red-500/10 mt-6">
        <CardHeader>
          <CardTitle className="text-red-500 text-xl">Danger</CardTitle>

          <CardDescription>
            This will delete your site and all artcles associated with it. Click
            below button to delete everyhting
          </CardDescription>
        </CardHeader>{" "}
        <CardFooter>
          <form action={DeleteSite}>
            <input name="siteId" value={params.siteId} className="hidden" />
            <SubmitButton variant={"destructive"} text="Delete Everything" />
          </form>
        </CardFooter>
      </Card>
    </section>
  );
}
