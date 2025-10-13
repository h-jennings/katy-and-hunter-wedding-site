import Link from "next/link";
import { Container, ContainerInner } from "~/app/components/container";
import { ANCHORS } from "~/app/constants/anchors.constants";
import { chunky, copy, fancyHeading, label } from "~/app/styles/text.styles";
import { AirBnbLogomark } from "./airbnb-logomark";

export function Stay() {
  return (
    <Container>
      <ContainerInner className="flex flex-col gap-24">
        <h2 id={ANCHORS.STAY} className={fancyHeading({ size: "lg", className: "scroll-mt-20 text-center" })}>
          Stay Awhile
        </h2>
        <div className="flex flex-col gap-y-16 md:gap-y-40">
          <div className="flex flex-wrap gap-x-14 gap-y-16">
            <div className="flex min-w-[min(45ch,100%)] flex-1 flex-col items-center gap-y-8">
              <h3 className={fancyHeading({ size: "md", className: "text-center" })}>Quirk Hotel</h3>
              <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-10">
                <div className={label()}>Details</div>
                <div className={copy()}>
                  Art-focused boutique hotel in downtown Richmond featuring original artwork by local artists. Spacious
                  accommodations with large windows and natural light. Amenities include Q Rooftop Bar with city views,
                  The Lobby Bar, and on-site art gallery. Perfect for a unique, creative atmosphere in the heart of
                  Richmond's Broad Street corridor.
                </div>
                <div className={label()}>Price</div>
                <div className={copy()}>~$300 per night</div>
                <div className={label()}>Book</div>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit text-text-primary underline underline-offset-4 transition-colors hover:text-text-secondary"
                  href="https://www.quirkhotels.com/"
                >
                  Visit Website
                </Link>
              </div>
            </div>
            <div className="flex min-w-[min(45ch,100%)] flex-1 flex-col items-center gap-y-8">
              <h3 className={fancyHeading({ size: "md", className: "text-center" })}>Graduate Hotel</h3>
              <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-10">
                <div className={label()}>Details</div>
                <div className={copy()}>
                  Part of Hilton's Graduate Hotels collection, this boutique hotel features creative interiors inspired
                  by college nostalgia and local Richmond history. Located in downtown Richmond near VCU, it offers
                  Byrdhouse rooftop bar with city views, Brookfield restaurant, and fitness center. Pet-friendly with
                  valet parking available. Perfect for a unique stay modern amenities with local character.
                </div>
                <div className={label()}>Price</div>
                <div className={copy()}>~$300 per night</div>
                <div className={label()}>Book</div>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit text-text-primary underline underline-offset-4 transition-colors hover:text-text-secondary"
                  href="https://www.hilton.com/en/hotels/ricgrgu-graduate-richmond/"
                >
                  Visit Website
                </Link>
              </div>
            </div>
          </div>
          <AirbnbWishlistCallout />
          <div className="flex flex-wrap gap-x-14 gap-y-16">
            <div className="flex min-w-[min(30ch,100%)] flex-1 flex-col items-center gap-y-8">
              <h3 className={fancyHeading({ size: "md", className: "text-center" })}>Eat</h3>
              <Suggestion
                name="North End Juice Co."
                price="cheap"
                description="Fresh-pressed juices, smoothies, and acai bowls in Richmond's Museum District with quality ingredients and healthy options."
              />
              <Suggestion
                name="Stanleys"
                price="moderate"
                description="Popular Richmond restaurant known for its welcoming atmosphere, locally-sourced American cuisine, and wonderful cheesteaks."
              />
              <Suggestion
                name="Cochiloco"
                price="moderate"
                description="Vibrant Mexican restaurant featuring authentic flavors and creative cocktails in a lively atmosphere."
              />
              <Suggestion
                name="The Roosevelt"
                price="expensive"
                description="Upscale Southern restaurant offering refined comfort food and an extensive bourbon selection in an elegant setting. (Hunter's Favorite)"
              />
              <Suggestion
                name="Grisette"
                price="expensive"
                description="Easygoing restaurant with vintage surrounds serving meat & cheese boards, plus steaks & desserts. (Katy's Favorite)"
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
            <div className="flex min-w-[min(30ch,100%)] flex-1 flex-col items-center gap-y-8">
              <h3 className={fancyHeading({ size: "md", className: "text-center" })}>Drink</h3>
              <Suggestion
                name="Afterglow Coffee Cooperative"
                price="cheap"
                description="Richmond's first worker-owned coffee cooperative featuring specialty single-origin beans and community-focused atmosphere."
              />
              <Suggestion
                name="Blanchard's Coffee Broad Street"
                price="cheap"
                description="Bustling coffee shop serving espresso drinks, pour overs and drip coffee, plus tea, and pastries. (Katy's Favorite)"
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
                description="Intimate neighborhood bar and restaurant offering craft cocktails and elevated comfort food in a cozy setting. (Hunter's Favorite)"
              />
              <Suggestion
                name="Get Tight Lounge"
                price="moderate"
                description="Hip cocktail lounge with creative drinks, DJ sets, and a trendy atmosphere perfect for late-night socializing."
              />
            </div>
            <div className="flex min-w-[min(30ch,100%)] flex-1 flex-col items-center gap-y-8">
              <h3 className={fancyHeading({ size: "md", className: "text-center" })}>Play</h3>
              <Suggestion
                name="Virginia Museum of Fine Arts"
                description="Major cultural institution featuring diverse art collections and exhibitions in Richmond's Museum District."
              />
              <Suggestion
                name="Virginia Museum of History and Culture"
                description="A 1913 neoclassical building houses a research library & expansive collection of Virginia artifacts."
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
      </ContainerInner>
    </Container>
  );
}

function Suggestion({ name, price, description }: { name: string; price?: Price; description: string }) {
  return (
    <div className="flex flex-col gap-y-2">
      <div>
        <span className={chunky()}>
          {name}&nbsp;&nbsp;{price && <span className="font-normal text-sm">{PRICE_LABEL[price]}</span>}
        </span>
      </div>
      <div className={copy()}>{description}</div>
    </div>
  );
}

const WISHLIST_URL = "https://www.airbnb.com/wishlists/v/1345405123";

function AirbnbWishlistCallout() {
  return (
    <div className="flex flex-col items-center gap-7 py-7 text-center">
      <h3 className={chunky({ className: "hidden scroll-mt-20 sm:block" })}>See Our Airbnb list</h3>
      <div className="flex flex-col items-center justify-center gap-y-3">
        <p className="flex items-baseline gap-x-[2ch]">
          <span className={fancyHeading({ size: "md", className: "hidden sm:inline-block" })}>
            Let's find <span className="sr-only">your stay</span>
          </span>
          <Link
            href={WISHLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-block rounded-xl px-5.5 py-2.5 transition-all duration-200 hover:scale-[0.98] hover:opacity-80 active:scale-[0.95]"
            style={{
              boxShadow:
                "rgba(255, 255, 255, 0.06) 0px -12px 16px 0px inset, rgba(255, 255, 255, 0.16) 0px 4px 16px 0px inset, rgba(255, 255, 255, 0.12) 0px 0.75px 0.25px 0px inset, rgba(255, 255, 255, 0.32) 0px 0.25px 0.25px 0px inset, rgba(0, 0, 0, 0.02) 0px 6px 12px 0px, rgba(0, 0, 0, 0.03) 0px 3px 6px 0px, rgba(0, 0, 0, 0.03) 0px 1px 2px 0px, rgba(0, 0, 0, 0.06) 0px 0.5px 0.5px 0px, rgba(0, 0, 0, 0.04) 0px 3px 6px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
              background:
                "linear-gradient(rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.24) 100%), rgba(255, 90, 95, 0.06)",
            }}
          >
            <span
              className="pointer-events-none absolute inset-0 block h-full w-full rounded-[inherit] p-[1px]"
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgba(153, 153, 153, 0) 5%, rgba(255, 255, 255, 0.24) 20%, rgba(153, 153, 153, 0.24) 40%, rgba(255, 255, 255, 0) 100%)",
                mask: "linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
              }}
            />
            <span className="flex items-center gap-x-[0.75ch]">
              <AirBnbLogomark className="h-[0.75lh] w-auto" />
              <span
                className="bg-clip-text font-medium font-sans text-base text-gradient text-transparent transition-all"
                style={{
                  backgroundImage: "linear-gradient(0deg, rgb(153, 153, 153) 0%, rgb(61, 61, 61) 100%)",
                }}
              >
                Airbnb Wishlist
              </span>
            </span>
          </Link>
          <span aria-hidden className={fancyHeading({ size: "md", className: "hidden sm:inline-block" })}>
            your stay
          </span>
        </p>
        <p className={copy({ className: "text-center text-text-secondary sm:hidden" })}>
          See our curated list of rentals
        </p>
      </div>
    </div>
  );
}

type Price = "cheap" | "moderate" | "expensive";
const PRICE_LABEL = {
  cheap: "$",
  moderate: "$$",
  expensive: "$$$",
} satisfies Record<Price, string>;
