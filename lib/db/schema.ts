import { pgTable, text, timestamp, pgEnum, boolean, integer, jsonb, uuid, varchar, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['ANALYST', 'SUPERVISOR', 'ADMIN']);
export const caseStatusEnum = pgEnum('case_status', ['NEW', 'IN_PROGRESS', 'PENDING_REVIEW', 'APPROVED', 'REJECTED']);
export const errorSeverityEnum = pgEnum('error_severity', ['LOW', 'MEDIUM', 'HIGH']);
export const errorStatusEnum = pgEnum('error_status', ['PENDING_MEMO', 'MEMO_SENT', 'ACTION_PENDING', 'RESOLVED']);

// Users table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: userRoleEnum('role').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Client Sample Batches table
export const clientSampleBatches = pgTable('client_sample_batches', {
  id: uuid('id').primaryKey().defaultRandom(),
  fileName: varchar('file_name', { length: 255 }).notNull(),
  uploadedAt: timestamp('uploaded_at').notNull().defaultNow(),
  uploadedByUserId: uuid('uploaded_by_user_id').notNull().references(() => users.id),
  processedAt: timestamp('processed_at'),
  rowCount: integer('row_count').notNull().default(0),
});

// Clients table
export const clients = pgTable('clients', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientSampleBatchId: uuid('client_sample_batch_id').notNull().references(() => clientSampleBatches.id),
  clientIdentifier: varchar('client_identifier', { length: 255 }).notNull(),
  clientDataJSON: jsonb('client_data_json').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// District Offices table
export const districtOffices = pgTable('district_offices', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  contactEmail: varchar('contact_email', { length: 255 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Cases table
export const cases = pgTable('cases', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientId: uuid('client_id').notNull().references(() => clients.id).unique(),
  assignedAnalystId: uuid('assigned_analyst_id').references(() => users.id),
  supervisorId: uuid('supervisor_id').references(() => users.id),
  status: caseStatusEnum('status').notNull().default('NEW'),
  dateAssigned: timestamp('date_assigned'),
  dateSubmittedForReview: timestamp('date_submitted_for_review'),
  dateApprovedOrRejected: timestamp('date_approved_or_rejected'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Case Verifications table
export const caseVerifications = pgTable('case_verifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  caseId: uuid('case_id').notNull().references(() => cases.id),
  fieldName: varchar('field_name', { length: 255 }).notNull(),
  originalValue: text('original_value').notNull(),
  verifiedValue: text('verified_value').notNull(),
  isCorrect: boolean('is_correct').notNull(),
  analystComment: text('analyst_comment'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Case Notes table
export const caseNotes = pgTable('case_notes', {
  id: uuid('id').primaryKey().defaultRandom(),
  caseId: uuid('case_id').notNull().references(() => cases.id),
  userId: uuid('user_id').notNull().references(() => users.id),
  noteText: text('note_text').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Case Errors table
export const caseErrors = pgTable('case_errors', {
  id: uuid('id').primaryKey().defaultRandom(),
  caseId: uuid('case_id').notNull().references(() => cases.id),
  errorType: varchar('error_type', { length: 255 }).notNull(),
  errorDescription: text('error_description').notNull(),
  severity: errorSeverityEnum('severity').notNull(),
  responsibleOfficeId: uuid('responsible_office_id').notNull().references(() => districtOffices.id),
  identifiedAt: timestamp('identified_at').notNull().defaultNow(),
  status: errorStatusEnum('status').notNull().default('PENDING_MEMO'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Memos table
export const memos = pgTable('memos', {
  id: uuid('id').primaryKey().defaultRandom(),
  generatedByUserId: uuid('generated_by_user_id').notNull().references(() => users.id),
  sentToOfficeId: uuid('sent_to_office_id').notNull().references(() => districtOffices.id),
  dateSent: timestamp('date_sent'),
  memoSubject: varchar('memo_subject', { length: 255 }).notNull(),
  memoBody: text('memo_body').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Memo Error Links table (many-to-many)
export const memoErrorLinks = pgTable(
  'memo_error_links',
  {
    memoId: uuid('memo_id').notNull().references(() => memos.id),
    caseErrorId: uuid('case_error_id').notNull().references(() => caseErrors.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.memoId, table.caseErrorId] }),
  }),
);

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  uploadedBatches: many(clientSampleBatches),
  assignedCases: many(cases, { relationName: 'analyst' }),
  supervisedCases: many(cases, { relationName: 'supervisor' }),
  caseNotes: many(caseNotes),
  generatedMemos: many(memos),
}));

export const clientSampleBatchesRelations = relations(clientSampleBatches, ({ one, many }) => ({
  uploadedBy: one(users, {
    fields: [clientSampleBatches.uploadedByUserId],
    references: [users.id],
  }),
  clients: many(clients),
}));

export const clientsRelations = relations(clients, ({ one }) => ({
  batch: one(clientSampleBatches, {
    fields: [clients.clientSampleBatchId],
    references: [clientSampleBatches.id],
  }),
  case: one(cases),
}));

export const casesRelations = relations(cases, ({ one, many }) => ({
  client: one(clients, {
    fields: [cases.clientId],
    references: [clients.id],
  }),
  assignedAnalyst: one(users, {
    fields: [cases.assignedAnalystId],
    references: [users.id],
    relationName: 'analyst',
  }),
  supervisor: one(users, {
    fields: [cases.supervisorId],
    references: [users.id],
    relationName: 'supervisor',
  }),
  verifications: many(caseVerifications),
  notes: many(caseNotes),
  errors: many(caseErrors),
}));

export const caseVerificationsRelations = relations(caseVerifications, ({ one }) => ({
  case: one(cases, {
    fields: [caseVerifications.caseId],
    references: [cases.id],
  }),
}));

export const caseNotesRelations = relations(caseNotes, ({ one }) => ({
  case: one(cases, {
    fields: [caseNotes.caseId],
    references: [cases.id],
  }),
  user: one(users, {
    fields: [caseNotes.userId],
    references: [users.id],
  }),
}));

export const caseErrorsRelations = relations(caseErrors, ({ one, many }) => ({
  case: one(cases, {
    fields: [caseErrors.caseId],
    references: [cases.id],
  }),
  responsibleOffice: one(districtOffices, {
    fields: [caseErrors.responsibleOfficeId],
    references: [districtOffices.id],
  }),
  memoLinks: many(memoErrorLinks),
}));

export const districtOfficesRelations = relations(districtOffices, ({ many }) => ({
  responsibleErrors: many(caseErrors),
  receivedMemos: many(memos),
}));

export const memosRelations = relations(memos, ({ one, many }) => ({
  generatedBy: one(users, {
    fields: [memos.generatedByUserId],
    references: [users.id],
  }),
  sentToOffice: one(districtOffices, {
    fields: [memos.sentToOfficeId],
    references: [districtOffices.id],
  }),
  errorLinks: many(memoErrorLinks),
}));

export const memoErrorLinksRelations = relations(memoErrorLinks, ({ one }) => ({
  memo: one(memos, {
    fields: [memoErrorLinks.memoId],
    references: [memos.id],
  }),
  caseError: one(caseErrors, {
    fields: [memoErrorLinks.caseErrorId],
    references: [caseErrors.id],
  }),
})); 