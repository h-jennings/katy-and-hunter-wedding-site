import { redirect } from "next/navigation";
import { getAuthState } from "~/app/lib/auth/auth.helpers";

export default async function RsvpPage() {
  const state = await getAuthState();

  if (!state.authorized || state.partyId == null) {
    return redirect("/");
  }

  return (
    <div>
      <h1>RSVP Page</h1>
      {/* Add your RSVP page content here */}
    </div>
  );
}
