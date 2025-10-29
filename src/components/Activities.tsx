import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  Star,
  Utensils,
  Landmark,
  Mountain,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

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
    description:
      "Taste authentic Thai dishes at hidden local gems",
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
    description:
      "Watch the sunrise from a breathtaking mountain peak",
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
    description:
      "Explore ancient ruins with an expert archaeologist",
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
    description:
      "Learn traditional Italian recipes from a local family",
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
    description:
      "Discover underwater wonders with certified instructors",
    isLocal: false,
  },
];

const categoryIcons: Record<string, React.ReactNode> = {
  cultural: <Landmark className="w-4 h-4" />,
  food: <Utensils className="w-4 h-4" />,
  adventure: <Mountain className="w-4 h-4" />,
};

export default function Activities({
  onNavigate,
}: ActivitiesProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 p-4 md:p-8">
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
            <h1 className="text-white mb-2">
              Discover Experiences
            </h1>
            <p className="text-white/80">
              Find authentic local activities and adventures
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-2 mb-6">
            <TabsList className="bg-transparent w-full justify-start gap-2">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-white data-[state=active]:text-gray-900"
              >
                All Experiences
              </TabsTrigger>
              <TabsTrigger
                value="local"
                className="data-[state=active]:bg-white data-[state=active]:text-gray-900"
              >
                Local Favorites
              </TabsTrigger>
              <TabsTrigger
                value="cultural"
                className="data-[state=active]:bg-white data-[state=active]:text-gray-900"
              >
                Cultural
              </TabsTrigger>
              <TabsTrigger
                value="food"
                className="data-[state=active]:bg-white data-[state=active]:text-gray-900"
              >
                Food & Dining
              </TabsTrigger>
              <TabsTrigger
                value="adventure"
                className="data-[state=active]:bg-white data-[state=active]:text-gray-900"
              >
                Adventure
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map((activity) => (
                <Card
                  key={activity.id}
                  className="backdrop-blur-xl bg-white/95 border-white/20 shadow-2xl overflow-hidden hover:shadow-3xl transition-all hover:scale-[1.02]"
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
                      <span>{activity.rating}</span>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex items-start gap-2 mb-2">
                      <Badge
                        variant="outline"
                        className="capitalize"
                      >
                        {categoryIcons[activity.category]}
                        <span className="ml-1">
                          {activity.category}
                        </span>
                      </Badge>
                    </div>
                    <CardTitle>{activity.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {activity.location}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {activity.description}
                    </p>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{activity.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>
                          Up to {activity.participants} people
                        </span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <span className="text-primary">
                        From ${activity.price}
                      </span>
                      <span className="text-muted-foreground">
                        {" "}
                        / person
                      </span>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                      Book Experience
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="local" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities
                .filter((a) => a.isLocal)
                .map((activity) => (
                  <Card
                    key={activity.id}
                    className="backdrop-blur-xl bg-white/95 border-white/20 shadow-2xl overflow-hidden"
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
                    <CardHeader>
                      <CardTitle>{activity.name}</CardTitle>
                      <CardDescription>
                        {activity.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {activity.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="cultural" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities
                .filter((a) => a.category === "cultural")
                .map((activity) => (
                  <Card
                    key={activity.id}
                    className="backdrop-blur-xl bg-white/95 border-white/20 shadow-2xl overflow-hidden"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback
                        src={activity.image}
                        alt={activity.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{activity.name}</CardTitle>
                      <CardDescription>
                        {activity.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {activity.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="food" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities
                .filter((a) => a.category === "food")
                .map((activity) => (
                  <Card
                    key={activity.id}
                    className="backdrop-blur-xl bg-white/95 border-white/20 shadow-2xl overflow-hidden"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback
                        src={activity.image}
                        alt={activity.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{activity.name}</CardTitle>
                      <CardDescription>
                        {activity.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {activity.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="adventure" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities
                .filter((a) => a.category === "adventure")
                .map((activity) => (
                  <Card
                    key={activity.id}
                    className="backdrop-blur-xl bg-white/95 border-white/20 shadow-2xl overflow-hidden"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback
                        src={activity.image}
                        alt={activity.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{activity.name}</CardTitle>
                      <CardDescription>
                        {activity.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {activity.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Navigation */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
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
              onClick={() => onNavigate("accommodation")}
              variant="outline"
              className="border-white text-black hover:bg-white/10"
            >
              Accommodation
            </Button>
            <Button
              onClick={() => onNavigate("itinerary")}
              variant="outline"
              className="border-white text-black hover:bg-white/10"
            >
              Create Itinerary
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}