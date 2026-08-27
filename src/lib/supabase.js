import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isValidUrl = (u) => {
  try {
    const parsed = new URL(u);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
};

export const supabaseReady = Boolean(url && anonKey && isValidUrl(url));

export const supabase = supabaseReady ? createClient(url, anonKey) : null;

if (!supabaseReady && typeof window !== 'undefined') {
  console.warn(
    '[supabase] Not configured. Set VITE_SUPABASE_URL (valid https URL) and VITE_SUPABASE_ANON_KEY. Site will run in read-only demo mode.'
  );
}
