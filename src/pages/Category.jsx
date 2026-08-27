  import CategoryTree from "@/components/category/CategoryTree";
  import { Button } from "@base-ui/react";
  import CategoryFilters from "@/components/category/CategoryFilters";
  import { useEffect, useState } from "react";
  import axios from "axios";
import CategoryDiloge from "@/components/category/CategoryDiloge";

  function Category() {
    const [Categories, setCategories] = useState([])
    const [dialogeOpen, setDialogeOpen] = useState(false)
    const [editCategory, setEditCategory] = useState(null)

    const fetchCategories = () => {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api/admin/";
      axios.post(`${baseUrl}category/view`, {
        limit: 100
      })
        .then((res) => {
          setCategories(res.data._data || []);
        })
        .catch((err) => {
          console.error("Error fetching categories:", err);
        });
    };

    useEffect(() => {
      fetchCategories();
    }, []);

    const handleAddCategoryClick = () => {
      setEditCategory(null);
      setDialogeOpen(true);
    };

    return (
      <div className="w-full h-full bg-secondary-200 p-9 flex flex-col min-h-0 overflow-hidden">
        <div className="flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-2xl font-bold">
              Category Management
            </h2>
            <p className="text-sm text-gray-500">Organize your store categories and manage their hierarchy.</p>
          </div>
          <Button className="bg-[#563BE3] text-white px-4 py-2 rounded-3xl cursor-pointer" onClick={handleAddCategoryClick}>
            + Add Category
          </Button>
        </div>
        <div className="flex pt-6 gap-2 flex-1 min-h-0 overflow-hidden">
          <div className="p-2 bg-white w-[350px] border border-gray-200 rounded-xl flex flex-col h-full min-h-0 overflow-hidden shrink-0">
            <CategoryTree categories={Categories} />

          </div>
          <div className="flex-1 flex min-h-0 overflow-hidden">
            <CategoryFilters setDialogeOpen={setDialogeOpen} setEditCategory={setEditCategory}/>
          </div>
          <CategoryDiloge 
            dialogeOpen={dialogeOpen} 
            setDialogeOpen={setDialogeOpen} 
            categories={Categories}
            onSuccess={fetchCategories}
            editCategory={editCategory}
            setEditCategory={setEditCategory}
          />
        </div>
      </div>
    );
  }

  export default Category;