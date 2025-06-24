# Admin Setup Guide

## Authentication Configuration

The admin section is now set up with Supabase authentication. 

### Environment Variables

The following environment variables are configured in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

### Creating the First Admin User

Since we need a service role key to create users programmatically, you have two options:

#### Option 1: Use Supabase Dashboard (Recommended)
1. Go to https://supabase.com/dashboard/project/bqcnujvxdqrlirtsslji/auth/users
2. Click "Add user" → "Create new user"
3. Enter email and password
4. Make sure "Auto Confirm User" is checked

#### Option 2: Use the Create User Form
1. Deploy the application first
2. Navigate to `/admin/login`
3. A temporary user can sign up through the form on `/admin/users` page
4. The user will receive a confirmation email

### Admin Pages

- `/admin` - Main dashboard
- `/admin/login` - Login page
- `/admin/users` - User management
- `/monitoring` - Core Web Vitals monitoring (accessible to admins)

### Security Notes

1. The admin section is protected by middleware that checks authentication
2. All admin routes require authentication
3. Sessions are managed through secure HTTP-only cookies
4. The middleware refreshes sessions automatically

### Next Steps

1. Create your first admin user
2. Log in at `/admin/login`
3. Change the default password immediately
4. Set up additional admin users as needed

### Future Enhancements

- Content management system
- Analytics dashboard
- SEO tools
- System settings