/*
  # Add race names tracking

  1. New Tables
    - `race_names`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `created_at` (timestamp)
      - `count` (integer) - Number of times this race name has been used

  2. Security
    - Enable RLS on `race_names` table
    - Add policy for authenticated users to read race names
    - Add policy for authenticated users to insert new race names
*/

CREATE TABLE IF NOT EXISTS race_names (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  count integer DEFAULT 1
);

ALTER TABLE race_names ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read race names"
  ON race_names
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert race names"
  ON race_names
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Function to upsert race names and increment count
CREATE OR REPLACE FUNCTION upsert_race_name(race_name text)
RETURNS uuid
LANGUAGE plpgsql
AS $$
DECLARE
  existing_id uuid;
BEGIN
  -- Try to update existing record
  UPDATE race_names
  SET count = count + 1
  WHERE name = race_name
  RETURNING id INTO existing_id;
  
  -- If no record was updated, insert new one
  IF existing_id IS NULL THEN
    INSERT INTO race_names (name)
    VALUES (race_name)
    RETURNING id INTO existing_id;
  END IF;
  
  RETURN existing_id;
END;
$$;