import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import React from "react";
import { SubmitButton } from "../dashboard/SubmitButtons";
import { CreateSubscription } from "@/app/actions";
import Link from "next/link";

interface iAppProps {
  id: number;
  cardTitle: string;
  cardDescription: string;
  priceTitle: string;
  benefits: string[];
}

export const PricingPlans: iAppProps[] = [
  {
    id: 0,
    cardTitle: "Freelancer",
    cardDescription: "Perfect for freelancers and small projects",
    benefits: [
      "1 Free Site",
      "Upto one thousand Visitors",
      "1 Free Site",
      "Upto one thousand Visitors",
    ],
    priceTitle: "Free",
  },
  {
    id: 1,
    cardTitle: "Starup",
    cardDescription: "The best pricing plans for startup",
    benefits: [
      "Unlimited  Sites",
      "Unlimimted  Visitors",
      "Unlimited  Sites",
      "Unlimimted  Visitors",
    ],
    priceTitle: "$29",
  },
];
export default function PricingTable() {
  return (
    <>
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-3xl text-primary ">Pricing</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl mt-2 ">
          Pricing Plans for everyone and every budget
        </h1>
      </div>

      <p className="text-center mx-auto max-w-2xl text-muted-foreground leading-tight mt-4">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae quas
        architecto aliquid. Illum neque voluptas cupiditate facilis{" "}
      </p>
      <div className="grid grid-cols-1 gap-8 mt-16 lg:grid-cols-2">
        {PricingPlans.map((item) => (
          <Card key={item.id} className={item.id === 1 ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle>
                {item.id === 1 ? (
                  <div className="flex gap-4 justify-between">
                    <span className="text-primary text-xl font-bold">
                      {item.cardTitle}
                    </span>
                    <Badge
                      className="bg-gradient-to-b  from-cyan-500 via-blue-600 to-indigo-500 text-white"
                      variant={"outline"}
                    >
                      Recommended
                    </Badge>
                  </div>
                ) : (
                  <span className="text-xl font-bold">{item.cardTitle}</span>
                )}
              </CardTitle>
              <CardDescription>{item.cardDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mt-6 text-4xl font-bold tracking-tight">
                {item.priceTitle}
              </p>
              <ul className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                {item.benefits.map((benefit, index) => (
                  <li key={index} className="flex gap-x-3">
                    <Check className="text-primary size-5" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {item.id === 1 ? (
                <form action={CreateSubscription} className="w-full">
                  <SubmitButton text="Buy Plan" className="w-full" />
                </form>
              ) : (
                <Button asChild variant={"outline"} className="w-full">
                  <Link href={"/dashboard"}>Try for free</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
