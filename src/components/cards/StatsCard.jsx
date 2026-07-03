import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  IndianRupee,
  ShoppingCart,
  Package,
  Users,
  TrendingUp
} from "lucide-react";

const icons = {
  IndianRupee,
  ShoppingCart,
  Package,
  Users,
};
import { dashboardStats } from '../Data/DummyData.js'
export default function StatsCard() {
  return <>

    {
      dashboardStats.map((item) => {
        const Icon = icons[item.icon]

        return (
          <Card>
            <CardContent className="p-5" key={item.id}>

              <div className="flex items-center justify-between">

                <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center`}>
                  <Icon className={`${item.iconColor} $`} />
                </div>

              </div>

              <h3 className="mt-4 text-muted-foreground">
                {item.title}
              </h3>

              <h2 className="text-xl md:text-2xl font-bold mt-2">
                ₹{item.value.toLocaleString("en-IN")}
              </h2>

              <div className="flex items-center gap-2 mt-3 text-green-600">
                <TrendingUp size={16} />
                <span>{item.growth}%</span>
              </div>

            </CardContent>
          </Card>
        )
      })
    }
    {/* <CardContent className="p-5">

        <div className="flex items-center justify-between">

          <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
            <IndianRupee className="text-violet-600" />
          </div>

        </div>

        <h3 className="mt-4 text-muted-foreground">
          Total Revenue
        </h3>

        <h2 className="text-xl md:text-2xl font-bold mt-2">
          ₹24,58,300
        </h2>

        <div className="flex items-center gap-2 mt-3 text-green-600">
          <TrendingUp size={16} />
          <span>18.2%</span>
        </div>

      </CardContent> */}

  </>
}
