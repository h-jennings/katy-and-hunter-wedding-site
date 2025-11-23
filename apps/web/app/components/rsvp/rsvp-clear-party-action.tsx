import { IconRestart } from "~/app/components/icon-restart";
import { clearAuthJwt } from "~/app/lib/auth/auth.helpers";

export function ClearParty() {
  return (
    <form action={clearAuthJwt}>
      <button
        type="submit"
        className="mx-auto flex items-center gap-2 rounded-full bg-bg-inverse px-4 py-1.5 pr-1.5 text-sm transition-all hover:scale-[0.98] active:scale-[0.95]"
      >
        <span className="text-bg-foundation">Not your party?</span>{" "}
        <span className="inline-flex gap-0.5 rounded-full bg-bg-foundation py-0.5 pr-2 pl-1.5 text-text-primary">
          <span className="grid size-lh place-items-center">
            <IconRestart className="size-3 stroke-text-primary" />
          </span>
          Reset selection
        </span>
      </button>
    </form>
  );
}
