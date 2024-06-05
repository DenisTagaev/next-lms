"use client"

import { useState } from "react"
import { useTheme } from "next-themes"

import { IAnalyticsChartProps } from "@/lib/interfaces"

import { Card } from "@/components/ui/card"
import { 
    ResponsiveContainer,
    BarChart,
    XAxis,
    YAxis,
    Bar,
    Tooltip,
    Brush,
    Cell
} from "recharts"

export const Chart = ({
    data
}: IAnalyticsChartProps): JSX.Element => {
  const { theme } = useTheme();
  const [focusBar, setFocusBar] = useState<null | number>(null);
  const [mouseLeave, setMouseLeave] = useState(true);

  return (
    <Card className="overflow-hidden">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          onMouseMove={(state) => {
            if (state.isTooltipActive) {
              setFocusBar(state.activeTooltipIndex!);
              setMouseLeave(false);
            } else {
              setFocusBar(null);
              setMouseLeave(true);
            }
          }}
          className="mt-2"
          data={data}
        >
          <XAxis
            className="font-bold"
            dataKey="name"
            type="category"
            stroke={theme !== "light" ? "#fff" : "#000"}
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            className="font-bold"
            type="number"
            stroke={theme !== "light" ? "#fff" : "#000"}
            fontSize={12}
            tickMargin={-5}
            tickFormatter={(value) => `$ ${value}`}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            cursor={false}
            wrapperClassName="rounded-md"
            labelClassName="text-black text-sm"
          />
          <Brush
            className="text-sm"
            dataKey="name"
            height={25}
            stroke="#0369a1"
            travellerWidth={8}
          />
          <Bar
            maxBarSize={150}
            minPointSize={4}
            dataKey="total"
            fill="#0369a1"
            cursor="pointer"
            radius={[4, 4, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  focusBar === index || mouseLeave ? "#0369a1" : "#0369a199"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}