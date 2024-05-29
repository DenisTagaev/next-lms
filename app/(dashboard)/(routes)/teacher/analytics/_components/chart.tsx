"use client"

import { IAnalyticsChartProps } from "@/lib/interfaces"

import { Card } from "@/components/ui/card"
import { 
    ResponsiveContainer,
    BarChart,
    XAxis,
    YAxis,
    Bar,
    Tooltip,
    Brush
} from "recharts"

export const Chart = ({
    data
}: IAnalyticsChartProps): JSX.Element => {
    return (
      <Card className="overflow-hidden">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart className="mt-2" data={data}>
            <XAxis
              className="font-bold"
              dataKey="name"
              type="category"
              stroke="#000"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              className="font-bold"
              type="number"
              stroke="#000"
              fontSize={12}
              tickMargin={-5}
              tickFormatter={(value) => `$ ${value}`}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip />
            <Brush className="m-2 text-sm" dataKey="name" height={25} stroke="#0369a1" />
            <Bar maxBarSize={150} dataKey="total" fill="#0369a1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    );
}