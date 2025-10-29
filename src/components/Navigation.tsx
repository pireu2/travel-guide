import { Button } from "./ui/button";
import {
  Home,
  MapPin,
  Calendar,
  Shirt,
  Plane,
  Cloud,
  DollarSign,
  Calculator,
  Package,
  Shield,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

interface NavigationProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const navigationItems = [
  {
    id: "home",
    label: "Home",
    icon: <Home className="w-4 h-4" />,
    color: "bg-blue-500",
  },
  {
    id: "planner",
    label: "Trip Planner",
    icon: <Plane className="w-4 h-4" />,
    color: "bg-green-500",
  },
  {
    id: "accommodation",
    label: "Accommodation",
    icon: <MapPin className="w-4 h-4" />,
    color: "bg-cyan-500",
  },
  {
    id: "activities",
    label: "Activities",
    icon: <Calendar className="w-4 h-4" />,
    color: "bg-purple-500",
  },
  {
    id: "wardrobe",
    label: "Wardrobe",
    icon: <Shirt className="w-4 h-4" />,
    color: "bg-orange-500",
  },
  {
    id: "itinerary",
    label: "Itinerary",
    icon: <Calendar className="w-4 h-4" />,
    color: "bg-violet-500",
  },
  {
    id: "weather",
    label: "Weather",
    icon: <Cloud className="w-4 h-4" />,
    color: "bg-sky-500",
  },
  {
    id: "currency",
    label: "Currency",
    icon: <DollarSign className="w-4 h-4" />,
    color: "bg-emerald-500",
  },
  {
    id: "budget",
    label: "Budget",
    icon: <Calculator className="w-4 h-4" />,
    color: "bg-rose-500",
  },
  {
    id: "packing",
    label: "Packing",
    icon: <Package className="w-4 h-4" />,
    color: "bg-amber-500",
  },
  {
    id: "emergency",
    label: "Emergency",
    icon: <Shield className="w-4 h-4" />,
    color: "bg-red-500",
  },
];

export default function Navigation({
  onNavigate,
  currentPage,
}: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="backdrop-blur-3xl bg-white/90 border border-white/50 shadow-2xl shadow-white/10 rounded-full px-6 py-3 ring-1 ring-white/20">
          <div className="flex items-center gap-2">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                variant={currentPage === item.id ? "default" : "ghost"}
                size="sm"
                className={`flex items-center gap-2 transition-all duration-200 ${
                  currentPage === item.id
                    ? `${item.color} text-white shadow-lg hover:shadow-xl ring-2 ring-white/30`
                    : "text-gray-900 hover:bg-white/60 hover:text-gray-900 backdrop-blur-sm"
                }`}
              >
                {item.icon}
                <span className="hidden lg:inline font-medium">
                  {item.label}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed top-4 right-4 z-50">
        <Button
          onClick={toggleMobileMenu}
          variant="outline"
          size="sm"
          className="backdrop-blur-3xl bg-white/90 border-white/50 text-gray-900 hover:bg-white/60 shadow-2xl shadow-white/10 ring-1 ring-white/20"
        >
          {isMobileMenuOpen ? (
            <X className="w-4 h-4" />
          ) : (
            <Menu className="w-4 h-4" />
          )}
        </Button>

        {isMobileMenuOpen && (
          <div className="absolute top-12 right-0 backdrop-blur-3xl bg-white/90 border border-white/50 rounded-2xl shadow-2xl shadow-white/10 p-4 min-w-64 ring-1 ring-white/20">
            <div className="grid grid-cols-2 gap-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  size="sm"
                  className={`flex items-center gap-2 justify-start transition-all duration-200 ${
                    currentPage === item.id
                      ? `${item.color} text-white shadow-lg hover:shadow-xl ring-2 ring-white/30`
                      : "text-gray-900 hover:bg-white/60 hover:text-gray-900 backdrop-blur-sm"
                  }`}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Bottom Navigation for Quick Access */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <div className="backdrop-blur-3xl bg-white/90 border border-white/50 rounded-2xl shadow-2xl shadow-white/10 p-3 ring-1 ring-white/20">
          <div className="flex items-center justify-around">
            {navigationItems.slice(0, 6).map((item) => (
              <Button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                variant="ghost"
                size="sm"
                className={`flex flex-col items-center gap-1 p-2 transition-all duration-200 ${
                  currentPage === item.id
                    ? `${item.color} text-white rounded-xl shadow-lg hover:shadow-xl ring-2 ring-white/30`
                    : "text-gray-900 hover:bg-white/60 hover:text-gray-900 backdrop-blur-sm"
                }`}
              >
                {item.icon}
                <span className="text-xs font-medium">
                  {item.label.split(" ")[0]}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
