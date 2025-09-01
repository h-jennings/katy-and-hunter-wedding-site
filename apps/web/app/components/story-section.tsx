import { ANCHORS } from "~/app/constants/anchors.constants";
import { callout, chunky, fancyHeading } from "~/app/styles/text.styles";
import { Container, ContainerInner } from "./container";

export function Story() {
  return (
    <Container>
      <ContainerInner className="flex flex-col gap-7 text-center">
        <h2 id={ANCHORS.OUR_STORY} className={chunky({ className: "scroll-mt-20" })}>
          Our Story
        </h2>
        <h3 className={fancyHeading({ size: "lg" })}>A Night in the District</h3>
        <p className={callout({ className: "mx-auto w-full max-w-site-container-w-inner lg:text-center" })}>
          Their journey began, as many great love stories do, at a bar. After meeting serendipitously on the dance floor
          of Tropicalia, a basement bar and club, a night of dancing and late-night pizza turned into dates at Barcelona
          Wine Bar and the Hirshhorn museum. Weekends spent exploring Washington, D.C. turned into weekend trips to
          Richmond, where Katy met Hunter's family and friends, and to Florida, where Hunter met Katy's. Over the course
          of the next six years, they would share in adventures, accomplishments, and eventually an apartment. In 2022,
          the two moved their lives to Richmond, where they bought their first home and were adopted by their beloved
          dog, Buoy. In July 2024, Hunter hid a ring box in a pair of socks to pop the question midway through a
          six-mile hike in Lovingston, Virginia. Katy said, "yes".
        </p>
      </ContainerInner>
    </Container>
  );
}
