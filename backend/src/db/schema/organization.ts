import * as t from "drizzle-orm/pg-core";
import { employee } from "./employee";
import { orgAdmin } from "./orgAdmin";

export const userTable = t.pgTable("organization", {
  org_id: t.uuid("id").defaultRandom().primaryKey(),
  org_name: t.text("org_name").notNull(),
  org_email: t.text("org_email").unique().notNull(),
  org_contact: t.text("org_contact").notNull(),
  org_password: t.text("org_password").notNull(),
  org_admin: t.integer().references(() => orgAdmin.admin_id),
  org_employee: t.integer().references(() => employee.employee_id),
  updated_at: t.timestamp(),
  created_at: t.timestamp().defaultNow().notNull(),
  deleted_at: t.timestamp(),
});
