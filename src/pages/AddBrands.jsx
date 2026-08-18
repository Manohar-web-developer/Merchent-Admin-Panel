import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  Image as ImageIcon,
  Upload,
  Sliders,
  ListOrdered,
} from "lucide-react";

export default function AddBrands() {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    website: "",
    status: "active",
    displayOrder: 0,
  });
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [error, setError] = useState({});

  const handleNameChange = (e) => {
    const name = e.target.value;
    const generatedSlug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    setFormData((prev) => ({
      ...prev,
      name,
      slug: generatedSlug,
    }));

    if (name.trim() === "") {
      setError((prev) => ({ ...prev, name: "Name is required" }));
    } else {
      setError((prev) => ({ ...prev, name: "" }));
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    let newerror = {};
    if (formData.name.trim() === "") {
      newerror.name = "Name is required";
    }
    setError(newerror);
    if (Object.keys(newerror).length > 0) return;

    console.log("Submitting Brand Data:", { ...formData, logo });
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-[#FAFBFD] p-6 md:p-8 space-y-6">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Breadcrumb className="mb-2">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/products/brands" className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                    Brands
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-gray-900 text-sm font-medium">
                  Add Brand
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Add Brand</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Create a new brand and add details
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link to="/products/brands">
            <Button
              type="button"
              variant="outline"
              className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium px-4 py-2 rounded-lg text-sm cursor-pointer shadow-2xs"
            >
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            className="bg-[#5A34FD] hover:bg-[#4a29e0] text-white font-medium px-5 py-2 rounded-lg text-sm cursor-pointer shadow-2xs transition-colors"
          >
            Save Brand
          </Button>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column - Brand Information */}
        <div className="lg:col-span-7">
          <Card className="bg-white rounded-xl border border-gray-200/80 shadow-2xs p-6">
            <CardContent className="p-0 space-y-6">
              {/* Card Header */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#EEEDFF] text-[#5A34FD] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Brand Information</h2>
                  <p className="text-xs text-gray-500">Add basic details about the brand</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-5">
                {/* Brand Name */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                    Brand Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name={"name"}
                    value={formData.name}
                    onChange={handleNameChange}
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                        handleSubmit(e);
                      }
                    }}
                    placeholder="Enter brand name"
                    className="h-10 rounded-lg border-gray-200 bg-white px-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-[#5A34FD] focus-visible:border-[#5A34FD]"
                  />
                  {
                    error?.name && (
                      <p className="text-xs text-red-500">{error.name}</p>
                    )
                  }
                </div>

                {/* Slug */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                    Slug
                  </label>
                  <Input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="brand-slug (optional)"
                    className="h-10 rounded-lg border-gray-200 bg-white px-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-[#5A34FD] focus-visible:border-[#5A34FD]"
                  />
                  <p className="text-xs text-gray-500 pt-0.5">
                    URL friendly unique identifier. Auto-generated from brand name.
                  </p>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-900">
                    Description
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter brand description (optional)"
                    rows={4}
                    className="min-h-[110px] rounded-lg border-gray-200 bg-white p-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-[#5A34FD] focus-visible:border-[#5A34FD] resize-y"
                  />
                  <p className="text-xs text-gray-500 pt-0.5">
                    Brief description about the brand. This will not be visible to customers.
                  </p>
                </div>

                {/* Website */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-900">
                    Website
                  </label>
                  <Input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://brandwebsite.com"
                    className="h-10 rounded-lg border-gray-200 bg-white px-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-[#5A34FD] focus-visible:border-[#5A34FD]"
                  />
                  <p className="text-xs text-gray-500 pt-0.5">
                    Official website of the brand (optional)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Brand Logo, Status, Display Order */}
        <div className="lg:col-span-5 space-y-6">
          {/* Brand Logo Card */}
          <Card className="bg-white rounded-xl border border-gray-200/80 shadow-2xs p-6">
            <CardContent className="p-0 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#EEEDFF] text-[#5A34FD] flex items-center justify-center shrink-0">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Brand Logo</h2>
                  <p className="text-xs text-gray-500">Upload brand logo</p>
                </div>
              </div>

              {/* Upload Dropzone */}
              <label className="border-2 border-dashed border-gray-200 rounded-xl p-8 bg-[#FAFBFD] flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50/80 transition-colors block">
                <input
                  type="file"
                  accept="image/*"
                  name="logo"
                  onChange={handleLogoChange}
                  className="hidden"
                />
                {logoPreview ? (
                  <div className="flex flex-col items-center gap-2">
                    <img
                      src={logoPreview}
                      alt="Brand Logo Preview"
                      className="w-[240px] h-[240px] object-contain rounded-lg border border-gray-200 bg-white p-2"
                    />
                    <span className="text-xs text-[#5A34FD] font-medium">Click to change image</span>
                  </div>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 mb-2">
                      <Upload className="w-8 h-8 text-gray-400 stroke-[1.75]" />
                    </div>
                    <p className="text-sm font-semibold text-gray-900">Upload Logo</p>
                    <p className="text-xs text-gray-400 mt-1 mb-4">PNG, JPG or WEBP (Max. 2MB)</p>
                    <span className="bg-[#EEEDFF] hover:bg-[#E2DFFF] text-[#5A34FD] font-semibold text-xs px-4 py-2 rounded-lg transition-colors border border-[#E0DCFF]">
                      Choose File
                    </span>
                  </>
                )}
              </label>
            </CardContent>
          </Card>

          {/* Status Card */}
          <Card className="bg-white rounded-xl border border-gray-200/80 shadow-2xs p-6">
            <CardContent className="p-0 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#EEEDFF] text-[#5A34FD] flex items-center justify-center shrink-0">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Status</h2>
                  <p className="text-xs text-gray-500">Set brand status</p>
                </div>
              </div>

              {/* Radio Options */}
              <div className="space-y-4 pt-1">
                {/* Active Option */}
                <div
                  className="flex items-start gap-3 cursor-pointer group"
                  onClick={() => setFormData((prev) => ({ ...prev, status: "active" }))}
                >
                  <div className="pt-0.5">
                    {formData.status === "active" ? (
                      <div className="w-4 h-4 rounded-full border-[5px] border-[#5A34FD] bg-white shrink-0 transition-all" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-gray-300 bg-white shrink-0 transition-all group-hover:border-gray-400" />
                    )}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-900 block leading-none">Active</span>
                    <span className="text-xs text-gray-500 mt-1 block">Brand will be visible to customers</span>
                  </div>
                </div>

                {/* Inactive Option */}
                <div
                  className="flex items-start gap-3 cursor-pointer group"
                  onClick={() => setFormData((prev) => ({ ...prev, status: "inactive" }))}
                >
                  <div className="pt-0.5">
                    {formData.status === "inactive" ? (
                      <div className="w-4 h-4 rounded-full border-[5px] border-[#5A34FD] bg-white shrink-0 transition-all" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-gray-300 bg-white shrink-0 transition-all group-hover:border-gray-400" />
                    )}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-900 block leading-none">Inactive</span>
                    <span className="text-xs text-gray-500 mt-1 block">Brand will be hidden from customers</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Display Order Card */}
          <Card className="bg-white rounded-xl border border-gray-200/80 shadow-2xs p-6">
            <CardContent className="p-0 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#EEEDFF] text-[#5A34FD] flex items-center justify-center shrink-0">
                  <ListOrdered className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Display Order</h2>
                  <p className="text-xs text-gray-500">Set display order for this brand</p>
                </div>
              </div>

              {/* Display Order Input */}
              <div className="space-y-1.5 pt-1">
                <Input
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) => setFormData({ ...formData, displayOrder: e.target.value })}
                  className="h-10 rounded-lg border-gray-200 bg-white px-3.5 text-sm text-gray-900 focus-visible:ring-1 focus-visible:ring-[#5A34FD] focus-visible:border-[#5A34FD]"
                />
                <p className="text-xs text-gray-500 pt-0.5">
                  Brands with lower order value will be displayed first.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}