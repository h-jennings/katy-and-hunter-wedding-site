import type * as React from "react";
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
          <Day date="5/15" dow="Friday">
            <Event name="Welcome Party">
              <EventDetail label="Time">
                <span className="font-medium">5PM to 10PM</span>
              </EventDetail>
              <EventDetail label="Place">
                Laura Lee’s <br /> 3410 Semmes Ave, <br />
                Richmond, VA 23225
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
                <span className="font-medium">4PM to 9PM</span>
              </EventDetail>
              <EventDetail label="Place">
                The Virginia House <br />
                4301 Sulgrave Road, <br /> Richmond, VA 23221
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
                Common House <br /> 303 W Broad St, <br />
                Richmond, VA 23221
              </EventDetail>

              <EventDetail label="Details">
                Keep the celebration going right after the reception with more food, drinks, and dancing!
              </EventDetail>
            </Event>
          </Day>
          {/* <Day date="5/17" dow="Sunday"> */}
          {/*   <Event name="Fairwell Cookout"> */}
          {/*     <EventDetail label="Time"> */}
          {/*       <span className="font-medium">1PM</span> */}
          {/*     </EventDetail> */}
          {/*     <EventDetail label="Place"> */}
          {/*       The Jennings' Home <br /> 604 N 33rd St, <br /> */}
          {/*       Richmond, VA 23223 */}
          {/*     </EventDetail> */}
          {/**/}
          {/*     <EventDetail label="Attire">Casual</EventDetail> */}
          {/**/}
          {/*     <EventDetail label="Details"> */}
          {/*       Join us for a relaxed cookout before you head home, a perfect way to say goodbye and reminisce about the */}
          {/*       weekend. */}
          {/*     </EventDetail> */}
          {/*   </Event> */}
          {/* </Day> */}
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
