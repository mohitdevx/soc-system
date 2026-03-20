import * as t from "drizzle-orm/pg-core";

export const employee = t.pgTable("employee", {
  employee_id: t.uuid("employee_id").unique().notNull().primaryKey(),
  employee_name: t.varchar("employee_name").notNull(),
  employee_email: t.varchar("employee_email").notNull().unique(),
  employee_password: t.text("employee_password").notNull(),
  updated_at: t.timestamp(),
  created_at: t.timestamp().defaultNow().notNull(),
  deleted_at: t.timestamp(),
});
