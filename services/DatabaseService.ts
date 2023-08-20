import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL ?? ''
const key = process.env.SUPABASE_API_KEY ?? ''
// Create a single supabase client for interacting with your database
const sb = createClient(url, key)

export const getCats = async () => {
  const response = await sb.from('Friends').select()
  return response
}

export const getFriends = async () => {
  const response = await sb.from('Friends').select()
  return response
}
