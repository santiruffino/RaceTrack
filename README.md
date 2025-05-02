# Race Tracker Application

A modern web application for tracking and managing running races. Built with React, TypeScript, and Tailwind CSS, this application helps runners keep track of their races, monitor their progress, and stay motivated with fun statistics and countdowns.

## Features

- 🏃‍♂️ Track upcoming and completed races
- 📊 View detailed race statistics and metrics
- ⏰ Countdown timer for upcoming races
- 📈 Monitor progress with fun facts and comparisons
- 🎯 Track personal records and achievements
- 📱 Responsive design for all devices

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Custom stores with Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide Icons
- **Routing**: React Router
- **Date Handling**: Native JavaScript Date API

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher) or yarn (v1.22.0 or higher)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd race-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the application running.

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── layout/        # Layout components (Navbar, Footer)
│   ├── metrics/       # Metrics and statistics components
│   ├── races/         # Race-related components
│   └── ui/            # Basic UI components
├── pages/             # Page components
├── store/             # State management
├── lib/               # Utility functions
└── types/             # TypeScript type definitions
```

## Key Components

### Dashboard
The main dashboard displays:
- Race statistics and metrics
- Upcoming race countdown
- Fun facts and comparisons
- Recent and upcoming races

### Race Management
- Add new races
- Track race details (distance, time, elevation)
- Monitor progress and achievements

### Metrics
- Total distance covered
- Elevation gained
- Race completion statistics
- Personal records

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/) 