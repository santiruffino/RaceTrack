/*
  # Create races table

  1. New Tables
    - `races`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `date` (timestamp with time zone)
      - `distance` (numeric)
      - `race_type` (text)
      - `terrain_type` (text)
      - `time` (integer)
      - `elevation_gain` (integer)
      - `position_general` (integer)
      - `position_age_group` (integer)
      - `position_gender` (integer)
      - `is_completed` (boolean)
      - `notes` (text)
      - `location` (text)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `races` table
    - Add policies for authenticated users to:
      - Read their own races
      - Create new races
      - Update their own races
      - Delete their own races
*/

CREATE TABLE IF NOT EXISTS races (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  date timestamptz NOT NULL,
  distance numeric NOT NULL,
  race_type text NOT NULL,
  terrain_type text NOT NULL,
  time integer,
  elevation_gain integer,
  position_general integer,
  position_age_group integer,
  position_gender integer,
  is_completed boolean DEFAULT false,
  notes text,
  location text,
  created_at timestamptz DEFAULT now(),
  
  CONSTRAINT valid_race_type CHECK (race_type IN ('running', 'cycling')),
  CONSTRAINT valid_terrain_type CHECK (
    (race_type = 'running' AND terrain_type IN ('road', 'trail', 'cross')) OR
    (race_type = 'cycling' AND terrain_type IN ('road', 'mtb', 'gravel', 'track'))
  )
);

ALTER TABLE races ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own races
CREATE POLICY "Users can read own races"
  ON races
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy for users to insert their own races
CREATE POLICY "Users can create races"
  ON races
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own races
CREATE POLICY "Users can update own races"
  ON races
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to delete their own races
CREATE POLICY "Users can delete own races"
  ON races
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);