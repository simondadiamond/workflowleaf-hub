import type { Handler } from '@netlify/functions';
import { supabaseServer } from '../../../../src/lib/supabaseServer';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
      headers: { Allow: 'GET', 'Content-Type': 'application/json' },
    };
  }

  // Netlify functions are stateless, so no direct session management.
  // You can implement session via cookies or JWT forwarded from client.
  // For now, return null session.

  return {
    statusCode: 200,
    body: JSON.stringify({ session: null }),
    headers: { 'Content-Type': 'application/json' },
  };
};
