import { Race, Metrics, TerrainType } from '../types';

// Format seconds to hh:mm:ss
export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    remainingSeconds.toString().padStart(2, '0'),
  ].join(':');
};

// Parse time string (hh:mm:ss) to seconds
export const parseTime = (timeString: string): number => {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

// Calculate pace (min/km)
export const calculatePace = (timeSeconds: number, distanceKm: number): number => {
  return timeSeconds / 60 / distanceKm;
};

// Format pace (min/km) to mm:ss
export const formatPace = (pace: number): string => {
  const minutes = Math.floor(pace);
  const seconds = Math.round((pace - minutes) * 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Generate a unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Calculate metrics from races
export const calculateMetrics = (races: Race[]): Metrics => {
  const completedRaces = races.filter(race => race.isCompleted);
  
  // Find fastest race (by pace)
  let fastestRace: Race | null = null;
  let fastestPace = Infinity;
  
  // Find race with highest elevation
  let highestElevationRace: Race | null = null;
  let highestElevation = 0;
  
  let totalDistance = 0;
  let totalTime = 0;
  let totalElevation = 0;
  
  const terrainDistribution = {
    road: 0,
    trail: 0,
    cross: 0,
  };
  
  completedRaces.forEach(race => {
    totalDistance += race.distance;
    
    if (race.time) {
      totalTime += race.time;
      const pace = calculatePace(race.time, race.distance);
      if (pace < fastestPace) {
        fastestPace = pace;
        fastestRace = race;
      }
    }
    
    if (race.elevationGain) {
      totalElevation += race.elevationGain;
      if (race.elevationGain > highestElevation) {
        highestElevation = race.elevationGain;
        highestElevationRace = race;
      }
    }
    
    terrainDistribution[race.terrainType as TerrainType] += 1;
  });
  
  return {
    totalRaces: races.length,
    totalCompletedRaces: completedRaces.length,
    totalUpcomingRaces: races.length - completedRaces.length,
    totalDistance,
    totalTime,
    totalElevation,
    terrainDistribution,
    fastest: {
      race: fastestRace,
      pace: fastestPace,
    },
    highest: {
      race: highestElevationRace,
      elevation: highestElevation,
    },
  };
};

// Get terrain color
export const getTerrainColor = (terrain: TerrainType): string => {
  switch (terrain) {
    case 'road':
      return 'bg-blue-500';
    case 'trail':
      return 'bg-green-500';
    case 'cross':
      return 'bg-amber-500';
    default:
      return 'bg-gray-500';
  }
};

// Get terrain icon name
export const getTerrainIcon = (terrain: TerrainType): string => {
  switch (terrain) {
    case 'road':
      return 'road';
    case 'trail':
      return 'mountain';
    case 'cross':
      return 'map';
    default:
      return 'map-pin';
  }
};