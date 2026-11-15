"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  ShoppingBag,
  Home,
  Plus,
  Check,
  ExternalLink,
  Search,
  Store,
  TrendingDown,
  PackageCheck,
  Layers,
  Trash2,
  Share2,
  RefreshCw,
  Tag,
  ChevronLeft,
  Sparkles,
  Building2,
  X,
} from "lucide-react";

const INITIAL_HOUSES = [
  { id: "house_1", name: "المنزل الأول (أم نايف)", color: "bg-teal-500", text: "text-teal-400", border: "border-teal-500/40", badge: "bg-teal-500/20 text-teal-300" },
  { id: "house_2", name: "المنزل الثاني", color: "bg-pink-500", text: "text-pink-400", border: "border-pink-500/40", badge: "bg-pink-500/20 text-pink-300" },
];

const CATEGORIES = [
  { id: "all", name: "الكل", icon: "🛒" },
  { id: "grains", name: "الأرز والأساسيات", icon: "🌾" },
  { id: "meat", name: "اللحوم والدواجن", icon: "🥩" },
  { id: "veg", name: "الخضار والفواكه", icon: "🥬" },
  { id: "dairy", name: "الألبان والأجبان", icon: "🧀" },
  { id: "cleaning", name: "المنظفات والورقيات", icon: "🧼" },
];

const INITIAL_CATALOG = [
  {
    id: "item_1",
    name: "أرز الشعلان مزة بسمتي 10 كيلو",
    category: "grains",
    unit: "كيس",
    defaultPrice: 74,
    d4dOffers: [
      { store: "أسواق العثيم", price: 68.95 },
      { store: "بنده", price: 72.5 },
      { store: "كارفور", price: 74.0 },
    ],
  },
  {
    id: "item_2",
    name: "دجاج ساديا مجمد 10×1000 جرام",
    category: "meat",
    unit: "كرتون",
    defaultPrice: 148,
    d4dOffers: [
      { store: "بنده", price: 134.95 },
      { store: "أسواق العثيم", price: 139.0 },
      { store: "الدانوب", price: 146.0 },
    ],
  },
  {
    id: "item_3",
    name: "زيت طبخ العربي 2×1.5 لتر",
    category: "grains",
    unit: "عبوة",
    defaultPrice: 39,
    d4dOffers: [
      { store: "كارفور", price: 31.95 },
      { store: "أسواق العثيم", price: 34.5 },
      { store: "بنده", price: 36.0 },
    ],
  },
  {
    id: "item_4",
    name: "حليب المراعي طويل الأجل 12×1 لتر",
    category: "dairy",
    unit: "كرتون",
    defaultPrice: 68,
    d4dOffers: [
      { store: "أسواق العثيم", price: 58.95 },
      { store: "اللولو هايبر", price: 61.0 },
      { store: "بنده", price: 64.0 },
    ],
  },
  {
    id: "item_5",
    name: "مسحوق غسيل تايد 7 كيلو",
    category: "cleaning",
    unit: "كيس",
    defaultPrice: 66,
    d4dOffers: [
      { store: "بنده", price: 54.95 },
      { store: "كارفور", price: 57.5 },
      { store: "أسواق العثيم", price: 59.0 },
    ],
  },
  {
    id: "item_6",
    name: "طماطم محلي طازج",
    category: "veg",
    unit: "كيلو",
    defaultPrice: 7,
    d4dOffers: [
      { store: "أسواق العثيم", price: 4.95 },
      { store: "بنده", price: 5.95 },
    ],
  },
  {
    id: "item_7",
    name: "جبن كرافت شيدر 480 جرام",
    category: "dairy",
    unit: "علبة",
    defaultPrice: 24,
    d4dOffers: [
      { store: "اللولو هايبر", price: 18.95 },
      { store: "كارفور", price: 20.5 },
    ],
  },
  {
    id: "item_8",
    name: "مناديل وجه فاين 10 عبوات",
    category: "cleaning",
    unit: "شدة",
    defaultPrice: 28,
    d4dOffers: [
      { store: "كارفور", price: 21.95 },
      { store: "بنده", price: 23.5 },
    ],
  },
];

const INITIAL_ORDERS = [
  { id: "ord_1", houseId: "house_1", itemId: "item_1", qty: 2, cycle: "شهري", actualPrice: 68.95, bought: false, sorted: false },
  { id: "ord_2", houseId: "house_2", itemId: "item_1", qty: 1, cycle: "شهري", actualPrice: 68.95, bought: false, sorted: false },
  { id: "ord_3", houseId: "house_1", itemId: "item_2", qty: 1, cycle: "شهري", actualPrice: 134.95, bought: false, sorted: false },
  { id: "ord_4", houseId: "house_2", itemId: "item_4", qty: 2, cycle: "أسبوعي", actualPrice: 58.95, bought: false, sorted: false },
  { id: "ord_5", houseId: "house_1", itemId: "item_5", qty: 1, cycle: "شهري", actualPrice: 54.95, bought: false, sorted: false },
];

const HOUSE_COLORS = [
  { color: "bg-teal-500", text: "text-teal-400", border: "border-teal-500/40", badge: "bg-teal-500/20 text-teal-300" },
  { color: "bg-pink-500", text: "text-pink-400", border: "border-pink-500/40", badge: "bg-pink-500/20 text-pink-300" },
  { color: "bg-sky-500", text: "text-sky-400", border: "border-sky-500/40", badge: "bg-sky-500/20 text-sky-300" },
  { color: "bg-amber-500", text: "text-amber-400", border: "border-amber-500/40", badge: "bg-amber-500/20 text-amber-300" },
  { color: "bg-purple-500", text: "text-purple-400", border: "border-purple-500/40", badge: "bg-purple-500/20 text-purple-300" },
];

export default function MaqadinaPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [houses, setHouses] = useState(INITIAL_HOUSES);
  const [catalog, setCatalog] = useState(INITIAL_CATALOG);
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  const [activeRole, setActiveRole] = useState("master"); // 'master' or houseId
  const [masterTab, setMasterTab] = useState("unified"); // 'unified' | 'markets' | 'sorting'
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cycleType, setCycleType] = useState("شهري");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortFilter, setSortFilter] = useState("cheapest"); // 'cheapest' | 'saving' | 'default'
  const [marketFilter, setMarketFilter] = useState("all");

  // Modals
  const [showAddHouseModal, setShowAddHouseModal] = useState(false);
  const [newHouseName, setNewHouseName] = useState("");
  const [selectedColorIdx, setSelectedColorIdx] = useState(2);

  const [showCustomItemModal, setShowCustomItemModal] = useState(false);
  const [customItem, setCustomItem] = useState({
    name: "",
    category: "grains",
    unit: "حبة",
    price: "",
    qty: 1,
    storeName: "أسواق العثيم",
    targetHouse: "house_1",
  });

  // Load from LocalStorage
  useEffect(() => {
    try {
      const savedHouses = localStorage.getItem("maqadina_houses");
      const savedCatalog = localStorage.getItem("maqadina_catalog");
      const savedOrders = localStorage.getItem("maqadina_orders");
      if (savedHouses) setHouses(JSON.parse(savedHouses));
      if (savedCatalog) setCatalog(JSON.parse(savedCatalog));
      if (savedOrders) setOrders(JSON.parse(savedOrders));
    } catch (e) {
      console.error(e);
    }
    setIsLoaded(true);
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("maqadina_houses", JSON.stringify(houses));
    localStorage.setItem("maqadina_catalog", JSON.stringify(catalog));
    localStorage.setItem("maqadina_orders", JSON.stringify(orders));
  }, [houses, catalog, orders, isLoaded]);

  // Helper: get best D4D offer for an item
  const getBestOffer = (item) => {
    if (!item?.d4dOffers || item.d4dOffers.length === 0) {
      return { store: "سعر تقديري", price: item?.defaultPrice || 0 };
    }
    return [...item.d4dOffers].sort((a, b) => a.price - b.price)[0];
  };

  // Unified items calculation for Master View
  const unifiedItems = useMemo(() => {
    const map = {};
    orders.forEach((ord) => {
      const item = catalog.find((c) => c.id === ord.itemId);
      if (!item) return;
      const best = getBestOffer(item);
      if (!map[ord.itemId]) {
        map[ord.itemId] = {
          item,
          totalQty: 0,
          unitPrice: ord.actualPrice ?? best.price,
          bestOffer: best,
          savingPerUnit: Math.max(0, (item.defaultPrice || best.price) - best.price),
          allBought: true,
          breakdown: [],
        };
      }
      map[ord.itemId].totalQty += Number(ord.qty);
      if (!ord.bought) map[ord.itemId].allBought = false;
      map[ord.itemId].breakdown.push(ord);
    });

    let list = Object.values(map);

    if (marketFilter !== "all") {
      list = list.filter((entry) => entry.bestOffer.store === marketFilter);
    }

    if (sortFilter === "cheapest") {
      list.sort((a, b) => a.unitPrice - b.unitPrice);
    } else if (sortFilter === "saving") {
      list.sort((a, b) => b.savingPerUnit * b.totalQty - a.savingPerUnit * a.totalQty);
    }

    return list;
  }, [orders, catalog, sortFilter, marketFilter]);

  // Markets grouped by lowest price
  const marketsSummary = useMemo(() => {
    const storesMap = {};
    unifiedItems.forEach((entry) => {
      const storeName = entry.bestOffer.store;
      if (!storesMap[storeName]) {
        storesMap[storeName] = {
          store: storeName,
          items: [],
          totalCost: 0,
          totalSavings: 0,
        };
      }
      const lineTotal = entry.totalQty * entry.unitPrice;
      const lineSaving = entry.totalQty * entry.savingPerUnit;
      storesMap[storeName].items.push(entry);
      storesMap[storeName].totalCost += lineTotal;
      storesMap[storeName].totalSavings += lineSaving;
    });

    return Object.values(storesMap).sort((a, b) => a.totalCost - b.totalCost);
  }, [unifiedItems]);

  // Add new house
  const handleAddHouse = (e) => {
    e.preventDefault();
    if (!newHouseName.trim()) return;
    const style = HOUSE_COLORS[selectedColorIdx % HOUSE_COLORS.length];
    const newHouse = {
      id: `house_${Date.now()}`,
      name: newHouseName.trim(),
      ...style,
    };
    setHouses([...houses, newHouse]);
    setNewHouseName("");
    setShowAddHouseModal(false);
  };

  // Add custom unlisted item
  const handleAddCustomItem = (e) => {
    e.preventDefault();
    if (!customItem.name.trim()) return;
    const priceNum = parseFloat(customItem.price) || 15;
    const newItemId = `custom_${Date.now()}`;
    const newCatItem = {
      id: newItemId,
      name: customItem.name.trim(),
      category: customItem.category,
      unit: customItem.unit || "حبة",
      defaultPrice: priceNum,
      d4dOffers: [{ store: customItem.storeName || "أسواق العثيم", price: priceNum }],
    };

    setCatalog([newCatItem, ...catalog]);

    const targetHouseId = activeRole === "master" ? customItem.targetHouse : activeRole;
    const newOrder = {
      id: `ord_${Date.now()}`,
      houseId: targetHouseId,
      itemId: newItemId,
      qty: Number(customItem.qty) || 1,
      cycle: cycleType,
      actualPrice: priceNum,
      bought: false,
      sorted: false,
    };
    setOrders((prev) => [...prev, newOrder]);
    setCustomItem({
      name: "",
      category: "grains",
      unit: "حبة",
      price: "",
      qty: 1,
      storeName: "أسواق العثيم",
      targetHouse: houses[0]?.id || "house_1",
    });
    setShowCustomItemModal(false);
  };

  // Update quantity for a house
  const updateHouseItemQty = (houseId, itemId, delta) => {
    const existing = orders.find((o) => o.houseId === houseId && o.itemId === itemId);
    const catItem = catalog.find((c) => c.id === itemId);
    const best = getBestOffer(catItem);

    if (existing) {
      const nextQty = existing.qty + delta;
      if (nextQty <= 0) {
        setOrders(orders.filter((o) => o.id !== existing.id));
      } else {
        setOrders(orders.map((o) => (o.id === existing.id ? { ...o, qty: nextQty } : o)));
      }
    } else if (delta > 0) {
      setOrders([
        ...orders,
        {
          id: `ord_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          houseId,
          itemId,
          qty: delta,
          cycle: cycleType,
          actualPrice: best.price,
          bought: false,
          sorted: false,
        },
      ]);
    }
  };

  // Update price in Master view
  const handlePriceChange = (itemId, newPrice) => {
    const val = parseFloat(newPrice) || 0;
    setOrders(orders.map((o) => (o.itemId === itemId ? { ...o, actualPrice: val } : o)));
  };

  // Toggle bought status for unified item
  const toggleBoughtUnified = (itemId, currentState) => {
    setOrders(orders.map((o) => (o.itemId === itemId ? { ...o, bought: !currentState } : o)));
  };

  // Toggle sorted status for individual house order
  const toggleSortedOrder = (orderId) => {
    setOrders(orders.map((o) => (o.id === orderId ? { ...o, sorted: !o.sorted } : o)));
  };

  // Share via WhatsApp
  const shareHouseWhatsApp = (house) => {
    const houseOrders = orders.filter((o) => o.houseId === house.id);
    if (houseOrders.length === 0) return;

    let total = 0;
    const lines = houseOrders.map((o, idx) => {
      const item = catalog.find((c) => c.id === o.itemId);
      const sub = o.qty * o.actualPrice;
      total += sub;
      return `${idx + 1}. ${item?.name} (${o.qty} ${item?.unit}) - ${sub.toFixed(2)} ر.س ${o.sorted ? "✅" : ""}`;
    });

    const text = `🛒 *قائمة مقاضي ${house.name}*\n━━━━━━━━━━━━━━\n${lines.join(
      "\n"
    )}\n━━━━━━━━━━━━━━\n💰 *الإجمالي:* ${total.toFixed(2)} ريال`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const grandTotal = useMemo(() => {
    return orders.reduce((acc, o) => acc + o.qty * (o.actualPrice || 0), 0);
  }, [orders]);

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 pb-24">
      {/* Top Header & Account Switcher */}
      <header className="sticky top-0 z-30 bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-800 px-4 py-3 shadow-lg">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-md shadow-teal-500/20">
                <ShoppingBag className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <div>
                <h1 className="text-lg font-extrabold tracking-tight text-white flex items-center gap-2">
                  مقاضينا
                  <span className="text-[11px] font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30 px-2 py-0.5 rounded-full">
                    مرتبط بـ D4D
                  </span>
                </h1>
                <p className="text-xs text-slate-400">إدارة مقاضي المنازل ومقارنة أقل الأسعار</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCustomItemModal(true)}
                className="flex items-center gap-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 px-3 py-2 rounded-xl transition"
              >
                <Plus className="w-4 h-4" />
                <span>صنف غير مدرج</span>
              </button>
              <button
                onClick={() => setShowAddHouseModal(true)}
                className="flex items-center gap-1.5 text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 px-3 py-2 rounded-xl transition shadow-md shadow-teal-500/10"
              >
                <Building2 className="w-4 h-4" />
                <span>+ إضافة بيت</span>
              </button>
            </div>
          </div>

          {/* Role Switcher Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setActiveRole("master")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                activeRole === "master"
                  ? "bg-gradient-to-l from-teal-500 to-cyan-500 text-slate-950 shadow-md shadow-teal-500/20"
                  : "bg-slate-800/90 text-slate-300 hover:bg-slate-700"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>حساب رب الأسرة (تجميع وفرز)</span>
            </button>

            {houses.map((house) => (
              <button
                key={house.id}
                onClick={() => setActiveRole(house.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
                  activeRole === house.id
                    ? `${house.color} text-slate-950 border-transparent shadow-md`
                    : `bg-slate-900/90 text-slate-300 ${house.border}`
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>{house.name}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-3xl mx-auto px-4 pt-4">
        {activeRole === "master" ? (
          /* ===================== MASTER VIEW (حساب رب الأسرة) ===================== */
          <div className="space-y-4">
            {/* Budget Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5">
                <span className="text-[11px] text-slate-400 block mb-1">الإجمالي الكلي للمنازل</span>
                <div className="text-lg font-extrabold text-teal-400">
                  {grandTotal.toFixed(2)} <span className="text-xs font-normal">ر.س</span>
                </div>
              </div>

              {houses.map((h) => {
                const houseTotal = orders
                  .filter((o) => o.houseId === h.id)
                  .reduce((sum, o) => sum + o.qty * (o.actualPrice || 0), 0);
                return (
                  <div key={h.id} className={`bg-slate-900/90 border ${h.border} rounded-2xl p-3.5`}>
                    <span className="text-[11px] text-slate-400 block mb-1 truncate">{h.name}</span>
                    <div className={`text-base font-extrabold ${h.text}`}>
                      {houseTotal.toFixed(2)} <span className="text-xs font-normal">ر.س</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Master Navigation Tabs */}
            <div className="grid grid-cols-3 gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
              <button
                onClick={() => setMasterTab("unified")}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                  masterTab === "unified"
                    ? "bg-teal-500 text-slate-950 shadow"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>1. الشراء الموحد ({unifiedItems.length})</span>
              </button>

              <button
                onClick={() => setMasterTab("markets")}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                  masterTab === "markets"
                    ? "bg-teal-500 text-slate-950 shadow"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <Store className="w-4 h-4" />
                <span>2. فرز الأسواق الأرخص</span>
              </button>

              <button
                onClick={() => setMasterTab("sorting")}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                  masterTab === "sorting"
                    ? "bg-teal-500 text-slate-950 shadow"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <PackageCheck className="w-4 h-4" />
                <span>3. الفرز للمنازل</span>
              </button>
            </div>

            {/* TAB 1: UNIFIED SHOPPING LIST */}
            {masterTab === "unified" && (
              <div className="space-y-3">
                {/* Sort & Market Filter Bar */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs text-slate-400 ml-1">ترتيب حسب:</span>
                    <button
                      onClick={() => setSortFilter("cheapest")}
                      className={`text-xs px-3 py-1.5 rounded-xl font-bold transition ${
                        sortFilter === "cheapest"
                          ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      الأقل سعراً أولاً
                    </button>
                    <button
                      onClick={() => setSortFilter("saving")}
                      className={`text-xs px-3 py-1.5 rounded-xl font-bold transition ${
                        sortFilter === "saving"
                          ? "bg-teal-500/20 text-teal-300 border border-teal-500/40"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      الأعلى توفيراً
                    </button>
                  </div>

                  <select
                    value={marketFilter}
                    onChange={(e) => setMarketFilter(e.target.value)}
                    className="bg-slate-800 text-xs text-slate-200 border border-slate-700 rounded-xl px-3 py-1.5 outline-none"
                  >
                    <option value="all">كل الأسواق (D4D)</option>
                    <option value="أسواق العثيم">أسواق العثيم</option>
                    <option value="بنده">بنده</option>
                    <option value="كارفور">كارفور</option>
                    <option value="اللولو هايبر">اللولو هايبر</option>
                  </select>
                </div>

                {/* Unified Items Cards */}
                {unifiedItems.map(({ item, totalQty, unitPrice, bestOffer, allBought, breakdown }) => {
                  const totalCost = totalQty * unitPrice;
                  return (
                    <div
                      key={item.id}
                      className={`bg-slate-900 border rounded-2xl p-4 transition ${
                        allBought ? "border-teal-500/40 bg-teal-950/10 opacity-80" : "border-slate-800"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleBoughtUnified(item.id, allBought)}
                            className={`mt-1 w-6 h-6 rounded-lg flex items-center justify-center border transition ${
                              allBought
                                ? "bg-teal-500 border-teal-500 text-slate-950"
                                : "border-slate-600 hover:border-teal-400"
                            }`}
                          >
                            {allBought && <Check className="w-4 h-4 stroke-[3]" />}
                          </button>

                          <div>
                            <h3 className={`font-bold text-sm sm:text-base ${allBought ? "line-through text-slate-400" : "text-white"}`}>
                              {item.name}
                            </h3>

                            {/* House Breakdown Badges */}
                            <div className="flex flex-wrap items-center gap-1.5 mt-2">
                              {breakdown.map((b) => {
                                const h = houses.find((x) => x.id === b.houseId);
                                if (!h) return null;
                                return (
                                  <span
                                    key={b.id}
                                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-lg ${h.badge}`}
                                  >
                                    {h.name}: {b.qty} {item.unit} ({b.cycle})
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        <div className="text-left shrink-0">
                          <span className="text-xs text-slate-400 block">الكمية الموحدة</span>
                          <span className="text-base font-extrabold text-teal-400">
                            {totalQty} {item.unit}
                          </span>
                        </div>
                      </div>

                      {/* Price Input + D4D Best Offer Link */}
                      <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-3 py-1.5 flex items-center gap-2">
                            <TrendingDown className="w-4 h-4 text-emerald-400" />
                            <div className="text-xs">
                              <span className="text-slate-400">أقل سعر D4D: </span>
                              <span className="font-bold text-emerald-300">
                                {bestOffer.price} ر.س ({bestOffer.store})
                              </span>
                            </div>
                          </div>

                          <a
                            href={`https://d4donline.com/ar/saudi-arabia/khamis-mushait/search?q=${encodeURIComponent(
                              item.name
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-slate-800 hover:bg-slate-700 text-xs text-sky-300 px-2.5 py-2 rounded-xl flex items-center gap-1 transition"
                            title="بحث في عروض D4D Online"
                          >
                            <span>عروض D4D</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>

                        <div className="flex items-center gap-3 mr-auto">
                          <div className="flex items-center gap-1.5">
                            <label className="text-xs text-slate-400">السعر الفعلي:</label>
                            <input
                              type="number"
                              step="0.05"
                              value={unitPrice}
                              onChange={(e) => handlePriceChange(item.id, e.target.value)}
                              className="w-20 bg-slate-950 border border-slate-700 focus:border-teal-400 rounded-xl px-2.5 py-1.5 text-sm font-bold text-center text-white outline-none"
                            />
                          </div>

                          <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                            <span className="text-[11px] text-slate-400 block">الإجمالي</span>
                            <span className="text-sm font-extrabold text-teal-400">
                              {totalCost.toFixed(2)} ر.س
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* TAB 2: SORT MARKETS BY CHEAPEST */}
            {masterTab === "markets" && (
              <div className="space-y-3">
                <div className="bg-teal-500/10 border border-teal-500/30 rounded-2xl p-3.5 text-xs text-teal-200 flex items-center justify-between">
                  <span>
                    تم توزيع المقاضي المطلوبة تلقائياً على الأسواق صاحبة **أقل سعر فعلي** في عروض D4D لتوفير الميزانية:
                  </span>
                  <a
                    href="https://d4donline.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-teal-500 text-slate-950 font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 shrink-0"
                  >
                    <span>موقع D4D</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {marketsSummary.map((m, idx) => (
                  <div key={m.store} className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 font-extrabold text-xs flex items-center justify-center">
                          #{idx + 1}
                        </span>
                        <div>
                          <h3 className="font-extrabold text-base text-white">{m.store}</h3>
                          <span className="text-xs text-slate-400">
                            عدد الأصناف الأرخص في هذا السوق: {m.items.length} أصناف
                          </span>
                        </div>
                      </div>

                      <div className="text-left">
                        <div className="text-sm font-extrabold text-teal-400">
                          {m.totalCost.toFixed(2)} ر.س
                        </div>
                        {m.totalSavings > 0 && (
                          <span className="text-[11px] text-emerald-400 font-bold">
                            توفير {m.totalSavings.toFixed(2)} ر.س
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      {m.items.map((entry) => (
                        <div
                          key={entry.item.id}
                          className="flex items-center justify-between bg-slate-950/70 px-3 py-2 rounded-xl text-xs"
                        >
                          <span className="font-bold text-slate-200">{entry.item.name}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-slate-400">
                              الكمية: <strong className="text-white">{entry.totalQty}</strong>
                            </span>
                            <span className="text-teal-400 font-bold">
                              {(entry.totalQty * entry.unitPrice).toFixed(2)} ر.س
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 3: POST-PURCHASE SORTING PER HOUSE */}
            {masterTab === "sorting" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {houses.map((house) => {
                  const houseOrders = orders.filter((o) => o.houseId === house.id);
                  const houseTotal = houseOrders.reduce(
                    (sum, o) => sum + o.qty * (o.actualPrice || 0),
                    0
                  );

                  return (
                    <div
                      key={house.id}
                      className={`bg-slate-900 border ${house.border} rounded-2xl p-4 flex flex-col justify-between`}
                    >
                      <div>
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                          <div>
                            <h3 className={`font-extrabold text-base ${house.text}`}>
                              {house.name}
                            </h3>
                            <span className="text-xs text-slate-400">
                              إجمالي الأصناف: {houseOrders.length}
                            </span>
                          </div>

                          <div className="text-left">
                            <span className="text-xs text-slate-400 block">إجمالي الفاتورة</span>
                            <span className="text-base font-extrabold text-white">
                              {houseTotal.toFixed(2)} ر.س
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          {houseOrders.map((ord) => {
                            const item = catalog.find((c) => c.id === ord.itemId);
                            if (!item) return null;
                            return (
                              <div
                                key={ord.id}
                                onClick={() => toggleSortedOrder(ord.id)}
                                className={`cursor-pointer p-2.5 rounded-xl border flex items-center justify-between transition ${
                                  ord.sorted
                                    ? "bg-teal-950/20 border-teal-500/40 opacity-75"
                                    : "bg-slate-950 border-slate-800 hover:border-slate-700"
                                }`}
                              >
                                <div className="flex items-center gap-2.5">
                                  <div
                                    className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                                      ord.sorted
                                        ? "bg-teal-500 border-teal-500 text-slate-950"
                                        : "border-slate-600"
                                    }`}
                                  >
                                    {ord.sorted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                  </div>
                                  <div>
                                    <p
                                      className={`text-xs font-bold ${
                                        ord.sorted ? "line-through text-slate-400" : "text-white"
                                      }`}
                                    >
                                      {item.name}
                                    </p>
                                    <span className="text-[11px] text-slate-400">
                                      الكمية: {ord.qty} {item.unit} × {ord.actualPrice} ر.س
                                    </span>
                                  </div>
                                </div>

                                <span className="text-xs font-extrabold text-teal-400">
                                  {(ord.qty * ord.actualPrice).toFixed(2)} ر.س
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <button
                        onClick={() => shareHouseWhatsApp(house)}
                        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>إرسال القائمة والفاتورة عبر واتساب</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* ===================== SUB-ACCOUNT VIEW (واجهة منزل الزوجة) ===================== */
          <div className="space-y-4">
            {/* Cycle Selector & Search */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">نوع الطلبية الحالية:</span>
                <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                  {["أسبوعي", "شهري"].map((c) => (
                    <button
                      key={c}
                      onClick={() => setCycleType(c)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                        cycleType === c ? "bg-teal-500 text-slate-950" : "text-slate-400"
                      }`}
                    >
                      مقاضي {c}ة
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
                <input
                  type="text"
                  placeholder="ابحثي في القوائم المسجلة مسبقاً..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-10 pl-4 py-2.5 text-xs text-white outline-none focus:border-teal-500"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition ${
                      selectedCategory === cat.id
                        ? "bg-teal-500 text-slate-950"
                        : "bg-slate-800 text-slate-300"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Pre-registered Catalog Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {catalog
                .filter(
                  (item) =>
                    (selectedCategory === "all" || item.category === selectedCategory) &&
                    item.name.includes(searchQuery)
                )
                .map((item) => {
                  const currentOrder = orders.find(
                    (o) => o.houseId === activeRole && o.itemId === item.id
                  );
                  const qty = currentOrder ? currentOrder.qty : 0;
                  const best = getBestOffer(item);

                  return (
                    <div
                      key={item.id}
                      className={`bg-slate-900 border rounded-2xl p-3.5 flex items-center justify-between transition ${
                        qty > 0 ? "border-teal-500/50 bg-teal-950/10" : "border-slate-800"
                      }`}
                    >
                      <div>
                        <h4 className="text-sm font-bold text-white">{item.name}</h4>
                        <span className="text-[11px] text-emerald-400 block mt-1">
                          أقل سعر D4D: {best.price} ر.س ({best.store})
                        </span>
                      </div>

                      <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-1">
                        <button
                          onClick={() => updateHouseItemQty(activeRole, item.id, -1)}
                          className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-extrabold text-teal-400">
                          {qty}
                        </span>
                        <button
                          onClick={() => updateHouseItemQty(activeRole, item.id, 1)}
                          className="w-7 h-7 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </main>

      {/* MODAL 1: ADD NEW HOUSE */}
      {showAddHouseModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleAddHouse}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 w-full max-w-md space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-white">إضافة بيت جديد</h3>
              <button type="button" onClick={() => setShowAddHouseModal(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1.5">اسم المنزل / الحساب الفرعي</label>
              <input
                type="text"
                required
                placeholder="مثال: المنزل الثالث (أم خالد)"
                value={newHouseName}
                onChange={(e) => setNewHouseName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1.5">لون التمييز</label>
              <div className="flex items-center gap-3">
                {HOUSE_COLORS.map((c, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setSelectedColorIdx(idx)}
                    className={`w-8 h-8 rounded-full ${c.color} ${
                      selectedColorIdx === idx ? "ring-2 ring-white ring-offset-2 ring-offset-slate-900" : ""
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-sm rounded-xl transition"
            >
              حفظ وإضافة المنزل
            </button>
          </form>
        </div>
      )}

      {/* MODAL 2: ADD UNLISTED ITEM */}
      {showCustomItemModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleAddCustomItem}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 w-full max-w-md space-y-3.5"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-white">إضافة صنف غير مدرج بالقوائم</h3>
              <button type="button" onClick={() => setShowCustomItemModal(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">اسم الصنف</label>
              <input
                type="text"
                required
                placeholder="مثال: قهوة هرري 500 جرام"
                value={customItem.name}
                onChange={(e) => setCustomItem({ ...customItem, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-xs text-slate-400 block mb-1">التصنيف</label>
                <select
                  value={customItem.category}
                  onChange={(e) => setCustomItem({ ...customItem, category: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                >
                  {CATEGORIES.filter((c) => c.id !== "all").map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">الوحدة</label>
                <input
                  type="text"
                  value={customItem.unit}
                  onChange={(e) => setCustomItem({ ...customItem, unit: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-xs text-slate-400 block mb-1">السعر التقديري (ر.س)</label>
                <input
                  type="number"
                  step="0.05"
                  placeholder="25"
                  value={customItem.price}
                  onChange={(e) => setCustomItem({ ...customItem, price: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">الكمية المطلوبة</label>
                <input
                  type="number"
                  min="1"
                  value={customItem.qty}
                  onChange={(e) => setCustomItem({ ...customItem, qty: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            {activeRole === "master" && (
              <div>
                <label className="text-xs text-slate-400 block mb-1">إضافة إلى منزل:</label>
                <select
                  value={customItem.targetHouse}
                  onChange={(e) => setCustomItem({ ...customItem, targetHouse: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                >
                  {houses.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-sm rounded-xl transition"
            >
              إضافة للقائمة والطلبية
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
