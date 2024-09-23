import prisma from "@/app/utils/db";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { File, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import DefaultImage from "../../../public/default.png";

async function getData(userId: string) {
  if (!userId) {
    return redirect("/api/auth/login");
  }

  const data = await prisma.site.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function Sites() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id);
  return (
    <section className="w-full">
      <div className="flex w-full mb-10 items-center border-b border-dashed pb-6 justify-between">
        <h2 className="text-2xl font-semibold">Your Sites</h2>
        <Button asChild>
          <Link href={"/dashboard/sites/new"}>
            {" "}
            <PlusCircle size={15} className="mr-2" /> Create Site
          </Link>
        </Button>
      </div>

      {data.length === 0 ? (
        <>
          {" "}
          <div className="flex flex-col h-full gap-2 min-h-[70vh] items-center justify-center">
            <div className="bg-primary/20 p-2 rounded-full">
              <File className="text-primary" />
            </div>
            <h2 className="max-w-[200px] md:max-w-xl items-center text-center text-muted-foreground">
              You dont have any site created
            </h2>
          </div>
        </>
      ) : (
        <>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-10">
            {data.map((item) => (
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
                    <Link href={`/dashboard/sites/${item.id}`}>
                      View Article
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
