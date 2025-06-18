import Link from 'next/link'


import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { generatePageMetadata } from '@/lib/seo-utils'
import { createClient } from '@/utils/supabase/server'

import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  
  return generatePageMetadata({
    title: 'Admin Dashboard - Reshape Clinic',
    description: 'Administrator dashboard',
    locale,
    path: '/admin',
    noindex: true,
  })
}

export default async function AdminDashboard({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const supabase = await createClient()
  
  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  
  return (
    <Section className="pt-8">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-display mb-2">Welcome back</h2>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Core Web Vitals */}
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">Performance Monitoring</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Monitor Core Web Vitals and site performance
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href={`/${locale}/monitoring`}>
                  View Dashboard
                </Link>
              </Button>
            </div>
            
            {/* Content Management */}
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">Content Management</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Manage pages, services, and blog posts
              </p>
              <Button variant="outline" size="sm" disabled>
                Coming Soon
              </Button>
            </div>
            
            {/* Analytics */}
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">Analytics</h3>
              <p className="text-sm text-muted-foreground mb-4">
                View visitor statistics and AI crawler activity
              </p>
              <Button variant="outline" size="sm" disabled>
                Coming Soon
              </Button>
            </div>
            
            {/* User Management */}
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">User Management</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Manage admin users and permissions
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href={`/${locale}/admin/users`}>
                  Manage Users
                </Link>
              </Button>
            </div>
            
            {/* SEO Tools */}
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">SEO Tools</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Manage meta tags, sitemaps, and structured data
              </p>
              <Button variant="outline" size="sm" disabled>
                Coming Soon
              </Button>
            </div>
            
            {/* System Settings */}
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">System Settings</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Configure site settings and integrations
              </p>
              <Button variant="outline" size="sm" disabled>
                Coming Soon
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}