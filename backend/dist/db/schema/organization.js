"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTable = void 0;
const t = __importStar(require("drizzle-orm/pg-core"));
const employee_1 = require("./employee");
const orgAdmin_1 = require("./orgAdmin");
exports.userTable = t.pgTable("organization", {
    org_id: t.uuid("id").defaultRandom().primaryKey(),
    org_name: t.text("org_name").notNull(),
    org_email: t.text("org_email").unique().notNull(),
    org_contact: t.text("org_contact").notNull(),
    org_password: t.text("org_password").notNull(),
    org_admin: t.integer().references(() => orgAdmin_1.orgAdmin.admin_id),
    org_employee: t.integer().references(() => employee_1.employee.employee_id),
    updated_at: t.timestamp(),
    created_at: t.timestamp().defaultNow().notNull(),
    deleted_at: t.timestamp(),
});
