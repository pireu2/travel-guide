import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  MapPin,
  Clock,
  Users,
  Star,
  Utensils,
  Landmark,
  Mountain,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import Navigation from "./Navigation";

interface ActivitiesProps {
  onNavigate: (page: string) => void;
}

const activities = [
  {
    id: 1,
    name: "Traditional Tea Ceremony",
    location: "Kyoto, Japan",
    duration: "2 hours",
    price: 45,
    rating: 4.9,
    participants: 8,
    category: "cultural",
    image:
      "https://images.unsplash.com/photo-1593684044226-bf7d27456209?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwZXhwbG9yYXRpb24lMjB0cmF2ZWx8ZW58MXx8fHwxNzYxMTEwOTI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description:
      "Experience authentic Japanese culture with a local tea master",
    isLocal: true,
  },
  {
    id: 2,
    name: "Street Food Tour",
    location: "Bangkok, Thailand",
    duration: "3 hours",
    price: 35,
    rating: 5.0,
    participants: 12,
    category: "food",
    image:
      "https://images.unsplash.com/photo-1593684044226-bf7d27456209?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwZXhwbG9yYXRpb24lMjB0cmF2ZWx8ZW58MXx8fHwxNzYxMTEwOTI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Taste authentic Thai dishes at hidden local gems",
    isLocal: true,
  },
  {
    id: 3,
    name: "Sunrise Mountain Hike",
    location: "Swiss Alps, Switzerland",
    duration: "5 hours",
    price: 80,
    rating: 4.8,
    participants: 15,
    category: "adventure",
    image:
      "https://images.unsplash.com/photo-1742201514090-5a173b9477ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGFkdmVudHVyZSUyMHRyYXZlbHxlbnwxfHx8fDE3NjExMTA5Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Watch the sunrise from a breathtaking mountain peak",
    isLocal: false,
  },
  {
    id: 4,
    name: "Ancient Temple Tour",
    location: "Angkor Wat, Cambodia",
    duration: "4 hours",
    price: 55,
    rating: 4.7,
    participants: 20,
    category: "cultural",
    image:
      "https://images.unsplash.com/photo-1593684044226-bf7d27456209?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwZXhwbG9yYXRpb24lMjB0cmF2ZWx8ZW58MXx8fHwxNzYxMTEwOTI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Explore ancient ruins with an expert archaeologist",
    isLocal: true,
  },
  {
    id: 5,
    name: "Cooking Class with Locals",
    location: "Tuscany, Italy",
    duration: "3.5 hours",
    price: 65,
    rating: 5.0,
    participants: 10,
    category: "food",
    image:
      "https://images.unsplash.com/photo-1593684044226-bf7d27456209?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwZXhwbG9yYXRpb24lMjB0cmF2ZWx8ZW58MXx8fHwxNzYxMTEwOTI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Learn traditional Italian recipes from a local family",
    isLocal: true,
  },
  {
    id: 6,
    name: "Scuba Diving Adventure",
    location: "Great Barrier Reef, Australia",
    duration: "6 hours",
    price: 120,
    rating: 4.9,
    participants: 8,
    category: "adventure",
    image:
      "https://images.unsplash.com/photo-1604294731121-8bb3d4133971?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwdHJhdmVsfGVufDF8fHx8MTc2MTExMDkyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Discover underwater wonders with certified instructors",
    isLocal: false,
  },
];

const categoryIcons: Record<string, React.ReactNode> = {
  cultural: <Landmark className="w-4 h-4" />,
  food: <Utensils className="w-4 h-4" />,
  adventure: <Mountain className="w-4 h-4" />,
};

export default function Activities({ onNavigate }: ActivitiesProps) {
  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-600 p-4 md:p-8 relative overflow-hidden">
      <Navigation onNavigate={onNavigate} currentPage="activities" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 pt-16 md:pt-20">
        {/* Header */}
        <div className="mb-8">
          <div className="backdrop-blur-3xl bg-white/90 rounded-3xl border border-white/60 p-8 shadow-2xl shadow-white/15 ring-1 ring-white/25">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-gray-900 text-4xl font-bold mb-2">
                  Discover Experiences
                </h1>
                <p className="text-gray-700 text-lg">
                  Find authentic local activities and adventures
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-800 border-emerald-200"
                >
                  <Landmark className="w-4 h-4 mr-1" />
                  Activity Finder
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <div className="backdrop-blur-3xl bg-white/90 rounded-2xl border border-white/60 p-2 mb-6 shadow-2xl shadow-white/15 ring-1 ring-white/25">
            <TabsList className="bg-transparent w-full justify-start gap-2">
              <TabsTrigger
                value="all"
                className="text-gray-700 data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-900"
              >
                All Experiences
              </TabsTrigger>
              <TabsTrigger
                value="local"
                className="text-gray-700 data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-900"
              >
                Local Favorites
              </TabsTrigger>
              <TabsTrigger
                value="cultural"
                className="text-gray-700 data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-900"
              >
                Cultural
              </TabsTrigger>
              <TabsTrigger
                value="food"
                className="text-gray-700 data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-900"
              >
                Food & Dining
              </TabsTrigger>
              <TabsTrigger
                value="adventure"
                className="text-gray-700 data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-900"
              >
                Adventure
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="backdrop-blur-3xl bg-white/90 border border-white/60 shadow-2xl shadow-white/15 ring-1 ring-white/25 overflow-hidden hover:shadow-3xl transition-all hover:scale-[1.02] rounded-2xl"
                >
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={activity.image}
                      alt={activity.name}
                      className="w-full h-full object-cover"
                    />
                    {activity.isLocal && (
                      <Badge className="absolute top-4 left-4 bg-emerald-500 text-white">
                        Local Experience
                      </Badge>
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-gray-900">{activity.rating}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start gap-2 mb-2">
                      <Badge
                        variant="outline"
                        className="capitalize text-emerald-700 border-emerald-300"
                      >
                        {categoryIcons[activity.category]}
                        <span className="ml-1">{activity.category}</span>
                      </Badge>
                    </div>
                    <h3 className="text-gray-900 text-lg font-semibold mb-1">
                      {activity.name}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-600 mb-4">
                      <MapPin className="w-4 h-4" />
                      {activity.location}
                    </div>

                    <p className="text-gray-600 mb-4">{activity.description}</p>

                    <div className="flex flex-col gap-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{activity.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>Up to {activity.participants} people</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-emerald-600 text-lg font-bold">
                        From ${activity.price}
                      </span>
                      <span className="text-gray-500"> / person</span>
                    </div>

                    <Button className="w-full bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white">
                      Book Experience
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="local" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities
                .filter((a) => a.isLocal)
                .map((activity) => (
                  <div
                    key={activity.id}
                    className="backdrop-blur-3xl bg-white/90 border border-white/60 shadow-2xl shadow-white/15 ring-1 ring-white/25 overflow-hidden hover:shadow-3xl transition-all hover:scale-[1.02] rounded-2xl"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback
                        src={activity.image}
                        alt={activity.name}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-4 left-4 bg-emerald-500 text-white">
                        Local Experience
                      </Badge>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start gap-2 mb-2">
                        <Badge
                          variant="outline"
                          className="capitalize text-emerald-700 border-emerald-300"
                        >
                          {categoryIcons[activity.category]}
                          <span className="ml-1">{activity.category}</span>
                        </Badge>
                      </div>
                      <h3 className="text-gray-900 text-lg font-semibold mb-1">
                        {activity.name}
                      </h3>
                      <div className="flex items-center gap-1 text-gray-600 mb-4">
                        <MapPin className="w-4 h-4" />
                        {activity.location}
                      </div>

                      <p className="text-gray-600 mb-4">
                        {activity.description}
                      </p>

                      <div className="flex flex-col gap-2 mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{activity.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>Up to {activity.participants} people</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <span className="text-emerald-600 text-lg font-bold">
                          From ${activity.price}
                        </span>
                        <span className="text-gray-500"> / person</span>
                      </div>

                      <Button className="w-full bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white">
                        Book Experience
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="cultural" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities
                .filter((a) => a.category === "cultural")
                .map((activity) => (
                  <div
                    key={activity.id}
                    className="backdrop-blur-3xl bg-white/90 border border-white/60 shadow-2xl shadow-white/15 ring-1 ring-white/25 overflow-hidden hover:shadow-3xl transition-all hover:scale-[1.02] rounded-2xl"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback
                        src={activity.image}
                        alt={activity.name}
                        className="w-full h-full object-cover"
                      />
                      {activity.isLocal && (
                        <Badge className="absolute top-4 left-4 bg-emerald-500 text-white">
                          Local Experience
                        </Badge>
                      )}
                      <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-full flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-gray-900">{activity.rating}</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start gap-2 mb-2">
                        <Badge
                          variant="outline"
                          className="capitalize text-emerald-700 border-emerald-300"
                        >
                          {categoryIcons[activity.category]}
                          <span className="ml-1">{activity.category}</span>
                        </Badge>
                      </div>
                      <h3 className="text-gray-900 text-lg font-semibold mb-1">
                        {activity.name}
                      </h3>
                      <div className="flex items-center gap-1 text-gray-600 mb-4">
                        <MapPin className="w-4 h-4" />
                        {activity.location}
                      </div>

                      <p className="text-gray-600 mb-4">
                        {activity.description}
                      </p>

                      <div className="flex flex-col gap-2 mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{activity.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>Up to {activity.participants} people</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <span className="text-emerald-600 text-lg font-bold">
                          From ${activity.price}
                        </span>
                        <span className="text-gray-500"> / person</span>
                      </div>

                      <Button className="w-full bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white">
                        Book Experience
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="food" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities
                .filter((a) => a.category === "food")
                .map((activity) => (
                  <div
                    key={activity.id}
                    className="backdrop-blur-3xl bg-white/90 border border-white/60 shadow-2xl shadow-white/15 ring-1 ring-white/25 overflow-hidden hover:shadow-3xl transition-all hover:scale-[1.02] rounded-2xl"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback
                        src={activity.image}
                        alt={activity.name}
                        className="w-full h-full object-cover"
                      />
                      {activity.isLocal && (
                        <Badge className="absolute top-4 left-4 bg-emerald-500 text-white">
                          Local Experience
                        </Badge>
                      )}
                      <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-full flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-gray-900">{activity.rating}</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start gap-2 mb-2">
                        <Badge
                          variant="outline"
                          className="capitalize text-emerald-700 border-emerald-300"
                        >
                          {categoryIcons[activity.category]}
                          <span className="ml-1">{activity.category}</span>
                        </Badge>
                      </div>
                      <h3 className="text-gray-900 text-lg font-semibold mb-1">
                        {activity.name}
                      </h3>
                      <div className="flex items-center gap-1 text-gray-600 mb-4">
                        <MapPin className="w-4 h-4" />
                        {activity.location}
                      </div>

                      <p className="text-gray-600 mb-4">
                        {activity.description}
                      </p>

                      <div className="flex flex-col gap-2 mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{activity.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>Up to {activity.participants} people</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <span className="text-emerald-600 text-lg font-bold">
                          From ${activity.price}
                        </span>
                        <span className="text-gray-500"> / person</span>
                      </div>

                      <Button className="w-full bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white">
                        Book Experience
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="adventure" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities
                .filter((a) => a.category === "adventure")
                .map((activity) => (
                  <div
                    key={activity.id}
                    className="backdrop-blur-3xl bg-white/90 border border-white/60 shadow-2xl shadow-white/15 ring-1 ring-white/25 overflow-hidden hover:shadow-3xl transition-all hover:scale-[1.02] rounded-2xl"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback
                        src={activity.image}
                        alt={activity.name}
                        className="w-full h-full object-cover"
                      />
                      {activity.isLocal && (
                        <Badge className="absolute top-4 left-4 bg-emerald-500 text-white">
                          Local Experience
                        </Badge>
                      )}
                      <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-full flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-gray-900">{activity.rating}</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start gap-2 mb-2">
                        <Badge
                          variant="outline"
                          className="capitalize text-emerald-700 border-emerald-300"
                        >
                          {categoryIcons[activity.category]}
                          <span className="ml-1">{activity.category}</span>
                        </Badge>
                      </div>
                      <h3 className="text-gray-900 text-lg font-semibold mb-1">
                        {activity.name}
                      </h3>
                      <div className="flex items-center gap-1 text-gray-600 mb-4">
                        <MapPin className="w-4 h-4" />
                        {activity.location}
                      </div>

                      <p className="text-gray-600 mb-4">
                        {activity.description}
                      </p>

                      <div className="flex flex-col gap-2 mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{activity.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>Up to {activity.participants} people</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <span className="text-emerald-600 text-lg font-bold">
                          From ${activity.price}
                        </span>
                        <span className="text-gray-500"> / person</span>
                      </div>

                      <Button className="w-full bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white">
                        Book Experience
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Navigation */}
        <div className="backdrop-blur-3xl bg-white/90 border border-white/60 shadow-2xl shadow-white/15 ring-1 ring-white/25 rounded-2xl p-6">
          <h3 className="text-gray-900 mb-4">Continue Planning</h3>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => onNavigate("planner")}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Trip Planner
            </Button>
            <Button
              onClick={() => onNavigate("accommodation")}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Accommodation
            </Button>
            <Button
              onClick={() => onNavigate("itinerary")}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Create Itinerary
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
