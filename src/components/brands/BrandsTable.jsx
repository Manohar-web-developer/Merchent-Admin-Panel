import React, { useState } from "react";
import { Search, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import BulkActions from "./BulkActions";
import StatusDropdown from "./StatusDropdown";
import BrandRow from "./BrandRow";
import Pagination from "./Pagination";
import FilterPopover from "./FilterPopover";

export const BrandsTable = ({
  brands = [],
  selectedBrands = [],
  onToggleSelectAll,
  onToggleSelectBrand,
  onBulkDelete,
  onBulkStatusChange,
  onEditBrand,
  onDeleteBrand,
  onToggleSingleStatus,
  searchQuery = "",
  onSearchChange,
  statusFilter = "All",
  sortBy = "newest",
  onApplyFilters,
  onResetFilters,
  currentPage = 1,
  totalPages = 4,
  totalItems = 24,
  itemsPerPage = 7,
  onPageChange,
}) => {
  const isAllSelected =
    brands.length > 0 && brands.every((b) => selectedBrands.includes(b.id));

  return (
    <Card className="bg-white rounded-xl border border-gray-200/80 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.03)] overflow-visible">
      <CardContent className="p-0">
        {/* Controls Bar */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left Controls: Selection Checkbox, Selected Count, Bulk Actions, Change Status */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Checkbox and Selection count */}
            <div className="flex items-center gap-2 pr-1">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={onToggleSelectAll}
                className="w-4 h-4 rounded border-gray-300 text-[#5A34FD] focus:ring-[#5A34FD] focus:ring-offset-0 cursor-pointer accent-[#5A34FD]"
              />
              <span className="text-xs font-semibold text-gray-700 whitespace-nowrap">
                {selectedBrands.length} selected
              </span>
            </div>

            {/* Bulk Actions Dropdown */}
            <BulkActions
              selectedCount={selectedBrands.length}
              onDeleteSelected={onBulkDelete}
              onChangeStatusSelected={() => {
                // If clicked, default to toggling status or opening status dropdown
                onBulkStatusChange("Active");
              }}
            />

            {/* Change Status Dropdown */}
            <StatusDropdown
              disabled={selectedBrands.length === 0}
              onSelectStatus={(status) => onBulkStatusChange(status)}
              buttonLabel="Change Status"
            />
          </div>

          {/* Right Controls: Search Input & Filter Button */}
          <div className="flex items-center gap-3 self-stretch md:self-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search brands..."
                className="h-9 w-full pl-9 pr-3 rounded-lg border-gray-200 bg-white text-xs text-gray-900 placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-[#5A34FD] focus-visible:border-[#5A34FD] shadow-2xs"
              />
            </div>

            {/* Filter Popover Button */}
            <FilterPopover
              statusFilter={statusFilter}
              sortBy={sortBy}
              onApplyFilters={onApplyFilters}
              onResetFilters={onResetFilters}
            />
          </div>
        </div>

        {/* Brands Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-[#FAFBFD] border-b border-gray-100 text-gray-500 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4 sm:px-5 w-10">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={onToggleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 text-[#5A34FD] focus:ring-[#5A34FD] focus:ring-offset-0 cursor-pointer accent-[#5A34FD]"
                  />
                </th>
                <th className="py-3.5 px-4 sm:px-5">Brand</th>
                <th className="py-3.5 px-4 sm:px-5">Products</th>
                <th className="py-3.5 px-4 sm:px-5">Status</th>
                <th className="py-3.5 px-4 sm:px-5">Created At</th>
                <th className="py-3.5 px-4 sm:px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {brands.length > 0 ? (
                brands.map((brand) => (
                  <BrandRow
                    key={brand.id}
                    brand={brand}
                    isSelected={selectedBrands.includes(brand.id)}
                    onToggleSelect={onToggleSelectBrand}
                    onEdit={onEditBrand}
                    onDelete={onDeleteBrand}
                    onToggleStatus={onToggleSingleStatus}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                        <Tag className="w-5 h-5" />
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        No brands found
                      </p>
                      <p className="text-xs text-gray-500 max-w-xs">
                        Try searching with another keyword or resetting your filters.
                      </p>
                      <button
                        type="button"
                        onClick={onResetFilters}
                        className="mt-2 text-xs font-semibold text-[#5A34FD] hover:underline"
                      >
                        Clear Filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
        />
      </CardContent>
    </Card>
  );
};

export default BrandsTable;
