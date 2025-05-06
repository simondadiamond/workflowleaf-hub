import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export const handler: Handler = async (event) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }

  const userId = event.headers['x-user-id'];
  if (!userId) {
    return {
      statusCode: 401,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }

  try {
    switch (event.httpMethod) {
      case 'GET': {
        const { data, error } = await supabase
          .from('maintenance_requests')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (error) throw error;

        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify(data)
        };
      }

      case 'POST': {
        if (!event.body) {
          return {
            statusCode: 400,
            headers: corsHeaders,
            body: JSON.stringify({ error: 'Missing request body' })
          };
        }

        const { unit, category, description } = JSON.parse(event.body);

        const { data, error } = await supabase
          .from('maintenance_requests')
          .insert({
            unit,
            category,
            description,
            status: 'new',
            user_id: userId
          })
          .select()
          .single();

        if (error) throw error;

        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify(data)
        };
      }

      default:
        return {
          statusCode: 405,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Method not allowed' })
        };
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: (error as Error).message })
    };
  }
}
