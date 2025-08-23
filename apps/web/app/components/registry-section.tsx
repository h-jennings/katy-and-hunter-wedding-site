import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Container, ContainerInner } from "~/app/components/container";
import { ANCHORS } from "~/app/constants/anchors.constants";
import { callout, chunky, fancyHeading } from "~/app/styles/text.styles";

export function Registry() {
  return (
    <Container>
      <ContainerInner className="flex flex-col gap-24">
        <div className="flex flex-col gap-7 text-center">
          <h2 id={ANCHORS.REGISTRY} className={chunky({ className: "scroll-mt-20" })}>
            Registry
          </h2>
          <div className={fancyHeading({ size: "lg" })}>Your Presence is our Present</div>
          <div className={callout({ className: "mx-auto w-full max-w-site-container-w-inner" })}>
            Having loving friends and family is the greatest gift of all. If you wish to honor us with a wedding gift,
            we’ve compiled a list on Zola, link below.
          </div>
        </div>

        <div className="relative isolate grid w-full grid-cols-1 grid-rows-1">
          <Image
            alt=""
            className="pointer-events-none z-1 col-span-full row-span-full mx-auto hidden select-none xl:block"
            src="/picture-frame.png"
            width={1536}
            height={1024}
          />
          <div className="pointer-events-auto relative z-0 col-span-full row-span-full xl:px-[min(14.8vw,180px)]">
            <div className="mx-auto max-w-site-container-w-inner overflow-y-auto xl:mt-[min(11.8vw,200px)] xl:max-h-[min(37vw,620px)] xl:max-w-[1014px]">
              <div className="flex h-full w-full flex-col items-center overflow-clip rounded-md bg-white px-3 py-3">
                <Link
                  href="https://zola.com/registry/katyandhunter2026"
                  className="zola-registry-embed rounded-lg bg-black px-4 py-3 font-medium font-sans text-base text-text-inverse"
                  data-registry-key="katyandhunter2026"
                >
                  Our Zola Registry
                </Link>
                <Script id="zola-registry">
                  {`!function(e,t,n){var s,a=e.getElementsByTagName(t)[0];e.getElementById(n)||(s=e.createElement(t),s.id=n,s.async=!0,s.src="https://widget.zola.com/js/widget.js",a.parentNode.insertBefore(s,a))}(document,"script","zola-wjs");`}
                </Script>
              </div>
            </div>
          </div>
        </div>
      </ContainerInner>
    </Container>
  );
}
