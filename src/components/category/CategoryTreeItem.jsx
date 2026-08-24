import { ChevronRight, Folder, Folders, FolderTree } from 'lucide-react'
import React, { useState } from 'react'

function CategoryTreeItem({ category, level = 0 }) {
    const [open, setOpen] = useState(true)

    const hasChildren =
        category.children && category.children.length > 0

        
    return (
        <>
            {/* Category */}
            <div
                onClick={() => {
                    if (hasChildren) {
                        setOpen(!open)
                    }
                }}
                style={{ marginLeft: `${level * 20}px` }}
                className={`relative flex gap-2 cursor-pointer items-center py-1 text-sm ${level === 0 ? "pt-2" : ""
                    }`}
            >
                {/* Child connector */}
                {level > 0 && (
                    <div
                        className="absolute top-0 h-1/2 w-3 border-l border-b border-gray-200 rounded-bl-md"
                        style={{
                            left: "-12px",
                        }}
                    />
                )}

                {/* Arrow */}
                {hasChildren ? (
                    <ChevronRight
                        size={14}
                        className={`transition-transform ${open ? "rotate-90" : ""
                            }`}
                    />
                ) : (
                    <div className="w-[14px]" />
                )}

                {/* Folder Icon */}
                {level === 0 ? (
                    <Folder size={14} strokeWidth={1} />
                ) : level === 1 ? (
                    <Folders size={14} strokeWidth={1} />
                ) : (
                    <FolderTree size={14} strokeWidth={1} />
                )}

                {category.name}
            </div>

            {/* Children */}
            {open && hasChildren && (
                <div className="relative">
                    {/* Vertical connector */}
                    <div
                        className="absolute top-0 bottom-2 border-l border-gray-200"
                        style={{
                            left: `${level * 20 + 8}px`,
                        }}
                    />

                    {category.children.map((child) => (
                        <CategoryTreeItem
                            key={child.id}
                            category={child}
                            level={level + 1}
                        />
                    ))}
                </div>
            )}
        </>
    )
}

export default CategoryTreeItem