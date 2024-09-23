import prisma from "@/app/utils/db";
import Image from "next/image";
import { notFound } from "next/navigation";
import Logo from "@/public/logo.svg";
import { ThemeToggler } from "@/components/ThemeToggler";
import DefaultImage from "@/public/default.png";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
async function getData(subDir: string) {
  const data = await prisma.site.findUnique({
    where: {
      subdirectory: subDir,
    },
    select: {
      name: true,
      posts: {
        select: {
          smallDescription: true,
          title: true,
          image: true,
          createdAt: true,
          slug: true,
          id: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function BlogIndexPage({
  params,
}: {
  params: { name: string };
}) {
  const data = await getData(params.name);
  return (
    <>
      <nav className="grid grid-cols-3 my-10">
        <div className="col-span-1" />
        <div className="flex items-center gap-x-4 justify-center">
          <Image src={Logo} alt="logo" width={40} height={40} />
          <h2 className="text-3xl font-semibold tracking-tight">{data.name}</h2>
        </div>
        <div className="col-span-1 flex w-full justify-end">
          <ThemeToggler />
        </div>
      </nav>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-10">
        {data.posts.map((item) => (
          <Card key={item.id}>
            <Image
              src={item.image ?? DefaultImage}
              alt={item.title}
              className="w-full h-[200px] object-cover rounded-lg"
              width={480}
              height={480}
            />
            <CardHeader>
              <CardTitle className="truncate">{item.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {item.smallDescription}
              </CardDescription>
            </CardHeader>

            <CardFooter>
              <Button className="w-full" asChild>
                <Link href={`/blog/${params.name}/${item.slug}`}>
                  Read More
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
