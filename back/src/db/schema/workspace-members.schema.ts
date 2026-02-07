import { pgTable, uuid, text, varchar, timestamp, unique } from 'drizzle-orm/pg-core';
import { workspaces } from './workspaces.schema';
import { users } from './users.schema';

export const workspaceMembers = pgTable(
  'workspace_members',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    workspaceId: uuid('workspace_id')
      .notNull()
      .references(() => workspaces.id, { onDelete: 'cascade' }),
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    role: varchar('role').notNull().default('member'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    workspaceUserUnique: unique().on(table.workspaceId, table.userId),
  }),
);
