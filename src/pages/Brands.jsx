import React, { useEffect } from "react";
import { Plus, Tag, FileCheck, Package, Search, Filter, ChevronDown, Pencil, Trash2, ChevronLeft, ChevronRight, CheckCircle, Trash2Icon, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import axios from "axios";
import { toast } from "@/components/ui/toast";

export default function Brands() {

  const [products, setProducts] = useState([]);
  const [selectedCheckbox, setSelectedCheckbox] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios.post(`${import.meta.env.VITE_API_BASE_URL}brand/view`, {
      page: currentPage,
      limit: limit,
      name: search,
    })
      .then((res) => {
        setSelectedCheckbox([]);
        fetchBrands();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage]);

  const fetchBrands = async () => {
    const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}brand/view`, {
      page: currentPage,
      limit: limit,
      name: search,
    });
    setProducts(res.data);
  };

  const handleSearch = () => {
    fetchBrands();
  }

  const pagination = products?.pagination || {};
  const totalRecords = pagination.totalRecords ?? (products?.totalRecords || products?._data?.length || 0);
  const totalPages = pagination.totalPages ?? (products?.totalPages || (totalRecords > 0 ? Math.ceil(totalRecords / 10) : 1));
  const activePage = pagination.currentPage ?? currentPage;
  const limit = pagination.limit ?? 10;
  const startItem = totalRecords > 0 ? (activePage - 1) * limit + 1 : 0;
  const endItem = Math.min(activePage * limit, totalRecords);


  const deleteRecord = (id) => {
    const targetIds = Array.isArray(id) ? id : [id];
    axios.put(`${import.meta.env.VITE_API_BASE_URL}brand/delete`, {
      ids: targetIds
    })
      .then((res) => {

        if (res.data) {
          toast.add({
            type: "success",
            description: res.data.message,
          })
          fetchBrands();
          setSelectedCheckbox([])
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setProducts(prev => ({ ...prev, _data: prev._data.filter(item => item._id !== id) }));

  }

  const statusUpdate = (id, status) => {
    const targetIds = Array.isArray(id) ? id : [id];
    axios.post(`${import.meta.env.VITE_API_BASE_URL}brand/status`, {
      ids: targetIds,
      status: status
    })
      .then((res) => {
        if (res.data) {
          toast.add({
            type: "success",
            description: res.data.message,
          })
          fetchBrands();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

console.log(products);


  return (
    <div className="w-full min-h-full bg-[#FAFBFD] p-3 sm:p-6 md:p-8 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {/* 1. Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Brands
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Manage all your brands in one place.
          </p>
        </div>

        <Link
          to="add"
          className="bg-[#5A34FD] hover:bg-[#4C2BD8] text-white font-medium px-3.5 py-2 rounded-xl text-xs sm:text-sm inline-flex items-center justify-center gap-1.5 shadow-xs cursor-pointer shrink-0 transition-colors"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Brand</span>
        </Link>
      </div>

      {/* 2. Statistics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
        {/* Total Brands Card */}
        <Card className="bg-white rounded-xl border border-gray-200/80 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.03)] p-3.5 sm:p-5">
          <CardContent className="p-0 flex items-center justify-between">
            <div className="space-y-0.5 sm:space-y-1">
              <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Total Brands
              </p>
              <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                {totalRecords}
              </h3>
              <p className="text-[10px] sm:text-xs text-gray-400 font-normal">
                All registered brands
              </p>
            </div>
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#F0EEFF] text-[#5A34FD] flex items-center justify-center shrink-0 shadow-2xs">
              <Tag className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
          </CardContent>
        </Card>

        {/* Active Brands Card */}
        <Card className="bg-white rounded-xl border border-gray-200/80 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.03)] p-3.5 sm:p-5">
          <CardContent className="p-0 flex items-center justify-between">
            <div className="space-y-0.5 sm:space-y-1">
              <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Active Brands
              </p>
              <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                {products._data?.filter((item) => item.status === true).length || 0}
              </h3>
              <p className="text-[10px] sm:text-xs text-gray-400 font-normal">
                Currently active brands
              </p>
            </div>
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#E6F8EF] text-[#10B981] flex items-center justify-center shrink-0 shadow-2xs">
              <FileCheck className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
          </CardContent>
        </Card>

        {/* Inactive Brands Card */}
        <Card className="bg-white rounded-xl border border-gray-200/80 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.03)] p-3.5 sm:p-5">
          <CardContent className="p-0 flex items-center justify-between">
            <div className="space-y-0.5 sm:space-y-1">
              <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Inactive Brands
              </p>
              <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                {products._data?.filter((item) => item.status === false).length || 0}
              </h3>
              <p className="text-[10px] sm:text-xs text-gray-400 font-normal">
                Currently inactive brands
              </p>
            </div>
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#FEEFEF] text-[#EF4444] flex items-center justify-center shrink-0 shadow-2xs">
              <Tag className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. Brands Content Card */}
      <Card className="bg-white rounded-xl border border-gray-200/80 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.03)] overflow-hidden">
        <CardContent className="p-0">
          {/* Top Controls Bar */}
          <div className="p-3 sm:p-5 border-b border-gray-100 space-y-2.5">
            {/* Row 1: Search & Filter */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 z-10" />
                <Input
                  type="search"
                  placeholder="Search brands..."
                  onKeyUp={handleSearch}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-9 w-full pl-9 pr-3 rounded-lg border border-gray-200 bg-white text-xs text-gray-900 placeholder:text-gray-400 shadow-2xs focus-visible:ring-0 focus-visible:border-gray-200"
                />
              </div>

            </div>

            {/* Row 2: Selected count & Action Dropdowns */}
            <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-none pt-0.5">
              <span className="text-xs font-semibold text-gray-700 whitespace-nowrap px-0.5 shrink-0">
                {selectedCheckbox.length || 0} selected
              </span>

              {/* Bulk Actions Button */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      className="bg-[#F0EEFF] text-[#5A34FD] border border-[#E0DCFF] hover:bg-[#E4E0FF] px-2.5 py-1 sm:px-3.5 sm:py-1.5 h-7 sm:h-8 rounded-lg text-xs font-semibold inline-flex items-center gap-1 shadow-2xs cursor-pointer shrink-0"
                    />
                  }
                >
                  <span>Bulk Actions</span>
                  <ChevronDown className="w-3 h-3 stroke-[2.5]" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Status</DropdownMenuLabel>
                    <DropdownMenuItem
                      className="cursor-pointer text-[#10B981]"
                      onClick={() => statusUpdate(selectedCheckbox, "1")}
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-[#10B981] mr-2" />
                      Active
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer text-[#EF4444]"
                      onClick={() => statusUpdate(selectedCheckbox, "0")}
                    >
                      <Tag className="w-3.5 h-3.5 text-[#EF4444] mr-2" />
                      Inactive
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      className="cursor-pointer text-[#EF4444]"
                      onClick={() => deleteRecord(selectedCheckbox)}
                    >
                      <Trash2Icon className="w-3.5 h-3.5 text-[#EF4444] mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Change Status Button */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      className="bg-[#F0EEFF] text-[#5A34FD] border border-[#E0DCFF] hover:bg-[#E4E0FF] px-2.5 py-1 sm:px-3.5 sm:py-1.5 h-7 sm:h-8 rounded-lg text-xs font-semibold inline-flex items-center gap-1 shadow-2xs cursor-pointer shrink-0"
                    />
                  }
                >
                  <span>Change Status</span>
                  <ChevronDown className="w-3 h-3 stroke-[2.5]" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      className="cursor-pointer text-[#10B981]"
                      onClick={() => statusUpdate(selectedCheckbox, "1")}
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-[#10B981] mr-2" />
                      Active
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer text-[#EF4444]"
                      onClick={() => statusUpdate(selectedCheckbox, "0")}
                    >
                      <Tag className="w-3.5 h-3.5 text-[#EF4444] mr-2" />
                      Inactive
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Table Container - Overflow Scrollable */}
          <div className="overflow-x-auto w-full">
            <Table className="w-full min-w-[600px]">
              <TableHeader className="bg-[#FAFBFD] border-b border-gray-100">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="py-3 px-3 sm:px-5 w-10">
                    <Checkbox
                      className="rounded border-gray-300 data-checked:bg-[#5A34FD] data-checked:border-[#5A34FD]"
                      checked={
                        products._data?.length > 0 &&
                        selectedCheckbox.length === products._data.length
                      }
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedCheckbox(
                            products._data.map((value) => value._id)
                          );
                        } else {
                          setSelectedCheckbox([]);
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead className="py-3 px-3 sm:px-5 text-gray-500 font-semibold uppercase tracking-wider text-[11px]">
                    Brand
                  </TableHead>
                  <TableHead className="py-3 px-3 sm:px-5 text-gray-500 font-semibold uppercase tracking-wider text-[11px]">
                    Products
                  </TableHead>
                  <TableHead className="py-3 px-3 sm:px-5 text-gray-500 font-semibold uppercase tracking-wider text-[11px]">
                    Status
                  </TableHead>
                  <TableHead className="py-3 px-3 sm:px-5 text-gray-500 font-semibold uppercase tracking-wider text-[11px]">
                    Created At
                  </TableHead>
                  <TableHead className="py-3 px-3 sm:px-5 text-right text-gray-500 font-semibold uppercase tracking-wider text-[11px]">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 bg-white">
                {products._data?.length > 0 ? (
                  products._data.map((value) => {
                    const isSelected = selectedCheckbox.includes(value._id);
                    return (
                      <TableRow
                        className="hover:bg-gray-50/70 transition-colors"
                        key={value._id}
                      >
                        <TableCell className="py-3 px-3 sm:px-5 w-10">
                          <Checkbox
                            className="rounded border-gray-300 data-checked:bg-[#5A34FD] data-checked:border-[#5A34FD]"
                            checked={isSelected}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedCheckbox([
                                  ...selectedCheckbox,
                                  value._id,
                                ]);
                              } else {
                                setSelectedCheckbox(
                                  selectedCheckbox.filter(
                                    (id) => id !== value._id
                                  )
                                );
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell className="py-3 px-3 sm:px-5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg border border-gray-200/80 bg-white flex items-center justify-center font-bold text-[11px] text-gray-900 shadow-2xs shrink-0 uppercase">
                              {value.name ? value.name[0] + value.name[value.name.length - 1] : "B"}
                            </div>
                            <span className="font-semibold text-gray-900 text-xs sm:text-sm tracking-tight whitespace-nowrap">
                              {value.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3 px-3 sm:px-5 text-gray-600 font-medium text-xs sm:text-sm whitespace-nowrap">
                          {value.productCount || 0} Products
                        </TableCell>
                        <TableCell className="py-3 px-3 sm:px-5">
                          <Badge
                            className={`font-semibold text-xs px-2.5 py-0.5 rounded-full border-0 inline-flex items-center gap-1.5 shadow-none hover:bg-transparent ${
                              value.status
                                ? "bg-[#E6F8EF] text-[#10B981]"
                                : "bg-[#FEE2E2] text-[#EF4444]"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                value.status ? "bg-[#10B981]" : "bg-[#EF4444]"
                              }`}
                            ></span>
                            {value.status ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-3 px-3 sm:px-5 text-gray-500 font-medium text-xs sm:text-sm whitespace-nowrap">
                          {new Date(value.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </TableCell>
                        <TableCell className="py-3 px-3 sm:px-5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link to={`/products/brands/edit/${value._id}`}>
                              <Button
                                variant="outline"
                                size="icon"
                                className="w-7 h-7 rounded-lg cursor-pointer border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-[#5A34FD] hover:border-[#5A34FD]/30 shadow-2xs"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </Button>
                            </Link>
                            <Button
                              variant="outline"
                              onClick={() => deleteRecord(value._id)}
                              size="icon"
                              className="w-7 h-7 rounded-lg cursor-pointer border border-gray-200 bg-white text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 shadow-2xs"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="py-8 text-center text-xs text-gray-500"
                    >
                      No brands found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* 4. Footer Pagination */}
          <div className="p-3 sm:p-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 bg-white">
            <span className="text-xs font-medium text-gray-500 text-center sm:text-left">
              {totalRecords > 0
                ? `Showing ${startItem} to ${endItem} of ${totalRecords} brands`
                : "No brands found"}
            </span>

            {totalPages > 0 && (
              <Pagination className="mx-0 w-auto justify-center">
                <PaginationContent className="flex-wrap justify-center gap-1">
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (activePage > 1) {
                          setCurrentPage(activePage - 1);
                        }
                      }}
                      className={
                        activePage <= 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          isActive={page === activePage}
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(page);
                          }}
                          className="cursor-pointer text-xs"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (activePage < totalPages) {
                          setCurrentPage(activePage + 1);
                        }
                      }}
                      className={
                        activePage >= totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}