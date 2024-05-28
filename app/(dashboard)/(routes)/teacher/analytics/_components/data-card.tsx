import { formatPrice } from "@/lib/format"
import { IAnalyticsCardProps } from "@/lib/interfaces"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info, BarChart } from "lucide-react"; 

export const DataCard = ({
    value,
    label,
    shouldFormat
}: IAnalyticsCardProps): JSX.Element => {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-md font-sans font-medium">
            {label}
          </CardTitle>
          <Info className="text-sky-500" />
        </CardHeader>
        <CardContent>
          <h4 className="text-lg font-bold flex gap-x-2">
            <BarChart className="text-blue-600" />
            <span>
                {shouldFormat ? formatPrice(value) : value}
            </span>
          </h4>
        </CardContent>
      </Card>
    );
}