# wedding rsvp system - action plan

## schema (drizzle)

```typescript
// parties table
- id (uuid, pk)
- created_at, updated_at, responded_at (timestamps)
- display_name (varchar 250) - "The Smith Family"
- email (varchar 320), phone_number (varchar 20), address (text)
- notes (text) - party-level comments

// guests table
- id (uuid, pk)
- created_at, updated_at
- first_name, last_name (varchar 250)
- party_id (fk to parties)
- index on (first_name, last_name)

// events table
- id (uuid, pk)
- created_at, updated_at
- name (varchar 250) - "Welcome Party", "Wedding", etc
- date (timestamp with timezone)

// rsvps table
- id (uuid, pk)
- guest_id (fk to guests, not null)
- event_id (fk to events, not null)
- status (enum: pending, attending, declined) - default pending
- created_at, updated_at
- unique index on (guest_id, event_id)

// rsvp_status enum
- pending, attending, declined
```

## auth flow

1. **code entry**: guest enters invite code → server verifies → sets httpOnly cookie with jwt `{authorized: true}`
2. **name lookup**: guest enters first/last name → server searches guests table (case-insensitive) → returns matching parties
3. **party selection**: if multiple matches, show party picker with display_name. if one match, auto-select
4. **issue party token**: once party confirmed → replace cookie with new jwt `{authorized: true, partyId: uuid}`
5. **show form**: fetch party + guests + events + existing rsvps → render checkboxes

## cookie setup

```typescript
cookies().set("auth_token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 60 * 60 * 24 * 30, // 30 days
});
```

## page structure (rsc)

```typescript
// app/rsvp/page.tsx
async function getAuthState() {
  const token = cookies().get('auth_token')?.value;
  // decode jwt, determine state, fetch data if authenticated
  return { state: 'needs_code' | 'needs_name' | 'authenticated', party?, events? }
}

export default async function RsvpPage() {
  const auth = await getAuthState();

  return (
    <RsvpModal>
      {auth.state === 'needs_code' && <CodeForm />}
      {auth.state === 'needs_name' && <NameLookupForm />}
      {auth.state === 'authenticated' && <RsvpForm party={auth.party} events={auth.events} />}
    </RsvpModal>
  );
}
```

## server actions

```typescript
// verify code
export async function verifyCode(formData: FormData) {
  if (code !== process.env.INVITE_CODE) return { error: "Invalid code" };
  // set cookie with {authorized: true}
  redirect("/rsvp");
}

// lookup party
export async function lookupParty(formData: FormData) {
  // search guests by LOWER(TRIM(first_name)) and LOWER(TRIM(last_name))
  // if 0 results: show error + email fallback option
  // if 1 result: set cookie with {authorized: true, partyId}
  // if multiple: show party picker UI
}

// submit rsvp
export async function submitRsvp(formData: FormData) {
  const { partyId } = jwt.verify(token);
  // verify all guest_ids belong to this party
  // upsert rsvps with status='attending' or 'declined'
  // set parties.responded_at = now()
  // update parties.notes if provided
}

// clear party selection (for "not you?" link)
export async function clearPartySelection() {
  // set cookie with {authorized: true} only (remove partyId)
  redirect("/rsvp");
}
```

## initial data setup

when creating guest list, pre-populate rsvps:

```typescript
// for each new guest
await db.transaction(async (tx) => {
  const [guest] = await tx.insert(guests).values({...}).returning();

  const allEvents = await tx.select().from(events);

  await tx.insert(rsvps).values(
    allEvents.map(e => ({
      guestId: guest.id,
      eventId: e.id,
      status: 'pending'
    }))
  );
});
```

## form ux

- show all guests in party with checkboxes for each event
- pre-check boxes based on existing rsvp status
- party-level notes textarea at bottom
- "not you?" link to go back to name lookup
- "start over" link to clear auth entirely

## name lookup edge cases

- case-insensitive + trim whitespace
- if no match: "couldn't find you - try the email associated with your party or contact us"
- if multiple matches: show list with party.display_name + guest names for disambiguation
- consider fuzzy matching later if needed (pg_trgm)

## reminder emails

query parties where:

- `responded_at IS NULL` (never submitted)
- or all their guests' rsvps still have `status='pending'` for a given event

use `parties.email` to send reminders

## security notes

- shared code is all-or-nothing - anyone with code can access
- once they select a party, jwt includes partyId to prevent cross-party tampering
- httpOnly + secure + sameSite=strict cookies prevent xss/csrf
- validate guest_ids belong to jwt's partyId on rsvp submission

## things you're explicitly not doing

- per-guest dietary restrictions (party-level notes is enough)
- draft auto-save (losing progress on refresh is fine)
- audit trail of rsvp changes (just overwrite)
- per-party invite codes (shared secret is simpler)
