'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { UserRole } from '@/types';

export function Navigation() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getNavItems = (role: UserRole) => {
    const baseItems = [
      { name: 'Dashboard', href: '/dashboard' },
    ];

    switch (role) {
      case UserRole.ANALYST:
        return [
          { name: 'My Cases', href: '/analyst/cases' },
          { name: 'Dashboard', href: '/analyst/dashboard' },
        ];
      case UserRole.SUPERVISOR:
        return [
          ...baseItems,
          { name: 'Review Cases', href: '/supervisor/cases' },
          { name: 'Assign Cases', href: '/supervisor/cases/assign' },
          { name: 'Error Management', href: '/supervisor/errors' },
          { name: 'Reports', href: '/supervisor/reports' },
        ];
      case UserRole.ADMIN:
        return [
          ...baseItems,
          { name: 'Users', href: '/admin/users' },
          { name: 'Sample Intake', href: '/admin/samples' },
          { name: 'District Offices', href: '/admin/offices' },
          { name: 'Settings', href: '/admin/settings' },
        ];
      default:
        return baseItems;
    }
  };

  if (!session) {
    return null;
  }

  const navItems = getNavItems(session.user.role as UserRole);

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/dashboard" className="text-xl font-bold text-gray-900">
                QC CRM
              </Link>
            </div>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="ml-3 relative">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  {session.user.username} ({session.user.role})
                </span>
                <button
                  onClick={() => signOut()}
                  className="bg-white text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium border border-gray-300 hover:border-gray-400 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {/* Menu icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-500 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 border-transparent hover:border-gray-300 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => signOut()}
              className="text-gray-500 hover:text-gray-700 block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent hover:border-gray-300 text-base font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
} 