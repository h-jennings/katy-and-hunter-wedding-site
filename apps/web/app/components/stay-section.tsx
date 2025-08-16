import { ANCHORS } from "~/app/constants/anchors.constants";
import { copy, fancyHeading, label } from "~/app/styles/text.styles";

export function Stay() {
  return (
    <div className="px-16">
      <section className="mx-auto flex max-w-[1920px] flex-col gap-24 pt-20 pb-40">
        <h2 id={ANCHORS.STAY} className={fancyHeading({ size: "lg", className: "text-center" })}>
          Stay Awhile
        </h2>
        <div className="flex gap-x-14">
          <div className="flex flex-1 flex-col items-center gap-y-8">
            <h3 className={fancyHeading({ size: "md", className: "text-center" })}>Quirk Hotel</h3>
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-10">
              <div className={label()}>Details</div>
              <div className={copy()}>
                Featuring period hardwood floors, contemporary artwork and recycled furniture, the streamlined rooms
                have minibars, free Wi-Fi and flat-screen TVs, as well as coffeemakers. Upgraded rooms add
                floor-to-ceiling windows, while suites include living rooms; some are bi-level with loft bedrooms. Room
                service is available.
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
                On a tree-lined street in the historic Monroe Ward, this trendy hotel with mid-century modern decor has
                accents inspired by local tennis great Arthur Ashe. It's 9 minutes on foot from Virginia Commonwealth
                University and 10 miles from Richmond International Airport.
              </div>
              <div className={label()}>Price</div>
              <div className={copy()}>$255/Night</div>
              <div className={label()}>Book</div>
              <div className={copy()}>Link to Book</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
