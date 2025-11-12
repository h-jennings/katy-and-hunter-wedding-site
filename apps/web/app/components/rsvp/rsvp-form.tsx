"use client";

import { Container, ContainerInner } from "~/app/components/container";
import { fancyHeading } from "~/app/styles/text.styles";

export function RsvpForm({
  formInformation,
}: {
  formInformation: Array<{
    id: string;
    name: string;
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
        <ContainerInner>
          <div className="flex flex-col gap-7 text-center">
            <h1 className={fancyHeading({ size: "lg" })}>Let's celebrate together!</h1>
          </div>
          <form className="mx-auto">
            {formInformation.map((event) => (
              <div key={event.id} className="grid grid-cols-[auto_1fr] gap-x-10 gap-y-4 md:px-8 md:[grid-column:unset]">
                <h2 className={fancyHeading({ size: "md", className: "col-span-full" })}>{event.name}</h2>
                {event.rsvps.map((rsvp) => (
                  <div key={rsvp.id} className="col-span-full">
                    <p>{`${rsvp.firstName} ${rsvp.lastName}`}</p>
                    <p>Status: {rsvp.status}</p>
                  </div>
                ))}
              </div>
            ))}
          </form>
        </ContainerInner>{" "}
      </Container>
    </main>
  );
}
