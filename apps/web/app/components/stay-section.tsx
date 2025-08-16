import { ANCHORS } from "~/app/constants/anchors.constants";
import { fancyHeading } from "~/app/styles/text.styles";

export function Stay() {
  return (
    <div className="px-16">
      <section className="mx-auto max-w-[1920px] pb-40">
        <h2 id={ANCHORS.STAY} className={fancyHeading({ size: "lg" })}>
          Stay Awhile
        </h2>
      </section>
    </div>
  );
}
