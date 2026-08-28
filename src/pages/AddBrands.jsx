import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Image as ImageIcon, Upload, Sliders, ListOrdered, } from "lucide-react";
import axios from "axios";
import { toast } from "@/components/ui/toast";


export default function AddBrands() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [details, setDetails] = useState();
  const [status, setStatus] = useState();
  const [logo, setLogo] = useState(null);
  const baseurl = import.meta.env.VITE_API_IMAGE_URL;
  const [logoPreview, setLogoPreview] = useState(null);
  const [nameError, setNameError] = useState(false);

  useEffect(() => {
    if (id) {
      axios.post(`${import.meta.env.VITE_API_BASE_URL}brand/details/${id}`)
        .then((res) => {
          if (res.data.data) {
            setDetails(res.data.data);
            const preview = baseurl + res.data.data.logo
            setLogoPreview(preview)
            setLogo(res.data.data.logo)

            if (res.data.data.status === 1) {
              setStatus(true);
            } else {
              setStatus(false);
            }
          }
        }).catch((err) => {
          console.log(err.message);
        })
    }
  }, [id])
  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (!file) return;
    setLogo(file)
    const preview = URL.createObjectURL(file)
    setLogoPreview(preview)

  }

  const handleSubmit = (e) => {

    e.preventDefault()
    if (!e.target.name.value.trim()) {
      setNameError(true)
      return
    }
    const form = e.target
    const formData = new FormData()
    formData.append("name", form.name.value)
    formData.append("description", form.description.value)
    formData.append("website", form.website.value)
    formData.append("displayOrder", form.displayOrder.value)
    formData.append("status", status)

    if (logo instanceof File) {
      formData.append("logo", logo)
    }

    if (id) {
      axios.put(
        `${import.meta.env.VITE_API_BASE_URL}brand/update/${id}`,
        formData
      )
        .then((res) => {
          if (res.data.result || res.status === 201) {
            toast.add({
              type: "success",
              description: res.data.message,
            })
            navigate("/products/brands")
          }
        }).catch((err) => {
          console.log("CREATE BRAND ERROR:", err);

          toast.add({
            type: "error",
            description:
              err.response?.data?.message ||
              "Something went wrong",
          });
        });
    } else {
      axios.post(`${import.meta.env.VITE_API_BASE_URL}brand/create`, formData)
        .then((res) => {
          if (res.data.result || res.status === 201) {
            toast.add({
              type: "success",
              description: res.data.message,
            })
            navigate("/products/brands")
          }
        }).catch((err) => {
          toast.add({
            type: "error",
            title: "Error",
            description:
              err.response?.data?.message ||
              "Brand already exists or something went wrong",
          });
        });

    }

  }
  const removeError = (e) => {


    if (e.target.value !== "") {
      setNameError(false)
    } else {
      setNameError(true)
    }
  }
  return (
    <div className="w-full min-h-full bg-[#FAFBFD] p-3.5 sm:p-6 md:p-8 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
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
                  {id ? "Edit Brand" : "Add Brand"}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            {id ? "Edit Brand" : "Add Brand"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            {id ? "Update brand information" : "Create a new brand and add details"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <Link to="/products/brands" className="flex-1 sm:flex-initial">
            <Button
              type="button"
              variant="outline"
              className="w-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium px-4 py-2 rounded-lg text-sm cursor-pointer shadow-2xs"
            >
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            form="brandForm"
            className="flex-1 sm:flex-initial bg-[#5A34FD] hover:bg-[#4a29e0] text-white font-medium px-5 py-2 rounded-lg text-sm cursor-pointer shadow-2xs transition-colors"
          >
            {id ? "Update Brand" : "Save Brand"}
          </Button>
        </div>
      </div>

      {/* Main Grid Layout - 12 Columns */}
      <form onSubmit={handleSubmit} id="brandForm" >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column - 7 Columns: Brand Information & Display Order */}
          <div className="lg:col-span-7 space-y-6">
            {/* Card 1: Brand Information */}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* 1. Brand Name */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                      Brand Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Enter brand name"
                      onChange={(e) => removeError(e)}
                      defaultValue={details?.name}
                      className="h-10 rounded-lg border-gray-200 bg-white px-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-[#5A34FD] focus-visible:border-[#5A34FD] w-full"
                    />
                    {nameError && <p className="text-red-500 text-sm">Brand name is required</p>}
                  </div>

                  {/* 2. Description */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-sm font-semibold text-gray-900">
                      Description
                    </label>
                    <Textarea
                      placeholder="Enter brand description (optional)"
                      name="description"
                      defaultValue={details?.description}
                      rows={4}
                      className="min-h-[110px] rounded-lg border-gray-200 bg-white p-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-[#5A34FD] focus-visible:border-[#5A34FD] resize-y w-full"
                    />
                    <p className="text-xs text-gray-500 pt-0.5">
                      Brief description about the brand. This will not be visible to customers.
                    </p>
                  </div>

                  {/* 3. Website */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-sm font-semibold text-gray-900">
                      Website
                    </label>
                    <Input
                      type="url"
                      name="website"
                      defaultValue={details?.website}
                      placeholder="https://brandwebsite.com"
                      className="h-10 rounded-lg border-gray-200 bg-white px-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-[#5A34FD] focus-visible:border-[#5A34FD] w-full"
                    />
                    <p className="text-xs text-gray-500 pt-0.5">
                      Official website of the brand (optional)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Display Order */}
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

                {/* Static Number Input */}
                <div className="space-y-1.5 pt-1">
                  <Input
                    type="number"
                    name="displayOrder"
                    defaultValue={details?.displayOrder}
                    className="h-10 rounded-lg border-gray-200 bg-white px-3.5 text-sm text-gray-900 focus-visible:ring-1 focus-visible:ring-[#5A34FD] focus-visible:border-[#5A34FD] w-full"
                  />
                  <p className="text-xs text-gray-500 pt-0.5">
                    Brands with lower order value will be displayed first.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - 5 Columns: Brand Logo, Status */}
          <div className="lg:col-span-5 space-y-6">
            {/* Card 1: Brand Logo */}
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

                {/* Static Dashed Upload Area */}
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 bg-[#FAFBFD] flex flex-col items-center justify-center text-center">

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    id="brand-logo"
                    className="hidden"
                    name="logo"
                    onChange={handleLogoChange}
                  />

                  {logoPreview ? (
                    <div className="flex flex-col items-center gap-3">
                      <img
                        src={logoPreview}
                        alt="Brand Logo"
                        className="w-48 h-48 object-contain rounded-lg border bg-white p-2"
                      />

                      <label
                        htmlFor="brand-logo"
                        className="bg-[#EEEDFF] text-[#5A34FD] font-semibold text-xs px-4 py-2 rounded-lg border border-[#E0DCFF] cursor-pointer"
                      >
                        Change Image
                      </label>
                    </div>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 mb-2">
                        <Upload className="w-8 h-8 text-gray-400 stroke-[1.75]" />
                      </div>

                      <p className="text-sm font-semibold text-gray-900">
                        Upload Logo
                      </p>

                      <p className="text-xs text-gray-400 mt-1 mb-4">
                        PNG, JPG or WEBP (Max. 2MB)
                      </p>

                      <label
                        htmlFor="brand-logo"
                        className="bg-[#EEEDFF] text-[#5A34FD] font-semibold text-xs px-4 py-2 rounded-lg border border-[#E0DCFF] cursor-pointer"
                      >
                        Choose File
                      </label>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Status */}
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

                {/* Static Radio Options */}
                <div className="space-y-4 pt-1">
                  {/* Active */}
                  <div
                    className="flex items-start gap-3 cursor-pointer"
                    onClick={() => setStatus(true)}
                  >
                    <div className="pt-0.5">
                      {status === true ? (
                        <div className="w-4 h-4 rounded-full border-[5px] border-[#5A34FD] bg-white shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-gray-300 bg-white shrink-0" />
                      )}
                    </div>

                    <div>
                      <span className="text-sm font-semibold text-gray-900 block leading-none">
                        Active
                      </span>
                      <span className="text-xs text-gray-500 mt-1 block">
                        Brand will be visible to customers
                      </span>
                    </div>
                  </div>

                  {/* Inactive */}
                  <div
                    className="flex items-start gap-3 cursor-pointer"
                    onClick={() => setStatus(false)}
                  >
                    <div className="pt-0.5">
                      {status === false ? (
                        <div className="w-4 h-4 rounded-full border-[5px] border-[#5A34FD] bg-white shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-gray-300 bg-white shrink-0" />
                      )}
                    </div>

                    <div>
                      <span className="text-sm font-semibold text-gray-900 block leading-none">
                        Inactive
                      </span>
                      <span className="text-xs text-gray-500 mt-1 block">
                        Brand will be hidden from customers
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}