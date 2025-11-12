import { db } from "@repo/database";
import { guests } from "@repo/database/schema";
import { eq } from "drizzle-orm";
import { Container, ContainerInner } from "~/app/components/container";
import { chunky, copy, fancyHeading, label } from "~/app/styles/text.styles";

export async function RsvpConfirmation({ partyId, partyName }: { partyId: string; partyName: string }) {
  const result = await getRsvpDetailsByPartyId(partyId);

  return (
    <main>
      <Container>
        <ContainerInner className="flex flex-col gap-24">
          <div className="flex flex-col gap-7 text-center">
            <h1 className={chunky({ className: "scroll-mt-20" })}>{partyName} RSVP</h1>
            <h2 className={fancyHeading({ size: "lg" })}>Thank You for Joining Us!</h2>
          </div>
          <div className="mx-auto flex w-full max-w-site-container-w-inner flex-col gap-y-16">
            {result.map((event) => {
              return (
                <div
                  key={event.id}
                  className="grid grid-cols-[auto_1fr] gap-x-10 gap-y-4 md:px-8 md:[grid-column:unset]"
                >
                  <h3 className={fancyHeading({ size: "md", className: "col-span-full" })}>{event.name}</h3>
                  <div className="col-span-full grid grid-cols-subgrid">
                    <span className={label()}>Date</span>
                    <span className={copy()}>{event.date.toISOString()}</span>
                  </div>
                  <div className="col-span-full grid grid-cols-subgrid items-baseline">
                    <span className={label()}>Guest Responses</span>
                    <ul className="flex w-full flex-col border-black/10 *:border-b *:first:pt-0">
                      {event.rsvps.map((rsvp) => {
                        return (
                          <li key={rsvp.guest.id} className="py-4">
                            <span className="flex items-baseline justify-between gap-2">
                              <span className={copy()}>
                                {rsvp.guest.firstName} {rsvp.guest.lastName}
                              </span>
                              <span className={copy()}>{rsvp.status}</span>
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </ContainerInner>
      </Container>
    </main>
  );
}

async function getRsvpDetailsByPartyId(partyId: string) {
  const eventsWithRsvps = await db.query.events.findMany({
    with: {
      rsvps: {
        where: (rsvps, { inArray }) =>
          inArray(rsvps.guestId, db.select({ id: guests.id }).from(guests).where(eq(guests.partyId, partyId))),
        with: {
          guest: true,
        },
      },
    },
  });

  return eventsWithRsvps;
}
