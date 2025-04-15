import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import Calendar from "@/components/calendar/Calendar";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Ecommerce() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">

      <div className="col-span-12 space-y-6 xl:col-span-7">
        <EcommerceMetrics />

        {/* <MonthlySalesChart /> */}
      </div>
      <div className="col-span-10 xl:col-span-7">
        <Calendar />
      </div>
      {/* <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div> */}

      {/* <div className="col-span-12">
        <StatisticsChart />
      </div> */}

      {/* <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div> */}

      <div className="col-span-12 xl:col-span-7">
        <RecentOrders />
      </div>


    </div>
  );
}
