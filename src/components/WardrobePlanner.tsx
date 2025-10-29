import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Snowflake,
  Shirt,
  CheckCircle2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Navigation from "./Navigation";

interface WardrobePlannerProps {
  onNavigate: (page: string) => void;
}

const weatherConditions = [
  {
    value: "sunny",
    label: "Sunny & Hot",
    icon: <Sun className="w-5 h-5" />,
    temp: "25-35°C",
  },
  {
    value: "mild",
    label: "Mild & Pleasant",
    icon: <Cloud className="w-5 h-5" />,
    temp: "15-25°C",
  },
  {
    value: "rainy",
    label: "Rainy",
    icon: <CloudRain className="w-5 h-5" />,
    temp: "10-20°C",
  },
  {
    value: "cold",
    label: "Cold & Windy",
    icon: <Wind className="w-5 h-5" />,
    temp: "0-15°C",
  },
  {
    value: "snow",
    label: "Snow & Freezing",
    icon: <Snowflake className="w-5 h-5" />,
    temp: "-10-5°C",
  },
];

const wardrobeItems = {
  sunny: [
    { item: "Light t-shirts", quantity: 3, essential: true },
    { item: "Shorts", quantity: 2, essential: true },
    { item: "Sundress", quantity: 2, essential: false },
    { item: "Swimwear", quantity: 1, essential: true },
    { item: "Sunglasses", quantity: 1, essential: true },
    { item: "Sun hat", quantity: 1, essential: true },
    { item: "Light sandals", quantity: 1, essential: true },
    { item: "Evening outfit", quantity: 1, essential: false },
  ],
  mild: [
    { item: "T-shirts", quantity: 3, essential: true },
    { item: "Long pants", quantity: 2, essential: true },
    { item: "Light jacket", quantity: 1, essential: true },
    { item: "Comfortable shoes", quantity: 1, essential: true },
    { item: "Sweater", quantity: 1, essential: false },
    { item: "Casual dress", quantity: 1, essential: false },
  ],
  rainy: [
    { item: "Waterproof jacket", quantity: 1, essential: true },
    { item: "Rain pants", quantity: 1, essential: false },
    { item: "Umbrella", quantity: 1, essential: true },
    { item: "Waterproof shoes", quantity: 1, essential: true },
    { item: "Quick-dry clothes", quantity: 3, essential: true },
    { item: "Warm layers", quantity: 2, essential: true },
  ],
  cold: [
    { item: "Warm coat", quantity: 1, essential: true },
    { item: "Sweaters", quantity: 3, essential: true },
    { item: "Thermal underwear", quantity: 2, essential: true },
    { item: "Warm pants", quantity: 2, essential: true },
    { item: "Winter boots", quantity: 1, essential: true },
    { item: "Scarf", quantity: 1, essential: true },
    { item: "Gloves", quantity: 1, essential: true },
    { item: "Warm hat", quantity: 1, essential: true },
  ],
  snow: [
    { item: "Heavy winter coat", quantity: 1, essential: true },
    { item: "Snow pants", quantity: 1, essential: true },
    { item: "Thermal layers", quantity: 3, essential: true },
    { item: "Winter boots", quantity: 1, essential: true },
    { item: "Wool socks", quantity: 4, essential: true },
    { item: "Winter gloves", quantity: 1, essential: true },
    { item: "Winter hat", quantity: 1, essential: true },
    { item: "Neck warmer", quantity: 1, essential: true },
  ],
};

export default function WardrobePlanner({ onNavigate }: WardrobePlannerProps) {
  const [selectedWeather, setSelectedWeather] = useState<string>("mild");
  const [packedItems, setPackedItems] = useState<Set<string>>(new Set());

  const togglePacked = (item: string) => {
    const newPacked = new Set(packedItems);
    if (newPacked.has(item)) {
      newPacked.delete(item);
    } else {
      newPacked.add(item);
    }
    setPackedItems(newPacked);
  };

  const currentItems =
    wardrobeItems[selectedWeather as keyof typeof wardrobeItems] ||
    wardrobeItems.mild;
  const packedCount = currentItems.filter((i) =>
    packedItems.has(i.item)
  ).length;
  const essentialCount = currentItems.filter((i) => i.essential).length;
  const packedEssentialCount = currentItems.filter(
    (i) => i.essential && packedItems.has(i.item)
  ).length;

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-500 via-red-500 to-pink-600 p-4 md:p-8 relative overflow-hidden">
      <Navigation onNavigate={onNavigate} currentPage="wardrobe" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-red-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 pt-16 md:pt-20">
        {/* Header */}
        <div className="mb-8">
          <div className="backdrop-blur-3xl bg-white/90 rounded-3xl border border-white/60 p-8 shadow-2xl shadow-white/15 ring-1 ring-white/25">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Shirt className="w-8 h-8 text-orange-600" />
                  <h1 className="text-gray-900 text-4xl font-bold">
                    Wardrobe Planner
                  </h1>
                </div>
                <p className="text-gray-700 text-lg">
                  Pack smart based on weather and local customs
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="bg-orange-100 text-orange-800 border-orange-200"
                >
                  <Shirt className="w-4 h-4 mr-1" />
                  Packing Assistant
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weather Selection */}
          <div className="lg:col-span-1">
            <div className="backdrop-blur-3xl bg-white/90 border border-white/60 shadow-2xl shadow-white/15 ring-1 ring-white/25 sticky top-8 rounded-2xl">
              <div className="p-6">
                <h3 className="text-gray-900 text-xl font-semibold mb-2">
                  Destination Weather
                </h3>
                <p className="text-gray-600 mb-6">
                  Select the weather conditions
                </p>

                <div className="space-y-4">
                  <Select
                    value={selectedWeather}
                    onValueChange={setSelectedWeather}
                  >
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Select weather" />
                    </SelectTrigger>
                    <SelectContent>
                      {weatherConditions.map((weather) => (
                        <SelectItem key={weather.value} value={weather.value}>
                          <div className="flex items-center gap-2">
                            {weather.icon}
                            <div>
                              <div>{weather.label}</div>
                              <div className="text-gray-500">
                                {weather.temp}
                              </div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <h4 className="text-gray-900 font-medium">
                      Packing Progress
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Overall</span>
                        <span className="text-gray-900 font-medium">
                          {packedCount} / {currentItems.length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-linear-to-r from-orange-500 to-pink-500 h-2 rounded-full transition-all"
                          style={{
                            width: `${
                              (packedCount / currentItems.length) * 100
                            }%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Essentials</span>
                        <span className="text-gray-900 font-medium">
                          {packedEssentialCount} / {essentialCount}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-linear-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                          style={{
                            width: `${
                              (packedEssentialCount / essentialCount) * 100
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-gray-900 font-medium mb-2">Tips</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Pack versatile items that can be mixed</li>
                      <li>• Check local dress codes</li>
                      <li>• Leave room for souvenirs</li>
                      <li>• Pack a small first-aid kit</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Packing List */}
          <div className="lg:col-span-2">
            <div className="backdrop-blur-3xl bg-white/90 border border-white/60 shadow-2xl shadow-white/15 ring-1 ring-white/25 rounded-2xl">
              <div className="p-6">
                <h3 className="text-gray-900 text-xl font-semibold mb-2">
                  Recommended Items
                </h3>
                <p className="text-gray-600 mb-6">
                  Check off items as you pack them
                </p>

                <div className="space-y-3">
                  {currentItems.map((item) => {
                    const isPacked = packedItems.has(item.item);
                    return (
                      <div
                        key={item.item}
                        onClick={() => togglePacked(item.item)}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          isPacked
                            ? "bg-green-50 border-green-300"
                            : "bg-white border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              isPacked
                                ? "bg-green-500 border-green-500"
                                : "border-gray-300"
                            }`}
                          >
                            {isPacked && (
                              <CheckCircle2 className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <div>
                            <div
                              className={`${
                                isPacked
                                  ? "line-through text-gray-500"
                                  : "text-gray-900"
                              }`}
                            >
                              {item.item}
                            </div>
                            <div className="flex gap-2 mt-1">
                              {item.essential && (
                                <Badge
                                  variant="outline"
                                  className="text-orange-600 border-orange-300"
                                >
                                  Essential
                                </Badge>
                              )}
                              {item.quantity > 1 && (
                                <Badge
                                  variant="secondary"
                                  className="bg-gray-100 text-gray-700"
                                >
                                  Qty: {item.quantity}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <Shirt
                          className={`w-5 h-5 ${
                            isPacked ? "text-green-500" : "text-gray-400"
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="backdrop-blur-3xl bg-white/90 rounded-2xl border border-white/60 p-6 mt-8 shadow-2xl shadow-white/15 ring-1 ring-white/25">
          <h3 className="text-gray-900 mb-4 font-semibold">
            Continue Planning
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => onNavigate("planner")}
              variant="outline"
              className="border-orange-300 text-orange-800 hover:bg-orange-50"
            >
              Trip Planner
            </Button>
            <Button
              onClick={() => onNavigate("itinerary")}
              variant="outline"
              className="border-orange-300 text-orange-800 hover:bg-orange-50"
            >
              View Itinerary
            </Button>
            <Button
              onClick={() => onNavigate("activities")}
              variant="outline"
              className="border-orange-300 text-orange-800 hover:bg-orange-50"
            >
              Browse Activities
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
