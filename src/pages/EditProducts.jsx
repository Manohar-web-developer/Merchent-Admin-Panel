import React, { useEffect, useRef, useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  ArrowLeft,
  Upload,
  X,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  FileText,
  IndianRupee,
  Sliders,
  Sparkles,
  Package,
  Layers,
  CheckCircle2,
  Image as ImageIcon,
  Eye,
  Percent,
  Loader2,
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { toast } from "sonner";

function SortableImage({ img, index, onRemove, isExisting }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: img.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="group relative rounded-lg border border-gray-200 bg-gray-50 overflow-hidden aspect-square cursor-grab active:cursor-grabbing"
    >
      <img
        src={img.preview}
        alt={img.name || "Product image"}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />

      {index === 0 && (
        <div className="absolute top-2 left-2 bg-[#5A34FD] text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-2xs">
          Primary
        </div>
      )}

      {isExisting && (
        <div className="absolute bottom-2 left-2 bg-gray-900/80 text-white text-[9px] font-medium px-1.5 py-0.5 rounded">
          Saved
        </div>
      )}

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(img.id, isExisting);
        }}
        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export default function EditProducts() {
  const { id, handle } = useParams();
  const productId = id || handle;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentHeading, setCurrentHeading] = useState("paragraph");

  // Master Data
  const [categoryData, setCategoryData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [materialData, setMaterialData] = useState([]);

  // Form State
  const [productDetail, setProductDetail] = useState(null);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [material, setMaterial] = useState("");
  const [status, setStatus] = useState("Active");
  const [availability, setAvailability] = useState("In Stock");
  const [errors, setErrors] = useState({});

  // Image states
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    onUpdate: ({ editor }) => {
      const text = editor.getText().trim();
      removeError("description", text);
    },
    onSelectionUpdate: ({ editor }) => {
      for (let i = 1; i <= 6; i++) {
        if (editor.isActive("heading", { level: i })) {
          setCurrentHeading(`h${i}`);
          return;
        }
      }
      setCurrentHeading("paragraph");
    },
  });

  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const obj = {
          id: crypto.randomUUID(),
          file: file,
          preview: event.target.result,
        };
        setNewImages((prev) => [...prev, obj]);
      };
      reader.readAsDataURL(file);
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const formatImageUrl = (filename) => {
    if (!filename) return "";
    if (typeof filename === "string" && filename.startsWith("http")) return filename;
    if (filename.startsWith("uploads/")) return `http://localhost:4000/${filename}`;
    return `http://localhost:4000/uploads/products/${filename}`;
  };

  // Fetch Master Data & Product Details
  useEffect(() => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api/admin/";

    const fetchMasterData = async () => {
      try {
        const [catRes, brandRes, matRes] = await Promise.all([
          axios.post(`${baseUrl}products/Category-view`, { name: "" }).catch(() => null),
          axios.post(`${baseUrl}products/brand-view`, { name: "" }).catch(() => null),
          axios.post(`${baseUrl}material/view`, { limit: 100 }).catch(() => null),
        ]);

        if (catRes?.data?._data) setCategoryData(catRes.data._data);
        if (brandRes?.data?._data) setBrandData(brandRes.data._data);
        if (matRes?.data?.data || matRes?.data?._data) {
          setMaterialData(matRes.data.data || matRes.data._data || []);
        }
      } catch (err) {
        console.error("Error fetching master data:", err);
      }
    };

    const fetchProductDetails = async () => {
      if (!productId) return;
      setLoading(true);
      try {
        const response = await axios.post(`${baseUrl}products/details/${productId}`);
        const data = response.data._data || response.data.data || response.data.result;

        if (data) {
          setProductDetail(data);

          // Populating Category / Brand / Material
          const catId = typeof data.category === "object" && data.category !== null ? data.category._id : (data.category || "");
          const brandId = typeof data.brand === "object" && data.brand !== null ? data.brand._id : (data.brand || "");
          const matId = typeof data.material === "object" && data.material !== null ? data.material._id : (data.material || "");

          setCategory(catId);
          setBrand(brandId);
          setMaterial(matId);
          setStatus(data.status || "Active");
          setAvailability(data.availability || "In Stock");

          // Description in editor
          if (editor && data.description) {
            editor.commands.setContent(data.description);
          }

          // Existing Images
          if (Array.isArray(data.images)) {
            const formatted = data.images.map((img) => ({
              id: img,
              filename: img,
              preview: formatImageUrl(img),
            }));
            setExistingImages(formatted);
          }
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        toast.error(error.response?.data?.message || "Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchMasterData();
    fetchProductDetails();
  }, [productId]);

  // Set editor content once editor is ready and productDetail loaded
  useEffect(() => {
    if (editor && productDetail?.description) {
      editor.commands.setContent(productDetail.description);
    }
  }, [editor, productDetail]);

  const removeError = (field, val) => {
    let name = "";
    let value = "";

    if (typeof field === "string") {
      name = field;
      value = val !== undefined ? val : "";
    } else if (field && field.target) {
      name = field.target.name;
      value = field.target.value;
    }

    if (!name) return;

    if (value !== undefined && value !== null && value.toString().trim() !== "") {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = (form) => {
    const newErrors = {};
    const name = form.name?.value.trim();
    if (!name || name.length < 3) {
      newErrors.name = "Product name must be at least 3 characters.";
    }

    const sku = form.sku?.value.trim();
    if (!sku || sku.length < 2) {
      newErrors.sku = "Product SKU is required.";
    }

    const catVal = category || form.category?.value;
    if (!catVal) {
      newErrors.category = "Product category is required.";
    }

    const regularPrice = Number(form.RegularPrice?.value);
    if (isNaN(regularPrice) || regularPrice <= 0) {
      newErrors.RegularPrice = "Regular price must be a positive number.";
    }

    if (!form.stockQuantity?.value || form.stockQuantity.value === "") {
      newErrors.stockQuantity = "Please enter stock quantity.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRemoveImage = (imgId, isExisting) => {
    if (isExisting) {
      setExistingImages((prev) => prev.filter((item) => item.id !== imgId));
    } else {
      setNewImages((prev) => prev.filter((item) => item.id !== imgId));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(e.target)) {
      toast.error("Please fix the validation errors before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api/admin/";
      const fd = new FormData(e.target);

      // Append description from editor
      fd.set("description", editor?.getHTML() || "");
      fd.set("category", category);
      if (brand) fd.set("brand", brand);
      if (material) fd.set("material", material);
      fd.set("status", status);
      fd.set("availability", availability);

      // Retain existing image filenames
      const remainingExistingFilenames = existingImages.map(img => img.filename);
      fd.append("existingImages", JSON.stringify(remainingExistingFilenames));

      // Append new image files
      newImages.forEach((img) => {
        if (img.file) {
          fd.append("images", img.file);
        }
      });

      const response = await axios.put(`${baseUrl}products/update/${productId}`, fd);

      toast.success(response.data?.message || "Product updated successfully!");

      navigate("/products");
    } catch (error) {
      console.error("Product Update Error:", error);
      toast.error(error.response?.data?.message || "Failed to update product.");
    } finally {
      setSubmitting(false);
    }
  };

  const allImages = [
    ...existingImages.map((img) => ({ ...img, isExisting: true })),
    ...newImages.map((img) => ({ ...img, isExisting: false })),
  ];

  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="flex items-center gap-2 text-gray-500 font-medium">
          <Loader2 className="h-6 w-6 animate-spin text-[#5A34FD]" />
          <span>Loading product details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-full bg-[#FAFBFD] p-3.5 sm:p-6 md:p-8 space-y-6 max-w-7xl mx-auto pb-16">
      {/* ==================== 1. HEADER & BREADCRUMBS ==================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <Link
              to="/products"
              className="p-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              Edit Product
            </h1>
            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 border-none font-medium">
              ID: {productId}
            </Badge>
          </div>
          <Breadcrumb className="mt-2">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/products">Products</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Edit Product</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/products">
            <Button variant="outline" type="button" className="border-gray-300 text-gray-700 cursor-pointer">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            form="edit-product-form"
            disabled={submitting}
            className="bg-[#5A34FD] hover:bg-[#4a2ae0] text-white shadow-sm font-medium px-6 cursor-pointer"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <form id="edit-product-form" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ==================== LEFT COLUMN (Main Info) ==================== */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="border border-gray-200 shadow-2xs rounded-xl bg-white overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#5A34FD]" />
                <h2 className="font-semibold text-gray-800">Basic Information</h2>
              </div>
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Title <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="name"
                    defaultValue={productDetail?.name || ""}
                    onChange={(e) => removeError(e)}
                    placeholder="e.g. Modern Parawood Dining Table"
                    className="w-full"
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SKU <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="sku"
                      defaultValue={productDetail?.sku || ""}
                      onChange={(e) => removeError(e)}
                      placeholder="e.g. LS-1080"
                    />
                    {errors.sku && <p className="text-xs text-red-500 mt-1">{errors.sku}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Color / Variant
                    </label>
                    <Input
                      name="color"
                      defaultValue={productDetail?.color || ""}
                      placeholder="e.g. Dark Walnut, Beige"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Short Description <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    name="shortDescription"
                    defaultValue={productDetail?.shortDescription || ""}
                    onChange={(e) => removeError(e)}
                    rows={2}
                    placeholder="Brief summary of the product..."
                  />
                  {errors.shortDescription && (
                    <p className="text-xs text-red-500 mt-1">{errors.shortDescription}</p>
                  )}
                </div>

                {/* Rich Text Editor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Detailed Description <span className="text-red-500">*</span>
                  </label>
                  <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                    <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border-b border-gray-200 text-gray-600">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor?.chain().focus().toggleBold().run()}
                        className={editor?.isActive("bold") ? "bg-gray-200" : ""}
                      >
                        <Bold className="w-4 h-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor?.chain().focus().toggleItalic().run()}
                        className={editor?.isActive("italic") ? "bg-gray-200" : ""}
                      >
                        <Italic className="w-4 h-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor?.chain().focus().toggleBulletList().run()}
                        className={editor?.isActive("bulletList") ? "bg-gray-200" : ""}
                      >
                        <List className="w-4 h-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                        className={editor?.isActive("orderedList") ? "bg-gray-200" : ""}
                      >
                        <ListOrdered className="w-4 h-4" />
                      </Button>
                    </div>
                    <EditorContent
                      editor={editor}
                      className="p-4 min-h-[160px] prose prose-sm max-w-none focus:outline-none"
                    />
                  </div>
                  {errors.description && (
                    <p className="text-xs text-red-500 mt-1">{errors.description}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Pricing & Inventory */}
            <Card className="border border-gray-200 shadow-2xs rounded-xl bg-white overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-[#5A34FD]" />
                <h2 className="font-semibold text-gray-800">Pricing & Inventory</h2>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Regular Price (₹) <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="number"
                      name="RegularPrice"
                      defaultValue={productDetail?.RegularPrice || ""}
                      onChange={(e) => removeError(e)}
                      placeholder="0.00"
                    />
                    {errors.RegularPrice && (
                      <p className="text-xs text-red-500 mt-1">{errors.RegularPrice}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sale Price (₹)
                    </label>
                    <Input
                      type="number"
                      name="salePrice"
                      defaultValue={productDetail?.salePrice || 0}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock Quantity <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="number"
                      name="stockQuantity"
                      defaultValue={productDetail?.stockQuantity ?? 10}
                      onChange={(e) => removeError(e)}
                      placeholder="10"
                    />
                    {errors.stockQuantity && (
                      <p className="text-xs text-red-500 mt-1">{errors.stockQuantity}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Low Stock Threshold
                    </label>
                    <Input
                      type="number"
                      name="lowStockThreshold"
                      defaultValue={productDetail?.lowStockThreshold ?? 2}
                      placeholder="2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Availability
                  </label>
                  <Select value={availability} onValueChange={setAvailability}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="In Stock">In Stock</SelectItem>
                      <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Product Media / Images */}
            <Card className="border border-gray-200 shadow-2xs rounded-xl bg-white overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#5A34FD]" />
                  <h2 className="font-semibold text-gray-800">Product Media</h2>
                </div>
                <Badge variant="outline" className="text-xs">
                  {allImages.length} Image(s)
                </Badge>
              </div>
              <CardContent className="p-6 space-y-4">
                {/* Dropzone */}
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                    isDragActive
                      ? "border-[#5A34FD] bg-purple-50/50"
                      : "border-gray-300 hover:border-[#5A34FD] bg-gray-50/50"
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-purple-100 text-[#5A34FD] flex items-center justify-center">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">
                      Drag & drop new product images, or{" "}
                      <span className="text-[#5A34FD] underline">browse</span>
                    </p>
                    <p className="text-xs text-gray-500">Supports PNG, JPG, WEBP</p>
                  </div>
                </div>

                {/* Previews */}
                {allImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                    {allImages.map((img, idx) => (
                      <SortableImage
                        key={img.id}
                        img={img}
                        index={idx}
                        isExisting={img.isExisting}
                        onRemove={handleRemoveImage}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* ==================== RIGHT COLUMN (Organization & Specifications) ==================== */}
          <div className="space-y-6">
            {/* Status & Visibility */}
            <Card className="border border-gray-200 shadow-2xs rounded-xl bg-white overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#5A34FD]" />
                <h2 className="font-semibold text-gray-800">Status & Publishing</h2>
              </div>
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Category & Brand Master Data */}
            <Card className="border border-gray-200 shadow-2xs rounded-xl bg-white overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#5A34FD]" />
                <h2 className="font-semibold text-gray-800">Organization</h2>
              </div>
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <Select value={category} onValueChange={(val) => { setCategory(val); removeError("category", val); }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryData.map((cat) => (
                        <SelectItem key={cat._id} value={cat._id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-xs text-red-500 mt-1">{errors.category}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand
                  </label>
                  <Select value={brand} onValueChange={setBrand}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {brandData.map((b) => (
                        <SelectItem key={b._id} value={b._id}>
                          {b.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Material
                  </label>
                  <Select value={material} onValueChange={setMaterial}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Material" />
                    </SelectTrigger>
                    <SelectContent>
                      {materialData.map((m) => (
                        <SelectItem key={m._id} value={m._id}>
                          {m.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card className="border border-gray-200 shadow-2xs rounded-xl bg-white overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#5A34FD]" />
                <h2 className="font-semibold text-gray-800">Specifications</h2>
              </div>
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dimensions
                  </label>
                  <Input
                    name="dimensions"
                    defaultValue={productDetail?.dimensions || ""}
                    placeholder="e.g. 180cm x 90cm x 75cm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weight
                  </label>
                  <Input
                    name="weight"
                    defaultValue={productDetail?.weight || ""}
                    placeholder="e.g. 45 kg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Warranty
                  </label>
                  <Input
                    name="warranty"
                    defaultValue={productDetail?.warranty || ""}
                    placeholder="e.g. 1 Year Manufacturer Warranty"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}