import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PageHeader = ({ onAddBrand }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Brands
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage all your brands in one place.
        </p>
      </div>

      <Button
        onClick={onAddBrand}
        className="bg-[#5A34FD] hover:bg-[#4C2BD8] active:scale-[0.98] text-white font-medium px-4 py-2.5 rounded-xl text-sm inline-flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow transition-all duration-150 self-start sm:self-auto"
      >
        <Plus className="w-4 h-4 stroke-[2.5]" />
        <span>Add Brand</span>
      </Button>
    </div>
  );
};

export default PageHeader;
