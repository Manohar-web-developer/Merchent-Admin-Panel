import React from "react";
import { MessageSquareQuote, CheckCircle2, Clock, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { summaryStats } from "@/data/testimonialsData";

export default function TestimonialSummaryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
      {/* Total Testimonials Card */}
      <Card className="bg-white rounded-xl border border-gray-200/80 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.03)] p-3.5 sm:p-5">
        <CardContent className="p-0 flex items-center justify-between">
          <div className="space-y-0.5 sm:space-y-1">
            <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Total
            </p>
            <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              {summaryStats.total}
            </h3>
            <p className="text-[10px] sm:text-xs text-gray-400 font-normal">
              All customer reviews
            </p>
          </div>
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#F0EEFF] text-[#5A34FD] flex items-center justify-center shrink-0 shadow-2xs">
            <MessageSquareQuote className="w-4 h-4 sm:w-6 sm:h-6" />
          </div>
        </CardContent>
      </Card>

      {/* Active / Approved Testimonials Card */}
      <Card className="bg-white rounded-xl border border-gray-200/80 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.03)] p-3.5 sm:p-5">
        <CardContent className="p-0 flex items-center justify-between">
          <div className="space-y-0.5 sm:space-y-1">
            <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Active
            </p>
            <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              {summaryStats.active}
            </h3>
            <p className="text-[10px] sm:text-xs text-gray-400 font-normal">
              Approved & published
            </p>
          </div>
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#E6F8EF] text-[#10B981] flex items-center justify-center shrink-0 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 sm:w-6 sm:h-6" />
          </div>
        </CardContent>
      </Card>

      {/* Pending Moderation Card */}
      <Card className="bg-white rounded-xl border border-gray-200/80 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.03)] p-3.5 sm:p-5">
        <CardContent className="p-0 flex items-center justify-between">
          <div className="space-y-0.5 sm:space-y-1">
            <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Pending
            </p>
            <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              {summaryStats.pending}
            </h3>
            <p className="text-[10px] sm:text-xs text-gray-400 font-normal">
              Awaiting review
            </p>
          </div>
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0 shadow-2xs">
            <Clock className="w-4 h-4 sm:w-6 sm:h-6" />
          </div>
        </CardContent>
      </Card>

      {/* Rejected / Hidden Card */}
      <Card className="bg-white rounded-xl border border-gray-200/80 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.03)] p-3.5 sm:p-5">
        <CardContent className="p-0 flex items-center justify-between">
          <div className="space-y-0.5 sm:space-y-1">
            <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Rejected
            </p>
            <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              {summaryStats.rejected}
            </h3>
            <p className="text-[10px] sm:text-xs text-gray-400 font-normal">
              Flagged or hidden
            </p>
          </div>
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#FEEFEF] text-[#EF4444] flex items-center justify-center shrink-0 shadow-2xs">
            <XCircle className="w-4 h-4 sm:w-6 sm:h-6" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
