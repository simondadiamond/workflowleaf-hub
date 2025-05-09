import type { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface SearchPayload {
  status: string | null;
  unit: string | null;
  search: string | null;
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const payload: SearchPayload = JSON.parse(event.body || '{}');

    let query = supabase
      .from('maintenance_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (payload.status) {
      query = query.eq('status', payload.status);
    }

    if (payload.unit) {
      query = query.eq('unit', payload.unit);
    }

    if (payload.search) {
      // Simple case-insensitive search on description only
      query = query.ilike('description', `%${payload.search}%`);
      // Note: Supabase does not support OR easily in a single query for multiple columns,
      // so this searches description only for simplicity.
    }

    const { data, error } = await query;

    if (error) {
      return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify({ error: (err as Error).message }) };
  }
};
