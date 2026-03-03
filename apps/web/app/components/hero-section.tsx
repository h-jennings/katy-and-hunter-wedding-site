"use client";
import { type Easing, motion } from "motion/react";
import Image from "next/image";
import { KathrynAndHunter } from "~/app/components/k-and-h";

const TEXT_ANIMATION_EASE: Easing = [0.22, 0.61, 0.36, 1];
const CENTER_TEXT_ANIMATION_DURATION = 0.65;
const OUTER_ELM_DELAY = CENTER_TEXT_ANIMATION_DURATION + CENTER_TEXT_ANIMATION_DURATION * 0.33;

export function Hero() {
  return (
    <section className="h-[calc(60vh-var(--spacing-site-header-h))] md:h-[calc(90vh-var(--spacing-site-header-h))] lg:h-screen">
      <motion.div
        className="grid h-full [--gutter:0px] [--top-inset:var(--spacing-site-header-h)] sm:[--gutter:1.5rem] sm:[--top-inset:calc(var(--spacing-site-header-h)*var(--gutter-multi))] md:[--gutter:2rem]"
        initial={{
          "--gutter-multi": 0,
        }}
        animate={{
          "--gutter-multi": 1,
        }}
        transition={{
          type: "tween",
          duration: CENTER_TEXT_ANIMATION_DURATION * 2.5,
          delay: OUTER_ELM_DELAY,
          ease: [0.19, 1, 0.22, 1],
        }}
        style={{
          clipPath:
            "inset(var(--top-inset) calc(var(--gutter)*var(--gutter-multi)) calc(var(--gutter)*var(--gutter-multi)) calc(var(--gutter)*var(--gutter-multi)))",
        }}
      >
        <div className="relative isolate flex flex-col bg-bg-inverse px-(--gutter) pb-[calc(var(--gutter)*2)]">
          <div className="relative z-1 grid flex-1 grid-cols-1 items-end gap-3 pt-[calc(--spacing(8)+--spacing(3))] pb-8 text-center text-sm sm:gap-5 sm:text-base md:gap-16 md:text-2xl">
            <span className="block overflow-clip font-black text-text-inverse uppercase leading-none tracking-tighter">
              <motion.span
                initial={{
                  y: "100%",
                }}
                animate={{
                  y: "0%",
                }}
                transition={{
                  type: "tween",
                  duration: CENTER_TEXT_ANIMATION_DURATION,
                  ease: TEXT_ANIMATION_EASE,
                }}
                className="block"
              >
                The Wedding
              </motion.span>
            </span>
            <span className="block self-start overflow-clip font-black text-text-inverse uppercase leading-none tracking-tighter">
              <motion.span
                initial={{
                  y: "100%",
                }}
                animate={{
                  y: "0%",
                }}
                transition={{
                  type: "tween",
                  duration: CENTER_TEXT_ANIMATION_DURATION,
                  ease: TEXT_ANIMATION_EASE,
                  delay: 0.2,
                }}
                className="block"
              >
                of
              </motion.span>
            </span>
          </div>
          <div className="relative z-1 mx-auto w-full max-w-site-container-w">
            <span className="sr-only">Kathryn and Hunter</span>
            <div className="w-full overflow-clip px-3 pb-3">
              <motion.div
                initial={{
                  clipPath: "inset(0 0 100% 0)",
                }}
                animate={{
                  clipPath: "inset(0 0 0 0)",
                }}
                transition={{
                  type: "tween",
                  duration: CENTER_TEXT_ANIMATION_DURATION * 2.5,
                  ease: [0.08, 0.82, 0.17, 1],
                  delay: OUTER_ELM_DELAY,
                }}
              >
                <KathrynAndHunter aria-hidden className="h-auto w-full text-text-inverse" />
              </motion.div>
            </div>
          </div>
          <Image
            priority
            alt="Kathryn Pentz and Hunter Jennings embracing outdoors in an engagement photo, smiling at each other in Richmond, Virginia"
            fill
            src="/katy-and-hunter-hero-image.webp"
            className="z-0 object-cover object-[60%_center] brightness-75 contrast-125 grayscale saturate-0"
          />
        </div>
      </motion.div>
    </section>
  );
}
