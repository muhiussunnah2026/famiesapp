// আগে ছিল: import { createClient } from '@supabase/supabase-js';
// এখন হবে 👇
import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// createBrowserClient কুকি এবং সেশন অটোমেটিক হ্যান্ডেল করে
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);