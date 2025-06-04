// User Management Types
export enum UserRole {
  ANALYST = 'ANALYST',
  SUPERVISOR = 'SUPERVISOR',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string;
  username: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

// Case Management Types
export enum CaseStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  PENDING_REVIEW = 'PENDING_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface ClientSampleBatch {
  id: string;
  fileName: string;
  uploadedAt: Date;
  uploadedByUserId: string;
  processedAt?: Date;
  rowCount: number;
}

export interface Client {
  id: string;
  clientSampleBatchId: string;
  clientIdentifier: string;
  clientDataJSON: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Case {
  id: string;
  clientId: string;
  assignedAnalystId?: string;
  supervisorId?: string;
  status: CaseStatus;
  dateAssigned?: Date;
  dateSubmittedForReview?: Date;
  dateApprovedOrRejected?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Case Documentation Types
export interface CaseVerification {
  id: string;
  caseId: string;
  fieldName: string;
  originalValue: string;
  verifiedValue: string;
  isCorrect: boolean;
  analystComment?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CaseNote {
  id: string;
  caseId: string;
  userId: string;
  noteText: string;
  createdAt: Date;
  updatedAt: Date;
}

// Error Management Types
export enum ErrorSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum ErrorStatus {
  PENDING_MEMO = 'PENDING_MEMO',
  MEMO_SENT = 'MEMO_SENT',
  ACTION_PENDING = 'ACTION_PENDING',
  RESOLVED = 'RESOLVED',
}

export interface CaseError {
  id: string;
  caseId: string;
  errorType: string;
  errorDescription: string;
  severity: ErrorSeverity;
  responsibleOfficeId: string;
  identifiedAt: Date;
  status: ErrorStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface DistrictOffice {
  id: string;
  name: string;
  contactEmail?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Memo {
  id: string;
  generatedByUserId: string;
  sentToOfficeId: string;
  dateSent?: Date;
  memoSubject: string;
  memoBody: string;
  createdAt: Date;
}

export interface MemoErrorLink {
  memoId: string;
  caseErrorId: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Form Types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface CreateUserRequest {
  username: string;
  password: string;
  role: UserRole;
}

export interface UpdateUserRequest {
  username?: string;
  role?: UserRole;
}

export interface FileUploadRequest {
  file: File;
  fileName: string;
}

export interface CaseAssignmentRequest {
  caseIds: string[];
  analystId: string;
}

export interface CaseVerificationRequest {
  fieldName: string;
  originalValue: string;
  verifiedValue: string;
  isCorrect: boolean;
  analystComment?: string;
}

export interface CaseNoteRequest {
  noteText: string;
}

export interface CaseErrorRequest {
  errorType: string;
  errorDescription: string;
  severity: ErrorSeverity;
  responsibleOfficeId: string;
}

export interface MemoRequest {
  sentToOfficeId: string;
  memoSubject: string;
  memoBody: string;
  errorIds: string[];
}

// Dashboard Types
export interface DashboardStats {
  totalCases: number;
  pendingCases: number;
  approvedCases: number;
  errorCount: number;
  lastWeekCases: number;
}

export interface AnalystDashboard {
  assignedCases: Case[];
  recentActivity: CaseNote[];
  stats: {
    assigned: number;
    inProgress: number;
    completed: number;
  };
}

export interface SupervisorDashboard {
  pendingReviews: Case[];
  recentApprovals: Case[];
  teamStats: {
    analystCount: number;
    pendingReviews: number;
    errorsFound: number;
  };
} 