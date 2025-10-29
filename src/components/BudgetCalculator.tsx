import { useState } from "react";
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
import { Progress } from "./ui/progress";
import {
  Plus,
  Trash2,
  TrendingUp,
  AlertTriangle,
  Download,
  FileText,
  PieChart,
  BarChart3,
  Target,
  Receipt,
  Star,
  Calendar,
  DollarSign,
  CreditCard,
  Wallet,
} from "lucide-react";
import Navigation from "./Navigation";

interface BudgetCalculatorProps {
  onNavigate: (page: string) => void;
}

interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  currency: string;
  date: string;
  receipt?: string;
}

interface BudgetTemplate {
  name: string;
  description: string;
  categories: { [key: string]: number };
  total: number;
}

const expenseCategories = [
  "Flights",
  "Accommodation",
  "Food & Dining",
  "Transportation",
  "Activities",
  "Shopping",
  "Miscellaneous",
];

const budgetTemplates: BudgetTemplate[] = [
  {
    name: "Budget Traveler",
    description: "For the cost-conscious traveler",
    categories: {
      Flights: 300,
      Accommodation: 400,
      "Food & Dining": 200,
      Transportation: 100,
      Activities: 150,
      Shopping: 100,
      Miscellaneous: 100,
    },
    total: 1350,
  },
  {
    name: "Mid-Range Explorer",
    description: "Comfortable travel with some luxuries",
    categories: {
      Flights: 500,
      Accommodation: 800,
      "Food & Dining": 400,
      Transportation: 200,
      Activities: 300,
      Shopping: 250,
      Miscellaneous: 200,
    },
    total: 2650,
  },
  {
    name: "Luxury Traveler",
    description: "Premium travel experience",
    categories: {
      Flights: 1000,
      Accommodation: 1500,
      "Food & Dining": 800,
      Transportation: 400,
      Activities: 600,
      Shopping: 500,
      Miscellaneous: 400,
    },
    total: 5200,
  },
];

export default function BudgetCalculator({
  onNavigate,
}: BudgetCalculatorProps) {
  const [budget, setBudget] = useState<string>("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExpense, setNewExpense] = useState({
    category: "",
    description: "",
    amount: "",
    currency: "USD",
    date: new Date().toISOString().split("T")[0],
  });
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedTemplate, setSelectedTemplate] =
    useState<BudgetTemplate | null>(null);

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const remainingBudget = parseFloat(budget || "0") - totalExpenses;
  const budgetUsed =
    parseFloat(budget || "0") > 0
      ? (totalExpenses / parseFloat(budget)) * 100
      : 0;

  const addExpense = () => {
    if (newExpense.category && newExpense.description && newExpense.amount) {
      const expense: Expense = {
        id: Date.now().toString(),
        category: newExpense.category,
        description: newExpense.description,
        amount: parseFloat(newExpense.amount),
        currency: newExpense.currency,
        date: newExpense.date,
      };
      setExpenses([...expenses, expense]);
      setNewExpense({
        category: "",
        description: "",
        amount: "",
        currency: "USD",
        date: new Date().toISOString().split("T")[0],
      });
    }
  };

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const getCategoryTotal = (category: string) => {
    return expenses
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0);
  };

  const getBudgetStatus = () => {
    if (budgetUsed > 100)
      return { status: "over", color: "text-red-600", bg: "bg-red-50" };
    if (budgetUsed > 80)
      return {
        status: "warning",
        color: "text-yellow-600",
        bg: "bg-yellow-50",
      };
    return { status: "good", color: "text-green-600", bg: "bg-green-50" };
  };

  const budgetStatus = getBudgetStatus();

  const applyTemplate = (template: BudgetTemplate) => {
    setBudget(template.total.toString());
    setSelectedTemplate(template);
  };

  const exportExpenses = () => {
    const csvContent = [
      ["Date", "Category", "Description", "Amount", "Currency"].join(","),
      ...expenses.map((expense) =>
        [
          expense.date,
          expense.category,
          expense.description,
          expense.amount,
          expense.currency,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "travel-expenses.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Flights: "bg-blue-500",
      Accommodation: "bg-green-500",
      "Food & Dining": "bg-orange-500",
      Transportation: "bg-purple-500",
      Activities: "bg-pink-500",
      Shopping: "bg-indigo-500",
      Miscellaneous: "bg-gray-500",
    };
    return colors[category as keyof typeof colors] || "bg-gray-500";
  };

  const getSpendingAnalytics = () => {
    const categoryTotals = expenseCategories.map((category) => ({
      category,
      amount: getCategoryTotal(category),
      percentage:
        totalExpenses > 0
          ? (getCategoryTotal(category) / totalExpenses) * 100
          : 0,
    }));

    const dailySpending = expenses.reduce((acc, expense) => {
      acc[expense.date] = (acc[expense.date] || 0) + expense.amount;
      return acc;
    }, {} as { [key: string]: number });

    return { categoryTotals, dailySpending };
  };

  const analytics = getSpendingAnalytics();

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-400 via-red-400 to-pink-500 p-4 md:p-8 relative overflow-hidden">
      <Navigation onNavigate={onNavigate} currentPage="budget" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-red-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 pt-16 md:pt-20">
        {/* Header */}
        <div className="mb-8">
          <div className="backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/30 p-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-gray-900 text-4xl font-bold mb-2">
                  Budget Calculator
                </h1>
                <p className="text-gray-700 text-lg">
                  Track expenses and stay within your travel budget
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={exportExpenses}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 border-blue-200"
                >
                  <Wallet className="w-4 h-4 mr-1" />
                  Budget Tracker
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 backdrop-blur-2xl bg-white/95 border border-white/30 mb-6">
            <TabsTrigger
              value="overview"
              className="text-gray-700 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="expenses"
              className="text-gray-700 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900"
            >
              Expenses
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="text-gray-700 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="templates"
              className="text-gray-700 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900"
            >
              Templates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Budget Overview */}
              <div className="backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/30 p-6 shadow-2xl">
                <div className="mb-6">
                  <h3 className="text-gray-900 text-lg font-semibold flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5" />
                    Budget Overview
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Your current budget status
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-gray-700 text-sm font-medium">
                      Total Budget (USD)
                    </label>
                    <Input
                      type="number"
                      placeholder="Enter your total budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="bg-white/80 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="p-6 bg-gray-50 backdrop-blur-sm rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-700">Budget Used</span>
                      <span className={`font-bold ${budgetStatus.color}`}>
                        {budgetUsed.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={budgetUsed} className="h-3 bg-gray-200" />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>${totalExpenses.toFixed(2)} spent</span>
                      <span>${parseFloat(budget || "0").toFixed(2)} total</span>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 backdrop-blur-sm rounded-xl border border-gray-200">
                    <div className="text-gray-600 text-sm mb-1">
                      Remaining Budget
                    </div>
                    <div
                      className={`text-2xl font-bold ${
                        remainingBudget < 0 ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      ${remainingBudget.toFixed(2)}
                    </div>
                  </div>

                  {budgetStatus.status === "over" && (
                    <div className="p-4 bg-red-50 backdrop-blur-sm rounded-xl border border-red-200">
                      <div className="flex items-center gap-2 text-red-700">
                        <AlertTriangle className="w-5 h-5" />
                        <span className="font-medium">Budget Exceeded!</span>
                      </div>
                    </div>
                  )}

                  {selectedTemplate && (
                    <div className="p-4 bg-blue-50 backdrop-blur-sm rounded-xl border border-blue-200">
                      <div className="flex items-center gap-2 text-blue-700 mb-2">
                        <Star className="w-4 h-4" />
                        <span className="font-medium">Using Template</span>
                      </div>
                      <div className="text-gray-600 text-sm">
                        {selectedTemplate.name}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Add Expense */}
              <div className="backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/30 p-6 shadow-2xl">
                <div className="mb-6">
                  <h3 className="text-gray-900 text-lg font-semibold flex items-center gap-2 mb-2">
                    <Plus className="w-5 h-5" />
                    Quick Add Expense
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Record your travel expenses
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-gray-700 text-sm font-medium">
                      Category
                    </label>
                    <Select
                      value={newExpense.category}
                      onValueChange={(value) =>
                        setNewExpense({ ...newExpense, category: value })
                      }
                    >
                      <SelectTrigger className="bg-white/80 border-gray-300 text-gray-900">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {expenseCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-700 text-sm font-medium">
                      Description
                    </label>
                    <Input
                      placeholder="e.g., Hotel booking"
                      value={newExpense.description}
                      onChange={(e) =>
                        setNewExpense({
                          ...newExpense,
                          description: e.target.value,
                        })
                      }
                      className="bg-white/80 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-700 text-sm font-medium">
                      Amount
                    </label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={newExpense.amount}
                      onChange={(e) =>
                        setNewExpense({ ...newExpense, amount: e.target.value })
                      }
                      className="bg-white/80 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-700 text-sm font-medium">
                      Date
                    </label>
                    <Input
                      type="date"
                      value={newExpense.date}
                      onChange={(e) =>
                        setNewExpense({ ...newExpense, date: e.target.value })
                      }
                      className="bg-white/80 border-gray-300 text-gray-900"
                    />
                  </div>

                  <Button
                    onClick={addExpense}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Expense
                  </Button>
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/30 p-6 shadow-2xl">
                <div className="mb-6">
                  <h3 className="text-gray-900 text-lg font-semibold flex items-center gap-2 mb-2">
                    <PieChart className="w-5 h-5" />
                    Category Breakdown
                  </h3>
                  <p className="text-gray-600 text-sm">
                    See how your budget is distributed
                  </p>
                </div>
                <div className="space-y-4">
                  {expenseCategories.map((category) => {
                    const total = getCategoryTotal(category);
                    const percentage =
                      totalExpenses > 0 ? (total / totalExpenses) * 100 : 0;
                    return (
                      <div
                        key={category}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span className="text-gray-900 font-medium">
                            {category}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-gray-900 font-semibold">
                            ${total.toFixed(2)}
                          </div>
                          <div className="text-gray-500 text-sm">
                            {percentage.toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {expenses.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <PieChart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No expenses recorded yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            <div className="backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/30 p-6 shadow-2xl">
              <div className="mb-6">
                <h3 className="text-gray-900 text-lg font-semibold flex items-center gap-2">
                  <Receipt className="w-5 h-5" />
                  Expense History
                </h3>
                <p className="text-gray-600 text-sm">
                  All your recorded expenses ({expenses.length} total)
                </p>
              </div>
              {expenses.length === 0 ? (
                <div className="text-center py-12">
                  <Receipt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <div className="text-gray-600">No expenses recorded yet.</div>
                  <div className="text-gray-500 text-sm">
                    Add your first expense to get started.
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {expenses
                    .sort(
                      (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                    )
                    .map((expense) => (
                      <div
                        key={expense.id}
                        className="flex justify-between items-center p-4 bg-gray-50 backdrop-blur-sm rounded-xl border border-gray-200 hover:bg-gray-100 transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-3 h-3 rounded-full ${getCategoryColor(
                              expense.category
                            )}`}
                          />
                          <div>
                            <div className="text-gray-900 font-medium">
                              {expense.description}
                            </div>
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                              <span>{expense.category}</span>
                              <span>•</span>
                              <Calendar className="w-3 h-3" />
                              <span>
                                {new Date(expense.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-900 font-semibold text-lg">
                            ${expense.amount.toFixed(2)}
                          </span>
                          <Button
                            onClick={() => removeExpense(expense.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Spending by Category */}
              <div className="backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/30 p-6 shadow-2xl">
                <div className="mb-6">
                  <h3 className="text-gray-900 text-lg font-semibold flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Spending by Category
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Detailed breakdown of your expenses
                  </p>
                </div>
                <div className="space-y-4">
                  {analytics.categoryTotals
                    .filter((cat) => cat.amount > 0)
                    .sort((a, b) => b.amount - a.amount)
                    .map((item) => (
                      <div key={item.category} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-3 h-3 rounded-full ${getCategoryColor(
                                item.category
                              )}`}
                            />
                            <span className="text-gray-900 text-sm">
                              {item.category}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-gray-900 font-semibold">
                              ${item.amount.toFixed(2)}
                            </div>
                            <div className="text-gray-500 text-xs">
                              {item.percentage.toFixed(1)}%
                            </div>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full ${getCategoryColor(
                              item.category
                            )} transition-all duration-500`}
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Daily Spending */}
              <div className="backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/30 p-6 shadow-2xl">
                <div className="mb-6">
                  <h3 className="text-gray-900 text-lg font-semibold flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Daily Spending
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Your spending pattern over time
                  </p>
                </div>
                <div className="space-y-3">
                  {Object.entries(analytics.dailySpending)
                    .sort(
                      ([a], [b]) =>
                        new Date(a).getTime() - new Date(b).getTime()
                    )
                    .map(([date, amount]) => (
                      <div
                        key={date}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="text-gray-900 text-sm">
                          {new Date(date).toLocaleDateString()}
                        </span>
                        <span className="text-gray-900 font-semibold">
                          ${amount.toFixed(2)}
                        </span>
                      </div>
                    ))}
                </div>
                {Object.keys(analytics.dailySpending).length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No daily spending data available
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/30 p-6 shadow-2xl">
              <div className="mb-6">
                <h3 className="text-gray-900 text-lg font-semibold flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Budget Templates
                </h3>
                <p className="text-gray-600 text-sm">
                  Choose from pre-made budget templates
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {budgetTemplates.map((template) => (
                  <div
                    key={template.name}
                    className="p-6 bg-gray-50 backdrop-blur-sm rounded-xl border border-gray-200 hover:bg-gray-100 transition-all cursor-pointer"
                    onClick={() => applyTemplate(template)}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <h3 className="text-gray-900 font-semibold">
                        {template.name}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      {template.description}
                    </p>
                    <div className="text-2xl font-bold text-green-600 mb-4">
                      ${template.total}
                    </div>
                    <div className="space-y-2">
                      {Object.entries(template.categories).map(
                        ([category, amount]) => (
                          <div
                            key={category}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-gray-700">{category}</span>
                            <span className="text-gray-900">${amount}</span>
                          </div>
                        )
                      )}
                    </div>
                    <Button
                      className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        applyTemplate(template);
                      }}
                    >
                      Use Template
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Budget Tips */}
        <div className="mt-6 backdrop-blur-2xl bg-white/95 rounded-3xl border border-white/30 p-6 shadow-2xl">
          <div className="mb-6">
            <h3 className="text-gray-900 text-lg font-semibold">
              Money-Saving Tips
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-gray-900 font-semibold mb-3 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Save Money
              </h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 shrink-0"></div>
                  Book flights and accommodation in advance
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 shrink-0"></div>
                  Use public transportation instead of taxis
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 shrink-0"></div>
                  Eat at local markets rather than tourist restaurants
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 shrink-0"></div>
                  Look for free activities and attractions
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-900 font-semibold mb-3 flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Track Expenses
              </h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 shrink-0"></div>
                  Keep receipts for all expenses
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 shrink-0"></div>
                  Set daily spending limits
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 shrink-0"></div>
                  Use budgeting apps for real-time tracking
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 shrink-0"></div>
                  Review expenses weekly to adjust spending
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
