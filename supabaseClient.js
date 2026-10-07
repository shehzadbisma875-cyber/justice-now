import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://nijpkyhlhmpggcimcxqr.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_7J3qDUVInQNMdCXSy3GDsw_yN7rA5w-";



const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

