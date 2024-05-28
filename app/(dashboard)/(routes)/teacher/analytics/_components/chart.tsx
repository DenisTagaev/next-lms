"use client"

import { IAnalyticsChartProps } from "@/lib/interfaces"

import { Card } from "@/components/ui/card"
import { 
    ResponsiveContainer,
    BarChart,
    XAxis,
    YAxis,
    Bar
} from "recharts"

export const Chart = ({
    data
}: IAnalyticsChartProps): JSX.Element => {
    return (
      <Card>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart className="-ml-3" data={data} layout="vertical">
            <XAxis
              className="font-bold"
              type="number"
              stroke="#000"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickMargin={-5}
              tickFormatter={(value) => `$ ${value}`}
            />
            <YAxis
              className="font-bold"
              dataKey="name"
              type="category"
              stroke="#000"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Bar dataKey="total" fill="#0369a1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    );
}