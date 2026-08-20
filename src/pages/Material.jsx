import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Pencil, Trash2, Plus } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { toast } from "@/components/ui/Toast";


function Material() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [materialId, setMaterialId] = useState('');
  const [fullData, setFullData] = useState(null);
  const [data, setData] = useState([]);
  const [selectedCheckbox, setSelectedCheckbox] = useState([]);
  const itemsPerPage = 10;
  const [FilterData, setFilterData] = useState({
    limit: itemsPerPage,
    page: 1,
  });

  const [FormData, setFormData] = useState({
    name: '',
    slug: '',
    status: true
  });
  const [formDataName, setFormDataName] = useState(false);
  const getMaterialData = () => {
    axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}material/view`,
        FilterData
      )
      .then((res) => {
        setData(res.data.data || []);
        setFullData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getMaterialData();
  }, [FilterData]);


  useEffect(() => {
    if (!materialId) return;

    axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}/material/details/${materialId}`
      )
      .then((res) => {
        setFormData({
          name: res.data._data?.name || "",
          slug: res.data._data?.slug || "",
          status: res.data._data?.status ?? true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [materialId]);


  const dataHandle = async () => {
    if (FormData.name === "") {
      setFormDataName(true);
      return;
    }

    try {
      if (!materialId) {
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/material/create`,
          FormData
        );

        if (res.data?._error?.errors?.name?.message) {
          toast.add({
            type: "error",
            title: "Error",
            description: res.data._error.errors.name.message,
            position: "top-center",
            duration: 3000,
          });

          return;
        }

        toast.add({
          type: "success",
          title: "Success",
          description: "Material added successfully",
          position: "top-center",
          duration: 3000,
        });

      } else {
        await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/material/update/${materialId}`,
          FormData
        );

        toast.add({
          type: "success",
          title: "Success",
          description: "Material updated successfully",
          position: "top-center",
          duration: 3000,
        });
      }

      setDialogOpen(false);

      setMaterialId("");

      setFormData({
        name: "",
        slug: "",
        status: true
      });

      getMaterialData();

    } catch (error) {
      console.log(error);

      toast.add({
        type: "error",
        title: "Error",
        description: "Something went wrong",
        position: "top-center",
        duration: 3000,
      });
    }
  };
  const removeError = (e) => {
    if (e.target.value === "") {
      setFormDataName(true);
    } else {
      setFormDataName(false);
    }
  }

  const changeStatus = async () => {
    if (selectedCheckbox.length === 0) return;

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/material/change-status`,
        {
          ids: selectedCheckbox,
        }
      );

      toast.add({
        type: "success",
        title: "Success",
        description: res.data?._message || "Status updated successfully",
        position: "top-center",
        duration: 3000,
      });

      getMaterialData();
      setSelectedCheckbox([]);
    } catch (error) {
      console.log(error);
      toast.add({
        type: "error",
        title: "Error",
        description: "Something went wrong",
        position: "top-center",
        duration: 3000,
      });
    }
  };
  const deleteMaterial = async (ids) => {
    try {
      const targetIds = Array.isArray(ids) ? ids : [ids];
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/material/delete`,
        {
          ids: targetIds,
        }
      );

      if (res.data._status) {
        toast.add({
          type: "success",
          title: "Success",
          description: res.data._message || "Material deleted successfully",
          position: "top-center",
          duration: 3000,
        });

        getMaterialData();
        setSelectedCheckbox([]);
      }
    } catch (error) {
      console.log(error);

      toast.add({
        type: "error",
        title: "Error",
        description: "Something went wrong",
        position: "top-center",
        duration: 3000,
      });
    }
    getMaterialData();

  };


  const totalRecords = fullData?.pagination?.totalRecords ?? fullData?.totalRecords ?? 0;
  const totalPages = fullData?.pagination?.totalPages ?? fullData?.totalPages ?? 0;

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

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            disabled={selectedCheckbox.length === 0}
            onClick={changeStatus}
            className="cursor-pointer"
          >
            Change Status
          </Button>

          <Button
            disabled={selectedCheckbox.length === 0}
            onClick={() => deleteMaterial(selectedCheckbox)}
            className="flex items-center gap-2 cursor-pointer"
            variant="destructive"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete Selected</span>
          </Button>

          {/* Add Material Dialog */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen} >
            <DialogTrigger asChild>
              <Button className="bg-[#5A34FD] hover:bg-[#4a29e0] text-white flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium cursor-pointer" onClick={() => {
                setMaterialId("");

                setFormData({
                  name: "",
                  slug: "",
                  status: true
                });

                setFormDataName(false);
              }}>
                <Plus className="h-4 w-4" />
                <span>Add Material</span>
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[480px]">
              <DialogHeader>
                <DialogTitle>{materialId ? "Edit Material" : "Add Material"}</DialogTitle>
                <DialogDescription>
                  {materialId ? "Edit material to your product catalog." : "Add a new material to your product catalog."}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-5 py-3">
                {/* Material Name */}
                <div className="grid gap-2">
                  <Label htmlFor="material-name">Material Name</Label>
                  <Input
                    value={FormData.name || ''}

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
                    value={FormData.slug || ''}
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
                      {FormData.status ? "Active" : "Inactive"}
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
                  {materialId ? "Update Material" : "Add Material"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="w-12 px-4 text-center">
                <Checkbox
                  aria-label="Select all materials"
                  className="cursor-pointer"
                  checked={data.length > 0 && selectedCheckbox.length === data.length}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedCheckbox(data.map((item) => item._id));
                    } else {
                      setSelectedCheckbox([]);
                    }
                  }}
                />
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
                  <Checkbox aria-label={`Select material ${item._id}`} className="cursor-pointer" checked={selectedCheckbox.includes(item._id)} onClick={() => {
                    setSelectedCheckbox((prev) => {
                      if (prev.includes(item._id)) {
                        return prev.filter((id) => id !== item._id)
                      } else {
                        return [...prev, item._id]
                      }
                    })
                  }} />
                </TableCell>
                <TableCell className="font-medium text-muted-foreground">{(FilterData.page - 1) * itemsPerPage + index + 1}</TableCell>
                <TableCell className="font-medium text-foreground">{item.name}</TableCell>
                <TableCell>
                  <Badge variant={item.status ? "active" : "inactive"}>
                    {item.status ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                  : "-"}</TableCell>
                <TableCell className="px-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => {
                      setMaterialId(item._id);
                      setDialogOpen(true);
                    }} className="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer">
                      <Pencil className="h-4 w-4 cursor-pointer" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive cursor-pointer" onClick={() => deleteMaterial(item._id)}>
                      <Trash2 className="h-4 w-4 cursor-pointer" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 px-2">
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">
            {data?.length ? (FilterData.page - 1) * itemsPerPage + 1 : 0}
          </span>{" "}
          to{" "}
          <span className="font-medium text-foreground">
            {Math.min(FilterData.page * itemsPerPage, totalRecords || data?.length || 0)}
          </span>{" "}
          of{" "}
          <span className="font-medium text-foreground">
            {totalRecords || data?.length || 0}
          </span>{" "}
          entries
        </div>

        <Pagination>
          <PaginationContent>

            {/* Previous */}
            <PaginationPrevious
              className={FilterData.page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              onClick={() => {
                if (FilterData.page > 1) {
                  setFilterData((prev) => ({
                    ...prev,
                    page: prev.page - 1,
                  }));
                }
              }}
            />

            {/* Page Numbers */}
            {Array.from(
              { length: totalPages },
              (_, index) => {
                const pageNumber = index + 1;

                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      isActive={FilterData.page === pageNumber}
                      onClick={() => {
                        setFilterData((prev) => ({
                          ...prev,
                          page: pageNumber,
                        }));
                      }}
                      className="cursor-pointer"
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
            )}

            {/* Next */}
            <PaginationNext
              className={FilterData.page >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              onClick={() => {
                if (FilterData.page < totalPages) {
                  setFilterData((prev) => ({
                    ...prev,
                    page: prev.page + 1,
                  }));
                }
              }}
            />

          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default Material;