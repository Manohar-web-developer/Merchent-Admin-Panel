import StatsCard from "@/components/cards/StatsCard";
import OrderChart from "@/components/charts/OrderChart";
import SalesChart from "@/components/charts/SalesChart";
import DSHeding from "@/components/layout/DSHeding";
import RecentOrders from "@/components/tables/RecentOrders";

export default function Dashboard() {
  return (
    <div className="bg-[#FAFBFF]">
      <div className="p-4 flex w-full">
        <DSHeding />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4">
        <StatsCard />
      </div>
      <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SalesChart />
        <OrderChart />
      </div>
      <div className="p-4 grid grid-cols-1  gap-4">
        <RecentOrders />
      </div>
      
    </div>
  )
}
