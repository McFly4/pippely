import { relations } from 'drizzle-orm';
import { users } from './users.schema';
import { workspaces } from './workspaces.schema';
import { workspaceMembers } from './workspace-members.schema';
import { companies } from './companies.schema';
import { contacts } from './contacts.schema';
import { revenues } from './revenues.schema';
import { sessions, accounts } from './auth.schema';

// Relations pour users
export const usersRelations = relations(users, ({ many }) => ({
  ownedWorkspaces: many(workspaces),
  workspaceMemberships: many(workspaceMembers),
  sessions: many(sessions),
  accounts: many(accounts),
}));

// Relations pour sessions
export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

// Relations pour accounts
export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

// Relations pour workspaces
export const workspacesRelations = relations(workspaces, ({ one, many }) => ({
  owner: one(users, {
    fields: [workspaces.ownerId],
    references: [users.id],
  }),
  members: many(workspaceMembers),
  companies: many(companies),
  contacts: many(contacts),
  revenues: many(revenues),
}));

// Relations pour workspace_members
export const workspaceMembersRelations = relations(
  workspaceMembers,
  ({ one }) => ({
    workspace: one(workspaces, {
      fields: [workspaceMembers.workspaceId],
      references: [workspaces.id],
    }),
    user: one(users, {
      fields: [workspaceMembers.userId],
      references: [users.id],
    }),
  }),
);

// Relations pour companies
export const companiesRelations = relations(companies, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [companies.workspaceId],
    references: [workspaces.id],
  }),
  contacts: many(contacts),
  revenues: many(revenues),
}));

// Relations pour contacts
export const contactsRelations = relations(contacts, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [contacts.workspaceId],
    references: [workspaces.id],
  }),
  company: one(companies, {
    fields: [contacts.companyId],
    references: [companies.id],
  }),
}));

// Relations pour revenues
export const revenuesRelations = relations(revenues, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [revenues.workspaceId],
    references: [workspaces.id],
  }),
  company: one(companies, {
    fields: [revenues.companyId],
    references: [companies.id],
  }),
}));
