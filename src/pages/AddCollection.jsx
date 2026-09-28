import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  X,
  Loader2,
  Save,
  Globe,
  ListOrdered,
  FileText,
  FolderTree,
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";

export default function AddCollection() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loadingDetails, setLoadingDetails] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form states matching backend Schema
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [status, setStatus] = useState(true);

  // Image upload states
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Validation state
  const [nameError, setNameError] = useState("");

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api/admin/";
  const defaultImageBase = import.meta.env.VITE_API_IMAGE_URL || "http://localhost:4000/uploads/collection/";

  // Helper to build auth headers if token exists
  const getAuthHeaders = () => {
    const token = Cookies.get("user_token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // Fetch details if in edit mode
  useEffect(() => {
    if (!id) return;

    setLoadingDetails(true);
    axios
      .post(
        `${apiBaseUrl}collections/details/${id}`,
        {},
        { headers: getAuthHeaders() }
      )
      .then((res) => {
        const details = res.data._data || res.data.data;
        if (details) {
          setName(details.name || "");
          setDescription(details.description || "");
          setWebsite(details.website || "");
          setDisplayOrder(details.displayOrder !== undefined ? details.displayOrder : 0);
          setStatus(Boolean(details.status));

          // Set existing image/logo preview
          const existingImg = details.image || details.logo;
          if (existingImg) {
            if (existingImg.startsWith("http://") || existingImg.startsWith("https://")) {
              setImagePreview(existingImg);
            } else {
              setImagePreview(`${defaultImageBase}${existingImg}`);
            }
          }
        }
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.message || "Failed to load collection details";
        toast.error(errorMsg);
      })
      .finally(() => {
        setLoadingDetails(false);
      });
  }, [id, apiBaseUrl, defaultImageBase]);

  // Handle file input change
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate image file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }

    setImageFile(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  // Remove previewed or selected image
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!name.trim()) {
      setNameError("Collection name is required");
      return;
    }
    setNameError("");

    setSubmitting(true);

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("description", description.trim());
    formData.append("website", website.trim());
    formData.append("displayOrder", displayOrder);
    formData.append("status", status);

    // Backend expects 'image' or 'logo' field
    if (imageFile instanceof File) {
      formData.append("image", imageFile);
      formData.append("logo", imageFile);
    }

    try {
      let res;
      if (id) {
        // UPDATE API: PUT collections/update/:id
        res = await axios.put(
          `${apiBaseUrl}collections/update/${id}`,
          formData,
          {
            headers: {
              ...getAuthHeaders(),
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        // CREATE API: POST collections/create
        res = await axios.post(
          `${apiBaseUrl}collections/create`,
          formData,
          {
            headers: {
              ...getAuthHeaders(),
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      if (res.data?.result || res.data?.message || res.status === 200 || res.status === 201) {
        toast.success(res.data.message || `Collection ${id ? "updated" : "created"} successfully`);
        navigate("/products/collection");
      }
    } catch (err) {
      const serverMsg = err.response?.data?.message || err.response?.data?.error || "Failed to save collection";
      toast.error(serverMsg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingDetails) {
    return (
      <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center gap-3 bg-[#FAFBFD] p-6">
        <Loader2 className="w-8 h-8 animate-spin text-[#5A34FD]" />
        <p className="text-sm text-gray-500 font-medium">Loading collection details...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-full bg-[#FAFBFD] p-3 sm:p-6 md:p-8 space-y-5 max-w-5xl mx-auto">
      {/* 1. Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/products" className="text-gray-500 hover:text-[#5A34FD]">
                    Products
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/products/collection" className="text-gray-500 hover:text-[#5A34FD]">
                    Collections
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold text-gray-900">
                  {id ? "Edit Collection" : "Add Collection"}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight mt-2">
            {id ? "Edit Collection" : "Create New Collection"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            {id
              ? "Update collection details and settings."
              : "Fill in the required information to create a new product collection."}
          </p>
        </div>

        <Link to="/products/collection">
          <Button variant="outline" className="gap-2 border-gray-200 text-gray-700 bg-white hover:bg-gray-50">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Collections</span>
          </Button>
        </Link>
      </div>

      {/* 2. Main Form Form Container */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Essential Details (2 cols wide) */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white rounded-xl border border-gray-200/80 shadow-xs">
              <CardContent className="p-4 sm:p-6 space-y-5">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                  <FolderTree className="w-5 h-5 text-[#5A34FD]" />
                  <h2 className="font-semibold text-gray-900 text-base">Collection Information</h2>
                </div>

                {/* Collection Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs font-semibold text-gray-700">
                    Collection Name <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="name"
                      type="text"
                      placeholder="e.g. Living Room, Summer Sale"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (e.target.value.trim()) setNameError("");
                      }}
                      className={`h-10 text-sm border-gray-200 focus-visible:ring-[#5A34FD] ${
                        nameError ? "border-red-500 focus-visible:ring-red-500" : ""
                      }`}
                    />
                  </div>
                  {nameError && (
                    <p className="text-xs text-red-500 font-medium mt-1">{nameError}</p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="description" className="text-xs font-semibold text-gray-700">
                      Description
                    </Label>
                    <span className="text-[11px] text-gray-400">Optional</span>
                  </div>
                  <Textarea
                    id="description"
                    rows={4}
                    placeholder="Brief description about this collection..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="text-sm border-gray-200 focus-visible:ring-[#5A34FD] resize-y min-h-[100px]"
                  />
                </div>

                {/* Website Link */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="website" className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-gray-400" />
                      Website URL
                    </Label>
                    <span className="text-[11px] text-gray-400">Optional</span>
                  </div>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://yourstore.com/collections/living-room"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="h-10 text-sm border-gray-200 focus-visible:ring-[#5A34FD]"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Settings & Media (1 col wide) */}
          <div className="space-y-6">
            {/* Status & Display Settings Card */}
            <Card className="bg-white rounded-xl border border-gray-200/80 shadow-xs">
              <CardContent className="p-4 sm:p-6 space-y-5">
                <h2 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
                  Settings
                </h2>

                {/* Status Switch */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="space-y-0.5">
                    <Label className="text-xs font-semibold text-gray-900 cursor-pointer">
                      Collection Status
                    </Label>
                    <p className="text-[11px] text-gray-500">
                      {status ? "Visible on store" : "Hidden from public"}
                    </p>
                  </div>
                  <Switch
                    checked={status}
                    onCheckedChange={(checked) => setStatus(checked)}
                  />
                </div>

                {/* Display Order */}
                <div className="space-y-1.5">
                  <Label htmlFor="displayOrder" className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                    <ListOrdered className="w-3.5 h-3.5 text-gray-400" />
                    Display Order
                  </Label>
                  <Input
                    id="displayOrder"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                    className="h-10 text-sm border-gray-200 focus-visible:ring-[#5A34FD]"
                  />
                  <p className="text-[11px] text-gray-400">
                    Lower numbers appear first in lists.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Collection Image Upload Card */}
            <Card className="bg-white rounded-xl border border-gray-200/80 shadow-xs">
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h2 className="font-semibold text-gray-900 text-base flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-[#5A34FD]" />
                    Collection Image
                  </h2>
                </div>

                {imagePreview ? (
                  <div className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-50 aspect-video flex items-center justify-center">
                    <img
                      src={imagePreview}
                      alt="Collection Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={handleRemoveImage}
                        className="h-8 px-3 text-xs gap-1 cursor-pointer bg-red-600 hover:bg-red-700"
                      >
                        <X className="w-3.5 h-3.5" /> Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <label
                    htmlFor="collection-image-upload"
                    className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 hover:border-[#5A34FD]/50 rounded-xl p-6 text-center cursor-pointer transition-colors bg-gray-50/50 hover:bg-[#F0EEFF]/30"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#F0EEFF] text-[#5A34FD] flex items-center justify-center mb-2">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-semibold text-gray-700">
                      Click to upload image
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      PNG, JPG, WEBP up to 5MB
                    </p>
                    <input
                      id="collection-image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Form Action Buttons Bar */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200/80">
          <Link to="/products/collection">
            <Button
              type="button"
              variant="outline"
              className="border-gray-200 text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
              disabled={submitting}
            >
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={submitting}
            className="bg-[#5A34FD] hover:bg-[#4C2BD8] text-white font-medium px-6 gap-2 cursor-pointer shadow-xs"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{id ? "Updating..." : "Creating..."}</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{id ? "Update Collection" : "Save Collection"}</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
