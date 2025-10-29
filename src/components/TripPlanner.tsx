import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ArrowLeft, Plane, MapPin, Users, Calendar as CalendarIcon } from "lucide-react";

interface TripPlannerProps {
  onNavigate: (page: string) => void;
}

export default function TripPlanner({ onNavigate }: TripPlannerProps) {
  const [destination, setDestination] = useState("");
  const [tripType, setTripType] = useState("");
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
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
            <h1 className="text-white mb-2">Trip Planner</h1>
            <p className="text-white/80">Let's plan your perfect journey together</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Planning Form */}
          <Card className="backdrop-blur-xl bg-white/95 border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle>Trip Details</CardTitle>
              <CardDescription>Tell us about your travel plans</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="destination"
                    placeholder="e.g., Tokyo, Japan"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input id="start-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input id="end-date" type="date" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="travelers">Number of Travelers</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="travelers"
                    type="number"
                    placeholder="1"
                    min="1"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="trip-type">Trip Type</Label>
                <Select value={tripType} onValueChange={setTripType}>
                  <SelectTrigger id="trip-type">
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
                <Label htmlFor="budget">Budget (USD)</Label>
                <Input 
                  id="budget"
                  type="number"
                  placeholder="e.g., 2000"
                />
              </div>

              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Generate Trip Plan
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card className="backdrop-blur-xl bg-white/95 border-white/20 shadow-2xl hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => onNavigate('accommodation')}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                    <Plane className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>Find Accommodation</CardTitle>
                    <CardDescription>Browse hotels, apartments, and unique stays</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="backdrop-blur-xl bg-white/95 border-white/20 shadow-2xl hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => onNavigate('activities')}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>Discover Activities</CardTitle>
                    <CardDescription>Find authentic local experiences and attractions</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="backdrop-blur-xl bg-white/95 border-white/20 shadow-2xl hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => onNavigate('wardrobe')}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl">
                    <CalendarIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>Plan Your Wardrobe</CardTitle>
                    <CardDescription>Weather-based packing recommendations</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card className="backdrop-blur-xl bg-white/95 border-white/20 shadow-2xl hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => onNavigate('itinerary')}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
                    <CalendarIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>Create Itinerary</CardTitle>
                    <CardDescription>Organize your daily schedule and activities</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
