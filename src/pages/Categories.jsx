import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Categories() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-5 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl pb-2">Categories</h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Categories</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Add Category Dialog Trigger */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#5A34FD] hover:bg-[#4a29e0] text-white flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium cursor-pointer">
              <Plus className="h-4 w-4" />
              <span>Add Category</span>
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Category</DialogTitle>
              <DialogDescription>
                Create a new product category.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-2">
              {/* Category Name Field */}
              <div className="grid gap-2">
                <Label htmlFor="category-name">Category Name</Label>
                <Input
                  id="category-name"
                  placeholder="Enter category name..."
                />
              </div>

              {/* Slug Field */}
              <div className="grid gap-2">
                <Label htmlFor="category-slug">Slug</Label>
                <Input
                  id="category-slug"
                  placeholder="category-slug"
                />
              </div>

              {/* Status Field */}
              <div className="grid gap-2">
                <Label htmlFor="category-status">Status</Label>
                <Select defaultValue="active">
                  <SelectTrigger id="category-status" className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="bg-[#5A34FD] hover:bg-[#4a29e0] text-white cursor-pointer"
                onClick={() => setOpen(false)}
              >
                Add Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}