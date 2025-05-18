# Race Tracker Application

A modern web application for tracking and managing running and cycling races. Built with React, TypeScript, and Tailwind CSS, this application helps athletes keep track of their races, monitor their progress, and stay motivated with fun statistics and countdowns.

## Features

- 🏃‍♂️ Track upcoming and completed races (running and cycling)
- 📊 View detailed race statistics and metrics
- ⏰ Countdown timer for upcoming races
- 📈 Monitor progress with fun facts and comparisons
- 🎯 Track personal records and achievements
- 📱 Responsive design for all devices
- 🚴‍♂️ Support for multiple race types and terrains

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
   git clone https://github.com/santiruffino/RaceTrack
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
   Navigate to `http://localhost:5173` to see the application running.

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
- Race type distribution (running vs cycling)

### Race Management
- Add new races (running or cycling)
- Track race details (distance, time, elevation)
- Monitor progress and achievements
- Support for different terrain types:
  - Running: Road, Trail, Cross Country
  - Cycling: Road, Mountain Bike (MTB), Gravel, Track

### Metrics
- Total distance covered
- Elevation gained
- Race completion statistics
- Personal records
- Race type distribution
- Terrain type distribution

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

## Deployment

### Deploying to Netlify

1. **Build Settings**
   - Build command: `npm run build` or `yarn build`
   - Publish directory: `dist` (for Vite) or `build` (for Create React App)
   - Base directory: `/` (root directory)

2. **Environment Variables**
   - Add any required environment variables in the Netlify dashboard under Site settings > Build & deploy > Environment

3. **Deploy Steps**
   - Connect your GitHub repository to Netlify
   - Select the repository
   - Use the build settings above
   - Deploy!

Note: If you're using Vite (which is common for modern React apps), the build output will be in the `dist` directory. If you're using Create React App, it will be in the `build` directory. 

## To-Do List

### High Priority
- [ ] Implement race statistics dashboard with charts and graphs
- [ ] Create race sharing functionality
- [ ] Add race photo upload and gallery feature

### Medium Priority
- [ ] Implement race search and filtering
- [ ] Add race categories and tags
- [ ] Create race calendar view
- [ ] Add race weather forecast integration
- [ ] Implement race route visualization

### Low Priority
- [ ] Add social features (comments, likes)
- [ ] Create race preparation checklist
- [ ] Add race gear tracking
- [ ] Implement race training plan integration
- [ ] Add race nutrition tracking

### Technical Debt
- [ ] Update browserslist database
- [ ] Add comprehensive error handling
- [ ] Implement proper loading states
- [ ] Add unit and integration tests
- [ ] Optimize performance and bundle size

## Recent Updates
- Added support for bike races with new terrain types (MTB, Gravel, Track)
- Implemented race type selection (running/cycling)
- Updated race form with dynamic terrain options based on race type
- Enhanced race cards with race type indicators
- Updated metrics to track race type distribution
- Added race editing functionality
- Implemented race form component
- Created race card component
- Added dashboard layout
- Implemented basic routing structure
- Set up Vite development environment
- Implemented user authentication and profile management
