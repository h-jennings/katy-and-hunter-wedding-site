import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../dialog";

export async function RsvpDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="flex px-2 font-medium font-sans text-sm text-text-primary md:text-lg">
          RSVP
        </button>
      </DialogTrigger>
      <DialogContent className="grid aspect-[4/3] w-[min(24rem,100%)] max-w-[calc(100vw-3rem)] place-items-center">
        <DialogHeader>
          <DialogTitle>RSVP</DialogTitle>
          <DialogDescription className="sr-only">
            Please walk through the steps to RSVP. This is a multi-step process that will guide you through the process
            of RSVPing to the wedding.
          </DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
