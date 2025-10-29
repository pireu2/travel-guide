import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Plane,
  MapPin,
  Users,
  Calendar as CalendarIcon,
  Cloud,
  DollarSign,
  TrendingUp,
  Package,
  Shield,
} from "lucide-react";
import Navigation from "./Navigation";
import { createStaggeredDelays } from "../lib/animations";

interface TripPlannerProps {
  onNavigate: (page: string) => void;
}

export default function TripPlanner({ onNavigate }: TripPlannerProps) {
  const [destination, setDestination] = useState("");
  const [tripType, setTripType] = useState("");
  const [showCards, setShowCards] = useState(false);

  // Staggered animation delays for action cards
  const cardDelays = createStaggeredDelays(9, 100);

  useEffect(() => {
    // Trigger staggered animation after component mounts
    const timer = setTimeout(() => setShowCards(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const actionCards = [
    {
      id: "accommodation",
      title: "Find Accommodation",
      description: "Discover hotels, resorts, and unique stays",
      icon: MapPin,
      gradient: "from-blue-500 to-cyan-500",
      onClick: () => onNavigate("accommodation"),
    },
    {
      id: "activities",
      title: "Discover Activities",
      description: "Find authentic local experiences and attractions",
      icon: MapPin,
      gradient: "from-purple-500 to-pink-500",
      onClick: () => onNavigate("activities"),
    },
    {
      id: "wardrobe",
      title: "Plan Your Wardrobe",
      description: "Weather-based packing recommendations",
      icon: CalendarIcon,
      gradient: "from-orange-500 to-red-500",
      onClick: () => onNavigate("wardrobe"),
    },
    {
      id: "itinerary",
      title: "Create Itinerary",
      description: "Organize your daily schedule and activities",
      icon: CalendarIcon,
      gradient: "from-green-500 to-emerald-500",
      onClick: () => onNavigate("itinerary"),
    },
    {
      id: "weather",
      title: "Check Weather",
      description: "Get weather forecasts for your destination",
      icon: Cloud,
      gradient: "from-cyan-500 to-blue-500",
      onClick: () => onNavigate("weather"),
    },
    {
      id: "currency",
      title: "Currency Exchange",
      description: "Convert currencies and plan expenses",
      icon: DollarSign,
      gradient: "from-yellow-500 to-orange-500",
      onClick: () => onNavigate("currency"),
    },
    {
      id: "budget",
      title: "Budget Calculator",
      description: "Track expenses and stay within budget",
      icon: TrendingUp,
      gradient: "from-red-500 to-pink-500",
      onClick: () => onNavigate("budget"),
    },
    {
      id: "packing",
      title: "Packing List",
      description: "Never forget anything on your trip",
      icon: Package,
      gradient: "from-indigo-500 to-purple-500",
      onClick: () => onNavigate("packing"),
    },
    {
      id: "emergency",
      title: "Emergency Contacts",
      description: "Keep important contacts for safety",
      icon: Shield,
      gradient: "from-red-600 to-rose-600",
      onClick: () => onNavigate("emergency"),
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 md:p-8 relative overflow-hidden">
      <Navigation onNavigate={onNavigate} currentPage="planner" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 pt-16 md:pt-20">
        {/* Header */}
        <div className="mb-8">
          <div className="backdrop-blur-3xl bg-white/90 rounded-3xl border border-white/30 p-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-gray-900 text-4xl font-bold mb-2">
                  Trip Planner
                </h1>
                <p className="text-gray-700 text-lg">
                  Let's plan your perfect journey together
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="bg-indigo-100 text-indigo-800 border-indigo-200"
                >
                  <Plane className="w-4 h-4 mr-1" />
                  Trip Planning
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Planning Form */}
          <div className="backdrop-blur-3xl bg-white/90 border border-white/60 shadow-2xl shadow-white/15 ring-1 ring-white/25 rounded-3xl">
            <div className="p-6">
              <h3 className="text-gray-900 text-xl font-semibold mb-2">
                Trip Details
              </h3>
              <p className="text-gray-600 mb-6">
                Tell us about your travel plans
              </p>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="destination" className="text-gray-700">
                    Destination
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="destination"
                      placeholder="e.g., Tokyo, Japan"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="pl-10 bg-white/80 border-gray-300 text-gray-900 placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date" className="text-gray-700">
                      Start Date
                    </Label>
                    <Input
                      id="start-date"
                      type="date"
                      className="bg-white/80 border-gray-300 text-gray-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date" className="text-gray-700">
                      End Date
                    </Label>
                    <Input
                      id="end-date"
                      type="date"
                      className="bg-white/80 border-gray-300 text-gray-900"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="travelers" className="text-gray-700">
                    Number of Travelers
                  </Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="travelers"
                      type="number"
                      placeholder="1"
                      min="1"
                      className="pl-10 bg-white/80 border-gray-300 text-gray-900 placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="trip-type" className="text-gray-700">
                    Trip Type
                  </Label>
                  <Select value={tripType} onValueChange={setTripType}>
                    <SelectTrigger
                      id="trip-type"
                      className="bg-white/80 border-gray-300 text-gray-900"
                    >
                      <SelectValue placeholder="Select trip type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="leisure">Leisure</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="adventure">Adventure</SelectItem>
                      <SelectItem value="cultural">Cultural</SelectItem>
                      <SelectItem value="relaxation">Relaxation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-gray-700">
                    Budget (USD)
                  </Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="e.g., 2000"
                    className="bg-white/80 border-gray-300 text-gray-900 placeholder:text-gray-500"
                  />
                </div>

                <Button className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-purple-500/25">
                  Generate Trip Plan
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            {actionCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <div
                  key={card.id}
                  className={`backdrop-blur-3xl bg-white/90 border border-white/60 shadow-2xl shadow-white/15 ring-1 ring-white/25 rounded-3xl transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-3xl hover:shadow-white/20 active:scale-95 ${
                    showCards
                      ? "animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
                      : "opacity-0"
                  }`}
                  style={{
                    animationDelay: showCards
                      ? `${cardDelays[index]}ms`
                      : "0ms",
                  }}
                  onClick={card.onClick}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 bg-linear-to-br ${card.gradient} rounded-xl transition-transform duration-300 hover:scale-110`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-gray-900 text-lg font-semibold mb-1">
                          {card.title}
                        </h3>
                        <p className="text-gray-600">{card.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
