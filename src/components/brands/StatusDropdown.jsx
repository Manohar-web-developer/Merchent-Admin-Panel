import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, CheckCircle2, XCircle } from "lucide-react";

export const StatusDropdown = ({
  disabled = false,
  onSelectStatus,
  buttonLabel = "Change Status",
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

  const handleSelect = (status) => {
    setIsOpen(false);
    if (onSelectStatus) {
      onSelectStatus(status);
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-white text-gray-700 border border-gray-200 hover:border-[#5A34FD]/40 px-3.5 py-1.5 sm:py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all duration-150 cursor-pointer shadow-2xs ${
          disabled
            ? "opacity-60 cursor-not-allowed"
            : "hover:bg-gray-50 active:scale-[0.98]"
        }`}
      >
        <span className="text-[#5A34FD]">{buttonLabel}</span>
        {isOpen ? (
          <ChevronUp className="w-3.5 h-3.5 text-[#5A34FD] stroke-[2.5]" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-[#5A34FD] stroke-[2.5]" />
        )}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1.5 w-44 bg-white rounded-xl border border-gray-200/90 shadow-xl p-1.5 z-30 space-y-1 animate-in fade-in-50 zoom-in-95 duration-100">
          <button
            type="button"
            onClick={() => handleSelect("Active")}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Active</span>
          </button>
          <button
            type="button"
            onClick={() => handleSelect("Inactive")}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
          >
            <XCircle className="w-4 h-4 text-rose-500" />
            <span>Inactive</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;
