import prisma from "@/app/utils/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Book, File, MoreHorizontal, PlusCircle, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

async function getData(userId: string, siteId: string) {
  const data = await prisma.post.findMany({
    where: {
      userId: userId,
      siteId: siteId,
    },
    select: {
      id: true,
      title: true,
      image: true,
      createdAt: true,
      site: {
        select: {
          subdirectory: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function SiteIdPage({
  params,
}: {
  params: { siteId: string };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/api/auth/login");
  }
  const data = await getData(user?.id, params.siteId);
  return (
    <>
      <section>
        <div className="flex flex-col md:flex-row w-full gap-4 mb-10 items-center border-b border-dashed pb-6 justify-end">
          <Button variant={"outline"} asChild>
            <Link href={`/blog/${data[0]?.site?.subdirectory}`}>
              <Book size={15} className="mr-2" />
              View Blog
            </Link>
          </Button>
          <Button variant={"outline"} asChild>
            <Link href={`/dashboard/sites/${params.siteId}/settings`}>
              <Settings size={15} className="mr-2" />
              Setting
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/dashboard/sites/${params.siteId}/create`}>
              <PlusCircle size={15} className="mr-2" />
              Create Article
            </Link>
          </Button>
        </div>
      </section>
      {data === undefined || data.length === 0 ? (
        <>
          {" "}
          <div className="flex flex-col h-[60vh] gap-2  items-center justify-center">
            <div className="bg-primary/20 p-2 rounded-full">
              <File className="text-primary" />
            </div>
            <h2 className="max-w-[200px] md:max-w-xl items-center text-center text-muted-foreground">
              You dont have any Article created
            </h2>
            <Button asChild>
              <Link href={`/dashboard/sites/${params.siteId}/create`}>
                <PlusCircle size={15} className="mr-2" />
                Create Article
              </Link>
            </Button>
          </div>
        </>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Articles</CardTitle>
            <CardDescription>
              Manage all your artcles with easy intuitive interface
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={64}
                        height={64}
                        className="rounded-md size-16 object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>
                      <Badge
                        className="bg-green-200 text-green-500"
                        variant={"outline"}
                      >
                        Published
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Intl.DateTimeFormat("en-US", {
                        dateStyle: "medium",
                      }).format(item.createdAt)}
                    </TableCell>
                    <TableCell className="text-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant={"ghost"}>
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            {" "}
                            <Link
                              href={`/dashboard/sites/${params.siteId}/${item.id}`}
                            >
                              {" "}
                              Edit
                            </Link>{" "}
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/dashboard/sites/${params.siteId}/${item.id}/delete`}
                            >
                              Delete
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </>
  );
}
