import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from "@/components/ui/toast"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Folder, X } from "lucide-react"
import CategoryTree from './CategoryTree'

function CategoryDiloge({ dialogeOpen, setDialogeOpen, categories, onSuccess, editCategory, setEditCategory }) {
    const [categoryName, setCategoryName] = useState("")
    const [parentCategory, setParentCategory] = useState("")
    const [status, setStatus] = useState(true)
    const [description, setDescription] = useState("")
    const [SelectedCategory, setSelectedCategory] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (editCategory && dialogeOpen) {
            setCategoryName(editCategory.name || "");
            const parentId = typeof editCategory.parent === "object" && editCategory.parent !== null
                ? (editCategory.parent._id || editCategory.parent.id)
                : (editCategory.parent || editCategory.parentCategory || "");
            setParentCategory(parentId || "");

            if (parentId && categories) {
                const parentObj = categories.find(c => (c._id || c.id) === parentId);
                setSelectedCategory(parentObj || (typeof editCategory.parent === "object" ? editCategory.parent : null));
            } else {
                setSelectedCategory(null);
            }

            setStatus(editCategory.status !== undefined ? Boolean(editCategory.status) : true);
            setDescription(editCategory.description || "");
        } else if (!dialogeOpen) {
            resetForm();
        }
    }, [editCategory, dialogeOpen, categories]);

    const handleSelectCategory = (cat) => {
        const catId = cat?._id || cat?.id;
        const selectedId = SelectedCategory?._id || SelectedCategory?.id;

        if (selectedId === catId) {
            setSelectedCategory(null);
            setParentCategory("");
        } else {
            setSelectedCategory(cat);
            setParentCategory(catId);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!categoryName.trim()) {
            toast.add({ type: "error", description: "Category name is required" });
            return;
        }

        setLoading(true);
        const payload = {
            name: categoryName.trim(),
            parentCategory: parentCategory || null,
            parent: parentCategory || null,
            status: status,
            description: description.trim()
        };

        const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api/admin/";

        if (editCategory) {
            const editId = editCategory._id || editCategory.id;
            try {
                const res = await axios.put(`${baseUrl}category/update/${editId}`, payload);
                toast.add({
                    type: "success",
                    description: res.data?.message || "Category updated successfully!",
                });
                resetForm();
                setDialogeOpen(false);
                if (onSuccess) onSuccess();
            } catch (err) {
                console.error("Update Category Error:", err);
                try {
                    const res = await axios.put(`${baseUrl}category/update`, { _id: editId, id: editId, ...payload });
                    toast.add({
                        type: "success",
                        description: res.data?.message || "Category updated successfully!",
                    });
                    resetForm();
                    setDialogeOpen(false);
                    if (onSuccess) onSuccess();
                } catch (fallbackErr) {
                    try {
                        const res = await axios.post(`${baseUrl}category/update/${editId}`, payload);
                        toast.add({
                            type: "success",
                            description: res.data?.message || "Category updated successfully!",
                        });
                        resetForm();
                        setDialogeOpen(false);
                        if (onSuccess) onSuccess();
                    } catch (postErr) {
                        toast.add({
                            type: "error",
                            description: err.response?.data?.message || fallbackErr.response?.data?.message || postErr.response?.data?.message || "Failed to update category",
                        });
                    }
                }
            } finally {
                setLoading(false);
            }
        } else {
            try {
                const res = await axios.post(`${baseUrl}category/create`, payload);
                toast.add({
                    type: "success",
                    description: res.data?.message || "Category created successfully!",
                });
                resetForm();
                setDialogeOpen(false);
                if (onSuccess) onSuccess();
            } catch (err) {
                console.error("Create Category Error:", err);
                try {
                    const res = await axios.post(`${baseUrl}category/add`, payload);
                    toast.add({
                        type: "success",
                        description: res.data?.message || "Category created successfully!",
                    });
                    resetForm();
                    setDialogeOpen(false);
                    if (onSuccess) onSuccess();
                } catch (fallbackErr) {
                    toast.add({
                        type: "error",
                        description: err.response?.data?.message || fallbackErr.response?.data?.message || "Failed to create category",
                    });
                }
            } finally {
                setLoading(false);
            }
        }
    };

    const resetForm = () => {
        setCategoryName("");
        setParentCategory("");
        setSelectedCategory(null);
        setDescription("");
        setStatus(true);
        if (setEditCategory) setEditCategory(null);
    };

    const handleDialogClose = (open) => {
        setDialogeOpen(open);
        if (!open) {
            resetForm();
        }
    };

    return (
        <Dialog open={dialogeOpen} onOpenChange={handleDialogClose}>
            <DialogContent className="max-w-3xl sm:max-w-3xl w-full p-6 bg-white rounded-2xl border border-slate-200 shadow-2xl">
                <DialogHeader className="space-y-1 pb-2">
                    <DialogTitle className="text-xl font-bold text-slate-900">
                        {editCategory ? "Edit Category" : "Add Category"}
                    </DialogTitle>
                    <DialogDescription className="text-sm text-slate-500">
                        {editCategory ? "Update category information and hierarchy." : "Create a new category and assign it to a parent category."}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-1">
                    {/* Left Form Section */}
                    <div className="md:col-span-7 space-y-4">
                        <form id="categoryForm" className='flex flex-col gap-5' onSubmit={handleFormSubmit}>
                            {/* Category Name */}
                            <div className="space-y-1.5">
                                <Label htmlFor="name" className="text-sm font-semibold text-slate-900 flex items-center">
                                    Category Name <span className="text-red-500 ml-1">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Enter category name"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    className="h-10 px-3.5 bg-white border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-lg text-sm text-slate-900 placeholder:text-slate-400"
                                />
                                <p className="text-xs text-slate-500">
                                    Category name must be unique.
                                </p>
                            </div>

                            {/* Parent Category Display */}
                            <div className="space-y-1.5">
                                <Label htmlFor="parent" className="text-sm font-semibold text-slate-900">
                                    Parent Category
                                </Label>
                                <div className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                                    <span className="font-medium text-slate-700">
                                        {SelectedCategory ? SelectedCategory.name : "None (Root Category)"}
                                    </span>
                                    {SelectedCategory && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSelectedCategory(null);
                                                setParentCategory("");
                                            }}
                                            className="p-1 hover:bg-slate-200 rounded text-slate-500 hover:text-slate-800 transition-colors"
                                            title="Clear Parent Selection"
                                        >
                                            <X size={14} />
                                        </button>
                                    )}
                                </div>
                                <p className="text-xs text-slate-500">
                                    Select a parent category from the tree on the right, or leave empty for a root category.
                                </p>
                            </div>

                            {/* Status */}
                            <div className="space-y-1.5">
                                <Label className="text-sm font-semibold text-slate-900">
                                    Status
                                </Label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setStatus(true)}
                                        className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg border text-sm font-medium transition-all cursor-pointer ${status === true
                                            ? "bg-emerald-50 border-emerald-300 text-emerald-700 shadow-2xs"
                                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                                            }`}
                                    >
                                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                        Active
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setStatus(false)}
                                        className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg border text-sm font-medium transition-all cursor-pointer ${status === false
                                            ? "bg-red-50 border-red-300 text-red-700 shadow-2xs"
                                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                                            }`}
                                    >
                                        <span className="w-2 h-2 rounded-full bg-red-400" />
                                        Inactive
                                    </button>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-1.5">
                                <Label htmlFor="description" className="text-sm font-semibold text-slate-900">
                                    Description <span className="text-slate-400 font-normal">(Optional)</span>
                                </Label>
                                <Textarea
                                    id="description"
                                    rows={3}
                                    placeholder="Enter category description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="px-3.5 py-2 bg-white border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 resize-none min-h-[90px]"
                                />
                                <p className="text-xs text-slate-500">
                                    Optional description for this category.
                                </p>
                            </div>
                        </form>
                    </div>

                    {/* Right Preview Section */}
                    <div className="md:col-span-5 flex flex-col">
                        <Label className="text-sm font-semibold text-slate-900 mb-1.5">
                            Category Tree
                        </Label>
                        <div className="bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-700 space-y-1.5 max-h-[310px] overflow-y-auto flex-1">
                            <CategoryTree
                                categories={categories}
                                SelectedCategory={SelectedCategory}
                                onSelect={handleSelectCategory}
                                showSearch={false}
                            />

                            {/* New Category Preview */}
                            <div className="mt-3 border border-dashed border-indigo-400 bg-indigo-50/60 rounded-lg p-2.5 flex items-center gap-2">
                                <Folder className="w-4 h-4 text-indigo-600 shrink-0" />
                                <span className="font-medium text-indigo-900 truncate">
                                    {categoryName.trim() || (editCategory ? editCategory.name : "New Category")}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dialog Footer Actions */}
                <div className="flex items-center justify-end gap-3 pt-5 mt-2 border-t border-slate-100">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleDialogClose(false)}
                        className="px-5 py-2 h-10 border-slate-300 text-slate-700 hover:bg-slate-50 font-medium rounded-lg cursor-pointer"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        form="categoryForm"
                        disabled={loading}
                        className="px-5 py-2 h-10 bg-[#563BE3] hover:bg-[#462ec4] text-white font-medium rounded-lg shadow-sm cursor-pointer disabled:opacity-50"
                    >
                        {loading ? (editCategory ? "Updating..." : "Adding...") : (editCategory ? "Update Category" : "Add Category")}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CategoryDiloge