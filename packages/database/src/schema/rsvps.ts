import { relations } from "drizzle-orm";
import { pgEnum, pgTable, primaryKey, timestamp, varchar } from "drizzle-orm/pg-core";
import { NANOID_LENGTH } from "../utils/generate-id";
import { events } from "./events";
import { guests } from "./guests";

export const rsvpStatusEnum = pgEnum("rsvp_status", ["pending", "attending", "declined"]);

export const rsvps = pgTable(
  "rsvps",
  {
    eventId: varchar("event_id", { length: NANOID_LENGTH })
      .references(() => events.id, { onDelete: "cascade" })
      .notNull(),
    guestId: varchar("guest_id", { length: NANOID_LENGTH })
      .references(() => guests.id, {
        onDelete: "cascade",
      })
      .notNull(),
    status: rsvpStatusEnum("status").notNull().default("pending"),
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
  },
  (table) => [primaryKey({ columns: [table.eventId, table.guestId] })],
);

export const rsvpsRelations = relations(rsvps, ({ one }) => {
  return {
    event: one(events, {
      fields: [rsvps.eventId],
      references: [events.id],
    }),
    guest: one(guests, {
      fields: [rsvps.guestId],
      references: [guests.id],
    }),
  };
});
