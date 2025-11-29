import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { generateId, NANOID_LENGTH } from "../utils/generate-id";
import { rsvps } from "./rsvps";

export const events = pgTable("events", {
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
  name: varchar("name", { length: 250 }).notNull(),
  date: timestamp("date", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  startTime: varchar("start_time", { length: 50 }),
  endTime: varchar("end_time", { length: 50 }),
  detailsUrl: varchar("details_url", { length: 250 }),
  location: text("location"),
  attire: text("attire"),
  description: text("description"),
});

export const eventsRelations = relations(events, ({ many }) => {
  return {
    rsvps: many(rsvps),
  };
});
