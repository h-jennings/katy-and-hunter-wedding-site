import { ANCHORS } from "~/app/constants/anchors.constants";
import { callout, eyebrow, fancyHeading } from "~/app/styles/text.styles";

export function Story() {
  return (
    <section className="mx-auto flex w-full max-w-[984px] flex-col gap-7 px-8 pt-20 pb-40 text-center">
      <h2 id={ANCHORS.OUR_STORY} className={eyebrow()}>
        Our Story
      </h2>
      <h3 className={fancyHeading()}>A Night in the District</h3>
      <p className={callout()}>
        Their journey began, as many great love stories do, serendipitously on a night out in Washington, D.C. On the
        dance floor of Tropicalia, a basement bar and club, an undeniable gravity drew Hunter and Katy together. What
        started as a night in the District quickly blossomed into dinner dates, weekends spent at Katy's D.C. apartment,
        and the adventure of memorable firsts—like Katy's first trip to Richmond and Hunter's to Florida. Step by step,
        their lives intertwined, from separate apartments to shared ones, then to a Richmond home and the adoption of
        their beloved dog, Buoy.
      </p>
    </section>
  );
}
