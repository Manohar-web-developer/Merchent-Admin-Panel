import {
  Plus,
  Search,
  Filter,
  Eye,
  Pencil,
  Trash2,
  MoreVertical,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const collectionsData = [
  {
    id: 1,
    name: "Living Room",
    slug: "/living-room",
    description: "Explore furniture and decor for your living space.",
    status: "Active",
    createdAt: "22 Aug 2026, 10:30 AM",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 2,
    name: "Bedroom",
    slug: "/bedroom",
    description: "Beds, wardrobes and bedroom furniture.",
    status: "Active",
    createdAt: "21 Aug 2026, 04:15 PM",
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 3,
    name: "Dining",
    slug: "/dining",
    description: "Dining tables, chairs and storage solutions.",
    status: "Active",
    createdAt: "20 Aug 2026, 11:20 AM",
    image:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 4,
    name: "Outdoor",
    slug: "/outdoor",
    description: "Outdoor seating, tables and decor.",
    status: "Active",
    createdAt: "19 Aug 2026, 03:45 PM",
    image: null,
  },
  {
    id: 5,
    name: "Best Sellers",
    slug: "/best-sellers",
    description: "Our most popular and best selling products.",
    status: "Inactive",
    createdAt: "18 Aug 2026, 09:10 AM",
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: 6,
    name: "New Arrivals",
    slug: "/new-arrivals",
    description: "Latest products added to the store.",
    status: "Active",
    createdAt: "17 Aug 2026, 06:00 PM",
    image: null,
  },
];

export default function Categories() {
  return (
    <div className="p-6 md:p-8 space-y-6 max-w-[1400px] mx-auto min-h-screen bg-slate-50/50">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Collections
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage and organize your product collections.
          </p>
        </div>

        <Button className="bg-[#5A34FD] hover:bg-[#4a29e0] text-white font-medium px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto cursor-pointer">
          <Plus className="h-4 w-4 stroke-[2.5]" />
          <span>Add Collection</span>
        </Button>
      </div>

      {/* Main Content Card */}
      <Card className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
        <CardContent className="p-5 md:p-6 space-y-6">
          {/* Filters & Controls Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Left Controls */}
            <div className="flex flex-wrap items-center gap-3 flex-1">
              {/* Search collections input */}
              <div className="relative flex-1 min-w-[220px] sm:min-w-[260px] max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search collections..."
                  className="pl-9 bg-white border-slate-200 focus-visible:ring-1 focus-visible:ring-indigo-500 rounded-lg text-sm"
                />
              </div>

              {/* Status Select dropdown */}
              <Select defaultValue="all">
                <SelectTrigger className="w-[130px] bg-white border-slate-200 rounded-lg text-slate-700">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              {/* Bulk Actions Select dropdown */}
              <Select defaultValue="bulk">
                <SelectTrigger className="w-[145px] bg-white border-slate-200 rounded-lg text-slate-700">
                  <SelectValue placeholder="Bulk Actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bulk">Bulk Actions</SelectItem>
                  <SelectItem value="delete">Delete Selected</SelectItem>
                  <SelectItem value="activate">Mark Active</SelectItem>
                  <SelectItem value="deactivate">Mark Inactive</SelectItem>
                </SelectContent>
              </Select>

              {/* 0 selected text */}
              <span className="text-xs sm:text-sm font-medium text-slate-400 whitespace-nowrap pl-1">
                0 selected
              </span>
            </div>

            {/* Right Controls */}
            <div className="flex flex-wrap items-center gap-3 self-end lg:self-auto">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-600 whitespace-nowrap">
                  Sort By:
                </span>
                <Select defaultValue="newest">
                  <SelectTrigger className="w-[125px] bg-white border-slate-200 rounded-lg text-slate-700">
                    <SelectValue placeholder="Newest" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="name_asc">Name A-Z</SelectItem>
                    <SelectItem value="name_desc">Name Z-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="outline"
                className="gap-2 bg-white border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-lg"
              >
                <Filter className="h-4 w-4 text-slate-500" />
                <span>Filter</span>
              </Button>
            </div>
          </div>

          {/* Collections Table Container */}
          <div className="rounded-xl border border-slate-200/80 overflow-hidden bg-white">
            <Table>
              <TableHeader className="bg-slate-50/80 border-b border-slate-200/80">
                <TableRow className="hover:bg-transparent border-slate-200/80">
                  <TableHead className="w-12 px-4">
                    <Checkbox className="border-slate-300 rounded" />
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700 text-xs uppercase tracking-wider py-4">
                    Collection
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700 text-xs uppercase tracking-wider py-4">
                    Description
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700 text-xs uppercase tracking-wider py-4">
                    Status
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700 text-xs uppercase tracking-wider py-4">
                    Created At
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700 text-xs uppercase tracking-wider text-right pr-6 py-4">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {collectionsData.map((collection) => (
                  <TableRow
                    key={collection.id}
                    className="hover:bg-slate-50/60 transition-colors border-b border-slate-100 last:border-0"
                  >
                    {/* Checkbox */}
                    <TableCell className="px-4 py-4">
                      <Checkbox className="border-slate-300 rounded" />
                    </TableCell>

                    {/* Collection (Thumbnail + Title + Slug) */}
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3.5">
                        {collection.image ? (
                          <img
                            src={collection.image}
                            alt={collection.name}
                            className="w-16 h-12 rounded-lg object-cover border border-slate-200/60 shadow-2xs shrink-0 bg-slate-100"
                          />
                        ) : (
                          <div className="w-16 h-12 rounded-lg bg-slate-100 border border-slate-200/60 flex flex-col items-center justify-center text-slate-400 gap-0.5 shrink-0">
                            <ImageIcon className="w-4 h-4 stroke-[1.5]" />
                            <span className="text-[9px] font-medium text-slate-400 leading-none">
                              No Image
                            </span>
                          </div>
                        )}
                        <div className="flex flex-col gap-0.5">
                          <span className="font-semibold text-slate-900 text-sm">
                            {collection.name}
                          </span>
                          <span className="text-xs text-slate-400 font-normal">
                            {collection.slug}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Description */}
                    <TableCell className="py-4">
                      <p className="text-sm text-slate-600 max-w-sm line-clamp-2">
                        {collection.description}
                      </p>
                    </TableCell>

                    {/* Status Badge */}
                    <TableCell className="py-4">
                      {collection.status === "Active" ? (
                        <Badge
                          variant="active"
                          className="rounded-full px-2.5 py-0.5 text-xs font-medium border flex items-center gap-1.5 w-fit"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Active
                        </Badge>
                      ) : (
                        <Badge
                          variant="inactive"
                          className="rounded-full px-2.5 py-0.5 text-xs font-medium border flex items-center gap-1.5 w-fit"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                          Inactive
                        </Badge>
                      )}
                    </TableCell>

                    {/* Created At */}
                    <TableCell className="py-4 text-sm text-slate-600 whitespace-nowrap">
                      {collection.createdAt}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="py-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg cursor-pointer"
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg cursor-pointer"
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer inline-flex items-center justify-center transition-colors">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">More options</span>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem className="cursor-pointer">
                              <Eye className="mr-2 h-4 w-4" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Pencil className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer text-rose-600 focus:text-rose-600">
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Bottom Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p className="text-sm text-slate-500">
              Showing <span className="font-medium text-slate-700">1</span> to{" "}
              <span className="font-medium text-slate-700">6</span> of{" "}
              <span className="font-medium text-slate-700">6</span> collections
            </p>

            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 bg-white border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous Page</span>
              </Button>

              <Button className="h-9 w-9 bg-[#5A34FD] hover:bg-[#4a29e0] text-white font-medium rounded-lg shadow-2xs">
                1
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 bg-white border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg"
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next Page</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}