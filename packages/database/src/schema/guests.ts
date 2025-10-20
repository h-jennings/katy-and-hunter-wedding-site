import { relations } from "drizzle-orm";
import { index, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { generateId, NANOID_LENGTH } from "../utils/generate-id";
import { parties } from "./parties";
import { rsvps } from "./rsvps";

export const guests = pgTable(
  "guests",
  {
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
    firstName: varchar("first_name", { length: 250 }).notNull(),
    lastName: varchar("last_name", { length: 250 }).notNull(),
    partyId: varchar("party_id", { length: NANOID_LENGTH })
      .references(() => parties.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => [index("first_name_last_name_idx").on(table.firstName, table.lastName)],
);

export const guestsRelations = relations(guests, ({ one, many }) => {
  return {
    party: one(parties, {
      fields: [guests.partyId],
      references: [parties.id],
    }),
    rsvps: many(rsvps),
  };
});
