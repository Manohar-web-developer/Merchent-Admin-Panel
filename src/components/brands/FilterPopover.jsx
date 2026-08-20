import React, { useState, useRef, useEffect } from "react";
import { Filter, X, Check, RotateCcw } from "lucide-react";

export const FilterPopover = ({
  statusFilter = "All",
  sortBy = "newest",
  onApplyFilters,
  onResetFilters,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempStatus, setTempStatus] = useState(statusFilter);
  const [tempSort, setTempSort] = useState(sortBy);
  const popoverRef = useRef(null);

  useEffect(() => {
    setTempStatus(statusFilter);
    setTempSort(sortBy);
  }, [statusFilter, sortBy]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleApply = () => {
    onApplyFilters({ statusFilter: tempStatus, sortBy: tempSort });
    setIsOpen(false);
  };

  const handleReset = () => {
    setTempStatus("All");
    setTempSort("newest");
    onResetFilters();
    setIsOpen(false);
  };

  const isFiltered = statusFilter !== "All" || sortBy !== "newest";

  return (
    <div className="relative inline-block text-left" ref={popoverRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`h-9 px-3 sm:px-3.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all duration-150 cursor-pointer shadow-2xs border ${
          isFiltered || isOpen
            ? "bg-[#F0EEFF] text-[#5A34FD] border-[#5A34FD]/40"
            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
        }`}
      >
        <Filter className="w-3.5 h-3.5" />
        <span>Filter</span>
        {isFiltered && (
          <span className="w-1.5 h-1.5 rounded-full bg-[#5A34FD]"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl border border-gray-200/90 shadow-xl p-4 z-40 space-y-4 animate-in fade-in-50 zoom-in-95 duration-100">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Filter & Sort Brands
            </h4>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 rounded-md p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-700 block">
              Filter by Status
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {["All", "Active", "Inactive"].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setTempStatus(status)}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                    tempStatus === status
                      ? "bg-[#5A34FD] text-white border-[#5A34FD]"
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-700 block">
              Sort By
            </label>
            <select
              value={tempSort}
              onChange={(e) => setTempSort(e.target.value)}
              className="w-full h-8 px-2.5 text-xs border border-gray-200 rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#5A34FD]"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name-asc">Name (A to Z)</option>
              <option value="name-desc">Name (Z to A)</option>
              <option value="products-desc">Products (High to Low)</option>
              <option value="products-asc">Products (Low to High)</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100 gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>

            <button
              type="button"
              onClick={handleApply}
              className="px-3.5 py-1.5 text-xs font-semibold bg-[#5A34FD] text-white rounded-lg hover:bg-[#4C2BD8] transition-colors cursor-pointer"
            >
              Apply Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPopover;
