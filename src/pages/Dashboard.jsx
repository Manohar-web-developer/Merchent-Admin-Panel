import StatsCard from "@/components/cards/StatsCard";
import SalesChart from "@/components/charts/SalesChart";
import DSHeding from "@/components/layout/DSHeding";

export default function Dashboard() {
  return (
    <>
      <div className="p-4 flex w-full">

        <DSHeding />

      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4">
        <StatsCard />
      </div>
      <div className="p-4">
        <SalesChart/>
      </div>
    </>
  )
}
