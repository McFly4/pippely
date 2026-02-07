import { pgTable, uuid, varchar, text, timestamp, index } from 'drizzle-orm/pg-core';
import { workspaces } from './workspaces.schema';

export const companies = pgTable(
  'companies',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    workspaceId: uuid('workspace_id')
      .notNull()
      .references(() => workspaces.id, { onDelete: 'cascade' }),
    name: varchar('name').notNull(),
    website: varchar('website'),
    siret: varchar('siret'),
    notes: text('notes'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    workspaceIdx: index('companies_workspace_id_idx').on(table.workspaceId),
    nameIdx: index('companies_name_idx').on(table.name),
  }),
);
