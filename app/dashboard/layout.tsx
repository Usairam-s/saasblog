import { ThemeToggler } from "@/components/ThemeToggler";
import Image from "next/image";
import React, { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DollarSign, Globe, Home, UserCircle } from "lucide-react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import DashNav from "../components/dashboard/DashNav";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function layout({ children }: { children: ReactNode }) {
  // const { getUser } = getKindeServerSession();
  // const user = await getUser();
  // if (!user) {
  //   return redirect("/api/auth/login");
  // }
  return (
    <>
      <header className="bg-muted p-4 flex  items-center justify-between">
        <div className="flex flex-row gap-2 items-center">
          <Image
            src={"/logo.svg"}
            className="w-12 h-12"
            alt="logo"
            width={10}
            height={10}
          />
          <h2 className="text-3xl font-bold">
            Blog<span className="text-primary">SAAS</span>
          </h2>
        </div>
        <div className="flex flex-row gap-8 items-center">
          <ThemeToggler />

          <DropdownMenu>
            <DropdownMenuTrigger>
              <UserCircle size={30} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4 mt-2 w-[200px]">
              {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
              {/* <DropdownMenuSeparator /> */}

              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard"
                  className="flex items-center justify-between"
                >
                  Dashboard <Home className="size-5" />
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  className="flex items-center justify-between"
                  href="/dashboard/sites"
                >
                  Sites <Globe className="size-5" />
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  className="flex items-center justify-between"
                  href="/dashboard/pricing"
                >
                  Pricing
                  <DollarSign className="size-5" />
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <LogoutLink>
                  <Button className="w-full">Logout</Button>
                </LogoutLink>
              </DropdownMenuItem>

              {/* <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <section className="flex w-full flex-row min-h-screen">
        <div className="md:w-1/4  hidden md:inline bg-muted">
          <DashNav />
        </div>

        <div className="md:w-3/4 w-full p-6 ">{children}</div>
      </section>
    </>
  );
}
