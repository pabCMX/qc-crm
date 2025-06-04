import Link from 'next/link';
import { ArrowRightIcon, CheckCircleIcon, DocumentTextIcon, UsersIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Header */}
      <header className="relative bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-primary-700">QC CRM</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/auth/login"
                className="btn-primary px-6 py-2 h-10"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Quality Control</span>
              <span className="block text-primary-600">Client File Review CRM</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Streamline your client file review process with comprehensive case management, 
              error tracking, and supervisor approval workflows designed for QC teams.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  href="/auth/login"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10 transition-colors"
                >
                  Get Started
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Features</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Everything you need for efficient case management
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Built specifically for QC teams to manage client file reviews, track errors, 
                and maintain quality standards across your organization.
              </p>
            </div>

            <div className="mt-16">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                      <DocumentTextIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Case Management</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Efficiently manage client file reviews with automated case creation, assignment tracking, 
                    and comprehensive documentation capabilities.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                      <CheckCircleIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Quality Assurance</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Document client data verifications, identify errors, and maintain detailed case histories 
                    with built-in validation and approval workflows.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                      <UsersIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Team Collaboration</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Support for multiple user roles including analysts, supervisors, and administrators 
                    with proper permission controls and review processes.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                      <ChartBarIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Reporting & Analytics</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Generate comprehensive reports for statistics teams, management updates, 
                    and error tracking with flexible data export capabilities.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* User Roles Section */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Built for Your Team
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Designed to support every role in your quality control process
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="card p-6">
                <h3 className="text-lg font-medium text-gray-900">QC Analysts</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Document case reviews, verify client data, and identify errors with streamlined workflows
                </p>
              </div>
              <div className="card p-6">
                <h3 className="text-lg font-medium text-gray-900">Supervisors</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Review analyst work, approve cases, and manage team assignments with oversight tools
                </p>
              </div>
              <div className="card p-6">
                <h3 className="text-lg font-medium text-gray-900">Statisticians</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Upload sample files and access comprehensive reporting data for analysis
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary-700">
          <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Ready to get started?</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-primary-200">
              Sign in to access your QC dashboard and begin managing your client file reviews.
            </p>
            <Link
              href="/auth/login"
              className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 sm:w-auto transition-colors"
            >
              Sign In Now
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <p className="text-sm text-gray-500">
              QC Client File Review CRM
            </p>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Quality Control Team. Built for efficient case management.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 