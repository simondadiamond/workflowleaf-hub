import type { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { data, error } = await supabase
      .from('maintenance_requests')
      .select('unit')
      .neq('unit', '')
      .order('unit', { ascending: true });

    if (error) {
      return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }

    // Extract unique units
    const unitsSet = new Set<string>();
    data?.forEach((row) => {
      if (row.unit) unitsSet.add(row.unit);
    });

    const units = Array.from(unitsSet);

    return {
      statusCode: 200,
      body: JSON.stringify(units),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: (err as Error).message }) };
  }
};
