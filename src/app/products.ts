export type Product = {
  id: string;
  name: string;
  region: string;
  heat: 1 | 2 | 3;
  price: number;
  emoji: string;
  accent: string;
  description: string;
};

export const products: Product[] = [
  {
    id: "avakaya",
    name: "Avakaya Mango",
    region: "Hyderabad",
    heat: 3,
    price: 320,
    emoji: "🥭",
    accent: "from-amber-400 to-orange-600",
    description:
      "Raw mango cured in mustard, red chilli, and cold-pressed sesame oil — the fiery flagship of every Deccan pantry.",
  },
  {
    id: "gongura",
    name: "Gongura Tokku",
    region: "Telangana",
    heat: 2,
    price: 280,
    emoji: "🌿",
    accent: "from-lime-500 to-emerald-700",
    description:
      "Tangy sorrel leaves slow-cooked with garlic and roasted spices for a bright, sour bite.",
  },
  {
    id: "nimmakaya",
    name: "Nimmakaya Lime",
    region: "Deccan Plateau",
    heat: 1,
    price: 240,
    emoji: "🍋",
    accent: "from-yellow-300 to-lime-500",
    description:
      "Sun-matured limes softened in salt and fenugreek — a mellow, zesty everyday companion.",
  },
  {
    id: "gharlic",
    name: "Garlic Thokku",
    region: "Bidar",
    heat: 2,
    price: 300,
    emoji: "🧄",
    accent: "from-rose-300 to-red-500",
    description:
      "Whole garlic cloves simmered in tamarind and chilli until jammy, sticky, and deeply savoury.",
  },
  {
    id: "tomato",
    name: "Tomato Pachadi",
    region: "Warangal",
    heat: 2,
    price: 260,
    emoji: "🍅",
    accent: "from-red-400 to-rose-700",
    description:
      "Ripe tomatoes cooked down with curry leaves and a tempering of mustard and cumin.",
  },
  {
    id: "chilli",
    name: "Red Chilli Kaaram",
    region: "Guntur",
    heat: 3,
    price: 340,
    emoji: "🌶️",
    accent: "from-orange-500 to-red-700",
    description:
      "Guntur chillies pounded with garlic and salt — a blazing, aromatic pickle for the brave.",
  },
];
