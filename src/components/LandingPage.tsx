import { Button } from "./ui/button";
import { Plane, MapPin, Calendar, Sparkles } from "lucide-react";

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1604294731121-8bb3d4133971?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwdHJhdmVsfGVufDF8fHx8MTc2MTExMDkyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')",
        }}
      />

      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute top-40 right-20 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700" />
      <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Glass card */}
        <div className="max-w-5xl w-full backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h1 className="text-white mb-6 text-5xl md:text-7xl">
              Plan Your Perfect Journey
            </h1>

            <p className="text-white/90 max-w-2xl mx-auto text-xl md:text-2xl">
              From flights to local experiences, wardrobe planning to itinerary
              management. Everything you need for an unforgettable trip.
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 p-6 hover:bg-white/20 transition-all">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white mb-2">Smart Planning</h3>
              <p className="text-white/80">
                Coordinate flights, accommodation, and activities seamlessly
              </p>
            </div>

            <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 p-6 hover:bg-white/20 transition-all">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white mb-2">Local Experiences</h3>
              <p className="text-white/80">
                Discover authentic local culture beyond tourist spots
              </p>
            </div>

            <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 p-6 hover:bg-white/20 transition-all">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white mb-2">Organized Itinerary</h3>
              <p className="text-white/80">
                Keep track of every detail with smart scheduling
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => onNavigate("planner")}
              size="lg"
              className="bg-white text-purple-600 hover:bg-white/90 px-8 py-6 rounded-xl shadow-xl"
            >
              Start Planning Your Trip
            </Button>
            <Button
              onClick={() => onNavigate("activities")}
              size="lg"
              variant="outline"
              className="border-2 border-white text-black hover:bg-white/10 px-8 py-6 rounded-xl backdrop-blur-sm"
            >
              Explore Experiences
            </Button>
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => onNavigate("accommodation")}
            className="text-white/80 hover:text-white transition-colors"
          >
            Accommodation
          </button>
          <span className="text-white/40">•</span>
          <button
            onClick={() => onNavigate("wardrobe")}
            className="text-white/80 hover:text-white transition-colors"
          >
            Wardrobe Planner
          </button>
          <span className="text-white/40">•</span>
          <button
            onClick={() => onNavigate("itinerary")}
            className="text-white/80 hover:text-white transition-colors"
          >
            Itinerary
          </button>
          <span className="text-white/40">•</span>
          <button
            onClick={() => onNavigate("weather")}
            className="text-white/80 hover:text-white transition-colors"
          >
            Weather
          </button>
          <span className="text-white/40">•</span>
          <button
            onClick={() => onNavigate("currency")}
            className="text-white/80 hover:text-white transition-colors"
          >
            Currency
          </button>
          <span className="text-white/40">•</span>
          <button
            onClick={() => onNavigate("budget")}
            className="text-white/80 hover:text-white transition-colors"
          >
            Budget
          </button>
          <span className="text-white/40">•</span>
          <button
            onClick={() => onNavigate("packing")}
            className="text-white/80 hover:text-white transition-colors"
          >
            Packing List
          </button>
          <span className="text-white/40">•</span>
          <button
            onClick={() => onNavigate("emergency")}
            className="text-white/80 hover:text-white transition-colors"
          >
            Emergency
          </button>
        </div>
      </div>
    </div>
  );
}
