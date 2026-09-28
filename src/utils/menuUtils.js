/**
 * Utility functions for building and manipulating menu item trees and hierarchies.
 */

export function getItemId(item) {
  if (!item) return null;
  return item._id || item.id;
}

export function getParentId(item) {
  if (!item) return null;
  const rawParent = item.parentId;
  if (!rawParent) return null;
  if (typeof rawParent === "object") {
    return rawParent._id || rawParent.id || null;
  }
  return rawParent;
}

/**
 * Builds a hierarchical tree structure from a flat array of menu items.
 * Sorts items by sortOrder at each level.
 */
export function buildTree(items = []) {
  if (!Array.isArray(items)) return [];

  const map = {};
  const rootItems = [];

  // Create a map of deep-cloned items with empty children arrays
  items.forEach((item) => {
    const id = getItemId(item);
    if (id) {
      map[id] = {
        ...item,
        id,
        parentId: getParentId(item),
        children: [],
      };
    }
  });

  // Populate children arrays
  items.forEach((item) => {
    const id = getItemId(item);
    const pId = getParentId(item);

    if (id && map[id]) {
      if (pId && map[pId]) {
        map[pId].children.push(map[id]);
      } else {
        rootItems.push(map[id]);
      }
    }
  });

  // Recursive sort by sortOrder
  const sortNodes = (nodes) => {
    nodes.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    nodes.forEach((node) => {
      if (node.children && node.children.length > 0) {
        sortNodes(node.children);
      }
    });
    return nodes;
  };

  return sortNodes(rootItems);
}

/**
 * Flattens a nested tree structure into a flat array with depth information.
 */
export function flattenTree(tree = [], depth = 0, parentId = null) {
  const result = [];
  tree.forEach((node) => {
    const { children, ...rest } = node;
    result.push({
      ...rest,
      depth,
      parentId,
      hasChildren: Boolean(children && children.length > 0),
    });

    if (children && children.length > 0) {
      result.push(...flattenTree(children, depth + 1, node.id));
    }
  });
  return result;
}

/**
 * Generates the reorder payload for backend from tree or flat structure.
 */
export function generateReorderPayload(flatOrTreeItems) {
  // If given a flat list, recalculate sortOrder per parent
  const itemsByParent = {};

  flatOrTreeItems.forEach((item) => {
    const pId = getParentId(item) || "root";
    if (!itemsByParent[pId]) {
      itemsByParent[pId] = [];
    }
    itemsByParent[pId].push(item);
  });

  const payload = [];

  Object.keys(itemsByParent).forEach((pId) => {
    const group = itemsByParent[pId];
    group.forEach((item, index) => {
      payload.push({
        id: getItemId(item),
        parentId: pId === "root" ? null : pId,
        sortOrder: index,
      });
    });
  });

  return payload;
}

/**
 * Returns a list of descendant IDs for a given item ID (to prevent picking self or child as parent).
 */
export function getDescendantIds(items = [], targetId) {
  if (!targetId || !Array.isArray(items)) return new Set();

  const tree = buildTree(items);
  const descendantIds = new Set();

  const findAndAddChildren = (nodes) => {
    for (const node of nodes) {
      if (node.id === targetId) {
        // Collect all descendants of this node
        const collect = (children) => {
          for (const child of children) {
            descendantIds.add(child.id);
            if (child.children) collect(child.children);
          }
        };
        collect(node.children || []);
        break;
      } else if (node.children) {
        findAndAddChildren(node.children);
      }
    }
  };

  findAndAddChildren(tree);
  descendantIds.add(targetId); // include self
  return descendantIds;
}
