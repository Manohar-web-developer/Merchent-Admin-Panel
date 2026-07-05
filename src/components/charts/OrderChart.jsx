import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import { ordersOverview } from "../Data/OrderData"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field } from "@/components/ui/field"
import { addDays, format } from "date-fns"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"


const chartConfig = {
  delivered: {
    label: "Delivered",
    color: "#22c55e",
  },
  pending: {
    label: "Pending",
    color: "#f59e0b",
  },
  cancelled: {
    label: "Cancelled",
    color: "#ef4444",
  },
  returned: {
    label: "Returned",
    color: "#3b82f6",
  },
}

export default function OrderChart() {
  const [date, setDate] = React.useState({
    from: undefined,
    to: undefined,
  });

  const filteredOrders = ordersOverview.filter((item) => {
    if (!date.from && !date.to) {
      return true
    }else if(date.from == date.to){
      return item.date === date.from.toISOString().split("T")[0];
      

    }
    else {
      
      return (
        item.date >= date.from.toISOString().split("T")[0] &&
        item.date <= date.to.toISOString().split("T")[0]
      ) }
  })
  const totalOrderCount = filteredOrders.reduce((acc, curr) => acc + curr.totalOrders, 0)
  const delivered = filteredOrders.reduce(
    (acc, curr) => acc + curr.deliveredOrders,
    0
  )

  const pending = filteredOrders.reduce(
    (acc, curr) => acc + curr.pendingOrders,
    0
  )

  const cancelled = filteredOrders.reduce(
    (acc, curr) => acc + curr.cancelledOrders,
    0
  )

  const returned = filteredOrders.reduce(
    (acc, curr) => acc + curr.returnedOrders,
    0
  )
  const formattedOrders = new Intl.NumberFormat("en", {
    notation: "compact",
  }).format(totalOrderCount)
  const pieData = [
    {
      status: "Delivered",
      value: delivered,
      fill: "#22c55e",
    },
    {
      status: "Pending",
      value: pending,
      fill: "#f59e0b",
    },
    {
      status: "Cancelled",
      value: cancelled,
      fill: "#ef4444",
    },
    {
      status: "Returned",
      value: returned,
      fill: "#3b82f6",
    },
  ]
  const total = pieData.reduce(
    (acc, curr) => acc + curr.value,
    0
  )

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0 flex flex-nowrap justify-between">
        <CardTitle className='whitespace-nowrap'>Order Status</CardTitle>
        <Field className="mx-auto w-60">
          <Popover>
            <PopoverTrigger
              render={
                <Button
                  variant="outline"
                  id="date-picker-range"
                  className="justify-start px-2.5 font-normal"
                />
              }
            >
              <CalendarIcon />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </Field>

      </CardHeader>
      <CardContent className="flex-1 flex pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {formattedOrders}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Orders
                        </tspan>
                      </text>
                    )
                  }
                }}
              />

            </Pie>
          </PieChart>

        </ChartContainer>

        <div className="flex flex-col justify-center gap-4">
          {pieData.map((item) => {
            const percentage = ((item.value / total) * 100).toFixed(0)

            return (
              <div key={item.status} className="flex items-center gap-3">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />

                <div className="flex flex-1 items-center justify-between gap-8">
                  <span>{item.status}</span>

                  <div className="text-right">
                    <div>{percentage}%</div>
                    <div className="text-muted-foreground text-xs">
                      ({item.value})
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>

    </Card>
  )
}
