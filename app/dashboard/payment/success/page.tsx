import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function PaymentSuccess() {
  return (
    <div className="w-full flex h-screen flex-1  justify-center items-center">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <Check className="w-12 h-12 p-2 rounded-full bg-green-500/30  text-green-500" />
          </div>
          <div className="mt-3 text-center sm:mt-5 w-full">
            <h2 className="text-xl font-semibold">Payment Successfull</h2>
            <p className="text-sm mt-2 text-muted-foreground tracking-tight">
              Great!! You subsrciption is successfull
            </p>
            <Button className="w-full mt-5" asChild>
              <Link href={"/dashboard"}>Go back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
