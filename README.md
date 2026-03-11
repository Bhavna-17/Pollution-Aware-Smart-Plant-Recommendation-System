# PlantWise - Pollution-Aware Plant Recommendation System

## Project Description

PlantWise is an intelligent system that recommends pollution-controlling plants based on real-time air quality data. The application helps users make informed decisions about which plants to grow based on their local environmental conditions.

## Features

- **Real-time Air Quality Detection** - Automatically detects user location and fetches current AQI data
- **Smart Plant Recommendations** - Suggests plants based on pollution levels and environmental conditions
- **User Authentication** - Secure login and signup functionality
- **Interactive Dashboard** - Visual representation of air quality data and plant insights
- **Search History** - Track and view past air quality searches
- **Saved Plants** - Build a personal collection of recommended plants
- **Community Features** - Connect with other plant enthusiasts
- **Image Analysis** - Upload images of your space for personalized recommendations

## Technologies Used

- **Frontend**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.19
- **Styling**: TailwindCSS with shadcn/ui components
- **Backend**: Supabase (database + serverless functions)
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM
- **Authentication**: Supabase Auth
- **UI Components**: Radix UI primitives with shadcn/ui

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd green-bloom-guide-main

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── home/           # Landing page components
│   ├── layout/         # Layout components (Navbar, Footer)
│   ├── plants/         # Plant-related components
│   ├── pollution/      # Air quality components
│   └── ui/             # shadcn/ui components
├── hooks/              # Custom React hooks
├── integrations/       # External service integrations
├── lib/                # Utility functions
├── pages/              # Page components
└── main.tsx           # Application entry point
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
VITE_SUPABASE_PROJECT_ID=your_supabase_project_id
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## How It Works

1. **Location Detection**: The app automatically detects the user's location using browser geolocation
2. **Air Quality Analysis**: Fetches real-time air quality data from external APIs
3. **Plant Recommendations**: Based on pollution levels, the system suggests suitable plants
4. **Personalization**: Users can save plants, track search history, and get personalized recommendations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit and push to the branch
5. Open a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
