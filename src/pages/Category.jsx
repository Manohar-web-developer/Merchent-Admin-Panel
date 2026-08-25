import CategoryTree from "@/components/category/CategoryTree";
import { initialCategoriesTree } from "../components/category/categoryData";
import { Button } from "@base-ui/react";
import CategoryFilters from "@/components/category/CategoryFilters";
import { useEffect, useState } from "react";
import axios from "axios";

function Category() {
  const [Categories,setCategories] = useState([])

  useEffect(()=>{
    axios.post(`http://localhost:4000/api/admin/category/view`, {
      limit: 100
    })
    .then((res)=>{
      setCategories(res.data._data)
    })
  }, [])
  
  return (
    <div className="w-full h-full bg-secondary-200 p-9 flex flex-col min-h-0 overflow-hidden">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-2xl font-bold">
            Category Management
          </h2>
          <p className="text-sm text-gray-500">Organize your store categories and manage their hierarchy.</p>
        </div>
        <Button className="bg-[#563BE3] text-white px-4 py-2 rounded-3xl cursor-pointer">
          + Add Category
        </Button>
      </div>
      <div className="flex pt-6 gap-2 flex-1 min-h-0 overflow-hidden">
        <div className="p-2 bg-white w-[350px] border border-gray-200 rounded-xl flex flex-col h-full min-h-0 overflow-hidden shrink-0">
          <CategoryTree categories={Categories} />

        </div>
        <div className="flex-1 flex min-h-0 overflow-hidden">
          <CategoryFilters />
        </div>
      </div>
    </div>
  );
}

export default Category;