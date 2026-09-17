import React, { useState, useRef, useEffect } from "react";
import {
    Home,
    Image as ImageIcon,
    Link as LinkIcon,
    Plus,
    Pencil,
    Eye,
    Trash2,
    GripVertical,
    X,
    UploadCloud,
    Check,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/toast";
import axios from "axios";
import { Toast } from "@base-ui/react";

export default function BannerSlider() {
    const [banners, setBanners] = useState([])
    // Form inputs state
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [displayOrder, setDisplayOrder] = useState(0);
    const [BannerStatus, setBannerStatus] = useState(true);
    // Desktop upload state
    const desktopBannerRef = useRef(null);
    const [desktopFile, setDesktopFile] = useState(null);
    const [desktopPreviewUrl, setDesktopPreviewUrl] = useState(null);
    const [desktopDragActive, setDesktopDragActive] = useState(false);
    // Mobile upload state
    const mobileBannerRef = useRef(null);
    const [mobileFile, setMobileFile] = useState(null);
    const [mobilePreviewUrl, setMobilePreviewUrl] = useState(null);
    const [mobileDragActive, setMobileDragActive] = useState(false);
    // Edit and View state
    const [editingBannerId, setEditingBannerId] = useState(null);
    const [viewBanner, setViewBanner] = useState(null);
    const [isViewOpen, setIsViewOpen] = useState(false);
    // Image Selection Handler
    const handleDesktopFileSelect = (file) => {
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            toast.add({
                title: "Invalid File Type",
                description: "Please select a valid image file (JPG, PNG, WebP).",
                type: "error",
            });
            return;
        }
        setDesktopFile(file);
        const objectUrl = URL.createObjectURL(file);
        setDesktopPreviewUrl(objectUrl);
    };
    const handleMobileFileSelect = (file) => {
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            toast.add({
                title: "Invalid File Type",
                description: "Please select a valid image file (JPG, PNG, WebP).",
                type: "error",
            });
            return;
        }
        setMobileFile(file);
        const objectUrl = URL.createObjectURL(file);
        setMobilePreviewUrl(objectUrl);
    };
    // Remove preview handlers
    const handleRemoveDesktop = (e) => {
        e.stopPropagation();
        setDesktopFile(null);
        setDesktopPreviewUrl(null);
        if (desktopBannerRef.current) desktopBannerRef.current.value = "";
    };
    const handleRemoveMobile = (e) => {
        e.stopPropagation();
        setMobileFile(null);
        setMobilePreviewUrl(null);
        if (mobileBannerRef.current) mobileBannerRef.current.value = "";
    };

    // Drag & Drop Handlers - Desktop
    const handleDragOverDesktop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDesktopDragActive(true);
    };
    const handleDragLeaveDesktop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDesktopDragActive(false);
    };
    const handleDropDesktop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDesktopDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleDesktopFileSelect(e.dataTransfer.files[0]);
        }
    };
    // Drag & Drop Handlers - Mobile
    const handleDragOverMobile = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setMobileDragActive(true);
    };
    const handleDragLeaveMobile = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setMobileDragActive(false);
    };
    const handleDropMobile = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setMobileDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleMobileFileSelect(e.dataTransfer.files[0]);
        }
    };
    // Reset form
    const resetForm = () => {
        setTitle("");
        setLink("");
        setDisplayOrder(0);
        setBannerStatus(true);
        setDesktopFile(null);
        setDesktopPreviewUrl(null);
        setMobileFile(null);
        setMobilePreviewUrl(null);
        setEditingBannerId(null);
        if (desktopBannerRef.current) desktopBannerRef.current.value = "";
        if (mobileBannerRef.current) mobileBannerRef.current.value = "";
    };
    // Fatch Products
  
    const fatchProducts = async () => {
        try {
            const result = await axios.post(`${import.meta.env.VITE_API_BASE_URL}banners/view`)
            const data = await result.data._data;
            const newBanners = data.map((banner) => ({
                id: banner._id,
                title: banner.title,
                link: banner.link,
                displayOrder: banner.displayOrder,
                active: banner.status,

                desktopPreviewUrl: banner.desktopBanner
                    ? `${import.meta.env.VITE_API_IMAGE_URL_Banners}${banner.desktopBanner}`
                    : null,

                mobilePreviewUrl: banner.mobileBanner
                    ? `${import.meta.env.VITE_API_IMAGE_URL_Banners}${banner.mobileBanner}`
                    : null,
            }));

            setBanners(newBanners)
            
        } catch (error) {
            console.error(
                "BANNER VIEW ERROR:",
                error.response?.data || error
            );

            toast.add({
                title: "Banner Creation Failed",
                description:
                    error.response?.data?.message || "Something went wrong",
                type: "error",
            });
        }
    }


    useEffect(() => {
        fatchProducts()
    }, [])

    // Handle Form Submit (Add / Update Banner)
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData(e.target);

            // Switch ki value manually add karo
            formData.set("status", String(BannerStatus));

            const result = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}banners/create`,
                formData
            );

            toast.add({
                title: result.data.message,
                type: "success",
            });
            fatchProducts()
            resetForm();

        } catch (error) {
            console.error(
                "BANNER CREATE ERROR:",
                error.response?.data || error
            );

            toast.add({
                title: "Banner Creation Failed",
                description:
                    error.response?.data?.message || "Something went wrong",
                type: "error",
            });
        }
    };
    // Action Handlers
    const handleEdit = (banner) => {
        setEditingBannerId(banner.id);
        setTitle(banner.title);
        setLink(banner.link);
        setDisplayOrder(banner.displayOrder || 0);
        setBannerStatus(banner.active);
        setDesktopPreviewUrl(banner.desktopPreviewUrl || null);
        setMobilePreviewUrl(banner.mobilePreviewUrl || null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const handleDelete = (id) => {
        setBanners((prev) => prev.filter((b) => b.id !== id));
        toast.add({
            title: "Banner Deleted",
            description: "Banner removed from slider list.",
            type: "info",
        });
    };
    const handleToggleStatus = (id) => {
        setBanners((prev) =>
            prev.map((b) => (b.id === id ? { ...b, active: !b.active } : b))
        );
    };
    const handleView = (banner) => {
        setViewBanner(banner);
        setIsViewOpen(true);
    };

    return (
        <div className="w-full min-h-full bg-[#FAFBFD] p-3 sm:p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
            {/* 1. Header Section & Breadcrumb */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                        Banner Slider
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        Manage homepage banners for desktop and mobile devices.
                    </p>
                </div>

                {/* Breadcrumb Navigation */}
                <Breadcrumb className="self-start sm:self-auto text-xs text-gray-500">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/" className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                                <Home className="w-3.5 h-3.5" />
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="#" className="text-gray-500 hover:text-gray-700">
                                Website
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="font-semibold text-gray-800">
                                Banner Slider
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            {/* 2. Add / Edit Banner Form */}
            <form onSubmit={handleSubmit}>
                <Card className="border border-gray-200/80 shadow-xs bg-white rounded-2xl">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-base sm:text-lg font-bold text-gray-900">
                            {editingBannerId ? "Edit Banner" : "Add New Banner"}
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm text-gray-500">
                            Upload seperate images for desktop and mobile view. Recommended size is shared below.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            {/* Desktop Banner Upload Area */}
                            <div className="lg:col-span-4 flex flex-col justify-between space-y-2">
                                <Label className="text-xs font-bold text-gray-800">
                                    Desktop Banner Image <span className="text-red-500">*</span>
                                </Label>

                                {desktopPreviewUrl ? (
                                    /* Live Desktop Banner Image Preview */
                                    <div className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-[1920/600] bg-slate-100 flex items-center justify-center min-h-[140px] flex-1">
                                        <img
                                            src={desktopPreviewUrl}
                                            alt="Desktop Banner Preview"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <Button
                                                type="button"
                                                size="xs"
                                                variant="secondary"
                                                onClick={() => desktopBannerRef.current?.click()}
                                                className="bg-white/95 hover:bg-white text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm"
                                            >
                                                Change
                                            </Button>
                                            <Button
                                                type="button"
                                                size="xs"
                                                variant="destructive"
                                                onClick={handleRemoveDesktop}
                                                className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1"
                                            >
                                                <X className="w-3.5 h-3.5" /> Remove
                                            </Button>
                                        </div>
                                        {desktopFile && (
                                            <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-xs text-white text-[10px] px-2.5 py-1 rounded-md flex items-center justify-between">
                                                <span className="truncate max-w-[150px] font-medium">{desktopFile.name}</span>
                                                <span>{(desktopFile.size / 1024 / 1024).toFixed(2)} MB</span>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    /* Desktop Upload Dropzone Box */
                                    <div
                                        onClick={() => desktopBannerRef.current?.click()}
                                        onDragOver={handleDragOverDesktop}
                                        onDragLeave={handleDragLeaveDesktop}
                                        onDrop={handleDropDesktop}
                                        className={`border-2 border-dashed ${desktopDragActive
                                            ? "border-blue-500 bg-blue-50/60"
                                            : "border-gray-200 hover:border-gray-300 bg-slate-50/40"
                                            } rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors min-h-[140px] flex-1`}
                                    >
                                        <div className="w-10 h-10 rounded-full bg-slate-100/80 flex items-center justify-center mb-2">
                                            <ImageIcon className="w-6 h-6 text-gray-400 stroke-[1.5]" />
                                        </div>
                                        <p className="text-xs font-semibold text-gray-700">
                                            Click to upload desktop banner
                                        </p>
                                        <p className="text-[11px] text-gray-400 mt-0.5">
                                            or drag and drop
                                        </p>
                                    </div>
                                )}

                                <input
                                    name="desktopBanner"
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    ref={desktopBannerRef}
                                    onChange={(e) => handleDesktopFileSelect(e.target.files[0])}
                                />

                                <div className="text-[11px] text-gray-400 leading-snug space-y-0.5 pt-1">
                                    <p>Recommended: 1920 × 600 px (JPG, PNG, WebP)</p>
                                    <p>Max size: 2MB</p>
                                </div>
                            </div>

                            {/* Mobile Banner Upload Area */}
                            <div className="lg:col-span-4 flex flex-col justify-between space-y-2">
                                <Label className="text-xs font-bold text-gray-800">
                                    Mobile Banner Image <span className="text-red-500">*</span>
                                </Label>

                                {mobilePreviewUrl ? (
                                    /* Live Mobile Banner Image Preview */
                                    <div className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-[768/1200] max-h-[160px] bg-slate-100 flex items-center justify-center mx-auto w-full flex-1">
                                        <img
                                            src={mobilePreviewUrl}
                                            alt="Mobile Banner Preview"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <Button
                                                type="button"
                                                size="xs"
                                                variant="secondary"
                                                onClick={() => mobileBannerRef.current?.click()}
                                                className="bg-white/95 hover:bg-white text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm"
                                            >
                                                Change
                                            </Button>
                                            <Button
                                                type="button"
                                                size="xs"
                                                variant="destructive"
                                                onClick={handleRemoveMobile}
                                                className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1"
                                            >
                                                <X className="w-3.5 h-3.5" /> Remove
                                            </Button>
                                        </div>
                                        {mobileFile && (
                                            <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-xs text-white text-[10px] px-2.5 py-1 rounded-md flex items-center justify-between">
                                                <span className="truncate max-w-[120px] font-medium">{mobileFile.name}</span>
                                                <span>{(mobileFile.size / 1024 / 1024).toFixed(2)} MB</span>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    /* Mobile Upload Dropzone Box */
                                    <div
                                        onClick={() => mobileBannerRef.current?.click()}
                                        onDragOver={handleDragOverMobile}
                                        onDragLeave={handleDragLeaveMobile}
                                        onDrop={handleDropMobile}
                                        className={`border-2 border-dashed ${mobileDragActive
                                            ? "border-blue-500 bg-blue-50/60"
                                            : "border-gray-200 hover:border-gray-300 bg-slate-50/40"
                                            } rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors min-h-[140px] flex-1`}
                                    >
                                        <div className="w-10 h-10 rounded-full bg-slate-100/80 flex items-center justify-center mb-2">
                                            <ImageIcon className="w-6 h-6 text-gray-400 stroke-[1.5]" />
                                        </div>
                                        <p className="text-xs font-semibold text-gray-700">
                                            Click to upload mobile banner
                                        </p>
                                        <p className="text-[11px] text-gray-400 mt-0.5">
                                            or drag and drop
                                        </p>
                                    </div>
                                )}

                                <input
                                    name="mobileBanner"
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    ref={mobileBannerRef}
                                    onChange={(e) => handleMobileFileSelect(e.target.files[0])}
                                />

                                <div className="text-[11px] text-gray-400 leading-snug space-y-0.5 pt-1">
                                    <p>Recommended: 768 × 1200 px (JPG, PNG, WebP)</p>
                                    <p>Max size: 2MB</p>
                                </div>
                            </div>

                            {/* Banner Form Inputs */}
                            <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
                                <div className="space-y-3">
                                    {/* Title (Optional) */}
                                    <div className="space-y-1.5">
                                        <Label htmlFor="title" className="text-xs font-bold text-gray-800">
                                            Title (Optional)
                                        </Label>
                                        <Input
                                            id="title"
                                            type="text"
                                            name="title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="Enter banner title"
                                            className="h-10 text-xs sm:text-sm bg-white border-gray-200 rounded-xl shadow-2xs focus-visible:ring-1 focus-visible:ring-blue-500"
                                        />
                                    </div>

                                    {/* Link (Optional) */}
                                    <div className="space-y-1.5">
                                        <Label htmlFor="link" className="text-xs font-bold text-gray-800">
                                            Link (Optional)
                                        </Label>
                                        <div className="relative">
                                            <LinkIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                            <Input
                                                id="link"
                                                name="link"
                                                type="text"
                                                value={link}
                                                onChange={(e) => setLink(e.target.value)}
                                                placeholder="https://example.com"
                                                className="h-10 pl-9 text-xs sm:text-sm bg-white border-gray-200 rounded-xl shadow-2xs focus-visible:ring-1 focus-visible:ring-blue-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Inline Display Order & Status */}
                                    <div className="grid grid-cols-2 gap-4 pt-1">
                                        {/* Display Order */}
                                        <div className="space-y-1.5">
                                            <Label htmlFor="order" className="text-xs font-bold text-gray-800">
                                                Display Order
                                            </Label>
                                            <Input
                                                id="order"
                                                type="number"
                                                name="displayOrder"
                                                value={displayOrder}
                                                onChange={(e) => setDisplayOrder(e.target.value)}
                                                className="h-10 text-xs sm:text-sm bg-white border-gray-200 rounded-xl shadow-2xs focus-visible:ring-1 focus-visible:ring-blue-500"
                                            />
                                        </div>

                                        {/* Status */}
                                        <div className="space-y-1.5">
                                            <Label className="text-xs font-bold text-gray-800 block">
                                                Status
                                            </Label>
                                            <div className="flex items-center gap-2 h-10">
                                                <Switch
                                                    id="status-toggle"
                                                    name="status"
                                                    checked={BannerStatus}
                                                    onCheckedChange={setBannerStatus}
                                                />
                                                <Label
                                                    htmlFor="status-toggle"
                                                    className="text-xs sm:text-sm font-semibold text-gray-800 cursor-pointer"
                                                >
                                                    {BannerStatus ? "Active" : "Inactive"}
                                                </Label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Action Buttons */}
                                <div className="flex items-center justify-end gap-3 pt-4 sm:pt-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={resetForm}
                                        className="h-9 px-4 text-xs sm:text-sm font-semibold text-gray-700 bg-white border-gray-200 hover:bg-gray-50 rounded-xl shadow-2xs"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="h-9 px-4 text-xs sm:text-sm font-semibold text-white bg-[#0066FF] hover:bg-[#0052CC] rounded-xl shadow-2xs flex items-center gap-1 cursor-pointer"
                                    >
                                        <Plus className="w-4 h-4 stroke-[2.5]" />
                                        <span>{editingBannerId ? "Update Banner" : "Add Banner"}</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </form>

            {/* 3. Manage Banners Table Card */}
            <Card className="border border-gray-200/80 shadow-xs bg-white rounded-2xl">
                <CardHeader className="pb-4">
                    <CardTitle className="text-base sm:text-lg font-bold text-gray-900">
                        Manage Banners
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm text-gray-500">
                        View, <span className="underline decoration-gray-400 cursor-pointer">edit or</span> remove banners. Drag to reorder.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                    <div className="w-full overflow-x-auto rounded-xl border border-gray-200/70">
                        <Table className="min-w-[700px] text-xs sm:text-sm">
                            <TableHeader className="bg-slate-50/80">
                                <TableRow className="border-b border-gray-200/70 hover:bg-transparent">
                                    <TableHead className="w-16 text-center font-bold text-gray-700 py-3">#</TableHead>
                                    <TableHead className="font-bold text-gray-700 py-3">Desktop Preview</TableHead>
                                    <TableHead className="font-bold text-gray-700 py-3">Mobile Preview</TableHead>
                                    <TableHead className="font-bold text-gray-700 py-3">Title</TableHead>
                                    <TableHead className="font-bold text-gray-700 py-3">Link</TableHead>
                                    <TableHead className="font-bold text-gray-700 py-3">Status</TableHead>
                                    <TableHead className="text-center font-bold text-gray-700 py-3">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {banners.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-8 text-gray-500 text-xs">
                                            No banners found. Upload a banner above to add one.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    banners?.map((banner, index) => (
                                        <TableRow key={banner.id} className="border-b border-gray-100 hover:bg-slate-50/40 transition-colors">
                                            {/* Index & Drag Handle */}
                                            <TableCell className="text-center font-medium text-gray-700">
                                                <div className="flex items-center justify-center gap-1.5">
                                                    <GripVertical className="w-4 h-4 text-gray-400 cursor-grab active:cursor-grabbing" />
                                                    <span>{index + 1}</span>
                                                </div>
                                            </TableCell>

                                            {/* Desktop Preview */}
                                            <TableCell>
                                                <div className="w-44 sm:w-48 aspect-[1920/600] rounded-lg border border-gray-200 shadow-2xs overflow-hidden bg-slate-100 flex items-center justify-center">
                                                    {banner.desktopPreviewUrl ? (
                                                        <img
                                                            src={banner.desktopPreviewUrl}
                                                            alt={banner.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        banner.desktopPreview
                                                    )}
                                                </div>
                                            </TableCell>

                                            {/* Mobile Preview */}
                                            <TableCell>
                                                <div className="w-11 sm:w-12 aspect-[768/1200] rounded-md border border-gray-200 shadow-2xs overflow-hidden bg-slate-100 flex items-center justify-center">
                                                    {banner.mobilePreviewUrl ? (
                                                        <img
                                                            src={banner.mobilePreviewUrl}
                                                            alt={banner.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        banner.mobilePreview
                                                    )}
                                                </div>
                                            </TableCell>

                                            {/* Title */}
                                            <TableCell className="font-semibold text-gray-900">
                                                {banner.title}
                                            </TableCell>

                                            {/* Link */}
                                            <TableCell>
                                                <a
                                                    href={banner.link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-[#0066FF] hover:underline font-medium text-xs sm:text-sm break-all"
                                                >
                                                    {banner.link}
                                                </a>
                                            </TableCell>

                                            {/* Status Toggle */}
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Switch
                                                        name="status"
                                                        checked={banner.active}
                                                        onCheckedChange={() => handleToggleStatus(banner.id)}
                                                    />
                                                    <span className="text-xs sm:text-sm font-semibold text-gray-800">
                                                        {banner.active ? "Active" : "Inactive"}
                                                    </span>
                                                </div>
                                            </TableCell>

                                            {/* Action Buttons */}
                                            <TableCell>
                                                <div className="flex items-center justify-center gap-1.5">
                                                    {/* Edit Icon Button */}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleEdit(banner)}
                                                        className="w-8 h-8 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 transition-colors cursor-pointer shadow-2xs"
                                                        title="Edit Banner"
                                                    >
                                                        <Pencil className="w-3.5 h-3.5 stroke-[2]" />
                                                    </button>

                                                    {/* View Icon Button */}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleView(banner)}
                                                        className="w-8 h-8 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 transition-colors cursor-pointer shadow-2xs"
                                                        title="View Banner"
                                                    >
                                                        <Eye className="w-3.5 h-3.5 stroke-[2]" />
                                                    </button>

                                                    {/* Delete Icon Button */}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(banner.id)}
                                                        className="w-8 h-8 rounded-lg border border-red-200/80 bg-red-50/40 hover:bg-red-50 flex items-center justify-center text-red-500 transition-colors cursor-pointer shadow-2xs"
                                                        title="Delete Banner"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5 stroke-[2]" />
                                                    </button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* 4. Banner Detail View Modal */}
            <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
                <DialogContent className="max-w-2xl bg-white p-6 rounded-2xl">
                    <DialogHeader className="pb-2">
                        <DialogTitle className="text-lg font-bold text-gray-900">
                            Banner Details: {viewBanner?.title}
                        </DialogTitle>
                        <DialogDescription className="text-xs text-gray-500">
                            Full preview and specifications for desktop and mobile displays.
                        </DialogDescription>
                    </DialogHeader>

                    {viewBanner && (
                        <div className="space-y-4 pt-2">
                            {/* Desktop Banner Preview Card */}
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-gray-700">Desktop View (1920 × 600)</Label>
                                <div className="w-full aspect-[1920/600] rounded-xl border border-gray-200 overflow-hidden bg-slate-100 flex items-center justify-center shadow-inner">
                                    {viewBanner.desktopPreviewUrl ? (
                                        <img
                                            src={viewBanner.desktopPreviewUrl}
                                            alt={viewBanner.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        viewBanner.desktopPreview
                                    )}
                                </div>
                            </div>

                            {/* Mobile Banner Preview Card */}
                            <div className="space-y-1.5">
                                <Label className="text-xs font-bold text-gray-700">Mobile View (768 × 1200)</Label>
                                <div className="w-36 aspect-[768/1200] rounded-xl border border-gray-200 overflow-hidden bg-slate-100 flex items-center justify-center shadow-inner mx-auto">
                                    {viewBanner.mobilePreviewUrl ? (
                                        <img
                                            src={viewBanner.mobilePreviewUrl}
                                            alt={viewBanner.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        viewBanner.mobilePreview
                                    )}
                                </div>
                            </div>

                            {/* Metadata Info */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs border-t border-gray-100">
                                <div>
                                    <span className="text-gray-400 block text-[11px]">Title</span>
                                    <span className="font-semibold text-gray-800">{viewBanner.title}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400 block text-[11px]">Target Link</span>
                                    <a href={viewBanner.link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline truncate block">
                                        {viewBanner.link}
                                    </a>
                                </div>
                                <div>
                                    <span className="text-gray-400 block text-[11px]">Status</span>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${viewBanner.active ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'}`}>
                                        {viewBanner.active ? "Active" : "Inactive"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}