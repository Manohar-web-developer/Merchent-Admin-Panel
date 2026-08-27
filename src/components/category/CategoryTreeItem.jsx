import { ChevronRight, Folder, Folders, FolderTree } from 'lucide-react'
import React, { useState } from 'react'

function CategoryTreeItem({ category, level = 0, setSelectedCategory, SelectedCategory, onSelect, searchTerm = "" }) {
    const [open, setOpen] = useState(true)

    const hasChildren = category?.children && category?.children?.length > 0

    const categoryId = category?._id || category?.id;
    const selectedId = typeof SelectedCategory === 'object' ? (SelectedCategory?._id || SelectedCategory?.id) : SelectedCategory;
    const isSelected = Boolean(selectedId && categoryId && selectedId === categoryId) || SelectedCategory === category?.name;

    // Search filter check
    const matchesSearch = (item, term) => {
        if (!term || !term.trim()) return true;
        const cleanTerm = term.trim().toLowerCase();
        const nameMatches = item?.name?.toLowerCase().includes(cleanTerm);
        const childMatches = item?.children && item.children.some(c => matchesSearch(c, term));
        return nameMatches || childMatches;
    };

    if (searchTerm && !matchesSearch(category, searchTerm)) {
        return null;
    }

    const handleItemClick = (e) => {
        e.stopPropagation();
        if (onSelect) {
            onSelect(category);
        } else if (setSelectedCategory) {
            setSelectedCategory(category);
        }
    };

    return (
        <>
            {/* Category Item Row */}
            <div
                onClick={handleItemClick}
                style={{ paddingLeft: `${level * 16 + 8}px` }}
                className={`relative flex items-center gap-2 py-1.5 px-2 rounded-md text-xs font-medium transition-colors cursor-pointer select-none ${isSelected
                    ? "bg-indigo-50 text-indigo-700 font-semibold"
                    : "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900"
                    }`}
            >
                {/* Child connector line */}
                {level > 0 && (
                    <div
                        className="absolute top-0 h-1/2 w-2.5 border-l border-b border-slate-200 pointer-events-none"
                        style={{
                            left: `${level * 16 - 4}px`,
                        }}
                    />
                )}

                {/* Arrow */}
                {hasChildren ? (
                    <span
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpen(!open);
                        }}
                        className="p-0.5 hover:bg-slate-200/70 rounded text-slate-500 hover:text-slate-800 transition-transform cursor-pointer shrink-0"
                    >
                        <ChevronRight
                            size={14}
                            className={`transition-transform duration-200 ${open ? "rotate-90" : ""}`}
                        />
                    </span>
                ) : (
                    <div className="w-4 shrink-0" />
                )}

                {/* Folder Icon */}
                {level === 0 ? (
                    <Folder size={14} className="text-slate-500 shrink-0 stroke-[1.75]" />
                ) : level === 1 ? (
                    <Folders size={14} className="text-slate-500 shrink-0 stroke-[1.75]" />
                ) : (
                    <FolderTree size={14} className="text-slate-500 shrink-0 stroke-[1.75]" />
                )}

                {/* Category Name */}
                <span className="truncate">{category?.name || "Unnamed Category"}</span>
            </div>

            {/* Children */}
            {(open || Boolean(searchTerm)) && hasChildren && (
                <div className="relative">
                    {/* Vertical connector line */}
                    <div
                        className="absolute top-0 bottom-2 border-l border-slate-200 pointer-events-none"
                        style={{
                            left: `${level * 16 + 15}px`,
                        }}
                    />

                    {category.children.map((child) => (
                        <CategoryTreeItem
                            key={child._id || child.id}
                            category={child}
                            level={level + 1}
                            setSelectedCategory={setSelectedCategory}
                            SelectedCategory={SelectedCategory}
                            onSelect={onSelect}
                            searchTerm={searchTerm}
                        />
                    ))}
                </div>
            )}
        </>
    )
}

export default CategoryTreeItem