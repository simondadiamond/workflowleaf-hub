/*
  # Add 'on_hold' status to maintenance_requests.status check constraint

  1. Changes
    - Modify the check constraint on the `status` column of `maintenance_requests` table
    - Add 'on_hold' as a valid status value

  2. Security
    - No changes to RLS or policies

  3. Notes
    - This allows maintenance requests to have status 'on_hold' without violating constraints
*/

-- Drop the existing check constraint
ALTER TABLE maintenance_requests DROP CONSTRAINT IF EXISTS maintenance_requests_status_check;

-- Add a new check constraint including 'on_hold'
ALTER TABLE maintenance_requests ADD CONSTRAINT maintenance_requests_status_check CHECK (
  status IN ('new', 'assigned', 'in_progress', 'on_hold', 'completed', 'cancelled')
);