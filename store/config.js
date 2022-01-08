import { createClient } from "@supabase/supabase-js";

export const storageURL = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL;
export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY
);
