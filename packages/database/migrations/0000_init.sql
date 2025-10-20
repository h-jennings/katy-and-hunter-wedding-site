CREATE TYPE "public"."rsvp_status" AS ENUM('pending', 'attending', 'declined');--> statement-breakpoint
CREATE TABLE "events" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" varchar(250) NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"details_url" varchar(250)
);
--> statement-breakpoint
CREATE TABLE "guests" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"first_name" varchar(250) NOT NULL,
	"last_name" varchar(250) NOT NULL,
	"party_id" varchar(21) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "parties" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"responded_at" timestamp with time zone,
	"display_name" varchar(250) NOT NULL,
	"email" varchar(320),
	"phone_number" varchar(20),
	"address" text,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "rsvps" (
	"event_id" varchar(21) NOT NULL,
	"guest_id" varchar(21) NOT NULL,
	"status" "rsvp_status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "rsvps_event_id_guest_id_pk" PRIMARY KEY("event_id","guest_id")
);
--> statement-breakpoint
ALTER TABLE "guests" ADD CONSTRAINT "guests_party_id_parties_id_fk" FOREIGN KEY ("party_id") REFERENCES "public"."parties"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rsvps" ADD CONSTRAINT "rsvps_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rsvps" ADD CONSTRAINT "rsvps_guest_id_guests_id_fk" FOREIGN KEY ("guest_id") REFERENCES "public"."guests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "first_name_last_name_idx" ON "guests" USING btree ("first_name","last_name");