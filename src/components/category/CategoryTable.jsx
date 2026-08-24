import React from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    MoreHorizontal,
    Pencil,
    Trash2,
    FolderTree,
    Folder,
    Folders,
    Eye,
} from "lucide-react";

const mockCategories = [
    {
        id: "1",
        name: "Furniture",
        parent: "—",
        level: 0,
        status: "Active",
    },
    {
        id: "2",
        name: "Living Room",
        parent: "Furniture",
        level: 1,
        status: "Active",
    },
    {
        id: "3",
        name: "Sofas",
        parent: "Living Room",
        level: 2,
        status: "Active",
    },
    {
        id: "4",
        name: "Coffee Tables",
        parent: "Living Room",
        level: 2,
        status: "Inactive",
    },
    {
        id: "5",
        name: "Bedroom",
        parent: "Furniture",
        level: 1,
        status: "Active",
    },
    {
        id: "6",
        name: "Electronics",
        parent: "—",
        level: 0,
        status: "Active",
    },
    {
        id: "7",
        name: "Mobiles",
        parent: "Electronics",
        level: 1,
        status: "Active",
    },
    {
        id: "8",
        name: "Smartphones",
        parent: "Mobiles",
        level: 2,
        status: "Inactive",
    },
    
];

export default function CategoryTable() {
    return (
        <div className="w-full h-full border border-gray-200 bg-white shadow-xs overflow-y-auto rounded-lg">
            <Table>
                <TableHeader className="bg-gray-50/80 sticky top-0 z-10 backdrop-blur-xs">
                    <TableRow>
                        <TableHead className="font-semibold text-gray-700">
                            Category Name
                        </TableHead>

                        <TableHead className="font-semibold text-gray-700">
                            Parent Category
                        </TableHead>

                        <TableHead className="font-semibold text-gray-700">
                            Status
                        </TableHead>

                        <TableHead className="font-semibold text-gray-700 text-right pr-6" >
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {mockCategories.map((category, index) => {

                        const nextCategory = mockCategories[index + 1];

                        const isLastChild =
                            !nextCategory ||
                            nextCategory.level < category.level;

                        return (
                            <TableRow
                                key={category.id}
                                className="hover:bg-gray-50/60 transition-colors"
                            >
                                {/* Category */}
                                <TableCell>
                                    <div
                                        className="relative flex items-center gap-2"
                                        style={{
                                            marginLeft: `${category.level * 20}px`,
                                        }}
                                    >
                                        {category.level > 1 && (
                                            <div
                                                className="absolute left-[-12px] top-0 bottom-0 border-l border-gray-200"
                                            />
                                        )}

                                        {category.level === 0 ? (
                                            <Folder size={14} strokeWidth={1} />
                                        ) : category.level === 1 ? (
                                            <Folders size={14} strokeWidth={1} />
                                        ) : (
                                            <FolderTree size={14} strokeWidth={1} />
                                        )}

                                        <span>{category.name}</span>
                                    </div>
                                </TableCell>

                                {/* Parent */}
                                <TableCell className="text-gray-600 py-3.5">
                                    {category.parent}
                                </TableCell>

                                {/* Status */}
                                <TableCell className="py-3.5">
                                    <Badge
                                        variant={
                                            category.status === "Active"
                                                ? "active"
                                                : "inactive"
                                        }
                                    >
                                        {category.status}
                                    </Badge>
                                </TableCell>

                                {/* Actions */}
                                <TableCell className="text-right py-3.5 pr-4">
                                    <div className="flex items-center justify-end gap-1">

                                        <Button variant="ghost" size="sm" className="h-8 w-8 text-gray-500 hover:text-gray-900 rounded-lg cursor-pointer text-green-600 hover:bg-green-600 hover:bg-opacity-10" title="Edit">
                                            <Pencil size={16} />
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 text-gray-500 hover:text-gray-900 rounded-lg cursor-pointer text-red-600 hover:bg-red-600 hover:bg-opacity-10" title="Delete">
                                            <Trash2 size={16} />
                                        </Button>

                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>      
    );
}