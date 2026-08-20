import React from "react";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Brand",
  description = "Are you sure you want to delete this brand? This action cannot be undone.",
  count = 1,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl max-w-sm w-full overflow-hidden animate-in zoom-in-95 duration-150">
        <div className="p-6 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center shadow-2xs">
            <AlertTriangle className="w-6 h-6 stroke-[2.5]" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-base font-bold text-gray-900">
              {count > 1 ? `Delete ${count} Brands` : title}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              {description}
            </p>
          </div>

          <div className="pt-2 flex items-center justify-center gap-2.5">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-9.5 px-4 text-xs font-medium border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="h-9.5 px-4 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-xs"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
