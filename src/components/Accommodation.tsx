import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, MapPin, Star, Wifi, Coffee, ParkingSquare, Waves } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

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
    image: "https://images.unsplash.com/photo-1655292912612-bb5b1bda9355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYxMDkwMDI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    amenities: ["Wifi", "Pool", "Breakfast", "Parking"],
    type: "Resort"
  },
  {
    id: 2,
    name: "Downtown Boutique Hotel",
    location: "Tokyo, Japan",
    price: 180,
    rating: 4.9,
    reviews: 456,
    image: "https://images.unsplash.com/photo-1655292912612-bb5b1bda9355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYxMDkwMDI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    amenities: ["Wifi", "Cafe", "Gym", "Bar"],
    type: "Hotel"
  },
  {
    id: 3,
    name: "Cozy Beach Villa",
    location: "Santorini, Greece",
    price: 250,
    rating: 5.0,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1655292912612-bb5b1bda9355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYxMDkwMDI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    amenities: ["Wifi", "Pool", "Kitchen", "Beach Access"],
    type: "Villa"
  },
  {
    id: 4,
    name: "Mountain Lodge",
    location: "Swiss Alps, Switzerland",
    price: 200,
    rating: 4.7,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1655292912612-bb5b1bda9355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYxMDkwMDI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    amenities: ["Wifi", "Parking", "Restaurant", "Spa"],
    type: "Lodge"
  }
];

const amenityIcons: Record<string, React.ReactNode> = {
  "Wifi": <Wifi className="w-4 h-4" />,
  "Pool": <Waves className="w-4 h-4" />,
  "Breakfast": <Coffee className="w-4 h-4" />,
  "Parking": <ParkingSquare className="w-4 h-4" />,
  "Cafe": <Coffee className="w-4 h-4" />,
  "Gym": <Coffee className="w-4 h-4" />,
  "Bar": <Coffee className="w-4 h-4" />,
  "Kitchen": <Coffee className="w-4 h-4" />,
  "Beach Access": <Waves className="w-4 h-4" />,
  "Restaurant": <Coffee className="w-4 h-4" />,
  "Spa": <Coffee className="w-4 h-4" />
};

export default function Accommodation({ onNavigate }: AccommodationProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button 
            onClick={() => onNavigate('home')}
            variant="ghost"
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 p-6 md:p-8">
            <h1 className="text-white mb-2">Find Your Perfect Stay</h1>
            <p className="text-white/80">Discover accommodations that match your travel style</p>
          </div>
        </div>

        {/* Filters */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 mb-8">
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-white text-blue-600 hover:bg-white/90 px-4 py-2 cursor-pointer">
              All
            </Badge>
            <Badge variant="outline" className="border-white text-white hover:bg-white/10 px-4 py-2 cursor-pointer">
              Hotels
            </Badge>
            <Badge variant="outline" className="border-white text-white hover:bg-white/10 px-4 py-2 cursor-pointer">
              Resorts
            </Badge>
            <Badge variant="outline" className="border-white text-white hover:bg-white/10 px-4 py-2 cursor-pointer">
              Villas
            </Badge>
            <Badge variant="outline" className="border-white text-white hover:bg-white/10 px-4 py-2 cursor-pointer">
              Apartments
            </Badge>
          </div>
        </div>

        {/* Accommodation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          {accommodations.map((place) => (
            <Card key={place.id} className="backdrop-blur-xl bg-white/95 border-white/20 shadow-2xl overflow-hidden hover:shadow-3xl transition-all hover:scale-[1.02]">
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
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{place.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="w-4 h-4" />
                      {place.location}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{place.rating}</span>
                    </div>
                    <p className="text-muted-foreground">({place.reviews})</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {place.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-1 bg-secondary px-3 py-1 rounded-full">
                      {amenityIcons[amenity]}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-baseline gap-1">
                  <span className="text-primary">${place.price}</span>
                  <span className="text-muted-foreground">/ night</span>
                </div>
              </CardContent>
              
              <CardFooter className="flex gap-2">
                <Button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  Book Now
                </Button>
                <Button variant="outline" className="flex-1">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Navigation to other sections */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
          <h3 className="text-white mb-4">Continue Planning</h3>
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={() => onNavigate('planner')}
              variant="outline"
              className="border-white text-black hover:bg-white/10"
            >
              Trip Planner
            </Button>
            <Button 
              onClick={() => onNavigate('activities')}
              variant="outline"
              className="border-white text-black hover:bg-white/10"
            >
              Activities
            </Button>
            <Button 
              onClick={() => onNavigate('itinerary')}
              variant="outline"
              className="border-white text-black hover:bg-white/10"
            >
              Itinerary
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
