import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  MapPin,
  Star,
  Wifi,
  Coffee,
  ParkingSquare,
  Waves,
  Home,
  Users,
  Bed,
  Bath,
  X,
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
    description: "Experience luxury at its finest with stunning ocean views. Our resort features world-class amenities and exceptional service to make your stay unforgettable.",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
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
    type: "Hotels",
    description: "Located in the heart of Tokyo, this boutique hotel offers modern comfort with traditional Japanese hospitality. Perfect for exploring the city's vibrant culture.",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
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
    type: "Villas",
    description: "Your private paradise in Santorini. This beautiful villa features stunning caldera views, a private pool, and direct beach access. Perfect for a romantic getaway.",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    checkIn: "3:00 PM",
    checkOut: "11:00 AM",
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
    type: "Resorts",
    description: "Nestled in the majestic Swiss Alps, this lodge offers breathtaking mountain views, gourmet dining, and rejuvenating spa treatments. Ideal for ski enthusiasts and nature lovers.",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 3,
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
  },
  {
    id: 5,
    name: "City Center Apartment",
    location: "New York, USA",
    price: 150,
    rating: 4.6,
    reviews: 198,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnR8ZW58MXx8fHwxNzYxMTEwOTI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    amenities: ["Wifi", "Kitchen", "Parking", "Gym"],
    type: "Apartments",
    description: "Modern apartment in the heart of Manhattan. Fully equipped kitchen, high-speed wifi, and easy access to all major attractions. Feel at home in the city that never sleeps.",
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    checkIn: "3:00 PM",
    checkOut: "11:00 AM",
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

const filterOptions = ["All", "Hotels", "Resorts", "Villas", "Apartments"];

export default function Accommodation({ onNavigate }: AccommodationProps) {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedAccommodation, setSelectedAccommodation] = useState<typeof accommodations[0] | null>(null);

  const filteredAccommodations =
    selectedFilter === "All"
      ? accommodations
      : accommodations.filter((place) => place.type === selectedFilter);

  return (
    <div className="min-h-screen bg-linear-to-br from-cyan-500 via-blue-500 to-indigo-600 p-4 md:p-8 relative overflow-hidden">
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
            {filterOptions.map((filter) => (
              <Badge
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={
                  selectedFilter === filter
                    ? "bg-cyan-600 text-white hover:bg-cyan-700 px-4 py-2 cursor-pointer"
                    : "bg-white border-cyan-300 text-cyan-800 hover:bg-cyan-50 px-4 py-2 cursor-pointer"
                }
                variant={selectedFilter === filter ? "default" : "outline"}
              >
                {filter}
              </Badge>
            ))}
          </div>
        </div>

        {/* Accommodation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          {filteredAccommodations.map((place) => (
            <Card
              key={place.id}
              className="backdrop-blur-3xl bg-white/90 border border-white/60 shadow-2xl shadow-white/15 ring-1 ring-white/25 overflow-hidden hover:shadow-3xl transition-all hover:scale-[1.02]"
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

              <CardContent className="p-6">
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
                    onClick={() => setSelectedAccommodation(place)}
                    variant="outline"
                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
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

      {/* Details Dialog */}
      <Dialog open={!!selectedAccommodation} onOpenChange={() => setSelectedAccommodation(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedAccommodation && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  {selectedAccommodation.name}
                </DialogTitle>
                <DialogDescription className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {selectedAccommodation.location}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Image */}
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={selectedAccommodation.image}
                    alt={selectedAccommodation.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-white/90 text-gray-900">
                    {selectedAccommodation.type}
                  </Badge>
                </div>

                {/* Rating and Price */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xl font-semibold text-gray-900">
                        {selectedAccommodation.rating}
                      </span>
                    </div>
                    <span className="text-gray-500">
                      ({selectedAccommodation.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-cyan-600 text-3xl font-bold">
                      ${selectedAccommodation.price}
                    </span>
                    <span className="text-gray-500">/ night</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    About this place
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedAccommodation.description}
                  </p>
                </div>

                {/* Property Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Property Details
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Bed className="w-5 h-5 text-cyan-600" />
                      <div>
                        <p className="text-sm text-gray-500">Bedrooms</p>
                        <p className="font-semibold">{selectedAccommodation.bedrooms}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Bath className="w-5 h-5 text-cyan-600" />
                      <div>
                        <p className="text-sm text-gray-500">Bathrooms</p>
                        <p className="font-semibold">{selectedAccommodation.bathrooms}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Users className="w-5 h-5 text-cyan-600" />
                      <div>
                        <p className="text-sm text-gray-500">Max Guests</p>
                        <p className="font-semibold">{selectedAccommodation.maxGuests}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Home className="w-5 h-5 text-cyan-600" />
                      <div>
                        <p className="text-sm text-gray-500">Type</p>
                        <p className="font-semibold">{selectedAccommodation.type}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Amenities
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedAccommodation.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-2 bg-gray-50 text-gray-700 px-4 py-3 rounded-lg"
                      >
                        {amenityIcons[amenity]}
                        <span className="font-medium">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Check-in/out */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Check-in & Check-out
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 px-4 py-3 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Check-in</p>
                      <p className="font-semibold text-gray-900">
                        {selectedAccommodation.checkIn}
                      </p>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Check-out</p>
                      <p className="font-semibold text-gray-900">
                        {selectedAccommodation.checkOut}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white h-12 text-lg">
                    Book Now - ${selectedAccommodation.price}/night
                  </Button>
                  <Button
                    onClick={() => setSelectedAccommodation(null)}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
