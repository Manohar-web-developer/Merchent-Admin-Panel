import React from "react";
import { Star, User, MessageSquareQuote, UploadCloud, Image as ImageIcon, X, Plus } from "lucide-react";
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

  // Static dummy preview images for visual demonstration
  const sampleImages = initialData?.images?.length
    ? initialData.images
    : [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=200&auto=format&fit=crop&q=80",
      ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md sm:max-w-xl bg-white rounded-2xl border border-gray-200/80 shadow-2xl p-0 overflow-hidden">
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
                  ? "Update customer review details, attached photos, and status."
                  : "Create a new customer testimonial with optional review photos."}
              </DialogDescription>
            </div>
          </div>
        </div>

        {/* Form Body - Completely static UI presentation */}
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
              rows={3}
              placeholder="Enter customer feedback or testimonial review..."
              defaultValue={initialData?.review || ""}
              className="rounded-xl border-gray-200 bg-gray-50/50 text-xs text-gray-900 focus:bg-white focus:border-[#5A34FD] focus-visible:ring-[#5A34FD]/20 resize-none"
            />
          </div>

          {/* Review Images Upload & Preview UI */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-[#5A34FD]" />
                Review Images <span className="text-gray-400 font-normal">(Optional)</span>
              </Label>
              <span className="text-[11px] font-medium text-gray-400">
                Max 5 photos
              </span>
            </div>

            {/* Drag & Drop Upload Zone */}
            <div className="border-2 border-dashed border-gray-200 hover:border-[#5A34FD]/60 bg-gray-50/60 hover:bg-purple-50/30 transition-all rounded-xl p-4 text-center cursor-pointer group">
              <div className="w-9 h-9 rounded-full bg-purple-100/70 text-[#5A34FD] flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-gray-800">
                Click to upload <span className="font-normal text-gray-500">or drag and drop review photos</span>
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                PNG, JPG or WEBP (up to 5MB each)
              </p>
            </div>

            {/* Static Image Previews Section */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">
                Attached Photo Previews ({sampleImages.length})
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                {sampleImages.map((url, index) => (
                  <div
                    key={index}
                    className="relative w-16 h-16 rounded-xl border border-gray-200 bg-gray-100 overflow-hidden group shadow-2xs shrink-0"
                  >
                    <img
                      src={url}
                      alt={`Review preview ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-xs cursor-pointer hover:bg-rose-600 transition-colors"
                        title="Remove photo"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Add More Photos Placeholder Tile */}
                <button
                  type="button"
                  className="w-16 h-16 rounded-xl border-2 border-dashed border-gray-200 hover:border-[#5A34FD] text-gray-400 hover:text-[#5A34FD] bg-gray-50/50 hover:bg-purple-50/20 flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer shrink-0"
                  title="Add more photos"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span className="text-[9px] font-semibold">Add Photo</span>
                </button>
              </div>
            </div>
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
