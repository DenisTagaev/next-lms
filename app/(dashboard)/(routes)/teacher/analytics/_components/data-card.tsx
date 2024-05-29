"use client"

import React, { useState } from "react";

import { formatPrice } from "@/lib/format"
import { IAnalyticsCardProps } from "@/lib/interfaces"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import * as Popover from "@radix-ui/react-popover";
import { Info, BarChart } from "lucide-react"; 

export const DataCard = ({
    value,
    label,
    shouldFormat
}: IAnalyticsCardProps): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-md font-sans font-medium">
            {label}
          </CardTitle>
          <Popover.Root open={isOpen}>
            <Popover.Trigger asChild>
              <Info
                className="text-sky-600 cursor-pointer"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
              />
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                align="center"
                side="top"
                className="bg-white border border-gray-300 rounded-md p-2"
              >
                <p className="text-sm">
                  {shouldFormat ?  
                    "Amount from all purchased courses multiplied by their price"
                    : 
                    "Total number of courses purchased by users" 
                    }
                 
                </p>
                <Popover.Arrow className="fill-current text-white" />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
          {/* <Info className="text-sky-600 cursor-pointer" /> */}
        </CardHeader>
        <CardContent>
          <h4 className="text-lg font-bold flex gap-x-2">
            <BarChart className="text-blue-600" />
            <span>{shouldFormat ? formatPrice(value) : value}</span>
          </h4>
        </CardContent>
      </Card>
    );
}