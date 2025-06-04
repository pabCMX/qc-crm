import { redirect } from 'next/navigation';

export default function HomePage() {
  // This will redirect to login by default
  // In a real implementation, we'd check authentication status
  redirect('/auth/login');
} 