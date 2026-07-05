import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { useState } from "react";
import { products } from "@/components/Data/ProductData";
import { Attachment, AttachmentGroup, AttachmentMedia, } from "@/components/ui/attachment"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb"
import { Plus } from "lucide-react";
import { Search } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput, } from "@/components/ui/input-group"
import {
  Select, SelectContent, SelectGroup,
  SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"

import { Field, FieldLabel } from "@/components/ui/field"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function Productsheader({ setCategory, setStatus, setSort, setSearch }) {
  const allCategories = [...new Set(products.map((item) => item.collectionName))]
  const allStatus = [...new Set(products.map((item) => item.status))]
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
                  allCategories.map((item, idx) => {
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
                  allStatus.map((item, idx) => {
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

  const [selectedRows, setSelectedRows] = useState(
    new Set([])
  )
  const [category, setCategory] = useState("all")
  const [status, setStatus] = useState("all")
  const [sort, setSort] = useState("")
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const start = (currentPage - 1) * itemsPerPage
  const end = start + itemsPerPage

  const filteredProducts = products.filter((item) => {
    const categoryMatch = category === "all" ? true : item.collectionName === category
    const statusMatch = status === "all" ? true : item.status === status
    const searchMatch = search === "" ? true : item.title.toLocaleLowerCase().trim().includes(search) || item.sku.toLocaleLowerCase().includes(search) || item.collectionName.includes(search)

    return categoryMatch && statusMatch && searchMatch

  })
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i)
  }




  if (pathname !== "/products") {
    return <Outlet />;
  }
  const selectAll = selectedRows.size === products.length
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(new Set(products.map((row) => row.id)))
    } else {
      setSelectedRows(new Set())
    }
  }
  const handleSelectRow = (id, checked) => {

    let newSelected = new Set(selectedRows)
    if (checked) {
      newSelected.add(id)
    } else {
      newSelected.delete(id)
    }
    setSelectedRows(newSelected)

  }


  switch (sort) {
    case "Sort-By":
      break;
    case "Price-low":
      filteredProducts.sort((a, b) => {
        return a.price - b.price
      })
      break;
    case "Price-high":
      filteredProducts.sort((a, b) => {
        return b.price - a.price
      })
      break;
    case "Newest":
      filteredProducts.sort((a, b) => a.createdAt.localeCompare(b.createdAt))
      break;

  }
  const currentProducts = filteredProducts.slice(start, end)



  return <>
    <Productsheader setCategory={setCategory} setStatus={setStatus} setSort={setSort} setSearch={setSearch} />
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
        {currentProducts.map((row) => (
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
        ))}
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
                setCurrentPage((prev) => prev + 1)
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