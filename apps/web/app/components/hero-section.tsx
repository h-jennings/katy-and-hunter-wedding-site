export function Hero() {
  return (
    <section className="h-[calc(40dvh-var(--spacing-site-header-h))] sm:h-[calc(50dvh-var(--spacing-site-header-h))] md:h-[calc(90dvh-var(--spacing-site-header-h))] lg:h-[calc(100dvh-var(--spacing-site-header-h))]">
      <div className="grid h-full px-6 pb-8 md:px-8">
        <div className="flex flex-col gap-20 bg-bg-inverse pt-8">
          <div className="grid flex-1 grid-cols-1 items-end gap-20 text-center">
            <span className="font-black text-2xl text-text-inverse uppercase leading-none tracking-tighter">
              The Wedding
            </span>
            <span className="self-start font-black text-2xl text-text-inverse uppercase leading-none tracking-tighter">
              of
            </span>
          </div>
          <div className="mx-auto w-full max-w-site-container-w">
            {/* TODO: USE SVG INSTEAD */}
            <span className="grid text-center font-script text-8xl text-text-inverse [font-size:min(15vw,334px)]">
              <span className="self-end">Kathryn &amp; Hunter</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
