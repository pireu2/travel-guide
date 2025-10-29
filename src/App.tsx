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

  const handleNavigate = (page: string) => {
    setCurrentPage(page as PageType);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
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
  };

  return <div className="size-full">{renderPage()}</div>;
}
