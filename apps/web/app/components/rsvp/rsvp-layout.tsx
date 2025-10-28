import type * as React from "react";
import { Container, ContainerInner } from "~/app/components/container";
import { ClearParty } from "~/app/components/rsvp/rsvp-clear-party-action";
import { chunky, fancyHeading } from "~/app/styles/text.styles";

export function RsvpLayout({
  eyebrow = "RSVP",
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main>
      <Container>
        <ContainerInner className="flex flex-col gap-24">
          <div className="flex flex-col gap-7 text-center">
            <ClearParty />
            <h2 className={chunky()}>{eyebrow}</h2>
            <h1 className={fancyHeading({ size: "lg" })}>{title}</h1>
          </div>
          {children}
        </ContainerInner>
      </Container>
    </main>
  );
}
