import { Circle, CircleCheckIcon, CircleXIcon } from "lucide-react";
import { ButtonLink } from "~/app/components/button";
import { Container, ContainerInner } from "~/app/components/container";
import { ClearParty } from "~/app/components/rsvp/rsvp-clear-party-action";
import { getRsvpDetailsByPartyId } from "~/app/lib/queries/rsvp.queries";
import { chunky, copy, fancyHeading, label } from "~/app/styles/text.styles";

export async function RsvpConfirmation({ partyId, partyName }: { partyId: string; partyName: string }) {
  const result = await getRsvpDetailsByPartyId(partyId);

  return (
    <main>
      <Container>
        <ContainerInner className="flex flex-col gap-24">
          <div className="flex flex-col gap-7 text-center">
            <ClearParty />
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
                  <div className="col-span-full grid grid-cols-subgrid">
                    <span className={label()}>Time</span>
                    <span className={copy({ className: "font-medium" })}>
                      {event.startTime} {event.endTime ? `to ${event.endTime}` : null}
                    </span>
                  </div>
                  <div className="col-span-full grid grid-cols-subgrid">
                    <span className={label()}>Place</span>
                    <span className={copy({ className: "whitespace-pre-wrap" })}>{event.location}</span>
                  </div>
                  <div className="col-span-full grid grid-cols-subgrid">
                    <span className={label()}>Attire</span>
                    <span className={copy({ className: "whitespace-pre-wrap" })}>{event.attire}</span>
                  </div>
                  <div className="col-span-full grid grid-cols-subgrid">
                    <span className={label()}>Details</span>
                    <span className={copy({ className: "whitespace-pre-wrap" })}>{event.description}</span>
                  </div>
                  <div className="col-span-full grid grid-cols-subgrid items-baseline">
                    <span className={label()}>RSVP Responses</span>
                    <ul className="flex w-full flex-col border-black/10 *:border-b *:first:pt-0">
                      {event.rsvps.map((rsvp) => {
                        return (
                          <li key={rsvp.guest.id} className="py-4">
                            <div className="flex items-baseline justify-between gap-2">
                              <span className={copy({ className: "block" })}>
                                {rsvp.guest.firstName} {rsvp.guest.lastName}
                              </span>
                              <div className="grid grid-flow-col grid-cols-[auto_1fr] items-center gap-2 justify-self-end">
                                <span className={copy({ className: "font-medium capitalize" })}>
                                  {STATUS_COPY[rsvp.status]}
                                </span>
                                {STATUS_ICON[rsvp.status]}
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mx-auto">
            <ButtonLink
              href={{
                search: "edit",
              }}
            >
              Edit RSVP
            </ButtonLink>
          </div>
        </ContainerInner>
      </Container>
    </main>
  );
}

const STATUS_ICON = {
  pending: <Circle className="size-4" />,
  attending: <CircleCheckIcon className="size-4" />,
  declined: <CircleXIcon className="size-4" />,
} as const;

const STATUS_COPY = {
  pending: "Pending",
  attending: "Will Attend",
  declined: "Will Not Attend",
} as const;
