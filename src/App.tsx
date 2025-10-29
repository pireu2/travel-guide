import { useState } from "react";
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

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [isTransitioning, setIsTransitioning] = useState(false);

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
              return <LandingPage onNavigate={handleNavigate} />;
            case "planner":
              return <TripPlanner onNavigate={handleNavigate} />;
            case "accommodation":
              return <Accommodation onNavigate={handleNavigate} />;
            case "activities":
              return <Activities onNavigate={handleNavigate} />;
            case "wardrobe":
              return <WardrobePlanner onNavigate={handleNavigate} />;
            case "itinerary":
              return <Itinerary onNavigate={handleNavigate} />;
            case "weather":
              return <Weather onNavigate={handleNavigate} />;
            case "currency":
              return <CurrencyConverter onNavigate={handleNavigate} />;
            case "budget":
              return <BudgetCalculator onNavigate={handleNavigate} />;
            case "packing":
              return <PackingList onNavigate={handleNavigate} />;
            case "emergency":
              return <EmergencyContacts onNavigate={handleNavigate} />;
            default:
              return <LandingPage onNavigate={handleNavigate} />;
          }
        })()}
      </div>
    );
  };

  return (
    <div className="size-full relative overflow-hidden">
      {/* Page transition overlay */}
      {isTransitioning && (
        <div className="absolute inset-0 bg-white/10 z-50 animate-in fade-in duration-150" />
      )}

      {renderPage()}
    </div>
  );
}
