import React, { useEffect, useState, useCallback } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Image as ImageIcon,
  FolderTree,
  FileCheck,
  Tag,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Layers,
  ListFilter,
  ArrowUpDown,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";

export default function Collection() {
  // Collections & Pagination state
  const [collections, setCollections] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [imageBaseUrl, setImageBaseUrl] = useState("");

  // Loading & Error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Status updating map for individual item loaders { [id]: boolean }
  const [statusLoadingMap, setStatusLoadingMap] = useState({});

  // Filters state
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all', 'true', 'false'
  const [sortOrder, setSortOrder] = useState("1"); // '1': name ASC, '-1': name DESC, '-2': newest
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // Bulk Selection state
  const [selectedCheckbox, setSelectedCheckbox] = useState([]);

  // Delete Dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null); // single id or 'bulk'
  const [deleting, setDeleting] = useState(false);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api/admin/";

  // Helper to build auth headers if token exists
  const getAuthHeaders = () => {
    const token = Cookies.get("user_token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Fetch Collections from Backend API
  const fetchCollections = useCallback(
    async (isManualRefresh = false) => {
      if (isManualRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);

      try {
        const payload = {
          page: currentPage,
          limit: limit,
          sortNumber: sortOrder,
        };

        if (search.trim()) {
          payload.name = search.trim();
        }

        if (statusFilter === "true" || statusFilter === "false") {
          payload.status = statusFilter;
        }

        const res = await axios.post(
          `${apiBaseUrl}collections/view`,
          payload,
          { headers: getAuthHeaders() }
        );

        if (res.data) {
          setCollections(res.data._data || []);
          setPagination(res.data.pagination || null);
          setImageBaseUrl(res.data.base_url || import.meta.env.VITE_API_IMAGE_URL || "http://localhost:4000/uploads/collection/");
          setSelectedCheckbox([]);
        }
      } catch (err) {
        const msg = err.response?.data?.message || "Failed to load collections";
        setError(msg);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [apiBaseUrl, currentPage, limit, search, statusFilter, sortOrder]
  );

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  // Handle Search Input Submit / Reset
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchCollections();
  };

  // Toggle Single Status (Active / Inactive)
  const handleToggleStatus = async (collection) => {
    const newStatus = !collection.status;
    const targetId = collection._id;

    setStatusLoadingMap((prev) => ({ ...prev, [targetId]: true }));

    try {
      const res = await axios.post(
        `${apiBaseUrl}collections/status`,
        {
          ids: [targetId],
          status: newStatus,
        },
        { headers: getAuthHeaders() }
      );

      if (res.data) {
        toast.success(`Collection marked as ${newStatus ? "Active" : "Inactive"}`);
        // Local state update for immediate UI feedback
        setCollections((prev) =>
          prev.map((item) =>
            item._id === targetId ? { ...item, status: newStatus } : item
          )
        );
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    } finally {
      setStatusLoadingMap((prev) => ({ ...prev, [targetId]: false }));
    }
  };

  // Bulk Status Update (Mark Active or Inactive)
  const handleBulkStatusChange = async (targetStatus) => {
    if (selectedCheckbox.length === 0) return;

    try {
      const res = await axios.post(
        `${apiBaseUrl}collections/status`,
        {
          ids: selectedCheckbox,
          status: targetStatus,
        },
        { headers: getAuthHeaders() }
      );

      if (res.data) {
        toast.success(res.data.message || "Selected collections updated");
        fetchCollections();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update bulk status");
    }
  };

  // Prompt Confirmation Modal for Delete
  const confirmDelete = (idOrBulk) => {
    setItemToDelete(idOrBulk);
    setDeleteDialogOpen(true);
  };

  // Execute Delete after confirmation
  const executeDelete = async () => {
    if (!itemToDelete) return;

    const idsToDelete =
      itemToDelete === "bulk" ? selectedCheckbox : [itemToDelete];

    if (idsToDelete.length === 0) return;

    setDeleting(true);

    try {
      const res = await axios.post(
        `${apiBaseUrl}collections/delete`,
        { ids: idsToDelete },
        { headers: getAuthHeaders() }
      );

      if (res.data) {
        toast.success(res.data.message || "Collection(s) deleted successfully");
        setDeleteDialogOpen(false);
        setItemToDelete(null);
        setSelectedCheckbox([]);
        fetchCollections();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete collection");
    } finally {
      setDeleting(false);
    }
  };

  // Bulk Checkbox handlers
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedCheckbox(collections.map((item) => item._id));
    } else {
      setSelectedCheckbox([]);
    }
  };

  const handleSelectRow = (id, checked) => {
    if (checked) {
      setSelectedCheckbox((prev) => [...prev, id]);
    } else {
      setSelectedCheckbox((prev) => prev.filter((item) => item !== id));
    }
  };

  // Pagination calculation
  const totalRecords = pagination?.totalRecords ?? collections.length;
  const totalPages = pagination?.totalPages ?? (totalRecords > 0 ? Math.ceil(totalRecords / limit) : 1);
  const activePage = pagination?.currentPage ?? currentPage;
  const startItem = totalRecords > 0 ? (activePage - 1) * limit + 1 : 0;
  const endItem = Math.min(activePage * limit, totalRecords);

  // Statistics counts
  const activeCount = collections.filter((c) => c.status === true).length;
  const inactiveCount = collections.filter((c) => c.status === false).length;

  return (
    <div className="w-full min-h-full bg-[#FAFBFD] p-3 sm:p-6 md:p-8 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            Collections
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Manage your store collections, display order, and active visibility.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchCollections(true)}
            disabled={loading || refreshing}
            className="border-gray-200 text-gray-700 bg-white hover:bg-gray-50 gap-1.5 text-xs font-medium cursor-pointer"
            title="Reload data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-[#5A34FD]" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </Button>

          <Link to="add">
            <Button className="bg-[#5A34FD] hover:bg-[#4C2BD8] text-white font-medium px-4 py-2 rounded-xl text-xs sm:text-sm inline-flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-colors">
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add Collection</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Statistics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
        {/* Total Collections Card */}
        <Card className="bg-white rounded-xl border border-gray-200/80 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.03)] p-3.5 sm:p-5">
          <CardContent className="p-0 flex items-center justify-between">
            <div className="space-y-0.5 sm:space-y-1">
              <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Total Collections
              </p>
              <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                {totalRecords}
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
                Visible on public store
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
                Hidden from public store
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
          <div className="p-3 sm:p-5 border-b border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Form */}
            <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 z-10" />
              <Input
                type="search"
                placeholder="Search by collection name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 w-full pl-9 pr-8 rounded-lg border border-gray-200 bg-white text-xs text-gray-900 placeholder:text-gray-400 shadow-2xs focus-visible:ring-[#5A34FD]"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setCurrentPage(1);
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
                >
                  ×
                </button>
              )}
            </form>

            {/* Filter Controls & Bulk Action */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {/* Status Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 border-gray-200 text-xs gap-1.5 text-gray-700 bg-white hover:bg-gray-50">
                    <ListFilter className="w-3.5 h-3.5 text-gray-500" />
                    <span>
                      {statusFilter === "true"
                        ? "Active"
                        : statusFilter === "false"
                        ? "Inactive"
                        : "All Status"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-36 text-xs">
                  <DropdownMenuLabel>Filter Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { setStatusFilter("all"); setCurrentPage(1); }}>
                    All Status
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setStatusFilter("true"); setCurrentPage(1); }}>
                    Active Only
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setStatusFilter("false"); setCurrentPage(1); }}>
                    Inactive Only
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Sort Order */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 border-gray-200 text-xs gap-1.5 text-gray-700 bg-white hover:bg-gray-50">
                    <ArrowUpDown className="w-3.5 h-3.5 text-gray-500" />
                    <span>Sort</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40 text-xs">
                  <DropdownMenuLabel>Sort Collections</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSortOrder("1")}>
                    Name (A to Z)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOrder("-1")}>
                    Name (Z to A)
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOrder("-2")}>
                    Newest First
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOrder("2")}>
                    Oldest First
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Bulk Actions Button (Shown when items selected) */}
              {selectedCheckbox.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="sm"
                      className="h-9 bg-[#5A34FD] hover:bg-[#4C2BD8] text-white text-xs gap-1.5 shadow-2xs"
                    >
                      <span>Bulk Actions ({selectedCheckbox.length})</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-44 text-xs">
                    <DropdownMenuLabel>Selected Items</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleBulkStatusChange(true)}>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
                      Mark Active
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkStatusChange(false)}>
                      <Tag className="w-3.5 h-3.5 text-amber-600 mr-1.5" />
                      Mark Inactive
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => confirmDelete("bulk")}
                      className="text-red-600 focus:text-red-700 focus:bg-red-50"
                    >
                      <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                      Delete Selected
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>

          {/* API Error State */}
          {error && (
            <div className="p-4 m-4 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between text-xs text-red-700">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{error}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchCollections()}
                className="h-7 px-3 text-xs border-red-300 text-red-700 bg-white hover:bg-red-50"
              >
                Retry
              </Button>
            </div>
          )}

          {/* Table Container */}
          <div className="overflow-x-auto w-full">
            <Table className="w-full min-w-[700px]">
              <TableHeader className="bg-[#FAFBFD] border-b border-gray-100">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="py-3.5 px-4 w-[40px]">
                    <Checkbox
                      checked={
                        collections.length > 0 &&
                        selectedCheckbox.length === collections.length
                      }
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all"
                    />
                  </TableHead>
                  <TableHead className="py-3.5 px-4 text-gray-500 font-semibold uppercase tracking-wider text-[11px] min-w-[220px]">
                    Collection
                  </TableHead>
                  <TableHead className="py-3.5 px-4 text-gray-500 font-semibold uppercase tracking-wider text-[11px] max-w-[200px]">
                    Description
                  </TableHead>
                  <TableHead className="py-3.5 px-4 text-center text-gray-500 font-semibold uppercase tracking-wider text-[11px]">
                    Display Order
                  </TableHead>
                  <TableHead className="py-3.5 px-4 text-center text-gray-500 font-semibold uppercase tracking-wider text-[11px]">
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
                {/* Loading Skeleton Rows */}
                {loading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell className="py-3.5 px-4">
                        <Skeleton className="w-4 h-4 rounded" />
                      </TableCell>
                      <TableCell className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <Skeleton className="w-10 h-10 rounded-xl" />
                          <div className="space-y-1.5">
                            <Skeleton className="w-32 h-4 rounded" />
                            <Skeleton className="w-20 h-3 rounded" />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-3.5 px-4">
                        <Skeleton className="w-44 h-3 rounded" />
                      </TableCell>
                      <TableCell className="py-3.5 px-4 text-center">
                        <Skeleton className="w-8 h-4 rounded mx-auto" />
                      </TableCell>
                      <TableCell className="py-3.5 px-4 text-center">
                        <Skeleton className="w-16 h-5 rounded-full mx-auto" />
                      </TableCell>
                      <TableCell className="py-3.5 px-4">
                        <Skeleton className="w-24 h-3 rounded" />
                      </TableCell>
                      <TableCell className="py-3.5 px-4 text-right">
                        <Skeleton className="w-16 h-8 rounded-lg ml-auto" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : collections.length > 0 ? (
                  collections.map((collection) => {
                    const isSelected = selectedCheckbox.includes(collection._id);
                    const isStatusUpdating = Boolean(statusLoadingMap[collection._id]);

                    // Determine Image Src
                    const rawImg = collection.image || collection.logo;
                    let displayImgSrc = null;
                    if (rawImg) {
                      if (rawImg.startsWith("http://") || rawImg.startsWith("https://")) {
                        displayImgSrc = rawImg;
                      } else {
                        displayImgSrc = `${imageBaseUrl}${rawImg}`;
                      }
                    }

                    return (
                      <TableRow
                        key={collection._id}
                        className={`hover:bg-gray-50/70 transition-colors ${
                          isSelected ? "bg-[#F0EEFF]/30" : ""
                        }`}
                      >
                        {/* Checkbox */}
                        <TableCell className="py-3.5 px-4">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={(checked) =>
                              handleSelectRow(collection._id, checked)
                            }
                            aria-label={`Select ${collection.name}`}
                          />
                        </TableCell>

                        {/* Collection Info (Image + Title + Slug + Website) */}
                        <TableCell className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            {displayImgSrc ? (
                              <img
                                src={displayImgSrc}
                                alt={collection.name}
                                onError={(e) => {
                                  e.currentTarget.onerror = null;
                                  e.currentTarget.style.display = "none";
                                  e.currentTarget.nextElementSibling?.classList.remove("hidden");
                                }}
                                className="w-10 h-10 rounded-xl object-cover border border-gray-200/80 shadow-2xs shrink-0"
                              />
                            ) : null}
                            <div
                              className={`w-10 h-10 rounded-xl bg-[#F0EEFF] border border-purple-100 flex items-center justify-center shrink-0 text-[#5A34FD] ${
                                displayImgSrc ? "hidden" : ""
                              }`}
                            >
                              <FolderTree className="w-5 h-5 stroke-[1.75]" />
                            </div>

                            <div className="flex flex-col min-w-0">
                              <span className="font-semibold text-gray-900 text-sm tracking-tight truncate">
                                {collection.name}
                              </span>
                              <span className="text-[11px] text-gray-400 font-mono tracking-tight truncate mt-0.5">
                                /{collection.slug}
                              </span>
                              {collection.website && (
                                <a
                                  href={collection.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[11px] text-[#5A34FD] hover:underline mt-0.5 truncate"
                                >
                                  <span>{collection.website.replace(/^https?:\/\//, "")}</span>
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              )}
                            </div>
                          </div>
                        </TableCell>

                        {/* Description */}
                        <TableCell className="py-3.5 px-4">
                          <p
                            className="text-xs text-gray-600 max-w-[260px] line-clamp-2 leading-relaxed"
                            title={collection.description}
                          >
                            {collection.description || "—"}
                          </p>
                        </TableCell>

                        {/* Display Order */}
                        <TableCell className="py-3.5 px-4 text-center">
                          <span className="inline-flex items-center justify-center font-mono text-xs font-medium text-gray-700 bg-gray-100 rounded-md px-2 py-0.5">
                            {collection.displayOrder !== undefined ? collection.displayOrder : 0}
                          </span>
                        </TableCell>

                        {/* Status Switch & Badge */}
                        <TableCell className="py-3.5 px-4 text-center">
                          <div className="inline-flex items-center gap-2">
                            {isStatusUpdating ? (
                              <Loader2 className="w-4 h-4 animate-spin text-[#5A34FD]" />
                            ) : (
                              <Switch
                                checked={Boolean(collection.status)}
                                onCheckedChange={() => handleToggleStatus(collection)}
                              />
                            )}
                            <Badge
                              className={`font-semibold text-[10px] px-2 py-0.5 rounded-full border-0 inline-flex items-center shadow-none ${
                                collection.status
                                  ? "bg-[#E6F8EF] text-[#10B981]"
                                  : "bg-[#FEE2E2] text-[#EF4444]"
                              }`}
                            >
                              {collection.status ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                        </TableCell>

                        {/* Created At */}
                        <TableCell className="py-3.5 px-4 text-gray-500 font-medium text-xs whitespace-nowrap">
                          {collection.createdAt
                            ? new Date(collection.createdAt).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            : "—"}
                        </TableCell>

                        {/* Actions */}
                        <TableCell className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link to={`edit/${collection._id}`}>
                              <Button
                                variant="outline"
                                size="icon"
                                className="w-8 h-8 rounded-lg cursor-pointer border border-gray-200 bg-white text-gray-600 hover:bg-[#F0EEFF] hover:text-[#5A34FD] hover:border-[#5A34FD]/30 shadow-2xs transition-colors"
                                title="Edit Collection"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </Button>
                            </Link>

                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => confirmDelete(collection._id)}
                              className="w-8 h-8 rounded-lg cursor-pointer border border-gray-200 bg-white text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 shadow-2xs transition-colors"
                              title="Delete Collection"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  /* Empty State */
                  <TableRow>
                    <TableCell colSpan={7} className="py-12 text-center">
                      <div className="flex flex-col items-center justify-center gap-2 max-w-sm mx-auto">
                        <div className="w-12 h-12 rounded-full bg-[#F0EEFF] text-[#5A34FD] flex items-center justify-center mb-1">
                          <Layers className="w-6 h-6 stroke-[1.75]" />
                        </div>
                        <h3 className="font-semibold text-gray-900 text-base">No collections found</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {search
                            ? `No collections match your search "${search}". Try adjusting your filters.`
                            : "Get started by adding your first product collection."}
                        </p>
                        {!search && (
                          <Link to="add" className="mt-2">
                            <Button className="bg-[#5A34FD] hover:bg-[#4C2BD8] text-white text-xs gap-1.5 px-4 py-2 rounded-lg">
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add Collection</span>
                            </Button>
                          </Link>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* 4. Footer Pagination */}
          {totalRecords > 0 && (
            <div className="p-3 sm:p-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 bg-white">
              <span className="text-xs font-medium text-gray-500 text-center sm:text-left">
                Showing {startItem} to {endItem} of {totalRecords} collections
              </span>

              {totalPages > 1 && (
                <Pagination className="mx-0 w-auto justify-center">
                  <PaginationContent className="flex-wrap justify-center gap-1">
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (activePage > 1) setCurrentPage((prev) => prev - 1);
                        }}
                        className={
                          activePage <= 1
                            ? "pointer-events-none opacity-50 text-xs"
                            : "cursor-pointer text-xs"
                        }
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          isActive={page === activePage}
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(page);
                          }}
                          className={`cursor-pointer text-xs ${
                            page === activePage
                              ? "bg-[#5A34FD] text-white hover:bg-[#4C2BD8]"
                              : ""
                          }`}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (activePage < totalPages) setCurrentPage((prev) => prev + 1);
                        }}
                        className={
                          activePage >= totalPages
                            ? "pointer-events-none opacity-50 text-xs"
                            : "cursor-pointer text-xs"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 5. Confirmation Dialog for Delete */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-semibold text-gray-900">
              {itemToDelete === "bulk"
                ? `Delete ${selectedCheckbox.length} collections?`
                : "Delete collection?"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-gray-500 leading-relaxed">
              This action cannot be undone. Selected collection(s) will be permanently deleted from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4 gap-2">
            <AlertDialogCancel
              disabled={deleting}
              onClick={() => setItemToDelete(null)}
              className="text-xs border-gray-200"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={deleting}
              onClick={executeDelete}
              className="bg-red-600 hover:bg-red-700 text-white text-xs gap-1.5 font-medium"
            >
              {deleting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Confirm Delete</span>
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}