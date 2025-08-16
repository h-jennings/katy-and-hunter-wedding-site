import { ANCHORS } from "~/app/constants/anchors.constants";
import { chunky, copy, fancyHeading, label } from "~/app/styles/text.styles";

export function Stay() {
  return (
    <div className="px-16">
      <section className="mx-auto flex max-w-[1920px] flex-col gap-24 pt-20 pb-40">
        <h2 id={ANCHORS.STAY} className={fancyHeading({ size: "lg", className: "text-center" })}>
          Stay Awhile
        </h2>
        <div className="flex flex-col gap-y-40">
          <div className="flex gap-x-14">
            <div className="flex flex-1 flex-col items-center gap-y-8">
              <h3 className={fancyHeading({ size: "md", className: "text-center" })}>Quirk Hotel</h3>
              <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-10">
                <div className={label()}>Details</div>
                <div className={copy()}>
                  Featuring period hardwood floors, contemporary artwork and recycled furniture, the streamlined rooms
                  have minibars, free Wi-Fi and flat-screen TVs, as well as coffeemakers. Upgraded rooms add
                  floor-to-ceiling windows, while suites include living rooms; some are bi-level with loft bedrooms.
                  Room service is available.
                </div>
                <div className={label()}>Price</div>
                <div className={copy()}>$255/Night</div>
                <div className={label()}>Book</div>
                <div className={copy()}>Link to Book</div>
              </div>
            </div>
            <div className="flex flex-1 flex-col items-center gap-y-8">
              <h3 className={fancyHeading({ size: "md", className: "text-center" })}>Graduate Hotel</h3>
              <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-10">
                <div className={label()}>Details</div>
                <div className={copy()}>
                  On a tree-lined street in the historic Monroe Ward, this trendy hotel with mid-century modern decor
                  has accents inspired by local tennis great Arthur Ashe. It's 9 minutes on foot from Virginia
                  Commonwealth University and 10 miles from Richmond International Airport.
                </div>
                <div className={label()}>Price</div>
                <div className={copy()}>$255/Night</div>
                <div className={label()}>Book</div>
                <div className={copy()}>Link to Book</div>
              </div>
            </div>
          </div>
          <div className="flex gap-x-14">
            <div className="flex flex-1 flex-col gap-y-8">
              <h3 className={fancyHeading({ size: "md", className: "text-center" })}>Eat</h3>
              <Suggestion
                name="North End Juice Co."
                price="cheap"
                description="These smoothie bowls and breakfast burritos have saved us after a night out quite a few times."
              />
            </div>
            <div className="flex flex-1 flex-col gap-y-8">
              <h3 className={fancyHeading({ size: "md", className: "text-center" })}>Drink</h3>
              <Suggestion
                name="Afterglow Coffee Cooperative"
                price="cheap"
                description="Great coffee here (and matcha!)"
              />
              <Suggestion name="Brambley Park" price="cheap" description="Fun outdoor atmosphere" />
            </div>
            <div className="flex flex-1 flex-col gap-y-8">
              <h3 className={fancyHeading({ size: "md", className: "text-center" })}>Play</h3>
              <Suggestion
                name="Virginia Museum of Fine Arts"
                description="Acclaimed New Southern fare in a homey, country-chic space with craft cocktails & Virginia wines."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Suggestion({ name, price, description }: { name: string; price?: Price; description: string }) {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-baseline gap-2">
        <span className={chunky()}>{name}</span>
        {price != null && <span className="text-sm text-text-primary">{PRICE_LABEL[price]}</span>}
      </div>
      <div className={copy()}>{description}</div>
    </div>
  );
}

type Price = "cheap" | "moderate" | "expensive";
const PRICE_LABEL = {
  cheap: "$",
  moderate: "$$",
  expensive: "$$$",
} satisfies Record<Price, string>;
