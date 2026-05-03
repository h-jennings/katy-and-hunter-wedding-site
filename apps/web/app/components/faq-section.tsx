import { Container, ContainerInner } from "~/app/components/container";
import { ANCHORS } from "~/app/constants/anchors.constants";
import { chunky, copy, fancyHeading } from "~/app/styles/text.styles";

const FAQS: Array<{ topic: string; answer: string }> = [
  {
    topic: "Parking — Welcome Party",
    answer:
      "Rideshare is the preferred method of transportation to Laura Lee's. Street parking is available nearby, but is limited.",
  },
  {
    topic: "Schedule",
    answer: "The ceremony will begin at 4:00 PM. We kindly ask that guests arrive by 3:30 PM.",
  },
  {
    topic: "Parking — Wedding",
    answer:
      "Rideshare is the preferred method of transportation to the Virginia House. If you choose to drive, there is ample parking next door at Agecroft Hall & Gardens. Please note no parking is permitted overnight.",
  },
  {
    topic: "Indoor or Outdoor",
    answer:
      "The ceremony, cocktail hour, dinner, and reception will all take place outdoors. A tent and indoor spaces will be available in the event of inclement weather. We recommend bringing a light layer just in case. Much of the grounds are grassy, so if you plan to wear heels, we suggest comfortable block heels.",
  },
  {
    topic: "Getting to the After Party",
    answer:
      "A shuttle will run from the Virginia House to Common House immediately following the reception. If you choose to drive, there is ample parking at Common House. Rideshare is also a great option.",
  },
];

export function Faq() {
  return (
    <Container>
      <ContainerInner className="flex flex-col gap-24">
        <h2 id={ANCHORS.FAQ} className={fancyHeading({ size: "lg", className: "scroll-mt-20 text-center" })}>
          Frequently Asked
        </h2>
        <dl className="mx-auto flex w-full max-w-prose flex-col gap-y-14">
          {FAQS.map(({ topic, answer }) => (
            <FaqItem key={topic} topic={topic} answer={answer} />
          ))}
        </dl>
      </ContainerInner>
    </Container>
  );
}

function FaqItem({ topic, answer }: { topic: string; answer: string }) {
  return (
    <div className="flex flex-col gap-y-3">
      <dt className={chunky()}>{topic}</dt>
      <dd className={copy()}>{answer}</dd>
    </div>
  );
}
