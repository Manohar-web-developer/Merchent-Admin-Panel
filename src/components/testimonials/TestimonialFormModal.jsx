import React from "react";
import { Star, User, MessageSquareQuote, CheckCircle, Clock, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function TestimonialFormModal({ open, onOpenChange, initialData = null }) {
  const isEditMode = Boolean(initialData);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md sm:max-w-lg bg-white rounded-2xl border border-gray-200/80 shadow-2xl p-0 overflow-hidden">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#5A34FD] to-[#7B5CFF] p-6 text-white relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
              <MessageSquareQuote className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-white tracking-tight">
                {isEditMode ? "Edit Testimonial" : "Add New Testimonial"}
              </DialogTitle>
              <DialogDescription className="text-xs text-purple-100/90 mt-0.5">
                {isEditMode
                  ? "Update customer review details, rating, and moderation status."
                  : "Create a new testimonial entry to display on your store."}
              </DialogDescription>
            </div>
          </div>
        </div>

        {/* Form Body - Clean and balanced without Avatar and Product */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Customer Name */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-gray-700">
              Customer Name <span className="text-rose-500">*</span>
            </Label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                type="text"
                placeholder="e.g. Sarah Jenkins"
                defaultValue={initialData?.customerName || ""}
                className="pl-9 h-10 rounded-xl border-gray-200 bg-gray-50/50 text-xs focus:bg-white focus:border-[#5A34FD] focus-visible:ring-[#5A34FD]/20"
              />
            </div>
          </div>

          {/* Status & Rating Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Status Select */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-gray-700">
                Status <span className="text-rose-500">*</span>
              </Label>
              <select
                defaultValue={initialData?.status || "Active"}
                className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-gray-50/50 text-xs text-gray-800 focus:bg-white focus:border-[#5A34FD] focus:outline-none focus:ring-2 focus:ring-[#5A34FD]/20 transition-all cursor-pointer"
              >
                <option value="Active">Active (Published)</option>
                <option value="Pending">Pending (Moderation)</option>
                <option value="Rejected">Rejected (Hidden)</option>
              </select>
            </div>

            {/* Rating Stars Picker */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-gray-700">
                Rating <span className="text-rose-500">*</span>
              </Label>
              <div className="flex items-center gap-1 bg-gray-50/80 px-3 h-10 rounded-xl border border-gray-200/80 justify-between">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const currentRating = initialData?.rating || 5;
                    const isFilled = star <= currentRating;
                    return (
                      <button
                        key={star}
                        type="button"
                        className="p-0.5 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            isFilled
                              ? "fill-amber-400 text-amber-400"
                              : "fill-gray-200 text-gray-300"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
                <span className="text-[11px] font-semibold text-gray-600">
                  {initialData?.rating || 5}.0 / 5
                </span>
              </div>
            </div>
          </div>

          {/* Review Text */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-gray-700">
              Review Content <span className="text-rose-500">*</span>
            </Label>
            <Textarea
              rows={4}
              placeholder="Enter customer feedback or testimonial review..."
              defaultValue={initialData?.review || ""}
              className="rounded-xl border-gray-200 bg-gray-50/50 text-xs text-gray-900 focus:bg-white focus:border-[#5A34FD] focus-visible:ring-[#5A34FD]/20 resize-none"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50/50 flex items-center justify-end gap-2.5">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="h-9 px-4 rounded-xl border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => onOpenChange(false)}
            className="h-9 px-5 rounded-xl bg-[#5A34FD] hover:bg-[#4C2BD8] text-white text-xs font-semibold shadow-xs cursor-pointer transition-colors"
          >
            {isEditMode ? "Update Testimonial" : "Save Testimonial"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
