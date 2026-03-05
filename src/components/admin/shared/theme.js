export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Poppins', sans-serif !important; background: #FFFFFF; color: #1A1208; }
  input, textarea, select, button { font-family: 'Poppins', sans-serif !important; }
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: #FFFFFF; }
  ::-webkit-scrollbar-thumb { background: #C17B3F88; border-radius: 4px; }
  @media (max-width: 900px) { .ank-sidebar { transform: translateX(-100%) !important; } .ank-sidebar.open { transform: translateX(0) !important; } .ank-main { margin-left: 0 !important; } }
  @media (max-width: 768px) { .ank-menu-btn { display: flex !important; } }
  .msg-tabs { display: flex; gap: 6px; margin-bottom: 20px; flex-wrap: wrap; }
  .msg-tab-btn { display: flex; align-items: center; gap: 6px; }
  .bulk-layout { display: grid; grid-template-columns: minmax(0,1.5fr) minmax(0,1fr); gap: 18px; }
  .bulk-side { display: flex; flex-direction: column; gap: 14px; }
  .bulk-actions { display: flex; justify-content: flex-end; gap: 8px; }
  .compose-layout { display: grid; grid-template-columns: minmax(0,1.5fr) minmax(0,1fr); gap: 18px; }
  .compose-actions { display: flex; justify-content: flex-end; gap: 8px; }
  .ov-panels {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas:
      "recent"
      "sales";
    gap: 18px;
    margin-bottom: 18px;
  }
  .ov-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(180px,1fr));
    gap: 14px;
    margin-bottom: 22px;
  }
  .ov-recent { grid-area: recent; min-width: 0; }
  .ov-sales { grid-area: sales; min-width: 0; }
  .mobile-only { display: none; }
  @media (max-width: 600px) {
    .msg-tabs { flex-wrap: nowrap; }
    .msg-tab-btn {
      flex: 1 1 0;
      min-width: 0;
      justify-content: center;
      padding: 8px 10px !important;
      font-size: 12px !important;
    }
    .msg-tab-label {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  @media (max-width: 900px) {
    .bulk-layout { grid-template-columns: 1fr; }
    .bulk-actions { flex-direction: column; }
    .bulk-actions button { width: 100%; justify-content: center; }
    .compose-layout { grid-template-columns: 1fr; }
    .compose-actions { flex-direction: column; }
    .compose-actions button { width: 100%; justify-content: center; }
    .ov-panels {
      grid-template-columns: 1fr;
      grid-template-areas:
        "recent"
        "sales";
      gap: 16px;
    }
  }
  @media (max-width: 760px) {
    .ov-stats { grid-template-columns: repeat(2, minmax(0,1fr)); gap: 10px; }
    .desktop-table-wrap { display: none !important; }
    .mobile-only { display: block; }
    .mobile-list { display: flex; flex-direction: column; gap: 10px; padding: 12px; }
    .mobile-item {
      border: 1px solid #EAE2D8;
      border-radius: 12px;
      background: #FFFFFF;
      padding: 12px;
    }
    .mobile-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; margin-bottom: 10px; }
    .mobile-id {
      display: inline-block;
      background: #F5F0EB;
      border-radius: 8px;
      padding: 3px 8px;
      font-size: 12px;
      font-weight: 700;
      color: #4A3728;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .mobile-title { font-size: 13px; font-weight: 700; color: #1A1208; }
    .mobile-sub { font-size: 11px; color: #9E8B7A; margin-top: 2px; }
    .mobile-rows { display: flex; flex-direction: column; gap: 7px; }
    .mobile-row { display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; }
    .mobile-k { color: #4A3728; font-size: 12px; }
    .mobile-v { color: #1A1208; font-size: 12px; font-weight: 600; text-align: right; max-width: 58%; word-break: break-word; }
    .mobile-actions { margin-top: 10px; display: flex; flex-wrap: wrap; gap: 6px; justify-content: flex-end; }
  }
`;

export const C = {
  bg: "#F5F0EB", white: "#FFFFFF", border: "#EAE2D8",
  brown: "#C17B3F", brownDark: "#9E5F28", brownLight: "#FEF3E8",
  text: "#1A1208", textMed: "#4A3728", textMuted: "#9E8B7A",
  green: "#2E7D52", greenBg: "#EAF7EE",
  red: "#D94F3D", redBg: "#FDECEA",
  blue: "#2E6FAA", blueBg: "#EBF4FB",
  shadow: "0 1px 4px rgba(0,0,0,0.07)",
  shadowMd: "0 4px 20px rgba(0,0,0,0.12)",
};

export const ADMIN_ROUTES = {
  overview: "/admin/dashboard",
  messages: "/admin/messages",
  products: "/admin/products",
  orders: "/admin/orders",
  earnings: "/admin/earnings",
  customers: "/admin/customers",
  reviews: "/admin/reviews",
  notifications: "/admin/notifications",
};

export const NAV_GROUPS = [
  {
    group: "Productivity",
    items: [
      { id: "overview", icon: "bx-grid-alt", label: "Overview", path: ADMIN_ROUTES.overview },
      { id: "messages", icon: "bx-message-dots", label: "Messages", path: ADMIN_ROUTES.messages },
      { id: "products", label: "Products", path: ADMIN_ROUTES.products },
    ],
  },
  {
    group: "Market Insights",
    items: [
      { id: "orders", icon: "bx-cart", label: "Orders", path: ADMIN_ROUTES.orders },
      { id: "earnings", icon: "bx-line-chart", label: "Earnings", path: ADMIN_ROUTES.earnings },
    ],
  },
  {
    group: "Profile & Settings",
    items: [
      { id: "customers", icon: "bx-group", label: "Customers", path: ADMIN_ROUTES.customers },
      { id: "reviews", icon: "bx-star", label: "Reviews", path: ADMIN_ROUTES.reviews },
      {
        id: "notifications",
        icon: "bx-bell",
        label: "Notifications",
        path: ADMIN_ROUTES.notifications,
        badge: true,
      },
    ],
  },
];

export const NAV_ITEMS = NAV_GROUPS.flatMap((group) => group.items);

export function getActiveAdminPage(pathname) {
  const match = NAV_ITEMS.find((item) => pathname === item.path || pathname.startsWith(`${item.path}/`));
  return match?.id ?? "overview";
}

export const CUSTOMERS = [
  { id: 1, name: "Adaeze Okafor", email: "adaeze@email.com", orders: 12, spent: 245000, joined: "Jan 2025", tier: "vip", av: "AO" },
  { id: 2, name: "Funmi Adeyemi", email: "funmi@email.com", orders: 7, spent: 98500, joined: "Mar 2025", tier: "regular", av: "FA" },
  { id: 3, name: "Chisom Eze", email: "chisom@email.com", orders: 3, spent: 34200, joined: "Jun 2025", tier: "regular", av: "CE" },
  { id: 4, name: "Ngozi Nwachukwu", email: "ngozi@email.com", orders: 18, spent: 387000, joined: "Nov 2024", tier: "vip", av: "NN" },
  { id: 5, name: "Blessing Osei", email: "blessing@email.com", orders: 5, spent: 67800, joined: "Aug 2025", tier: "regular", av: "BO" },
  { id: 6, name: "Amaka Obiora", email: "amaka@email.com", orders: 9, spent: 154000, joined: "Dec 2024", tier: "regular", av: "AO" },
  { id: 7, name: "Yetunde Badmus", email: "yetunde@email.com", orders: 22, spent: 520000, joined: "Oct 2024", tier: "vip", av: "YB" },
];

export const PRODUCTS_INIT = [
  { id: 1, name: "Adire Indigo Fabric", category: "Ankara Fabrics", price: 4500, stock: 23, status: "in_stock", sold: 45, type: "Cotton" },
  { id: 2, name: "Gold Aso-Oke Set", category: "Aso-Ebi", price: 28000, stock: 4, status: "low_stock", sold: 12, type: "Silk" },
  { id: 3, name: "Ankara Print Dress", category: "Ready to Wear", price: 12500, stock: 0, status: "out_of_stock", sold: 78, type: "Ankara" },
  { id: 4, name: "Beaded Gele Headtie", category: "Accessories", price: 6800, stock: 11, status: "in_stock", sold: 34, type: "Beaded" },
  { id: 5, name: "Kente Fabric Roll", category: "Ankara Fabrics", price: 9200, stock: 2, status: "low_stock", sold: 20, type: "Kente" },
  { id: 6, name: "Cowrie Shell Necklace", category: "Accessories", price: 3400, stock: 0, status: "out_of_stock", sold: 55, type: "Shell" },
];

export const ORDERS_INIT = [
  { id: "ORD-2841", customerId: 1, customer: "Adaeze Okafor", items: "Gold Aso-Oke Set x1", total: 28000, date: "Feb 25, 2026", status: "pending", address: "14 Allen Ave, Lagos" },
  { id: "ORD-2840", customerId: 2, customer: "Funmi Adeyemi", items: "Ankara Print Dress x2", total: 25000, date: "Feb 25, 2026", status: "processing", address: "7 Independence Rd, Ibadan" },
  { id: "ORD-2839", customerId: 3, customer: "Chisom Eze", items: "Cowrie Shell Necklace x1, Gele x1", total: 10200, date: "Feb 24, 2026", status: "cancelled", address: "22 Aba Rd, Port Harcourt" },
  { id: "ORD-2838", customerId: 4, customer: "Ngozi Nwachukwu", items: "Kente Fabric Roll x2", total: 18400, date: "Feb 24, 2026", status: "completed", address: "5 Wuse II, Abuja" },
  { id: "ORD-2837", customerId: 5, customer: "Blessing Osei", items: "Adire Indigo Fabric x3", total: 13500, date: "Feb 23, 2026", status: "completed", address: "Accra, Ghana" },
  { id: "ORD-2836", customerId: 6, customer: "Amaka Obiora", items: "Aso-Ebi Lace Set x1", total: 35000, date: "Feb 23, 2026", status: "pending", address: "10 Ikoyi Crescent, Lagos" },
  { id: "ORD-2835", customerId: 7, customer: "Yetunde Badmus", items: "Kente Fabric Roll x1", total: 9200, date: "Feb 22, 2026", status: "completed", address: "3 Victoria Island, Lagos" },
];

export const REVIEWS_INIT = [
  { id: 1, customer: "Adaeze Okafor", av: "AO", product: "Gold Aso-Oke Set", rating: 5, comment: "Absolutely stunning quality! The fabric is rich and the colour is exactly as pictured.", date: "Feb 22", replied: false },
  { id: 2, customer: "Ngozi Nwachukwu", av: "NN", product: "Adire Indigo Fabric", rating: 4, comment: "Beautiful fabric, fast delivery. Slightly darker than expected but gorgeous.", date: "Feb 20", replied: true },
  { id: 3, customer: "Funmi Adeyemi", av: "FA", product: "Ankara Print Dress", rating: 5, comment: "Perfect fit! The dress is well-sewn and the pattern is so vibrant.", date: "Feb 18", replied: false },
  { id: 4, customer: "Blessing Osei", av: "BO", product: "Cowrie Shell Necklace", rating: 3, comment: "Nice piece but took longer to arrive than expected.", date: "Feb 15", replied: true },
];

export const NOTIFS_INIT = [
  { id: 1, type: "order", title: "New Order Placed", message: "ORD-2841 from Adaeze Okafor — ₦28,000", time: "2 min ago", read: false, replied: false },
  { id: 2, type: "low_stock", title: "Low Stock Alert", message: "Gold Aso-Oke Set — only 4 units remaining", time: "15 min ago", read: false },
  { id: 3, type: "order", title: "New Order Placed", message: "ORD-2840 from Funmi Adeyemi — ₦25,000", time: "1 hr ago", read: false, replied: false },
  { id: 4, type: "out_of_stock", title: "Out of Stock!", message: "Ankara Print Dress is now out of stock", time: "2 hrs ago", read: true },
  { id: 5, type: "low_stock", title: "Low Stock Alert", message: "Kente Fabric Roll — only 2 units remaining", time: "3 hrs ago", read: true },
  { id: 6, type: "out_of_stock", title: "Out of Stock!", message: "Cowrie Shell Necklace is now out of stock", time: "5 hrs ago", read: true },
];

export const MSGS_INIT = [
  { id: 1, from: "Adaeze Okafor", email: "adaeze@email.com", body: "Thank you for your purchase! We hope you love your new item 🎉", type: "sent", time: "Feb 22", isBulk: false },
  { id: 2, from: "Funmi Adeyemi", email: "funmi@email.com", body: "Hi, I wanted to ask about the delivery time for my order?", type: "received", time: "Feb 24", isBulk: false },
  { id: 3, from: "All Customers", email: "—", body: "BULK: Thank you all for shopping with us this season!", type: "sent", time: "Feb 21", isBulk: true },
];

export const QUICK_TEMPLATES = [
  {
    label: "Thank you for purchase",
    body: "Dear Customer,\n\nThank you so much for your recent purchase from fabricsby_tayejenifa! We truly appreciate your support and hope you love your new item.\n\nIf you have any questions, please don't hesitate to reach out.\n\nWarm regards,\nfabricsby_tayejenifa Team 🪡",
  },
  {
    label: "Out of stock notice",
    body: "Dear Customer,\n\nWe regret to inform you that the item you ordered is currently out of stock. We sincerely apologise for the inconvenience.\n\nWould you like a replacement, or shall we process a full refund? Please let us know.\n\nKind regards,\nfabricsby_tayejenifa Team",
  },
  {
    label: "Order shipped",
    body: "Dear Customer,\n\nGreat news! Your order has been shipped and is on its way to you. You can expect delivery within 3–5 business days.\n\nThank you for shopping with us!\n\nfabricsby_tayejenifa Team 🎉",
  },
  {
    label: "Exclusive discount offer",
    body: "Dear Customer,\n\nAs a valued customer, we're delighted to offer you an exclusive discount on your next purchase!\n\nUse code ANKARA15 at checkout for 15% off your entire order.\n\nShop now — offer valid for 7 days!\n\nfabricsby_tayejenifa Team",
  },
];

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
export const LENGTHS = ["1 yard", "2 yards", "3 yards", "4 yards", "5 yards", "6 yards", "Custom"];
export const INCHES_LIST = ['4"', '6"', '8"', '10"', '12"', '14"', '16"', '18"', '20"', "Custom"];

export const PRESET_COLORS = [
  { name: "Royal Blue", hex: "#1a3a8f" }, { name: "Crimson", hex: "#9b1c1c" },
  { name: "Gold", hex: "#C17B3F" }, { name: "Forest Green", hex: "#1a5c2a" },
  { name: "Purple", hex: "#5b2d8e" }, { name: "Ivory", hex: "#f5e6c8" },
  { name: "Black", hex: "#1a1108" }, { name: "Orange", hex: "#c1440e" },
  { name: "Teal", hex: "#0d6e6e" }, { name: "Pink", hex: "#c94f8a" },
  { name: "White", hex: "#f0f0f0" }, { name: "Navy", hex: "#0d1f4c" },
];

export const stockSt = (n) => (n === 0 ? "out_of_stock" : n <= 4 ? "low_stock" : "in_stock");
export const fmt = (n) => `₦${Number(n).toLocaleString()}`;

export function genCoupon(pct) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return `ANK${pct}OFF-` + Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}
