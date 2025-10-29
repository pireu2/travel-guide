import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {
  ArrowLeft,
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

export default function WardrobePlanner({
  onNavigate,
}: WardrobePlannerProps) {
  const [selectedWeather, setSelectedWeather] =
    useState<string>("mild");
  const [packedItems, setPackedItems] = useState<Set<string>>(
    new Set(),
  );

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
    wardrobeItems[
      selectedWeather as keyof typeof wardrobeItems
    ] || wardrobeItems.mild;
  const packedCount = currentItems.filter((i) =>
    packedItems.has(i.item),
  ).length;
  const essentialCount = currentItems.filter(
    (i) => i.essential,
  ).length;
  const packedEssentialCount = currentItems.filter(
    (i) => i.essential && packedItems.has(i.item),
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={() => onNavigate("home")}
            variant="ghost"
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-2">
              <Shirt className="w-8 h-8 text-white" />
              <h1 className="text-white">Wardrobe Planner</h1>
            </div>
            <p className="text-white/80">
              Pack smart based on weather and local customs
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weather Selection */}
          <div className="lg:col-span-1">
            <Card className="backdrop-blur-xl bg-white/95 border-white/20 shadow-2xl sticky top-8">
              <CardHeader>
                <CardTitle>Destination Weather</CardTitle>
                <CardDescription>
                  Select the weather conditions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select
                  value={selectedWeather}
                  onValueChange={setSelectedWeather}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select weather" />
                  </SelectTrigger>
                  <SelectContent>
                    {weatherConditions.map((weather) => (
                      <SelectItem
                        key={weather.value}
                        value={weather.value}
                      >
                        <div className="flex items-center gap-2">
                          {weather.icon}
                          <div>
                            <div>{weather.label}</div>
                            <div className="text-muted-foreground">
                              {weather.temp}
                            </div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="space-y-3 pt-4 border-t">
                  <h4>Packing Progress</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Overall</span>
                      <span>
                        {packedCount} / {currentItems.length}
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-pink-500 h-2 rounded-full transition-all"
                        style={{
                          width: `${(packedCount / currentItems.length) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Essentials</span>
                      <span>
                        {packedEssentialCount} /{" "}
                        {essentialCount}
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                        style={{
                          width: `${(packedEssentialCount / essentialCount) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="mb-2">Tips</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>
                      • Pack versatile items that can be mixed
                    </li>
                    <li>• Check local dress codes</li>
                    <li>• Leave room for souvenirs</li>
                    <li>• Pack a small first-aid kit</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Packing List */}
          <div className="lg:col-span-2">
            <Card className="backdrop-blur-xl bg-white/95 border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle>Recommended Items</CardTitle>
                <CardDescription>
                  Check off items as you pack them
                </CardDescription>
              </CardHeader>
              <CardContent>
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
                              className={`${isPacked ? "line-through text-muted-foreground" : ""}`}
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
                                <Badge variant="secondary">
                                  Qty: {item.quantity}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <Shirt
                          className={`w-5 h-5 ${isPacked ? "text-green-500" : "text-gray-400"}`}
                        />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 mt-8">
          <h3 className="text-white mb-4">Continue Planning</h3>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => onNavigate("planner")}
              variant="outline"
              className="border-white text-black hover:bg-white/10"
            >
              Trip Planner
            </Button>
            <Button
              onClick={() => onNavigate("itinerary")}
              variant="outline"
              className="border-white text-black hover:bg-white/10"
            >
              View Itinerary
            </Button>
            <Button
              onClick={() => onNavigate("activities")}
              variant="outline"
              className="border-white text-black hover:bg-white/10"
            >
              Browse Activities
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}