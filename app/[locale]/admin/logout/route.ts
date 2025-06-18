import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

import { createClient } from '@/utils/supabase/server'

export async function POST(request: NextRequest, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const supabase = await createClient()
  
  await supabase.auth.signOut()
  
  redirect(`/${locale}/admin/login`)
}