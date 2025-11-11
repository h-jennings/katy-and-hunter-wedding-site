import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/app/components/dialog";

export async function RsvpDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="flex px-2 font-medium font-sans text-sm text-text-primary md:text-lg">
          RSVP
        </button>
      </DialogTrigger>
      <DialogContent className="grid place-items-center outline-none">
        <DialogHeader>
          <DialogTitle className="sr-only">RSVP</DialogTitle>
          <DialogDescription className="sr-only">
            Please walk through the steps to RSVP. This is a multi-step process that will guide you through the process
            of RSVPing to the wedding.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
