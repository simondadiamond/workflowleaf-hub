import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing required Supabase environment variables');
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const handler: Handler = async (event) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  if (!event.body) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Missing request body' }),
    };
  }

  try {
    const { action, email, password } = JSON.parse(event.body);

    switch (action) {
      case 'signUp': {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${process.env.URL || 'http://localhost:8888'}/auth/callback`,
          },
        });

        if (error) throw error;

        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify(data),
        };
      }

      case 'signIn': {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify(data),
        };
      }

      case 'signOut': {
        const { error } = await supabase.auth.signOut();

        if (error) throw error;

        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify({ message: 'Signed out successfully' }),
        };
      }

      default:
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Invalid action' }),
        };
    }
  } catch (error) {
    console.error('Auth error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: (error as Error).message }),
    };
  }
};
