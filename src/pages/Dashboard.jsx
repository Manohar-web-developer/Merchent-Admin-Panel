import StatsCard from "@/components/cards/StatsCard";

export default function Dashboard() {
  return (
    <>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4">
    <StatsCard/>
     <StatsCard/>
     <StatsCard/>
     <StatsCard/>
    </div>
    </>
  )
}
