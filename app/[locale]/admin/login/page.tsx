import { redirect } from 'next/navigation'


import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { generatePageMetadata } from '@/lib/seo-utils'
import { createClient } from '@/utils/supabase/server'

import { LoginForm } from './login-form'

import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  
  return generatePageMetadata({
    title: 'Admin Login - Reshape Clinic',
    description: 'Administrator login page',
    locale,
    path: '/admin/login',
    noindex: true, // Don't index admin pages
  })
}

export default async function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const supabase = await createClient()
  
  // Check if already authenticated
  const { data: { user } } = await supabase.auth.getUser()
  
  if (user) {
    // Already logged in, redirect to admin
    redirect(`/${locale}/admin`)
  }
  
  return (
    <Section className="pt-32 pb-20">
      <Container className="max-w-md mx-auto">
        <h1 className="text-3xl font-display mb-8 text-center">
          Admin Login
        </h1>
        
        <LoginForm locale={locale} />
      </Container>
    </Section>
  )
}