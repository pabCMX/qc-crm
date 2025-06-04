# QC Client File Review CRM

A Quality Control Client File Review Customer Relationship Management system built with Next.js, TypeScript, and PostgreSQL.

## Overview

This application streamlines the process of reviewing client files sampled monthly by the statistics department. It facilitates work distribution to QC analysts, enables comprehensive documentation of case reviews, manages error identification and reporting, and supports supervisor approval workflows.

## Features

### MVP Features
- **User Management**: Role-based authentication (Analyst, Supervisor, Admin)
- **Sample Intake**: Upload and process CSV/TSV files containing client samples
- **Case Management**: Automatic case creation, assignment, and status tracking
- **Case Documentation**: Client data verification, notes, and error identification
- **Supervisor Workflow**: Case review, approval/rejection with feedback
- **Error Reporting**: Memo generation and tracking for district offices
- **Data Export**: CSV exports for reporting and analysis

### User Roles
- **Analysts**: Document case reviews, verify client data, identify errors
- **Supervisors**: Review analyst work, approve/reject cases, manage errors
- **Administrators**: Manage users, upload samples, configure system

## Technology Stack

- **Framework**: Next.js 14+ with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query + Zustand
- **Validation**: Zod
- **Forms**: React Hook Form
- **Development**: ESLint, Prettier, Husky

## Getting Started

### Prerequisites
- Node.js 18+ 
- Docker and Docker Compose (recommended)
- PostgreSQL (if not using Docker)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd qc-crm
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/qc_crm_db"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   ```

### Development Setup

#### Option 1: Docker Compose (Recommended)
```bash
# Start the application and database
docker-compose up -d

# The application will be available at http://localhost:3000
```

#### Option 2: Local Development
```bash
# Start PostgreSQL locally (adjust connection string in .env.local)

# Generate database schema
npm run db:generate

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

### Database Setup

1. **Generate schema**
   ```bash
   npm run db:generate
   ```

2. **Run migrations**
   ```bash
   npm run db:migrate
   ```

3. **View database (optional)**
   ```bash
   npm run db:studio
   ```

## Project Structure

```
├── app/                          # Next.js App Router
│   ├── (auth)/                  # Authentication pages
│   ├── (dashboard)/             # Protected dashboard pages
│   │   ├── analyst/             # Analyst-specific pages
│   │   ├── supervisor/          # Supervisor-specific pages
│   │   └── admin/               # Admin-specific pages
│   └── api/                     # API routes
├── components/                   # Reusable React components
├── lib/                         # Utilities and configuration
│   ├── db/                      # Database schema and connection
│   ├── validations/             # Zod schemas
│   ├── utils/                   # Helper functions
│   └── hooks/                   # Custom React hooks
├── types/                       # TypeScript type definitions
└── public/                      # Static assets
```

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
npm run format       # Format code with Prettier
npm run db:generate  # Generate database schema
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Drizzle Studio
```

### Code Quality

- **TypeScript**: Strict mode enabled for type safety
- **ESLint**: Configured with Next.js and TypeScript rules
- **Prettier**: Automatic code formatting
- **Husky**: Pre-commit hooks for code quality

## API Routes

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout

### Users
- `GET /api/users` - List users
- `POST /api/users` - Create user
- `GET /api/users/[id]` - Get user details
- `PUT /api/users/[id]` - Update user

### Cases
- `GET /api/cases` - List cases
- `GET /api/cases/[id]` - Get case details
- `PUT /api/cases/[id]` - Update case
- `POST /api/cases/[id]/review` - Submit/review case

### Sample Management
- `POST /api/samples/upload` - Upload sample file
- `GET /api/samples` - List sample batches

### Reports
- `GET /api/reports/cases` - Export cases (CSV)
- `GET /api/reports/errors` - Export errors (CSV)

## Deployment

### Self-Hosting (Primary Method)

1. **Using Docker Compose**
   ```bash
   # Clone repository on target machine
   git clone <repository-url>
   cd qc-crm
   
   # Configure environment
   cp .env.example .env.local
   # Edit .env.local with production values
   
   # Start application
   docker-compose up -d
   ```

2. **Manual Setup**
   ```bash
   # Install dependencies
   npm ci --only=production
   
   # Build application
   npm run build
   
   # Start application
   npm start
   ```

### Cloud Deployment

- **Vercel**: Natural choice for Next.js applications
- **Railway/Render**: Full-stack deployment with managed PostgreSQL
- **Docker**: Deploy containers to any cloud provider

## Security Considerations

- Environment variables for sensitive configuration
- Role-based access control
- Input validation with Zod schemas
- SQL injection protection via Drizzle ORM
- CSRF protection through NextAuth.js
- Security headers configured in Next.js

## Contributing

1. Create a feature branch
2. Make changes following the coding standards
3. Run tests and type checks
4. Submit a pull request

## License

MIT License

Copyright (c) [2025] [Pablo Portillo]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
## Support

For questions or issues, please refer to the project documentation or create an issue in the repository.
