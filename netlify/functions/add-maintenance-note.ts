import type { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

function isValidUUID(uuid: string) {
  // Simple UUID v4 validation
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const requestId = event.queryStringParameters?.requestId;
  const noteText = event.queryStringParameters?.noteText;
  // Accept both lowercase and uppercase header keys
  const userId = event.headers['x-user-id'] || event.headers['X-User-Id'];

  if (!requestId || !noteText || !userId) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing requestId, noteText, or userId' }) };
  }

  if (!isValidUUID(userId)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid userId format' }) };
  }

  try {
    const { data, error } = await supabase
      .from('maintenance_notes')
      .insert([
        {
          request_id: requestId,
          content: noteText,
          user_id: userId,
        },
      ])
      .select()
      .single();

    if (error || !data) {
      return { statusCode: 500, body: JSON.stringify({ error: error?.message || 'Failed to add note' }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: (err as Error).message }) };
  }
};
