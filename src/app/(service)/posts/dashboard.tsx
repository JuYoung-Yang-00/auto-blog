"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", first: 186, returning: 80 },
  { month: "February", first: 305, returning: 200 },
  { month: "March", first: 237, returning: 120 },
  { month: "April", first: 73, returning: 190 },
  { month: "May", first: 209, returning: 130 },
  { month: "June", first: 214, returning: 140 },
]

const chartConfig = {
  first: {
    label: "First",
    // color: "#2563eb",
    color: "hsl(var(--chart-3))",
  },
  returning: {
    label: "Returning",
    // color: "#60a5fa",
    color: "hsl(var(--chart-2))",

  },
} satisfies ChartConfig

export function Dashboard() {
  return (
    <div className="border rounded mb-4">
        <Card className="w-full">
            <CardHeader>
                <CardTitle className='font-light lg:text-2xl'>Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="w-full grid lg:grid-cols-12 gap-4 grid-cols-1">
                <div className="w-full lg:col-span-6">
                    <div className="w-full grid lg:grid-cols-12 gap-4 grid-cols-2">
                        <div className="w-full lg:col-span-6 border rounded p-2">
                            <div className="p-1">
                                <h1 className="text-lg font-extralight">Total Users</h1>
                                <h2 className="text-2xl">1,200</h2>
                            </div>
                        </div>
                        <div className="w-full lg:col-span-6 border rounded p-2">
                            <div className="p-1">
                                <h1 className="text-lg font-extralight">Total Posts</h1>
                                <h2 className="text-2xl">1,200</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:col-span-6">
                    <div className="w-full grid lg:grid-cols-12 gap-4 grid-cols-2">
                        <div className="w-full lg:col-span-6 border rounded p-2">
                            <div className="p-1">
                                <h1 className="text-lg font-extralight">Total Comments</h1>
                                <h2 className="text-2xl">1,200</h2>
                            </div>
                        </div>
                        <div className="w-full lg:col-span-6 border rounded p-2">
                            <div className="p-1">
                                <h1 className="text-lg font-extralight">Total Likes</h1>
                                <h2 className="text-2xl">1,200</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className='font-extralight lg:text-xl'>Monthly Stats</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className=" p-0 lg:p-6 h-[400px] w-full mb-2">
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                        />
                        {/* <ChartTooltip content={<ChartTooltipContent />} /> */}
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="first" fill="var(--color-first)" radius={4} barSize={30} />
                        <Bar dataKey="returning" fill="var(--color-returning)" radius={4} barSize={30}/>
                    </BarChart>
                </ChartContainer>
            </CardContent>

        </Card>
    </div>
  )
}

