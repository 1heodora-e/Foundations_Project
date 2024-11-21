import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const patientsChart = [
  { month: "January", variant1: 186, variant2: 80 },
  { month: "February", variant1: 305, variant2: 200 },
  { month: "March", variant1: 237, variant2: 120 },
  { month: "April", variant1: 73, variant2: 190 },
  { month: "May", variant1: 209, variant2: 130 },
  { month: "June", variant1: 214, variant2: 140 },
  { moth: "July", variant1: 214, variant2: 140 },
  { month: "August", variant1: 214, variant2: 140 },
  { month: "September", variant1: 214, variant2: 140 },
  { month: "October", variant1: 114, variant2: 100 },
  { month: "November", variant1: 214, variant2: 200 },
]

const appointmentsChart = [
    { month: "January", variant1: 150, variant2: 90 },
    { month: "February", variant1: 280, variant2: 180 },
    { month: "March", variant1: 230, variant2: 140 },
    { month: "April", variant1: 100, variant2: 60 },
    { month: "May", variant1: 190, variant2: 120 },
    { month: "June", variant1: 240, variant2: 150 },
    { month: "July", variant1: 220, variant2: 130 },
    { month: "August", variant1: 200, variant2: 100 },
    { month: "September", variant1: 250, variant2: 170 },
    { month: "October", variant1: 140, variant2: 90 },
    { month: "November", variant1: 300, variant2: 200 },
];
  

const chartConfig = {
  variant1: {
    label: "Appointments",
    color: "#EFAD0A",
  },
  variant2: {
    label: "Cancelled",
    color: "#E74F48",
  },
} satisfies ChartConfig

const patientConfig = {
    variant1: {
      label: "Recovered",
      color: "#1F58E7",
    },
    variant2: {
      label: "Transferred",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig



export default function SurveyChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>2024 Statistics</CardTitle>
        <CardDescription>
          Showing total number of patients and appointments
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        <ChartContainer className="h-[38vh] w-ful" config={patientConfig}>
          <AreaChart
            accessibilityLayer
            data={patientsChart}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="variant2"
              type="natural"
              fill="var(--color-variant2)"
              fillOpacity={0.4}
              stroke="var(--color-variant2)"
              stackId="a"
            />
            <Area
              dataKey="variant1"
              type="natural"
              fill="var(--color-variant1)"
              fillOpacity={0.4}
              stroke="var(--color-variant1)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>

        <ChartContainer className="h-[38vh] w-ful" config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={appointmentsChart}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="variant2"
              type="natural"
              fill="var(--color-variant2)"
              fillOpacity={0.4}
              stroke="var(--color-variant2)"
              stackId="a"
            />
            <Area
              dataKey="variant1"
              type="natural"
              fill="var(--color-variant1)"
              fillOpacity={0.4}
              stroke="var(--color-variant1)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - Nov 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
