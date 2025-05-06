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
  const newStatus = event.queryStringParameters?.newStatus;

  if (!requestId || !newStatus) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing requestId or newStatus' }) };
  }

  // Validate allowed statuses
  const allowed = [
    'new',
    'assigned',
    'in_progress',
    'on_hold',
    'completed',
    'cancelled',
  ];
  if (!allowed.includes(newStatus)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid status value' }) };
  }

  try {
    const { data, error } = await supabase
      .from('maintenance_requests')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', requestId)
      .select()
      .single();

    if (error || !data) {
      return { statusCode: 404, body: JSON.stringify({ error: error?.message || 'Request not found' }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, status: newStatus }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: (err as Error).message }) };
  }
};
