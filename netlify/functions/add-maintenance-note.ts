import type { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const requestId = event.queryStringParameters?.requestId;
  const noteText = event.queryStringParameters?.noteText;

  if (!requestId || !noteText) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing requestId or noteText' }) };
  }

  // For demo, user_id is not authenticated; in real app, get from session
  const userId = 'system';

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
