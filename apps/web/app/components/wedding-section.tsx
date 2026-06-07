import Link from "next/link";
import type * as React from "react";
import { twMerge } from "tailwind-merge";
import { Container, ContainerInner } from "~/app/components/container";
import { ANCHORS } from "~/app/constants/anchors.constants";
import { chunky, copy, fancyHeading, label as labelStyles } from "~/app/styles/text.styles";

export function Wedding() {
  return (
    <Container>
      <ContainerInner className="flex flex-col gap-24">
        <div className="flex flex-col gap-7 text-center">
          <h2 id={ANCHORS.EVENTS} className={chunky({ className: "scroll-mt-20" })}>
            Join Us in Richmond, VA
          </h2>
          <h3 className={fancyHeading({ size: "lg" })}>Our Wedding Weekend</h3>
        </div>

        <div className="mx-auto grid w-full max-w-site-container-w-inner grid-cols-[auto_auto_1fr] gap-x-8 gap-y-16">
          <Day date="5/14" dow="Thursday">
            <Event name="Wine Bar Meetup">
              <EventDetail label="Time">
                <span className="font-medium">7PM to 9:30PM</span>
              </EventDetail>
              <EventDetail label="Place">
                <PlaceLink query="Jardin, 1520 W Main St, Richmond, VA 23220">
                  Jardin <br /> 1520 W Main St, <br />
                  Richmond, VA 23220
                </PlaceLink>
              </EventDetail>
              <EventDetail label="Attire">Casual</EventDetail>
              <EventDetail label="Details">
                For anyone already in town. Come hang out with us on the patio at Jardin for drinks and good company! No
                RSVP needed. Just drop by anytime.
              </EventDetail>
            </Event>
          </Day>
          <Day date="5/15" dow="Friday">
            <Event name="Welcome Party">
              <EventDetail label="Time">
                <span className="font-medium">5PM to 10PM</span>
              </EventDetail>
              <EventDetail label="Place">
                <PlaceLink query="Laura Lee's, 3410 Semmes Ave, Richmond, VA 23225">
                  Laura Lee’s <br /> 3410 Semmes Ave, <br />
                  Richmond, VA 23225
                </PlaceLink>
              </EventDetail>
              <EventDetail label="Attire">
                Cocktail; knee-length, midi, or cocktail dresses, jumpsuits, suit and tie, or a blazer with dress pants.
              </EventDetail>
              <EventDetail label="Details">
                Toast to the start of a wonderful wedding weekend with drinks, light bites, and good company as we
                welcome you to Richmond!
              </EventDetail>
            </Event>
          </Day>
          <Day date="5/16" dow="Saturday">
            <Event name="Wedding Ceremony & Reception">
              <EventDetail label="Time">
                <span className="font-medium">3:30PM Arrival</span>
                <span className="font-medium"> &mdash; 4PM Ceremony</span>
              </EventDetail>
              <EventDetail label="Place">
                <PlaceLink query="Virginia House Museum, 4301 Sulgrave Road, Richmond, VA 23221">
                  The Virginia House <br />
                  4301 Sulgrave Road, <br /> Richmond, VA 23221
                </PlaceLink>
                <span className="mt-3 block text-text-secondary text-xs leading-snug">
                  Heads up: Apple Maps may steer you to a different “Virginia Home” on the other side of Richmond —
                  that’s not us. If the link above doesn’t work, navigate to{" "}
                  <PlaceLink
                    query="Agecroft Hall & Gardens, 4305 Sulgrave Rd, Richmond, VA 23221"
                    className="underline underline-offset-2"
                  >
                    Agecroft Hall &amp; Gardens
                  </PlaceLink>{" "}
                  next door.
                </span>
              </EventDetail>

              <EventDetail label="Attire">
                Springtime Black Tie; Floor-length gowns in colorful or patterned fabrics, classic tuxedos, and colorful
                expressions of black tie are all welcome.
              </EventDetail>

              <EventDetail label="Details">
                Join us as we exchange vows and celebrate our marriage with dinner, drinks, and dancing.
              </EventDetail>
            </Event>
            <Event name="After Party">
              <EventDetail label="Time">
                <span className="font-medium">9PM to 12AM</span>
              </EventDetail>
              <EventDetail label="Place">
                <PlaceLink query="Common House Richmond, 303 W Broad St, Richmond, VA 23221">
                  Common House <br /> 303 W Broad St, <br />
                  Richmond, VA 23221
                </PlaceLink>
              </EventDetail>

              <EventDetail label="Details">
                <span className="font-medium">This event is 21+</span> &mdash; Keep the celebration going right after
                the reception with more food, drinks, and dancing!
              </EventDetail>
            </Event>
          </Day>
          <Day date="5/17" dow="Sunday">
            <Event name="Farewell Cookout">
              <EventDetail label="Time">
                <span className="font-medium">2PM</span>
              </EventDetail>
              <EventDetail label="Place">
                <PlaceLink query="Richmond, VA 23225">
                  A Friend's House <br /> 123 Example St, <br />
                  Richmond, VA 23225
                </PlaceLink>
              </EventDetail>

              <EventDetail label="Attire">Casual</EventDetail>

              <EventDetail label="Details">
                <p className="pb-2">
                  If you're still in town, join us for a relaxed cookout before you head home. A perfect way to say
                  goodbye and reminisce about the weekend.{" "}
                </p>

                <Link
                  className="w-fit text-text-primary underline underline-offset-4 transition-colors hover:text-text-secondary"
                  href="https://partiful.com/e/example"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  RSVP for the Cookout
                </Link>
              </EventDetail>
            </Event>
          </Day>
        </div>
      </ContainerInner>
    </Container>
  );
}

function Day({ date, dow, children }: { date: string; dow: string; children: React.ReactNode }) {
  return (
    <div className="col-span-full grid grid-cols-subgrid items-baseline gap-y-10">
      <div className={chunky()}>{date}</div>
      <div className={chunky()}>{dow}</div>
      <div className="col-span-full grid grid-cols-[auto_1fr] gap-x-10 gap-y-16 md:px-8 md:[grid-column:unset]">
        {children}
      </div>
    </div>
  );
}

function Event({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div className="col-span-full grid grid-cols-subgrid gap-y-4">
      <h4 className={fancyHeading({ size: "md", className: "col-span-full" })}>{name}</h4>
      {children}
    </div>
  );
}

function EventDetail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="col-span-full grid grid-cols-subgrid">
      <span className={labelStyles()}>{label}</span>
      <span className={copy()}>{children}</span>
    </div>
  );
}

function PlaceLink({ query, children, className }: { query: string; children: React.ReactNode; className?: string }) {
  const href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={twMerge(
        "text-text-primary underline decoration-text-secondary/40 underline-offset-4 transition-colors hover:text-text-secondary",
        className,
      )}
    >
      {children}
    </a>
  );
}
