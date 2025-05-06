import type { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Accept id as query param
  const id = event.queryStringParameters?.id;

  if (!id) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing request ID' }) };
  }

  try {
    const { data, error } = await supabase
      .from('maintenance_requests')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return { statusCode: 404, body: JSON.stringify({ error: 'Request not found' }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: (err as Error).message }) };
  }
};
