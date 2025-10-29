import { useState, useMemo } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Checkbox } from "./ui/checkbox";
import { Progress } from "./ui/progress";
import {
  Plus,
  Package,
  Search,
  Filter,
  Star,
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Snowflake,
  CheckCircle2,
  X,
  Download,
  FileText,
  Target,
  Calendar,
  Users,
  Briefcase,
} from "lucide-react";
import Navigation from "./Navigation";

interface PackingListProps {
  onNavigate: (page: string) => void;
}

interface PackingItem {
  id: string;
  category: string;
  item: string;
  packed: boolean;
  quantity: number;
  essential: boolean;
  weather?: string[];
}

interface PackingTemplate {
  name: string;
  description: string;
  duration: string;
  items: PackingItem[];
}

const defaultCategories = [
  "Clothing",
  "Toiletries",
  "Electronics",
  "Documents",
  "Medications",
  "Accessories",
  "Miscellaneous",
];

const weatherConditions = [
  {
    value: "sunny",
    label: "Sunny & Hot",
    icon: <Sun className="w-4 h-4" />,
    temp: "25-35°C",
  },
  {
    value: "mild",
    label: "Mild & Pleasant",
    icon: <Cloud className="w-4 h-4" />,
    temp: "15-25°C",
  },
  {
    value: "rainy",
    label: "Rainy",
    icon: <CloudRain className="w-4 h-4" />,
    temp: "10-20°C",
  },
  {
    value: "cold",
    label: "Cold & Windy",
    icon: <Wind className="w-4 h-4" />,
    temp: "0-15°C",
  },
  {
    value: "snow",
    label: "Snow & Freezing",
    icon: <Snowflake className="w-4 h-4" />,
    temp: "-10-5°C",
  },
];

const packingTemplates: PackingTemplate[] = [
  {
    name: "Weekend Getaway",
    description: "Perfect for 2-3 day trips",
    duration: "2-3 days",
    items: [
      {
        id: "1",
        category: "Clothing",
        item: "T-shirts",
        packed: false,
        quantity: 3,
        essential: true,
      },
      {
        id: "2",
        category: "Clothing",
        item: "Pants/Jeans",
        packed: false,
        quantity: 2,
        essential: true,
      },
      {
        id: "3",
        category: "Clothing",
        item: "Underwear",
        packed: false,
        quantity: 3,
        essential: true,
      },
      {
        id: "4",
        category: "Clothing",
        item: "Socks",
        packed: false,
        quantity: 3,
        essential: true,
      },
      {
        id: "5",
        category: "Toiletries",
        item: "Toothbrush",
        packed: false,
        quantity: 1,
        essential: true,
      },
      {
        id: "6",
        category: "Toiletries",
        item: "Toothpaste",
        packed: false,
        quantity: 1,
        essential: true,
      },
      {
        id: "7",
        category: "Documents",
        item: "ID/Driver's License",
        packed: false,
        quantity: 1,
        essential: true,
      },
      {
        id: "8",
        category: "Electronics",
        item: "Phone Charger",
        packed: false,
        quantity: 1,
        essential: true,
      },
    ],
  },
  {
    name: "Business Trip",
    description: "Professional travel essentials",
    duration: "3-7 days",
    items: [
      {
        id: "9",
        category: "Clothing",
        item: "Business Shirts",
        packed: false,
        quantity: 4,
        essential: true,
      },
      {
        id: "10",
        category: "Clothing",
        item: "Dress Pants",
        packed: false,
        quantity: 2,
        essential: true,
      },
      {
        id: "11",
        category: "Clothing",
        item: "Blazers",
        packed: false,
        quantity: 1,
        essential: true,
      },
      {
        id: "12",
        category: "Clothing",
        item: "Ties",
        packed: false,
        quantity: 2,
        essential: false,
      },
      {
        id: "13",
        category: "Documents",
        item: "Business Cards",
        packed: false,
        quantity: 1,
        essential: true,
      },
      {
        id: "14",
        category: "Electronics",
        item: "Laptop",
        packed: false,
        quantity: 1,
        essential: true,
      },
      {
        id: "15",
        category: "Electronics",
        item: "Presentation Materials",
        packed: false,
        quantity: 1,
        essential: true,
      },
    ],
  },
  {
    name: "Beach Vacation",
    description: "Sun, sand, and relaxation",
    duration: "7-14 days",
    items: [
      {
        id: "16",
        category: "Clothing",
        item: "Swimwear",
        packed: false,
        quantity: 3,
        essential: true,
        weather: ["sunny", "mild"],
      },
      {
        id: "17",
        category: "Clothing",
        item: "Light T-shirts",
        packed: false,
        quantity: 5,
        essential: true,
        weather: ["sunny", "mild"],
      },
      {
        id: "18",
        category: "Clothing",
        item: "Shorts",
        packed: false,
        quantity: 4,
        essential: true,
        weather: ["sunny", "mild"],
      },
      {
        id: "19",
        category: "Clothing",
        item: "Sundresses",
        packed: false,
        quantity: 2,
        essential: false,
        weather: ["sunny", "mild"],
      },
      {
        id: "20",
        category: "Accessories",
        item: "Sunglasses",
        packed: false,
        quantity: 1,
        essential: true,
        weather: ["sunny", "mild"],
      },
      {
        id: "21",
        category: "Accessories",
        item: "Sun Hat",
        packed: false,
        quantity: 1,
        essential: true,
        weather: ["sunny", "mild"],
      },
      {
        id: "22",
        category: "Accessories",
        item: "Flip Flops",
        packed: false,
        quantity: 1,
        essential: true,
        weather: ["sunny", "mild"],
      },
    ],
  },
];

const defaultItems: PackingItem[] = [
  {
    id: "23",
    category: "Clothing",
    item: "T-shirts",
    packed: false,
    quantity: 5,
    essential: true,
  },
  {
    id: "24",
    category: "Clothing",
    item: "Pants/Jeans",
    packed: false,
    quantity: 3,
    essential: true,
  },
  {
    id: "25",
    category: "Clothing",
    item: "Underwear",
    packed: false,
    quantity: 7,
    essential: true,
  },
  {
    id: "26",
    category: "Clothing",
    item: "Socks",
    packed: false,
    quantity: 7,
    essential: true,
  },
  {
    id: "27",
    category: "Toiletries",
    item: "Toothbrush",
    packed: false,
    quantity: 1,
    essential: true,
  },
  {
    id: "28",
    category: "Toiletries",
    item: "Toothpaste",
    packed: false,
    quantity: 1,
    essential: true,
  },
  {
    id: "29",
    category: "Toiletries",
    item: "Shampoo",
    packed: false,
    quantity: 1,
    essential: true,
  },
  {
    id: "30",
    category: "Documents",
    item: "Passport",
    packed: false,
    quantity: 1,
    essential: true,
  },
  {
    id: "31",
    category: "Documents",
    item: "Travel Insurance",
    packed: false,
    quantity: 1,
    essential: true,
  },
  {
    id: "32",
    category: "Electronics",
    item: "Phone Charger",
    packed: false,
    quantity: 1,
    essential: true,
  },
  {
    id: "33",
    category: "Electronics",
    item: "Adapter",
    packed: false,
    quantity: 1,
    essential: true,
  },
];

export default function PackingList({ onNavigate }: PackingListProps) {
  const [items, setItems] = useState<PackingItem[]>(defaultItems);
  const [newItem, setNewItem] = useState({
    category: "",
    item: "",
    quantity: "1",
    essential: false,
  });
  const [activeTab, setActiveTab] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedWeather, setSelectedWeather] = useState<string>("all-weather");

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.item
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesWeather =
        selectedWeather === "all-weather" ||
        !item.weather ||
        item.weather.includes(selectedWeather);
      return matchesSearch && matchesCategory && matchesWeather;
    });
  }, [items, searchQuery, selectedCategory, selectedWeather]);

  const addItem = () => {
    if (newItem.item.trim()) {
      const item: PackingItem = {
        id: Date.now().toString(),
        category: newItem.category || "Miscellaneous",
        item: newItem.item,
        packed: false,
        quantity: parseInt(newItem.quantity) || 1,
        essential: newItem.essential,
      };
      setItems([...items, item]);
      setNewItem({
        category: "",
        item: "",
        quantity: "1",
        essential: false,
      });
    }
  };

  const togglePacked = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const applyTemplate = (template: PackingTemplate) => {
    // Merge template items with existing items, avoiding duplicates
    const existingItemNames = new Set(
      items.map((item) => item.item.toLowerCase())
    );
    const newItems = template.items.filter(
      (item) => !existingItemNames.has(item.item.toLowerCase())
    );

    if (newItems.length > 0) {
      setItems([...items, ...newItems]);
    }
  };

  const exportList = () => {
    const csvContent = [
      ["Category", "Item", "Quantity", "Essential", "Packed"].join(","),
      ...items.map((item) =>
        [
          item.category,
          item.item,
          item.quantity,
          item.essential ? "Yes" : "No",
          item.packed ? "Yes" : "No",
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "packing-list.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getCategoryItems = (category: string) => {
    return filteredItems.filter((item) => item.category === category);
  };

  const getPackedCount = (category: string) => {
    const categoryItems = getCategoryItems(category);
    return categoryItems.filter((item) => item.packed).length;
  };

  const getTotalCount = (category: string) => {
    return getCategoryItems(category).length;
  };

  const overallProgress =
    items.length > 0
      ? (items.filter((item) => item.packed).length / items.length) * 100
      : 0;
  const essentialProgress =
    items.length > 0
      ? (items.filter((item) => item.essential && item.packed).length /
          items.filter((item) => item.essential).length) *
        100
      : 0;

  const getCategoryColor = (category: string) => {
    const colors = {
      Clothing: "bg-blue-500",
      Toiletries: "bg-green-500",
      Electronics: "bg-purple-500",
      Documents: "bg-orange-500",
      Medications: "bg-red-500",
      Accessories: "bg-pink-500",
      Miscellaneous: "bg-gray-500",
    };
    return colors[category as keyof typeof colors] || "bg-gray-500";
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-400 via-violet-400 to-indigo-500 p-4 md:p-8 relative overflow-hidden">
      <Navigation onNavigate={onNavigate} currentPage="packing" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-violet-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 pt-16 md:pt-20">
        {/* Header */}
        <div className="mb-8">
          <div className="backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/30 p-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-gray-900 text-4xl font-bold mb-2">
                  Packing List
                </h1>
                <p className="text-gray-700 text-lg">
                  Organize and track your travel essentials
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={exportList}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-800 border-purple-200"
                >
                  <Package className="w-4 h-4 mr-1" />
                  Smart Packing
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 backdrop-blur-2xl bg-white/95 border border-white/30 mb-6">
            <TabsTrigger
              value="list"
              className="text-gray-700 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-900"
            >
              Packing List
            </TabsTrigger>
            <TabsTrigger
              value="progress"
              className="text-gray-700 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-900"
            >
              Progress
            </TabsTrigger>
            <TabsTrigger
              value="templates"
              className="text-gray-700 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-900"
            >
              Templates
            </TabsTrigger>
            <TabsTrigger
              value="weather"
              className="text-gray-700 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-900"
            >
              Weather
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Filters and Search */}
              <div className="backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/30 p-6 shadow-2xl">
                <div className="mb-6">
                  <h3 className="text-gray-900 text-lg font-semibold flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filters & Search
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="search"
                      className="text-gray-700 text-sm font-medium"
                    >
                      Search Items
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="search"
                        placeholder="Search items..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-white/80 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-700 text-sm font-medium">
                      Category
                    </label>
                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger className="bg-white/80 border-gray-300 text-gray-900">
                        <SelectValue placeholder="All categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {defaultCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-700 text-sm font-medium">
                      Weather Filter
                    </label>
                    <Select
                      value={selectedWeather}
                      onValueChange={setSelectedWeather}
                    >
                      <SelectTrigger className="bg-white/80 border-gray-300 text-gray-900">
                        <SelectValue placeholder="All weather" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-weather">All Weather</SelectItem>
                        {weatherConditions.map((weather) => (
                          <SelectItem key={weather.value} value={weather.value}>
                            <div className="flex items-center gap-2">
                              {weather.icon}
                              {weather.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Add Item */}
              <div className="backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/30 p-6 shadow-2xl">
                <div className="mb-6">
                  <h3 className="text-gray-900 text-lg font-semibold flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Add Item
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Add custom items to your list
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-gray-700 text-sm font-medium">
                      Category
                    </label>
                    <Select
                      value={newItem.category}
                      onValueChange={(value) =>
                        setNewItem({ ...newItem, category: value })
                      }
                    >
                      <SelectTrigger className="bg-white/80 border-gray-300 text-gray-900">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {defaultCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="item"
                      className="text-gray-700 text-sm font-medium"
                    >
                      Item Name
                    </label>
                    <Input
                      id="item"
                      placeholder="e.g., Sunglasses"
                      value={newItem.item}
                      onChange={(e) =>
                        setNewItem({ ...newItem, item: e.target.value })
                      }
                      className="bg-white/80 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-purple-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="quantity"
                      className="text-gray-700 text-sm font-medium"
                    >
                      Quantity
                    </label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={newItem.quantity}
                      onChange={(e) =>
                        setNewItem({ ...newItem, quantity: e.target.value })
                      }
                      className="bg-white/80 border-gray-300 text-gray-900"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="essential"
                      checked={newItem.essential}
                      onCheckedChange={(checked) =>
                        setNewItem({
                          ...newItem,
                          essential: checked as boolean,
                        })
                      }
                    />
                    <label
                      htmlFor="essential"
                      className="text-gray-700 text-sm"
                    >
                      Mark as essential
                    </label>
                  </div>

                  <Button
                    onClick={addItem}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/30 p-6 shadow-2xl">
                <div className="mb-6">
                  <h3 className="text-gray-900 text-lg font-semibold flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Quick Stats
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {overallProgress.toFixed(0)}%
                    </div>
                    <div className="text-gray-600 text-sm mb-4">
                      Overall Progress
                    </div>
                    <Progress
                      value={overallProgress}
                      className="h-3 bg-gray-200"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Total Items</span>
                      <span className="text-gray-900 font-semibold">
                        {items.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Packed</span>
                      <span className="text-green-600 font-semibold">
                        {items.filter((i) => i.packed).length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Remaining</span>
                      <span className="text-orange-600 font-semibold">
                        {items.filter((i) => !i.packed).length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Essentials</span>
                      <span className="text-yellow-600 font-semibold">
                        {items.filter((i) => i.essential).length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Packing List by Category */}
            <div className="space-y-4">
              {defaultCategories.map((category) => {
                const categoryItems = getCategoryItems(category);
                if (categoryItems.length === 0) return null;

                const packedCount = getPackedCount(category);
                const totalCount = getTotalCount(category);
                const progress =
                  totalCount > 0 ? (packedCount / totalCount) * 100 : 0;

                return (
                  <div
                    key={category}
                    className="backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/30 p-6 shadow-2xl"
                  >
                    <div className="mb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full ${getCategoryColor(
                              category
                            )}`}
                          />
                          <h3 className="text-gray-900 text-lg font-semibold">
                            {category}
                          </h3>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-gray-500 text-sm">
                            {packedCount}/{totalCount} packed
                          </span>
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getCategoryColor(
                                category
                              )} transition-all duration-300`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {categoryItems.map((item) => (
                        <div
                          key={item.id}
                          className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                            item.packed
                              ? "bg-green-50 border-green-200"
                              : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                          }`}
                          onClick={() => togglePacked(item.id)}
                        >
                          <Checkbox
                            checked={item.packed}
                            onCheckedChange={() => togglePacked(item.id)}
                            className="border-gray-300"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span
                                className={
                                  item.packed
                                    ? "line-through text-gray-500"
                                    : "text-gray-900"
                                }
                              >
                                {item.item}
                              </span>
                              {item.essential && (
                                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              )}
                            </div>
                            {item.quantity > 1 && (
                              <span className="text-gray-500 text-xs">
                                Qty: {item.quantity}
                              </span>
                            )}
                          </div>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeItem(item.id);
                            }}
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Overall Progress */}
              <div className="backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/30 p-6 shadow-2xl">
                <div className="mb-6">
                  <h3 className="text-gray-900 text-lg font-semibold flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Overall Progress
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Your packing completion status
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-gray-900 mb-4">
                      {overallProgress.toFixed(0)}%
                    </div>
                    <Progress
                      value={overallProgress}
                      className="h-4 bg-gray-200 mb-4"
                    />
                    <div className="text-gray-600">
                      {items.filter((i) => i.packed).length} of {items.length}{" "}
                      items packed
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Essential Items</span>
                      <span className="text-yellow-600 font-semibold">
                        {items.filter((i) => i.essential && i.packed).length}/
                        {items.filter((i) => i.essential).length}
                      </span>
                    </div>
                    <Progress
                      value={essentialProgress}
                      className="h-3 bg-gray-200"
                    />
                  </div>
                </div>
              </div>

              {/* Category Progress */}
              <div className="backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/30 p-6 shadow-2xl">
                <div className="mb-6">
                  <h3 className="text-gray-900 text-lg font-semibold flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Category Progress
                  </h3>
                  <p className="text-gray-600 text-sm">Progress by category</p>
                </div>
                <div className="space-y-4">
                  {defaultCategories.map((category) => {
                    const packed = getPackedCount(category);
                    const total = getTotalCount(category);
                    if (total === 0) return null;
                    const progress = (packed / total) * 100;

                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-3 h-3 rounded-full ${getCategoryColor(
                                category
                              )}`}
                            />
                            <span className="text-gray-900 text-sm">
                              {category}
                            </span>
                          </div>
                          <span className="text-gray-500 text-sm">
                            {packed}/{total}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full ${getCategoryColor(
                              category
                            )} transition-all duration-500`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/30 p-6 shadow-2xl">
              <div className="mb-6">
                <h3 className="text-gray-900 text-lg font-semibold flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Packing Templates
                </h3>
                <p className="text-gray-600 text-sm">
                  Choose from pre-made packing templates
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {packingTemplates.map((template) => (
                  <div
                    key={template.name}
                    className="p-6 bg-gray-50 backdrop-blur-sm rounded-xl border border-gray-200 hover:bg-gray-100 transition-all cursor-pointer"
                    onClick={() => applyTemplate(template)}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Briefcase className="w-5 h-5 text-purple-500" />
                      <h3 className="text-gray-900 font-semibold">
                        {template.name}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      {template.description}
                    </p>
                    <div className="flex items-center gap-2 text-gray-500 text-xs mb-4">
                      <Calendar className="w-3 h-3" />
                      <span>{template.duration}</span>
                      <Users className="w-3 h-3 ml-2" />
                      <span>{template.items.length} items</span>
                    </div>
                    <div className="space-y-2 mb-4">
                      {template.items.slice(0, 3).map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-2 text-xs"
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${getCategoryColor(
                              item.category
                            )}`}
                          />
                          <span className="text-gray-700">{item.item}</span>
                          {item.essential && (
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          )}
                        </div>
                      ))}
                      {template.items.length > 3 && (
                        <div className="text-gray-500 text-xs">
                          +{template.items.length - 3} more items
                        </div>
                      )}
                    </div>
                    <Button
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        applyTemplate(template);
                      }}
                    >
                      Use Template
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="weather" className="space-y-6">
            <div className="backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/30 p-6 shadow-2xl">
              <div className="mb-6">
                <h3 className="text-gray-900 text-lg font-semibold flex items-center gap-2">
                  <Cloud className="w-5 h-5" />
                  Weather-Based Packing
                </h3>
                <p className="text-gray-600 text-sm">
                  Get packing suggestions based on destination weather
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {weatherConditions.map((weather) => (
                  <div
                    key={weather.value}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedWeather === weather.value
                        ? "bg-purple-50 border-purple-200"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    }`}
                    onClick={() =>
                      setSelectedWeather(
                        selectedWeather === weather.value
                          ? "all-weather"
                          : weather.value
                      )
                    }
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-gray-700">{weather.icon}</div>
                      <div>
                        <div className="text-gray-900 font-semibold">
                          {weather.label}
                        </div>
                        <div className="text-gray-500 text-sm">
                          {weather.temp}
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-600 text-xs">
                      {
                        items.filter((item) =>
                          item.weather?.includes(weather.value)
                        ).length
                      }{" "}
                      weather-specific items
                    </div>
                  </div>
                ))}
              </div>

              {selectedWeather !== "all-weather" && (
                <div className="space-y-4">
                  <h3 className="text-gray-900 font-semibold">
                    Recommended for{" "}
                    {
                      weatherConditions.find((w) => w.value === selectedWeather)
                        ?.label
                    }
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {items
                      .filter((item) => item.weather?.includes(selectedWeather))
                      .map((item) => (
                        <div
                          key={item.id}
                          className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                            item.packed
                              ? "bg-green-50 border-green-200"
                              : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                          }`}
                          onClick={() => togglePacked(item.id)}
                        >
                          <Checkbox
                            checked={item.packed}
                            onCheckedChange={() => togglePacked(item.id)}
                            className="border-gray-300"
                          />
                          <div className="flex-1">
                            <span
                              className={
                                item.packed
                                  ? "line-through text-gray-500"
                                  : "text-gray-900"
                              }
                            >
                              {item.item}
                            </span>
                            {item.quantity > 1 && (
                              <span className="text-gray-500 text-xs ml-2">
                                x{item.quantity}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Packing Tips */}
        <div className="mt-6 backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/30 p-6 shadow-2xl">
          <div className="mb-6">
            <h3 className="text-gray-900 text-lg font-semibold">
              Smart Packing Tips
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-gray-900 font-semibold mb-3 flex items-center gap-2">
                <Package className="w-4 h-4" />
                Organization
              </h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 shrink-0"></div>
                  Use packing cubes for better organization
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 shrink-0"></div>
                  Roll clothes to save space and reduce wrinkles
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 shrink-0"></div>
                  Place heavier items at the bottom of your bag
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 shrink-0"></div>
                  Keep essentials in an easily accessible pocket
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-900 font-semibold mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Best Practices
              </h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 shrink-0"></div>
                  Check airline liquid restrictions (100ml rule)
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 shrink-0"></div>
                  Make a checklist and check it twice
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 shrink-0"></div>
                  Leave space for souvenirs and new purchases
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 shrink-0"></div>
                  Pack versatile items that can be mixed and matched
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
