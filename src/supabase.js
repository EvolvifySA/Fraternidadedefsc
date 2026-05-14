import { createClient } from '@supabase/supabase-js';

// É importante que você renomeie as variáveis no seu arquivo .env.local
// de NEXT_PUBLIC_ para VITE_
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variáveis de ambiente do Supabase não encontradas. Verifique seu arquivo .env.local e renomeie NEXT_PUBLIC para VITE_');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);