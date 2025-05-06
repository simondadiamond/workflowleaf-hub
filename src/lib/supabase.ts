import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

// These environment variables would normally be in a .env file
// For this example, we're using placeholder values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'example-anon-key';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
