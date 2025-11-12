"use client";

import { Container, ContainerInner } from "~/app/components/container";
import { copy, fancyHeading, label } from "~/app/styles/text.styles";

export function RsvpForm({
  formInformation,
}: {
  formInformation: Array<{
    id: string;
    name: string;
    date: string;
    rsvps: Array<{
      id: string;
      firstName: string;
      lastName: string;
      status: "pending" | "attending" | "declined";
    }>;
  }>;
}) {
  return (
    <main>
      <Container>
        <ContainerInner className="flex flex-col gap-24">
          <div className="flex flex-col gap-7 text-center">
            <h1 className={fancyHeading({ size: "lg" })}>Let's celebrate together!</h1>
          </div>
          <form className="mx-auto flex w-full max-w-site-container-w-inner flex-col gap-y-16">
            {formInformation.map((event) => (
              <div key={event.id} className="grid grid-cols-[auto_1fr] gap-x-10 gap-y-4 md:px-8 md:[grid-column:unset]">
                <h2 className={fancyHeading({ size: "md", className: "col-span-full" })}>{event.name}</h2>
                <div className="col-span-full grid grid-cols-subgrid">
                  <span className={label()}>Date</span>
                  <span className={copy()}>{event.date}</span>
                </div>
                <div className="col-span-full grid grid-cols-subgrid items-baseline">
                  <span className={label()}>RSVP</span>
                  <ul className="flex w-full flex-col border-black/10 *:border-b *:first:pt-0">
                    {event.rsvps.map((rsvp) => {
                      return (
                        <li key={rsvp.id} className="py-4">
                          <div className="flex items-baseline justify-between gap-2">
                            <span className={copy({ className: "block" })}>
                              {rsvp.firstName} {rsvp.lastName}
                            </span>
                            <div className="grid grid-flow-col grid-cols-[auto_1fr] items-center gap-2 justify-self-end">
                              <input
                                type="radio"
                                id={`rsvpStatus_${event.id}_${rsvp.id}_attend`}
                                name={`rsvpStatus_${event.id}_${rsvp.id}`}
                                value="attending"
                              />
                              <label htmlFor={`rsvpStatus_${event.id}_${rsvp.id}_attend`} className="ml-2">
                                Attending
                              </label>
                              <input
                                type="radio"
                                id={`rsvpStatus_${event.id}_${rsvp.id}_decline`}
                                name={`rsvpStatus_${event.id}_${rsvp.id}`}
                                value="declined"
                              />
                              <label htmlFor={`rsvpStatus_${event.id}_${rsvp.id}_decline`} className="ml-2">
                                Declined
                              </label>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ))}
          </form>
        </ContainerInner>
      </Container>
    </main>
  );
}
