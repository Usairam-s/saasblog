import { DeletePost } from "@/app/actions";
import { SubmitButton } from "@/app/components/dashboard/SubmitButtons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

export default function DeleteFrom({
  params,
}: {
  params: { siteId: string; articleId: string };
}) {
  return (
    <div className="h-[70vh] mx-auto flex justify-center items-center">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Are you absolutely sure?</CardTitle>
          <CardDescription>
            This action cannot be undone. This will delete your artcile
            permenantly
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex items-center justify-between">
          <Button variant={"secondary"} asChild>
            <Link href={`/dashboard/sites/${params.siteId}`}>Cancel</Link>
          </Button>
          <form action={DeletePost}>
            <input
              name="articleId"
              value={params.articleId}
              className="hidden"
            />
            <input name="sideId" className="hidden" value={params.siteId} />
            <SubmitButton variant={"destructive"} text="Delete Article" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
