import React from "react";
import { Star, ShieldCheck, Calendar, User, Mail, MessageSquareQuote, CheckCircle2, Clock, XCircle, Image as ImageIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function TestimonialDetailModal({ open, onOpenChange, testimonial }) {
  if (!testimonial) return null;

  const renderStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return (
          <Badge className="bg-[#E6F8EF] text-[#10B981] border border-[#A7F3D0] hover:bg-[#E6F8EF] px-2.5 py-0.5 rounded-full text-xs font-semibold inline-flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Active
          </Badge>
        );
      case "Pending":
        return (
          <Badge className="bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A] hover:bg-[#FEF3C7] px-2.5 py-0.5 rounded-full text-xs font-semibold inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            Pending
          </Badge>
        );
      case "Rejected":
        return (
          <Badge className="bg-[#FEEFEF] text-[#EF4444] border border-[#FCA5A5] hover:bg-[#FEEFEF] px-2.5 py-0.5 rounded-full text-xs font-semibold inline-flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5" />
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-white rounded-2xl border border-gray-200/80 shadow-2xl p-0 overflow-hidden sm:max-w-lg">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-white relative">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  {testimonial.customerName}
                  {testimonial.verifiedPurchase && (
                    <span className="inline-flex items-center text-[10px] font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" /> Verified
                    </span>
                  )}
                </DialogTitle>
                <DialogDescription className="text-xs text-gray-300 flex items-center gap-1.5 mt-0.5">
                  <Mail className="w-3 h-3 text-gray-400" />
                  {testimonial.customerEmail}
                </DialogDescription>
              </div>
            </div>
            <div>{renderStatusBadge(testimonial.status)}</div>
          </div>
        </div>

        {/* Details Content */}
        <div className="p-6 space-y-5">
          {/* Rating & Date Grid */}
          <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-100">
            <div className="space-y-0.5">
              <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">
                Rating
              </span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= testimonial.rating
                        ? "fill-amber-400 text-amber-400"
                        : "fill-gray-200 text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-xs font-bold text-gray-900 ml-1">
                  {testimonial.rating}.0
                </span>
              </div>
            </div>

            <div className="text-right space-y-0.5">
              <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">
                Submitted On
              </span>
              <div className="text-xs font-medium text-gray-700 inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                {testimonial.createdDate}
              </div>
            </div>
          </div>

          {/* Review Text */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
              Full Testimonial Review
            </span>
            <div className="relative p-4 rounded-xl bg-gray-50 border border-gray-200/80 text-xs text-gray-800 leading-relaxed font-normal italic">
              <MessageSquareQuote className="w-5 h-5 text-gray-300 absolute right-3 bottom-3" />
              "{testimonial.review}"
            </div>
          </div>

          {/* Attached Review Images Gallery */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-[#5A34FD]" />
              Attached Review Photos ({testimonial.images?.length || 0})
            </span>

            {testimonial.images?.length > 0 ? (
              <div className="flex flex-wrap items-center gap-2.5">
                {testimonial.images.map((imgUrl, index) => (
                  <div
                    key={index}
                    className="w-20 h-20 rounded-xl border border-gray-200 overflow-hidden shadow-2xs group relative bg-gray-100 cursor-pointer"
                  >
                    <img
                      src={imgUrl}
                      alt={`Review attachment ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs text-gray-400 italic">
                No images attached with this review.
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="h-9 px-5 rounded-xl text-xs font-semibold text-gray-700 cursor-pointer"
          >
            Close Preview
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
