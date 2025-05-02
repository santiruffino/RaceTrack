import { create } from 'zustand';
import { RaceState, Race } from '../types';
import { supabase } from '../lib/supabase';

const useRaceStore = create<RaceState & {
  addRace: (race: Omit<Race, 'id'>) => Promise<void>;
  updateRace: (id: string, race: Partial<Race>) => Promise<void>;
  deleteRace: (id: string) => Promise<void>;
  loadRaces: (userId: string) => Promise<void>;
}>((set) => ({
  races: [],
  isLoading: false,
  error: null,

  addRace: async (raceData) => {
    set({ isLoading: true, error: null });
    
    try {
      const { data, error } = await supabase
        .from('races')
        .insert({
          user_id: raceData.userId,
          name: raceData.name,
          date: raceData.date,
          distance: raceData.distance,
          terrain_type: raceData.terrainType,
          time: raceData.time,
          elevation_gain: raceData.elevationGain,
          position_general: raceData.position?.general,
          position_age_group: raceData.position?.ageGroup,
          position_gender: raceData.position?.gender,
          is_completed: raceData.isCompleted,
          notes: raceData.notes,
          location: raceData.location,
        })
        .select()
        .single();

      if (error) throw error;

      const race: Race = {
        id: data.id,
        userId: data.user_id,
        name: data.name,
        date: data.date,
        distance: data.distance,
        terrainType: data.terrain_type,
        time: data.time,
        elevationGain: data.elevation_gain,
        position: data.position_general ? {
          general: data.position_general,
          ageGroup: data.position_age_group,
          gender: data.position_gender,
        } : undefined,
        isCompleted: data.is_completed,
        notes: data.notes,
        location: data.location,
      };

      set(state => ({ 
        races: [...state.races, race],
        isLoading: false 
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  updateRace: async (id, raceData) => {
    set({ isLoading: true, error: null });
    
    try {
      const { data, error } = await supabase
        .from('races')
        .update({
          name: raceData.name,
          date: raceData.date,
          distance: raceData.distance,
          terrain_type: raceData.terrainType,
          time: raceData.time,
          elevation_gain: raceData.elevationGain,
          position_general: raceData.position?.general,
          position_age_group: raceData.position?.ageGroup,
          position_gender: raceData.position?.gender,
          is_completed: raceData.isCompleted,
          notes: raceData.notes,
          location: raceData.location,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      const updatedRace: Race = {
        id: data.id,
        userId: data.user_id,
        name: data.name,
        date: data.date,
        distance: data.distance,
        terrainType: data.terrain_type,
        time: data.time,
        elevationGain: data.elevation_gain,
        position: data.position_general ? {
          general: data.position_general,
          ageGroup: data.position_age_group,
          gender: data.position_gender,
        } : undefined,
        isCompleted: data.is_completed,
        notes: data.notes,
        location: data.location,
      };

      set(state => ({
        races: state.races.map(race => 
          race.id === id ? updatedRace : race
        ),
        isLoading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  deleteRace: async (id) => {
    set({ isLoading: true, error: null });
    
    try {
      const { error } = await supabase
        .from('races')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        races: state.races.filter(race => race.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  loadRaces: async (userId) => {
    set({ isLoading: true, error: null });
    
    try {
      const { data, error } = await supabase
        .from('races')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false });

      if (error) throw error;

      const races: Race[] = data.map(race => ({
        id: race.id,
        userId: race.user_id,
        name: race.name,
        date: race.date,
        distance: race.distance,
        terrainType: race.terrain_type,
        time: race.time,
        elevationGain: race.elevation_gain,
        position: race.position_general ? {
          general: race.position_general,
          ageGroup: race.position_age_group,
          gender: race.position_gender,
        } : undefined,
        isCompleted: race.is_completed,
        notes: race.notes,
        location: race.location,
      }));

      set({ races, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));

export default useRaceStore