import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env['VITE_SUPABASE_URL'] as string;
const supabaseKey = import.meta.env['VITE_SUPABASE_ANON_KEY'] as string;

console.log('Supabase URL:', supabaseUrl); // <-- Добавь это
console.log('Supabase Key:', supabaseKey ? 'Key exists' : 'Key is missing'); // <-- Добавь это

export const supabase = createClient(supabaseUrl, supabaseKey);