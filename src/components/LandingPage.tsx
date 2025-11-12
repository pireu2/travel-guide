import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Plane,
  MapPin,
  Calendar,
  Sparkles,
  Compass,
  Heart,
  Star,
  Globe,
  Camera,
  Users,
  CheckCircle,
} from "lucide-react";
import { createStaggeredDelays } from "../lib/animations";

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const [showContent, setShowContent] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  // Staggered animation delays
  const featureDelays = createStaggeredDelays(4, 200);
  const navDelays = createStaggeredDelays(9, 50);

  useEffect(() => {
    // Trigger animations after component mounts
    const contentTimer = setTimeout(() => setShowContent(true), 200);
    const featuresTimer = setTimeout(() => setShowFeatures(true), 800);

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(featuresTimer);
    };
  }, []);

  const features = [
    {
      icon: Compass,
      title: "Smart Planning",
      description:
        "AI-powered trip coordination from flights to local experiences",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Heart,
      title: "Local Experiences",
      description:
        "Discover authentic culture and hidden gems beyond tourist traps",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      icon: Star,
      title: "Personalized Itinerary",
      description: "Custom schedules that adapt to your preferences and pace",
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Comprehensive travel tools for destinations worldwide",
      gradient: "from-emerald-500 to-teal-500",
    },
  ];

  const quickLinks = [
    { name: "Trip Planner", page: "planner", icon: Plane },
    { name: "Accommodation", page: "accommodation", icon: MapPin },
    { name: "Activities", page: "activities", icon: Camera },
    { name: "Wardrobe", page: "wardrobe", icon: Sparkles },
    { name: "Itinerary", page: "itinerary", icon: Calendar },
    { name: "Weather", page: "weather", icon: Globe },
    { name: "Currency", page: "currency", icon: Star },
    { name: "Budget", page: "budget", icon: CheckCircle },
    { name: "Packing", page: "packing", icon: Users },
  ];
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Enhanced background with multiple layers */}
      <div className="absolute inset-0">
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />

        {/* Animated geometric shapes */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-32 right-16 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-700" />

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-size-[24px_24px]" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Hero section */}
        <div
          className={`max-w-6xl w-full text-center mb-16 transition-all duration-1000 ${
            showContent
              ? "animate-in fade-in slide-in-from-bottom-4 duration-1000"
              : "opacity-0 translate-y-8"
          }`}
        >

          {/* Main heading */}
          <h1 className="text-white text-6xl md:text-8xl font-bold mb-6 leading-tight">
            Plan Your
            <span className="block bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Perfect Journey
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/80 max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed mb-12">
            From intelligent trip coordination to authentic local experiences.
            Everything you need for unforgettable adventures, beautifully
            organized.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              onClick={() => onNavigate("planner")}
              size="lg"
              className="bg-white text-slate-900 hover:bg-white/90 px-8 py-4 rounded-2xl shadow-2xl shadow-white/25 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-3xl hover:shadow-white/30 text-lg font-semibold"
            >
              <Plane className="w-5 h-5 mr-2" />
              Start Your Journey
            </Button>
            <Button
              onClick={() => onNavigate("activities")}
              size="lg"
              variant="outline"
              className="border-2 border-white/30 text-black hover:bg-white/10 hover:border-white/50 px-8 py-4 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95 text-lg font-semibold"
            >
              <Camera className="w-5 h-5 mr-2" />
              Explore Experiences
            </Button>
          </div>
        </div>

        {/* Features grid */}
        <div className="max-w-7xl w-full mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={feature.title}
                  className={`backdrop-blur-3xl bg-white/5 rounded-3xl border border-white/10 p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/10 group ${
                    showFeatures
                      ? "animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    animationDelay: showFeatures
                      ? `${featureDelays[index]}ms`
                      : "0ms",
                  }}
                >
                  <div
                    className={`w-14 h-14 bg-linear-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-3 group-hover:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick navigation */}
        <div className="max-w-6xl w-full">
          <div className="text-center mb-8">
            <h2 className="text-white/90 text-2xl font-semibold mb-2">
              Quick Access
            </h2>
            <p className="text-white/60">Jump straight to any planning tool</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {quickLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <button
                  key={link.page}
                  onClick={() => onNavigate(link.page)}
                  className={`backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-white/10 group text-center ${
                    showFeatures
                      ? "animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    animationDelay: showFeatures
                      ? `${navDelays[index]}ms`
                      : "0ms",
                  }}
                >
                  <IconComponent className="w-6 h-6 text-white/80 group-hover:text-white mx-auto mb-2 transition-colors duration-300" />
                  <span className="text-white/80 group-hover:text-white text-sm font-medium transition-colors duration-300">
                    {link.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-white/50 text-sm">
            Made with ❤️ for travelers who dream big
          </p>
        </div>
      </div>
    </div>
  );
}
