import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { users } from './users.schema';
import { workspaces } from './workspaces.schema';
import { workspaceMembers } from './workspace-members.schema';
import { companies } from './companies.schema';
import { contacts } from './contacts.schema';
import { revenues } from './revenues.schema';

// ============================================
// USER TYPES
// ============================================
export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

// ============================================
// WORKSPACE TYPES
// ============================================
export type Workspace = InferSelectModel<typeof workspaces>;
export type NewWorkspace = InferInsertModel<typeof workspaces>;

// ============================================
// WORKSPACE MEMBER TYPES
// ============================================
export type WorkspaceMember = InferSelectModel<typeof workspaceMembers>;
export type NewWorkspaceMember = InferInsertModel<typeof workspaceMembers>;

// ============================================
// COMPANY TYPES
// ============================================
export type Company = InferSelectModel<typeof companies>;
export type NewCompany = InferInsertModel<typeof companies>;

// ============================================
// CONTACT TYPES
// ============================================
export type Contact = InferSelectModel<typeof contacts>;
export type NewContact = InferInsertModel<typeof contacts>;

// Contact specific enums
export type ContactType = 'lead' | 'client';
export type ContactStatus = 'new' | 'contacted' | 'qualified' | 'lost' | 'won';
export type ContactSource = 'linkedin' | 'referral' | 'website' | 'cold_email';

// ============================================
// REVENUE TYPES
// ============================================
export type Revenue = InferSelectModel<typeof revenues>;
export type NewRevenue = InferInsertModel<typeof revenues>;

// ============================================
// ROLE ENUMS
// ============================================
export type UserRole = 'user' | 'admin';
export type WorkspaceMemberRole = 'owner' | 'member';
