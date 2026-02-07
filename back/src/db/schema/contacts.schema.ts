import { pgTable, uuid, varchar, text, timestamp, index } from 'drizzle-orm/pg-core';
import { workspaces } from './workspaces.schema';
import { companies } from './companies.schema';

export const contacts = pgTable(
  'contacts',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    workspaceId: uuid('workspace_id')
      .notNull()
      .references(() => workspaces.id, { onDelete: 'cascade' }),
    companyId: uuid('company_id').references(() => companies.id, {
      onDelete: 'set null',
    }),
    firstname: varchar('firstname').notNull(),
    lastname: varchar('lastname'),
    email: varchar('email'),
    phone: varchar('phone'),
    linkedinUrl: varchar('linkedin_url'),
    type: varchar('type').notNull().default('lead'),
    status: varchar('status').notNull().default('new'),
    source: varchar('source'),
    datePremierContact: timestamp('date_premier_contact', {
      withTimezone: true,
    }),
    dateRelancePrevue: timestamp('date_relance_prevue', {
      withTimezone: true,
    }),
    notes: text('notes'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    workspaceIdx: index('contacts_workspace_id_idx').on(table.workspaceId),
    companyIdx: index('contacts_company_id_idx').on(table.companyId),
    typeIdx: index('contacts_type_idx').on(table.type),
    statusIdx: index('contacts_status_idx').on(table.status),
    dateRelanceIdx: index('contacts_date_relance_prevue_idx').on(
      table.dateRelancePrevue,
    ),
  }),
);
