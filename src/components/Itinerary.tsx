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
  Calendar,
  Clock,
  MapPin,
  Plus,
  Coffee,
  Utensils,
  Camera,
  Moon,
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";

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

export default function Itinerary({
  onNavigate,
}: ItineraryProps) {
  const [selectedDay, setSelectedDay] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
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
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-white mb-2">
                  Your Itinerary
                </h1>
                <p className="text-white/80">
                  Plan and organize your daily schedule
                </p>
              </div>
              <Button className="bg-white text-purple-600 hover:bg-white/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Activity
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Day Selector Sidebar */}
          <div className="lg:col-span-1">
            <Card className="backdrop-blur-xl bg-white/95 border-white/20 shadow-2xl sticky top-8">
              <CardHeader>
                <CardTitle>Trip Days</CardTitle>
                <CardDescription>
                  October 23-25, 2025
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {mockItinerary.map((day) => (
                  <button
                    key={day.day}
                    onClick={() => setSelectedDay(day.day)}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      selectedDay === day.day
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                        : "bg-secondary hover:bg-secondary/80"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          selectedDay === day.day
                            ? "bg-white/20"
                            : "bg-white"
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
                        <div>Day {day.day}</div>
                        <div
                          className={`${
                            selectedDay === day.day
                              ? "text-white/80"
                              : "text-muted-foreground"
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
                          : "border-border"
                      }`}
                    >
                      <span>
                        {day.activities.length} activities
                      </span>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Daily Schedule */}
          <div className="lg:col-span-3">
            <Card className="backdrop-blur-xl bg-white/95 border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle>
                  Day {selectedDay} Schedule
                </CardTitle>
                <CardDescription>
                  {
                    mockItinerary.find(
                      (d) => d.day === selectedDay,
                    )?.date
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockItinerary
                    .find((d) => d.day === selectedDay)
                    ?.activities.map((activity, index) => (
                      <div
                        key={index}
                        className="relative pl-8 pb-8 last:pb-0"
                      >
                        {/* Timeline line */}
                        {index <
                          (mockItinerary.find(
                            (d) => d.day === selectedDay,
                          )?.activities.length || 0) -
                            1 && (
                          <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-gradient-to-b from-purple-300 to-indigo-300" />
                        )}

                        {/* Timeline dot */}
                        <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg">
                          <Clock className="w-4 h-4 text-white" />
                        </div>

                        <div className="bg-white rounded-xl border-2 border-gray-100 p-4 hover:shadow-lg transition-all">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge
                                  className={`${activityColors[activity.type]} border`}
                                >
                                  {activityIcons[activity.type]}
                                  <span className="ml-1 capitalize">
                                    {activity.type}
                                  </span>
                                </Badge>
                                <span className="text-muted-foreground">
                                  {activity.time}
                                </span>
                              </div>
                              <h3 className="mb-1">
                                {activity.title}
                              </h3>
                              {activity.location && (
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <MapPin className="w-4 h-4" />
                                  <span>
                                    {activity.location}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                <span>{activity.duration}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm">
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card className="backdrop-blur-xl bg-white/95 border-white/20">
                <CardHeader className="pb-3">
                  <CardDescription>
                    Total Activities
                  </CardDescription>
                  <CardTitle className="text-3xl">
                    {
                      mockItinerary.find(
                        (d) => d.day === selectedDay,
                      )?.activities.length
                    }
                  </CardTitle>
                </CardHeader>
              </Card>

              <Card className="backdrop-blur-xl bg-white/95 border-white/20">
                <CardHeader className="pb-3">
                  <CardDescription>
                    Meals Planned
                  </CardDescription>
                  <CardTitle className="text-3xl">
                    {
                      mockItinerary
                        .find((d) => d.day === selectedDay)
                        ?.activities.filter(
                          (a) => a.type === "food",
                        ).length
                    }
                  </CardTitle>
                </CardHeader>
              </Card>

              <Card className="backdrop-blur-xl bg-white/95 border-white/20">
                <CardHeader className="pb-3">
                  <CardDescription>Start Time</CardDescription>
                  <CardTitle className="text-3xl">
                    {
                      mockItinerary.find(
                        (d) => d.day === selectedDay,
                      )?.activities[0]?.time
                    }
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 mt-8">
          <h3 className="text-white mb-4">Plan More</h3>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => onNavigate("activities")}
              variant="outline"
              className="border-white text-black hover:bg-white/10"
            >
              Add Activities
            </Button>
            <Button
              onClick={() => onNavigate("accommodation")}
              variant="outline"
              className="border-white text-black hover:bg-white/10"
            >
              Update Accommodation
            </Button>
            <Button
              onClick={() => onNavigate("wardrobe")}
              variant="outline"
              className="border-white text-black hover:bg-white/10"
            >
              Check Wardrobe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}