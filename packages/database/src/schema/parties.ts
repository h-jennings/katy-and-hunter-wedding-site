import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { generateId, NANOID_LENGTH } from "../utils/generate-id";
import { guests } from "./guests";

export const parties = pgTable("parties", {
  id: varchar("id", { length: NANOID_LENGTH })
    .$defaultFn(() => generateId())
    .primaryKey(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  })
    .defaultNow()
    .notNull(),
  respondedAt: timestamp("responded_at", {
    withTimezone: true,
    mode: "date",
  }),
  displayName: varchar("display_name", { length: 250 }).notNull(),
  email: varchar("email", { length: 320 }).$type<`${string}@${string}.${string}`>(),
  phoneNumber: varchar("phone_number", { length: 20 }),
  address: text("address"),
  notes: text("notes"),
});

export const partiesRelations = relations(parties, ({ many }) => {
  return {
    guests: many(guests),
  };
});
