import prisma from "../utils/db";
import { requireUser } from "../utils/requireUser";
import { File, PlusCircle } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import DefaultImage from "@/public/default.png";

async function getData(userId: string) {
  const [sites, articles] = await Promise.all([
    prisma.site.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    }),

    prisma.post.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    }),
  ]);

  return { sites, articles };
}

export default async function DashboardIndexPage() {
  const user = await requireUser();
  const { articles, sites } = await getData(user?.id);
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-5">Your Sites</h1>
      {sites.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-10">
          {sites.map((item) => (
            <Card key={item.id}>
              <Image
                src={item.imageUrl ?? DefaultImage}
                alt={item.name}
                className="w-full h-[200px] object-cover rounded-lg"
                width={480}
                height={480}
              />
              <CardHeader>
                <CardTitle className="truncate">{item.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {item.description}
                </CardDescription>
              </CardHeader>

              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href={`/dashboard/sites/${item.id}`}>View Article</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {" "}
          <div className="flex flex-col h-full gap-2 min-h-[70vh] items-center justify-center">
            <div className="bg-primary/20 p-2 rounded-full">
              <File className="text-primary" />
            </div>
            <h2 className="max-w-[200px] md:max-w-xl items-center text-center text-muted-foreground">
              You don't have any site created
            </h2>
            <Button asChild>
              <Link href={"/dashboard/sites/new"}>
                {" "}
                <PlusCircle size={15} className="mr-2" /> Create Site
              </Link>
            </Button>
          </div>
        </>
      )}
      <h1 className="mt-10 text-2xl mb-4 font-semibold">Recent Articles</h1>
      {articles.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-10">
          {articles.map((item) => (
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
                  <Link href={`/dashboard/sites/${item.siteId}/${item.id}`}>
                    Edit Article
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {" "}
          <div className="flex flex-col h-full gap-2 min-h-[70vh] items-center justify-center">
            <div className="bg-primary/20 p-2 rounded-full">
              <File className="text-primary" />
            </div>
            <h2 className="max-w-[200px] md:max-w-xl items-center text-center text-muted-foreground">
              You don't have any article created
            </h2>
          </div>
        </>
      )}
    </div>
  );
}
