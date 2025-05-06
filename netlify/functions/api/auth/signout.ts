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

  // Since Netlify functions are stateless, sign out is client-side token removal.
  // But we can revoke refresh tokens if needed (optional).
  // Here, just respond OK.

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Signed out' }),
    headers: { 'Content-Type': 'application/json' },
  };
};
