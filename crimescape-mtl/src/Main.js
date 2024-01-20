/**
 * v0 by Vercel.
 * @see https://v0.dev/t/PUjfBcDCwsG
 */
import { TabsTrigger, TabsList, Tabs } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { ResponsiveBar } from "@nivo/bar"

export default function Component() {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-blue-500 text-white text-center py-4">
        <h1 className="text-2xl font-bold">CrimeScape MTL</h1>
      </header>
      <div className="flex justify-center my-4">
        <Tabs className="w-full max-w-md" defaultValue="pastData">
          <TabsList className="flex justify-center gap-4">
            <TabsTrigger value="pastData">View Past Data</TabsTrigger>
            <TabsTrigger value="forecast">Forecast</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="flex justify-around my-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Type</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem>Robbery</DropdownMenuItem>
            <DropdownMenuItem>Assault</DropdownMenuItem>
            <DropdownMenuItem>Theft</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Select Date Range</Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto p-0">
            <Calendar initialFocus mode="range" numberOfMonths={2} />
          </PopoverContent>
        </Popover>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Time of Day</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem>Morning</DropdownMenuItem>
            <DropdownMenuItem>Afternoon</DropdownMenuItem>
            <DropdownMenuItem>Evening</DropdownMenuItem>
            <DropdownMenuItem>Night</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-grow">
        <div className="flex-grow">
          <BarChart className="w-full h-full" />
        </div>
        <div className="w-64 p-4 border-l">
          <h2 className="text-lg font-bold mb-2">Insights</h2>
          <p className="text-gray-600">Select a type, date range, and time of day to view insights.</p>
        </div>
      </div>
    </div>
  )
}

function BarChart(props) {
  return (
    <div {...props}>
      <ResponsiveBar
        data={[
          { name: "Jan", count: 111 },
          { name: "Feb", count: 157 },
          { name: "Mar", count: 129 },
          { name: "Apr", count: 150 },
          { name: "May", count: 119 },
          { name: "Jun", count: 72 },
        ]}
        keys={["count"]}
        indexBy="name"
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={["#2563eb"]}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="A bar chart showing data"
      />
    </div>
  )
}
