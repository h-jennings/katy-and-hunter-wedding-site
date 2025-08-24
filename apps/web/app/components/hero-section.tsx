import Image from "next/image";
import { KathrynAndHunter } from "./k-and-h";

export function Hero() {
  return (
    <section className="h-[calc(60vh-var(--spacing-site-header-h))] md:h-[calc(90vh-var(--spacing-site-header-h))] lg:h-[calc(100vh-var(--spacing-site-header-h))]">
      <div className="grid h-full px-6 pb-8 md:px-8">
        <div className="relative isolate flex flex-col bg-bg-inverse">
          <div className="relative z-1 grid flex-1 grid-cols-1 items-end gap-3 pt-[calc(--spacing(8)+--spacing(3))] pb-8 text-center text-sm sm:gap-5 sm:text-base md:gap-16 md:text-2xl">
            <span className="font-black text-text-inverse uppercase leading-none tracking-tighter">The Wedding</span>
            <span className="self-start font-black text-text-inverse uppercase leading-none tracking-tighter">of</span>
          </div>
          <div className="relative z-1 mx-auto w-full max-w-site-container-w">
            <span className="sr-only">Kathryn and Hunter</span>
            <div className="w-full px-3 pb-3">
              <KathrynAndHunter aria-hidden className="h-auto w-full text-text-inverse" />
            </div>
          </div>
          <Image
            priority
            alt="Kathryn Pentz and Hunter Jennings embracing outdoors in an engagement photo, smiling at each other in Richmond, Virginia"
            fill
            src="/katy-and-hunter-hero-image.webp"
            className="z-0 object-cover brightness-75 contrast-125 grayscale saturate-0"
          />
        </div>
      </div>
    </section>
  );
}
