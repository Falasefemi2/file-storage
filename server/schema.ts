/** @format */

// import { AnyPgColumn } from "drizzle-orm/pg-core";
import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

// export const users = table(
//   "users",
//   {
//     id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
//     firstName: t.varchar("first_name", { length: 256 }),
//     lastName: t.varchar("last_name", { length: 256 }),
//     email: t.varchar().notNull(),
//   },
//   (table) => [t.uniqueIndex("email_idx").on(table.email)]
// );

export const files = table(
  "files",
  {
    // id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    id: t.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: t.varchar("name", { length: 256 }).notNull(),
    size: t.integer("size"),
    url: t.varchar("url", { length: 256 }),
    parent: t.integer("parent").notNull(),
  },
  (table) => [t.index("files_parent_index").on(table.parent)] // Removed unique constraint
);

export const folders = table(
  "folders",
  {
    // id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    id: t.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: t.varchar("name", { length: 256 }).notNull(),
    parent: t.integer("parent"),
  },
  (table) => [t.index("folders_parent_index").on(table.parent)] // Changed to a regular index
);

// generatedByDefaultAsIdentity
