/** @format */

import { pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

export const files = table(
  "files",
  {
    id: t.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: t.varchar("name", { length: 256 }).notNull(),
    size: t.integer("size"),
    url: t.varchar("url", { length: 256 }),
    parent: t.integer("parent").notNull(),
  },
  (table) => [t.index("files_parent_index").on(table.parent)]
);

export const folders = table(
  "folders",
  {
    id: t.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: t.varchar("name", { length: 256 }).notNull(),
    parent: t.integer("parent"),
  },
  (table) => [t.index("folders_parent_index").on(table.parent)]
);
