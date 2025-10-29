import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  ArrowRight,
  DollarSign,
  Euro,
  PoundSterling,
  TrendingUp,
  TrendingDown,
  Star,
  Clock,
  Wifi,
  WifiOff,
  Calculator,
  BarChart3,
  RefreshCw,
} from "lucide-react";
import Navigation from "./Navigation";

interface CurrencyConverterProps {
  onNavigate: (page: string) => void;
}

interface Currency {
  code: string;
  name: string;
  symbol: string;
  icon: React.ReactNode;
  flag: string;
}

interface HistoricalRate {
  date: string;
  rate: number;
  change: number;
}

const currencies: Currency[] = [
  {
    code: "USD",
    name: "US Dollar",
    symbol: "$",
    icon: <DollarSign className="w-4 h-4" />,
    flag: "🇺🇸",
  },
  {
    code: "EUR",
    name: "Euro",
    symbol: "€",
    icon: <Euro className="w-4 h-4" />,
    flag: "🇪🇺",
  },
  {
    code: "GBP",
    name: "British Pound",
    symbol: "£",
    icon: <PoundSterling className="w-4 h-4" />,
    flag: "🇬🇧",
  },
  {
    code: "JPY",
    name: "Japanese Yen",
    symbol: "¥",
    icon: <DollarSign className="w-4 h-4" />,
    flag: "🇯🇵",
  },
  {
    code: "CAD",
    name: "Canadian Dollar",
    symbol: "C$",
    icon: <DollarSign className="w-4 h-4" />,
    flag: "🇨🇦",
  },
  {
    code: "AUD",
    name: "Australian Dollar",
    symbol: "A$",
    icon: <DollarSign className="w-4 h-4" />,
    flag: "🇦🇺",
  },
  {
    code: "CHF",
    name: "Swiss Franc",
    symbol: "Fr",
    icon: <Euro className="w-4 h-4" />,
    flag: "🇨🇭",
  },
  {
    code: "CNY",
    name: "Chinese Yuan",
    symbol: "¥",
    icon: <DollarSign className="w-4 h-4" />,
    flag: "🇨🇳",
  },
  {
    code: "INR",
    name: "Indian Rupee",
    symbol: "₹",
    icon: <DollarSign className="w-4 h-4" />,
    flag: "🇮🇳",
  },
  {
    code: "KRW",
    name: "South Korean Won",
    symbol: "₩",
    icon: <DollarSign className="w-4 h-4" />,
    flag: "🇰🇷",
  },
];

// Mock exchange rates with historical data
const mockExchangeRates: Record<string, number> = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110.0,
  CAD: 1.25,
  AUD: 1.35,
  CHF: 0.92,
  CNY: 6.45,
  INR: 74.5,
  KRW: 1180.0,
};

const mockHistoricalRates: Record<string, HistoricalRate[]> = {
  EUR: [
    { date: "Today", rate: 0.85, change: 0.002 },
    { date: "Yesterday", rate: 0.848, change: -0.005 },
    { date: "2 days ago", rate: 0.853, change: 0.001 },
    { date: "3 days ago", rate: 0.852, change: 0.003 },
    { date: "1 week ago", rate: 0.849, change: -0.002 },
  ],
  GBP: [
    { date: "Today", rate: 0.73, change: -0.001 },
    { date: "Yesterday", rate: 0.731, change: 0.003 },
    { date: "2 days ago", rate: 0.728, change: -0.004 },
    { date: "3 days ago", rate: 0.732, change: 0.002 },
    { date: "1 week ago", rate: 0.73, change: 0.001 },
  ],
};

export default function CurrencyConverter({
  onNavigate,
}: CurrencyConverterProps) {
  const [amount, setAmount] = useState<string>("100");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [favorites, setFavorites] = useState<string[]>(["EUR", "GBP", "JPY"]);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState("convert");

  useEffect(() => {
    if (amount && fromCurrency && toCurrency) {
      const numAmount = parseFloat(amount);
      if (!isNaN(numAmount)) {
        const rate =
          mockExchangeRates[toCurrency] / mockExchangeRates[fromCurrency];
        setConvertedAmount(numAmount * rate);
      }
    }
  }, [amount, fromCurrency, toCurrency]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const toggleFavorite = (currencyCode: string) => {
    setFavorites((prev) =>
      prev.includes(currencyCode)
        ? prev.filter((c) => c !== currencyCode)
        : [...prev, currencyCode]
    );
  };

  const getCurrencyByCode = (code: string) =>
    currencies.find((c) => c.code === code);

  const getRateChange = (currencyCode: string) => {
    const history = mockHistoricalRates[currencyCode];
    if (!history || history.length < 2) return 0;
    return history[0].rate - history[1].rate;
  };

  const formatRate = (rate: number) => {
    return rate.toFixed(4);
  };

  const getChangeColor = (change: number) => {
    return change > 0
      ? "text-green-600"
      : change < 0
      ? "text-red-600"
      : "text-gray-600";
  };

  const getChangeIcon = (change: number) => {
    return change > 0 ? (
      <TrendingUp className="w-3 h-3" />
    ) : change < 0 ? (
      <TrendingDown className="w-3 h-3" />
    ) : null;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-400 via-emerald-400 to-teal-500 p-4 md:p-8 relative overflow-hidden">
      <Navigation onNavigate={onNavigate} currentPage="currency" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-green-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 pt-16 md:pt-20">
        {/* Header */}
        <div className="mb-8">
          <div className="backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/30 p-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-gray-900 text-4xl font-bold mb-2">
                  Currency Converter
                </h1>
                <p className="text-gray-700 text-lg">
                  Convert currencies for your travel expenses
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-gray-600 text-sm">
                  {isOnline ? (
                    <Wifi className="w-4 h-4 text-green-500" />
                  ) : (
                    <WifiOff className="w-4 h-4 text-red-500" />
                  )}
                  <span className="hidden sm:inline">
                    {isOnline ? "Online" : "Offline"}
                  </span>
                </div>
                <Button
                  onClick={() => setIsOnline(!isOnline)}
                  variant="outline"
                  size="sm"
                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 border-blue-200"
                >
                  Live Rates
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 backdrop-blur-2xl bg-white/95 border border-white/30 mb-6">
            <TabsTrigger
              value="convert"
              className="text-gray-700 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900"
            >
              Convert
            </TabsTrigger>
            <TabsTrigger
              value="rates"
              className="text-gray-700 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900"
            >
              Rates
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="text-gray-700 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900"
            >
              History
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="text-gray-700 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900"
            >
              Favorites
            </TabsTrigger>
          </TabsList>

          <TabsContent value="convert" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Main Converter */}
              <div className="backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/30 p-6 shadow-2xl">
                <div className="mb-6">
                  <h3 className="text-gray-900 text-lg font-semibold flex items-center gap-2 mb-2">
                    <Calculator className="w-5 h-5" />
                    Currency Exchange
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Convert between different currencies
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-gray-700 text-sm font-medium">
                      Amount
                    </label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="bg-white/80 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-1 space-y-2">
                      <label className="text-gray-700 text-sm font-medium">
                        From
                      </label>
                      <Select
                        value={fromCurrency}
                        onValueChange={setFromCurrency}
                      >
                        <SelectTrigger className="bg-white/80 border-gray-300 text-gray-900">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map((currency) => (
                            <SelectItem
                              key={currency.code}
                              value={currency.code}
                            >
                              <div className="flex items-center gap-2">
                                <span>{currency.flag}</span>
                                {currency.icon}
                                {currency.code} - {currency.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      onClick={handleSwapCurrencies}
                      variant="outline"
                      size="icon"
                      className="mt-6 border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Button>

                    <div className="flex-1 space-y-2">
                      <label className="text-gray-700 text-sm font-medium">
                        To
                      </label>
                      <Select value={toCurrency} onValueChange={setToCurrency}>
                        <SelectTrigger className="bg-white/80 border-gray-300 text-gray-900">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map((currency) => (
                            <SelectItem
                              key={currency.code}
                              value={currency.code}
                            >
                              <div className="flex items-center gap-2">
                                <span>{currency.flag}</span>
                                {currency.icon}
                                {currency.code} - {currency.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="p-6 bg-gray-50 backdrop-blur-sm rounded-xl border border-gray-200">
                    <div className="text-gray-600 text-sm mb-2">
                      Converted Amount
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {convertedAmount.toFixed(2)}{" "}
                      {getCurrencyByCode(toCurrency)?.symbol}
                    </div>
                    <div className="text-gray-500 text-sm">
                      1 {fromCurrency} ={" "}
                      {formatRate(
                        mockExchangeRates[toCurrency] /
                          mockExchangeRates[fromCurrency]
                      )}{" "}
                      {toCurrency}
                    </div>
                    {mockHistoricalRates[toCurrency] && (
                      <div
                        className={`flex items-center gap-1 mt-2 text-sm ${getChangeColor(
                          getRateChange(toCurrency)
                        )}`}
                      >
                        {getChangeIcon(getRateChange(toCurrency))}
                        <span>
                          {Math.abs(getRateChange(toCurrency) * 10000).toFixed(
                            2
                          )}{" "}
                          pts today
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Conversions */}
              <div className="backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/30 p-6 shadow-2xl">
                <div className="mb-6">
                  <h3 className="text-gray-900 text-lg font-semibold mb-2">
                    Quick Conversions
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Common amounts in popular currencies
                  </p>
                </div>
                <div>
                  <div className="space-y-3">
                    {[10, 50, 100, 500, 1000].map((amt) => (
                      <div
                        key={amt}
                        className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-200"
                      >
                        <span className="text-gray-900 font-medium">
                          {amt} {fromCurrency}
                        </span>
                        <span className="text-green-600 font-semibold">
                          {(
                            (amt * mockExchangeRates[toCurrency]) /
                            mockExchangeRates[fromCurrency]
                          ).toFixed(2)}{" "}
                          {toCurrency}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="rates" className="space-y-6">
            <div className="backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/30 p-6 shadow-2xl">
              <div className="mb-6">
                <h3 className="text-gray-900 text-lg font-semibold flex items-center gap-2 mb-2">
                  <BarChart3 className="w-5 h-5" />
                  Exchange Rates
                </h3>
                <p className="text-gray-600 text-sm">
                  Current rates against USD
                </p>
              </div>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currencies
                    .filter((c) => c.code !== "USD")
                    .map((currency) => {
                      const rate = mockExchangeRates[currency.code];
                      const change = getRateChange(currency.code);
                      return (
                        <div
                          key={currency.code}
                          className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-all cursor-pointer"
                          onClick={() => setToCurrency(currency.code)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{currency.flag}</span>
                              {currency.icon}
                              <span className="text-gray-900 font-semibold">
                                {currency.code}
                              </span>
                            </div>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(currency.code);
                              }}
                              variant="ghost"
                              size="sm"
                              className="text-gray-500 hover:text-yellow-500"
                            >
                              <Star
                                className={`w-4 h-4 ${
                                  favorites.includes(currency.code)
                                    ? "fill-current text-yellow-500"
                                    : ""
                                }`}
                              />
                            </Button>
                          </div>
                          <div className="text-gray-900 text-xl font-bold mb-1">
                            {rate.toFixed(4)}
                          </div>
                          <div className="text-gray-600 text-sm mb-2">
                            {currency.name}
                          </div>
                          {change !== 0 && (
                            <div
                              className={`flex items-center gap-1 text-sm ${getChangeColor(
                                change
                              )}`}
                            >
                              {getChangeIcon(change)}
                              <span>
                                {Math.abs(change * 10000).toFixed(2)} pts
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <div className="backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/30 p-6 shadow-2xl">
              <div className="mb-6">
                <h3 className="text-gray-900 text-lg font-semibold flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5" />
                  Rate History
                </h3>
                <p className="text-gray-600 text-sm">
                  Historical exchange rates
                </p>
              </div>
              <div>
                <div className="space-y-4">
                  {Object.entries(mockHistoricalRates).map(
                    ([currency, history]) => (
                      <div key={currency} className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-900 font-semibold">
                          {getCurrencyByCode(currency)?.flag}
                          {getCurrencyByCode(currency)?.icon}
                          {currency}/USD History
                        </div>
                        <div className="space-y-1">
                          {history.map((day, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                            >
                              <span className="text-gray-700 text-sm">
                                {day.date}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="text-gray-900 font-medium">
                                  {day.rate.toFixed(4)}
                                </span>
                                <div
                                  className={`flex items-center gap-1 text-xs ${getChangeColor(
                                    day.change
                                  )}`}
                                >
                                  {getChangeIcon(day.change)}
                                  <span>
                                    {Math.abs(day.change * 10000).toFixed(1)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <div className="backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/30 p-6 shadow-2xl">
              <div className="mb-6">
                <h3 className="text-gray-900 text-lg font-semibold flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5" />
                  Favorite Currencies
                </h3>
                <p className="text-gray-600 text-sm">
                  Quick access to your most used currencies
                </p>
              </div>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {currencies
                    .filter((currency) => favorites.includes(currency.code))
                    .map((currency) => (
                      <div
                        key={currency.code}
                        className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-all"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-lg">{currency.flag}</span>
                          {currency.icon}
                          <span className="text-gray-900 font-semibold">
                            {currency.code}
                          </span>
                        </div>
                        <div className="text-gray-600 text-sm mb-2">
                          {currency.name}
                        </div>
                        <div className="text-gray-900 text-xl font-bold mb-2">
                          {(
                            (parseFloat(amount || "0") *
                              mockExchangeRates[currency.code]) /
                            mockExchangeRates[fromCurrency]
                          ).toFixed(2)}
                        </div>
                        <Button
                          onClick={() => setToCurrency(currency.code)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                          size="sm"
                        >
                          Convert to {currency.code}
                        </Button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <br />
        {/* Travel Tips */}
        <div className="backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/30 p-6 shadow-2xl">
          <h3 className="text-gray-900 text-xl font-semibold mb-6">
            Money-Saving Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-gray-900 font-semibold mb-3">
                Currency Exchange
              </h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 shrink-0"></div>
                  Compare rates at banks vs. exchange bureaus
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 shrink-0"></div>
                  Use ATMs for better rates than airport exchanges
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 shrink-0"></div>
                  Notify your bank about international travel
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 shrink-0"></div>
                  Keep some cash for small purchases
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-900 font-semibold mb-3">
                Payment Methods
              </h4>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 shrink-0"></div>
                  Use credit cards for larger purchases
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 shrink-0"></div>
                  Check for foreign transaction fees
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 shrink-0"></div>
                  Consider travel credit cards with rewards
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 shrink-0"></div>
                  Use mobile payment apps when available
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
