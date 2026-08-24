import React from "react";
import CategoryTreeItem from "./CategoryTreeItem";
import { Search } from "lucide-react";

function CategoryTree({ categories }) {
    return (
        <div className="flex w-full h-full flex-col justify-start p-3 min-h-0 overflow-hidden">
            <div className="relative mb-3 shrink-0">
                <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                    type="text"
                    placeholder="Search category..."
                    className="w-full h-9 pl-9 pr-3 text-sm border rounded-lg outline-none focus:ring-1 focus:ring-gray-300"
                />
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto pr-1">
                {categories.map((category) => {
                    return (
                        <CategoryTreeItem key={category.id} category={category} />
                    )
                })}
            </div>
        </div>
    );
}

export default CategoryTree;