import type { Handler } from '@netlify/functions';
import { supabaseServer } from '../../../../src/lib/supabaseServer';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
      headers: { Allow: 'POST', 'Content-Type': 'application/json' },
    };
  }

  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing request body' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }

  try {
    const { email, password } = JSON.parse(event.body);

    if (!email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Email and password are required' }),
        headers: { 'Content-Type': 'application/json' },
      };
    }

    const { data, error } = await supabaseServer.auth.admin.createUser({
      email,
      password,
      email_confirm: false,
      // You can add additional user metadata here if needed
    });

    if (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: error.message }),
        headers: { 'Content-Type': 'application/json' },
      };
    }

    // After creating user, sign in to get session
    const { data: signInData, error: signInError } = await supabaseServer.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: signInError.message }),
        headers: { 'Content-Type': 'application/json' },
      };
    }

    return {
      statusCode: 201,
      body: JSON.stringify({ session: signInData.session }),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }
};
