import type { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
