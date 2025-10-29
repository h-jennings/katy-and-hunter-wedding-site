import { getAuthState } from "~/app/lib/auth/auth.helpers";
import { RsvpCodeForm } from "./rsvp-code-form";

export async function Rsvp() {
  const state = await getAuthState();

  return (
    <div>
      <RsvpCodeForm />
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}
