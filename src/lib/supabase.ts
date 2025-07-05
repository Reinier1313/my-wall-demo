import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://pamumxtgcqyrbszjgpfd.supabase.co"      // 🔁 Replace this
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhbXVteHRnY3F5cmJzempncGZkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTY4OTkxNSwiZXhwIjoyMDY3MjY1OTE1fQ.VgtxcfXrcR7O74sYdg9HDSh4A9TXqMep3yx6vT_msNs"                     // 🔁 Replace this

export const supabase = createClient(supabaseUrl, supabaseKey)