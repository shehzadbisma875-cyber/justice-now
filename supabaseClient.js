import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nijpkyhlhmpggcimcxqr.supabase.co'
const supabaseAnonKey = 'sb_publishable_7J3qDUVinQNMCsXy3GDsw_yN7rA...'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)