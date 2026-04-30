import { Container, ContainerInner } from "~/app/components/container";
import { ANCHORS } from "~/app/constants/anchors.constants";
import { chunky, copy, fancyHeading } from "~/app/styles/text.styles";

const FAQS: Array<{ topic: string; answer: string }> = [
  {
    topic: "Parking",
    answer:
      "For the wedding at the Virginia House, rideshare is the easiest move. There's a lot next door at Agecroft Hall & Gardens with around 60 spots, plus some street parking nearby (just be mindful, it's a residential area). Street parking works for the Welcome Party at Laura Lee's, and Common House has small lots plus street parking on Broad. Cars can't stay overnight at any of the venues, so plan your ride home accordingly.",
  },
  {
    topic: "Getting to the After Party",
    answer:
      "We're running a shuttle from the Virginia House to Common House right after the reception, but seats may be limited, so be ready to rideshare if needed. It's a quick 15-minute drive, and Ubers are easy to grab in Richmond. We'll share final shuttle details closer to the day.",
  },
  {
    topic: "Welcome Party Food",
    answer: "It's a buffet, and there'll be plenty. Come hungry, no need to grab dinner first.",
  },
  {
    topic: "Indoor or Outdoor",
    answer:
      "At the Virginia House, the ceremony and cocktail hour will be indoors. Dinner and the reception are under a tent, so we're covered (literally) if the weather turns. Bring a light layer just in case.",
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
