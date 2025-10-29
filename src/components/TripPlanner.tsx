import { useState } from "react";
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

interface TripPlannerProps {
  onNavigate: (page: string) => void;
}

export default function TripPlanner({ onNavigate }: TripPlannerProps) {
  const [destination, setDestination] = useState("");
  const [tripType, setTripType] = useState("");

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
          <div className="backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/30 p-8 shadow-2xl">
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
          <div className="backdrop-blur-2xl bg-white/95 border border-white/30 shadow-2xl rounded-3xl">
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

                <Button className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  Generate Trip Plan
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div
              className="backdrop-blur-2xl bg-white/95 border border-white/30 shadow-2xl rounded-3xl hover:shadow-3xl transition-all cursor-pointer hover:scale-[1.02]"
              onClick={() => onNavigate("accommodation")}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-linear-to-br from-blue-500 to-cyan-500 rounded-xl">
                    <Plane className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 text-lg font-semibold mb-1">
                      Find Accommodation
                    </h3>
                    <p className="text-gray-600">
                      Browse hotels, apartments, and unique stays
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="backdrop-blur-2xl bg-white/95 border border-white/30 shadow-2xl rounded-3xl hover:shadow-3xl transition-all cursor-pointer hover:scale-[1.02]"
              onClick={() => onNavigate("activities")}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 text-lg font-semibold mb-1">
                      Discover Activities
                    </h3>
                    <p className="text-gray-600">
                      Find authentic local experiences and attractions
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="backdrop-blur-2xl bg-white/95 border border-white/30 shadow-2xl rounded-3xl hover:shadow-3xl transition-all cursor-pointer hover:scale-[1.02]"
              onClick={() => onNavigate("wardrobe")}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-linear-to-br from-orange-500 to-red-500 rounded-xl">
                    <CalendarIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 text-lg font-semibold mb-1">
                      Plan Your Wardrobe
                    </h3>
                    <p className="text-gray-600">
                      Weather-based packing recommendations
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="backdrop-blur-2xl bg-white/95 border border-white/30 shadow-2xl rounded-3xl hover:shadow-3xl transition-all cursor-pointer hover:scale-[1.02]"
              onClick={() => onNavigate("itinerary")}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-linear-to-br from-green-500 to-emerald-500 rounded-xl">
                    <CalendarIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 text-lg font-semibold mb-1">
                      Create Itinerary
                    </h3>
                    <p className="text-gray-600">
                      Organize your daily schedule and activities
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="backdrop-blur-2xl bg-white/95 border border-white/30 shadow-2xl rounded-3xl hover:shadow-3xl transition-all cursor-pointer hover:scale-[1.02]"
              onClick={() => onNavigate("weather")}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-linear-to-br from-cyan-500 to-blue-500 rounded-xl">
                    <Cloud className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 text-lg font-semibold mb-1">
                      Check Weather
                    </h3>
                    <p className="text-gray-600">
                      Get weather forecasts for your destination
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="backdrop-blur-2xl bg-white/95 border border-white/30 shadow-2xl rounded-3xl hover:shadow-3xl transition-all cursor-pointer hover:scale-[1.02]"
              onClick={() => onNavigate("currency")}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-linear-to-br from-yellow-500 to-orange-500 rounded-xl">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 text-lg font-semibold mb-1">
                      Currency Exchange
                    </h3>
                    <p className="text-gray-600">
                      Convert currencies and plan expenses
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="backdrop-blur-2xl bg-white/95 border border-white/30 shadow-2xl rounded-3xl hover:shadow-3xl transition-all cursor-pointer hover:scale-[1.02]"
              onClick={() => onNavigate("budget")}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-linear-to-br from-red-500 to-pink-500 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 text-lg font-semibold mb-1">
                      Budget Calculator
                    </h3>
                    <p className="text-gray-600">
                      Track expenses and stay within budget
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="backdrop-blur-2xl bg-white/95 border border-white/30 shadow-2xl rounded-3xl hover:shadow-3xl transition-all cursor-pointer hover:scale-[1.02]"
              onClick={() => onNavigate("packing")}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-linear-to-br from-indigo-500 to-purple-500 rounded-xl">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 text-lg font-semibold mb-1">
                      Packing List
                    </h3>
                    <p className="text-gray-600">
                      Never forget anything on your trip
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="backdrop-blur-2xl bg-white/95 border border-white/30 shadow-2xl rounded-3xl hover:shadow-3xl transition-all cursor-pointer hover:scale-[1.02]"
              onClick={() => onNavigate("emergency")}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-linear-to-br from-red-600 to-rose-600 rounded-xl">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 text-lg font-semibold mb-1">
                      Emergency Contacts
                    </h3>
                    <p className="text-gray-600">
                      Keep important contacts for safety
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
