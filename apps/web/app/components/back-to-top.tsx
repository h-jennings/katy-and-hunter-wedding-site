"use client";

export function BackToTop() {
  return (
    <button
      onClick={() => {
        window.scrollTo({ top: 0 });
      }}
      type="button"
      className="cursor-pointer font-medium font-sans text-base text-orange leading-none md:text-lg"
    >
      Back to top ↑
    </button>
  );
}
