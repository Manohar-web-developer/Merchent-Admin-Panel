import { ChevronDown, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import CategoryTable from "./CategoryTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";

export default function CategoryFilters() {
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState();
  const [sortNumber, setSortNumber] = useState(0);
  useEffect(() => {
    axios
      .post(`http://localhost:4000/api/admin/category/view`, {
        limit: 10,
        page: currentPage,
        name: searchValue,
        sortNumber: sortNumber,
      })
      .then((res) => {
        setPagination(res.data.pagination);
        setCategories(res.data._data);
      });
  }, [currentPage, searchValue, sortNumber]);

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
        <div className="flex gap-2 items-center justify-between">
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
          <div></div>
        </div>
      </div>
      <div className="flex-1 min-h-0 overflow-hidden">
        <CategoryTable
          categories={categories}
          pagination={pagination}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
