import * as t from "drizzle-orm/pg-core";

export const orgAdmin = t.pgTable("employee", {
  admin_id: t.uuid("admin_id").unique().notNull().primaryKey(),
  admin_name: t.varchar("admin_name").notNull(),
  admin_email: t.varchar("admin_email").notNull().unique(),
  admin_password: t.text("admin_password").notNull(),
  updated_at: t.timestamp(),
  created_at: t.timestamp().defaultNow().notNull(),
  deleted_at: t.timestamp(),
});

