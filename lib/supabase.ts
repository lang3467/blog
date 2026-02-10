import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type BlogPost = {
  id: string
  author_id: string
  title: string
  content: string
  excerpt: string
  category: string
  views: number
  likes: number
  created_at: string
  author?: {
    display_name: string
    avatar_url: string
  }
}
