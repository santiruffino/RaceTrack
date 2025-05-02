import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function searchRaceNames(query: string) {
  const { data, error } = await supabase
    .from('race_names')
    .select('name')
    .ilike('name', `%${query}%`)
    .order('count', { ascending: false })
    .limit(5);

  if (error) {
    console.error('Error searching race names:', error);
    return [];
  }

  return data.map(row => row.name);
}

export async function getRaceHistory(raceName: string) {
  const { data, error } = await supabase
    .from('races')
    .select('*')
    .eq('name', raceName)
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching race history:', error);
    return [];
  }

  return data;
}

export async function upsertRaceName(name: string) {
  const { error } = await supabase.rpc('upsert_race_name', { race_name: name });

  if (error) {
    console.error('Error upserting race name:', error);
  }
}