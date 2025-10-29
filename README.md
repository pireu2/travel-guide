# 🌍 Travel Guide - Comprehensive Travel Planning App

A modern, user-friendly travel planning application built with React, TypeScript, and Tailwind CSS. Plan your perfect trip with integrated tools for accommodation, activities, budgeting, packing, and more.

## ✨ Features

### 🗺️ **Trip Planning**

- **Trip Planner**: Create and customize your travel itinerary with destination details, dates, and trip type
- **Itinerary Management**: Organize daily schedules and activities with drag-and-drop functionality
- **Weather Integration**: Get real-time weather forecasts for your destination

### 🏨 **Accommodation & Activities**

- **Accommodation Finder**: Search and compare hotels, resorts, and vacation rentals
- **Activities Booking**: Discover and book local experiences, tours, and attractions
- **Wardrobe Planner**: Plan outfits based on weather conditions and trip activities

### 💰 **Budget & Finance**

- **Budget Calculator**: Track expenses and stay within your travel budget
- **Currency Converter**: Real-time currency exchange rates and conversion tools
- **Expense Tracking**: Monitor spending across different categories

### 🎒 **Travel Essentials**

- **Smart Packing List**: AI-powered packing suggestions based on weather and activities
- **Emergency Contacts**: Store and manage important emergency contact information
- **Travel Safety Tips**: Comprehensive safety guidelines and emergency procedures

### 🎨 **User Experience**

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Modern glassmorphism design with high-contrast accessibility
- **Intuitive Navigation**: Seamless navigation between all travel planning tools
- **Real-time Updates**: Live data integration for weather, currency, and activities

## 🚀 Installation

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/pireu2/travel-guide.git
   cd travel-guide
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🛠️ Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 🏗️ Tech Stack

### Frontend Framework

- **React 19** - Modern React with concurrent features
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server

### UI & Styling

- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library built on Radix UI
- **Lucide React** - Beautiful icon library
- **Glassmorphism Design** - Modern translucent UI effects

### Development Tools

- **ESLint** - Code linting and formatting
- **TypeScript** - Type checking and IntelliSense
- **Vite** - Fast development and build tooling

## 📱 Component Architecture

The application follows a modular component architecture:

```
src/
├── components/
│   ├── ui/           # Reusable UI components (shadcn/ui)
│   ├── Navigation.tsx    # App-wide navigation
│   ├── LandingPage.tsx   # Home page with feature overview
│   ├── TripPlanner.tsx   # Main trip planning interface
│   ├── Accommodation.tsx # Hotel and lodging search
│   ├── Activities.tsx    # Tours and experiences
│   ├── WardrobePlanner.tsx # Outfit planning
│   ├── Itinerary.tsx     # Daily schedule management
│   ├── Weather.tsx       # Weather information
│   ├── CurrencyConverter.tsx # Currency exchange
│   ├── BudgetCalculator.tsx  # Expense tracking
│   ├── PackingList.tsx   # Travel packing organizer
│   └── EmergencyContacts.tsx # Safety and contacts
├── lib/              # Utility functions
├── styles/           # Global styles and themes
└── assets/           # Static assets
```

## 🎯 Key Features Overview

### Trip Planning Workflow

1. **Start with Trip Planner** - Set your destination, dates, and travel style
2. **Check Weather** - Get accurate forecasts for planning
3. **Find Accommodation** - Book hotels or rentals that fit your budget
4. **Plan Activities** - Discover and book experiences
5. **Create Itinerary** - Organize your daily schedule
6. **Manage Budget** - Track expenses and convert currencies
7. **Pack Smart** - Use AI-powered packing suggestions
8. **Stay Safe** - Save emergency contacts and safety info

### Smart Features

- **Weather-Based Planning**: Packing and activity suggestions adapt to weather
- **Budget Integration**: Real-time expense tracking across all features
- **Responsive Design**: Works seamlessly on all device sizes
- **Accessibility**: High-contrast mode and keyboard navigation support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [shadcn/ui](https://ui.shadcn.com/) for the component library
- Icons provided by [Lucide React](https://lucide.dev/)
- Styling powered by [Tailwind CSS](https://tailwindcss.com/)
- Weather and currency data integration ready for API connections

---

**Happy Travels! ✈️** - Plan your next adventure with confidence using our comprehensive travel planning suite.
