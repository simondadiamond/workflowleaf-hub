import type { RequestHandler } from 'vite';
import { supabaseServer } from '../../lib/supabaseServer';

export const GET: RequestHandler = async () => {
  const { data, error } = await supabaseServer.from('profiles').select('*');

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();
    const { full_name, role, id } = body;

    const { data, error } = await supabaseServer
      .from('profiles')
      .upsert({ id, full_name, role }, { onConflict: 'id' })
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify(data), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400 });
  }
};
