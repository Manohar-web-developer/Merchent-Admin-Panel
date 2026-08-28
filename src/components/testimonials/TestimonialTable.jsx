import React from "react";
import {
  Search,
  ChevronDown,
  Eye,
  Pencil,
  Trash2,
  Star,
  CheckCircle2,
  Clock,
  XCircle,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { dummyTestimonials } from "@/data/testimonialsData";

export default function TestimonialTable({ onOpenEdit, onOpenDetail }) {
  // Pure static table presentation
  const renderStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return (
          <Badge className="bg-[#E6F8EF] text-[#10B981] border border-[#A7F3D0] hover:bg-[#E6F8EF] px-2.5 py-0.5 rounded-full text-xs font-semibold inline-flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Active
          </Badge>
        );
      case "Pending":
        return (
          <Badge className="bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A] hover:bg-[#FEF3C7] px-2.5 py-0.5 rounded-full text-xs font-semibold inline-flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Pending
          </Badge>
        );
      case "Rejected":
        return (
          <Badge className="bg-[#FEEFEF] text-[#EF4444] border border-[#FCA5A5] hover:bg-[#FEEFEF] px-2.5 py-0.5 rounded-full text-xs font-semibold inline-flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= rating
                ? "fill-amber-400 text-amber-400"
                : "fill-gray-200 text-gray-300"
            }`}
          />
        ))}
        <span className="text-[11px] font-bold text-gray-700 ml-1">
          {rating}.0
        </span>
      </div>
    );
  };

  return (
    <Card className="bg-white rounded-xl border border-gray-200/80 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.03)] overflow-hidden">
      <CardContent className="p-0">
        {/* Top Filter & Toolbar - Static presentation UI */}
        <div className="p-3.5 sm:p-5 border-b border-gray-100 space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 z-10" />
              <Input
                type="search"
                placeholder="Search by customer name or review text..."
                className="h-9 w-full pl-9 pr-3 rounded-lg border border-gray-200 bg-white text-xs text-gray-900 placeholder:text-gray-400 shadow-2xs focus-visible:ring-0 focus-visible:border-[#5A34FD]"
              />
            </div>

            {/* Filter controls */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {/* Status Filter */}
              <select className="h-9 px-3 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-700 focus:outline-none focus:border-[#5A34FD] shadow-2xs cursor-pointer">
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </select>

              {/* Rating Filter */}
              <select className="h-9 px-3 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-700 focus:outline-none focus:border-[#5A34FD] shadow-2xs cursor-pointer">
                <option value="">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars & Below</option>
              </select>

              {/* Bulk Actions Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      className="bg-[#F0EEFF] text-[#5A34FD] border border-[#E0DCFF] hover:bg-[#E4E0FF] px-3 py-1.5 h-9 rounded-lg text-xs font-semibold inline-flex items-center gap-1 shadow-2xs cursor-pointer shrink-0"
                    />
                  }
                >
                  <span>Bulk Actions</span>
                  <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-44">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Mark Status</DropdownMenuLabel>
                    <DropdownMenuItem className="cursor-pointer text-[#10B981]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] mr-2" />
                      Approve & Publish
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-[#D97706]">
                      <Clock className="w-3.5 h-3.5 text-[#D97706] mr-2" />
                      Move to Pending
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-[#EF4444]">
                      <XCircle className="w-3.5 h-3.5 text-[#EF4444] mr-2" />
                      Reject & Hide
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-rose-600 focus:text-rose-600 focus:bg-rose-50">
                    <Trash2 className="w-3.5 h-3.5 mr-2" />
                    Delete Selected
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Sub-bar: Selection Counter */}
          <div className="flex items-center justify-between text-xs text-gray-500 pt-1 border-t border-gray-50">
            <span>0 of {dummyTestimonials.length} items selected</span>
            <span className="text-[11px] text-gray-400">Static UI Preview</span>
          </div>
        </div>

        {/* Clean Balanced Table */}
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader className="bg-gray-50/80">
              <TableRow className="border-b border-gray-100 hover:bg-transparent">
                <TableHead className="w-10 px-4 py-3 text-center">
                  <Checkbox className="rounded border-gray-300" />
                </TableHead>
                <TableHead className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[180px]">
                  Customer Name
                </TableHead>
                <TableHead className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Rating
                </TableHead>
                <TableHead className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[280px]">
                  Review
                </TableHead>
                <TableHead className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Status
                </TableHead>
                <TableHead className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  Created Date
                </TableHead>
                <TableHead className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right pr-6 whitespace-nowrap">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100">
              {dummyTestimonials.map((item) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-gray-50/60 transition-colors group"
                >
                  {/* Checkbox */}
                  <TableCell className="px-4 py-3.5 text-center">
                    <Checkbox className="rounded border-gray-300" />
                  </TableCell>

                  {/* Customer Name + Email */}
                  <TableCell className="px-4 py-3.5 whitespace-nowrap">
                    <div>
                      <div className="text-xs font-semibold text-gray-900 group-hover:text-[#5A34FD] transition-colors flex items-center gap-1.5">
                        {item.customerName}
                        {item.verifiedPurchase && (
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" title="Verified Customer" />
                        )}
                      </div>
                      <div className="text-[11px] text-gray-400 font-normal">
                        {item.customerEmail}
                      </div>
                    </div>
                  </TableCell>

                  {/* Rating */}
                  <TableCell className="px-4 py-3.5 whitespace-nowrap">
                    {renderStars(item.rating)}
                  </TableCell>

                  {/* Review snippet */}
                  <TableCell className="px-4 py-3.5 max-w-md">
                    <p className="text-xs text-gray-700 line-clamp-2 leading-relaxed">
                      "{item.review}"
                    </p>
                  </TableCell>

                  {/* Status Badge */}
                  <TableCell className="px-4 py-3.5 whitespace-nowrap">
                    {renderStatusBadge(item.status)}
                  </TableCell>

                  {/* Created Date */}
                  <TableCell className="px-4 py-3.5 whitespace-nowrap text-xs text-gray-500 font-medium">
                    {item.createdDate}
                  </TableCell>

                  {/* Action Buttons: View / Edit / Delete */}
                  <TableCell className="px-4 py-3.5 whitespace-nowrap text-right pr-6">
                    <div className="flex items-center justify-end gap-1">
                      {/* View Action */}
                      <button
                        type="button"
                        onClick={() => onOpenDetail(item)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-[#5A34FD] hover:bg-[#F0EEFF] transition-colors cursor-pointer"
                        title="View Testimonial Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Edit Action */}
                      <button
                        type="button"
                        onClick={() => onOpenEdit(item)}
                        className="p-1.5 rounded-lg text-gray-500 hover:text-[#5A34FD] hover:bg-[#F0EEFF] transition-colors cursor-pointer"
                        title="Edit Testimonial"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>

                      {/* Delete Action */}
                      <button
                        type="button"
                        className="p-1.5 rounded-lg text-gray-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete Testimonial"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Static Pagination UI Footer */}
        <div className="p-3.5 sm:p-5 border-t border-gray-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-gray-500 font-normal text-center sm:text-left">
            Showing <span className="font-semibold text-gray-900">1</span> to{" "}
            <span className="font-semibold text-gray-900">{dummyTestimonials.length}</span> of{" "}
            <span className="font-semibold text-gray-900">128</span> entries
          </div>

          <div className="flex items-center gap-1">
            <Pagination className="justify-center">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious className="cursor-pointer text-xs h-8 px-2.5" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="cursor-pointer text-xs h-8 w-8 bg-[#5A34FD] text-white hover:bg-[#4C2BD8] border-none font-semibold">
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="cursor-pointer text-xs h-8 w-8 text-gray-700 hover:bg-gray-100">
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="cursor-pointer text-xs h-8 w-8 text-gray-700 hover:bg-gray-100">
                    3
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext className="cursor-pointer text-xs h-8 px-2.5" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
