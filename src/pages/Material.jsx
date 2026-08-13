import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, Plus } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";

const materials = [
  {
    sNo: 1,
    name: "Sheesham Wood",
    status: "Active",
    createdAt: "12 May 2025",
  },
  {
    sNo: 2,
    name: "Mango Wood",
    status: "Active",
    createdAt: "10 May 2025",
  },
  {
    sNo: 3,
    name: "Iron",
    status: "Active",
    createdAt: "08 May 2025",
  },
  {
    sNo: 4,
    name: "Cotton Fabric",
    status: "Active",
    createdAt: "05 May 2025",
  },
  {
    sNo: 5,
    name: "Leather",
    status: "Inactive",
    createdAt: "02 May 2025",
  },
];

function Material() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const [fullData, setFullData] = useState([]);
  const [data, setData] = useState([]);
  const [FilterData, setFilterData] = useState(
    {
      limit: 70,

    }
  );
  const [FormData, setFormData] = useState({
    name: '',
    slug: '',
    status: true
  });
  const [formDataName, setFormDataName] = useState(false);

  const dataHandle = async () => {

    if (FormData.name === '') {
      setFormDataName(true);
      return;
    }

    try {
      const res = await axios.post('http://localhost:8000/api/admin/material/create', FormData);
      console.log(res.data);
      setDialogOpen(false)

    } catch (error) {
      console.log(error);

    }

  }
  const removeError = (e) => {
    if (e.target.value !== '') {
      setFormDataName(false);
    } else {
      setFormDataName(true);
    }
  }

  useEffect(() => {
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/material/view`, FilterData)
      .then((res) => {
        setData(res.data._data);
        setFullData(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [FilterData]);

  return (
    <div className="space-y-6 p-5">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl pb-2">Material</h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Material</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Add Material Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#5A34FD] hover:bg-[#4a29e0] text-white flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium cursor-pointer">
              <Plus className="h-4 w-4" />
              <span>Add Material</span>
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle>Add Material</DialogTitle>
              <DialogDescription>
                Add a new material to your product catalog.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-5 py-3">
              {/* Material Name */}
              <div className="grid gap-2">
                <Label htmlFor="material-name">Material Name</Label>
                <Input

                  onChange={(e) => {
                    setFormData({
                      ...FormData,
                      name: e.target.value
                    })
                    removeError(e);
                  }}
                  id="material-name"
                  placeholder="Enter material name"
                />
                {formDataName && (
                  <span className="text-red-500">Material name is required</span>
                )}
              </div>

              {/* Slug */}
              <div className="grid gap-2">
                <Label htmlFor="material-slug">Slug</Label>
                <Input
                  value={FormData.slug}
                  onChange={(e) => {
                    setFormData({
                      ...FormData,
                      slug: e.target.value
                    })
                  }}
                  id="material-slug"
                  placeholder="material-slug"
                />
              </div>

              {/* Status */}
              <div className="grid gap-2">
                <Label htmlFor="material-status">Status</Label>
                <div className="flex items-center gap-3 pt-1">
                  <Switch
                    id="material-status"
                    checked={FormData.status}
                    onCheckedChange={(checked) => {
                      setFormData({
                        ...FormData,
                        status: checked
                      })
                    }}
                  />
                  <span className="text-sm font-medium text-foreground">
                    {isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setDialogOpen(false)
                }}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="bg-[#5A34FD] hover:bg-[#4a29e0] text-white cursor-pointer"
                onClick={() => {
                  dataHandle();
                }}
              >
                Add Material
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="w-12 px-4 text-center">
                <Checkbox aria-label="Select all materials" className="cursor-pointer" />
              </TableHead>
              <TableHead className="w-16 text-left font-semibold">S.No</TableHead>
              <TableHead className="font-semibold">Material</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Created At</TableHead>
              <TableHead className="w-28 text-right px-4 font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item, index) => (
              <TableRow key={item._id} className="hover:bg-muted/30">
                <TableCell className="px-4 text-center">
                  <Checkbox aria-label={`Select material ${item._id}`} className="cursor-pointer" />
                </TableCell>
                <TableCell className="font-medium text-muted-foreground">{index + 1}</TableCell>
                <TableCell className="font-medium text-foreground">{item.name}</TableCell>
                <TableCell>
                  <Badge variant={item.status ? "active" : "inactive"}>
                    {item.status ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{item.created_at
                  ? new Date(item.created_at).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                  : "-"}</TableCell>
                <TableCell className="px-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer">
                      <Pencil className="h-4 w-4 cursor-pointer" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive cursor-pointer">
                      <Trash2 className="h-4 w-4 cursor-pointer" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Material;