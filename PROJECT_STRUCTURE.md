# QC CRM Project Structure

This document outlines the complete project structure for the QC Client File Review CRM application based on the MVP features from the design document.

## Root Level Files
```
├── package.json                    # Dependencies and scripts
├── next.config.js                  # Next.js configuration
├── tsconfig.json                   # TypeScript configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.mjs              # PostCSS configuration
├── eslint.config.mjs               # ESLint configuration
├── .env.example                    # Environment variables template
├── .gitignore                      # Git ignore patterns
├── README.md                       # Project documentation
├── docker-compose.yml              # Docker Compose configuration
├── Dockerfile                      # Docker build configuration
└── drizzle.config.ts               # Drizzle ORM configuration
```

## App Directory (Next.js App Router)
```
app/
├── layout.tsx                      # Root layout with providers
├── page.tsx                        # Home page (redirects to auth/dashboard)
├── globals.css                     # Global styles with Tailwind
├── loading.tsx                     # Global loading component
├── error.tsx                       # Global error component
├── not-found.tsx                   # 404 page
│
├── (auth)/                         # Authentication group
│   ├── layout.tsx                  # Auth-specific layout
│   └── login/
│       └── page.tsx                # Login page
│
├── (dashboard)/                    # Dashboard group (protected)
│   ├── layout.tsx                  # Dashboard layout with navigation
│   ├── page.tsx                    # Dashboard home (role-based redirect)
│   │
│   ├── analyst/                    # Analyst-specific pages
│   │   ├── cases/
│   │   │   ├── page.tsx           # My assigned cases list
│   │   │   └── [id]/
│   │   │       ├── page.tsx       # Case details/documentation
│   │   │       ├── edit/
│   │   │       │   └── page.tsx   # Case editing form
│   │   │       └── review/
│   │   │           └── page.tsx   # Submit for review
│   │   └── dashboard/
│   │       └── page.tsx           # Analyst dashboard
│   │
│   ├── supervisor/                 # Supervisor-specific pages
│   │   ├── dashboard/
│   │   │   └── page.tsx           # Supervisor dashboard
│   │   ├── cases/
│   │   │   ├── page.tsx           # Cases pending review
│   │   │   ├── assign/
│   │   │   │   └── page.tsx       # Case assignment interface
│   │   │   └── [id]/
│   │   │       ├── page.tsx       # Case review details
│   │   │       └── review/
│   │   │           └── page.tsx   # Approve/reject case
│   │   ├── errors/
│   │   │   ├── page.tsx           # Error management
│   │   │   └── memos/
│   │   │       ├── page.tsx       # Memo generation
│   │   │       └── [id]/
│   │   │           └── page.tsx   # Memo details
│   │   └── reports/
│   │       └── page.tsx           # Reports and exports
│   │
│   └── admin/                      # Admin-specific pages
│       ├── dashboard/
│       │   └── page.tsx           # Admin dashboard
│       ├── users/
│       │   ├── page.tsx           # User management
│       │   ├── create/
│       │   │   └── page.tsx       # Create user
│       │   └── [id]/
│       │       └── page.tsx       # Edit user
│       ├── samples/
│       │   ├── page.tsx           # Sample intake management
│       │   └── upload/
│       │       └── page.tsx       # File upload interface
│       ├── offices/
│       │   ├── page.tsx           # District office management
│       │   └── [id]/
│       │       └── page.tsx       # Edit office
│       └── settings/
│           └── page.tsx           # System configuration
│
└── api/                           # API Routes
    ├── auth/
    │   └── [...nextauth]/
    │       └── route.ts           # NextAuth configuration
    │
    ├── users/
    │   ├── route.ts               # GET /api/users, POST /api/users
    │   └── [id]/
    │       └── route.ts           # GET/PUT/DELETE /api/users/[id]
    │
    ├── samples/
    │   ├── route.ts               # GET /api/samples, POST /api/samples
    │   ├── upload/
    │   │   └── route.ts           # POST /api/samples/upload
    │   └── [id]/
    │       └── route.ts           # GET /api/samples/[id]
    │
    ├── cases/
    │   ├── route.ts               # GET /api/cases, POST /api/cases
    │   ├── assign/
    │   │   └── route.ts           # POST /api/cases/assign
    │   └── [id]/
    │       ├── route.ts           # GET/PUT /api/cases/[id]
    │       ├── verifications/
    │       │   └── route.ts       # GET/POST /api/cases/[id]/verifications
    │       ├── notes/
    │       │   └── route.ts       # GET/POST /api/cases/[id]/notes
    │       ├── errors/
    │       │   └── route.ts       # GET/POST /api/cases/[id]/errors
    │       └── review/
    │           └── route.ts       # POST /api/cases/[id]/review
    │
    ├── errors/
    │   ├── route.ts               # GET /api/errors
    │   └── [id]/
    │       └── route.ts           # GET/PUT /api/errors/[id]
    │
    ├── memos/
    │   ├── route.ts               # GET /api/memos, POST /api/memos
    │   └── [id]/
    │       └── route.ts           # GET/PUT /api/memos/[id]
    │
    ├── offices/
    │   ├── route.ts               # GET /api/offices, POST /api/offices
    │   └── [id]/
    │       └── route.ts           # GET/PUT/DELETE /api/offices/[id]
    │
    └── reports/
        ├── cases/
        │   └── route.ts           # GET /api/reports/cases (CSV export)
        ├── errors/
        │   └── route.ts           # GET /api/reports/errors (CSV export)
        └── dashboard/
            └── route.ts           # GET /api/reports/dashboard (stats)
```

## Components Directory
```
components/
├── providers.tsx                   # React Query + Auth providers
├── navigation.tsx                  # Main navigation component
├── loading-spinner.tsx             # Reusable loading component
├── error-boundary.tsx              # Error boundary component
│
├── ui/                            # Base UI components
│   ├── button.tsx                 # Button component
│   ├── input.tsx                  # Input component
│   ├── select.tsx                 # Select component
│   ├── modal.tsx                  # Modal component
│   ├── table.tsx                  # Table component
│   ├── card.tsx                   # Card component
│   ├── badge.tsx                  # Badge component
│   ├── tabs.tsx                   # Tabs component
│   └── form.tsx                   # Form wrapper components
│
├── auth/                          # Authentication components
│   ├── login-form.tsx             # Login form component
│   ├── protected-route.tsx        # Route protection HOC
│   └── role-guard.tsx             # Role-based access control
│
├── cases/                         # Case management components
│   ├── case-list.tsx              # Case listing component
│   ├── case-card.tsx              # Individual case card
│   ├── case-details.tsx           # Case details view
│   ├── case-form.tsx              # Case editing form
│   ├── case-status-badge.tsx      # Status indicator
│   ├── verification-form.tsx      # Data verification form
│   ├── notes-section.tsx          # Notes display/input
│   ├── errors-section.tsx         # Errors display/input
│   └── assignment-form.tsx        # Case assignment interface
│
├── dashboard/                     # Dashboard components
│   ├── stats-cards.tsx            # Dashboard statistics cards
│   ├── recent-activity.tsx        # Recent activity feed
│   ├── analyst-dashboard.tsx      # Analyst-specific dashboard
│   ├── supervisor-dashboard.tsx   # Supervisor-specific dashboard
│   └── admin-dashboard.tsx        # Admin-specific dashboard
│
├── samples/                       # Sample management components
│   ├── file-upload.tsx            # File upload component
│   ├── sample-list.tsx            # Sample batches list
│   ├── sample-details.tsx         # Sample batch details
│   └── client-data-viewer.tsx     # Client data display
│
├── errors/                        # Error management components
│   ├── error-list.tsx             # Error listing
│   ├── error-form.tsx             # Error creation/editing
│   ├── memo-generator.tsx         # Memo generation interface
│   └── memo-preview.tsx           # Memo preview component
│
├── users/                         # User management components
│   ├── user-list.tsx              # User listing
│   ├── user-form.tsx              # User creation/editing
│   ├── role-selector.tsx          # Role selection component
│   └── user-profile.tsx           # User profile display
│
└── reports/                       # Reporting components
    ├── export-button.tsx          # CSV export functionality
    ├── report-filters.tsx         # Report filtering interface
    └── chart-components.tsx       # Basic charts (if needed)
```

## Lib Directory (Utilities and Configuration)
```
lib/
├── db/                            # Database configuration
│   ├── index.ts                   # Database connection setup
│   ├── schema.ts                  # Drizzle schema definitions
│   └── migrations/                # Database migration files
│       └── 0001_initial.sql       # Initial schema migration
│
├── auth/                          # Authentication utilities
│   ├── config.ts                  # NextAuth configuration
│   ├── middleware.ts              # Auth middleware
│   └── permissions.ts             # Role-based permissions
│
├── validations/                   # Zod validation schemas
│   ├── auth.ts                    # Authentication schemas
│   ├── user.ts                    # User-related schemas
│   ├── case.ts                    # Case-related schemas
│   ├── sample.ts                  # Sample upload schemas
│   └── error.ts                   # Error-related schemas
│
├── utils/                         # Utility functions
│   ├── cn.ts                      # Class name utility (clsx + tailwind-merge)
│   ├── file-parser.ts             # CSV/TSV parsing utilities
│   ├── date.ts                    # Date formatting utilities
│   ├── export.ts                  # Data export utilities
│   └── constants.ts               # Application constants
│
├── hooks/                         # Custom React hooks
│   ├── use-cases.ts               # Case management hooks
│   ├── use-users.ts               # User management hooks
│   ├── use-dashboard.ts           # Dashboard data hooks
│   └── use-auth.ts                # Authentication hooks
│
└── services/                      # Business logic services
    ├── case-service.ts            # Case management logic
    ├── sample-service.ts          # Sample processing logic
    ├── error-service.ts           # Error management logic
    ├── memo-service.ts            # Memo generation logic
    └── report-service.ts          # Report generation logic
```

## Types Directory
```
types/
├── index.ts                       # Main type definitions (already created)
├── auth.ts                        # Authentication-specific types
├── api.ts                         # API request/response types
└── next-auth.d.ts                 # NextAuth type extensions
```

## Configuration Files
```
├── drizzle.config.ts              # Drizzle ORM configuration
├── .env.example                   # Environment variables template
├── docker-compose.yml             # Development Docker setup
├── Dockerfile                     # Production Docker image
└── jest.config.js                 # Testing configuration
```

## MVP Feature Implementation Priority

### Phase 1: Core Authentication & Setup
- [x] Project structure and configuration
- [ ] Database schema and migrations
- [ ] Authentication system (NextAuth)
- [ ] Basic UI components
- [ ] Navigation and layouts

### Phase 2: User Management
- [ ] User CRUD operations
- [ ] Role-based access control
- [ ] Admin user management interface

### Phase 3: Sample Intake
- [ ] File upload functionality
- [ ] CSV/TSV parsing
- [ ] Client data ingestion
- [ ] Batch management

### Phase 4: Case Management
- [ ] Case creation and assignment
- [ ] Analyst case workflow
- [ ] Case documentation (verifications, notes)
- [ ] Status tracking

### Phase 5: Supervisor Workflow
- [ ] Case review interface
- [ ] Approval/rejection workflow
- [ ] Feedback system

### Phase 6: Error Management
- [ ] Error identification and logging
- [ ] Memo generation
- [ ] Error status tracking

### Phase 7: Reporting & Export
- [ ] Basic reporting interface
- [ ] CSV export functionality
- [ ] Dashboard statistics

This structure follows the extensibility plan from the design document and organizes code by feature while maintaining clear separation of concerns. 