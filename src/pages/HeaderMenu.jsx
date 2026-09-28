import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  GripVertical,
  Pencil,
  Trash2,
  Plus,
  X,
  ChevronDown,
  ChevronRight,
  Link2,
  Folder,
  Layers,
  Home,
  Star,
  Tag,
  FileText,
  Phone,
  ArrowUp,
  ArrowDown,
  CornerDownRight,
  CornerUpLeft,
  Loader2,
  RefreshCw,
  AlertCircle,
  Save,
  Check,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
  getHeaderMenu,
  addHeaderMenuItem,
  updateHeaderMenuItem,
  deleteHeaderMenuItem,
  reorderHeaderMenuItems,
  fetchCategoriesApi,
  fetchCollectionsApi,
} from "@/services/menuService";

import {
  buildTree,
  flattenTree,
  generateReorderPayload,
  getDescendantIds,
  getItemId,
  getParentId,
} from "@/utils/menuUtils";

/**
 * Single Sortable Menu Item Component
 */
function SortableMenuItem({
  item,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
  onIndent,
  onOutdent,
  isFirst,
  isLast,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const getItemIcon = (title, type) => {
    const lower = (title || "").toLowerCase();
    if (lower.includes("home")) return <Home className="w-4 h-4 text-slate-600" />;
    if (lower.includes("shop") || lower.includes("store"))
      return <Folder className="w-4 h-4 text-slate-600" />;
    if (lower.includes("chair")) return <Tag className="w-4 h-4 text-slate-600" />;
    if (lower.includes("table")) return <Tag className="w-4 h-4 text-slate-600" />;
    if (lower.includes("sofa")) return <Tag className="w-4 h-4 text-slate-600" />;
    if (lower.includes("bed")) return <Tag className="w-4 h-4 text-slate-600" />;
    if (lower.includes("star") || lower.includes("arrival"))
      return <Star className="w-4 h-4 text-slate-600" />;
    if (lower.includes("sale") || lower.includes("offer"))
      return <Tag className="w-4 h-4 text-slate-600" />;
    if (lower.includes("about")) return <FileText className="w-4 h-4 text-slate-600" />;
    if (lower.includes("contact")) return <Phone className="w-4 h-4 text-slate-600" />;

    if (type === "category") return <Tag className="w-4 h-4 text-slate-600" />;
    if (type === "collection") return <Layers className="w-4 h-4 text-slate-600" />;
    return <Link2 className="w-4 h-4 text-slate-600" />;
  };

  const depthIndent = item.depth * 28;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative bg-white border border-slate-200/90 rounded-xl p-3 mb-2 flex items-center justify-between hover:border-purple-300 hover:shadow-xs transition-all ${
        isDragging ? "shadow-md border-purple-400 z-50 bg-purple-50/20" : ""
      }`}
    >
      <div
        className="flex items-center gap-2 flex-1 min-w-0"
        style={{ paddingLeft: `${depthIndent}px` }}
      >
        {item.depth > 0 && (
          <span className="text-slate-300 -ml-4 mr-1 text-xs select-none">
            └─
          </span>
        )}

        <button
          type="button"
          {...attributes}
          {...listeners}
          className="p-1 text-slate-400 hover:text-slate-600 cursor-grab active:cursor-grabbing rounded hover:bg-slate-100 transition-colors shrink-0"
          title="Drag to reorder"
        >
          <GripVertical className="w-4 h-4" />
        </button>

        <div className="p-1.5 bg-slate-100/80 rounded-md shrink-0">
          {getItemIcon(item.title, item.type)}
        </div>

        <div className="truncate min-w-0 flex-1 ml-1">
          <span className="font-medium text-slate-800 text-sm truncate block">
            {item.title}
          </span>
          {item.url && (
            <span className="text-xs text-slate-400 truncate block">
              {item.url}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0 ml-3">
        {/* Quick Reorder / Hierarchy Action buttons on row hover */}
        <div className="hidden group-hover:flex items-center gap-0.5 bg-slate-100/80 p-0.5 rounded-lg border border-slate-200">
          <button
            type="button"
            onClick={() => onMoveUp(item)}
            disabled={isFirst}
            className="p-1 text-slate-500 hover:text-purple-600 hover:bg-white rounded disabled:opacity-30 cursor-pointer"
            title="Move Up"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onMoveDown(item)}
            disabled={isLast}
            className="p-1 text-slate-500 hover:text-purple-600 hover:bg-white rounded disabled:opacity-30 cursor-pointer"
            title="Move Down"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
          {item.depth > 0 && (
            <button
              type="button"
              onClick={() => onOutdent(item)}
              className="p-1 text-slate-500 hover:text-purple-600 hover:bg-white rounded cursor-pointer"
              title="Outdent (Make top level)"
            >
              <CornerUpLeft className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            type="button"
            onClick={() => onIndent(item)}
            disabled={isFirst}
            className="p-1 text-slate-500 hover:text-purple-600 hover:bg-white rounded disabled:opacity-30 cursor-pointer"
            title="Indent (Make child of item above)"
          >
            <CornerDownRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Type Badges matching design */}
        {item.type === "category" && (
          <Badge className="bg-emerald-100/80 text-emerald-800 hover:bg-emerald-100 border-0 font-medium px-2.5 py-0.5 rounded-full text-xs capitalize shadow-none">
            Category
          </Badge>
        )}
        {item.type === "collection" && (
          <Badge className="bg-purple-100/80 text-purple-800 hover:bg-purple-100 border-0 font-medium px-2.5 py-0.5 rounded-full text-xs capitalize shadow-none">
            Collection
          </Badge>
        )}
        {item.type === "link" && (
          <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-0 font-medium px-2.5 py-0.5 rounded-full text-xs capitalize shadow-none">
            Link
          </Badge>
        )}

        <button
          type="button"
          onClick={() => onEdit(item)}
          className="p-1 text-slate-400 hover:text-purple-600 transition-colors rounded hover:bg-purple-50 cursor-pointer ml-1"
          title="Edit menu item"
        >
          <Pencil className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => onDelete(item)}
          className="p-1 text-slate-400 hover:text-red-600 transition-colors rounded hover:bg-red-50 cursor-pointer"
          title="Delete menu item"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>
      </div>
    </div>
  );
}

export default function HeaderMenu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingOrder, setSavingOrder] = useState(false);
  const [error, setError] = useState(null);

  // Categories & Collections for dropdowns
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [fetchingOptions, setFetchingOptions] = useState(false);

  // Add / Edit Form State
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    type: "link",
    categoryId: "",
    collectionId: "",
    url: "",
    parentId: "none",
  });
  const [submitting, setSubmitting] = useState(false);

  // Delete Dialog State
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Sensors for DND Kit
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  /**
   * Fetch Header Menu
   */
  const loadMenu = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedItems = await getHeaderMenu();
      setItems(fetchedItems || []);
    } catch (err) {
      console.error("Error fetching header menu:", err);
      const msg =
        err.response?.data?.message || err.message || "Failed to fetch Header Menu";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch Categories & Collections for Dropdowns
   */
  const loadOptions = useCallback(async () => {
    setFetchingOptions(true);
    try {
      const [cats, cols] = await Promise.all([
        fetchCategoriesApi().catch((e) => {
          console.error("Error fetching categories:", e);
          return [];
        }),
        fetchCollectionsApi().catch((e) => {
          console.error("Error fetching collections:", e);
          return [];
        }),
      ]);
      setCategories(cats || []);
      setCollections(cols || []);
    } finally {
      setFetchingOptions(false);
    }
  }, []);

  useEffect(() => {
    loadMenu();
    loadOptions();
  }, [loadMenu, loadOptions]);

  // Derived Tree and Flat Items List
  const treeItems = useMemo(() => buildTree(items), [items]);
  const flatItems = useMemo(() => flattenTree(treeItems), [treeItems]);
  const itemIds = useMemo(() => flatItems.map((i) => i.id), [flatItems]);

  // Handle Form Input Changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      // Pre-fill Title if selecting a category or collection
      if (field === "categoryId" && prev.type === "category") {
        const cat = categories.find((c) => (c._id || c.id) === value);
        if (cat && !prev.title) {
          updated.title = cat.name || cat.title || "";
        }
      }
      if (field === "collectionId" && prev.type === "collection") {
        const col = collections.find((c) => (c._id || c.id) === value);
        if (col && !prev.title) {
          updated.title = col.name || col.title || "";
        }
      }
      return updated;
    }
    );
  };

  // Open Form for Add
  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      type: "link",
      categoryId: "",
      collectionId: "",
      url: "",
      parentId: "none",
    });
    setIsPanelOpen(true);
  };

  // Open Form for Edit
  const handleOpenEdit = (item) => {
    setEditingItem(item);
    const catId = typeof item.categoryId === "object" && item.categoryId
      ? (item.categoryId._id || item.categoryId.id)
      : (item.categoryId || "");
    const colId = typeof item.collectionId === "object" && item.collectionId
      ? (item.collectionId._id || item.collectionId.id)
      : (item.collectionId || "");

    setFormData({
      title: item.title || "",
      type: item.type || "link",
      categoryId: catId,
      collectionId: colId,
      url: item.url || "",
      parentId: getParentId(item) || "none",
    });
    setIsPanelOpen(true);
  };

  // Close Panel
  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setEditingItem(null);
  };

  // Save Menu Item (Add or Edit)
  const handleSubmitForm = async (e) => {
    e?.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (formData.type === "category" && !formData.categoryId) {
      toast.error("Please select a category");
      return;
    }
    if (formData.type === "collection" && !formData.collectionId) {
      toast.error("Please select a collection");
      return;
    }
    if (formData.type === "link" && !formData.url.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    setSubmitting(true);
    const payload = {
      title: formData.title.trim(),
      type: formData.type,
      categoryId: formData.type === "category" ? formData.categoryId : null,
      collectionId: formData.type === "collection" ? formData.collectionId : null,
      url: formData.type === "link" ? formData.url.trim() : null,
      parentId: formData.parentId === "none" ? null : formData.parentId,
    };

    try {
      if (editingItem) {
        await updateHeaderMenuItem(editingItem.id || editingItem._id, payload);
        toast.success("Menu item updated successfully");
      } else {
        await addHeaderMenuItem(payload);
        toast.success("Menu item added successfully");
      }

      handleClosePanel();
      await loadMenu();
    } catch (err) {
      console.error("Error saving menu item:", err);
      const msg =
        err.response?.data?.message || err.message || "Failed to save menu item";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Click
  const handleConfirmDelete = (item) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  // Perform Delete
  const handleDeleteExecute = async () => {
    if (!itemToDelete) return;
    setDeleting(true);
    try {
      await deleteHeaderMenuItem(itemToDelete.id || itemToDelete._id);
      toast.success(`Removed "${itemToDelete.title}" from Header Menu`);
      setDeleteDialogOpen(false);
      setItemToDelete(null);
      await loadMenu();
    } catch (err) {
      console.error("Error deleting menu item:", err);
      const msg =
        err.response?.data?.message || err.message || "Failed to delete menu item";
      toast.error(msg);
    } finally {
      setDeleting(false);
    }
  };

  /**
   * Save Order Payload to Backend
   */
  const syncReorderToBackend = async (newFlatItems) => {
    const payload = generateReorderPayload(newFlatItems);
    setSavingOrder(true);
    try {
      await reorderHeaderMenuItems(payload);
      toast.success("Menu layout saved successfully");
    } catch (err) {
      console.error("Error saving menu order:", err);
      const msg =
        err.response?.data?.message || err.message || "Failed to save menu order";
      toast.error(msg);
      loadMenu(); // Restore server state on error
    } finally {
      setSavingOrder(false);
    }
  };

  /**
   * Drag & Drop End Handler
   */
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = flatItems.findIndex((item) => item.id === active.id);
    const newIndex = flatItems.findIndex((item) => item.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const targetOverItem = flatItems[newIndex];
      const draggedItem = flatItems[oldIndex];

      // Keep target's parentId by default when dragging over
      const reorderedList = arrayMove(flatItems, oldIndex, newIndex).map(
        (item) => {
          if (item.id === draggedItem.id) {
            return { ...item, parentId: targetOverItem.parentId };
          }
          return item;
        }
      );

      // Local optimistic update
      setItems(reorderedList);
      syncReorderToBackend(reorderedList);
    }
  };

  // Quick Action: Move Item Up
  const handleMoveUp = (item) => {
    const idx = flatItems.findIndex((i) => i.id === item.id);
    if (idx <= 0) return;
    const newList = arrayMove(flatItems, idx, idx - 1);
    setItems(newList);
    syncReorderToBackend(newList);
  };

  // Quick Action: Move Item Down
  const handleMoveDown = (item) => {
    const idx = flatItems.findIndex((i) => i.id === item.id);
    if (idx === -1 || idx >= flatItems.length - 1) return;
    const newList = arrayMove(flatItems, idx, idx + 1);
    setItems(newList);
    syncReorderToBackend(newList);
  };

  // Quick Action: Indent (Make child of item above)
  const handleIndent = (item) => {
    const idx = flatItems.findIndex((i) => i.id === item.id);
    if (idx <= 0) return;
    const prevItem = flatItems[idx - 1];
    // Check if prevItem is not descendant
    const descendants = getDescendantIds(items, item.id);
    if (descendants.has(prevItem.id)) return;

    const newList = flatItems.map((i) => {
      if (i.id === item.id) {
        return { ...i, parentId: prevItem.id };
      }
      return i;
    });

    setItems(newList);
    syncReorderToBackend(newList);
  };

  // Quick Action: Outdent (Move up one parent level / top level)
  const handleOutdent = (item) => {
    const parent = flatItems.find((i) => i.id === item.parentId);
    const grandParentId = parent ? parent.parentId : null;

    const newList = flatItems.map((i) => {
      if (i.id === item.id) {
        return { ...i, parentId: grandParentId };
      }
      return i;
    });

    setItems(newList);
    syncReorderToBackend(newList);
  };

  // Filter Parent Item options for edit form (prevent self / descendants)
  const availableParentOptions = useMemo(() => {
    if (!editingItem) return flatItems;
    const targetId = editingItem.id || editingItem._id;
    const descendantIds = getDescendantIds(items, targetId);
    return flatItems.filter((i) => !descendantIds.has(i.id));
  }, [editingItem, flatItems, items]);

  // Resolve selected category name for display in Select
  const selectedCategoryName = useMemo(() => {
    if (!formData.categoryId) return "";
    const found = categories.find(
      (c) => (c._id || c.id) === formData.categoryId
    );
    if (found) return found.name || found.title || "";
    if (editingItem && typeof editingItem.categoryId === "object" && editingItem.categoryId) {
      if ((editingItem.categoryId._id || editingItem.categoryId.id) === formData.categoryId) {
        return editingItem.categoryId.name || editingItem.categoryId.title || "";
      }
    }
    return "";
  }, [formData.categoryId, categories, editingItem]);

  // Resolve selected collection name for display in Select
  const selectedCollectionName = useMemo(() => {
    if (!formData.collectionId) return "";
    const found = collections.find(
      (c) => (c._id || c.id) === formData.collectionId
    );
    if (found) return found.name || found.title || "";
    if (editingItem && typeof editingItem.collectionId === "object" && editingItem.collectionId) {
      if ((editingItem.collectionId._id || editingItem.collectionId.id) === formData.collectionId) {
        return editingItem.collectionId.name || editingItem.collectionId.title || "";
      }
    }
    return "";
  }, [formData.collectionId, collections, editingItem]);

  // Resolve selected parent item name for display in Select
  const selectedParentName = useMemo(() => {
    if (!formData.parentId || formData.parentId === "none") return "";
    const found = availableParentOptions.find((p) => p.id === formData.parentId);
    return found ? found.title : "";
  }, [formData.parentId, availableParentOptions]);

  return (
    <div className="w-full h-full bg-slate-50/60 p-6 md:p-8 flex flex-col min-h-0 overflow-hidden">
      {/* Top Header Section */}
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Header Menu
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage the navigation menu shown in your store header.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savingOrder && (
            <span className="text-xs text-purple-600 flex items-center gap-1 font-medium bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-200">
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving order...
            </span>
          )}

          <Button
            onClick={() => syncReorderToBackend(flatItems)}
            disabled={savingOrder || loading}
            className="bg-[#563BE3] hover:bg-[#452cc5] text-white font-medium px-5 py-2 rounded-xl cursor-pointer shadow-xs flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Menu
          </Button>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0 items-start overflow-hidden">
        {/* Left Side: Menu Items List */}
        <div
          className={`${
            isPanelOpen ? "lg:col-span-7 xl:col-span-7" : "lg:col-span-12"
          } h-full flex flex-col min-h-0 transition-all duration-200`}
        >
          <Card className="border border-slate-200/90 shadow-xs bg-white rounded-2xl overflow-hidden flex flex-col h-full min-h-0">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Menu Items
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Drag to reorder items. Click on an item to edit its details.
                </p>
              </div>

              <Button
                onClick={handleOpenAdd}
                className="bg-[#563BE3] hover:bg-[#452cc5] text-white text-xs font-medium px-3.5 py-2 rounded-xl cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Menu Item
              </Button>
            </div>

            <CardContent className="p-5 flex-1 min-h-0 overflow-y-auto">
              {/* Loading State */}
              {loading && (
                <div className="space-y-3">
                  <Skeleton className="h-14 w-full rounded-xl" />
                  <Skeleton className="h-14 w-full rounded-xl" />
                  <Skeleton className="h-14 w-full rounded-xl" />
                  <Skeleton className="h-14 w-full rounded-xl" />
                </div>
              )}

              {/* Error State */}
              {!loading && error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between text-red-800">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                    <span className="text-sm font-medium">{error}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={loadMenu}
                    className="border-red-300 text-red-800 hover:bg-red-100 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 mr-1" /> Retry
                  </Button>
                </div>
              )}

              {/* Empty State */}
              {!loading && !error && flatItems.length === 0 && (
                <div className="text-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                  <div className="w-12 h-12 rounded-full bg-purple-100 text-[#563BE3] flex items-center justify-center mx-auto mb-3">
                    <Folder className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">
                    No menu items yet
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Get started by adding items to your store's main Header Menu navigation.
                  </p>
                  <Button
                    onClick={handleOpenAdd}
                    className="mt-4 bg-[#563BE3] hover:bg-[#452cc5] text-white text-xs font-medium px-4 py-2 rounded-xl cursor-pointer"
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add First Menu Item
                  </Button>
                </div>
              )}

              {/* DND Kit Sortable List */}
              {!loading && !error && flatItems.length > 0 && (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={itemIds}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-1">
                      {flatItems.map((item, index) => (
                        <SortableMenuItem
                          key={item.id}
                          item={item}
                          onEdit={handleOpenEdit}
                          onDelete={handleConfirmDelete}
                          onMoveUp={handleMoveUp}
                          onMoveDown={handleMoveDown}
                          onIndent={handleIndent}
                          onOutdent={handleOutdent}
                          isFirst={index === 0}
                          isLast={index === flatItems.length - 1}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Add / Edit Menu Item Form Panel */}
        {isPanelOpen && (
          <div className="lg:col-span-5 xl:col-span-5 h-full flex flex-col min-h-0 animate-in fade-in slide-in-from-right-4 duration-200">
            <Card className="border border-slate-200/90 shadow-xs bg-white rounded-2xl overflow-hidden flex flex-col h-full min-h-0">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                <h2 className="text-base font-bold text-slate-900">
                  {editingItem ? "Edit Menu Item" : "Add / Edit Menu Item"}
                </h2>
                <button
                  type="button"
                  onClick={handleClosePanel}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Close form"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <CardContent className="p-5 flex-1 min-h-0 overflow-y-auto">
                <form onSubmit={handleSubmitForm} className="space-y-5">
                  {/* Title Field */}
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-slate-700">
                      Title
                    </Label>
                    <Input
                      type="text"
                      placeholder="e.g. Chairs"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="h-10 rounded-xl border-slate-200 focus-visible:ring-[#563BE3]"
                    />
                  </div>

                  {/* Type Selector (3 Card Buttons) */}
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-slate-700">
                      Type
                    </Label>
                    <div className="grid grid-cols-3 gap-2">
                      {/* Link Card */}
                      <button
                        type="button"
                        onClick={() => handleInputChange("type", "link")}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 text-xs transition-all cursor-pointer ${
                          formData.type === "link"
                            ? "border-[#563BE3] bg-purple-50/50 text-[#563BE3] font-semibold ring-1 ring-[#563BE3]"
                            : "border-slate-200 hover:border-slate-300 text-slate-600 bg-white"
                        }`}
                      >
                        <Link2 className="w-4 h-4" />
                        <span>Link</span>
                      </button>

                      {/* Category Card */}
                      <button
                        type="button"
                        onClick={() => handleInputChange("type", "category")}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 text-xs transition-all cursor-pointer ${
                          formData.type === "category"
                            ? "border-[#563BE3] bg-purple-50/50 text-[#563BE3] font-semibold ring-1 ring-[#563BE3]"
                            : "border-slate-200 hover:border-slate-300 text-slate-600 bg-white"
                        }`}
                      >
                        <Tag className="w-4 h-4" />
                        <span>Category</span>
                      </button>

                      {/* Collection Card */}
                      <button
                        type="button"
                        onClick={() => handleInputChange("type", "collection")}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 text-xs transition-all cursor-pointer ${
                          formData.type === "collection"
                            ? "border-[#563BE3] bg-purple-50/50 text-[#563BE3] font-semibold ring-1 ring-[#563BE3]"
                            : "border-slate-200 hover:border-slate-300 text-slate-600 bg-white"
                        }`}
                      >
                        <Layers className="w-4 h-4" />
                        <span>Collection</span>
                      </button>
                    </div>
                  </div>

                  {/* Dynamic Field Based on Type */}
                  {formData.type === "category" && (
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold text-slate-700">
                        Select Category
                      </Label>
                      <Select
                        value={formData.categoryId || ""}
                        onValueChange={(val) => handleInputChange("categoryId", val)}
                      >
                        <SelectTrigger className="h-10 rounded-xl border-slate-200 focus:ring-[#563BE3]">
                          <SelectValue placeholder="Select Category">
                            {selectedCategoryName || undefined}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent className="bg-white max-h-60">
                          {categories.length > 0 ? (
                            categories.map((cat) => (
                              <SelectItem
                                key={cat._id || cat.id}
                                value={cat._id || cat.id}
                              >
                                {cat.name || cat.title || "Unnamed Category"}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="none" disabled>
                              No categories available
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {formData.type === "collection" && (
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold text-slate-700">
                        Select Collection
                      </Label>
                      <Select
                        value={formData.collectionId || ""}
                        onValueChange={(val) => handleInputChange("collectionId", val)}
                      >
                        <SelectTrigger className="h-10 rounded-xl border-slate-200 focus:ring-[#563BE3]">
                          <SelectValue placeholder="Select Collection">
                            {selectedCollectionName || undefined}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent className="bg-white max-h-60">
                          {collections.length > 0 ? (
                            collections.map((col) => (
                              <SelectItem
                                key={col._id || col.id}
                                value={col._id || col.id}
                              >
                                {col.name || col.title || "Unnamed Collection"}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="none" disabled>
                              No collections available
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {formData.type === "link" && (
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold text-slate-700">
                        URL
                      </Label>
                      <Input
                        type="text"
                        placeholder="e.g. /about or https://..."
                        value={formData.url}
                        onChange={(e) => handleInputChange("url", e.target.value)}
                        className="h-10 rounded-xl border-slate-200 focus-visible:ring-[#563BE3]"
                      />
                    </div>
                  )}

                  {/* Parent Item (optional) */}
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-slate-700">
                      Parent Item (optional)
                    </Label>
                    <Select
                      value={formData.parentId || "none"}
                      onValueChange={(val) => handleInputChange("parentId", val)}
                    >
                      <SelectTrigger className="h-10 rounded-xl border-slate-200 focus:ring-[#563BE3]">
                        <SelectValue placeholder="None / Top Level">
                          {formData.parentId === "none" || !formData.parentId
                            ? "None (Top Level)"
                            : selectedParentName || undefined}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="bg-white max-h-60">
                        <SelectItem value="none">
                          None (Top Level)
                        </SelectItem>
                        {availableParentOptions.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {"  ".repeat(p.depth)}{p.depth > 0 ? "└─ " : ""}{p.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Submit & Cancel Buttons */}
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleClosePanel}
                      className="rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer h-10 px-5"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="bg-[#563BE3] hover:bg-[#452cc5] text-white font-medium rounded-xl h-10 px-5 cursor-pointer shadow-xs"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                          Saving...
                        </>
                      ) : editingItem ? (
                        "Update Item"
                      ) : (
                        "Add Item"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="rounded-2xl max-w-md bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-bold text-slate-900">
              Delete Menu Item?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-slate-500 mt-1">
              Are you sure you want to remove{" "}
              <strong className="text-slate-800">
                "{itemToDelete?.title}"
              </strong>{" "}
              from the Header Menu? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel
              disabled={deleting}
              className="rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDeleteExecute();
              }}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700 text-white rounded-xl cursor-pointer"
            >
              {deleting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
