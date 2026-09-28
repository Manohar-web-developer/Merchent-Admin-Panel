import axios from "axios";
import Cookies from "js-cookie";

const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api/admin";
  return envUrl.replace(/\/+$/, "");
};

const getAuthHeaders = () => {
  const token = Cookies.get("user_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Fetch Header Menu
 * Endpoint: POST /api/admin/menu/header
 * (DO NOT change to GET per backend specification)
 */
export const getHeaderMenu = async () => {
  const url = `${getBaseUrl()}/menu/header`;
  const response = await axios.post(url, {}, { headers: getAuthHeaders() });
  
  // Return response.data.data as primary value, fallback to _data or response.data
  const data = response.data?.data ?? response.data?._data ?? response.data;
  
  if (Array.isArray(data)) {
    return data;
  }
  if (data && Array.isArray(data.items)) {
    return data.items;
  }
  return [];
};

/**
 * Add Header Menu Item
 * Endpoint: POST /api/admin/menu/header/items
 * Body: { title, type, categoryId, collectionId, url, parentId }
 */
export const addHeaderMenuItem = async (itemData) => {
  const url = `${getBaseUrl()}/menu/header/items`;
  const payload = {
    title: itemData.title,
    type: itemData.type,
    parentId: itemData.parentId || null,
  };

  if (itemData.type === "category") {
    payload.categoryId = itemData.categoryId;
  } else if (itemData.type === "collection") {
    payload.collectionId = itemData.collectionId;
  } else if (itemData.type === "link") {
    payload.url = itemData.url;
  }

  const response = await axios.post(url, payload, { headers: getAuthHeaders() });
  return response.data;
};

/**
 * Update Header Menu Item
 * Endpoint: PUT /api/admin/menu/header/items/:itemId
 */
export const updateHeaderMenuItem = async (itemId, itemData) => {
  const url = `${getBaseUrl()}/menu/header/items/${itemId}`;
  const payload = {
    title: itemData.title,
    type: itemData.type,
    parentId: itemData.parentId || null,
  };

  if (itemData.type === "category") {
    payload.categoryId = itemData.categoryId;
    payload.collectionId = null;
    payload.url = null;
  } else if (itemData.type === "collection") {
    payload.collectionId = itemData.collectionId;
    payload.categoryId = null;
    payload.url = null;
  } else if (itemData.type === "link") {
    payload.url = itemData.url;
    payload.categoryId = null;
    payload.collectionId = null;
  }

  const response = await axios.put(url, payload, { headers: getAuthHeaders() });
  return response.data;
};

/**
 * Delete Header Menu Item
 * Endpoint: DELETE /api/admin/menu/header/items/:itemId
 */
export const deleteHeaderMenuItem = async (itemId) => {
  const url = `${getBaseUrl()}/menu/header/items/${itemId}`;
  const response = await axios.delete(url, { headers: getAuthHeaders() });
  return response.data;
};

/**
 * Reorder Header Menu Items
 * Endpoint: PUT /api/admin/menu/header/items/reorder
 * Body: { items: [ { id, parentId, sortOrder }, ... ] }
 */
export const reorderHeaderMenuItems = async (items) => {
  const url = `${getBaseUrl()}/menu/header/items/reorder`;
  const payload = {
    items: items.map((item, index) => ({
      id: item.id || item._id,
      parentId: item.parentId || null,
      sortOrder: typeof item.sortOrder === "number" ? item.sortOrder : index,
    })),
  };
  const response = await axios.put(url, payload, { headers: getAuthHeaders() });
  return response.data;
};

/**
 * Fetch Categories from backend
 * Endpoint: POST /api/admin/category/view
 */
export const fetchCategoriesApi = async () => {
  const url = `${getBaseUrl()}/category/view`;
  const response = await axios.post(
    url,
    { limit: 100 },
    { headers: getAuthHeaders() }
  );
  return response.data?._data || response.data?.data || [];
};

/**
 * Fetch Collections from backend
 * Endpoint: POST /api/admin/collections/view
 */
export const fetchCollectionsApi = async () => {
  const url = `${getBaseUrl()}/collections/view`;
  const response = await axios.post(
    url,
    { page: 1, limit: 100 },
    { headers: getAuthHeaders() }
  );
  return response.data?._data || response.data?.data || [];
};
