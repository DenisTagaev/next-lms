import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";

import { checkExistence } from "@/app/(dashboard)/client-utils";
import { getAnalytics } from "@/actions/get-analytics";

import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";

export function generateMetadata(): Metadata {
  const { userId }: { userId: string | null } = auth();
    checkExistence(userId);

  return {
    title: `Courses Analytics`,
    description: `Analytics and statistics page for ${userId} for sold courses`,
  };
}

export default async function AnalyticsPage (): Promise<JSX.Element> {
    const { userId }: { userId: string | null } = auth();
    checkExistence(userId);

    const{ data, totalRevenue, totalSales } : {
        data: {
            name: string;
            total: number;
        }[],
        totalRevenue: number,
        totalSales: number
    } = await getAnalytics(userId!);
    
    return (
        <section className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <DataCard
                    label="Total Sales"
                    value={totalSales}
                />
                <DataCard
                    label="Total Revenue"
                    value={totalRevenue}
                    shouldFormat
                />
            </div>
            <Chart
                data={data}
            />
        </section>
    )
}