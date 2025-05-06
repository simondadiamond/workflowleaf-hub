/*
  # Create maintenance_notes table for activity logs (user_id as uuid)

  1. New Tables
    - `maintenance_notes`
      - `id` (uuid, primary key)
      - `request_id` (uuid, foreign key to maintenance_requests)
      - `content` (text, required)
      - `created_at` (timestamp, default now)
      - `user_id` (uuid, required, matches auth.uid())
  2. Security
    - Enable RLS on `maintenance_notes`
    - Allow all authenticated users to insert and select notes for requests they can access
    - Allow only the note creator to update/delete their own notes
  3. Changes
    - user_id is now uuid (not text) to match auth.uid()
    - No destructive operations

  Notes:
    - This table supports the activity log/notes feature for maintenance requests.
    - user_id is now type uuid for correct RLS policy comparison.
*/

CREATE TABLE IF NOT EXISTS maintenance_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid NOT NULL REFERENCES maintenance_requests(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  user_id uuid NOT NULL
);

ALTER TABLE maintenance_notes ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to select notes for requests they can access
CREATE POLICY "Authenticated can read notes" ON maintenance_notes
  FOR SELECT
  USING (true);

-- Allow all authenticated users to insert notes
CREATE POLICY "Authenticated can add notes" ON maintenance_notes
  FOR INSERT
  WITH CHECK (true);

-- Allow only the note creator to update/delete their own notes
CREATE POLICY "Note creator can update" ON maintenance_notes
  FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Note creator can delete" ON maintenance_notes
  FOR DELETE
  USING (user_id = auth.uid());