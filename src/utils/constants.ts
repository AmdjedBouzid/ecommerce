import { Link as LinkType } from "@/utils/types/link";
import { House, ShoppingBasket, Grid, Star, Phone } from "lucide-react";
import { DeliveryCompany } from "./types/DeliveryCompany";
// export const DOMAIN = "http://localhost:5000";
export const DOMAIN = "https://backend2-qgwd.onrender.com";
export const adminRoutes: LinkType[] = [
  {
    name: "Products",
    to: "/Admin/Products",
  },
  {
    name: "Categories",
    to: "/Admin/Categories",
  },
  {
    name: "Orders",
    to: "/Admin/Orders",
  },
];
export const linksLit: LinkType[] = [
  {
    name: "Home",
    icon: House,
    to: "/",
  },
  {
    name: "Products",
    icon: ShoppingBasket,
    to: "#products",
  },
  {
    name: "Categories",
    icon: Grid,
    to: "#categories",
  },
  {
    name: "Features",
    icon: Star,
    to: "#features",
  },
  {
    name: "Contact",
    icon: Phone,
    to: "#contact",
  },
];

export const deliveryCompany: DeliveryCompany = {
  id: 1,
  name: "yalidine",
  states: [
    {
      id: 1,
      name: "Adrar",
      municipalities: [
        { id: 101, name: "Adrar", prices: { home: 700, deliveryOffice: 450 } },
        {
          id: 102,
          name: "Reggane",
          prices: { home: 750, deliveryOffice: 480 },
        },
      ],
    },
    {
      id: 2,
      name: "Chlef",
      municipalities: [
        { id: 201, name: "Chlef", prices: { home: 600, deliveryOffice: 400 } },
        { id: 202, name: "Tenes", prices: { home: 630, deliveryOffice: 410 } },
      ],
    },
    {
      id: 3,
      name: "Laghouat",
      municipalities: [
        {
          id: 301,
          name: "Laghouat",
          prices: { home: 620, deliveryOffice: 420 },
        },
        { id: 302, name: "Aflou", prices: { home: 640, deliveryOffice: 430 } },
      ],
    },
    {
      id: 4,
      name: "Oum El Bouaghi",
      municipalities: [
        {
          id: 401,
          name: "Oum El Bouaghi",
          prices: { home: 610, deliveryOffice: 400 },
        },
        {
          id: 402,
          name: "Ain Beida",
          prices: { home: 620, deliveryOffice: 410 },
        },
      ],
    },
    {
      id: 5,
      name: "Batna",
      municipalities: [
        { id: 501, name: "Batna", prices: { home: 590, deliveryOffice: 390 } },
        { id: 502, name: "Barika", prices: { home: 600, deliveryOffice: 400 } },
      ],
    },
    {
      id: 6,
      name: "Béjaïa",
      municipalities: [
        { id: 601, name: "Béjaïa", prices: { home: 580, deliveryOffice: 370 } },
        { id: 602, name: "Akbou", prices: { home: 590, deliveryOffice: 380 } },
      ],
    },
    {
      id: 7,
      name: "Biskra",
      municipalities: [
        { id: 701, name: "Biskra", prices: { home: 570, deliveryOffice: 360 } },
        { id: 702, name: "Tolga", prices: { home: 580, deliveryOffice: 370 } },
      ],
    },
    {
      id: 8,
      name: "Béchar",
      municipalities: [
        { id: 801, name: "Béchar", prices: { home: 730, deliveryOffice: 480 } },
        { id: 802, name: "Taghit", prices: { home: 740, deliveryOffice: 490 } },
      ],
    },
    {
      id: 9,
      name: "Blida",
      municipalities: [
        { id: 901, name: "Blida", prices: { home: 500, deliveryOffice: 300 } },
        {
          id: 902,
          name: "Boufarik",
          prices: { home: 510, deliveryOffice: 310 },
        },
      ],
    },
    {
      id: 10,
      name: "Bouira",
      municipalities: [
        {
          id: 1001,
          name: "Bouira",
          prices: { home: 560, deliveryOffice: 350 },
        },
        {
          id: 1002,
          name: "Sour El Ghozlane",
          prices: { home: 570, deliveryOffice: 360 },
        },
      ],
    },
    {
      id: 11,
      name: "Tamanrasset",
      municipalities: [
        {
          id: 1101,
          name: "Tamanrasset",
          prices: { home: 850, deliveryOffice: 600 },
        },
        {
          id: 1102,
          name: "In Salah",
          prices: { home: 870, deliveryOffice: 620 },
        },
      ],
    },
    {
      id: 12,
      name: "Tébessa",
      municipalities: [
        {
          id: 1201,
          name: "Tébessa",
          prices: { home: 580, deliveryOffice: 370 },
        },
        {
          id: 1202,
          name: "El Ogla",
          prices: { home: 590, deliveryOffice: 380 },
        },
      ],
    },
    {
      id: 13,
      name: "Tlemcen",
      municipalities: [
        {
          id: 1301,
          name: "Tlemcen",
          prices: { home: 550, deliveryOffice: 340 },
        },
        {
          id: 1302,
          name: "Maghnia",
          prices: { home: 560, deliveryOffice: 350 },
        },
      ],
    },
    {
      id: 14,
      name: "Tiaret",
      municipalities: [
        {
          id: 1401,
          name: "Tiaret",
          prices: { home: 590, deliveryOffice: 370 },
        },
        {
          id: 1402,
          name: "Mahdia",
          prices: { home: 600, deliveryOffice: 380 },
        },
      ],
    },
    {
      id: 15,
      name: "Tizi Ouzou",
      municipalities: [
        {
          id: 1501,
          name: "Tizi Ouzou",
          prices: { home: 540, deliveryOffice: 330 },
        },
        {
          id: 1502,
          name: "Draa Ben Khedda",
          prices: { home: 550, deliveryOffice: 340 },
        },
      ],
    },
    {
      id: 16,
      name: "Alger",
      municipalities: [
        {
          id: 1601,
          name: "Bab El Oued",
          prices: { home: 500, deliveryOffice: 300 },
        },
        {
          id: 1602,
          name: "El Madania",
          prices: { home: 600, deliveryOffice: 350 },
        },
      ],
    },
    {
      id: 17,
      name: "Djelfa",
      municipalities: [
        {
          id: 1701,
          name: "Djelfa",
          prices: { home: 610, deliveryOffice: 400 },
        },
        {
          id: 1702,
          name: "Hassi Bahbah",
          prices: { home: 620, deliveryOffice: 410 },
        },
      ],
    },
    {
      id: 18,
      name: "Jijel",
      municipalities: [
        { id: 1801, name: "Jijel", prices: { home: 560, deliveryOffice: 350 } },
        {
          id: 1802,
          name: "El Milia",
          prices: { home: 570, deliveryOffice: 360 },
        },
      ],
    },
    {
      id: 19,
      name: "Sétif",
      municipalities: [
        { id: 1901, name: "Sétif", prices: { home: 580, deliveryOffice: 370 } },
        {
          id: 1902,
          name: "El Eulma",
          prices: { home: 590, deliveryOffice: 380 },
        },
      ],
    },
    {
      id: 20,
      name: "Saïda",
      municipalities: [
        { id: 2001, name: "Saïda", prices: { home: 620, deliveryOffice: 410 } },
        { id: 2002, name: "Youb", prices: { home: 630, deliveryOffice: 420 } },
      ],
    },
  ],
};
