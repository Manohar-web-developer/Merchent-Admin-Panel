import React, { useEffect, useState } from "react";
import { Plus, Search, Pencil, Trash2, Image as ImageIcon, FolderTree, FileCheck, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { Link } from "react-router-dom";

const initialCollectionsData = [
  {
    id: 1,
    name: "Living Room",
    slug: "/living-room",
    description: "Explore furniture and decor for your living space.",
    status: "Active",
    createdAt: "22 Aug 2026",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=200&q=80",
  }
];

export default function Collection() {
  const [collections, setCollections] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCheckbox, SetSelectedCheckbox] = useState([]);
  const [pageination, setPageination] = useState();

  const fetchCollections = () => {
    axios.post(`${import.meta.env.VITE_API_BASE_URL}collection/view`, {
      page: currentPage,
    })
      .then((res) => {
        setPageination(res.data.pagination);

        setCollections(res.data._data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(pageination);
  

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleDelete = (id) => {
    setCollections((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCount = collections.length;
  const activeCount = collections.filter((c) => c.status === "Active").length;
  const inactiveCount = collections.filter((c) => c.status === "Inactive").length;

  return (
    <div className="min-h-screen bg-[#FAFBFD] p-3 sm:p-6 md:p-8 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {/* 1. Header Section */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Categories & Collections
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Manage and organize your product categories and collections.
          </p>
        </div>

        <Link to="add">
          <Button className="bg-[#5A34FD] hover:bg-[#4C2BD8] text-white font-medium px-3.5 py-2 rounded-xl text-xs sm:text-sm inline-flex items-center justify-center gap-1.5 shadow-xs cursor-pointer shrink-0 transition-colors">
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Collection</span>
          </Button>
        </Link>
      </div>

      {/* 2. Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
        {/* Total Collections Card */}
        <Card className="bg-white rounded-xl border border-gray-200/80 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.03)] p-3.5 sm:p-5">
          <CardContent className="p-0 flex items-center justify-between">
            <div className="space-y-0.5 sm:space-y-1">
              <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Total Collections
              </p>
              <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                {totalCount}
              </h3>
              <p className="text-[10px] sm:text-xs text-gray-400 font-normal">
                All registered collections
              </p>
            </div>
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#F0EEFF] text-[#5A34FD] flex items-center justify-center shrink-0 shadow-2xs">
              <FolderTree className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
          </CardContent>
        </Card>

        {/* Active Collections Card */}
        <Card className="bg-white rounded-xl border border-gray-200/80 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.03)] p-3.5 sm:p-5">
          <CardContent className="p-0 flex items-center justify-between">
            <div className="space-y-0.5 sm:space-y-1">
              <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Active Collections
              </p>
              <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                {activeCount}
              </h3>
              <p className="text-[10px] sm:text-xs text-gray-400 font-normal">
                Currently visible on store
              </p>
            </div>
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#E6F8EF] text-[#10B981] flex items-center justify-center shrink-0 shadow-2xs">
              <FileCheck className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
          </CardContent>
        </Card>

        {/* Inactive Collections Card */}
        <Card className="bg-white rounded-xl border border-gray-200/80 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.03)] p-3.5 sm:p-5">
          <CardContent className="p-0 flex items-center justify-between">
            <div className="space-y-0.5 sm:space-y-1">
              <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Inactive Collections
              </p>
              <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                {inactiveCount}
              </h3>
              <p className="text-[10px] sm:text-xs text-gray-400 font-normal">
                Hidden from public
              </p>
            </div>
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#FEEFEF] text-[#EF4444] flex items-center justify-center shrink-0 shadow-2xs">
              <Tag className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. Main Content Table Card */}
      <Card className="bg-white rounded-xl border border-gray-200/80 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.03)] overflow-hidden">
        <CardContent className="p-0">
          {/* Top Controls Bar */}
          <div className="p-3 sm:p-5 border-b border-gray-100 flex items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 z-10" />
              <Input
                type="search"
                placeholder="Search collections..."
                className="h-9 w-full pl-9 pr-3 rounded-lg border border-gray-200 bg-white text-xs text-gray-900 placeholder:text-gray-400 shadow-2xs focus-visible:ring-0 focus-visible:border-gray-200"
              />
            </div>
            <span className="text-xs text-gray-500 font-medium hidden sm:inline-block">
              Showing {collections.length} of {totalCount} items
            </span>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto w-full">
            <Table className="w-full min-w-[650px]">
              <TableHeader className="bg-[#FAFBFD] border-b border-gray-100">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="py-3.5 px-4 text-gray-500 font-semibold uppercase tracking-wider text-[11px] w-[300px]">
                    Collection
                  </TableHead>
                  <TableHead className="py-3.5 px-4 text-gray-500 font-semibold uppercase tracking-wider text-[11px]">
                    Description
                  </TableHead>
                  <TableHead className="py-3.5 px-4 text-gray-500 font-semibold uppercase tracking-wider text-[11px]">
                    Status
                  </TableHead>
                  <TableHead className="py-3.5 px-4 text-gray-500 font-semibold uppercase tracking-wider text-[11px]">
                    Created At
                  </TableHead>
                  <TableHead className="py-3.5 px-4 text-right text-gray-500 font-semibold uppercase tracking-wider text-[11px]">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 bg-white">
                {collections.length > 0 ? (
                  collections.map((collection) => (
                    <TableRow
                      key={collection._id}
                      className="hover:bg-gray-50/70 transition-colors"
                    >
                      {/* Collection Image + Title + Slug */}
                      <TableCell className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          {collection.image ? (
                            <img
                              src={collection.image}
                              alt={collection.name}
                              className="w-12 h-12 rounded-xl object-cover border border-gray-200/80 shadow-2xs shrink-0"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-gray-100/90 border border-gray-200/80 flex flex-col items-center justify-center shrink-0 text-gray-400">
                              <ImageIcon className="w-5 h-5 stroke-[1.75]" />
                            </div>
                          )}
                          <div className="flex flex-col min-w-0">
                            <span className="font-semibold text-gray-900 text-sm tracking-tight truncate">
                              {collection.name}
                            </span>
                            <span className="text-xs text-gray-400 font-mono tracking-tight truncate mt-0.5">
                              {collection.slug}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      {/* Description */}
                      <TableCell className="py-3.5 px-4">
                        <p
                          className="text-xs text-gray-600 max-w-[280px] line-clamp-2 leading-relaxed"
                          title={collection.description}
                        >
                          {collection.description || "—"}
                        </p>
                      </TableCell>

                      {/* Status */}
                      <TableCell className="py-3.5 px-4">
                        <Badge
                          className={`font-semibold text-xs px-2.5 py-0.5 rounded-full border-0 inline-flex items-center gap-1.5 shadow-none hover:bg-transparent ${collection.status === true
                            ? "bg-[#E6F8EF] text-[#10B981]"
                            : "bg-[#FEE2E2] text-[#EF4444]"
                            }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${collection.status === true
                              ? "bg-[#10B981]"
                              : "bg-[#EF4444]"
                              }`}
                          ></span>
                          {collection.status ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>

                      {/* Created At */}
                      <TableCell className="py-3.5 px-4 text-gray-500 font-medium text-xs whitespace-nowrap">
                        {new Date(collection.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-8 h-8 rounded-lg cursor-pointer border border-gray-200 bg-white text-gray-600 hover:bg-[#F0EEFF] hover:text-[#5A34FD] hover:border-[#5A34FD]/30 shadow-2xs transition-colors"
                            title="Edit Collection"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDelete(collection.id)}
                            className="w-8 h-8 rounded-lg cursor-pointer border border-gray-200 bg-white text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 shadow-2xs transition-colors"
                            title="Delete Collection"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="py-10 text-center text-xs text-gray-500"
                    >
                      No collections available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {/* 4. Footer Pagination */}
          {/* <div className="p-3 sm:p-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 bg-white">
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
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}