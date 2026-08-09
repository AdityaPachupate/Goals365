import { pgTable, text, varchar, integer, timestamp, pgEnum, uuid, index, boolean } from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum('status', ['active', 'completed', 'archived']);
export const milestoneStatusEnum = pgEnum('milestone_status', ['pending', 'completed']);

export const goals = pgTable('goals', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 100 }).notNull(),
  description: varchar('description', { length: 500 }),
  year: integer('year').notNull(),
  totalHours: integer('total_hours'),
  targetDate: timestamp('target_date', { mode: 'date' }).notNull(),
  status: statusEnum('status').default('active').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  completedAt: timestamp('completed_at', { withTimezone: true }),
  archivedAt: timestamp('archived_at', { withTimezone: true })
}, (table) => {
  return {
    userIdIdx: index('goals_user_id_idx').on(table.userId),
    userYearStatusIdx: index('goals_user_year_status_idx').on(table.userId, table.year, table.status)
  }
});

export const milestones = pgTable('milestones', {
  id: uuid('id').defaultRandom().primaryKey(),
  goalId: uuid('goal_id').notNull().references(() => goals.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 200 }).notNull(),
  sortOrder: integer('sort_order').default(0).notNull(),
  status: milestoneStatusEnum('status').default('pending').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  completedAt: timestamp('completed_at', { withTimezone: true })
}, (table) => {
  return {
    goalIdSortOrderIdx: index('milestones_goal_id_sort_order_idx').on(table.goalId, table.sortOrder)
  }
});

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull(),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
  timezone: text('timezone')
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId').notNull().references(() => user.id)
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId').notNull().references(() => user.id),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull()
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt'),
  updatedAt: timestamp('updatedAt')
});
