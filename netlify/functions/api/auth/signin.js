const { createClient } = require('@supabase/supabase-js');

const supabaseServer = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY,
  { auth: { persistSession: false } }
);

exports.handler = async function (event, context) {
  console.log('[signin] Function invoked');
  if (event.httpMethod !== 'POST') {
    console.log('[signin] Method not allowed:', event.httpMethod);
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
      headers: { Allow: 'POST', 'Content-Type': 'application/json' },
    };
  }

  if (!event.body) {
    console.log('[signin] Missing request body');
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing request body' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }

  try {
    const { email, password } = JSON.parse(event.body);
    console.log('[signin] Parsed body:', { email });

    if (!email || !password) {
      console.log('[signin] Email or password missing');
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Email and password are required' }),
        headers: { 'Content-Type': 'application/json' },
      };
    }

    const { data, error } = await supabaseServer.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log('[signin] Supabase signIn error:', error.message);
      return {
        statusCode: 401,
        body: JSON.stringify({ message: error.message }),
        headers: { 'Content-Type': 'application/json' },
      };
    }

    console.log('[signin] Sign in successful');
    return {
      statusCode: 200,
      body: JSON.stringify({ session: data.session }),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (err) {
    console.log('[signin] Internal server error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }
};
