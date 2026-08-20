import React from "react";
import { Tag, FileCheck, XCircle, Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const StatsCard = ({
  totalBrands = 24,
  activeBrands = 20,
  inactiveBrands = 4,
  totalProducts = 152,
}) => {
  const stats = [
    {
      id: "total-brands",
      title: "Total Brands",
      value: totalBrands,
      subtitle: "All registered brands",
      icon: Tag,
      bgColor: "bg-[#F0EEFF]",
      iconColor: "text-[#5A34FD]",
    },
    {
      id: "active-brands",
      title: "Active Brands",
      value: activeBrands,
      subtitle: "Currently active brands",
      icon: FileCheck,
      bgColor: "bg-[#E6F8EF]",
      iconColor: "text-[#10B981]",
    },
    {
      id: "inactive-brands",
      title: "Inactive Brands",
      value: inactiveBrands,
      subtitle: "Currently inactive brands",
      icon: Tag,
      bgColor: "bg-[#FEEFEF]",
      iconColor: "text-[#EF4444]",
    },
    {
      id: "total-products",
      title: "Total Products",
      value: totalProducts,
      subtitle: "Across all brands",
      icon: Package,
      bgColor: "bg-[#F0EEFF]",
      iconColor: "text-[#5A34FD]",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {stats.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <Card
            key={stat.id}
            className="bg-white rounded-xl border border-gray-200/80 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-200 p-5 sm:p-6"
          >
            <CardContent className="p-0 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {stat.title}
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                  {stat.value}
                </h3>
                <p className="text-xs text-gray-400 font-normal">
                  {stat.subtitle}
                </p>
              </div>

              <div
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full ${stat.bgColor} ${stat.iconColor} flex items-center justify-center shrink-0 shadow-2xs`}
              >
                <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCard;
