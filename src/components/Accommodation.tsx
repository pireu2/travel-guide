import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  MapPin,
  Star,
  Wifi,
  Coffee,
  ParkingSquare,
  Waves,
  Home,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import Navigation from "./Navigation";

interface AccommodationProps {
  onNavigate: (page: string) => void;
}

const accommodations = [
  {
    id: 1,
    name: "Ocean View Resort",
    location: "Bali, Indonesia",
    price: 120,
    rating: 4.8,
    reviews: 234,
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwcmVzb3J0fGVufDF8fHx8MTc2MTExMDkyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    amenities: ["Wifi", "Pool", "Breakfast", "Parking"],
    type: "Resort",
  },
  {
    id: 2,
    name: "Downtown Boutique Hotel",
    location: "Tokyo, Japan",
    price: 180,
    rating: 4.9,
    reviews: 456,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGhvdGVsfGVufDF8fHx8MTc2MTExMDkyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    amenities: ["Wifi", "Cafe", "Gym", "Bar"],
    type: "Hotel",
  },
  {
    id: 3,
    name: "Cozy Beach Villa",
    location: "Santorini, Greece",
    price: 250,
    rating: 5.0,
    reviews: 189,
    image:
      "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW50b3JpbmklMjB2aWxsYXxlbnwxfHx8fDE3NjExMTA5Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    amenities: ["Wifi", "Pool", "Kitchen", "Beach Access"],
    type: "Villa",
  },
  {
    id: 4,
    name: "Mountain Lodge",
    location: "Swiss Alps, Switzerland",
    price: 200,
    rating: 4.7,
    reviews: 312,
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2lzcyUyMGxvZGdlfGVufDF8fHx8MTc2MTExMTA5Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    amenities: ["Wifi", "Parking", "Restaurant", "Spa"],
    type: "Lodge",
  },
];

const amenityIcons: Record<string, React.ReactNode> = {
  Wifi: <Wifi className="w-4 h-4" />,
  Pool: <Waves className="w-4 h-4" />,
  Breakfast: <Coffee className="w-4 h-4" />,
  Parking: <ParkingSquare className="w-4 h-4" />,
  Cafe: <Coffee className="w-4 h-4" />,
  Gym: <Coffee className="w-4 h-4" />,
  Bar: <Coffee className="w-4 h-4" />,
  Kitchen: <Coffee className="w-4 h-4" />,
  "Beach Access": <Waves className="w-4 h-4" />,
  Restaurant: <Coffee className="w-4 h-4" />,
  Spa: <Coffee className="w-4 h-4" />,
};

export default function Accommodation({ onNavigate }: AccommodationProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 p-4 md:p-8 relative overflow-hidden">
      <Navigation onNavigate={onNavigate} currentPage="accommodation" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 pt-16 md:pt-20">
        {/* Header */}
        <div className="mb-8">
          <div className="backdrop-blur-3xl bg-white/90 rounded-3xl border border-white/60 p-8 shadow-2xl shadow-white/15 ring-1 ring-white/25">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-gray-900 text-4xl font-bold mb-2">
                  Find Your Perfect Stay
                </h1>
                <p className="text-gray-700 text-lg">
                  Discover accommodations that match your travel style
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="bg-cyan-100 text-cyan-800 border-cyan-200"
                >
                  <Home className="w-4 h-4 mr-1" />
                  Accommodation Finder
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="backdrop-blur-3xl bg-white/90 rounded-2xl border border-white/60 p-6 mb-8 shadow-2xl shadow-white/15 ring-1 ring-white/25">
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-cyan-600 text-white hover:bg-cyan-700 px-4 py-2 cursor-pointer">
              All
            </Badge>
            <Badge
              variant="outline"
              className="border-cyan-300 text-cyan-800 hover:bg-cyan-50 px-4 py-2 cursor-pointer"
            >
              Hotels
            </Badge>
            <Badge
              variant="outline"
              className="border-cyan-300 text-cyan-800 hover:bg-cyan-50 px-4 py-2 cursor-pointer"
            >
              Resorts
            </Badge>
            <Badge
              variant="outline"
              className="border-cyan-300 text-cyan-800 hover:bg-cyan-50 px-4 py-2 cursor-pointer"
            >
              Villas
            </Badge>
            <Badge
              variant="outline"
              className="border-cyan-300 text-cyan-800 hover:bg-cyan-50 px-4 py-2 cursor-pointer"
            >
              Apartments
            </Badge>
          </div>
        </div>

        {/* Accommodation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          {accommodations.map((place) => (
            <div
              key={place.id}
              className="backdrop-blur-3xl bg-white/90 border border-white/60 shadow-2xl shadow-white/15 ring-1 ring-white/25 overflow-hidden hover:shadow-3xl transition-all hover:scale-[1.02] rounded-2xl"
            >
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 right-4 bg-white/90 text-gray-900">
                  {place.type}
                </Badge>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-gray-900 text-xl font-semibold mb-1">
                      {place.name}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {place.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-gray-900 font-medium">
                        {place.rating}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm">({place.reviews})</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {place.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {amenityIcons[amenity]}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-cyan-600 text-2xl font-bold">
                    ${place.price}
                  </span>
                  <span className="text-gray-500">/ night</span>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                    Book Now
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation to other sections */}
        <div className="backdrop-blur-3xl bg-white/90 rounded-2xl border border-white/60 p-6 shadow-2xl shadow-white/15 ring-1 ring-white/25">
          <h3 className="text-gray-900 mb-4 font-semibold">
            Continue Planning
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => onNavigate("planner")}
              variant="outline"
              className="border-cyan-300 text-cyan-800 hover:bg-cyan-50"
            >
              Trip Planner
            </Button>
            <Button
              onClick={() => onNavigate("activities")}
              variant="outline"
              className="border-cyan-300 text-cyan-800 hover:bg-cyan-50"
            >
              Activities
            </Button>
            <Button
              onClick={() => onNavigate("itinerary")}
              variant="outline"
              className="border-cyan-300 text-cyan-800 hover:bg-cyan-50"
            >
              Itinerary
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
