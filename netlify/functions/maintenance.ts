import type { Handler } from '@netlify/functions';
import { supabaseServer } from '../../src/lib/supabaseServer';

export const handler: Handler = async (event, context) => {
  try {
    if (event.httpMethod === 'GET') {
      const { data, error } = await supabaseServer.from('maintenance_requests').select('*');

      if (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: error.message }),
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      };
    }

    if (event.httpMethod === 'POST') {
      if (!event.body) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Missing request body' }),
        };
      }

      const body = JSON.parse(event.body);
      const { unit, category, description, status, user_id } = body;

      const { data, error } = await supabaseServer
        .from('maintenance_requests')
        .insert([{ unit, category, description, status, user_id }])
        .select()
        .single();

      if (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ error: error.message }),
        };
      }

      return {
        statusCode: 201,
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      };
    }

    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
      headers: {
        Allow: 'GET, POST',
      },
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid request' }),
    };
  }
};
