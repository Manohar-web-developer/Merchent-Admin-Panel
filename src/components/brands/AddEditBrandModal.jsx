import React, { useState, useEffect } from "react";
import { X, Tag, Package, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AddEditBrandModal = ({
  isOpen,
  onClose,
  onSave,
  brandToEdit = null,
}) => {
  const [name, setName] = useState("");
  const [productsCount, setProductsCount] = useState("10");
  const [status, setStatus] = useState("Active");
  const [error, setError] = useState("");

  useEffect(() => {
    if (brandToEdit) {
      setName(brandToEdit.name || "");
      // Extract numeric product count if string like "18 Products"
      const match = (brandToEdit.products || "").toString().match(/\d+/);
      setProductsCount(match ? match[0] : "0");
      setStatus(brandToEdit.status || "Active");
    } else {
      setName("");
      setProductsCount("0");
      setStatus("Active");
    }
    setError("");
  }, [brandToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Brand name is required.");
      return;
    }

    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    onSave({
      id: brandToEdit ? brandToEdit.id : Date.now(),
      name: name.trim(),
      products: `${productsCount} Products`,
      status,
      createdAt: brandToEdit ? brandToEdit.createdAt : formattedDate,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-[#FAFBFD]">
          <div>
            <h3 className="text-base font-bold text-gray-900">
              {brandToEdit ? "Edit Brand" : "Add New Brand"}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {brandToEdit
                ? "Update details for this brand"
                : "Create a new brand for your product inventory"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-gray-200 bg-white text-gray-400 hover:text-gray-600 hover:bg-gray-50 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700 block">
              Brand Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Tag className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="e.g. Nike, Puma, Apple..."
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError("");
                }}
                className="w-full h-10 pl-9 pr-3 text-xs font-medium rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5A34FD]/20 focus:border-[#5A34FD]"
                autoFocus
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700 block">
              Initial Product Count
            </label>
            <div className="relative">
              <Package className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                min="0"
                placeholder="0"
                value={productsCount}
                onChange={(e) => setProductsCount(e.target.value)}
                className="w-full h-10 pl-9 pr-3 text-xs font-medium rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5A34FD]/20 focus:border-[#5A34FD]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-700 block">
              Status
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStatus("Active")}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  status === "Active"
                    ? "bg-[#E6F8EF] border-[#10B981]/50 text-[#10B981] shadow-2xs"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                <span>Active</span>
              </button>
              <button
                type="button"
                onClick={() => setStatus("Inactive")}
                className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  status === "Inactive"
                    ? "bg-[#FEEFEF] border-[#EF4444]/50 text-[#EF4444] shadow-2xs"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#EF4444]"></span>
                <span>Inactive</span>
              </button>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-9 px-4 text-xs font-medium border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-9 px-5 text-xs font-semibold bg-[#5A34FD] hover:bg-[#4C2BD8] text-white rounded-xl shadow-xs"
            >
              {brandToEdit ? "Save Changes" : "Create Brand"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditBrandModal;
