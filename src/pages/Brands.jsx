import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Tag,
  FileCheck,
  Package,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Trash2,
  RefreshCw,
  Pencil,
  ChevronLeft,
  ChevronRight,
  Circle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

// Brand Logo SVG components / helpers
const BrandLogo = ({ name }) => {
  switch (name) {
    case "Nike":
      return (
        <div className="w-8 h-8 rounded-lg border border-gray-100 bg-white flex items-center justify-center p-1 shadow-2xs">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-black">
            <path d="M21.707 5.293c-.273-.273-.782-.162-1.077.202-2.88 3.555-6.685 6.963-10.457 9.878-2.617-2.607-4.475-3.864-5.328-4.225-.615-.26-1.282.046-1.503.655-.246.68.107 1.41.745 1.747 1.455.768 3.82 2.632 6.545 6.386.208.286.54.457.892.457.307 0 .602-.13.812-.358 4.795-5.207 9.534-11.758 9.588-13.67.014-.523-.218-.946-.218-1.072z" />
          </svg>
        </div>
      );
    case "Adidas":
      return (
        <div className="w-8 h-8 rounded-lg border border-gray-100 bg-white flex items-center justify-center p-1 shadow-2xs">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-black">
            <path d="M22 18.5L16.2 8.5H12L17.8 18.5H22ZM15.5 18.5L10.7 10.2H6.5L11.3 18.5H15.5ZM9 18.5L5.2 12H1L4.8 18.5H9Z" />
          </svg>
        </div>
      );
    case "Puma":
      return (
        <div className="w-8 h-8 rounded-lg border border-gray-100 bg-white flex items-center justify-center p-1 shadow-2xs">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-black">
            <path d="M19.5 6.5c-1.1 0-2.1.4-2.8 1.1l-2.2 2.2c-.4.4-.9.6-1.5.6H9c-.6 0-1.1-.4-1.3-.9l-1.2-3c-.2-.6-.8-1-1.5-1H3v2h2l1.2 3c.4 1 1.4 1.7 2.5 1.7h4c1.1 0 2.1-.4 2.8-1.1l2.2-2.2c.4-.4.9-.6 1.5-.6h.3c.6 0 1 .4 1 1v2c0 .6-.4 1-1 1h-2v2h2c1.7 0 3-1.3 3-3V7.5c0-.6-.4-1-1-1h-.5z" />
          </svg>
        </div>
      );
    case "Zara":
      return (
        <div className="w-8 h-8 rounded-lg border border-gray-100 bg-white flex items-center justify-center p-0.5 shadow-2xs">
          <span className="font-serif font-black tracking-tighter text-[9px] text-black scale-y-110">ZARA</span>
        </div>
      );
    case "H&M":
      return (
        <div className="w-8 h-8 rounded-lg border border-gray-100 bg-white flex items-center justify-center p-0.5 shadow-2xs">
          <span className="font-sans font-black italic text-[10px] text-[#E50010]">H&M</span>
        </div>
      );
    case "Levi's":
      return (
        <div className="w-8 h-8 rounded-lg border border-gray-100 bg-white flex items-center justify-center p-0.5 shadow-2xs">
          <div className="bg-[#C41230] text-white px-1 py-0.5 rounded-[2px] text-[7px] font-black tracking-tighter">
            Levi's
          </div>
        </div>
      );
    case "Reebok":
      return (
        <div className="w-8 h-8 rounded-lg border border-gray-100 bg-white flex items-center justify-center p-1 shadow-2xs">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-black">
            <path d="M12 4L3 8v8l9 4 9-4V8l-9-4zm7 11.5l-7 3.1-7-3.1V9.5l7-3.1 7 3.1v6z" />
          </svg>
        </div>
      );
    default:
      return (
        <div className="w-8 h-8 rounded-lg border border-gray-100 bg-white flex items-center justify-center font-bold text-xs text-gray-700">
          {name.charAt(0)}
        </div>
      );
  }
};

export default function Brands() {
  const [bulkMenuOpen, setBulkMenuOpen] = useState(false);
  const [statusChangeMenuOpen, setStatusChangeMenuOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([1, 2]);

  const initialBrands = [
    { id: 1, name: "Nike", products: "18 Products", status: "Active", createdAt: "20 May 2024" },
    { id: 2, name: "Adidas", products: "14 Products", status: "Active", createdAt: "18 May 2024" },
    { id: 3, name: "Puma", products: "10 Products", status: "Active", createdAt: "15 May 2024" },
    { id: 4, name: "Zara", products: "22 Products", status: "Active", createdAt: "10 May 2024" },
    { id: 5, name: "H&M", products: "16 Products", status: "Inactive", createdAt: "05 May 2024" },
    { id: 6, name: "Levi's", products: "12 Products", status: "Active", createdAt: "01 May 2024" },
    { id: 7, name: "Reebok", products: "8 Products", status: "Inactive", createdAt: "28 Apr 2024" },
  ];

  const toggleSelectAll = () => {
    if (selectedBrands.length === initialBrands.length) {
      setSelectedBrands([]);
    } else {
      setSelectedBrands(initialBrands.map((b) => b.id));
    }
  };

  const toggleSelect = (id) => {
    if (selectedBrands.includes(id)) {
      setSelectedBrands(selectedBrands.filter((bId) => bId !== id));
    } else {
      setSelectedBrands([...selectedBrands, id]);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBFD] p-6 md:p-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Brands</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage all your brands in one place.
          </p>
        </div>

        <Link to="/products/brands/add-brand">
          <Button className="bg-[#5A34FD] hover:bg-[#4a29e0] text-white font-medium px-4 py-2.5 rounded-lg text-sm flex items-center gap-2 cursor-pointer shadow-2xs transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Brand</span>
          </Button>
        </Link>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Brands */}
        <Card className="bg-white rounded-xl border border-gray-200/80 shadow-2xs p-5">
          <CardContent className="p-0 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500">Total Brands</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">24</h3>
              <p className="text-xs text-gray-400 mt-1">All registered brands</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#F0EEFF] text-[#5A34FD] flex items-center justify-center shrink-0">
              <Tag className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Active Brands */}
        <Card className="bg-white rounded-xl border border-gray-200/80 shadow-2xs p-5">
          <CardContent className="p-0 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500">Active Brands</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">20</h3>
              <p className="text-xs text-gray-400 mt-1">Currently active brands</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#E6F8EF] text-[#10B981] flex items-center justify-center shrink-0">
              <FileCheck className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Inactive Brands */}
        <Card className="bg-white rounded-xl border border-gray-200/80 shadow-2xs p-5">
          <CardContent className="p-0 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500">Inactive Brands</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">4</h3>
              <p className="text-xs text-gray-400 mt-1">Currently inactive brands</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#FEEFEF] text-[#EF4444] flex items-center justify-center shrink-0">
              <Tag className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        {/* Card 4: Total Products */}
        <Card className="bg-white rounded-xl border border-gray-200/80 shadow-2xs p-5">
          <CardContent className="p-0 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500">Total Products</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">152</h3>
              <p className="text-xs text-gray-400 mt-1">Across all brands</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#F0EEFF] text-[#5A34FD] flex items-center justify-center shrink-0">
              <Package className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table Container */}
      <Card className="bg-white rounded-xl border border-gray-200/80 shadow-2xs overflow-visible">
        <CardContent className="p-0">
          {/* Controls Bar */}
          <div className="p-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
            {/* Left Controls */}
            <div className="flex items-center gap-3 relative flex-wrap">
              {/* Checkbox and Selection count */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedBrands.length === initialBrands.length}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-gray-300 text-[#5A34FD] focus:ring-[#5A34FD] cursor-pointer"
                />
                <span className="text-xs font-semibold text-gray-700">
                  {selectedBrands.length} selected
                </span>
              </div>

              {/* Bulk Actions Dropdown button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setBulkMenuOpen(!bulkMenuOpen)}
                  className="bg-[#F0EEFF] text-[#5A34FD] border border-[#E0DCFF] px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-[#E2DFFF] transition-colors cursor-pointer"
                >
                  <span>Bulk Actions</span>
                  {bulkMenuOpen ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>

                {/* Bulk Actions Menu Overlay */}
                {bulkMenuOpen && (
                  <div className="absolute left-0 top-full mt-1.5 w-44 bg-white rounded-xl border border-gray-200 shadow-lg p-1.5 z-20 space-y-0.5">
                    <button
                      type="button"
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Selected</span>
                    </button>
                    <button
                      type="button"
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-gray-500" />
                      <span>Change Status</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Change Status Dropdown button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setStatusChangeMenuOpen(!statusChangeMenuOpen)}
                  className="text-[#5A34FD] border px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Change Status</span>
                  {statusChangeMenuOpen ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>

                {/* Bulk Actions Menu Overlay */}
                {statusChangeMenuOpen && (
                  <div className="absolute left-0 top-full mt-1.5 w-44 bg-white rounded-xl border border-gray-200 shadow-lg p-1.5 z-20 space-y-0.5">
                    <button
                      type="button"
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-green-500 hover:bg-green-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Active</span>
                    </button>
                    <button
                      type="button"
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Inactive</span>
                    </button>
                  </div>
                )}
              </div>
              {/* Right Controls */}
              <div className="flex items-center gap-3">
                {/* Search input */}
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    type="text"
                    placeholder="Search brands..."
                    className="h-9 w-48 sm:w-64 pl-9 pr-3 rounded-lg border-gray-200 bg-white text-xs text-gray-900 placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-[#5A34FD] focus-visible:border-[#5A34FD]"
                  />
                </div>

                {/* Filter button */}
                <Button
                  type="button"
                  variant="outline"
                  className="h-9 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium px-3 text-xs rounded-lg flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Filter className="w-3.5 h-3.5 text-gray-500" />
                  <span>Filter</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-[#FAFBFD] border-b border-gray-100 text-gray-900 font-semibold">
                <tr>
                  <th className="py-3.5 px-4 w-10">
                    <input
                      type="checkbox"
                      checked={selectedBrands.length === initialBrands.length}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-gray-300 text-[#5A34FD] focus:ring-[#5A34FD] cursor-pointer"
                    />
                  </th>
                  <th className="py-3.5 px-4">Brand</th>
                  <th className="py-3.5 px-4">Products</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Created At</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {initialBrands.map((brand) => {
                  const isSelected = selectedBrands.includes(brand.id);
                  return (
                    <tr
                      key={brand.id}
                      className={`hover:bg-gray-50/70 transition-colors ${isSelected ? "bg-[#F7F5FF]/50" : ""
                        }`}
                    >
                      <td className="py-3.5 px-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelect(brand.id)}
                          className="w-4 h-4 rounded border-gray-300 text-[#5A34FD] focus:ring-[#5A34FD] cursor-pointer"
                        />
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <BrandLogo name={brand.name} />
                          <span className="font-semibold text-gray-900 text-sm">
                            {brand.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-gray-600 font-medium">
                        {brand.products}
                      </td>
                      <td className="py-3.5 px-4">
                        {brand.status === "Active" ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E6F8EF] text-[#10B981]">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FEEFEF] text-[#EF4444]">
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-gray-600 font-medium">
                        {brand.createdAt}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            className="w-7 h-7 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                            title="Edit"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            className="w-7 h-7 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-red-50 hover:text-red-500 hover:border-red-200 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer / Pagination */}
          <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-xs font-medium text-gray-500">
              Showing 1 to 7 of 24 brands
            </span>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                className="w-8 h-8 rounded-lg border border-gray-200 bg-white text-gray-400 hover:bg-gray-50 flex items-center justify-center transition-colors cursor-pointer"
                disabled
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-lg border border-[#5A34FD] bg-[#F0EEFF] text-[#5A34FD] font-semibold text-xs flex items-center justify-center transition-colors cursor-pointer"
              >
                1
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 text-xs font-medium flex items-center justify-center transition-colors cursor-pointer"
              >
                2
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 text-xs font-medium flex items-center justify-center transition-colors cursor-pointer"
              >
                3
              </button>
              <span className="px-1 text-xs text-gray-400 font-medium">...</span>
              <button
                type="button"
                className="w-8 h-8 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 text-xs font-medium flex items-center justify-center transition-colors cursor-pointer"
              >
                4
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}