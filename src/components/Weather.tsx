import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Eye,
  Droplets,
  Gauge,
  AlertTriangle,
  MapPin,
  Heart,
  RefreshCw,
  Zap,
  Activity,
  Search,
  Loader2,
} from "lucide-react";
import Navigation from "./Navigation";

interface WeatherProps {
  onNavigate: (page: string) => void;
}

interface WeatherData {
  location: string;
  current: {
    temp: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    uvIndex: number;
    visibility: number;
    pressure: number;
    airQuality: number;
  };
  forecast: Array<{
    date: string;
    temp: number;
    tempMin: number;
    tempMax: number;
    condition: string;
    precipitation: number;
    humidity: number;
  }>;
  alerts: Array<{
    type: "warning" | "watch" | "advisory";
    title: string;
    description: string;
  }>;
  historical: Array<{
    date: string;
    temp: number;
    condition: string;
  }>;
}

export default function Weather({ onNavigate }: WeatherProps) {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState<"C" | "F">("C");
  const [favorites, setFavorites] = useState<string[]>([
    "Tokyo, Japan",
    "Paris, France",
  ]);
  const [activeTab, setActiveTab] = useState("current");

  // Enhanced mock weather data
  const mockWeatherData: WeatherData = {
    location: location || "Tokyo, Japan",
    current: {
      temp: 22,
      condition: "Partly Cloudy",
      humidity: 65,
      windSpeed: 12,
      uvIndex: 6,
      visibility: 10,
      pressure: 1013,
      airQuality: 45,
    },
    forecast: [
      {
        date: "Today",
        temp: 22,
        tempMin: 18,
        tempMax: 26,
        condition: "Partly Cloudy",
        precipitation: 10,
        humidity: 65,
      },
      {
        date: "Tomorrow",
        temp: 24,
        tempMin: 19,
        tempMax: 28,
        condition: "Sunny",
        precipitation: 0,
        humidity: 60,
      },
      {
        date: "Day 3",
        temp: 20,
        tempMin: 16,
        tempMax: 24,
        condition: "Rainy",
        precipitation: 80,
        humidity: 75,
      },
      {
        date: "Day 4",
        temp: 18,
        tempMin: 14,
        tempMax: 22,
        condition: "Cloudy",
        precipitation: 20,
        humidity: 70,
      },
      {
        date: "Day 5",
        temp: 25,
        tempMin: 20,
        tempMax: 29,
        condition: "Sunny",
        precipitation: 0,
        humidity: 55,
      },
    ],
    alerts: [
      {
        type: "warning",
        title: "Heavy Rain Warning",
        description:
          "Heavy rainfall expected tomorrow afternoon. Possible flooding in low-lying areas.",
      },
    ],
    historical: [
      { date: "Yesterday", temp: 20, condition: "Sunny" },
      { date: "2 days ago", temp: 18, condition: "Cloudy" },
      { date: "3 days ago", temp: 23, condition: "Rainy" },
    ],
  };

  const handleGetWeather = (loc?: string) => {
    const targetLocation = loc || location;
    if (!targetLocation.trim()) return;

    setLoading(true);
    setTimeout(() => {
      setWeatherData({ ...mockWeatherData, location: targetLocation });
      setLoading(false);
    }, 1000);
  };

  const toggleFavorite = () => {
    if (!weatherData) return;
    setFavorites((prev) =>
      prev.includes(weatherData.location)
        ? prev.filter((f) => f !== weatherData.location)
        : [...prev, weatherData.location]
    );
  };

  const convertTemp = (temp: number) => {
    return unit === "F" ? Math.round((temp * 9) / 5 + 32) : temp;
  };

  const getWeatherIcon = (
    condition: string,
    size: "sm" | "md" | "lg" = "md"
  ) => {
    const iconSize =
      size === "sm" ? "w-5 h-5" : size === "lg" ? "w-10 h-10" : "w-8 h-8";
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className={`${iconSize} text-yellow-400 drop-shadow-lg`} />;
      case "rainy":
        return (
          <CloudRain className={`${iconSize} text-blue-500 drop-shadow-lg`} />
        );
      case "cloudy":
      case "partly cloudy":
        return <Cloud className={`${iconSize} text-gray-400 drop-shadow-lg`} />;
      default:
        return <Cloud className={`${iconSize} text-gray-400 drop-shadow-lg`} />;
    }
  };

  const getUVIndexColor = (uv: number) => {
    if (uv <= 2) return "text-green-500";
    if (uv <= 5) return "text-yellow-500";
    if (uv <= 7) return "text-orange-500";
    return "text-red-500";
  };

  const getAirQualityColor = (aqi: number) => {
    if (aqi <= 50) return "text-green-500";
    if (aqi <= 100) return "text-yellow-500";
    if (aqi <= 150) return "text-orange-500";
    return "text-red-500";
  };

  useEffect(() => {
    // Auto-load weather for first favorite
    if (favorites.length > 0 && !weatherData) {
      handleGetWeather(favorites[0]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-400 via-cyan-400 to-teal-500 p-4 md:p-8 relative overflow-hidden">
      <Navigation onNavigate={onNavigate} currentPage="weather" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 pt-16 md:pt-20">
        {/* Header */}
        <div className="mb-8">
          <div className="backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/30 p-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-gray-900 text-4xl font-bold mb-2">
                  Weather Forecast
                </h1>
                <p className="text-gray-700 text-lg">
                  Check the weather for your destination
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setUnit(unit === "C" ? "F" : "C")}
                  variant="outline"
                  size="sm"
                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  °{unit}
                </Button>
                <Button
                  onClick={() => handleGetWeather(weatherData?.location)}
                  variant="outline"
                  size="sm"
                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                  disabled={loading}
                >
                  <RefreshCw
                    className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                  />
                </Button>
                {weatherData && (
                  <Button
                    onClick={toggleFavorite}
                    variant="outline"
                    size="sm"
                    className="border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.includes(weatherData.location)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400"
                      }`}
                    />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Location Input & Favorites */}
          <div className="backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/30 p-6 shadow-2xl xl:col-span-1">
            <div className="mb-4">
              <h3 className="text-gray-900 text-lg font-semibold mb-2">
                Location
              </h3>
              <p className="text-gray-600 text-sm">
                Search for weather information
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-gray-700 text-sm font-medium">
                  City or Destination
                </label>
                <Input
                  placeholder="e.g., Paris, France"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-white/80 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500"
                />
              </div>
              <Button
                onClick={() => handleGetWeather()}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Getting Weather...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Get Weather Forecast
                  </>
                )}
              </Button>

              {favorites.length > 0 && (
                <div className="space-y-2">
                  <label className="text-gray-700 text-sm font-medium">
                    Favorites
                  </label>
                  <div className="space-y-1">
                    {favorites.map((fav) => (
                      <Button
                        key={fav}
                        onClick={() => handleGetWeather(fav)}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      >
                        <MapPin className="w-3 h-3 mr-2" />
                        {fav}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Weather Content */}
          <div className="xl:col-span-3">
            {weatherData ? (
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-4 backdrop-blur-2xl bg-white/95 border border-white/30">
                  <TabsTrigger
                    value="current"
                    className="text-gray-700 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900"
                  >
                    Current
                  </TabsTrigger>
                  <TabsTrigger
                    value="forecast"
                    className="text-gray-700 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900"
                  >
                    Forecast
                  </TabsTrigger>
                  <TabsTrigger
                    value="details"
                    className="text-gray-700 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900"
                  >
                    Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="history"
                    className="text-gray-700 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900"
                  >
                    History
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="current" className="space-y-6">
                  {/* Current Weather */}
                  <div className="backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/30 p-6 shadow-2xl">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-blue-100 rounded-2xl">
                        {getWeatherIcon(weatherData.current.condition, "lg")}
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">
                          {weatherData.location}
                        </div>
                        <div className="text-gray-600">
                          {weatherData.current.condition}
                        </div>
                      </div>
                    </div>
                    <div className="text-center mb-6">
                      <div className="text-6xl font-bold text-gray-900 mb-2">
                        {convertTemp(weatherData.current.temp)}°{unit}
                      </div>
                      <div className="text-gray-600">
                        Feels like {convertTemp(weatherData.current.temp + 2)}°
                        {unit}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-2xl">
                        <Wind className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                        <div className="text-gray-900 font-semibold">
                          {weatherData.current.windSpeed} km/h
                        </div>
                        <div className="text-gray-500 text-sm">Wind</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-2xl">
                        <Droplets className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                        <div className="text-gray-900 font-semibold">
                          {weatherData.current.humidity}%
                        </div>
                        <div className="text-gray-500 text-sm">Humidity</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-2xl">
                        <Zap
                          className={`w-6 h-6 mx-auto mb-2 ${getUVIndexColor(
                            weatherData.current.uvIndex
                          )}`}
                        />
                        <div className="text-gray-900 font-semibold">
                          {weatherData.current.uvIndex}
                        </div>
                        <div className="text-gray-500 text-sm">UV Index</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-2xl">
                        <Activity
                          className={`w-6 h-6 mx-auto mb-2 ${getAirQualityColor(
                            weatherData.current.airQuality
                          )}`}
                        />
                        <div className="text-gray-900 font-semibold">
                          {weatherData.current.airQuality}
                        </div>
                        <div className="text-gray-500 text-sm">Air Quality</div>
                      </div>
                    </div>
                  </div>

                  {/* Weather Alerts */}
                  {weatherData.alerts.length > 0 && (
                    <div className="backdrop-blur-2xl bg-red-50 rounded-3xl border border-red-200 p-6 shadow-2xl">
                      <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                        <h3 className="text-red-900 text-lg font-semibold">
                          Weather Alerts
                        </h3>
                      </div>
                      <div className="space-y-3">
                        {weatherData.alerts.map((alert, index) => (
                          <div
                            key={index}
                            className="p-4 bg-red-100 rounded-xl border border-red-200"
                          >
                            <div className="flex items-start gap-3">
                              <Badge
                                variant="destructive"
                                className="text-xs bg-red-600"
                              >
                                {alert.type.toUpperCase()}
                              </Badge>
                              <div>
                                <div className="text-red-900 font-semibold">
                                  {alert.title}
                                </div>
                                <div className="text-red-700 text-sm">
                                  {alert.description}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="forecast" className="space-y-6">
                  <div className="backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/30 p-6 shadow-2xl">
                    <h3 className="text-gray-900 text-xl font-semibold mb-2">
                      5-Day Forecast
                    </h3>
                    <p className="text-gray-600 text-sm mb-6">
                      Plan your activities based on the weather
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      {weatherData.forecast.map((day, index) => (
                        <div
                          key={index}
                          className="text-center p-4 rounded-2xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-all duration-300"
                        >
                          <div className="text-gray-900 font-medium mb-3">
                            {day.date}
                          </div>
                          <div className="flex justify-center mb-3">
                            {getWeatherIcon(day.condition)}
                          </div>
                          <div className="text-gray-900 text-xl font-bold mb-1">
                            {convertTemp(day.temp)}°{unit}
                          </div>
                          <div className="text-gray-600 text-sm mb-2">
                            {day.condition}
                          </div>
                          <div className="text-blue-600 text-xs">
                            {day.precipitation}% rain
                          </div>
                          <div className="text-gray-500 text-xs mt-1">
                            H: {convertTemp(day.tempMax)}° L:{" "}
                            {convertTemp(day.tempMin)}°
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="details" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/30 p-6 shadow-2xl">
                      <h3 className="text-gray-900 text-lg font-semibold mb-4">
                        Additional Details
                      </h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                          <div className="flex items-center gap-3">
                            <Eye className="w-5 h-5 text-gray-600" />
                            <span className="text-gray-700">Visibility</span>
                          </div>
                          <span className="text-gray-900 font-semibold">
                            {weatherData.current.visibility} km
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                          <div className="flex items-center gap-3">
                            <Gauge className="w-5 h-5 text-gray-600" />
                            <span className="text-gray-700">Pressure</span>
                          </div>
                          <span className="text-gray-900 font-semibold">
                            {weatherData.current.pressure} hPa
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                          <div className="flex items-center gap-3">
                            <Wind className="w-5 h-5 text-gray-600" />
                            <span className="text-gray-700">
                              Wind Direction
                            </span>
                          </div>
                          <span className="text-gray-900 font-semibold">
                            NW 12°
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/30 p-6 shadow-2xl">
                      <h3 className="text-gray-900 text-lg font-semibold mb-2">
                        Weather Map
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Satellite view
                      </p>
                      <div className="aspect-square bg-linear-to-br from-blue-50 to-cyan-50 rounded-xl flex items-center justify-center border border-gray-200">
                        <div className="text-center text-gray-500">
                          <Cloud className="w-12 h-12 mx-auto mb-2" />
                          <div className="text-sm">Weather Map</div>
                          <div className="text-xs">Coming Soon</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="history" className="space-y-6">
                  <div className="backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/30 p-6 shadow-2xl">
                    <h3 className="text-gray-900 text-lg font-semibold mb-2">
                      Historical Weather
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Past weather conditions
                    </p>
                    <div className="space-y-3">
                      {weatherData.historical.map((day, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                        >
                          <div className="flex items-center gap-3">
                            {getWeatherIcon(day.condition, "sm")}
                            <span className="text-gray-900">{day.date}</span>
                          </div>
                          <div className="text-gray-900 font-semibold">
                            {convertTemp(day.temp)}°{unit}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/30 p-6 shadow-2xl">
                <div className="flex items-center justify-center h-64">
                  <div className="text-center text-gray-500">
                    <Cloud className="w-16 h-16 mx-auto mb-4" />
                    <div className="text-lg">
                      Select a location to view weather
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <br />

        {/* Enhanced Travel Tips */}
        {weatherData && (
          <div className="backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/30 p-6 shadow-2xl">
            <h3 className="text-gray-900 text-xl font-semibold mb-6">
              Travel Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h4 className="text-gray-900 font-semibold">
                  Packing Recommendations
                </h4>
                <div className="space-y-2">
                  {weatherData.current.temp > 25 && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <Sun className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm">
                        Light clothing and sunscreen
                      </span>
                    </div>
                  )}
                  {weatherData.current.temp < 15 && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <Cloud className="w-4 h-4 text-blue-400" />
                      <span className="text-sm">Warm layers and jacket</span>
                    </div>
                  )}
                  {weatherData.forecast.some((d) => d.precipitation > 50) && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <CloudRain className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">Rain jacket and umbrella</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <span className="text-sm">Comfortable walking shoes</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="text-gray-900 font-semibold">
                  Activity Planning
                </h4>
                <div className="space-y-2">
                  {weatherData.forecast.some(
                    (d) => d.condition === "Sunny"
                  ) && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <Sun className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm">
                        Outdoor activities recommended
                      </span>
                    </div>
                  )}
                  {weatherData.forecast.some((d) => d.precipitation > 70) && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <CloudRain className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">
                        Indoor alternatives available
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <span className="text-sm">
                      Check local events and festivals
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="text-gray-900 font-semibold">Health & Safety</h4>
                <div className="space-y-2">
                  {weatherData.current.uvIndex > 7 && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <Zap className="w-4 h-4 text-orange-400" />
                      <span className="text-sm">High UV - use protection</span>
                    </div>
                  )}
                  {weatherData.current.airQuality > 100 && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <Activity className="w-4 h-4 text-red-400" />
                      <span className="text-sm">
                        Poor air quality - mask recommended
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <span className="text-sm">Stay hydrated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
