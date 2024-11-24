import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vygqabvbjaqvjthgvego.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5Z3FhYnZiamFxdmp0aGd2ZWdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI0NjA4NDcsImV4cCI6MjA0ODAzNjg0N30.a88PFKPeq2I5z_NIij5J0Lnw4nfdtsEECttHQ19sPg0'
export const supabase = createClient(supabaseUrl, supabaseKey)