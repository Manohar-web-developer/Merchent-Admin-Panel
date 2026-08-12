import React, { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Package,
  CheckSquare,
  Flag,
  Users,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import axios from "axios";

// Hardcoded static mock data matching the reference image
const staticMaterials = [
  {
    id: "mat-1",
    name: "Sheesham Wood",
    description:
      "High-quality Sheesham wood, known for its durability and rich texture.",
    productsCount: 45,
    status: "Active",
    createdAt: "12 May 2025",
  },
  {
    id: "mat-2",
    name: "Mango Wood",
    description: "Eco-friendly mango wood with fine finish and natural grain.",
    productsCount: 38,
    status: "Active",
    createdAt: "10 May 2025",
  },
  {
    id: "mat-3",
    name: "Iron",
    description:
      "Strong and durable iron material, perfect for modern furniture.",
    productsCount: 29,
    status: "Active",
    createdAt: "08 May 2025",
  },
  {
    id: "mat-4",
    name: "Cotton Fabric",
    description:
      "Soft and breathable cotton fabric, ideal for cushions and upholstery.",
    productsCount: 22,
    status: "Active",
    createdAt: "05 May 2025",
  },
  {
    id: "mat-5",
    name: "Leather",
    description:
      "Premium quality leather for luxury look and long-lasting use.",
    productsCount: 12,
    status: "Inactive",
    createdAt: "02 May 2025",
  },
];

export default function Material() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [filter, setFilter] = useState({})
  useEffect(()=> {
    axios.post('http://localhost:8000/api/admin/material/view', filter)
    .then((res)=> {
      setMaterials(res.data._data)
    })
    .catch((err)=> {
      console.log(err)
    })
  }, [])

  console.log(materials);
  

  return (
    <div className="p-6 space-y-6 w-full max-w-full min-w-0 overflow-x-hidden">
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full min-w-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Material
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage all materials used in your products.
          </p>
        </div>
        <div>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-[#5A34FD] hover:bg-[#4925e0] text-white font-medium px-4 py-2 h-10 rounded-lg flex items-center gap-2 shadow-xs shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Material</span>
          </Button>
        </div>
      </div>

      {/* 2. STATISTICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full min-w-0">
        {/* Card 1: Total Materials */}
        <Card className="border border-border/80 shadow-2xs rounded-xl p-5 bg-card min-w-0">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <Package className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-muted-foreground truncate">
                Total Materials
              </p>
              <h3 className="text-2xl font-bold text-foreground mt-0.5">
                24
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                All materials
              </p>
            </div>
          </div>
        </Card>

        {/* Card 2: Active Materials */}
        <Card className="border border-border/80 shadow-2xs rounded-xl p-5 bg-card min-w-0">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-muted-foreground truncate">
                Active Materials
              </p>
              <h3 className="text-2xl font-bold text-foreground mt-0.5">
                21
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                Currently active
              </p>
            </div>
          </div>
        </Card>

        {/* Card 3: Inactive Materials */}
        <Card className="border border-border/80 shadow-2xs rounded-xl p-5 bg-card min-w-0">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-rose-100 dark:bg-rose-950/40 text-rose-500 dark:text-rose-400 flex items-center justify-center shrink-0">
              <Flag className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-muted-foreground truncate">
                Inactive Materials
              </p>
              <h3 className="text-2xl font-bold text-foreground mt-0.5">
                3
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                Currently inactive
              </p>
            </div>
          </div>
        </Card>

        {/* Card 4: Total Products */}
        <Card className="border border-border/80 shadow-2xs rounded-xl p-5 bg-card min-w-0">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-muted-foreground truncate">
                Total Products
              </p>
              <h3 className="text-2xl font-bold text-foreground mt-0.5">
                156
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                Using these materials
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* 3. MATERIAL TABLE SECTION */}
      <Card className="border border-border/80 shadow-2xs rounded-xl bg-card overflow-hidden w-full min-w-0">
        <CardContent className="p-6 space-y-6 w-full min-w-0">
          {/* Top Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 w-full min-w-0">
            {/* Search materials input */}
            <div className="relative flex-1 max-w-sm min-w-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search materials..."
                readOnly
                className="pl-9 h-9 border-border/80 bg-background text-sm rounded-lg w-full"
              />
            </div>

            {/* Filters & Sorting */}
            <div className="flex flex-wrap items-center gap-3 self-end sm:self-auto min-w-0">
              {/* Status Filter */}
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px] h-9 text-sm rounded-lg border-border/80 bg-background">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort Dropdown */}
              <Select defaultValue="latest">
                <SelectTrigger className="w-[170px] h-9 text-sm rounded-lg border-border/80 bg-background">
                  <SelectValue placeholder="Sort by: Latest" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Sort by: Latest</SelectItem>
                  <SelectItem value="oldest">Sort by: Oldest</SelectItem>
                  <SelectItem value="name-asc">Sort by: Name A-Z</SelectItem>
                  <SelectItem value="name-desc">Sort by: Name Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table Container - Only table container scrolls horizontally on small screens */}
          <div className="overflow-x-auto w-full min-w-0 rounded-lg border border-border/60">
            <Table className="w-full">
              <TableHeader className="bg-muted/40">
                <TableRow className="border-b border-border/60 hover:bg-transparent">
                  <TableHead className="font-semibold text-xs text-foreground uppercase tracking-wider py-3.5 px-4">
                    Material
                  </TableHead>
                  <TableHead className="font-semibold text-xs text-foreground uppercase tracking-wider py-3.5 px-4 min-w-[260px]">
                    Description
                  </TableHead>
                  <TableHead className="font-semibold text-xs text-foreground uppercase tracking-wider py-3.5 px-4 text-center">
                    Products
                  </TableHead>
                  <TableHead className="font-semibold text-xs text-foreground uppercase tracking-wider py-3.5 px-4 text-center">
                    Status
                  </TableHead>
                  <TableHead className="font-semibold text-xs text-foreground uppercase tracking-wider py-3.5 px-4">
                    Created At
                  </TableHead>
                  <TableHead className="font-semibold text-xs text-foreground uppercase tracking-wider py-3.5 px-4 text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {materials?.map((material) => (
                  <TableRow
                    key={material._id}
                    className="border-b border-border/40 hover:bg-muted/30 transition-colors"
                  >
                    <TableCell className="py-3.5 px-4 font-semibold text-foreground text-sm whitespace-nowrap">
                      {material.name}
                    </TableCell>

                    {/* Description Column */}
                    <TableCell className="py-3.5 px-4 text-sm text-muted-foreground leading-relaxed">
                      <p className="line-clamp-2">{material.description}</p>
                    </TableCell>

                    {/* Products Count Column */}
                    <TableCell className="py-3.5 px-4 text-sm text-center font-medium text-foreground">
                      {material.productCount}
                    </TableCell>

                    {/* Status Column */}
                    <TableCell className="py-3.5 px-4 text-center">
                      <Badge
                        variant={
                          material.status === "Active" ? "active" : "inactive"
                        }
                      >
                        {material.status}
                      </Badge>
                    </TableCell>

                    {/* Created At Column */}
                    <TableCell className="py-3.5 px-4 text-sm text-muted-foreground whitespace-nowrap">
                      {material.createdAt}
                    </TableCell>

                    {/* Actions Column */}
                    <TableCell className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Edit Button (Static visual only) */}
                        <button
                          type="button"
                          title="Edit Material"
                          className="p-1.5 rounded-lg border border-border/80 bg-background hover:bg-muted text-foreground transition-colors cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Button (Static visual only) */}
                        <button
                          type="button"
                          title="Delete Material"
                          className="p-1.5 rounded-lg border border-rose-200/80 bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:border-rose-900/50 dark:hover:bg-rose-900/60 dark:text-rose-400 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* 4. PAGINATION SECTION (Static visual matching reference image) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 w-full min-w-0">
            <p className="text-xs text-muted-foreground">
              Showing <span className="font-medium text-foreground">1</span> to{" "}
              <span className="font-medium text-foreground">5</span> of{" "}
              <span className="font-medium text-foreground">24</span> results
            </p>

            <div className="flex items-center gap-1">
              <button
                type="button"
                className="p-1.5 rounded-md border border-border/80 bg-background text-foreground hover:bg-muted cursor-pointer transition-colors"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                className="min-w-[32px] h-8 px-2 text-xs font-medium rounded-md bg-[#5A34FD] text-white shadow-2xs"
              >
                1
              </button>

              <button
                type="button"
                className="min-w-[32px] h-8 px-2 text-xs font-medium rounded-md border border-border/80 bg-background text-foreground hover:bg-muted cursor-pointer transition-colors"
              >
                2
              </button>

              <button
                type="button"
                className="min-w-[32px] h-8 px-2 text-xs font-medium rounded-md border border-border/80 bg-background text-foreground hover:bg-muted cursor-pointer transition-colors"
              >
                3
              </button>

              <span className="px-1 text-xs text-muted-foreground">...</span>

              <button
                type="button"
                className="min-w-[32px] h-8 px-2 text-xs font-medium rounded-md border border-border/80 bg-background text-foreground hover:bg-muted cursor-pointer transition-colors"
              >
                5
              </button>

              <button
                type="button"
                className="p-1.5 rounded-md border border-border/80 bg-background text-foreground hover:bg-muted cursor-pointer transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ADD MATERIAL DIALOG (UI Interaction only) */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-foreground">
              Add Material
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Fill in the material details below.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-3">
            {/* Material Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Material Name
              </label>
              <Input
                type="text"
                placeholder="Enter material name..."
                className="h-9 text-sm"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Description
              </label>
              <Textarea
                rows={3}
                placeholder="Enter material description..."
                className="text-sm resize-none"
              />
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Status
              </label>
              <Select defaultValue="Active">
                <SelectTrigger className="w-full h-9 text-sm">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0 mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddDialogOpen(false)}
              className="h-9 text-xs font-medium cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => setIsAddDialogOpen(false)}
              className="bg-[#5A34FD] hover:bg-[#4925e0] text-white h-9 text-xs font-medium cursor-pointer"
            >
              Add Material
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}