import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { BrandLogo } from "./BrandLogos";

export const BrandRow = ({
  brand,
  isSelected,
  onToggleSelect,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  return (
    <tr
      className={`group transition-colors duration-150 ${
        isSelected ? "bg-[#F7F5FF]" : "hover:bg-gray-50/70"
      }`}
    >
      {/* Checkbox Column */}
      <td className="py-3.5 px-4 sm:px-5 w-10">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(brand.id)}
          className="w-4 h-4 rounded border-gray-300 text-[#5A34FD] focus:ring-[#5A34FD] focus:ring-offset-0 cursor-pointer accent-[#5A34FD]"
        />
      </td>

      {/* Brand Column */}
      <td className="py-3.5 px-4 sm:px-5">
        <div className="flex items-center gap-3">
          <BrandLogo name={brand.name} size="md" />
          <div>
            <span className="font-semibold text-gray-900 text-sm tracking-tight block">
              {brand.name}
            </span>
          </div>
        </div>
      </td>

      {/* Products Column */}
      <td className="py-3.5 px-4 sm:px-5 text-gray-600 font-medium text-xs sm:text-sm">
        {brand.products}
      </td>

      {/* Status Column */}
      <td className="py-3.5 px-4 sm:px-5">
        <button
          type="button"
          onClick={() => onToggleStatus && onToggleStatus(brand.id)}
          title="Click to toggle status"
          className="cursor-pointer group/status focus:outline-none"
        >
          {brand.status === "Active" ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E6F8EF] text-[#10B981] group-hover/status:bg-[#D5F5E4] transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
              Active
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FEEFEF] text-[#EF4444] group-hover/status:bg-[#FDDEDE] transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]"></span>
              Inactive
            </span>
          )}
        </button>
      </td>

      {/* Created At Column */}
      <td className="py-3.5 px-4 sm:px-5 text-gray-500 font-medium text-xs sm:text-sm whitespace-nowrap">
        {brand.createdAt}
      </td>

      {/* Actions Column */}
      <td className="py-3.5 px-4 sm:px-5 text-right">
        <div className="flex items-center justify-end gap-1.5">
          <button
            type="button"
            onClick={() => onEdit(brand)}
            className="w-8 h-8 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-[#5A34FD] hover:border-[#5A34FD]/30 flex items-center justify-center transition-all duration-150 cursor-pointer shadow-2xs active:scale-95"
            title="Edit Brand"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(brand)}
            className="w-8 h-8 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 flex items-center justify-center transition-all duration-150 cursor-pointer shadow-2xs active:scale-95"
            title="Delete Brand"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BrandRow;
