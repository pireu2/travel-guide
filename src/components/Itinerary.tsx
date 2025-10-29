import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Calendar,
  Clock,
  MapPin,
  Plus,
  Coffee,
  Utensils,
  Camera,
  Moon,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Navigation from "./Navigation";

interface ItineraryProps {
  onNavigate: (page: string) => void;
}

const mockItinerary = [
  {
    day: 1,
    date: "Oct 23, 2025",
    activities: [
      {
        time: "08:00",
        title: "Breakfast at Hotel",
        type: "food",
        duration: "1h",
        location: "Hotel Restaurant",
      },
      {
        time: "09:30",
        title: "City Walking Tour",
        type: "activity",
        duration: "3h",
        location: "Old Town",
      },
      {
        time: "13:00",
        title: "Lunch at Local Market",
        type: "food",
        duration: "1.5h",
        location: "Central Market",
      },
      {
        time: "15:00",
        title: "Museum Visit",
        type: "culture",
        duration: "2h",
        location: "National Museum",
      },
      {
        time: "18:00",
        title: "Sunset at Beach",
        type: "leisure",
        duration: "1h",
        location: "Main Beach",
      },
      {
        time: "20:00",
        title: "Dinner",
        type: "food",
        duration: "2h",
        location: "Seaside Restaurant",
      },
    ],
  },
  {
    day: 2,
    date: "Oct 24, 2025",
    activities: [
      {
        time: "07:00",
        title: "Sunrise Hike",
        type: "activity",
        duration: "3h",
        location: "Mountain Trail",
      },
      {
        time: "10:30",
        title: "Brunch",
        type: "food",
        duration: "1.5h",
        location: "Cafe Vista",
      },
      {
        time: "13:00",
        title: "Local Cooking Class",
        type: "activity",
        duration: "3h",
        location: "Cooking Studio",
      },
      {
        time: "17:00",
        title: "Free Time",
        type: "leisure",
        duration: "2h",
        location: "Hotel",
      },
      {
        time: "19:30",
        title: "Traditional Dinner Show",
        type: "culture",
        duration: "2.5h",
        location: "Cultural Center",
      },
    ],
  },
  {
    day: 3,
    date: "Oct 25, 2025",
    activities: [
      {
        time: "09:00",
        title: "Breakfast",
        type: "food",
        duration: "1h",
        location: "Hotel",
      },
      {
        time: "10:30",
        title: "Shopping & Souvenirs",
        type: "leisure",
        duration: "2h",
        location: "Market District",
      },
      {
        time: "13:00",
        title: "Farewell Lunch",
        type: "food",
        duration: "1.5h",
        location: "Rooftop Restaurant",
      },
      {
        time: "15:00",
        title: "Airport Transfer",
        type: "travel",
        duration: "1h",
        location: "",
      },
    ],
  },
];

const activityIcons: Record<string, React.ReactNode> = {
  food: <Utensils className="w-4 h-4" />,
  activity: <Camera className="w-4 h-4" />,
  culture: <MapPin className="w-4 h-4" />,
  leisure: <Coffee className="w-4 h-4" />,
  travel: <Calendar className="w-4 h-4" />,
};

const activityColors: Record<string, string> = {
  food: "bg-orange-100 text-orange-700 border-orange-300",
  activity: "bg-blue-100 text-blue-700 border-blue-300",
  culture: "bg-purple-100 text-purple-700 border-purple-300",
  leisure: "bg-green-100 text-green-700 border-green-300",
  travel: "bg-gray-100 text-gray-700 border-gray-300",
};

export default function Itinerary({ onNavigate }: ItineraryProps) {
  const [selectedDay, setSelectedDay] = useState(1);

  return (
    <div className="min-h-screen bg-linear-to-br from-violet-600 via-purple-600 to-indigo-700 p-4 md:p-8 relative overflow-hidden">
      <Navigation onNavigate={onNavigate} currentPage="itinerary" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-violet-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 pt-16 md:pt-20">
        {/* Header */}
        <div className="mb-8">
          <div className="backdrop-blur-3xl bg-white/90 rounded-3xl border border-white/60 p-8 shadow-2xl shadow-white/15 ring-1 ring-white/25">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-gray-900 text-4xl font-bold mb-2">
                  Your Itinerary
                </h1>
                <p className="text-gray-700 text-lg">
                  Plan and organize your daily schedule
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="bg-violet-100 text-violet-800 border-violet-200"
                >
                  <Calendar className="w-4 h-4 mr-1" />
                  Trip Planner
                </Badge>
                <Button className="bg-violet-600 text-white hover:bg-violet-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Activity
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Day Selector Sidebar */}
          <div className="lg:col-span-1">
            <div className="backdrop-blur-3xl bg-white/90 border border-white/60 shadow-2xl shadow-white/15 ring-1 ring-white/25 sticky top-8 rounded-2xl">
              <div className="p-6">
                <h3 className="text-gray-900 text-xl font-semibold mb-2">
                  Trip Days
                </h3>
                <p className="text-gray-600 mb-6">October 23-25, 2025</p>

                <div className="space-y-2">
                  {mockItinerary.map((day) => (
                    <button
                      key={day.day}
                      onClick={() => setSelectedDay(day.day)}
                      className={`w-full p-4 rounded-xl text-left transition-all ${
                        selectedDay === day.day
                          ? "bg-linear-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            selectedDay === day.day ? "bg-white/20" : "bg-white"
                          }`}
                        >
                          <Calendar
                            className={`w-6 h-6 ${
                              selectedDay === day.day
                                ? "text-white"
                                : "text-purple-600"
                            }`}
                          />
                        </div>
                        <div>
                          <div
                            className={
                              selectedDay === day.day
                                ? "text-white"
                                : "text-gray-900"
                            }
                          >
                            Day {day.day}
                          </div>
                          <div
                            className={`${
                              selectedDay === day.day
                                ? "text-white/80"
                                : "text-gray-500"
                            }`}
                          >
                            {day.date}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`mt-2 pt-2 border-t ${
                          selectedDay === day.day
                            ? "border-white/20"
                            : "border-gray-200"
                        }`}
                      >
                        <span
                          className={
                            selectedDay === day.day
                              ? "text-white/80"
                              : "text-gray-600"
                          }
                        >
                          {day.activities.length} activities
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Daily Schedule */}
          <div className="lg:col-span-3">
            <div className="backdrop-blur-3xl bg-white/90 border border-white/60 shadow-2xl shadow-white/15 ring-1 ring-white/25 rounded-2xl">
              <div className="p-6">
                <h3 className="text-gray-900 text-xl font-semibold mb-2">
                  Day {selectedDay} Schedule
                </h3>
                <p className="text-gray-600 mb-6">
                  {mockItinerary.find((d) => d.day === selectedDay)?.date}
                </p>

                <div className="space-y-4">
                  {mockItinerary
                    .find((d) => d.day === selectedDay)
                    ?.activities.map((activity, index) => (
                      <div key={index} className="relative pl-8 pb-8 last:pb-0">
                        {/* Timeline line */}
                        {index <
                          (mockItinerary.find((d) => d.day === selectedDay)
                            ?.activities.length || 0) -
                            1 && (
                          <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-linear-to-b from-purple-300 to-indigo-300" />
                        )}

                        {/* Timeline dot */}
                        <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-linear-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg">
                          <Clock className="w-4 h-4 text-white" />
                        </div>

                        <div className="bg-white rounded-xl border-2 border-gray-100 p-4 hover:shadow-lg transition-all">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge
                                  className={`${
                                    activityColors[activity.type]
                                  } border`}
                                >
                                  {activityIcons[activity.type]}
                                  <span className="ml-1 capitalize">
                                    {activity.type}
                                  </span>
                                </Badge>
                                <span className="text-gray-500">
                                  {activity.time}
                                </span>
                              </div>
                              <h4 className="text-gray-900 mb-1">
                                {activity.title}
                              </h4>
                              {activity.location && (
                                <div className="flex items-center gap-1 text-gray-600">
                                  <MapPin className="w-4 h-4" />
                                  <span>{activity.location}</span>
                                </div>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1 text-gray-500">
                                <Clock className="w-4 h-4" />
                                <span>{activity.duration}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-600 hover:bg-gray-50"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="backdrop-blur-3xl bg-white/90 border border-white/60 rounded-2xl p-6 shadow-2xl shadow-white/15 ring-1 ring-white/25">
                <div className="pb-3">
                  <p className="text-gray-600 mb-1">Total Activities</p>
                  <h4 className="text-gray-900 text-3xl font-bold">
                    {
                      mockItinerary.find((d) => d.day === selectedDay)
                        ?.activities.length
                    }
                  </h4>
                </div>
              </div>

              <div className="backdrop-blur-3xl bg-white/90 border border-white/60 rounded-2xl p-6 shadow-2xl shadow-white/15 ring-1 ring-white/25">
                <div className="pb-3">
                  <p className="text-gray-600 mb-1">Meals Planned</p>
                  <h4 className="text-gray-900 text-3xl font-bold">
                    {
                      mockItinerary
                        .find((d) => d.day === selectedDay)
                        ?.activities.filter((a) => a.type === "food").length
                    }
                  </h4>
                </div>
              </div>

              <div className="backdrop-blur-3xl bg-white/90 border border-white/60 rounded-2xl p-6 shadow-2xl shadow-white/15 ring-1 ring-white/25">
                <div className="pb-3">
                  <p className="text-gray-600 mb-1">Start Time</p>
                  <h4 className="text-gray-900 text-3xl font-bold">
                    {
                      mockItinerary.find((d) => d.day === selectedDay)
                        ?.activities[0]?.time
                    }
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="backdrop-blur-3xl bg-white/90 rounded-2xl border border-white/60 p-6 mt-8 shadow-2xl shadow-white/15 ring-1 ring-white/25">
          <h3 className="text-gray-900 mb-4 font-semibold">Plan More</h3>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => onNavigate("activities")}
              variant="outline"
              className="border-violet-300 text-violet-800 hover:bg-violet-50"
            >
              Add Activities
            </Button>
            <Button
              onClick={() => onNavigate("accommodation")}
              variant="outline"
              className="border-violet-300 text-violet-800 hover:bg-violet-50"
            >
              Update Accommodation
            </Button>
            <Button
              onClick={() => onNavigate("wardrobe")}
              variant="outline"
              className="border-violet-300 text-violet-800 hover:bg-violet-50"
            >
              Check Wardrobe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
