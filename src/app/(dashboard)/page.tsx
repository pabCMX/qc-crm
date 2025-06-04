import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { UserRole } from '@/types';
import { authOptions } from '@/lib/auth/config';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/login');
  }

  // Redirect to role-specific dashboard
  const userRole = session.user.role;
 
 // Validate role exists in UserRole enum
 if (!Object.values(UserRole).includes(userRole as UserRole)) {
   redirect('/auth/login');
 }
  
  switch (userRole) {
    case UserRole.ANALYST:
      redirect('/analyst/dashboard');
    case UserRole.SUPERVISOR:
      redirect('/supervisor/dashboard');
    case UserRole.ADMIN:
      redirect('/admin/dashboard');
    default:
      redirect('/auth/login');
  }
} 