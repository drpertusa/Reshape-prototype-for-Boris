
import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { generatePageMetadata } from '@/lib/seo-utils'
import { createClient } from '@/utils/supabase/server'

import { CreateUserForm } from './create-user-form'

import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  
  return generatePageMetadata({
    title: 'User Management - Admin',
    description: 'Manage admin users',
    locale,
    path: '/admin/users',
    noindex: true,
  })
}

export default async function UsersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const supabase = await createClient()
  
  // Note: Listing all users requires service role key
  // For now, we'll just show the current user
  const { data: { user } } = await supabase.auth.getUser()
  const users = user ? { users: [user] } : { users: [] }
  
  return (
    <Section className="pt-8">
      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-display mb-2">User Management</h2>
            <p className="text-muted-foreground">Manage admin users and their access</p>
          </div>
          
          {/* Create User Form */}
          <div className="mb-12 max-w-md">
            <h3 className="font-semibold mb-4">Create New User</h3>
            <CreateUserForm locale={locale} />
          </div>
          
          {/* Users List */}
          <div>
            <h3 className="font-semibold mb-4">Existing Users</h3>
            {users && users.users.length > 0 ? (
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4">Email</th>
                      <th className="text-left p-4">Created</th>
                      <th className="text-left p-4">Last Sign In</th>
                      <th className="text-left p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.users.map((user) => (
                      <tr key={user.id} className="border-t">
                        <td className="p-4">{user.email}</td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {user.last_sign_in_at
                            ? new Date(user.last_sign_in_at).toLocaleDateString()
                            : 'Never'}
                        </td>
                        <td className="p-4">
                          <span className="inline-block px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                            Confirmed
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted-foreground">No users found</p>
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}