import { ChevronDown, Search, CheckCircle2, XCircle, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import CategoryTable from "./CategoryTable";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";

export default function CategoryFilters({ setDialogeOpen, setEditCategory }) {
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [sortNumber, setSortNumber] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [refresh, setRefresh] = useState(true);



  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}category/view`, {
        limit: 10,
        page: currentPage,
        name: searchValue,
        sortNumber: sortNumber,
      })
      .then((res) => {
        setPagination(res.data.pagination);
        setCategories(res.data._data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage, searchValue, sortNumber, refresh]);

  const statusChange = (status) => {
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}category/status`, {
        ids: selectedCategories,
        status: status,
      })
      .then((res) => {
        setSelectedCategories([]);
        setRefresh((prev) => !prev);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteCategory = (id) => {
    axios.put(`${import.meta.env.VITE_API_BASE_URL}category/delete`, {
      ids: Array.isArray(id) ? id : [id],
    })
      .then((res) => {
        setSelectedCategories([]);
        setRefresh((prev) => !prev);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="bg-white w-full h-full border border-gray-200 rounded-xl p-3 flex flex-col min-h-0 overflow-hidden">

      <div className="flex w-full justify-between items-center gap-5 mb-3 shrink-0">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search category..."
            className="w-full h-9 pl-9 pr-3 text-sm border rounded-lg outline-none focus:ring-1 focus:ring-gray-300"
          />
        </div>

        <div className="flex gap-2 items-center shrink-0">
          {selectedCategories.length > 0 ? (
            <>
              <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg whitespace-nowrap">
                {selectedCategories.length} Selected
              </span>
              <Button
                variant="outline"
                size="sm"
                className="h-9 border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800 cursor-pointer"
                onClick={() => statusChange(true)}
              >
                Activate
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-9 border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 cursor-pointer"
                onClick={() => statusChange(false)}
              >
                Deactivate
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="h-9 cursor-pointer"
                onClick={() => deleteCategory(selectedCategories)}
              >
                Delete
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCategories([])}
                className="h-9 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                Clear
              </Button>
            </>
          ) : (
            <>
              <div>
                <Select>
                  <SelectTrigger className="h-9 border-gray-200 bg-white text-gray-600 font-normal cursor-pointer">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem onClick={() => setSortNumber(0)} className="cursor-pointer">All Status</SelectItem>
                    <SelectItem onClick={() => setSortNumber(1)} className="cursor-pointer"> Active</SelectItem>
                    <SelectItem onClick={() => setSortNumber(-1)} className="cursor-pointer">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select>
                  <SelectTrigger className="h-9 border-gray-200 bg-white text-gray-600 font-normal cursor-pointer">
                    <SelectValue placeholder="Sort By: Newest" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem onClick={() => setSortNumber(2)} className="cursor-pointer">Name (A-Z)</SelectItem>
                    <SelectItem onClick={() => setSortNumber(-2)} className="cursor-pointer">Name (Z-A)</SelectItem>
                    <SelectItem onClick={() => setSortNumber(3)} className="cursor-pointer">Newest</SelectItem>
                    <SelectItem onClick={() => setSortNumber(-3)} className="cursor-pointer">Oldest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
        <CategoryTable
          categories={categories}
          pagination={pagination}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          deleteCategory={deleteCategory}
          onEdit={(cat) => {
            if (setEditCategory) setEditCategory(cat);
            if (setDialogeOpen) setDialogeOpen(true);
          }}
        />
      </div>
    </div>
  );
}
