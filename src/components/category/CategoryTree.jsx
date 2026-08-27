import React, { useState } from "react";
import CategoryTreeItem from "./CategoryTreeItem";
import { Search } from "lucide-react";

function CategoryTree({ categories, setSelectedCategory, SelectedCategory, onSelect, showSearch = true }) {
    const [searchTerm, setSearchTerm] = useState("");

    const categoryMap = {};

    categories?.forEach((category) => {
        const id = category._id || category.id;
        if (id) {
            categoryMap[id] = {
                ...category,
                children: []
            };
        }
    });

    categories?.forEach((category) => {
        const id = category._id || category.id;
        const parentId = typeof category.parent === "object" && category.parent !== null
            ? (category.parent._id || category.parent.id)
            : category.parent;

        if (parentId && categoryMap[parentId] && categoryMap[id]) {
            categoryMap[parentId].children.push(categoryMap[id]);
        }
    });

    const rootCategory = categories
        ?.filter((category) => {
            const parentId = typeof category.parent === "object" && category.parent !== null
                ? (category.parent._id || category.parent.id)
                : category.parent;
            return !parentId;
        })
        ?.map((category) => categoryMap[category._id || category.id])
        ?.filter(Boolean);

    return (
        <div className="flex w-full h-full flex-col justify-start p-3 min-h-0 overflow-hidden">
            {showSearch && (
                <div className="relative mb-3 shrink-0">
                    <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Search category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-9 pl-9 pr-3 text-sm border rounded-lg outline-none focus:ring-1 focus:ring-gray-300"
                    />
                </div>
            )}
            <div className="flex-1 min-h-0 overflow-y-auto pr-1">
                {rootCategory?.length > 0 ? (
                    rootCategory.map((category) => (
                        <CategoryTreeItem
                            key={category._id || category.id}
                            category={category}
                            level={0}
                            setSelectedCategory={setSelectedCategory}
                            SelectedCategory={SelectedCategory}
                            onSelect={onSelect}
                            searchTerm={searchTerm}
                        />
                    ))
                ) : (
                    <div className="text-xs text-slate-400 text-center py-4">No categories found</div>
                )}
            </div>
        </div>
    );
}

export default CategoryTree;