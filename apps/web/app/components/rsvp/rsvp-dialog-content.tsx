import { RsvpPartyLookupForm } from "~/app/components/rsvp/rsvp-party-lookup-form";

export async function RsvpDialogContent() {
  return (
    <div className="w-full">
      <RsvpPartyLookupForm />
    </div>
  );
}
