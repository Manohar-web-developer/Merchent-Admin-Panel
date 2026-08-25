import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Pencil, Trash2, Folder,
} from "lucide-react";

export default function CategoryTable({ categories = [] }) {
    return (
        <div className="w-full h-full border border-gray-200 bg-white shadow-xs overflow-y-auto rounded-lg">
            <Table className="w-full table-fixed">
                <TableHeader className="bg-gray-50/80 sticky top-0 z-10 backdrop-blur-xs">
                    <TableRow className="border-b border-gray-200">
                        <TableHead className="w-12 pl-4 pr-2 py-3.5 align-middle">
                            <Checkbox id="select-all-categories" className='cursor-pointer'/>
                        </TableHead>
                        <TableHead className="w-[36%] px-4 py-3.5 font-semibold text-gray-700 align-middle">
                            Category Name
                        </TableHead>

                        <TableHead className="w-[24%] px-4 py-3.5 font-semibold text-gray-700 align-middle">
                            Parent Category
                        </TableHead>

                        <TableHead className="w-[18%] px-4 py-3.5 font-semibold text-gray-700 text-center align-middle">
                            Status
                        </TableHead>

                        <TableHead className="w-[18%] pl-4 pr-6 py-3.5 font-semibold text-gray-700 text-right align-middle">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {categories.map((category) => {
                        return (
                            <TableRow
                                key={category._id}
                                className="hover:bg-gray-50/60 transition-colors border-b border-gray-200"
                            >
                                {/* Checkbox */}
                                <TableCell className="w-12 pl-4 pr-2 py-3.5 align-middle">
                                    <Checkbox id={`category-${category._id}`} className='cursor-pointer'/>
                                </TableCell>
                                {/* Category */}
                                <TableCell className="w-[36%] px-4 py-3.5 align-middle">
                                    <div className="flex items-center gap-2">
                                        <Folder size={14} strokeWidth={1} className="shrink-0 text-gray-500" />
                                        <span className="truncate text-gray-900 text-sm">{category.name}</span>
                                    </div>
                                </TableCell>

                                {/* Parent */}
                                <TableCell className="w-[24%] px-4 py-3.5 text-gray-600 align-middle text-sm">
                                    {category.parent?.name || "—"}
                                </TableCell>

                                {/* Status */}
                                <TableCell className="w-[18%] px-4 py-3.5 text-center align-middle">
                                    <Badge
                                        variant={
                                            category.status
                                                ? "active"
                                                : "inactive"
                                        }
                                    >
                                        {category.status ? "Active"
                                            : "Inactive"}
                                    </Badge>
                                </TableCell>

                                {/* Actions */}
                                <TableCell className="w-[18%] pl-4 pr-6 py-3.5 text-right align-middle">
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