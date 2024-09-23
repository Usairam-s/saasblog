"use client";

import { DollarSign, Globe, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const navLinks = [
  {
    id: 1,
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: 2,
    title: "Sites",
    href: "/dashboard/sites",
    icon: Globe,
  },
  {
    id: 3,
    title: "Pricing",
    href: "/dashboard/pricing",
    icon: DollarSign,
  },
];

export default function DashNav() {
  const pathname = usePathname();
  return (
    <div className="flex flex-col  gap-4 p-4">
      {navLinks.map((item) => (
        <Link
          className={`flex items-center  p-4 rounded-md gap-4 ${
            pathname == item.href
              ? "bg-primary/20 text-primary"
              : "bg-transparent"
          } hover:bg-primary/10`}
          href={item.href}
          key={item.id}
        >
          <item.icon />
          {item.title}
        </Link>
      ))}
    </div>
  );
}
