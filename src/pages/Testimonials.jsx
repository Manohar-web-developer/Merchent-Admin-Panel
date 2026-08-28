import React, { useState } from "react";
import { Plus, MessageSquareQuote } from "lucide-react";
import TestimonialSummaryCards from "@/components/testimonials/TestimonialSummaryCards";
import TestimonialTable from "@/components/testimonials/TestimonialTable";
import TestimonialFormModal from "@/components/testimonials/TestimonialFormModal";
import TestimonialDetailModal from "@/components/testimonials/TestimonialDetailModal";

export default function Testimonials() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailTestimonial, setDetailTestimonial] = useState(null);

  // Handlers purely for modal UI visibility (no API or CRUD logic)
  const handleOpenAddForm = () => {
    setEditingTestimonial(null);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (item) => {
    setEditingTestimonial(item);
    setIsFormOpen(true);
  };

  const handleOpenDetailModal = (item) => {
    setDetailTestimonial(item);
    setIsDetailOpen(true);
  };

  return (
    <div className="w-full min-h-full bg-[#FAFBFD] p-3 sm:p-6 md:p-8 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Testimonials
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Manage customer feedback, review ratings, and moderate product testimonials for ShopVista.
          </p>
        </div>

        {/* Add Testimonial Button */}
        <button
          type="button"
          onClick={handleOpenAddForm}
          className="bg-[#5A34FD] hover:bg-[#4C2BD8] text-white font-medium px-4 py-2 rounded-xl text-xs sm:text-sm inline-flex items-center justify-center gap-1.5 shadow-xs cursor-pointer shrink-0 transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* 2. Summary Statistics Section */}
      <TestimonialSummaryCards />

      {/* 3. Main Testimonial Listing Table */}
      <TestimonialTable
        onOpenEdit={handleOpenEditForm}
        onOpenDetail={handleOpenDetailModal}
      />

      {/* 4. Reusable Add / Edit Testimonial Form UI Modal */}
      <TestimonialFormModal
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        initialData={editingTestimonial}
      />

      {/* 5. View Testimonial Detail UI Modal */}
      <TestimonialDetailModal
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        testimonial={detailTestimonial}
      />
    </div>
  );
}