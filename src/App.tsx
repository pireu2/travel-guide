import { useState } from "react";
import LandingPage from "./components/LandingPage";
import TripPlanner from "./components/TripPlanner";
import Accommodation from "./components/Accommodation";
import Activities from "./components/Activities";
import WardrobePlanner from "./components/WardrobePlanner";
import Itinerary from "./components/Itinerary";

type PageType =
  | "home"
  | "planner"
  | "accommodation"
  | "activities"
  | "wardrobe"
  | "itinerary";

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
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return <div className="size-full">{renderPage()}</div>;
}
