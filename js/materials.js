/* ═══════════════════════════════════════════════════════════
   MATERIALS DATA
   — Add entries here when new deliveries are scheduled
   — dates: array of { date: "YYYY-MM-DD", qty, note }
   — supplier / tel: vendor contact info
═══════════════════════════════════════════════════════════ */
const MATERIALS = [
  {
    name: "Door Fittings",
    category: "Architecture",
    supplier: "Majextic Home Thanawat",
    contact: "K. Yotchai",
    tel: "02-721-4194-5",
    dates: [
      { date: "2026-05-10", qty: "", note: "" },
      { date: "2026-05-30", qty: "", note: "" },
      { date: "2026-06-01", qty: "", note: "" },
    ]
  },
  {
    name: "Generator Set",
    category: "MEP — Electrical",
    supplier: "CYT",
    contact: "K. Phai",
    tel: "-",
    dates: [
      { date: "2026-05-15", qty: "", note: "" },
    ]
  },
  {
    name: "MDB & EMDB",
    category: "MEP — Electrical",
    supplier: "KT",
    contact: "K. Shetsak",
    tel: "098-830-4595",
    dates: [
      { date: "2026-05-01", qty: "", note: "may be changed" },
    ]
  },
  {
    name: "DB Panel",
    category: "MEP — Electrical",
    supplier: "KT",
    contact: "K. Shetsak",
    tel: "098-830-4595",
    dates: [
      { date: "2026-05-01", qty: "", note: "may be changed" },
    ]
  },
  {
    name: "Consumer Unit",
    category: "MEP — Electrical",
    supplier: "KT",
    contact: "K. Shetsak",
    tel: "098-830-4595",
    dates: [
      { date: "2026-05-01", qty: "", note: "may be changed" },
    ]
  },
  {
    name: "Switch & Outlet",
    category: "MEP — Electrical",
    supplier: "Marvel",
    contact: "K. Neuy",
    tel: "0935-909-556",
    dates: [
      { date: "2026-04-28", qty: "", note: "" },
      { date: "2026-05-15", qty: "", note: "" },
      { date: "2026-05-23", qty: "", note: "" },
    ]
  },
  {
    name: "RCU & Keycard",
    category: "MEP — Electrical",
    supplier: "Master Control",
    contact: "K. Lin",
    tel: "0863-240-614",
    dates: [
      { date: "2026-04-29", qty: "", note: "" },
      { date: "2026-05-15", qty: "", note: "" },
    ]
  },
  {
    name: "Light Fixture",
    category: "MEP — Electrical",
    supplier: "Sahasawat",
    contact: "K. Nee",
    tel: "088-786-0297",
    dates: [
      { date: "2026-01-15", qty: "", note: "" },
      { date: "2026-04-15", qty: "", note: "" },
      { date: "2026-05-15", qty: "", note: "" },
    ]
  },
  {
    name: "Central Battery & Emergency Downlight",
    category: "MEP — Electrical",
    supplier: "Sahasawat",
    contact: "K. Nee",
    tel: "0887-860-297",
    dates: [
      { date: "2026-04-07", qty: "", note: "" },
      { date: "2026-04-28", qty: "", note: "" },
      { date: "2026-05-23", qty: "", note: "" },
    ]
  },
  {
    name: "Emergency & Exit Light",
    category: "MEP — Electrical",
    supplier: "Sahasawat",
    contact: "K. Nee",
    tel: "0887-860-297",
    dates: [
      { date: "2026-04-07", qty: "", note: "" },
      { date: "2026-04-28", qty: "", note: "" },
      { date: "2026-05-23", qty: "", note: "" },
    ]
  },
  {
    name: "Computer & Server Network",
    category: "MEP — Electrical",
    supplier: "Phatshat",
    contact: "K. Phat",
    tel: "0846-529-479",
    dates: [
      { date: "2026-04-07", qty: "", note: "" },
      { date: "2026-04-28", qty: "", note: "" },
      { date: "2026-05-23", qty: "", note: "" },
    ]
  },
  {
    name: "WiFi + Digital TV",
    category: "MEP — Electrical",
    supplier: "Phatshat",
    contact: "K. Phat",
    tel: "084-652-9479",
    dates: []
  },
  {
    name: "CCTV",
    category: "MEP — Electrical",
    supplier: "By Owner",
    contact: "K. Tum",
    tel: "-",
    dates: []
  },
  {
    name: "Hot Water Pump",
    category: "MEP — Plumbing",
    supplier: "Heismann",
    contact: "K. Thatyawutt",
    tel: "0898-954-236",
    dates: [
      { date: "2026-05-20", qty: "", note: "" },
    ]
  },
  {
    name: "Hot Water Tank",
    category: "MEP — Plumbing",
    supplier: "Heismann",
    contact: "K. Thatyawutt",
    tel: "0898-954-236",
    dates: [
      { date: "2026-05-20", qty: "", note: "" },
    ]
  },
  {
    name: "Hot Water Return Pump",
    category: "MEP — Plumbing",
    supplier: "Heismann",
    contact: "K. Thatyawutt",
    tel: "0898-954-236",
    dates: [
      { date: "2026-05-20", qty: "", note: "" },
    ]
  },
  {
    name: "Swimming Pool",
    category: "Architecture",
    supplier: "Nara",
    contact: "K. Suphaporn",
    tel: "081-641-4941",
    dates: []
  },
  {
    name: "Kitchen Equipment",
    category: "Interior — FF&E",
    supplier: "SD Stainless",
    contact: "K. Shinnawattra",
    tel: "086-341-9410",
    dates: []
  },
  {
    name: "Door Frame",
    category: "Architecture",
    supplier: "Kriang Charoen Company Limited",
    contact: "K. Parita",
    tel: "092-942-6466",
    dates: [
      { date: "2026-04-21", qty: "", note: "FL 2A/2B" },
      { date: "2026-04-27", qty: "", note: "FL 3A/3B" },
      { date: "2026-05-10", qty: "", note: "FL 4A/4B" },
      { date: "2026-05-17", qty: "", note: "FL 5A/5B" },
      { date: "2026-05-30", qty: "", note: "FL 6A/6B" },
      { date: "2026-06-01", qty: "", note: "FL 7A/7B" },
      { date: "2026-06-01", qty: "", note: "FL 8A/8B" },
    ]
  },
  {
    name: "Site Material Delivery",
    category: "MEP — Electrical",
    supplier: "Wanroot Team",
    contact: "K Pah",
    tel: "",
    dates: [
      { date: "2026-04-24", qty: "", note: "On-site delivery" }
    ]
  },
];
