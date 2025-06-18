import type React from 'react'

import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()
  
  // Check if user is authenticated
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    // Redirect to login if not authenticated
    redirect(`/${locale}/admin/login`)
  }
  
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-display">Admin Dashboard</h1>
          <form action={`/${locale}/admin/logout`} method="POST">
            <button
              type="submit"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign Out
            </button>
          </form>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}