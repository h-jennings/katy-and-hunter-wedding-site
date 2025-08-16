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
                description="Fresh-pressed juices, smoothies, and acai bowls in Richmond's Museum District with quality ingredients and healthy options."
              />
              <Suggestion
                name="Stanleys"
                price="moderate"
                description="Popular Richmond restaurant known for its welcoming atmosphere and locally-sourced American cuisine."
              />
              <Suggestion
                name="Cochiloco"
                price="moderate"
                description="Vibrant Mexican restaurant featuring authentic flavors and creative cocktails in a lively atmosphere."
              />
              <Suggestion
                name="The Roosevelt"
                price="expensive"
                description="Upscale Southern restaurant offering refined comfort food and an extensive bourbon selection in an elegant setting."
              />
              <Suggestion
                name="Alewife"
                price="expensive"
                description="Award-winning Mid-Atlantic seafood restaurant in Church Hill, nationally recognized for innovative dishes and creative cocktails."
              />
              <Suggestion
                name="Heritage"
                price="expensive"
                description="New American restaurant featuring seasonal cuisine and craft cocktails in a contemporary brick-walled space with innovative dishes."
              />
            </div>
            <div className="flex flex-1 flex-col gap-y-8">
              <h3 className={fancyHeading({ size: "md", className: "text-center" })}>Drink</h3>
              <Suggestion
                name="Afterglow Coffee Cooperative"
                price="cheap"
                description="Richmond's first worker-owned coffee cooperative featuring specialty single-origin beans and community-focused atmosphere."
              />
              <Suggestion
                name="Brambly Park"
                price="moderate"
                description="Unique multi-purpose venue combining a two-acre outdoor park, Southern Italian restaurant, and winery in Scott's Addition."
              />
              <Suggestion
                name="Triple Crossing Beer"
                price="cheap"
                description="Local craft brewery known for innovative beers and a welcoming taproom atmosphere with regular food trucks."
              />
              <Suggestion
                name="The Emerald Lounge"
                price="moderate"
                description="Tropical-themed cocktail bar in Church Hill specializing in rum and agave drinks with a relaxed getaway atmosphere."
              />
              <Suggestion
                name="The Jasper"
                price="moderate"
                description="Intimate neighborhood bar and restaurant offering craft cocktails and elevated comfort food in a cozy setting."
              />
              <Suggestion
                name="Get Tight Lounge"
                price="moderate"
                description="Hip cocktail lounge with creative drinks, DJ sets, and a trendy atmosphere perfect for late-night socializing."
              />
            </div>
            <div className="flex flex-1 flex-col gap-y-8">
              <h3 className={fancyHeading({ size: "md", className: "text-center" })}>Play</h3>
              <Suggestion
                name="Virginia Museum of Fine Arts"
                description="Major cultural institution featuring diverse art collections and exhibitions in Richmond's Museum District."
              />
              <Suggestion
                name="Lewis Ginter Botanical Garden"
                description="50-acre botanical garden voted America's #4 public garden, featuring diverse gardens, waterway splash pad, and live music events."
              />
              <Suggestion
                name="The James River"
                description="Scenic river running through Richmond perfect for outdoor activities, rafting, and riverside walks."
              />
              <Suggestion
                name="Maymont Park"
                description="Historic 100-acre park featuring gardens, wildlife exhibits, mansion tours, and scenic river views."
              />
              <Suggestion
                name="Hollywood Cemetery"
                description="Historic 135-acre garden cemetery established in 1847, featuring presidential burial sites and heritage rose gardens."
              />
              <Suggestion
                name="Carytown"
                description="Vibrant shopping and dining district known as Richmond's 'Mile of Style' with unique boutiques and restaurants."
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
