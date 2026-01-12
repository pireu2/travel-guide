import { useState, useEffect, useCallback } from "react";
import LoginPage from "./components/LoginPage";
import LandingPage from "./components/LandingPage";
import TripPlanner from "./components/TripPlanner";
import Accommodation from "./components/Accommodation";
import Activities from "./components/Activities";
import WardrobePlanner from "./components/WardrobePlanner";
import Itinerary from "./components/Itinerary";
import Weather from "./components/Weather";
import CurrencyConverter from "./components/CurrencyConverter";
import BudgetCalculator from "./components/BudgetCalculator";
import PackingList from "./components/PackingList";
import EmergencyContacts from "./components/EmergencyContacts";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";

type PageType =
  | "home"
  | "planner"
  | "accommodation"
  | "activities"
  | "wardrobe"
  | "itinerary"
  | "weather"
  | "currency"
  | "budget"
  | "packing"
  | "emergency";

interface User {
  username: string;
  role: string;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    const storedUser = localStorage.getItem("user");
    setIsAuthenticated(authStatus);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle shortcuts when authenticated and not in input fields
      if (!isAuthenticated) return;
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

      // Alt + number shortcuts for navigation
      if (e.altKey) {
        const shortcuts: Record<string, PageType> = {
          "1": "home",
          "2": "planner",
          "3": "accommodation",
          "4": "activities",
          "5": "itinerary",
          "6": "weather",
          "7": "currency",
          "8": "budget",
          "9": "packing",
          "0": "emergency",
        };
        if (shortcuts[e.key]) {
          e.preventDefault();
          handleNavigate(shortcuts[e.key]);
          toast.info(`Navigated to ${shortcuts[e.key]}`, { duration: 1500 });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAuthenticated]);

  const handleLogin = useCallback(() => {
    setIsAuthenticated(true);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    toast.success("Welcome back!", { duration: 2000 });
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    setCurrentPage("home");
    toast.info("You have been logged out", { duration: 2000 });
  }, []);

  const handleNavigate = (page: string) => {
    if (page === currentPage) return; // Don't transition to the same page

    setIsTransitioning(true);

    // Faster transition - reduced from 300ms to 150ms
    setTimeout(() => {
      setCurrentPage(page as PageType);
      setIsTransitioning(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 150);
  };

  const renderPage = () => {
    const pageClasses = isTransitioning
      ? "animate-out fade-out duration-150"
      : "animate-in fade-in duration-200";

    return (
      <div className={pageClasses}>
        {(() => {
          switch (currentPage) {
            case "home":
              return <LandingPage onNavigate={handleNavigate} onLogout={handleLogout} user={user} />;
            case "planner":
              return <TripPlanner onNavigate={handleNavigate} onLogout={handleLogout} user={user} />;
            case "accommodation":
              return <Accommodation onNavigate={handleNavigate} onLogout={handleLogout} user={user} />;
            case "activities":
              return <Activities onNavigate={handleNavigate} onLogout={handleLogout} user={user} />;
            case "wardrobe":
              return <WardrobePlanner onNavigate={handleNavigate} onLogout={handleLogout} user={user} />;
            case "itinerary":
              return <Itinerary onNavigate={handleNavigate} onLogout={handleLogout} user={user} />;
            case "weather":
              return <Weather onNavigate={handleNavigate} onLogout={handleLogout} user={user} />;
            case "currency":
              return <CurrencyConverter onNavigate={handleNavigate} onLogout={handleLogout} user={user} />;
            case "budget":
              return <BudgetCalculator onNavigate={handleNavigate} onLogout={handleLogout} user={user} />;
            case "packing":
              return <PackingList onNavigate={handleNavigate} onLogout={handleLogout} user={user} />;
            case "emergency":
              return <EmergencyContacts onNavigate={handleNavigate} onLogout={handleLogout} user={user} />;
            default:
              return <LandingPage onNavigate={handleNavigate} onLogout={handleLogout} user={user} />;
          }
        })()}
      </div>
    );
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="size-full relative overflow-hidden">
      {/* Toast notifications */}
      <Toaster position="top-right" richColors closeButton />
      
      {/* Page transition overlay */}
      {isTransitioning && (
        <div className="absolute inset-0 bg-white/10 z-50 animate-in fade-in duration-150" />
      )}

      {renderPage()}
    </div>
  );
}
