import Image from "next/image";
import Link from "next/link";
import { Container } from "~/app/components/container";
import { KathrynAndHunter } from "~/app/components/k-and-h";
import { PRIMARY_NAVIGATION } from "~/app/constants/navigation.constants";
import { copy, label } from "~/app/styles/text.styles";

export function SiteFooter() {
  return (
    <footer>
      <Container>
        <div className="flex w-full flex-col gap-y-3 py-6 text-text-primary">
          <div className="flex flex-col gap-y-8 sm:gap-y-16 md:gap-y-40">
            <div className="flex flex-wrap justify-between gap-x-8 gap-y-16 md:gap-16">
              <div className="flex w-[min(40ch,100%)] flex-1 shrink-0 flex-col gap-8 md:gap-16">
                <div className="flex flex-1 flex-col gap-6">
                  <span className={label()}>Contact</span>
                  <p className={copy({ className: "md:text-lg" })}>
                    For questions about the event
                    <br /> please contact{" "}
                    <Link
                      className="text-text-primary underline underline-offset-4 hover:text-text-secondary"
                      href="mailto:pentz.katy@gmail.com"
                    >
                      pentz.katy@gmail.com
                    </Link>
                  </p>
                </div>
                <nav className="flex flex-1 flex-col gap-6">
                  <span className={label()}>Navigation</span>
                  <ul className="inline-flex flex-col gap-1">
                    <li>
                      <Link
                        href={{
                          hash: "#",
                        }}
                        className="font-medium font-sans text-base text-orange leading-none md:text-lg"
                      >
                        Back to top ↑
                      </Link>
                    </li>
                    {PRIMARY_NAVIGATION.map((item) => {
                      return (
                        <li key={item.hash}>
                          <Link
                            href={{
                              pathname: item.path,
                              hash: item.hash,
                            }}
                            className="font-medium font-sans text-base text-text-primary leading-none md:text-lg"
                          >
                            {item.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
              <div className="relative mx-auto aspect-[3/4] h-auto w-full shrink-0 overflow-clip sm:max-w-3xs">
                <Image
                  alt=""
                  src="/katy-and-hunter-footer-hug.webp"
                  fill
                  className="z-0 object-cover brightness-75 contrast-125 grayscale saturate-0"
                />
              </div>
            </div>
            <KathrynAndHunter className="h-auto w-full" />
          </div>
          <div className="flex items-center justify-between gap-[1ch]">
            <span className="block font-medium font-sans text-sm md:text-lg">The Virginia House</span>
            <span className="sm:-translate-x-1/2 left-1/2 z-1 hidden font-medium font-sans text-sm text-text-secondary sm:absolute sm:block md:text-lg">
              16 May 2026
            </span>
            <span className="block font-medium font-sans text-sm md:text-lg">See you there</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
