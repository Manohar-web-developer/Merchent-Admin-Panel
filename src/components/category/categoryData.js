export const initialCategoriesTree = [
  {
    id: "cat-1",
    name: "Furniture",
    productsCount: 120,
    children: [
      {
        id: "cat-1-1",
        name: "Living Room",
        productsCount: 45,
        children: [
          {
            id: "cat-1-1-1",
            name: "Sofas",
            productsCount: 18,
            children: [
              {
                id: "cat-1-1-1-1",
                name: "L-Shape Sofa",
                productsCount: 18,
                children: [
                  {
                    id: "cat-1-1-1-1-1",
                    name: "L-Shape Sofa 2 seater",
                    productsCount: 18,
                    children: [

                    ],
                  }
                ],
              }
            ],
          },
          {
            id: "cat-1-1-2",
            name: "Coffee Tables",
            productsCount: 12,
            children: [],
          },
          {
            id: "cat-1-1-3",
            name: "TV Units",
            productsCount: 15,
            children: [],
          },
        ],
      },
      {
        id: "cat-1-2",
        name: "Bedroom",
        productsCount: 35,
        children: [],
      },
      {
        id: "cat-1-3",
        name: "Dining Room",
        productsCount: 22,
        children: [],
      },
      {
        id: "cat-1-4",
        name: "Office Furniture",
        productsCount: 18,
        children: [],
      },
    ],
  },
  {
    id: "cat-2",
    name: "Electronics",
    productsCount: 90,
    children: [
      {
        id: "cat-2-1",
        name: "Mobiles",
        productsCount: 50,
        children: [
          {
            id: "cat-2-1-1",
            name: "Smartphones",
            productsCount: 30,
            children: [],
          },
          {
            id: "cat-2-1-2",
            name: "Feature Phones",
            productsCount: 20,
            children: [],
          },
        ],
      },
    ],
  },
];

export const initialTableRows = [
  {
    id: "1",
    name: "Furniture",
    parent: "—",
    status: "Active",
    productsCount: 120,
    createdAt: "22 Aug 2026, 10:30 AM",
  },
  {
    id: "2",
    name: "Living Room",
    parent: "Furniture",
    status: "Active",
    productsCount: 45,
    createdAt: "21 Aug 2026, 04:15 PM",
  },
  {
    id: "3",
    name: "Sofas",
    parent: "Living Room",
    status: "Active",
    productsCount: 18,
    createdAt: "20 Aug 2026, 11:20 AM",
  },
  {
    id: "4",
    name: "Coffee Tables",
    parent: "Living Room",
    status: "Active",
    productsCount: 12,
    createdAt: "19 Aug 2026, 03:45 PM",
  },
  {
    id: "5",
    name: "Bedroom",
    parent: "Furniture",
    status: "Active",
    productsCount: 35,
    createdAt: "18 Aug 2026, 09:10 AM",
  },
  {
    id: "6",
    name: "Electronics",
    parent: "—",
    status: "Active",
    productsCount: 90,
    createdAt: "17 Aug 2026, 02:30 PM",
  },
  {
    id: "7",
    name: "Mobiles",
    parent: "Electronics",
    status: "Active",
    productsCount: 50,
    createdAt: "16 Aug 2026, 01:20 PM",
  },
  {
    id: "8",
    name: "Smartphones",
    parent: "Mobiles",
    status: "Active",
    productsCount: 30,
    createdAt: "15 Aug 2026, 12:10 PM",
  },
];
