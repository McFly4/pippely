import { pgTable, uuid, varchar, text, boolean, decimal, date, timestamp, index } from 'drizzle-orm/pg-core';
import { workspaces } from './workspaces.schema';
import { companies } from './companies.schema';

export const revenues = pgTable(
  'revenues',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    workspaceId: uuid('workspace_id')
      .notNull()
      .references(() => workspaces.id, { onDelete: 'cascade' }),
    companyId: uuid('company_id')
      .notNull()
      .references(() => companies.id, { onDelete: 'cascade' }),
    description: varchar('description').notNull(),
    isRecurring: boolean('is_recurring').notNull().default(false),
    amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
    startDate: date('start_date'),
    endDate: date('end_date'),
    paymentDate: date('payment_date'),
    isActive: boolean('is_active').notNull().default(true),
    notes: text('notes'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    workspaceIdx: index('revenues_workspace_id_idx').on(table.workspaceId),
    companyIdx: index('revenues_company_id_idx').on(table.companyId),
    isRecurringIdx: index('revenues_is_recurring_idx').on(table.isRecurring),
    isActiveIdx: index('revenues_is_active_idx').on(table.isActive),
    startDateIdx: index('revenues_start_date_idx').on(table.startDate),
    endDateIdx: index('revenues_end_date_idx').on(table.endDate),
    paymentDateIdx: index('revenues_payment_date_idx').on(table.paymentDate),
  }),
);
