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
  LogOut,
  User,
  Keyboard,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface UserInfo {
  username: string;
  role: string;
}

interface NavigationProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onLogout?: () => void;
  user?: UserInfo | null;
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
  onLogout,
  user,
}: NavigationProps) {
  return (
    <TooltipProvider>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="backdrop-blur-3xl bg-white/90 border border-white/50 shadow-2xl shadow-white/10 rounded-full px-4 py-2 ring-1 ring-white/20">
          <div className="flex items-center gap-1">
            {navigationItems.map((item, index) => (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <Button
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
                    <span className="hidden xl:inline font-medium">
                      {item.label}
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="flex items-center gap-2">
                  <span>{item.label}</span>
                  <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 rounded border">Alt+{index === 10 ? '0' : index + 1}</kbd>
                </TooltipContent>
              </Tooltip>
            ))}
            
            {/* User Menu */}
            {user && onLogout && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 flex items-center gap-2 text-gray-900 hover:bg-white/60"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="hidden lg:inline font-medium capitalize">{user.username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-semibold capitalize">{user.username}</span>
                      <span className="text-xs text-gray-500 capitalize">{user.role}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <Keyboard className="w-4 h-4 mr-2" />
                    <span>Keyboard Shortcuts</span>
                    <span className="ml-auto text-xs text-gray-400">Alt+1-0</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="cursor-pointer text-red-600 focus:text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Top Navigation */}
      <nav className="md:hidden fixed top-4 left-4 right-4 z-50">
        <div className="backdrop-blur-3xl bg-white/95 border border-white/50 rounded-2xl shadow-2xl shadow-white/10 p-2 ring-1 ring-white/20">
          <div className="flex items-center justify-around overflow-x-auto scrollbar-hide gap-1 px-2">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                variant="ghost"
                size="sm"
                className={`flex flex-col items-center gap-1 p-2 min-w-0 shrink-0 transition-all duration-200 ${
                  currentPage === item.id
                    ? `${item.color} text-white rounded-xl shadow-lg hover:shadow-xl ring-2 ring-white/30`
                    : "text-gray-900 hover:bg-white/60 hover:text-gray-900 backdrop-blur-sm"
                }`}
              >
                {item.icon}
                <span className="text-xs font-medium truncate max-w-16">
                  {item.label.split(" ")[0]}
                </span>
              </Button>
            ))}
            
            {/* Mobile User/Logout Button */}
            {user && onLogout && (
              <Button
                onClick={onLogout}
                variant="ghost"
                size="sm"
                className="flex flex-col items-center gap-1 p-2 min-w-0 shrink-0 text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-xs font-medium">Logout</span>
              </Button>
            )}
          </div>
        </div>
      </nav>
    </TooltipProvider>
  );
}
