import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://twjthceznvfswwqrpgrm.supabase.co'
const supabaseAnonKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3anRoY2V6bnZmc3d3cXJwZ3JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA4MDQ5NDUsImV4cCI6MjAxNjM4MDk0NX0.dCUBrvOXaFIvGbScF994lcILSjVAGNY35n7Ur1MgtTU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})