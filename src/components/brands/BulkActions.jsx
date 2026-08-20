import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, Trash2, RefreshCw } from "lucide-react";

export const BulkActions = ({
  selectedCount = 0,
  onDeleteSelected,
  onChangeStatusSelected,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        disabled={selectedCount === 0}
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-[#F0EEFF] text-[#5A34FD] border border-[#E0DCFF] px-3.5 py-1.5 sm:py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all duration-150 cursor-pointer shadow-2xs ${
          selectedCount === 0
            ? "opacity-60 cursor-not-allowed"
            : "hover:bg-[#E4E0FF] hover:border-[#D0C9FF] active:scale-[0.98]"
        }`}
      >
        <span>Bulk Actions</span>
        {isOpen ? (
          <ChevronUp className="w-3.5 h-3.5 stroke-[2.5]" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
        )}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1.5 w-48 bg-white rounded-xl border border-gray-200/90 shadow-xl p-1.5 z-30 space-y-1 animate-in fade-in-50 zoom-in-95 duration-100">
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              if (onDeleteSelected) onDeleteSelected();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
            <span>Delete Selected</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              if (onChangeStatusSelected) onChangeStatusSelected();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 text-gray-400" />
            <span>Change Status</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default BulkActions;
