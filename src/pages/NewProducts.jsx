import React, { use, useEffect, useRef, useState } from "react";
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

function SortableImage({ img, index, onRemove }) {
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
        alt={img.file.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />

      {/* Primary */}
      {index === 0 && (
        <div className="absolute top-2 left-2 bg-[#5A34FD] text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-2xs">
          Primary
        </div>
      )}

      {/* Remove */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(img.id);
        }}
        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
export default function NewProducts() {
  const [currentHeading, setCurrentHeading] = useState("paragraph");
  const inputImageRef = useRef(null);
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({});
  const [categoryData, setCategoryData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [parentCategoryName, setParentCategoryName] = useState("");
  const [collectionData, setCollectionData] = useState([]);

  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file, index) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const obj = {
          id: crypto.randomUUID(),
          file: file,
          preview: event.target.result,
        };

        setImages((prev) => [...prev, obj]);
      };

      reader.readAsDataURL(file);
    });
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: true,
  });
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setImages((items) => {
      const oldIndex = items.findIndex(
        (item) => item.id === active.id
      );

      const newIndex = items.findIndex(
        (item) => item.id === over.id
      );

      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;

    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const obj = {
          id: crypto.randomUUID(),
          file,
          preview: event.target.result,
        };

        setImages((prev) => [...prev, obj]);
      };

      reader.readAsDataURL(file);
    });
  };


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


  const validFormhandle = (form) => {
    const newErrors = {};
    const name = form.name?.value.trim();
    if (!name || name.length < 3) {
      newErrors.name = "Product name must be at least 3 characters.";
    }
    const sku = form.sku?.value.trim();
    if (!sku || sku.length < 3) {
      newErrors.sku = "Product SKU must be at least 3 characters.";
    }
    const catVal = form.category?.value.trim() || category;
    if (!catVal || catVal.length < 3) {
      newErrors.category = "Product category must be at least 3 characters.";
    }
    const shortDescription = form.shortDescription?.value.trim();
    if (!shortDescription || shortDescription.length < 3) {
      newErrors.shortDescription = "Product short description must be at least 3 characters.";
    }

    const description = editor?.getText()?.trim();
    if (!description || description.length < 3) {
      newErrors.description = "Product description must be at least 3 characters.";
    }
    const regularPrice = Number(form.RegularPrice?.value);
    if (isNaN(regularPrice) || regularPrice <= 0) {
      newErrors.RegularPrice = "Regular price must be a positive number.";
    }

    if (!form.stockQuantity?.value || form.stockQuantity.value === "") {
      newErrors.stockQuantity = "Please enter stock quantity.";
    }

    if (!form.lowStockThreshold?.value || form.lowStockThreshold.value === "") {
      newErrors.lowStockThreshold = "Please enter low stock threshold.";
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0;
  }

  const removeError = (feild, val) => {
    let name = "";
    let value = "";

    if (typeof feild === "string") {
      name = feild;
      value = val !== undefined ? val : "";
    } else if (feild && feild.target) {
      name = feild.target.name;
      value = feild.target.value;
    }

    if (!name) return;

    if (value !== undefined && value !== null && value.toString().trim() !== "") {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [name]: `Please enter a valid ${name}.`
      }));
    }
  }

  const formSubmit = async (e) => {
    e.preventDefault();
    if (!validFormhandle(e.target)) return;

    const fd = new FormData(e.target);

    fd.append("description", editor?.getHTML() || "");

    images.forEach((img) => {
      fd.append("images", img.file);
    });

    console.log(Object.fromEntries(fd));

  };

  useEffect(() => {
    try {
      axios.post(`${import.meta.env.VITE_API_BASE_URL}products/Category-view`, {
        name: ""
      })
        .then((res) => {
          setCategoryData(res.data._data);
        })
        .catch((err) => {
          console.log(err);
        })

      axios.post(`${import.meta.env.VITE_API_BASE_URL}products/brand-view`, {
        name: ""
      })
        .then((res) => {
          setBrandData(res.data._data);
        })
        .catch((err) => {
          console.log(err);
        })
    } catch (error) {
      console.log(error);
    }

    axios.post(`${import.meta.env.VITE_API_BASE_URL}collections/view`, {
      name: ""
    })
      .then((res) => {
        setCollectionData(res.data._data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  console.log(categoryData);



  return (
    <div className="w-full min-h-full bg-[#FAFBFD] p-3.5 sm:p-6 md:p-8 space-y-6 max-w-7xl mx-auto pb-16">
      {/* ==================== 1. HEADER & BREADCRUMBS ==================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Breadcrumb className="mb-2">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    to="/dashboard"
                    className="text-gray-500 hover:text-gray-700 text-xs sm:text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    to="/products"
                    className="text-gray-500 hover:text-gray-700 text-xs sm:text-sm font-medium"
                  >
                    Products
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-gray-900 text-xs sm:text-sm font-semibold">
                  Add Product
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-center gap-3">
            <Link to="/products">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-lg border-gray-200 bg-white text-gray-700 hover:bg-gray-50 shadow-2xs cursor-pointer"
                title="Back to Products"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                Add Product
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Create a new product for your store
              </p>
            </div>
          </div>
        </div>

        {/* Top Header Action Buttons */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <Link to="/products" className="flex-1 sm:flex-initial">
            <Button
              type="button"
              variant="outline"
              className="w-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium px-4 py-2 rounded-lg text-sm cursor-pointer shadow-2xs"
            >
              Cancel
            </Button>
          </Link>
          <Button
            type="button"
            variant="outline"
            className="flex-1 sm:flex-initial bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium px-4 py-2 rounded-lg text-sm cursor-pointer shadow-2xs"
          >
            Save as Draft
          </Button>
          <Button
            type="submit"
            form="formSubmit"
            className="flex-1 sm:flex-initial bg-[#5A34FD] hover:bg-[#4a29e0] text-white font-medium px-5 py-2 rounded-lg text-sm cursor-pointer shadow-2xs transition-colors"
          >
            Save Product
          </Button>
        </div>
      </div>

      {/* Main Responsive Grid Layout: Left Column (7/12) & Right Column (5/12) */}
      <form action="" onSubmit={formSubmit} id="formSubmit">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ==================== LEFT COLUMN (8 Cols on XL / 7 Cols on LG) ==================== */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {/* ==================== 2. MAIN PRODUCT INFORMATION CARD ==================== */}
            <Card className="bg-white rounded-xl border border-gray-200/80 shadow-2xs p-6">
              <CardContent className="p-0 space-y-6">
                {/* Card Header Header */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#EEEDFF] text-[#5A34FD] flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">
                      Product Information
                    </h2>
                    <p className="text-xs text-gray-500">
                      Enter basic details about your product
                    </p>
                  </div>
                </div>

                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Product Name * */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      onChange={(e) => removeError(e)}
                      placeholder="e.g. Adrienne Bell Chair - Emerald Green"
                      name="name"
                      className={`h-10 rounded-lg border-gray-200 bg-white px-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-[#5A34FD] focus-visible:border-[#5A34FD] w-full ${errors.name ? "border-red-500" : "border-gray-200"}`}
                    />
                    {
                      errors.name && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.name}</p>
                    }
                  </div>

                  {/* SKU * */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                      SKU <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      onChange={(e) => removeError(e)}

                      placeholder="e.g. CHAIR-LTHR-001"
                      name="sku"
                      className={`h-10 rounded-lg border-gray-200 bg-white px-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-[#5A34FD] focus-visible:border-[#5A34FD] w-full ${errors.sku ? "border-red-500" : "border-gray-200"}`}
                    />
                    {
                      errors.sku && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.sku}</p>
                    }
                  </div>

                  {/* Sub Category */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                      Parent Category
                    </label>
                    <div className="h-10 rounded-lg border border-gray-200 bg-gray-50 px-3.5 text-sm text-gray-500 w-full flex items-center">
                      {parentCategoryName || "Select a category first"}
                    </div>
                  </div>

                  {/* Category * */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <input type="hidden" name="category" value={category} />
                    <Select
                      value={category}
                      onValueChange={(val) => {
                        setCategory(val);
                        removeError("category", val);

                        // Selected category ka poora object dhoondo
                        const selectedCat = categoryData.find((item) => item.name === val);
                        setParentCategoryName(selectedCat?.parent?.name || "No Parent");
                      }}
                    >
                      <SelectTrigger className={`h-10 rounded-lg border-gray-200 bg-white px-3.5 text-sm text-gray-900 focus:ring-1 focus:ring-[#5A34FD] w-full ${errors.category ? "border-red-500" : "border-gray-200"}`}>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryData?.map((item, index) => (
                          <SelectItem key={item._id} value={item.name}>{item.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {
                      errors.category && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.category}</p>
                    }
                  </div>



                  {/* Brand */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-900">
                      Brand
                    </label>
                    <Select name="brand">
                      <SelectTrigger className="h-10 rounded-lg border-gray-200 bg-white px-3.5 text-sm text-gray-900 focus:ring-1 focus:ring-[#5A34FD] w-full">
                        <SelectValue placeholder="Select Brand" />
                      </SelectTrigger>
                      <SelectContent>
                        {brandData?.map((item, index) => (
                          <SelectItem key={item._id} value={item.name}>{item.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Collection */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-900">
                      Collection
                    </label>
                    <Select name="collection">
                      <SelectTrigger className="h-10 rounded-lg border-gray-200 bg-white px-3.5 text-sm text-gray-900 focus:ring-1 focus:ring-[#5A34FD] w-full">
                        <SelectValue placeholder="Select Collection" />
                      </SelectTrigger>
                      <SelectContent>
                        {collectionData?.map((item, index) => (
                          <SelectItem key={item._id} value={item.name}>{item.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Short Description * */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                      Short Description <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      placeholder="Enter short summary of the product..."
                      name="shortDescription"
                      onChange={(e) => removeError(e)}
                      rows={3}
                      className={`min-h-[80px] rounded-lg bg-white p-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-[#5A34FD] focus-visible:border-[#5A34FD] resize-y w-full ${errors.shortDescription ? "border-red-500" : "border-gray-200"}`}
                    />

                    {
                      errors.shortDescription ? <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.shortDescription}</p> : <p className="text-xs text-gray-500">
                        A brief description displayed in product cards and search results.
                      </p>
                    }
                  </div>

                  {/* Description * (Rich Text Editor) */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                      Description
                    </label>
                    <div className={`border rounded-lg overflow-hidden bg-white ${errors.description ? "border-red-500" : "border-gray-200"}`}>
                      {/* Formatting Toolbar */}
                      <div className={`flex flex-wrap items-center gap-1.5 border-b p-2 bg-[#FAFBFD]"} ${errors.description ? "border-red-500" : "border-gray-200"}`}>
                        <Select
                          value={currentHeading}
                          onValueChange={(value) => {
                            if (value === "paragraph") {
                              editor?.chain().focus().setParagraph().run();
                            } else {
                              editor
                                ?.chain()
                                .focus()
                                .toggleHeading({
                                  level: Number(value.replace("h", "")),
                                })
                                .run();
                            }
                          }}
                        >
                          <SelectTrigger className="w-[130px] h-8 text-xs bg-white border-gray-200">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="paragraph">Paragraph</SelectItem>
                            <SelectItem value="h1">Heading 1</SelectItem>
                            <SelectItem value="h2">Heading 2</SelectItem>
                            <SelectItem value="h3">Heading 3</SelectItem>
                            <SelectItem value="h4">Heading 4</SelectItem>
                          </SelectContent>
                        </Select>

                        <div className="h-4 w-px bg-gray-200 mx-1" />

                        <button
                          type="button"
                          className={`p-1.5 rounded hover:bg-gray-200 transition-colors cursor-pointer ${editor?.isActive("bold") ? "bg-gray-200 text-gray-900" : "text-gray-600"
                            }`}
                          onClick={() => editor?.chain().focus().toggleBold().run()}
                          title="Bold"
                        >
                          <Bold className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          className={`p-1.5 rounded hover:bg-gray-200 transition-colors cursor-pointer ${editor?.isActive("italic") ? "bg-gray-200 text-gray-900" : "text-gray-600"
                            }`}
                          onClick={() => editor?.chain().focus().toggleItalic().run()}
                          title="Italic"
                        >
                          <Italic className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          className={`p-1.5 rounded hover:bg-gray-200 transition-colors cursor-pointer ${editor?.isActive("underline") ? "bg-gray-200 text-gray-900" : "text-gray-600"
                            }`}
                          onClick={() => editor?.chain().focus().toggleUnderline().run()}
                          title="Underline"
                        >
                          <Underline className="w-4 h-4" />
                        </button>

                        <div className="h-4 w-px bg-gray-200 mx-1" />

                        <button
                          type="button"
                          className={`p-1.5 rounded hover:bg-gray-200 transition-colors cursor-pointer ${editor?.isActive("bulletList") ? "bg-gray-200 text-gray-900" : "text-gray-600"
                            }`}
                          onClick={() => editor?.chain().focus().toggleBulletList().run()}
                          title="Bullet List"
                        >
                          <List className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          className={`p-1.5 rounded hover:bg-gray-200 transition-colors cursor-pointer ${editor?.isActive("orderedList") ? "bg-gray-200 text-gray-900" : "text-gray-600"
                            }`}
                          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                          title="Ordered List"
                        >
                          <ListOrdered className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Editor Content Box */}
                      <EditorContent
                        editor={editor}
                        name="description"
                        className={`w-full h-[160px] p-3.5 min-h-[160px] text-sm text-gray-800 outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror_p]:leading-relaxed ${errors.description ? "border-red-500" : "border-gray-200"}`}
                      />

                    </div>
                    {
                      errors.description ? <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.description}</p> : <p className="text-xs text-gray-500">
                        Enter the detailed description of the product.
                      </p>
                    }
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ==================== 4. PRICING & INVENTORY CARD ==================== */}
            <Card className="bg-white rounded-xl border border-gray-200/80 shadow-2xs p-6">
              <CardContent className="p-0 space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#EEEDFF] text-[#5A34FD] flex items-center justify-center shrink-0">
                    <IndianRupee className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">
                      Pricing & Inventory
                    </h2>
                    <p className="text-xs text-gray-500">
                      Manage pricing, discounts, stock and availability
                    </p>
                  </div>
                </div>

                {/* Grid of Pricing & Stock Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {/* Regular Price * */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                      Regular Price <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3 text-gray-500 text-sm font-semibold">
                        ₹
                      </span>
                      <Input
                        type="number"
                        placeholder="0.00"
                        name="RegularPrice"
                        onChange={(e) => removeError(e)}
                        className={`h-10 rounded-lg border-gray-200 bg-white pl-8 pr-3.5 text-sm text-gray-900 focus-visible:ring-1 focus-visible:ring-[#5A34FD] focus-visible:border-[#5A34FD] w-full ${errors.RegularPrice ? "border-red-500" : "border-gray-200"}`}
                      />

                    </div>
                    {
                      errors.RegularPrice ? <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.RegularPrice}</p> : <p className="text-xs text-gray-500">
                        Enter the base price of the product.
                      </p>
                    }
                  </div>

                  {/* Sale Price */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-900">
                      Sale Price
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3 text-gray-500 text-sm font-semibold">
                        ₹
                      </span>
                      <Input
                        type="number"
                        name="salePrice"
                        placeholder="0.00"
                        className="h-10 rounded-lg border-gray-200 bg-white pl-8 pr-3.5 text-sm text-gray-900 focus-visible:ring-1 focus-visible:ring-[#5A34FD] focus-visible:border-[#5A34FD] w-full"
                      />
                    </div>
                  </div>

                  {/* Discount (%) */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-900">
                      Discount (%)
                    </label>
                    <div className="relative flex items-center">
                      <Input
                        type="number"
                        placeholder="0"
                        name="discount"
                        className="h-10 rounded-lg border-gray-200 bg-white pl-3.5 pr-8 text-sm text-gray-900 focus-visible:ring-1 focus-visible:ring-[#5A34FD] focus-visible:border-[#5A34FD] w-full"
                      />
                      <span className="absolute right-3 text-gray-500 text-sm font-semibold">
                        %
                      </span>
                    </div>
                  </div>

                  {/* Stock Quantity * */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                      Stock Quantity <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="number"
                      placeholder="0"
                      name="stockQuantity"
                      onChange={(e) => removeError(e)}
                      className={`h-10 rounded-lg border bg-white px-3.5 text-sm text-gray-900 focus-visible:ring-1 focus-visible:ring-[#5A34FD] focus-visible:border-[#5A34FD] w-full ${errors.stockQuantity ? "border-red-500" : "border-gray-200"}`}
                    />
                    {
                      errors.stockQuantity ? <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.stockQuantity}</p> : <p className="text-xs text-gray-500">
                        Enter the number of items available in stock.
                      </p>
                    }
                  </div>


                  {/* Low Stock Threshold */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                      Low Stock Threshold <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="number"
                      placeholder="5"
                      name="lowStockThreshold"
                      onChange={(e) => removeError(e)}
                      className={`h-10 rounded-lg border-gray-200 bg-white px-3.5 text-sm text-gray-900 focus-visible:ring-1 focus-visible:ring-[#5A34FD] focus-visible:border-[#5A34FD] w-full ${errors.lowStockThreshold ? "border-red-500" : "border-gray-200"}`}
                    />
                    {
                      errors.lowStockThreshold && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.lowStockThreshold}</p>
                    }
                  </div>

                  {/* Availability * */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                      Availability
                    </label>
                    <Select name="availability" defaultValue="In Stock">
                      <SelectTrigger className="h-10 rounded-lg border-gray-200 bg-white px-3.5 text-sm text-gray-900 focus:ring-1 focus:ring-[#5A34FD] w-full">
                        <SelectValue placeholder="Select Availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="In Stock">In Stock</SelectItem>
                        <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ==================== 5. PRODUCT ATTRIBUTES CARD ==================== */}
            <Card className="bg-white rounded-xl border border-gray-200/80 shadow-2xs p-6">
              <CardContent className="p-0 space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#EEEDFF] text-[#5A34FD] flex items-center justify-center shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">
                      Product Attributes
                    </h2>
                    <p className="text-xs text-gray-500">
                      Specify materials, dimensions, weight, and specifications
                    </p>
                  </div>
                </div>

                {/* Attributes Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Material */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-900">
                      Material
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. Solid Teak Wood, Velvet Fabric"
                      name="material"
                      className="h-10 rounded-lg border-gray-200 bg-white px-3.5 text-sm text-gray-900 focus-visible:ring-1 focus-visible:ring-[#5A34FD] focus-visible:border-[#5A34FD] w-full"
                    />
                  </div>

                  {/* Color */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-900">
                      Color
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. Emerald Green / Gold Finish"
                      name="color"
                      className="h-10 rounded-lg border-gray-200 bg-white px-3.5 text-sm text-gray-900 focus-visible:ring-1 focus-visible:ring-[#5A34FD] focus-visible:border-[#5A34FD] w-full"
                    />
                  </div>

                  {/* Dimensions */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-900">
                      Dimensions
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. 75 x 80 x 105 cm"
                      name="dimensions"
                      className="h-10 rounded-lg border-gray-200 bg-white px-3.5 text-sm text-gray-900 focus-visible:ring-1 focus-visible:ring-[#5A34FD] focus-visible:border-[#5A34FD] w-full"
                    />
                  </div>

                  {/* Weight (kg) */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-900">
                      Weight (kg)
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. 18.5"
                      name="weight"
                      className="h-10 rounded-lg border-gray-200 bg-white px-3.5 text-sm text-gray-900 focus-visible:ring-1 focus-visible:ring-[#5A34FD] focus-visible:border-[#5A34FD] w-full"
                    />
                  </div>

                  {/* Warranty */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-sm font-semibold text-gray-900">
                      Warranty
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. 1 Year Manufacturer Warranty"
                      name="warranty"
                      className="h-10 rounded-lg border-gray-200 bg-white px-3.5 text-sm text-gray-900 focus-visible:ring-1 focus-visible:ring-[#5A34FD] focus-visible:border-[#5A34FD] w-full"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ==================== RIGHT COLUMN (4 Cols on XL / 5 Cols on LG) ==================== */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            {/* ==================== 3. PRODUCT IMAGES CARD ==================== */}
            <Card className="bg-white rounded-xl border border-gray-200/80 shadow-2xs p-6">
              <CardContent className="p-0 space-y-5">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#EEEDFF] text-[#5A34FD] flex items-center justify-center shrink-0">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">
                      Product Images
                    </h2>
                    <p className="text-xs text-gray-500">
                      Upload product photos and gallery images
                    </p>
                  </div>
                </div>

                {/* Drag & Drop Upload Zone */}
                <div
                  className="border-2 border-dashed cursor-pointer border-gray-200 hover:border-[#5A34FD]/50 transition-colors rounded-xl p-6 bg-[#FAFBFD] flex flex-col items-center justify-center text-center"
                  {...getRootProps()}
                  onClick={() => inputImageRef.current.click()}
                >
                  <div className="w-12 h-12 rounded-full bg-[#EEEDFF] text-[#5A34FD] flex items-center justify-center mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">Drag and Drop Images Here</p>
                  <p className="text-xs text-gray-400 my-1.5">or</p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => inputImageRef.current.click()}
                    className="bg-white border-gray-200 text-[#5A34FD] hover:bg-[#EEEDFF]/50 font-medium text-xs h-8 px-4 rounded-lg cursor-pointer"
                  >
                    Upload Images
                  </Button>
                  <p className="text-[11px] text-gray-400 mt-3">
                    Supports PNG, JPG, WEBP or JPEG (Max 10MB each)
                  </p>

                  <input {...getInputProps()} className="hidden" ref={inputImageRef} onChange={(e) => handleImageUpload(e)} />
                </div>

                {/* Gallery Thumbnails List */}
                <div className="space-y-2.5">
                  <p className="text-xs font-semibold text-gray-700">
                    Product Images
                  </p>

                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={images.map((img) => img.id)}
                      strategy={rectSortingStrategy}
                    >
                      <div className="grid grid-cols-2 gap-3">
                        {images.map((img, index) => (
                          <SortableImage
                            key={img.id}
                            img={img}
                            index={index}
                            onRemove={(id) => {
                              setImages((prev) =>
                                prev.filter((image) => image.id !== id)
                              );
                            }}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                </div>
              </CardContent>
            </Card>

            {/* ==================== 6. PRODUCT STATUS CARD ==================== */}
            <Card className="bg-white rounded-xl border border-gray-200/80 shadow-2xs p-6">
              <CardContent className="p-0 space-y-4">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#EEEDFF] text-[#5A34FD] flex items-center justify-center shrink-0">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">
                      Product Status
                    </h2>
                    <p className="text-xs text-gray-500">
                      Set initial visibility status
                    </p>
                  </div>
                </div>

                {/* Status Dropdown / Select Control */}
                <div className="space-y-2 pt-1">
                  <Select defaultValue="active" name="status">
                    <SelectTrigger className="h-10 rounded-lg border-gray-200 bg-white px-3.5 text-sm text-gray-900 focus:ring-1 focus:ring-[#5A34FD] w-full font-medium">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span>Active</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="draft">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          <span>Draft</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="archived">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-gray-400" />
                          <span>Archived</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <p className="text-xs text-gray-500 pt-0.5">
                    Active products are published and visible to buyers.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* ==================== 7. SUMMARY CARD ==================== */}
            <Card className="bg-white rounded-xl border border-gray-200/80 shadow-2xs p-6">
              <CardContent className="p-0 space-y-4">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#EEEDFF] text-[#5A34FD] flex items-center justify-center shrink-0">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-gray-900">
                      Product Summary
                    </h2>
                    <p className="text-xs text-gray-500">
                      Overview preview of configured product
                    </p>
                  </div>
                </div>

                {/* Summary Items List */}
                <div className="bg-[#FAFBFD] rounded-xl border border-gray-100 p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-medium">
                      Product Name:
                    </span>
                    <span className="font-semibold text-gray-900 truncate max-w-[170px]">
                      Adrienne Bell Armchair
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-medium">SKU:</span>
                    <span className="font-semibold text-gray-900">
                      LS-0476-GRN
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-medium">Category:</span>
                    <span className="font-semibold text-gray-900">
                      Sofa & Seating
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-medium">Price:</span>
                    <span className="font-bold text-[#5A34FD]">₹22,499.00</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-medium">Stock:</span>
                    <span className="font-semibold text-emerald-600">
                      45 units
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-200/60">
                    <span className="text-gray-500 font-medium">Status:</span>
                    <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold px-2 py-0.5 text-[11px] shadow-none">
                      Active
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ==================== 8. BOTTOM ACTIONS CARD (Right / Mobile Footer) ==================== */}
            <Card className="bg-white rounded-xl border border-gray-200/80 shadow-2xs p-4">
              <CardContent className="p-0 flex flex-col gap-2.5">
                <Button
                  type="submit"
                  className="w-full bg-[#5A34FD] hover:bg-[#4a29e0] text-white font-medium py-2.5 rounded-lg text-sm cursor-pointer shadow-2xs transition-colors"
                >
                  Save Product
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 font-medium text-xs py-2 rounded-lg cursor-pointer"
                  >
                    Save as Draft
                  </Button>
                  <Link to="/products">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full bg-white border-gray-200 text-gray-700 hover:bg-gray-50 font-medium text-xs py-2 rounded-lg cursor-pointer"
                    >
                      Cancel
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
