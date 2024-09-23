import EditArticleForm from "@/app/components/dashboard/forms/EditArticleForm";
import prisma from "@/app/utils/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

async function getData(postId: string) {
  const data = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      title: true,
      smallDescription: true,
      image: true,
      id: true,
      articleContent: true,
      slug: true,
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}

export default async function EditArticlePage({
  params,
}: {
  params: { articleId: string; siteId: string };
}) {
  const data = await getData(params.articleId);
  return (
    <section className="w-full">
      <div className="flex w-full gap-4 mb-10 items-center border-b border-dashed pb-6 justify-start">
        <Link href={`/dashboard/sites/${params.siteId}`}>
          <ArrowLeft />
        </Link>
        <h2 className="text-xl">Edit Article</h2>
      </div>
      <EditArticleForm siteId={params.siteId} data={data} />
    </section>
  );
}
