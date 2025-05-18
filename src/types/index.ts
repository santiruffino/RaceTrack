export type TerrainType = 'road' | 'trail' | 'cross' | 'mtb' | 'gravel' | 'track';

export type RaceType = 'running' | 'cycling';

export type Position = {
  general: number;
  ageGroup: number;
  gender: number;
};

export interface Race {
  id: string;
  userId: string;
  name: string;
  date: string;
  distance: number; // in kilometers
  raceType: RaceType;
  terrainType: TerrainType;
  time?: number; // in seconds
  elevationGain?: number; // in meters
  position?: Position;
  isCompleted: boolean;
  notes?: string;
  location?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface RaceState {
  races: Race[];
  isLoading: boolean;
  error: string | null;
}

export interface Metrics {
  totalRaces: number;
  totalCompletedRaces: number;
  totalUpcomingRaces: number;
  totalDistance: number;
  totalTime: number;
  totalElevation: number;
  terrainDistribution: {
    road: number;
    trail: number;
    cross: number;
    mtb: number;
    gravel: number;
    track: number;
  };
  raceTypeDistribution: {
    running: number;
    cycling: number;
  };
  fastest: {
    race: Race | null;
    pace: number; // in min/km
  };
  highest: {
    race: Race | null;
    elevation: number;
  };
}