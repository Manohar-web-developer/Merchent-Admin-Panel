import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Attachment, AttachmentGroup, AttachmentMedia } from "@/components/ui/attachment";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Plus, Search, Loader2 } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import {
  Select, SelectContent, SelectGroup,
  SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

import { Field, FieldLabel } from "@/components/ui/field";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const getImageUrl = (item) => {
  if (item.image && typeof item.image === "string" && item.image.startsWith("http")) {
    return item.image;
  }
  if (Array.isArray(item.images) && item.images.length > 0) {
    const firstImg = item.images[0];
    if (typeof firstImg === "string") {
      if (firstImg.startsWith("http://") || firstImg.startsWith("https://")) {
        return firstImg;
      }
      if (firstImg.startsWith("uploads/")) {
        return `http://localhost:4000/${firstImg}`;
      }
      return `http://localhost:4000/uploads/products/${firstImg}`;
    }
  }
  if (typeof item.images === "string" && item.images.startsWith("http")) {
    return item.images;
  }
  return "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=200&q=80";
};

export function Productsheader({ setCategory, setStatus, setSort, setSearch, categories = [], statuses = [] }) {
  return <>
    <div className="p-5 w-full flex items-center justify-between">
      <div>
        <h1 className="font-bold text-2xl pb-5">Products</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>Products</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div>
        <Link to='new' className="text-white bg-[#5A34FD] flex px-4 py-3 gap-2 rounded-lg"><Plus /> <p>Add Product</p></Link>
      </div>
    </div>
    <div className="p-5 w-full flex items-center justify-between">
      <div className="flex items-center justify-between gap-1">
        <div>
          <InputGroup className="w-xl">
            <InputGroupInput placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div>
          <Select onValueChange={(value) => setCategory(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Categories</SelectItem>
                {
                  categories.map((item, idx) => {
                    return (
                      <SelectItem key={idx} value={item}>{item}</SelectItem>
                    )
                  })
                }
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select onValueChange={(value) => setStatus(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Status</SelectItem>
                {
                  statuses.map((item, idx) => {
                    return (
                      <SelectItem key={idx} value={item}>{item}</SelectItem>

                    )
                  })
                }
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

      </div>
      <div>
        <div>
          <Select onValueChange={(value) => setSort(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Sort-By">Sort By</SelectItem>
                <SelectItem value="Price-low">Price: Low to High</SelectItem>
                <SelectItem value="Price-high">Price: High to Low</SelectItem>
                <SelectItem value="Newest">Newest</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  </>
}

export default function Products() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedRows, setSelectedRows] = useState(new Set([]));
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [paginationInfo, setPaginationInfo] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api/admin/";
      const response = await axios.post(`${baseUrl}products/view`, {
        page: currentPage,
        limit: itemsPerPage,
      });

      const data = response.data._data || response.data.data || response.data.products || (Array.isArray(response.data) ? response.data : []);

      const mapped = data.map((item) => {
        const categoryName = typeof item.category === "object" && item.category !== null 
          ? item.category.name 
          : (item.collectionName || item.category || "Uncategorized");

        const brandName = typeof item.brand === "object" && item.brand !== null
          ? item.brand.name
          : (item.vendor || item.brand || "");

        const materialName = typeof item.material === "object" && item.material !== null
          ? item.material.name
          : (item.material || "");

        const price = (item.salePrice && item.salePrice > 0) 
          ? item.salePrice 
          : (item.RegularPrice ?? item.price ?? 0);

        return {
          id: item._id || item.id,
          title: item.name || item.title || "Untitled Product",
          handle: item._id || item.handle || item.id,
          vendor: brandName,
          sku: item.sku || "N/A",
          collectionName: categoryName,
          materialName: materialName,
          price: price,
          compareAtPrice: item.RegularPrice || item.compareAtPrice || 0,
          stock: item.stockQuantity ?? item.stock ?? null,
          status: item.status || "Active",
          image: getImageUrl(item),
          createdAt: item.createdAt || new Date().toISOString(),
          original: item,
        };
      });

      setProductsList(mapped);
      if (response.data.pagination) {
        setPaginationInfo(response.data.pagination);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(error.response?.data?.message || "Failed to fetch products from backend API");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api/admin/";
      const response = await axios.post(`${baseUrl}products/Category-view`, { name: "" });
      const cats = response.data._data || response.data.data || [];
      const catNames = cats.map(c => c.name).filter(Boolean);
      if (catNames.length > 0) {
        setCategoriesList(catNames);
      }
    } catch (err) {
      // Gracefully fallback to extracted categories
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [currentPage, itemsPerPage]);

  const allCategories = categoriesList.length > 0 
    ? Array.from(new Set(categoriesList))
    : Array.from(new Set(productsList.map((item) => item.collectionName).filter(Boolean)));

  const allStatus = Array.from(new Set(["Active", "Inactive", "Draft", ...productsList.map((item) => item.status).filter(Boolean)]));

  const filteredProducts = productsList.filter((item) => {
    const categoryMatch = category === "all" ? true : item.collectionName === category;
    const statusMatch = status === "all" ? true : item.status === status;
    const searchMatch = search === "" ? true : (
      item.title.toLowerCase().trim().includes(search.toLowerCase().trim()) ||
      item.sku.toLowerCase().includes(search.toLowerCase().trim()) ||
      item.collectionName.toLowerCase().includes(search.toLowerCase().trim())
    );

    return categoryMatch && statusMatch && searchMatch;
  });

  if (sort) {
    switch (sort) {
      case "Price-low":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "Price-high":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "Newest":
        filteredProducts.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
        break;
      default:
        break;
    }
  }

  const totalPages = paginationInfo?.totalPages || Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentProducts = paginationInfo ? filteredProducts : filteredProducts.slice(start, end);

  if (pathname !== "/products") {
    return <Outlet />;
  }

  const selectAll = currentProducts.length > 0 && selectedRows.size === currentProducts.length;
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(new Set(currentProducts.map((row) => row.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (id, checked) => {
    let newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedRows(newSelected);
  };

  return <>
    <Productsheader 
      setCategory={setCategory} 
      setStatus={setStatus} 
      setSort={setSort} 
      setSearch={setSearch} 
      categories={allCategories}
      statuses={allStatus}
    />
    <Table>
      <TableHeader className='text-center'>
        <TableRow >
          <TableHead className="w-8">
            <Checkbox
              className='cursor-pointer'
              id="select-all-checkbox"
              name="select-all-checkbox"
              checked={selectAll}
              onCheckedChange={handleSelectAll}
            />
          </TableHead>
          <TableHead colSpan={2} className='text-center'>Product</TableHead>

          <TableHead className='text-center'>Category</TableHead>
          <TableHead className='text-center'>Price</TableHead>
          <TableHead className='text-center'>Sku</TableHead>
          <TableHead className='text-center'>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-12 text-gray-500">
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin text-[#5A34FD]" />
                <span>Loading products...</span>
              </div>
            </TableCell>
          </TableRow>
        ) : currentProducts.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-12 text-gray-500 font-medium">
              No products found.
            </TableCell>
          </TableRow>
        ) : (
          currentProducts.map((row) => (
            <TableRow
              key={row.id}
              data-state={selectedRows.has(row.id) ? "selected" : undefined}
              onClick={() => navigate(`edit/${row.handle}`)}
              className='cursor-pointer'
            >
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  id={`row-${row.id}-checkbox`}
                  name={`row-${row.id}-checkbox`}
                  checked={selectedRows.has(row.id)}
                  onCheckedChange={(checked) =>
                    handleSelectRow(row.id, checked === true)
                  }
                />
              </TableCell>
              <TableCell className="font-medium">
                <div className="mx-auto w-full max-w-sm">
                  <AttachmentGroup className="w-full">

                    <Attachment orientation="vertical">
                      <AttachmentMedia variant="image">
                        <img src={row.image} alt={row.title} />
                      </AttachmentMedia>

                    </Attachment>

                  </AttachmentGroup>
                </div>
              </TableCell>
              <TableCell className="max-w-[200px]">
                <p className="truncate">
                  {row.title}
                </p>
              </TableCell>
              <TableCell className='text-center'>{row.collectionName}</TableCell>
              <TableCell className='text-center'>{row.price}</TableCell>
              <TableCell className='text-center'>{row.sku}</TableCell>
              <TableCell className='text-center'>{row.status}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
    <PaginationBottom setCurrentPage={setCurrentPage} setItemsPerPage={setItemsPerPage} totalPages={totalPages} pages={pages} currentPage={currentPage} />
  </>
}

export function PaginationBottom({ currentPage, setCurrentPage, setItemsPerPage, totalPages, pages }) {
  return (
    <div className="w-full p-5">
      <div className="flex items-center justify-between gap-4 w-[90%] mx-auto">
        <Field orientation="horizontal" className="w-fit whitespace-nowrap">
          <FieldLabel htmlFor="select-rows-per-page">Product per page</FieldLabel>
          <Select defaultValue="25" onValueChange={(value) => {
            setItemsPerPage(Number(value))
            setCurrentPage(1)
          }}>
            <SelectTrigger className="w-20" id="select-rows-per-page">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="start" >
              <SelectGroup>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Pagination>
          <PaginationContent>
            <PaginationItem className='cursor-pointer' onClick={() => {
              if (currentPage > 1) {
                setCurrentPage((prev) => prev - 1)
              }
            }}>
              <PaginationPrevious />
            </PaginationItem>
            {
              pages.map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))
            }
            {totalPages > 5 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem className='cursor-pointer' onClick={() => {
              if (currentPage < totalPages) {
                setCurrentPage((prev) => prev + 1);
              }
            }}>
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}